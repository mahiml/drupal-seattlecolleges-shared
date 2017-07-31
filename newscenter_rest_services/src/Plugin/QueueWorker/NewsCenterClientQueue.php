<?php
/**
 * Created by PhpStorm.
 * User: mahim
 * Date: 4/7/17
 * Time: 2:49 PM
 */

namespace Drupal\newscenter_rest_services\Plugin\QueueWorker;

use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\Core\Queue\QueueWorkerBase;
use Symfony\Component\DependencyInjection\ContainerInterface;
use \Drupal\taxonomy\Entity\Term;
use \Drupal\taxonomy\Entity\Vocabulary;

abstract class NewsCenterClientQueue extends QueueWorkerBase implements ContainerFactoryPluginInterface
{
// Here we don't use the Dependency Injection,
    // but the create method and __construct method are necessary to implement
    protected $entity_query_service;
    protected $taxonomy_query_service;

    /**
     * {@inheritdoc}
     */
    public function __construct() {}

    /**
     * {@inheritdoc}
     */
    public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition)
    {
       return new static();
    }

    /**
     * {@inheritdoc}
     */
    public function processItem($item)
    {
        // Get the content array
        $content = $item->data;
        // Create node from the array
        $this->createContent($content);
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
                            $alias = \Drupal::service('path.alias_manager')->getAliasByPath('/taxonomy/term/'.$term->tid);
                            if ($value_to_create == $alias) {
                                $tags_to_add[] = $term;
                            }
                        }
                    }
                }
            }
            //create the ones which are not in the vocabulary and add it to the node
         /*   foreach ($tags_to_create as $tbcK => $tbcV) {
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
         */
            //add ONLY TAGS WHICH EXIST IN THE SITE
            $node->field_newscenter_tags = array();
            foreach($tags_to_add as $term_to_add){
                $node->field_newscenter_tags[] = array( 'target_id' => $term_to_add->tid );
            }
        }
    }
}