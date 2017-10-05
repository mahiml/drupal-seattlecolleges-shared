<?php
/**
 * @file
 * Contains \Drupal\rave_alert\Plugin\Block\RaveAlertBlock.
 */
namespace Drupal\home_page_alert\Plugin\Block;
use Drupal\Core\Block\BlockBase;

/**
 * Created by PhpStorm.
 * User: mahim
 * Date: 4/5/17
 * Time: 9:30 AM
 */
/**
 * Provides a 'HomePageAlert' block.
 *
 * @Block(
 * id = "currentStudentAlert",
 * admin_label = @Translation("Current Student Alert Block"),
 * )
 */
class CurrentStudentAlertBlock extends BlockBase
{

    /**
     * {@inheritdoc}
     */
    public function build()
    {
        $build = [];
        // Makes sure the placeholder will be replaced by a rave alert markup if available
        // by attaching a lazy builder that will make the rest of this block cacheable.
        $build['home_page_alert'] = array(
            '#lazy_builder' => ['home_alert_service:ShowCurrentStudentAlert', array()],
            '#create_placeholder' => TRUE
        );

        // This is really intensive to calculate, so that's why we're caching the
        // entire block and having the lazy builder take care of the uncacheable
        // part of the block.
        $build['#markup'] ='';
        $build['#cache']['max-age'] = 0;
        \Drupal::service('page_cache_kill_switch')->trigger();
        // Returns the renderable array with attached placeholder.
        return $build;
    }
}