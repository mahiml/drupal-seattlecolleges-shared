<?php

/* themes/custom/scc_heros/templates/blocks/block--student-profile-blocks.html.twig */
class __TwigTemplate_06036dad944b7c2e7f5ba403592d7495dbf9d9de4e258397a898d3c35b5579ef extends Twig_Template
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
        $tags = array("set" => 2, "for" => 3);
        $filters = array("length" => 2, "split" => 4);
        $functions = array();

        try {
            $this->env->getExtension('sandbox')->checkSecurity(
                array('set', 'for'),
                array('length', 'split'),
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

        // line 1
        echo "<div class=\"sc-header-home-page-links navbar-right\">
    ";
        // line 2
        $context["size"] = (twig_length_filter($this->env, $this->getAttribute($this->getAttribute((isset($context["content"]) ? $context["content"] : null), "field_profiles", array(), "array"), "#items", array(), "array")) - 1);
        // line 3
        echo "    ";
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable(range(0, (isset($context["size"]) ? $context["size"] : null)));
        foreach ($context['_seq'] as $context["_key"] => $context["index"]) {
            // line 4
            echo "        ";
            $context["tokens"] = twig_split_filter($this->env, $this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute((isset($context["content"]) ? $context["content"] : null), "field_profiles", array(), "array"), "#object", array(), "array"), "field_profiles", array()), $context["index"], array(), "array"), "title", array()), "***");
            // line 5
            echo "        <a class=\"btn btn-default\" href=\"";
            echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->getAttribute((isset($context["tokens"]) ? $context["tokens"] : null), 1, array(), "array"), "html", null, true));
            echo "\" target=\"_blank\" role=\"button\" tabindex=\"0\">";
            echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->getAttribute((isset($context["tokens"]) ? $context["tokens"] : null), 0, array(), "array"), "html", null, true));
            echo "</a>
    ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['_key'], $context['index'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 7
        echo "    <div class=\"btn-group\" role=\"toolbar\" aria-label=\"Quick Links button group in the toolbar\">
        <button type=\"button\" class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\"
                aria-expanded=\"false\" tabindex=\"0\">
            Quick Links <span class=\"caret\"></span>
        </button>
        ";
        // line 12
        $context["size"] = (twig_length_filter($this->env, $this->getAttribute($this->getAttribute((isset($context["content"]) ? $context["content"] : null), "field_quick_links_menu", array(), "array"), "#items", array(), "array")) - 1);
        // line 13
        echo "        <ul class=\"dropdown-menu\">
            ";
        // line 14
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable(range(0, (isset($context["size"]) ? $context["size"] : null)));
        foreach ($context['_seq'] as $context["_key"] => $context["index"]) {
            // line 15
            echo "                <li>
                    <a target=\"_blank\" href=\"";
            // line 16
            echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->getAttribute($this->getAttribute($this->getAttribute((isset($context["content"]) ? $context["content"] : null), "field_quick_links_menu", array()), $context["index"], array(), "array"), "#url", array(), "array"), "html", null, true));
            echo "\">";
            echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->getAttribute($this->getAttribute($this->getAttribute((isset($context["content"]) ? $context["content"] : null), "field_quick_links_menu", array()), $context["index"], array(), "array"), "#title", array(), "array"), "html", null, true));
            echo "</a>
                </li>
            ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['_key'], $context['index'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 19
        echo "        </ul>
    </div>
</div>";
    }

    public function getTemplateName()
    {
        return "themes/custom/scc_heros/templates/blocks/block--student-profile-blocks.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  97 => 19,  86 => 16,  83 => 15,  79 => 14,  76 => 13,  74 => 12,  67 => 7,  56 => 5,  53 => 4,  48 => 3,  46 => 2,  43 => 1,);
    }
}
/* <div class="sc-header-home-page-links navbar-right">*/
/*     {% set size =  content['field_profiles']['#items']|length -1 %}*/
/*     {% for index in 0..size %}*/
/*         {% set tokens =  content['field_profiles']['#object'].field_profiles[index].title|split("***") %}*/
/*         <a class="btn btn-default" href="{{ tokens[1] }}" target="_blank" role="button" tabindex="0">{{ tokens[0] }}</a>*/
/*     {% endfor %}*/
/*     <div class="btn-group" role="toolbar" aria-label="Quick Links button group in the toolbar">*/
/*         <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true"*/
/*                 aria-expanded="false" tabindex="0">*/
/*             Quick Links <span class="caret"></span>*/
/*         </button>*/
/*         {% set size =  content['field_quick_links_menu']['#items']|length - 1 %}*/
/*         <ul class="dropdown-menu">*/
/*             {% for index in 0..size %}*/
/*                 <li>*/
/*                     <a target="_blank" href="{{ content.field_quick_links_menu[index]['#url'] }}">{{ content.field_quick_links_menu[index]['#title'] }}</a>*/
/*                 </li>*/
/*             {% endfor %}*/
/*         </ul>*/
/*     </div>*/
/* </div>*/
