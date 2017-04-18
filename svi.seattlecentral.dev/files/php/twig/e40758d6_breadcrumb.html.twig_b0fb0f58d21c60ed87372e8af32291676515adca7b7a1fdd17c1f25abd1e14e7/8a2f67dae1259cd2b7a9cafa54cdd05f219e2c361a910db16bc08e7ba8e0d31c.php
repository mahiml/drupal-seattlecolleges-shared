<?php

/* sites/svi.seattlecentral.dev/themes/custom/svi_heros/templates/breadcrumb.html.twig */
class __TwigTemplate_24381f47521217573f347f2abb6344e58a272cda9767a9dbc432a40391d1e062 extends Twig_Template
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
        $tags = array("set" => 12, "if" => 18, "for" => 19);
        $filters = array();
        $functions = array();

        try {
            $this->env->getExtension('sandbox')->checkSecurity(
                array('set', 'if', 'for'),
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

        // line 12
        $context["error_page_title"] = "Page Not Found!!";
        // line 13
        echo "<div class=\"container\">
    <div class=\"row\">
        <div class=\"col-md-12 breadcrumb-container\">
            <ol class=\"breadcrumb\">
                <li><a href=\"/\"><span class=\"sr-only\">Culinary home page</span><i class=\"icon ion-home\"></i></a></li>
                ";
        // line 18
        if (((isset($context["breadcrumb"]) ? $context["breadcrumb"] : null) && ((isset($context["current_page_title"]) ? $context["current_page_title"] : null) != (isset($context["error_page_title"]) ? $context["error_page_title"] : null)))) {
            // line 19
            echo "                    ";
            $context['_parent'] = $context;
            $context['_seq'] = twig_ensure_traversable((isset($context["breadcrumb"]) ? $context["breadcrumb"] : null));
            $context['loop'] = array(
              'parent' => $context['_parent'],
              'index0' => 0,
              'index'  => 1,
              'first'  => true,
            );
            if (is_array($context['_seq']) || (is_object($context['_seq']) && $context['_seq'] instanceof Countable)) {
                $length = count($context['_seq']);
                $context['loop']['revindex0'] = $length - 1;
                $context['loop']['revindex'] = $length;
                $context['loop']['length'] = $length;
                $context['loop']['last'] = 1 === $length;
            }
            foreach ($context['_seq'] as $context["_key"] => $context["item"]) {
                // line 20
                echo "                        ";
                if ( !$this->getAttribute($context["loop"], "last", array())) {
                    // line 21
                    echo "                            <li ";
                    echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->getAttribute($context["item"], "attributes", array()), "html", null, true));
                    echo ">
                                ";
                    // line 22
                    if ($this->getAttribute($context["item"], "url", array())) {
                        // line 23
                        echo "                                    <a href=\"";
                        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->getAttribute($context["item"], "url", array()), "html", null, true));
                        echo "\">";
                        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->getAttribute($context["item"], "text", array()), "html", null, true));
                        echo "</a>
                                ";
                    } else {
                        // line 25
                        echo "                                    ";
                        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->getAttribute($context["item"], "text", array()), "html", null, true));
                        echo "
                                ";
                    }
                    // line 27
                    echo "                            </li>
                        ";
                }
                // line 29
                echo "                    ";
                ++$context['loop']['index0'];
                ++$context['loop']['index'];
                $context['loop']['first'] = false;
                if (isset($context['loop']['length'])) {
                    --$context['loop']['revindex0'];
                    --$context['loop']['revindex'];
                    $context['loop']['last'] = 0 === $context['loop']['revindex0'];
                }
            }
            $_parent = $context['_parent'];
            unset($context['_seq'], $context['_iterated'], $context['_key'], $context['item'], $context['_parent'], $context['loop']);
            $context = array_intersect_key($context, $_parent) + $_parent;
            // line 30
            echo "                ";
        }
        // line 31
        echo "                <li class=\"active\">";
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, (isset($context["current_page_title"]) ? $context["current_page_title"] : null), "html", null, true));
        echo "</li>
            </ol>
        </div>
    </div>
</div>";
    }

    public function getTemplateName()
    {
        return "sites/svi.seattlecentral.dev/themes/custom/svi_heros/templates/breadcrumb.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  117 => 31,  114 => 30,  100 => 29,  96 => 27,  90 => 25,  82 => 23,  80 => 22,  75 => 21,  72 => 20,  54 => 19,  52 => 18,  45 => 13,  43 => 12,);
    }
}
/* {#*/
/* /***/
/*  * @file*/
/*  * Default theme implementation for a breadcrumb trail.*/
/*  **/
/*  * Available variables:*/
/*  * - breadcrumb: Breadcrumb trail items.*/
/*  **/
/*  * @ingroup templates*/
/*  *//* */
/* #}*/
/* {% set error_page_title = 'Page Not Found!!' %}*/
/* <div class="container">*/
/*     <div class="row">*/
/*         <div class="col-md-12 breadcrumb-container">*/
/*             <ol class="breadcrumb">*/
/*                 <li><a href="/"><span class="sr-only">Culinary home page</span><i class="icon ion-home"></i></a></li>*/
/*                 {% if breadcrumb and current_page_title != error_page_title %}*/
/*                     {% for item in breadcrumb %}*/
/*                         {% if not loop.last %}*/
/*                             <li {{ item.attributes }}>*/
/*                                 {% if item.url %}*/
/*                                     <a href="{{ item.url }}">{{ item.text }}</a>*/
/*                                 {% else %}*/
/*                                     {{ item.text }}*/
/*                                 {% endif %}*/
/*                             </li>*/
/*                         {% endif %}*/
/*                     {% endfor %}*/
/*                 {% endif %}*/
/*                 <li class="active">{{ current_page_title }}</li>*/
/*             </ol>*/
/*         </div>*/
/*     </div>*/
/* </div>*/
