<?php

/* sites/svi.seattlecentral.dev/themes/custom/svi_heros/templates/blocks/block--system-menu-block--main.html.twig */
class __TwigTemplate_be10fe2eede67717094a496600871b43dd29de310de351714a04459cbfbad2ac extends Twig_Template
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
        $tags = array("block" => 45);
        $filters = array();
        $functions = array();

        try {
            $this->env->getExtension('sandbox')->checkSecurity(
                array('block'),
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

        // line 35
        echo "<div class=\"sc-header-global-menu svi-visible-1200\">
    <div id=\"main-menu-div\" aria-label=\"Main Seattle Central College Menu\" tabindex=\"0\">
        <span class=\"sr-only\">Toggle global navigation</span>
        <i class=\"icon ion-navicon\"></i>
    </div>
</div>
<nav id=\"scSidenav\" class=\"sidenav\" role=\"navigation\"
     aria-label=\"Side Navigation containing all Seattle Central Menu options\">
    <a href=\"javascript:void(0)\" class=\"closebtn\" aria-label=\"Close\" tabindex=\"-1\">&times;</a>
    <div class=\"panel-group\" id=\"accordion\">
        ";
        // line 45
        $this->displayBlock('content', $context, $blocks);
        // line 48
        echo "    </div>
</nav>";
    }

    // line 45
    public function block_content($context, array $blocks = array())
    {
        // line 46
        echo "            ";
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, (isset($context["content"]) ? $context["content"] : null), "html", null, true));
        echo "
        ";
    }

    public function getTemplateName()
    {
        return "sites/svi.seattlecentral.dev/themes/custom/svi_heros/templates/blocks/block--system-menu-block--main.html.twig";
    }

    public function getDebugInfo()
    {
        return array (  66 => 46,  63 => 45,  58 => 48,  56 => 45,  44 => 35,);
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
/* #}*/
/* <div class="sc-header-global-menu svi-visible-1200">*/
/*     <div id="main-menu-div" aria-label="Main Seattle Central College Menu" tabindex="0">*/
/*         <span class="sr-only">Toggle global navigation</span>*/
/*         <i class="icon ion-navicon"></i>*/
/*     </div>*/
/* </div>*/
/* <nav id="scSidenav" class="sidenav" role="navigation"*/
/*      aria-label="Side Navigation containing all Seattle Central Menu options">*/
/*     <a href="javascript:void(0)" class="closebtn" aria-label="Close" tabindex="-1">&times;</a>*/
/*     <div class="panel-group" id="accordion">*/
/*         {% block content %}*/
/*             {{ content }}*/
/*         {% endblock %}*/
/*     </div>*/
/* </nav>*/
