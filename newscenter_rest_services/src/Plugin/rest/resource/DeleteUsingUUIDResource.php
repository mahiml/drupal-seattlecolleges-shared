<?php

namespace Drupal\newscenter_rest_services\Plugin\rest\resource;

use Drupal\Core\Session\AccountProxyInterface;
use Drupal\node\Entity\Node;
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
 *   serialization_class = "Drupal\node\Entity\Node",
 *   label = @Translation("Delete News Center Data Resource"),
 *   uri_paths = {
 *     "canonical" = "/newscenter_rest_services/delete_data/{content_type}/{uuid}"
 *   }
 * )
 */
class DeleteUsingUUIDResource extends ResourceBase
{

    /**
     * Constructs a Drupal\rest\Plugin\ResourceBase object.
     *
     * @param array $configuration
     *   A configuration array containing information about the plugin instance.
     * @param string $plugin_id
     *   The plugin_id for the plugin instance.
     * @param mixed $plugin_definition
     *   The plugin implementation definition.
     * @param array $serializer_formats
     *   The available serialization formats.
     * @param \Psr\Log\LoggerInterface $logger
     *   A logger instance.
     */
    public function __construct(
        array $configuration,
        $plugin_id,
        $plugin_definition,
        array $serializer_formats,
        LoggerInterface $logger)
    {
        parent::__construct($configuration, $plugin_id, $plugin_definition, $serializer_formats, $logger);
    }

    /**
     * {@inheritdoc}
     */
    public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition)
    {
        return new static(
            $configuration,
            $plugin_id,
            $plugin_definition,
            $container->getParameter('serializer.formats'),
            $container->get('logger.factory')->get('newscenter_rest_services')
        );
    }

    /**
     * Responds to entity DELETE requests.
     * @param $node_type
     * @param $data
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