<?php

/* sites/svi.seattlecentral.dev/themes/custom/svi_heros/templates/blocks/block--program-view-block.html.twig */
class __TwigTemplate_6db7e8c77465743a27f474e2534a4894a5022731f8a01b01c639b19105c773e3 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $tags = array("set" => 48, "if" => 68, "for" => 73);
        $filters = array("clean_class" => 50, "length" => 67);
        $functions = array("path" => 83, "file_url" => 84);

        try {
            $this->env->getExtension('sandbox')->checkSecurity(
                array('set', 'if', 'for'),
                array('clean_class', 'length'),
                array('path', 'file_url')
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

        // line 48
        $context["classes"] = array(0 => "block", 1 => ("block-" . \Drupal\Component\Utility\Html::getClass($this->getAttribute(        // line 50
(isset($context["configuration"]) ? $context["configuration"] : null), "provider", array()))), 2 => ("block-" . \Drupal\Component\Utility\Html::getClass(        // line 51
(isset($context["plugin_id"]) ? $context["plugin_id"] : null))), 3 => "clearfix");
        // line 54
        echo "
<section";
        // line 55
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->getAttribute((isset($context["attributes"]) ? $context["attributes"] : null), "addClass", array(0 => (isset($context["classes"]) ? $context["classes"] : null)), "method"), "html", null, true));
        echo ">
    <div class=\"container-fluid bg-grey\">
        <div class=\"container sc-single-column\">
            <div class=\"row\">
                <div class=\"col-md-12 program-page-secondary-content\">
                    <h2 class=\"programs-title\">";
        // line 60
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, (isset($context["label"]) ? $context["label"] : null), "html", null, true));
        echo "</h2>
                    ";
        // line 61
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->getAttribute((isset($context["content"]) ? $context["content"] : null), "body", array(), "array"), "html", null, true));
        echo "
                </div>
            </div>
        </div>
        <div class=\"container\">
            ";
        // line 66
        $context["should_close"] = 0;
        // line 67
        echo "            ";
        $context["size"] = (twig_length_filter($this->env, $this->getAttribute($this->getAttribute((isset($context["content"]) ? $context["content"] : null), "field_program_teasers", array(), "array"), "#items", array(), "array")) - 1);
        // line 68
        echo "            ";
        if (((isset($context["size"]) ? $context["size"] : null) == 8)) {
            // line 69
            echo "                ";
            $context["factor"] = 3;
            // line 70
            echo "            ";
        } else {
            // line 71
            echo "                ";
            $context["factor"] = 4;
            // line 72
            echo "            ";
        }
        // line 73
        echo "            ";
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable(range(0, (isset($context["size"]) ? $context["size"] : null)));
        foreach ($context['_seq'] as $context["_key"] => $context["index"]) {
            // line 74
            echo "            ";
            if ((($context["index"] >= 0) && (0 == $context["index"] % (isset($context["factor"]) ? $context["factor"] : null)))) {
                // line 75
                echo "            <div class=\"row\">
                ";
                // line 76
                $context["should_close"] = 1;
                // line 77
                echo "                ";
            }
            // line 78
            echo "                ";
            if (((isset($context["factor"]) ? $context["factor"] : null) == 3)) {
                // line 79
                echo "                <div class=\"col-sm-4 programs-module\">
                    ";
            } else {
                // line 81
                echo "                    <div class=\"col-sm-3 programs-module\">";
            }
            // line 82
            echo "                        <a tabindex=\"0\"
                           href=\"";
            // line 83
            echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->env->getExtension('drupal_core')->getPath("entity.node.canonical", array("node" => $this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute((isset($context["content"]) ? $context["content"] : null), "field_program_teasers", array(), "array"), "#items", array(), "array"), $context["index"], array(), "array"), "entity", array()), "nid", array()), 0, array()), "value", array()))), "html", null, true));
            echo " \">
                            <div style=\"background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.4)), url(";
            // line 84
            echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, call_user_func_array($this->env->getFunction('file_url')->getCallable(), array($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute((isset($context["content"]) ? $context["content"] : null), "field_program_teasers", array(), "array"), "#items", array(), "array"), $context["index"], array(), "array"), "entity", array()), "field_img", array()), 0, array()), "entity", array()), "uri", array()), "value", array()))), "html", null, true));
            echo "); background-size: cover;\"
                                 class=\"programs-module\">
                                <h3 class=\"programs-module-title\">";
            // line 86
            echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, ((($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute((isset($context["content"]) ? $context["content"] : null), "field_program_teasers", array(), "array", false, true), "#items", array(), "array", false, true), $context["index"], array(), "array", false, true), "entity", array(), "any", false, true), "field_program_name", array(), "any", false, true), 0, array(), "any", false, true), "value", array(), "any", true, true) &&  !(null === $this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute((isset($context["content"]) ? $context["content"] : null), "field_program_teasers", array(), "array", false, true), "#items", array(), "array", false, true), $context["index"], array(), "array", false, true), "entity", array(), "any", false, true), "field_program_name", array(), "any", false, true), 0, array(), "any", false, true), "value", array())))) ? ($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute((isset($context["content"]) ? $context["content"] : null), "field_program_teasers", array(), "array", false, true), "#items", array(), "array", false, true), $context["index"], array(), "array", false, true), "entity", array(), "any", false, true), "field_program_name", array(), "any", false, true), 0, array(), "any", false, true), "value", array())) : ($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute((isset($context["content"]) ? $context["content"] : null), "field_program_teasers", array(), "array"), "#items", array(), "array"), $context["index"], array(), "array"), "entity", array()), "title", array()), 0, array()), "value", array()))), "html", null, true));
            echo "
                                </h3>
                            </div>
                        </a>
                    </div>
                    ";
            // line 91
            if (((0 == ($context["index"] + 1) % (isset($context["factor"]) ? $context["factor"] : null)) && ((isset($context["should_close"]) ? $context["should_close"] : null) == 1))) {
                // line 92
                echo "                    ";
                $context["should_close"] = 0;
                // line 93
                echo "                    </div>
                    ";
            }
            // line 95
            echo "                ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['_key'], $context['index'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 96
        echo "                ";
        if (((isset($context["should_close"]) ? $context["should_close"] : null) == 1)) {
            // line 97
            echo "                    </div>
                ";
        }
        // line 99
        echo "        </div>
    </div>
    ";
        // line 104
        echo "</section>

