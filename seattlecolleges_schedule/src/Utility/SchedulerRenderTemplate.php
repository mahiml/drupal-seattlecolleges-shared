<?php

namespace Drupal\seattlecolleges_schedule\Utility;

/**
 * Trait to implement a "drop-in" template for controllers
 *
 *  - Implement the getModuleName() member function.
 *  - Override the getDescriptionVariables() member function in order to
 *    pass variables to Twig needed to render your template.
 *
 * @see \Drupal\Core\Render\Element\InlineTemplate
 * @see https://www.drupal.org/developing/api/8/localization
 */
trait SchedulerRenderTemplate {

    /**
     * Generate a render array with our templated content.
     *
     * @return array
     *   A render array.
     */
    public function description() {
        $template_path = $this->getDescriptionTemplatePath();
        $template = file_get_contents($template_path);
        $build = [
            'description' => [
                '#type' => '#template',
                '#template' => $template,
                '#context' => $this->getDescriptionVariables(),
            ],
        ];
        return $build;
    }

    /**
     * Name of our module.
     *
     * @return string
     *   A module name.
     */
    abstract protected function getModuleName();

    /**
     * Variables to act as context to the twig template file.
     *
     * @return array
     *   Associative array that defines context for a template.
     */
    protected function getDescriptionVariables() {
        $variables = [
            'module' => $this->getModuleName(),
        ];
        return $variables;
    }

    /**
     * Get full path to the template.
     *
     * @return string
     *   Path string.
     */
    protected function getDescriptionTemplatePath() {
        return drupal_get_path('module', $this->getModuleName()) . "/templates/schedule.html.twig";
    }

}
