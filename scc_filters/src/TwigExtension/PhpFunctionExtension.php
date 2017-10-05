<?php
/**
 * Created by PhpStorm.
 * User: mahim
 * Date: 8/31/16
 * Time: 11:03 AM
 */

namespace Drupal\scc_filters\TwigExtension;

use Drupal\Core\Url;
use Drupal\file\Entity\File;
use Twig_SimpleFunction;

class PhpFunctionExtension extends \Twig_Extension
{
    private $functions = array(
        'uniqid',
        'floor',
        'ceil',
        'addslashes',
        'chr',
        'chunk_​split',
        'convert_​uudecode',
        'crc32',
        'crypt',
        'hex2bin',
        'md5',
        'sha1',
        'strpos',
        'strrpos',
        'ucwords',
        'wordwrap',
        'gettype',
    );

    public function __construct(array $functions = array())
    {
        if ($functions) {
            $this->allowFunctions($functions);
        }
    }

    public function getPathFromUrl(Url $url)
    {
        return $url->toString();
    }

    public function getFunctions()
    {
        $twigFunctions = array();
        foreach ($this->functions as $function) {
            $twigFunctions[] = new Twig_SimpleFunction($function, $function);
        }
        $twigFunctions[] = new Twig_SimpleFunction('url_path', array($this, 'getPathFromUrl'));
        $twigFunctions[] = new Twig_SimpleFunction('show_rave_alert', array($this, 'getRaveAlert'));
        $twigFunctions[] = new Twig_SimpleFunction('get_image_uri', array($this, 'get_image_uri'));
        $twigFunctions[] = new \Twig_SimpleFunction('array_unset', array($this, 'arrayUnset'));
        return $twigFunctions;
    }

    public function allowFunction($function)
    {
        $this->functions[] = $function;
    }

    public function arrayUnset($array, $key)
    {
        unset($array[$key]);

        return $array;
    }

    public function allowFunctions(array $functions)
    {
        $this->functions = $functions;
    }

    public function getName()
    {
        return 'scc_filters_php_function';
    }

    public function getRaveAlert()
    {
        $code = '';
        try {
            $rave_alert = \Drupal::service('rave_alert_injected');
            $code = $rave_alert->DisplayCampusAlert();
        } catch (\Exception $exception) {
            $code = 'Error getting rave alert';
        } finally {
            return $code;
        }


    }

    /**
     * Get the set or default image uri for a file image field (if either
     * exist).
     * @param $entity
     * @param $fieldName
     * @return null|string
     */
    function get_image_uri($entity, $fieldName)
    {
        $image_uri = NULL;
        $object = $entity;
        // If a set value above wasn't found, try the default image.

        try {
            $field = $object->get($fieldName); // Loading from field definition
            if ($field) {
                // From the image module /core/modules/image/ImageFormatterBase.php
                // $default_image = $test->fieldDefinition->getFieldStorageDefinition()->getSetting('default_image');
                $default_image = $field->getSetting('default_image');
                if ($default_image && $default_image['uuid']) {
                    // $defaultImageFile = \Drupal::entityManager()->loadEntityByUuid('file', $default_image['uuid']));
                    // See https://www.drupal.org/node/2549139  entityManager is deprecated.
                    // Use entity.repository instead.
                    $entityrepository = \Drupal::service('entity.repository');
                    $defaultImageFile = $entityrepository->loadEntityByUuid('file', $default_image['uuid']);
                    if ($defaultImageFile) {
                        $image_uri = $defaultImageFile->getFileUri();
                    }
                }
            }
        } catch (\Exception $e) {
            \Drupal::logger('get_image_uri')->notice($e->getMessage(), []);
        }
        if ($wrapper = \Drupal::service('stream_wrapper_manager')->getViaUri($image_uri)) {
            return $wrapper->getExternalUrl();
        }else{
            return $image_uri;
        }
    }

    }