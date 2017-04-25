<?php
/**
 * Created by PhpStorm.
 * User: mahim
 * Date: 4/7/17
 * Time: 10:35 AM
 */

namespace Drupal\newscenter_rest_services\Form;
use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Url;


class NewsCenterClientConfigurationForm extends ConfigFormBase
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
        $config = $this->config('newscenter_rest_services.settings');

        $form['news_center_blog_url'] = array(
            '#type' => 'url',
            '#title' => $this->t('Endpoint for getting blog entries from NewsCenter'),
            '#default_value' => $config->get('news_center_blog_url'),
        );

        $form['important_announcements_url'] = array(
            '#type' => 'url',
            '#title' => $this->t('Endpoint for getting important Announcements made from NewsCenter'),
            '#default_value' => $config->get('important_announcements_url'),
        );
        $form['student_stories_url'] = array(
            '#type' => 'url',
            '#title' => $this->t('Endpoint for getting student stories'),
            '#default_value' => $config->get('student_stories_url'),
        );

        return parent::buildForm($form, $form_state);
    }

    public function validateForm(array &$form, FormStateInterface $form_state) {
        if (filter_var($form_state->getValue('news_center_blog_url'), FILTER_VALIDATE_URL) === FALSE) {
            $form_state->setErrorByName('news_center_blog_url', $this->t('Invalid URL.'));
        }
        if (filter_var($form_state->getValue('important_announcements_url'), FILTER_VALIDATE_URL) === FALSE) {
            $form_state->setErrorByName('important_announcements_url', $this->t('Invalid URL.'));
        }
        if (filter_var($form_state->getValue('student_stories_url'), FILTER_VALIDATE_URL) === FALSE) {
            $form_state->setErrorByName('student_stories_url', $this->t('Invalid URL.'));
        }

    }

    /**
     * {@inheritdoc}
     */
    public function submitForm(array &$form, FormStateInterface $form_state) {
        // Retrieve the configuration
        $this->config('newscenter_rest_services.settings')->set('news_center_blog_url', $form_state->getValue('news_center_blog_url'))->save();
        $this->config('newscenter_rest_services.settings')->set('important_announcements_url', $form_state->getValue('important_announcements_url'))->save();
        $this->config('newscenter_rest_services.settings')->set('student_stories_url', $form_state->getValue('student_stories_url'))->save();
        $url = Url::fromRoute('system.modules_list');
        $form_state->setRedirectUrl($url);
        parent::submitForm($form, $form_state);
    }
}