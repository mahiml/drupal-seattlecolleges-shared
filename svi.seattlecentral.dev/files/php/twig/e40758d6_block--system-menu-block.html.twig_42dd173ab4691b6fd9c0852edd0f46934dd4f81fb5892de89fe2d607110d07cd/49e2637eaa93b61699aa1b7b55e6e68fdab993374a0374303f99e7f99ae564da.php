<?php

/* sites/svi.seattlecentral.dev/themes/custom/svi_heros/templates/blocks/block--system-menu-block.html.twig */
class __TwigTemplate_c2bc455ab8d027d377bd36dc8338c5b7dd66825018d5d3378d4185833fc09e7b extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
            'content' => array($this, 'block_content'),
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $tags = array("if" => 45, "block" => 51);
        $filters = array();
        $functions = array();

        try {
            $this->env->getExtension('sandbox')->checkSecurity(
                array('if', 'block'),
                array(),
                array()
            );
        } catch (Twig_Sandbox_SecurityError $e) {
            $e->setTemplateFile($this->getTemplateName());

            if ($e instanceof Twig_Sandbox_SecurityNotAllowedTagError && isset($tags[$e->getTagName()])) {
                $e->setTemplateLine($tags[$e->getTagName()]);
            } elseif ($e instanceof Twig_Sandbox_SecurityNotAllowedFilterError && isset($filters[$e->getFilterName()])) {
                $e->setTemplateLine($filters[$e->getFilterName()]);
            } elseif ($e instanceof Twig_Sandbox_SecurityNotAllowedFunctionError && isset($functions[$e->getFunctionName()])) {
                $e->setTemplateLine($functions[$e->getFunctionName()]);
            }

            throw $e;
        }

        // line 36
        echo "<nav role=\"navigation\" class=\"navbar navbar-default svi-invisible-1200\">
    <div class=\"container\">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class=\"navbar-header\">
            <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\"
                    data-target=\"#sc-section-navbar-collapse\" aria-expanded=\"false\">
                <span class=\"sr-only\">Toggle section navigation</span>
                Menu
            </button>
            ";
        // line 45
        if ((array_key_exists("label", $context) &&  !twig_test_empty((isset($context["label"]) ? $context["label"] : null)))) {
            // line 46
            echo "                <a class=\"navbar-brand\" tabindex=\"0\" href=\"/\">";
            echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, (isset($context["label"]) ? $context["label"] : null), "html", null, true));
            echo "</a>
            ";
        }
        // line 48
        echo "        </div>
        <div class=\"collapse navbar-collapse\" id=\"sc-section-navbar-collapse\">
            <ul class=\"nav navbar-nav\">
                ";
        // line 51
        $this->displayBlock('content', $context, $blocks);
        // line 54
        echo "            </ul>
        </div>
    </div>
</nav>";
    }

    // line 51
    public function block_content($context, array $blocks = array())
    {
        // line 52
        echo "                    ";
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, (isset($context["content"]) ? $context["content"] : null), "html", null, true));
        echo "
                ";
    }

    public function getTemplateName()
    {
        return "sites/svi.seattlecentral.dev/themes/custom/svi_heros/templates/blocks/block--system-menu-block.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  80 => 52,  77 => 51,  70 => 54,  68 => 51,  63 => 48,  57 => 46,  55 => 45,  44 => 36,);
    }
}
/* {#*/
/* /***/
/* * @file*/
/* * Default theme implementation for a menu block.*/
/* **/
/* * Available variables:*/
/* * - plugin_id: The ID of the block implementation.*/
/* * - label: The configured label of the block if visible.*/
/* * - configuration: A list of the block's configuration values.*/
/* *   - label: The configured label for the block.*/
/* *   - label_display: The display settings for the label.*/
/* *   - provider: The module or other provider that provided this block plugin.*/
/* *   - Block plugin specific settings will also be stored here.*/
/* * - content: The content of this block.*/
/* * - attributes: HTML attributes for the containing element.*/
/* *   - id: A valid HTML ID and guaranteed unique.*/
/* * - title_attributes: HTML attributes for the title element.*/
/* * - content_attributes: HTML attributes for the content element.*/
/* * - title_prefix: Additional output populated by modules, intended to be*/
/* *   displayed in front of the main title tag that appears in the template.*/
/* * - title_suffix: Additional output populated by modules, intended to be*/
/* *   displayed after the main title tag that appears in the template.*/
/* **/
/* * Headings should be used on navigation menus that consistently appear on*/
/* * multiple pages. When this menu block's label is configured to not be*/
/* * displayed, it is automatically made invisible using the 'visually-hidden' CSS*/
/* * class, which still keeps it visible for screen-readers and assistive*/
/* * technology. Headings allow screen-reader and keyboard only users to navigate*/
/* * to or skip the links.*/
/* * See http://juicystudio.com/article/screen-readers-display-none.php and*/
/* * http://www.w3.org/TR/WCAG-TECHS/H42.html for more information.*/
/* **/
/* * @ingroup templates*/
/* *//* */
/* #}*/
/* <nav role="navigation" class="navbar navbar-default svi-invisible-1200">*/
/*     <div class="container">*/
/*         <!-- Brand and toggle get grouped for better mobile display -->*/
/*         <div class="navbar-header">*/
/*             <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"*/
/*                     data-target="#sc-section-navbar-collapse" aria-expanded="false">*/
/*                 <span class="sr-only">Toggle section navigation</span>*/
/*                 Menu*/
/*             </button>*/
/*             {% if label is defined and label is not empty %}*/
/*                 <a class="navbar-brand" tabindex="0" href="/">{{ label }}</a>*/
/*             {% endif %}*/
/*         </div>*/
/*         <div class="collapse navbar-collapse" id="sc-section-navbar-collapse">*/
/*             <ul class="nav navbar-nav">*/
/*                 {% block content %}*/
/*                     {{ content }}*/
/*                 {% endblock %}*/
/*             </ul>*/
/*         </div>*/
/*     </div>*/
/* </nav>*/
