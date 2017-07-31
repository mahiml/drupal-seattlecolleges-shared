<?php
/**
 * Created by PhpStorm.
 * User: mahim
 * Date: 4/7/17
 * Time: 10:35 AM
 */

namespace Drupal\newscenter_configuration\Form;
use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Url;


class DeleteURLConfigurationForm extends ConfigFormBase
{
    /**
     * {@inheritdoc}
     */
    public function getFormId() {
        return 'newscenter_configuration_deleteURLs_configuration_form';
    }

    /**
     * {@inheritdoc}
     */
    protected function getEditableConfigNames() {
        return [
            'newscenter_configuration.settings',
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function buildForm(array $form, FormStateInterface $form_state) {
        $config = $this->config('newscenter_configuration.settings');

        $form['maritime_host_url'] = array(
            '#type' => 'url',
            '#title' => $this->t('Maritime Endpoint for deleting data from NewsCenter when it is deleted there'),
            '#default_value' => $config->get('maritime_host_url'),
        );

        $form['it_host_url'] = array(
            '#type' => 'url',
            '#title' => $this->t('IT Endpoint for deleting data from NewsCenter when it is deleted there'),
            '#default_value' => $config->get('it_host_url'),
        );

        $form['btm_host_url'] = array(
            '#type' => 'url',
            '#title' => $this->t('BTM Endpoint for deleting data from NewsCenter when it is deleted there'),
            '#default_value' => $config->get('btm_host_url'),
        );

        $form['culinary_host_url'] = array(
            '#type' => 'url',
            '#title' => $this->t('Culinary Endpoint for deleting data from NewsCenter when it is deleted there'),
            '#default_value' => $config->get('culinary_host_url'),
        );

        $form['foundation_host_url'] = array(
            '#type' => 'url',
            '#title' => $this->t('Foundation Endpoint for deleting data from NewsCenter when it is deleted there'),
            '#default_value' => $config->get('foundation_host_url'),
        );

        $form['bph_host_url'] = array(
            '#type' => 'url',
            '#title' => $this->t('BPH Endpoint for deleting data from NewsCenter when it is deleted there'),
            '#default_value' => $config->get('bph_host_url'),
        );

        $form['mac_host_url'] = array(
            '#type' => 'url',
            '#title' => $this->t('MAC Endpoint for deleting data from NewsCenter when it is deleted there'),
            '#default_value' => $config->get('mac_host_url'),
        );

        $form['alliedhealth_host_url'] = array(
            '#type' => 'url',
            '#title' => $this->t('AlliedHealth Endpoint for deleting data from NewsCenter when it is deleted there'),
            '#default_value' => $config->get('alliedhealth_host_url'),
        );

        $form['svi_host_url'] = array(
            '#type' => 'url',
            '#title' => $this->t('SVI Endpoint for deleting data from NewsCenter when it is deleted there'),
            '#default_value' => $config->get('svi_host_url'),
        );

        $form['woodtech_host_url'] = array(
            '#type' => 'url',
            '#title' => $this->t('Woodtech Endpoint for deleting data from NewsCenter when it is deleted there'),
            '#default_value' => $config->get('woodtech_host_url'),
        );

        $form['eduhumanservices_host_url'] = array(
            '#type' => 'url',
            '#title' => $this->t('EduAndHumanServices Endpoint for deleting data from NewsCenter when it is deleted there'),
            '#default_value' => $config->get('eduhumanservices_host_url'),
        );

        $form['creativearts_host_url'] = array(
            '#type' => 'url',
            '#title' => $this->t('CreativeArts Endpoint for deleting data from NewsCenter when it is deleted there'),
            '#default_value' => $config->get('creativearts_host_url'),
        );
        return parent::buildForm($form, $form_state);
    }

    public function validateForm(array &$form, FormStateInterface $form_state) {
        if (filter_var($form_state->getValue('maritime_host_url'), FILTER_VALIDATE_URL) === FALSE) {
            $form_state->setErrorByName('maritime_host_url', $this->t('Invalid URL.'));
        }
        if (filter_var($form_state->getValue('it_host_url'), FILTER_VALIDATE_URL) === FALSE) {
            $form_state->setErrorByName('it_host_url', $this->t('Invalid URL.'));
        }
        if (filter_var($form_state->getValue('btm_host_url'), FILTER_VALIDATE_URL) === FALSE) {
            $form_state->setErrorByName('btm_host_url', $this->t('Invalid URL.'));
        }
        if (filter_var($form_state->getValue('culinary_host_url'), FILTER_VALIDATE_URL) === FALSE) {
            $form_state->setErrorByName('culinary_host_url', $this->t('Invalid URL.'));
        }
        if (filter_var($form_state->getValue('foundation_host_url'), FILTER_VALIDATE_URL) === FALSE) {
            $form_state->setErrorByName('foundation_host_url', $this->t('Invalid URL.'));
        }
        if (filter_var($form_state->getValue('mac_host_url'), FILTER_VALIDATE_URL) === FALSE) {
            $form_state->setErrorByName('mac_host_url', $this->t('Invalid URL.'));
        }
        if (filter_var($form_state->getValue('bph_host_url'), FILTER_VALIDATE_URL) === FALSE) {
            $form_state->setErrorByName('bph_host_url', $this->t('Invalid URL.'));
        }
        if (filter_var($form_state->getValue('alliedhealth_host_url'), FILTER_VALIDATE_URL) === FALSE) {
            $form_state->setErrorByName('alliedhealth_host_url', $this->t('Invalid URL.'));
        }
        if (filter_var($form_state->getValue('svi_host_url'), FILTER_VALIDATE_URL) === FALSE) {
            $form_state->setErrorByName('svi_host_url', $this->t('Invalid URL.'));
        }
        if (filter_var($form_state->getValue('woodtech_host_url'), FILTER_VALIDATE_URL) === FALSE) {
            $form_state->setErrorByName('woodtech_host_url', $this->t('Invalid URL.'));
        }
        if (filter_var($form_state->getValue('eduhumanservices_host_url'), FILTER_VALIDATE_URL) === FALSE) {
            $form_state->setErrorByName('eduhumanservices_host_url', $this->t('Invalid URL.'));
        }
        if (filter_var($form_state->getValue('creativearts_host_url'), FILTER_VALIDATE_URL) === FALSE) {
            $form_state->setErrorByName('creativearts_host_url', $this->t('Invalid URL.'));
        }

    }

    /**
     * {@inheritdoc}
     */
    public function submitForm(array &$form, FormStateInterface $form_state) {
        // Retrieve the configuration
        $this->config('newscenter_configuration.settings')->set('maritime_host_url', $form_state->getValue('maritime_host_url'))->save();
        $this->config('newscenter_configuration.settings')->set('it_host_url', $form_state->getValue('it_host_url'))->save();
        $this->config('newscenter_configuration.settings')->set('btm_host_url', $form_state->getValue('btm_host_url'))->save();
        $this->config('newscenter_configuration.settings')->set('culinary_host_url', $form_state->getValue('culinary_host_url'))->save();
        $this->config('newscenter_configuration.settings')->set('foundation_host_url', $form_state->getValue('foundation_host_url'))->save();
        $this->config('newscenter_configuration.settings')->set('mac_host_url', $form_state->getValue('mac_host_url'))->save();
        $this->config('newscenter_configuration.settings')->set('bph_host_url', $form_state->getValue('bph_host_url'))->save();
        $this->config('newscenter_configuration.settings')->set('alliedhealth_host_url', $form_state->getValue('alliedhealth_host_url'))->save();
        $this->config('newscenter_configuration.settings')->set('svi_host_url', $form_state->getValue('svi_host_url'))->save();
        $this->config('newscenter_configuration.settings')->set('woodtech_host_url', $form_state->getValue('woodtech_host_url'))->save();
        $this->config('newscenter_configuration.settings')->set('eduhumanservices_host_url', $form_state->getValue('eduhumanservices_host_url'))->save();
        $this->config('newscenter_configuration.settings')->set('creativearts_host_url', $form_state->getValue('creativearts_host_url'))->save();

        $url = Url::fromRoute('system.modules_list');
        $form_state->setRedirectUrl($url);
        parent::submitForm($form, $form_state);
    }
}