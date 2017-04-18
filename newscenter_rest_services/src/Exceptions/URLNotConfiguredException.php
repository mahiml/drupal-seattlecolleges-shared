<?php
namespace Drupal\rest_services\Exceptions;
use \Exception as Exception;
/**
 * Created by PhpStorm.
 * User: mahim
 * Date: 4/7/17
 * Time: 10:29 AM
 */
class URLNotConfiguredException extends Exception
{
    protected $title;

    public function __construct($title, $message, $code = 0, Exception $previous = null) {
        $this->title = $title;
        parent::__construct($message, $code, $previous);

    }

    public function getTitle(){
        return $this->title;
    }
}