<?php

/* sites/svi.seattlecentral.dev/themes/custom/svi_heros/templates/nodes/node--article--teaser.html.twig */
class __TwigTemplate_9eaa91b407f22fdaf7ce9ae357be5f086f42515d3c6d02aed04c883d5af2d237 extends Twig_Template
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
        $tags = array("set" => 68, "if" => 72);
        $filters = array("striptags" => 77);
        $functions = array("path" => 71, "file_url" => 75);

        try {
            $this->env->getExtension('sandbox')->checkSecurity(
                array('set', 'if'),
                array('striptags'),
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

        // line 68
        $context["has_img"] = false;
        // line 69
        echo "<div class=\"media\">
    <div class=\"media-left\">
        <a href=\"";
        // line 71
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->env->getExtension('drupal_core')->getPath("entity.node.canonical", array("node" => $this->getAttribute((isset($context["node"]) ? $context["node"] : null), "id", array()))), "html", null, true));
        echo "\">
            ";
        // line 72
        if ($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute((isset($context["content"]) ? $context["content"] : null), "field_image", array(), "array"), "#items", array(), "array"), 0, array()), "entity", array()), "uri", array()), "value", array())) {
            // line 73
            echo "                ";
            $context["has_img"] = true;
            // line 74
            echo "                <img class=\"media-object pull-left\"
                     src=\"";
            // line 75
            echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, call_user_func_array($this->env->getFunction('file_url')->getCallable(), array($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute((isset($context["content"]) ? $context["content"] : null), "field_image", array(), "array"), "#items", array(), "array"), 0, array()), "entity", array()), "uri", array()), "value", array()))), "html", null, true));
            echo "\"
                     alt=\"";
            // line 76
            echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute((isset($context["content"]) ? $context["content"] : null), "field_image", array(), "array"), "#items", array(), "array"), 0, array()), "alt", array()), "html", null, true));
            echo "\"/>
                <h2 class=\"media-heading\">";
            // line 77
            echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, strip_tags($this->getAttribute($this->getAttribute($this->getAttribute((isset($context["node"]) ? $context["node"] : null), "title", array()), 0, array()), "value", array())), "html", null, true));
            echo "</h2>
            ";
        } else {
            // line 79
            echo "                <h2 class=\"media-heading\">";
            echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, strip_tags($this->getAttribute($this->getAttribute($this->getAttribute((isset($context["node"]) ? $context["node"] : null), "title", array()), 0, array()), "value", array())), "html", null, true));
            echo "</h2>
            ";
        }
        // line 81
        echo "        </a>
        <div class=\"media-body\">
            ";
        // line 83
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->getAttribute((isset($context["content"]) ? $context["content"] : null), "body", array(), "array"), "html", null, true));
        echo "
            ";
        // line 84
        if ($this->getAttribute((isset($context["content"]) ? $context["content"] : null), "addtoany", array(), "array")) {
            // line 85
            echo "            <br/>
            ";
            // line 86
            echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->getAttribute((isset($context["content"]) ? $context["content"] : null), "addtoany", array(), "array"), "html", null, true));
            echo "
            ";
        }
        // line 88
        echo "            ";
        if ($this->getAttribute((isset($context["content"]) ? $context["content"] : null), "links", array(), "array")) {
            // line 89
            echo "            <br/>
            ";
            // line 90
            echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->getAttribute((isset($context["content"]) ? $context["content"] : null), "links", array(), "array"), "html", null, true));
            echo "
            ";
        }
        // line 92
        echo "        </div>
    </div>
</div>

