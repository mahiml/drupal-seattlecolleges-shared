<?php
/**
 * Created by PhpStorm.
 * User: mahim
 * Date: 4/7/17
 * Time: 10:35 AM
 */

namespace Drupal\home_page_alert\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Url;


class AlertConfigurationForm extends ConfigFormBase
{
    /**
     * {@inheritdoc}
     */
    public function getFormId()
    {
        return 'home_page_alert_configuration_block';
    }

    /**
     * {@inheritdoc}
     */
    protected function getEditableConfigNames()
    {
        return [
            'home_page_alert_configuration.settings',
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function buildForm(array $form, FormStateInterface $form_state)
    {
        $config = $this->config('home_page_alert_configuration.settings');

        $form['current_student_alert_url'] = array(
            '#type' => 'url',
            '#title' => $this->t('Endpoint where alerts for current student are published'),
            '#default_value' => $config->get('current_student_alert_url'),
        );

        $form['employee_alert_url'] = array(
            '#type' => 'url',
            '#title' => $this->t('Endpoint where alerts for employees are published'),
            '#default_value' => $config->get('employee_alert_url'),
        );

        $form['community_alert_url'] = array(
            '#type' => 'url',
            '#title' => $this->t('Endpoint where alerts for community are published'),
            '#default_value' => $config->get('community_alert_url'),
        );
        return parent::buildForm($form, $form_state);
    }

    public function validateForm(array &$form, FormStateInterface $form_state)
    {
        if (filter_var($form_state->getValue('current_student_alert_url'), FILTER_VALIDATE_URL) === FALSE) {
            $form_state->setErrorByName('current_student_alert_url', $this->t('Invalid URL.'));
        }
        if (filter_var($form_state->getValue('employee_alert_url'), FILTER_VALIDATE_URL) === FALSE) {
            $form_state->setErrorByName('employee_alert_url', $this->t('Invalid URL.'));
        }
        if (filter_var($form_state->getValue('community_alert_url'), FILTER_VALIDATE_URL) === FALSE) {
            $form_state->setErrorByName('community_alert_url', $this->t('Invalid URL.'));
        }

    }

    /**
     * {@inheritdoc}
     */
    public function submitForm(array &$form, FormStateInterface $form_state)
    {
        // Retrieve the configuration
        $this->config('home_page_alert_configuration.settings')->set('current_student_alert_url', $form_state->getValue('current_student_alert_url'))->save();
        $this->config('home_page_alert_configuration.settings')->set('employee_alert_url', $form_state->getValue('employee_alert_url'))->save();
        $this->config('home_page_alert_configuration.settings')->set('community_alert_url', $form_state->getValue('community_alert_url'))->save();
        $url = Url::fromRoute('system.modules_list');
        $form_state->setRedirectUrl($url);
        parent::submitForm($form, $form_state);
    }
}