<?php

namespace Drupal\newscenter_rest_services\Plugin\rest\resource;

use Drupal\rest\Plugin\ResourceBase;
use Drupal\rest\ResourceResponse;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Psr\Log\LoggerInterface;

/**
 * Created by PhpStorm.
 * User: mahim
 * Date: 4/26/17
 * Time: 11:25 AM
 */

/**
 * Provides a REST Resource
 *
 * @RestResource(
 *   id = "delete_newscenter_data",
 *   label = @Translation("Delete News Center Data Resource"),
 *   uri_paths = {
 *     "canonical" = "/newscenter_rest_services/delete_data/{content_type}/{uuid}"
 *   }
 * )
 */
class DeleteUsingUUIDResource extends ResourceBase
{

    /**
     * Responds to entity DELETE requests.
     * @param $content_type
     * @param $uuid
     * @return \Drupal\rest\ResourceResponse
     * Throws exception expected.
     */
    public function delete($content_type, $uuid)
    {
        if (empty($content_type) || empty($uuid)) {
            throw new HttpException(400,"UUID or Content Type is empty");
        }
        if ($content_type !== 'newscenter_blog_entry' && $content_type !== 'newscenter_student_story') {
            throw new HttpException(400,"Content Type can only be of blog entry or student story type");
        }
        $entity_query_service = \Drupal::entityQuery('node');
        $entity_load_service = \Drupal::entityTypeManager()->getStorage('node');
        // Query for newscenter_blog_entry type node using unique identifier; if none exists, create one else update
        $nid = $entity_query_service->condition('status', 1)->condition('type', $content_type)
            ->condition('uuid', $uuid)->execute();
        if (!empty($nid)) {
            foreach ($nid as $node_id) {
                $node = null;
                $node = $entity_load_service->load($node_id);
                $node->delete();
            }
        }
        $response = ['message' => 'Request completed successfully'];
        $response['deleted_nids'] = $nid;
        return new ResourceResponse($response,200);
    }
}