<?php
/**
 * Created by PhpStorm.
 * User: mahim
 * Date: 5/1/17
 * Time: 12:56 PM
 */

namespace Drupal\newscenter_rest_services\Form;
use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Url;

class FetchFromNewsCenterForm extends ConfigFormBase
{
    /**
     * {@inheritdoc}
     */
    public function getFormId() {
        return 'newscenter_rest_services_configuration_form';
    }

    /**
     * {@inheritdoc}
     */
    protected function getEditableConfigNames() {
        return [
            'newscenter_rest_services.settings',
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function buildForm(array $form, FormStateInterface $form_state) {
        $form['actions']['submit'] = array(
            '#type' => 'submit',
            '#value' => $this->t('Fetch Data From NewsCenter'),
            '#button_type' => 'primary',
        );
        $host = \Drupal::request()->getHost();
        $scheme = \Drupal::request()->getScheme();
        $port = \Drupal::request()->getPort();
        $action_url = $scheme . '://' . $host;
        if (!empty($port)) {
            $action_url = $action_url . ':' .$port;
        }
        $action_url = $action_url . '/news-center/getNewsBlogs';
        $form['#action'] = $action_url;
     return $form;
    }

    /**
     * {@inheritdoc}
     */
    public function submitForm(array &$form, FormStateInterface $form_state) {
        // Retrieve the configuration
        parent::submitForm($form, $form_state);
    }
}