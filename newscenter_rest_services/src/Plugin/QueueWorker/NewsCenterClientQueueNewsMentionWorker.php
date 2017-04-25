<?php
/**
 * Created by PhpStorm.
 * User: mahim
 * Date: 4/7/17
 * Time: 2:51 PM
 */
/**
namespace Drupal\newscenter_rest_services\Plugin\QueueWorker;
use \Drupal\node\Entity\Node;


 * Create node object from data fetched from NEWS CENTER
 *
 * @QueueWorker(
 *   id = "news_mention_creation_queue",
 *   title = @Translation("Create Important News Announcement nodes fetched from News Center"),
 *   cron = {"time" = 600}
 * )

class NewsCenterClientQueueNewsMentionWorker extends NewsCenterClientQueue
{

    public function createContent($content) {
        $entity_query_service = \Drupal::entityQuery('node');
        $entity_load_service = \Drupal::entityTypeManager()->getStorage('node');
        $unique_identifier = $content['news_db_key'];
        // Query for newscenter_blog_entry type node using unique identifier; if none exists, create one else update
        $nid = $entity_query_service->condition('status', 1)->condition('type', 'newscenter_newsmention_entry')
            ->condition('field_unique_identifier', $unique_identifier)->execute();
        if (empty($nid)) {
            //create a new node
            $node = null;
            $node = Node::create(array(
                'type' => 'newscenter_newsmention_entry',
                'body' => array(
                    'format' => 'full_html',
                ),
                'revision' => 1,
                'status' => TRUE,
                'uid' => 1,
                'promote' => 0,
                'created' => REQUEST_TIME,
            ));
            $this->set_validate_save_node($node, $content);
        } else {
            foreach($nid as $node_id){
                $node = null;
                $node = $entity_load_service->load($node_id);
                $this->set_validate_save_node($node, $content);
            }
        }

    }

    private function set_validate_save_node(&$node, $content){
        $node->title = $content['news_title'];
        $node->body->value = $content['news_body'];
        $node->field_unique_identifier = $content['news_db_key'];
        $node->field_author = $content['news_author'];
        $node->field_newscenter_image_url = $content['news_img_details']['url'];
        $node->field_newscenter_url = $content['news_external_url'];
        $node->field_subtitle = $content['news_subtitle'];
        $node->field_newscenter_node_id = $content['news_node_id'];
        $this->upsertTags($node, $content['news_tag_array']);
        $node->changed = REQUEST_TIME;
        $node->validate();
        $node->save();
    }
} */