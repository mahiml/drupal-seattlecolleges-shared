<?php

namespace Drupal\enrollment_rest_services\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Url;
use Drupal\enrollment_rest_services\Plugin\rest\resource\GetEnrollmentContentResource;

/**
 * Created by PhpStorm.
 * User: mahim
 * Date: 10/4/17
 * Time: 1:34 PM
 */
class FetchEnrollmentContentForm extends FormBase
{
    /**
     * {@inheritdoc}
     */
    public function getFormId()
    {
        return 'enrollment_rest_services_fetch_form';
    }

    /**
     * {@inheritdoc}
     */
    public function buildForm(array $form, FormStateInterface $form_state)
    {
        $form['demographic_type'] = [
            '#type' => 'select',
            '#title' => $this->t('Demographic Type')];

        $form['demographic_type']['#options'] = array();
        foreach (GetEnrollmentContentResource::$allowed_types as $allowed_type) {
            $form['demographic_type']['#options'][] = $allowed_type;
        }

        $form['enrollment_data_url'] = [
            '#type' => 'textfield',
            '#title' => $this->t('enrollment data GET url')];

        $form['actions']['submit'] = array(
            '#type' => 'submit',
            '#value' => $this->t('Fetch Data From NewsCenter'),
            '#button_type' => 'primary',
        );
        return $form;
    }

    /**
     * {@inheritdoc}
     */
    public function submitForm(array &$form, FormStateInterface $form_state)
    {
        // Retrieve the configuration
        parent::submitForm($form, $form_state);
    }
}