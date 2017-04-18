<?php

namespace Drupal\newscenter_rest_services\Controller;

use Drupal\Core\Url;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Queue\QueueWorkerManager;
use Drupal\Core\Queue\QueueFactory;

/**
 * Created by PhpStorm.
 * User: mahim
 * Date: 4/7/17
 * Time: 2:26 PM
 */
class NewsCenterClient extends ControllerBase
{
    /**
     * We add QueueFactory and QueueWorkerManager services with the Dependency Injection solution
     */

    /**
     * @var QueueFactory
     */
    protected $queueFactory;

    /**
     * @var QueueWorkerManager
     */
    protected $queueManager;

    /**
     * {@inheritdoc}
     */
    public function __construct(QueueFactory $queue_factory, QueueWorkerManager $queue_manager)
    {
        $this->queueFactory = $queue_factory;
        $this->queueManager = $queue_manager;
    }

    /**
     * {@inheritdoc}
     */
    public static function create(ContainerInterface $container)
    {
        $queue_factory = $container->get('queue');
        $queue_manager = $container->get('plugin.manager.queue_worker');

        return new static($queue_factory, $queue_manager);
    }

    /**
     * Fetch data from URL and create it to entities based on flag
     */
    protected function getContents(Url $get_url)
    {
        // fetch data from get_url
        $contents = array();
        print_r($get_url);
        // Return with the contents
        return $contents;
    }

    /**
     * Page where the fetched data is queued for news blogs
     */
    public function getNewsBlogs()
    {
        $url = \Drupal::config('newscenter_rest_services.settings')->get('news_center_blog_url');
        // Get contents array
        $contents = $this->getContents(Url::fromUri($url));
        if(!empty($contents)) {
            foreach ($contents as $content) {
                // Get the queue implementation news blogs
                $queue = $this->queueFactory->get('news_article_creation_queue');
                // Create new queue item
                $item = new \stdClass();
                $item->data = $content;
                $queue->createItem($item);
            }
        }
        return array(
            '#type' => 'markup',
            '#markup' => $this->t('@count queue items are created.', array('@count' => count($contents))),
        );
    }

    /**
     * Page where the fetched data is queued for news appearances
     */
    public function getNewsAppearances()
    {
        $url = \Drupal::config('newscenter_rest_services.settings')->get('appearance_in_news_url');
        // Get contents array
        $contents = $this->getContents(Url::fromUri($url));
        if(!empty($contents)) {
            foreach ($contents as $content) {
                // Get the queue implementation news blogs
                $queue = $this->queueFactory->get('news_appearance_creation_queue');
                // Create new queue item
                $item = new \stdClass();
                $item->data = $content;
                $queue->createItem($item);
            }
        }
        return array(
            '#type' => 'markup',
            '#markup' => $this->t('@count queue items are created.', array('@count' => count($contents))),
        );
    }

    /**
     * Page where the fetched data is queued for important announcements
     */
    public function getImportantAnnouncements()
    {
        $url = \Drupal::config('newscenter_rest_services.settings')->get('important_announcements_url');
        // Get contents array
        $contents = $this->getContents(Url::fromUri($url));
        if(!empty($contents)) {
            foreach ($contents as $content) {
                // Get the queue implementation news blogs
                $queue = $this->queueFactory->get('important_announcement_creation_queue');
                // Create new queue item
                $item = new \stdClass();
                $item->data = $content;
                $queue->createItem($item);
            }
        }
        return array(
            '#type' => 'markup',
            '#markup' => $this->t('@count queue items are created.', array('@count' => count($contents))),
        );
    }

    /**
     * Process all queue items with batch
     */
    public function processAllItems()
    {

        // Create batch which collects all the specified queue items and process them one after another
        $batch = array(
            'title' => $this->t("Fetch all urls and process all queues"),
            'operations' => array(),
            'finished' => 'Drupal\newscenter_rest_services\Controller\NewsCenterClient::batchFinished',
        );

        // Get each queue implementation
        $queue_factory = \Drupal::service('queue');
        $queue = $queue_factory->get('news_article_creation_queue');

        for ($i = 0; $i < $queue->numberOfItems() ; $i++) {
            // Create batch operations
            $batch['operations'][] = array('Drupal\newscenter_rest_services\Controller\NewsCenterClient::batchProcess', array(null,news_article_creation_queue));
        }
        $queue = $queue_factory->get('news_appearance_creation_queue');
        for ($i = 0; $i < $queue->numberOfItems() ; $i++) {
            // Create batch operations
            $batch['operations'][] = array('Drupal\newscenter_rest_services\Controller\NewsCenterClient::batchProcess', array(null,news_appearance_creation_queue));
        }
        $queue = $queue_factory->get('important_announcement_creation_queue');
        for ($i = 0; $i < $queue->numberOfItems() ; $i++) {
            // Create batch operations
            $batch['operations'][] = array('Drupal\newscenter_rest_services\Controller\NewsCenterClient::batchProcess', array(null,important_announcement_creation_queue));
        }
        // Adds the batch sets
        batch_set($batch);
        // Process the batch and after redirect to the frontpage
        return batch_process('<front>');
    }

    /**
     * Common batch processing callback for all operations.
     */
    public static function batchProcess(&$context,$queueName)
    {

        $queue_factory = \Drupal::service('queue');
        $queue_manager = \Drupal::service('plugin.manager.queue_worker');

        // Get the queue implementation for $queuename
        $queue = $queue_factory->get($queueName);
        // Get the queue worker
        $queue_worker = $queue_manager->createInstance($queueName);

        // Repeat $number_of_queue times
        for ($i = 0; $i < $queue->numberOfItems() ; $i++) {
            // Get a queued item
            if ($item = $queue->claimItem()) {
                try {
                    $queue_worker->processItem($item->data);
                    $queue->deleteItem($item);
                } catch (SuspendQueueException $e) {
                    $queue->releaseItem($item);
                    break;
                }
            }
        }
    }

    /**
     * Batch finished callback.
     */
    public static function batchFinished($success, $results, $operations)
    {
        if ($success) {
            drupal_set_message(t("ALL contents are successfully imported from the NEWS CENTER."));
        } else {
            $error_operation = reset($operations);
            drupal_set_message(t('An error occurred while processing @operation with arguments : @args', array('@operation' => $error_operation[0], '@args' => print_r($error_operation[0], TRUE))));
        }
    }
}