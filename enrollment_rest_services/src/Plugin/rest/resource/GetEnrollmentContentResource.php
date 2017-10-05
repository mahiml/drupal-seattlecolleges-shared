<?php

namespace Drupal\enrollment_rest_services\Plugin\rest\resource;

use Drupal\rest\Plugin\ResourceBase;
use Drupal\rest\ResourceResponse;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Drupal\paragraphs\Entity\Paragraph;
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
 *   id = "get_enrollment_content",
 *   label = @Translation("Get enrollment tabs data for a specific student type"),
 *   uri_paths = {
 *     "canonical" = "/enrollment_rest_services/{demographic_type}",
 *   }
 * )
 */
class GetEnrollmentContentResource extends ResourceBase
{
    public static $allowed_types = ['New-Student', 'Returning-Student', 'International-Student', 'Pre-College', 'Finish-High-School', 'Continuing-Education', 'eLearning', 'Veteran-Military-Dependent', 'Transfer',
        'Senior-Retiree', 'Washington-State-Employee-Tuition-Exemption'];

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
            $container->get('logger.factory')->get('enrollment_rest_services')
        );
    }

    /**
     * Responds to GET requests.
     *
     * Returns a enrollment tabs content for specific demographic type
     *
     * @param string $demographic_type
     *   The demographic trype.
     *
     * @return \Drupal\rest\ResourceResponse
     *   The response containing the enrollment tab data.
     *
     * @throws \Symfony\Component\HttpKernel\Exception\NotFoundHttpException
     *   Thrown when the log entry was not found.
     * @throws \Symfony\Component\HttpKernel\Exception\BadRequestHttpException
     *   Thrown when no log entry was provided.
     */

    public function get($demographic_type)
    {
        if (!isset($demographic_type) || trim($demographic_type) === '') {
            throw new HttpException(400, "Demographic type cannot be null or empty");
        }

        if (!in_array($demographic_type, GetEnrollmentContentResource::$allowed_types)) {
            throw new HttpException(400, "Incorrect demographic type passed. It can only be one of the following" . implode(',', GetEnrollmentContentResource::$allowed_types));
        }

        $entity_query_service = \Drupal::entityQuery('node');
        $entity_load_service = \Drupal::entityTypeManager()->getStorage('node');
        // Query for enrollment-process-tabs type node using unique identifier; if none exists, create one else update
        $nid = $entity_query_service->condition('status', 1)->condition('type', 'enrollment_process_tabs')
            ->condition('field_demographic_type', $demographic_type)->execute();
        $to_return = null;
        if (!empty($nid)) {
            foreach ($nid as $node_id) {
                $to_return = $entity_load_service->load($node_id);
                break;
            }
        }
        $referenceItems = $to_return->get('field_enrollment_tabs')->referencedEntities();
        $to_return = [];
        foreach($referenceItems as $enrollment_step){
            $enrollment_step_paragraph = Paragraph::load($enrollment_step->id());
            $enrollment_step_tabs = $enrollment_step_paragraph->get('field_tab_section');
            foreach($enrollment_step_tabs as $enrollment_step_tab){
                $loaded_section = Paragraph::load($enrollment_step_tab->getValue()['target_id']);
                $tab_title = $loaded_section->get('field_tab_section_title');
                $tab_body =  Paragraph::load($loaded_section->get('field_tab_section_body')->getValue()[0]['target_id']);
                $to_return[$tab_title->get(0)->value]=$tab_body->get('field_text')->get(0)->value;
            }
        }

        $response = new ResourceResponse($to_return, 200);
        return $response;
    }
}