";
    }

    public function getTemplateName()
    {
        return "sites/svi.seattlecentral.dev/themes/custom/svi_heros/templates/nodes/node--article--teaser.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  109 => 92,  104 => 90,  101 => 89,  98 => 88,  93 => 86,  90 => 85,  88 => 84,  84 => 83,  80 => 81,  74 => 79,  69 => 77,  65 => 76,  61 => 75,  58 => 74,  55 => 73,  53 => 72,  49 => 71,  45 => 69,  43 => 68,);
    }
}
/* {#*/
/* /***/
/*  * @file*/
/*  * Theme override to display a node.*/
/*  **/
/*  * Available variables:*/
/*  * - node: The node entity with limited access to object properties and methods.*/
/*      Only "getter" methods (method names starting with "get", "has", or "is")*/
/*      and a few common methods such as "id" and "label" are available. Calling*/
/*      other methods (such as node.delete) will result in an exception.*/
/*  * - label: The title of the node.*/
/*  * - content: All node items. Use {{ content }} to print them all,*/
/*  *   or print a subset such as {{ content.field_example }}. Use*/
/*  *   {{ content|without('field_example') }} to temporarily suppress the printing*/
/*  *   of a given child element.*/
/*  * - author_picture: The node author user entity, rendered using the "compact"*/
/*  *   view mode.*/
/*  * - metadata: Metadata for this node.*/
/*  * - date: Themed creation date field.*/
/*  * - author_name: Themed author name field.*/
/*  * - url: Direct URL of the current node.*/
/*  * - display_submitted: Whether submission information should be displayed.*/
/*  * - attributes: HTML attributes for the containing element.*/
/*  *   The attributes.class element may contain one or more of the following*/
/*  *   classes:*/
/*  *   - node: The current template type (also known as a "theming hook").*/
/*  *   - node--type-[type]: The current node type. For example, if the node is an*/
/*  *     "Article" it would result in "node--type-article". Note that the machine*/
/*  *     name will often be in a short form of the human readable label.*/
/*  *   - node--view-mode-[view_mode]: The View Mode of the node; for example, a*/
/*  *     teaser would result in: "node--view-mode-teaser", and*/
/*  *     full: "node--view-mode-full".*/
/*  *   The following are controlled through the node publishing options.*/
/*  *   - node--promoted: Appears on nodes promoted to the front page.*/
/*  *   - node--sticky: Appears on nodes ordered above other non-sticky nodes in*/
/*  *     teaser listings.*/
/*  *   - node--unpublished: Appears on unpublished nodes visible only to site*/
/*  *     admins.*/
/*  * - title_attributes: Same as attributes, except applied to the main title*/
/*  *   tag that appears in the template.*/
/*  * - content_attributes: Same as attributes, except applied to the main*/
/*  *   content tag that appears in the template.*/
/*  * - author_attributes: Same as attributes, except applied to the author of*/
/*  *   the node tag that appears in the template.*/
/*  * - title_prefix: Additional output populated by modules, intended to be*/
/*  *   displayed in front of the main title tag that appears in the template.*/
/*  * - title_suffix: Additional output populated by modules, intended to be*/
/*  *   displayed after the main title tag that appears in the template.*/
/*  * - view_mode: View mode; for example, "teaser" or "full".*/
/*  * - teaser: Flag for the teaser state. Will be true if view_mode is 'teaser'.*/
/*  * - page: Flag for the full page state. Will be true if view_mode is 'full'.*/
/*  * - readmore: Flag for more state. Will be true if the teaser content of the*/
/*  *   node cannot hold the main body content.*/
/*  * - logged_in: Flag for authenticated user status. Will be true when the*/
/*  *   current user is a logged-in member.*/
/*  * - is_admin: Flag for admin user status. Will be true when the current user*/
/*  *   is an administrator.*/
/*  **/
/*  * @ingroup templates*/
/*  **/
/*  * @see template_preprocess_node()*/
/*  **/
/*  * @todo Remove the id attribute (or make it a class), because if that gets*/
/*  *   rendered twice on a page this is invalid CSS for example: two lists*/
/*  *   in different view modes.*/
/*  *//* */
/* #}*/
/* {% set has_img = false %}*/
/* <div class="media">*/
/*     <div class="media-left">*/
/*         <a href="{{ path('entity.node.canonical', {'node': node.id}) }}">*/
/*             {% if content['field_image']['#items'].0.entity.uri.value %}*/
/*                 {% set has_img = true %}*/
/*                 <img class="media-object pull-left"*/
/*                      src="{{ file_url(content['field_image']['#items'].0.entity.uri.value) }}"*/
/*                      alt="{{ content['field_image']['#items'].0.alt }}"/>*/
/*                 <h2 class="media-heading">{{node.title.0.value|striptags}}</h2>*/
/*             {% else %}*/
/*                 <h2 class="media-heading">{{node.title.0.value|striptags}}</h2>*/
/*             {% endif %}*/
/*         </a>*/
/*         <div class="media-body">*/
/*             {{ content['body'] }}*/
/*             {% if content['addtoany'] %}*/
/*             <br/>*/
/*             {{ content['addtoany'] }}*/
/*             {% endif %}*/
/*             {% if content['links'] %}*/
/*             <br/>*/
/*             {{ content['links'] }}*/
/*             {% endif %}*/
/*         </div>*/
/*     </div>*/
/* </div>*/
/* */
/* */
