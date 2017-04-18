<?php

/* sites/svi.seattlecentral.dev/themes/custom/svi_heros/templates/blocks/block--top-page-testimonial-block.html.twig */
class __TwigTemplate_d0d007934f0ac56a1571af0f47663f4b84cdcf866101f201b3bf8ce6deba1b75 extends Twig_Template
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
        $tags = array("set" => 54, "for" => 63, "if" => 71);
        $filters = array("clean_class" => 56, "length" => 63, "striptags" => 69);
        $functions = array("file_url" => 66);

        try {
            $this->env->getExtension('sandbox')->checkSecurity(
                array('set', 'for', 'if'),
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

        // line 54
        $context["classes"] = array(0 => "block", 1 => ("block-" . \Drupal\Component\Utility\Html::getClass($this->getAttribute(        // line 56
(isset($context["configuration"]) ? $context["configuration"] : null), "provider", array()))), 2 => ("block-" . \Drupal\Component\Utility\Html::getClass(        // line 57
(isset($context["plugin_id"]) ? $context["plugin_id"] : null))), 3 => "clearfix", 4 => "container-fluid", 5 => "bg-white");
        // line 60
        echo "<section";
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->getAttribute((isset($context["attributes"]) ? $context["attributes"] : null), "addClass", array(0 => (isset($context["classes"]) ? $context["classes"] : null)), "method"), "html", null, true));
        echo ">
    <div class=\"container\">
        <div class=\"row\">
            ";
        // line 63
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable(range(0, (twig_length_filter($this->env, $this->getAttribute($this->getAttribute((isset($context["content"]) ? $context["content"] : null), "field_patrons", array(), "array"), "#items", array(), "array")) - 1)));
        foreach ($context['_seq'] as $context["_key"] => $context["index"]) {
            // line 64
            echo "            <div class=\"col-md-8 col-md-offset-2 program-page-secondary-content\">
                <img class=\"img-responsive\"
                     src=\"";
            // line 66
            echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, call_user_func_array($this->env->getFunction('file_url')->getCallable(), array($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute((isset($context["content"]) ? $context["content"] : null), "field_img", array(), "array"), "#object", array(), "array"), "field_img", array()), 0, array()), "entity", array()), "uri", array()), "value", array()))), "html", null, true));
            echo "\"
                     alt=\"";
            // line 67
            echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute((isset($context["content"]) ? $context["content"] : null), "field_img", array(), "array"), "#object", array(), "array"), "field_img", array()), 0, array()), "alt", array()), "html", null, true));
            echo " \"
                     style=\"margin: 30px auto 0 auto;\"/>
                <p class=\"text-center sc-quote-text\">";
            // line 69
            echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, strip_tags($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute((isset($context["content"]) ? $context["content"] : null), "field_patrons", array(), "array"), "#items", array(), "array"), $context["index"], array(), "array"), "entity", array()), "field_member_blurb", array()), "value", array())), "html", null, true));
            echo "</p>
                <p class=\"text-center sc-person-quote\">";
            // line 70
            echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute((isset($context["content"]) ? $context["content"] : null), "field_patrons", array(), "array"), "#items", array(), "array"), $context["index"], array(), "array"), "entity", array()), "field_member_name", array()), "value", array()), "html", null, true));
            echo "</p>
                ";
            // line 71
            if ($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute((isset($context["content"]) ? $context["content"] : null), "field_patrons", array(), "array"), "#items", array(), "array"), $context["index"], array(), "array"), "entity", array()), "field_member_title", array()), "value", array())) {
                echo " <a tabindex=\"0\"
                        href= \"";
                // line 72
                echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute((isset($context["content"]) ? $context["content"] : null), "field_patrons", array(), "array"), "#items", array(), "array"), $context["index"], array(), "array"), "entity", array()), "field_member_title", array()), "value", array()), "html", null, true));
                echo "\"><p
                            class=\"text-center sc-person-quote\">Read More</p></a>
                ";
            }
            // line 75
            echo "                <img class=\"img-responsive img-circle\"
                     src=\"";
            // line 76
            echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, call_user_func_array($this->env->getFunction('file_url')->getCallable(), array($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute((isset($context["content"]) ? $context["content"] : null), "field_patrons", array(), "array"), "#items", array(), "array"), $context["index"], array(), "array"), "entity", array()), "field_img", array()), 0, array()), "entity", array()), "uri", array()), "value", array()))), "html", null, true));
            echo "\"
                     alt=\"";
            // line 77
            echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute((isset($context["content"]) ? $context["content"] : null), "field_patrons", array(), "array"), "#items", array(), "array"), $context["index"], array(), "array"), "entity", array()), "field_img", array()), 0, array()), "alt", array()), "html", null, true));
            echo "\"
                     style=\"border: 3px solid #fff; width: 150px; margin: 20px auto 20px auto;\"/>
                ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['_key'], $context['index'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 80
        echo "            </div>
        </div>
    </div>
</section>

";
    }

    public function getTemplateName()
    {
        return "sites/svi.seattlecentral.dev/themes/custom/svi_heros/templates/blocks/block--top-page-testimonial-block.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  105 => 80,  96 => 77,  92 => 76,  89 => 75,  83 => 72,  79 => 71,  75 => 70,  71 => 69,  66 => 67,  62 => 66,  58 => 64,  54 => 63,  47 => 60,  45 => 57,  44 => 56,  43 => 54,);
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
/*   <img src="{{ file_url(content['field_news_teasers']['#items'][index].entity.field_img.0.entity.uri.value) }} "*/
/*                                  alt=""*/
/*                                  style="width:100%">*/
/*                             <div class="card-container">*/
/*                                 <h4 class="article-headline"><a*/
/*                                             href="{{ content['field_news_teasers']['#items'][index].entity.field_links.0.uri }}">Growth*/
/*  *//* */
/* #}*/
/* {% set classes = [*/
/* 'block',*/
/* 'block-' ~ configuration.provider|clean_class,*/
/* 'block-' ~ plugin_id|clean_class,*/
/* 'clearfix','container-fluid', 'bg-white'*/
/* ] %}*/
/* <section{{ attributes.addClass(classes) }}>*/
/*     <div class="container">*/
/*         <div class="row">*/
/*             {% for index in 0..content['field_patrons']['#items']|length-1 %}*/
/*             <div class="col-md-8 col-md-offset-2 program-page-secondary-content">*/
/*                 <img class="img-responsive"*/
/*                      src="{{ file_url(content['field_img']['#object'].field_img.0.entity.uri.value) }}"*/
/*                      alt="{{ content['field_img']['#object'].field_img.0.alt }} "*/
/*                      style="margin: 30px auto 0 auto;"/>*/
/*                 <p class="text-center sc-quote-text">{{ content['field_patrons']['#items'][index].entity.field_member_blurb.value|striptags }}</p>*/
/*                 <p class="text-center sc-person-quote">{{ content['field_patrons']['#items'][index].entity.field_member_name.value }}</p>*/
/*                 {% if content['field_patrons']['#items'][index].entity.field_member_title.value %} <a tabindex="0"*/
/*                         href= "{{ content['field_patrons']['#items'][index].entity.field_member_title.value }}"><p*/
/*                             class="text-center sc-person-quote">Read More</p></a>*/
/*                 {% endif %}*/
/*                 <img class="img-responsive img-circle"*/
/*                      src="{{ file_url(content['field_patrons']['#items'][index].entity.field_img.0.entity.uri.value) }}"*/
/*                      alt="{{ content['field_patrons']['#items'][index].entity.field_img.0.alt }}"*/
/*                      style="border: 3px solid #fff; width: 150px; margin: 20px auto 20px auto;"/>*/
/*                 {% endfor %}*/
/*             </div>*/
/*         </div>*/
/*     </div>*/
/* </section>*/
/* */
/* */
