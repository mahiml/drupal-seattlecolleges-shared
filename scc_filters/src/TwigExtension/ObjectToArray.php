<?php

namespace Drupal\scc_filters\TwigExtension;

class ObjectToArray extends \Twig_Extension
{

    /**
     * Generates a list of all Twig filters that this extension defines.
     */
    public function getFilters()
    {
        return array('cast_to_array' => new \Twig_SimpleFilter('cast_to_array', array($this, 'castObjectToArray')));
    }

    function castObjectToArray($stdClassObject)
    {
        $response = array();
        $castedObj = is_array($stdClassObject) ? $stdClassObject : json_decode(json_encode($stdClassObject), True);
        $response[] = $castedObj;
        print_r($castedObj);
        foreach ($castedObj as $key => $value) {
            $response[] = array($key, $value);
        }
        return $response;
    }

    public function getName()
    {
        return 'scc_filters.twig_extension';
    }
}