<?php

namespace Drupal\newscenter_rest_services\Plugin\QueueWorker;
use \Drupal\node\Entity\Node;

/**
 * Created by PhpStorm.
 * User: mahim
 * Date: 4/7/17
 * Time: 2:46 PM
 */

/**
 * Create node object from data fetched from NEWS CENTER
 *
 * @QueueWorker(
 *   id = "news_article_creation_queue",
 *   title = @Translation("Create News Article Blog nodes fetched from News Center"),
 *   cron = {"time" = 600}
 * )
 */
class NewsCenterClientQueueNewsBlogWorker extends NewsCenterClientQueue
{
    /**
     * Create content
     *
     * @return int
     */
    public function createContent($content)
    {
        $entity_query_service = \Drupal::entityQuery('node');
        $entity_load_service = \Drupal::entityTypeManager()->getStorage('node');
        $unique_identifier = $content['news_db_key'];
        $uuid = $content['news_uuid'];
        // Query for newscenter_blog_entry type node using unique identifier; if none exists, create one else update
        $nid = $entity_query_service->condition('status', 1)->condition('type', 'newscenter_blog_entry')
            ->condition('field_unique_identifier', $unique_identifier)->execute();
        if (empty($nid)) {
            //create a new node
            $node = null;
            $node = Node::create(array(
                'type' => 'newscenter_blog_entry',
                'body' => array(
                    'format' => 'full_html',
                ),
                'revision' => 1,
                'status' => TRUE,
                'uuid' => $uuid,
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
        $node->field_date_posted = $content['news_date_posted'];
        if(isset($content['news_img_details']['url'])) {
            $node->field_newscenter_image_url = $content['news_img_details']['url'];
        }
        $node->field_newscenter_url = isset($content['news_external_url']) ? $content['news_external_url'] : '';
        if(isset($content['news_subtitle']) && !empty($content['news_subtitle'])) {
            $node->field_subtitle =$content['news_subtitle'];
        }
        $node->field_newscenter_node_id = $content['news_node_id'];
        $this->upsertTags($node, $content['news_tag_array']);
        $node->changed = REQUEST_TIME;
        $node->validate();
        $node->save();
    }
}
