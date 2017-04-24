<?php

namespace Drupal\newscenter_rest_services\Plugin\QueueWorker;

use \Drupal\node\Entity\Node;
use \Drupal\taxonomy\Entity\Term;
use \Drupal\taxonomy\Entity\Vocabulary;

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
        // Query for newscenter_blog_entry type node using unique identifier; if none exists, create one else update
        $nid = $entity_query_service->condition('status', 1)->condition('type', 'newscenter_blog_entry')
            ->condition('field_unique_identifier', $unique_identifier)->execute();
        $node = null;
        if (empty($nid)) {
            //create a new node
            $node = Node::create(array(
                'type' => 'newscenter_blog_entry',
                'body' => array(
                    'format' => 'full_html',
                ),
                'revision' => 1,
                'status' => TRUE,
                'uid' => 1,
                'promote' => 0,
                'created' => REQUEST_TIME,
            ));

        } else {
            $node = $entity_load_service->load($nid);
        }
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


    protected function upsertTags(&$node, $new_tags)
    {
        $taxonomy_query_service = \Drupal::entityTypeManager()->getStorage('taxonomy_term');

        if (!isset($node->field_newscenter_tags)) {
            $node->field_newscenter_tags = [];
        }
        $tags_to_create = $new_tags;
        $tags_to_add = [];

        $all_vocabularies = Vocabulary::loadMultiple();
        foreach ($all_vocabularies as $tag_vocabulary) {
            if ($tag_vocabulary->label() == 'Tags') {
                $terms = $taxonomy_query_service->loadTree($tag_vocabulary->id());
                if (!empty($terms)) {
                    foreach ($terms as $term) {
                        foreach ($tags_to_create as $key_to_create => $value_to_create) {
                            if ($key_to_create == $term->name) {
                                unset($tags_to_create[$key_to_create]);
                                $tags_to_add[] = $term;
                            }
                        }
                    }
                }
            }
            //create the ones which are not in the vocabulary and add it to the node
            foreach ($tags_to_create as $tbcK => $tbcV) {
                $term = Term::create([
                    'vid' => 'tags',
                    'langcode' => 'en',
                    'name' => $tbcK,
                    'description' => [
                        'value' => '<p>Created Automatically after It was detected from the News Center</p>',
                        'format' => 'full_html',
                    ],
                    'weight' => -1,
                    'parent' => array(0),
                ]);
                $term->save();
                $tags_to_add[] = $term;
            }
            //add newly created tags to this node now
            $node->field_newscenter_tags = array();
            foreach($tags_to_add as $term_to_add){
                $node->field_newscenter_tags[] = array( 'target_id' => $term_to_add->tid );
            }
        }
    }
}
