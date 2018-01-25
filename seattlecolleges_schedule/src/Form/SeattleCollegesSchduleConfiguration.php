<?php
/**
 * Created by PhpStorm.
 * User: mahim
 * Date: 4/7/17
 * Time: 10:35 AM
 */

namespace Drupal\seattlecolleges_schedule\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Url;


class SeattleCollegesSchduleConfiguration extends ConfigFormBase
{
    /**
     * {@inheritdoc}
     */
    public function getFormId()
    {
        return 'seattlecolleges_schedule_configuration_form';
    }

    /**
     * {@inheritdoc}
     */
    protected function getEditableConfigNames()
    {
        return [
            'seattlecolleges_schedule_configuration.settings',
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function buildForm(array $form, FormStateInterface $form_state)
    {
        $config = $this->config('seattlecolleges_schedule_configuration.settings');

        $form['campusCode'] = array(
            '#type' => 'textfield',
            '#title' => $this->t('College Code (for ex. 062 for Central)'),
            '#default_value' =>  $config->get('campusCode'),
        );
        $form['getQuartersAPIEndpoint'] = array(
            '#type' => 'url',
            '#title' => $this->t('URL for getting the Quarters Data; leave it at the default value if you are not sure'),
            '#default_value' =>  $config->get('getQuartersAPIEndpoint'),
        );
        return parent::buildForm($form, $form_state);
    }

    public function validateForm(array &$form, FormStateInterface $form_state)
    {

        if (filter_var($form_state->getValue('getQuartersAPIEndpoint'), FILTER_VALIDATE_URL) === FALSE) {
            $form_state->setErrorByName('getQuartersAPIEndpoint', $this->t('This is not a valid URL!!'));
        }


    }

    /**
     * {@inheritdoc}
     */
    public function submitForm(array &$form, FormStateInterface $form_state)
    {
        // Retrieve the configuration
        $this->config($this->getEditableConfigNames()[0])->set('getQuartersAPIEndpoint', $form_state->getValue('getQuartersAPIEndpoint'))->save();
        $this->config($this->getEditableConfigNames()[0])->set('campusCode', $form_state->getValue('campusCode'))->save();
        $url = Url::fromRoute('system.modules_list');
        $form_state->setRedirectUrl($url);
        parent::submitForm($form, $form_state);
    }
}