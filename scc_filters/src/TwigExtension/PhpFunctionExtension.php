<?php
/**
 * Created by PhpStorm.
 * User: mahim
 * Date: 8/31/16
 * Time: 11:03 AM
 */

namespace Drupal\scc_filters\TwigExtension;

use Drupal\Core\Url;
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
        return $twigFunctions;
    }

    public function allowFunction($function)
    {
        $this->functions[] = $function;
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
}