<?php
/**
 * Created by PhpStorm.
 * User: mahim
 * Date: 4/25/17
 * Time: 2:00 PM
 */

namespace Drupal\rest_services\Exceptions;

class MissingRequiredFieldException extends \RuntimeException
{
    protected $title;

    public function __construct($title, $message, $code = 0, Exception $previous = null)
    {
        $this->title = $title;
        parent::__construct($message, $code, $previous);

    }

    public function getTitle()
    {
        return $this->title;
    }
}