";
    }

    public function getTemplateName()
    {
        return "sites/svi.seattlecentral.dev/themes/custom/svi_heros/templates/blocks/block--program-view-block.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  162 => 104,  158 => 99,  154 => 97,  151 => 96,  145 => 95,  141 => 93,  138 => 92,  136 => 91,  128 => 86,  123 => 84,  119 => 83,  116 => 82,  113 => 81,  109 => 79,  106 => 78,  103 => 77,  101 => 76,  98 => 75,  95 => 74,  90 => 73,  87 => 72,  84 => 71,  81 => 70,  78 => 69,  75 => 68,  72 => 67,  70 => 66,  62 => 61,  58 => 60,  50 => 55,  47 => 54,  45 => 51,  44 => 50,  43 => 48,);
    }
}
/* {#*/
/* /***/
/*  * @file*/
/*  * Default theme implementation to display a block.*/
/*  **/
/*  * Available variables:*/
/*  * - $block->subject: Block title.*/
/*  * - $content: Block content.*/
/*  * - $block->module: Module that generated the block.*/
/*  * - $block->delta: An ID for the block, unique within each module.*/
/*  * - $block->region: The block region embedding the current block.*/
/*  * - $classes: String of classes that can be used to style contextually through*/
/*  *   CSS. It can be manipulated through the variable $classes_array from*/
/*  *   preprocess functions. The default values can be one or more of the*/
/*  *   following:*/
/*  *   - block: The current template type, i.e., "theming hook".*/
/*  *   - block-[module]: The module generating the block. For example, the user*/
/*  *     module is responsible for handling the default user navigation block. In*/
/*  *     that case the class would be 'block-user'.*/
/*  * - $title_prefix (array): An array containing additional output populated by*/
/*  *   modules, intended to be displayed in front of the main title tag that*/
/*  *   appears in the template.*/
/*  * - $title_suffix (array): An array containing additional output populated by*/
/*  *   modules, intended to be displayed after the main title tag that appears in*/
/*  *   the template.*/
/*  **/
/*  * Helper variables:*/
/*  * - $classes_array: Array of html class attribute values. It is flattened*/
/*  *   into a string within the variable $classes.*/
/*  * - $block_zebra: Outputs 'odd' and 'even' dependent on each block region.*/
/*  * - $zebra: Same output as $block_zebra but independent of any block region.*/
/*  * - $block_id: Counter dependent on each block region.*/
/*  * - $id: Same output as $block_id but independent of any block region.*/
/*  * - $is_front: Flags true when presented in the front page.*/
/*  * - $logged_in: Flags true when the current user is a logged-in member.*/
/*  * - $is_admin: Flags true when the current user is an administrator.*/
/*  * - $block_html_id: A valid HTML ID and guaranteed unique.*/
/*  **/
/*  * @ingroup templates*/
/*  **/
/*  * @see bootstrap_preprocess_block()*/
/*  * @see template_preprocess()*/
/*  * @see template_preprocess_block()*/
/*  * @see bootstrap_process_block()*/
/*  * @see template_process()*/
/*  *//* */
/* #}*/
/* {% set classes = [*/
/* 'block',*/
/* 'block-' ~ configuration.provider|clean_class,*/
/* 'block-' ~ plugin_id|clean_class,*/
/* 'clearfix',*/
/* ] %}*/
/* */
/* <section{{ attributes.addClass(classes) }}>*/
/*     <div class="container-fluid bg-grey">*/
/*         <div class="container sc-single-column">*/
/*             <div class="row">*/
/*                 <div class="col-md-12 program-page-secondary-content">*/
/*                     <h2 class="programs-title">{{ label }}</h2>*/
/*                     {{ content['body'] }}*/
/*                 </div>*/
/*             </div>*/
/*         </div>*/
/*         <div class="container">*/
/*             {% set should_close = 0 %}*/
/*             {% set size =  content['field_program_teasers']['#items']|length-1 %}*/
/*             {% if size == 8 %}*/
/*                 {% set factor = 3 %}*/
/*             {% else %}*/
/*                 {% set factor = 4 %}*/
/*             {% endif %}*/
/*             {% for index in 0..size %}*/
/*             {% if index >= 0 and index is divisible by(factor) %}*/
/*             <div class="row">*/
/*                 {% set should_close = 1 %}*/
/*                 {% endif %}*/
/*                 {% if factor == 3 %}*/
/*                 <div class="col-sm-4 programs-module">*/
/*                     {% else %}*/
/*                     <div class="col-sm-3 programs-module">{% endif %}*/
/*                         <a tabindex="0"*/
/*                            href="{{ path('entity.node.canonical', {'node': content['field_program_teasers']['#items'][index].entity.nid.0.value }) }} ">*/
/*                             <div style="background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.4)), url({{ file_url(content['field_program_teasers']['#items'][index].entity.field_img.0.entity.uri.value) }}); background-size: cover;"*/
/*                                  class="programs-module">*/
/*                                 <h3 class="programs-module-title">{{ content['field_program_teasers']['#items'][index].entity.field_program_name.0.value ?? content['field_program_teasers']['#items'][index].entity.title.0.value }}*/
/*                                 </h3>*/
/*                             </div>*/
/*                         </a>*/
/*                     </div>*/
/*                     {% if (index+1) is divisible by(factor) and should_close == 1 %}*/
/*                     {% set should_close = 0 %}*/
/*                     </div>*/
/*                     {% endif %}*/
/*                 {% endfor %}*/
/*                 {% if should_close == 1 %}*/
/*                     </div>*/
/*                 {% endif %}*/
/*         </div>*/
/*     </div>*/
/*     {#{% block content %}*/
/*          content*/
/*     {% endblock %}#}*/
/* </section>*/
/* */
/* */
