<?php
/**
 * Created by PhpStorm.
 * User: mahim
 * Date: 4/7/17
 * Time: 2:51 PM
 */

namespace Drupal\newscenter_rest_services\Plugin\QueueWorker;

/**
 * Create node object from data fetched from NEWS CENTER
 *
 * @QueueWorker(
 *   id = "news_appearance_creation_queue",
 *   title = @Translation("Create Important News Announcement nodes fetched from News Center"),
 *   cron = {"time" = 600}
 * )
 */
class NewsCenterClientQueueNewsAppearanceWorker extends NewsCenterClientQueue
{

    public function createContent($content) {
        // Create node object from the $content array
       /* $node = Node::create(array(
            'type'  => 'news_newscenter_blog_entry',
            'title' => $content['title'],
            'body'  => array(
                'value'  => $content['body'],
                'format' => 'basic_html',
            ),
        ));
        $node->save();*/
    }
}