<?php
namespace Drupal\newscenter_rest_services\Plugin\QueueWorker;
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
 *   cron = {"time" = 10}
 * )
 */
class NewsCenterClientBlogsQueueWorker extends NewsCenterClientBlogsQueueBase
{

}