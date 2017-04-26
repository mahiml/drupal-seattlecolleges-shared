<?php

namespace Drupal\newscenter_rest_services\Controller;

use Drupal\Core\Url;
use Drupal\rest_services\Exceptions\MissingRequiredFieldException;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Queue\QueueWorkerManager;
use Drupal\Core\Queue\QueueFactory;
use \Exception as Exception;


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

    /**
     * {@inheritdoc}
     */
    public function __construct(QueueFactory $queue_factory)
    {
        $this->queueFactory = $queue_factory;
    }

    /**
     * {@inheritdoc}
     */
    public static function create(ContainerInterface $container)
    {
        $queue_factory = $container->get('queue');
        return new static($queue_factory);
    }

    /**
     * Fetch data from URL and create it to entities based on flag
     */
    protected function getContents($get_url)
    {
        // fetch data from get_url
        $contents = array();
        $raw_data = file_get_contents($get_url);
        $parsed = parse_url($get_url);
        $json = json_decode($raw_data, true);
        foreach ($json as $key => $value) {
            try {
                $data = [];
                if (empty($value['nid'][0]['value'])) {
                    throw new MissingRequiredFieldException("Missing Fields in JSON", "Node ID was not set in" . json_encode($value));
                }
                $data['news_node_id'] = $value['nid'][0]['value'];
                if (empty($value['uuid'][0]['value'])) {
                    throw new MissingRequiredFieldException("Missing Fields in JSON", "UUID was not set in" . json_encode($value));
                }
                $data['news_uuid'] = $value['uuid'][0]['value'];
                $data['news_body'] = $value['body'][0]['value'];
                $data['news_author'] = isset($value['field_author']) && !empty($value['field_author']) ? $value['field_author'][0]['value'] : '';
                $raw_tag_array = $value['field_newscenter_tags'];
                $tag_array = [];
                foreach ($raw_tag_array as $key1 => $data1) {
                    if (!empty($data1['url'])) {
                        $tag_url = $data1['url'];
                        $exploded_tag_url = explode('/', $tag_url);
                        $tag_array[strtoupper(end($exploded_tag_url))] = $tag_url;
                    }
                }
                $data['news_tag_array'] = $tag_array;
                $data['news_date_posted'] = $value['field_date_posted'][0]['value'];
                if (!empty($value['field_external_url'][0]['uri'])) {
                    $data['news_external_url'] = $value['field_external_url'][0]['uri'];
                } else if (!empty($data['news_node_id'])) {
                    $new_url = $parsed['scheme'] . '://' . $parsed['host'];
                    if ($parsed['port']) {
                        $new_url = $new_url . ':' . $parsed['port'];
                    }
                    $new_url = $new_url . '/node/' . $data['news_node_id'];
                    $data['news_external_url'] = $new_url;
                }
                if (empty($data['news_external_url'])) {
                    throw new MissingRequiredFieldException("Missing Fields in JSON", "NewsCenter External URL was not set in" . json_encode($value));
                }
                $data['news_img_details'] = isset($value['field_img']) && !empty($value['field_img']) ? $value['field_img'][0] : array();
                $data['news_subtitle'] = isset($value['field_subtitle']) && !empty($value['field_subtitle']) ? $value['field_subtitle'][0]['value'] : '';
                if (empty($value['field_unique_identifier'][0]['value'])) {
                    throw new MissingRequiredFieldException("Missing Fields in JSON", "NewsCenter Uniqueidentifier was not set in" . json_encode($value));

                }
                $data['news_db_key'] = $value['field_unique_identifier'][0]['value'];
                $data['news_title'] = $value['title'][0]['value'];
                $contents[] = $data;
            } catch (Exception $ex) {
                \Drupal::logger('newscenter_rest_services')->error($ex->getMessage());
                continue;
            }

        }
        //   print_r($contents);
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
        $contents = $this->getContents($url);
        if (!empty($contents)) {
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
     * Page where the fetched data is queued for news mentions
     * /
     * public function getNewsMentions()
     * {
     * $url = \Drupal::config('newscenter_rest_services.settings')->get('mention_in_news_url');
     * $contents = $this->getContents(Url::fromUri($url));
     * if(!empty($contents)) {
     * foreach ($contents as $content) {
     * // Get the queue implementation news blogs
     * $queue = $this->queueFactory->get('news_mention_creation_queue');
     * // Create new queue item
     * $item = new \stdClass();
     * $item->data = $content;
     * $queue->createItem($item);
     * }
     * }
     * return array(
     * '#type' => 'markup',
     * '#markup' => $this->t('@count queue items are created.', array('@count' => count($contents))),
     * );
     * }
     */
    /**
     * Page where the fetched data is queued for student stories
     */
    public function getStudentStories()
    {
        $url = \Drupal::config('newscenter_rest_services.settings')->get('student_stories_url');
        // Get contents array
        $contents = $this->getContents(Url::fromUri($url));
        if (!empty($contents)) {
            foreach ($contents as $content) {
                // Get the queue implementation news blogs
                $queue = $this->queueFactory->get('student_stories_creation_queue');
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

        for ($i = 0; $i < $queue->numberOfItems(); $i++) {
            // Create batch operations
            $batch['operations'][] = array('Drupal\newscenter_rest_services\Controller\NewsCenterClient::batchProcess', array(null, 'news_article_creation_queue'));
        }

        $queue = $queue_factory->get('student_stories_creation_queue');
        for ($i = 0; $i < $queue->numberOfItems(); $i++) {
            // Create batch operations
            $batch['operations'][] = array('Drupal\newscenter_rest_services\Controller\NewsCenterClient::batchProcess', array(null, 'student_stories_creation_queue'));
        }
        // Adds the batch sets
        batch_set($batch);
        // Process the batch and after redirect to the frontpage
        return batch_process('<front>');
    }

    /**
     * Common batch processing callback for all operations.
     */
    public static function batchProcess(&$context, $queueName)
    {

        $queue_factory = \Drupal::service('queue');
        $queue_manager = \Drupal::service('plugin.manager.queue_worker');

        // Get the queue implementation for $queuename
        $queue = $queue_factory->get($queueName);
        // Get the queue worker
        $queue_worker = $queue_manager->createInstance($queueName);

        // Repeat $number_of_queue times
        for ($i = 0; $i < $queue->numberOfItems(); $i++) {
            // Get a queued item
            if ($item = $queue->claimItem()) {
                try {
                    $queue_worker->processItem($item->data);
                    $queue->deleteItem($item);
                } catch (SuspendQueueException $e) {
                    $queue->releaseItem($item);
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