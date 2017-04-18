<?php

/* sites/foundation.seattlecentral.dev/themes/custom/foundation_heros/templates/blocks/block--news-view-block.html.twig */
class __TwigTemplate_4ac44cd7854de96d8bba75083781d673ba8c2c2606833db657fdc49d1b6c3f26 extends Twig_Template
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
        $tags = array("set" => 48, "for" => 63);
        $filters = array("clean_class" => 50, "length" => 63, "striptags" => 71);
        $functions = array("file_url" => 55);

        try {
            $this->env->getExtension('sandbox')->checkSecurity(
                array('set', 'for'),
                array('clean_class', 'length', 'striptags'),
                array('file_url')
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
        echo "<section";
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->getAttribute((isset($context["attributes"]) ? $context["attributes"] : null), "addClass", array(0 => (isset($context["classes"]) ? $context["classes"] : null)), "method"), "html", null, true));
        echo ">
    <div style=\"background-image: url(";
        // line 55
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, call_user_func_array($this->env->getFunction('file_url')->getCallable(), array($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute((isset($context["content"]) ? $context["content"] : null), "field_img", array(), "array"), "#object", array(), "array"), "field_img", array()), 0, array()), "entity", array()), "uri", array()), "value", array()))), "html", null, true));
        echo ")\"  class=\"";
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute((isset($context["content"]) ? $context["content"] : null), "field_class_name", array(), "array"), "#items", array(), "array"), 0, array(), "array"), "value", array()), "html", null, true));
        echo "\">
        <div class=\"container\">
            <div class=\"row\">
                <div class=\"col-sm-12 program-page-secondary-content\">
                    <h2 class=\"news-feed-title\">";
        // line 59
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, (isset($context["label"]) ? $context["label"] : null), "html", null, true));
        echo "</h2>
                </div>
            </div>
            <div class=\"row\">
                ";
        // line 63
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable(range(0, (twig_length_filter($this->env, $this->getAttribute($this->getAttribute((isset($context["content"]) ? $context["content"] : null), "field_news_teasers", array(), "array"), "#items", array(), "array")) - 1)));
        foreach ($context['_seq'] as $context["_key"] => $context["index"]) {
            // line 64
            echo "                    <div class=\"col-sm-4\">
                        <div class=\"card\">
                            <img src=\"";
            // line 66
            echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, call_user_func_array($this->env->getFunction('file_url')->getCallable(), array($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute((isset($context["content"]) ? $context["content"] : null), "field_news_teasers", array(), "array"), "#items", array(), "array"), $context["index"], array(), "array"), "entity", array()), "field_img", array()), 0, array()), "entity", array()), "uri", array()), "value", array()))), "html", null, true));
            echo " \"
                                 alt=\"";
            // line 67
            echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute((isset($context["content"]) ? $context["content"] : null), "field_news_teasers", array(), "array"), "#items", array(), "array"), $context["index"], array(), "array"), "entity", array()), "field_img", array()), 0, array()), "alt", array()), "html", null, true));
            echo "\"
                                 style=\"width:100%\">
                            <div class=\"card-container\">
                                <h4 class=\"article-headline\"><a tabindex=\"0\"
                                            href=\"";
            // line 71
            echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute((isset($context["content"]) ? $context["content"] : null), "field_news_teasers", array(), "array"), "#items", array(), "array"), $context["index"], array(), "array"), "entity", array()), "field_links", array()), 0, array()), "uri", array()), "html", null, true));
            echo "\">";
            echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, strip_tags($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute((isset($context["content"]) ? $context["content"] : null), "field_news_teasers", array(), "array"), "#items", array(), "array"), $context["index"], array(), "array"), "entity", array()), "body", array()), "value", array())), "html", null, true));
            echo "</a></h4>
                            </div>
                        </div>
                    </div>
                ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['_key'], $context['index'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 76
        echo "            </div>
        </div>
    </div>
</section>

";
    }

    public function getTemplateName()
    {
        return "sites/foundation.seattlecentral.dev/themes/custom/foundation_heros/templates/blocks/block--news-view-block.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  100 => 76,  87 => 71,  80 => 67,  76 => 66,  72 => 64,  68 => 63,  61 => 59,  52 => 55,  47 => 54,  45 => 51,  44 => 50,  43 => 48,);
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
/* 'clearfix'*/
/* ] %}*/
/* <section{{ attributes.addClass(classes) }}>*/
/*     <div style="background-image: url({{ file_url(content['field_img']['#object'].field_img.0.entity.uri.value) }})"  class="{{ content['field_class_name']['#items'][0].value }}">*/
/*         <div class="container">*/
/*             <div class="row">*/
/*                 <div class="col-sm-12 program-page-secondary-content">*/
/*                     <h2 class="news-feed-title">{{ label }}</h2>*/
/*                 </div>*/
/*             </div>*/
/*             <div class="row">*/
/*                 {% for index in 0..content['field_news_teasers']['#items']|length-1 %}*/
/*                     <div class="col-sm-4">*/
/*                         <div class="card">*/
/*                             <img src="{{ file_url(content['field_news_teasers']['#items'][index].entity.field_img.0.entity.uri.value) }} "*/
/*                                  alt="{{ content['field_news_teasers']['#items'][index].entity.field_img.0.alt }}"*/
/*                                  style="width:100%">*/
/*                             <div class="card-container">*/
/*                                 <h4 class="article-headline"><a tabindex="0"*/
/*                                             href="{{ content['field_news_teasers']['#items'][index].entity.field_links.0.uri }}">{{ content['field_news_teasers']['#items'][index].entity.body.value|striptags}}</a></h4>*/
/*                             </div>*/
/*                         </div>*/
/*                     </div>*/
/*                 {% endfor %}*/
/*             </div>*/
/*         </div>*/
/*     </div>*/
/* </section>*/
/* */
/* */
