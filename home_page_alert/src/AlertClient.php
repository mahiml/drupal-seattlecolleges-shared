<?php

namespace Drupal\home_page_alert;

use \Exception as Exception;

/**
 * Created by PhpStorm.
 * User: mahim
 * Date: 3/23/17
 * Time: 12:44 PM
 */
class AlertClient
{
    public function __construct()
    {
    }

    public static function create()
    {
    }

    public function ShowCurrentStudentAlert()
    {
        $config = \Drupal::config('home_page_alert_configuration.settings');
        $url = $config->get('current_student_alert_url');
        return $this->fetch_and_return($url);
    }

    public function ShowEmployeeAlert()
    {
        $config = \Drupal::config('home_page_alert_configuration.settings');
        $url = $config->get('employee_alert_url');
        return $this->fetch_and_return($url);
    }

    public function ShowCommunityAlert()
    {
        $config = \Drupal::config('home_page_alert_configuration.settings');
        $url = $config->get('community_alert_url');
        return $this->fetch_and_return($url);
    }

    private function fetch_and_return($url)
    {
        $alert_data = '';
        try {
            $json = json_decode(file_get_contents($url));
            if (is_null($json) || empty($json)) {
                return array(
                    '#markup' => $alert_data,
                );
            }
            $alert_data = "<div class=\"alert alert-success alert-dismissible \" role=\"alert\">
                                        <a href=\"#\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">&times;</a>"
                                    . $json[0]->body[0]->value . "</div>";
        } catch (Exception $ex) {
            \Drupal::logger('home_page_alert')->error($ex->getMessage());
        }
        return array(
            '#markup' => $alert_data
        );

    }
}