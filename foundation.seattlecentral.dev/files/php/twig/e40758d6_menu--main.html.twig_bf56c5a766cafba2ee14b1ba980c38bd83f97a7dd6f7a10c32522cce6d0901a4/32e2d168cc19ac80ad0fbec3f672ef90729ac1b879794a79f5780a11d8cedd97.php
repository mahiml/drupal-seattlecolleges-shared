<?php

/* themes/custom/scc_heros/templates/menu/menu--main.html.twig */
class __TwigTemplate_1d223b03a816e70d105a2075754b2708c61a0ac67913db17ea90008e45901110 extends Twig_Template
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
        $tags = array("import" => 18, "macro" => 25, "if" => 27, "for" => 28, "set" => 32);
        $filters = array("split" => 49);
        $functions = array("uniqid" => 32);

        try {
            $this->env->getExtension('sandbox')->checkSecurity(
                array('import', 'macro', 'if', 'for', 'set'),
                array('split'),
                array('uniqid')
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

        // line 18
        $context["menus"] = $this;
        // line 23
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->renderVar($context["menus"]->getmenu_links((isset($context["items"]) ? $context["items"] : null), 0, "accordion")));
        echo "

";
    }

    // line 25
    public function getmenu_links($__items__ = null, $__menu_level__ = null, $__parentHashId__ = null)
    {
        $context = $this->env->mergeGlobals(array(
            "items" => $__items__,
            "menu_level" => $__menu_level__,
            "parentHashId" => $__parentHashId__,
            "varargs" => func_num_args() > 3 ? array_slice(func_get_args(), 3) : array(),
        ));

        $blocks = array();

        ob_start();
        try {
            // line 26
            echo "    ";
            $context["menus"] = $this;
            // line 27
            echo "    ";
            if ((isset($context["items"]) ? $context["items"] : null)) {
                // line 28
                echo "        ";
                $context['_parent'] = $context;
                $context['_seq'] = twig_ensure_traversable((isset($context["items"]) ? $context["items"] : null));
                foreach ($context['_seq'] as $context["_key"] => $context["item"]) {
                    // line 29
                    echo "            ";
                    // line 32
                    echo "            ";
                    $context["hashId"] = uniqid();
                    // line 33
                    echo "            ";
                    if ($this->getAttribute($context["item"], "below", array())) {
                        // line 34
                        echo "                <div class=\"panel panel-default\">
                    <div class=\"panel-heading accordion-toggle collapsed\">
                        <h4 class=\"panel-title\">
                            <a data-toggle=\"collapse\" data-parent=\"#accordion\"
                               href=\"#";
                        // line 38
                        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, (isset($context["hashId"]) ? $context["hashId"] : null), "html", null, true));
                        echo "\" tabindex=\"-1\">";
                        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->getAttribute($context["item"], "title", array()), "html", null, true));
                        echo " <span
                                        class=\"caret\"></span></a>
                        </h4>
                    </div>
                    <div id=\"";
                        // line 42
                        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, (isset($context["hashId"]) ? $context["hashId"] : null), "html", null, true));
                        echo "\" class=\"panel-collapse collapse\">
                        <ul class=\"list-group\">
                            ";
                        // line 44
                        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->renderVar($context["menus"]->getmenu_links($this->getAttribute($context["item"], "below", array()), ((isset($context["menu_level"]) ? $context["menu_level"] : null) + 1), (isset($context["hashId"]) ? $context["hashId"] : null))));
                        echo "
                        </ul>
                    </div>
                </div>
            ";
                    } else {
                        // line 49
                        echo "                ";
                        $context["isGetStarted"] = ($this->getAttribute(twig_split_filter($this->env, $this->getAttribute($context["item"], "title", array()), "::"), 1, array(), "array") == "Button");
                        // line 50
                        echo "                ";
                        if ((isset($context["isGetStarted"]) ? $context["isGetStarted"] : null)) {
                            // line 51
                            echo "                    <div class=\"panel-heading\">
                        <h4 class=\"panel-title\">
                            <a href=\"";
                            // line 53
                            echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->getAttribute($context["item"], "url", array()), "html", null, true));
                            echo "\" class=\"btn btn-primary sc-cta-desktop-get-started pull-left\"
                               target=\"_blank\" role=\"button\" tabindex=\"-1\">";
                            // line 54
                            echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->getAttribute(twig_split_filter($this->env, $this->getAttribute($context["item"], "title", array()), "::"), 0, array(), "array"), "html", null, true));
                            echo " </a>
                        </h4>
                    </div>
                ";
                        } elseif (($this->getAttribute(twig_split_filter($this->env, $this->getAttribute(                        // line 57
$context["item"], "title", array()), "::"), 1, array(), "array") == "QL")) {
                            // line 58
                            echo "                    <div class=\"sc-visible-1200 panel panel-default\">
                        <div class=\"panel-heading\">
                            <h4 class=\"panel-title\">
                                <a target=\"_blank\" role=\"button\"
                                   href=\"";
                            // line 62
                            echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->getAttribute($context["item"], "url", array()), "html", null, true));
                            echo "\" tabindex=\"-1\">";
                            echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->getAttribute(twig_split_filter($this->env, $this->getAttribute($context["item"], "title", array()), "::"), 0, array(), "array"), "html", null, true));
                            echo "</a>
                            </h4>
                        </div>
                    </div>
                ";
                        } else {
                            // line 67
                            echo "                    <li class=\"list-group-item\"><a target=\"_blank\" href=\"";
                            echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->getAttribute($context["item"], "url", array()), "html", null, true));
                            echo "\" tabindex=\"-1\">";
                            echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->getAttribute($context["item"], "title", array()), "html", null, true));
                            echo "</a></li>
                ";
                        }
                        // line 69
                        echo "            ";
                    }
                    // line 70
                    echo "        ";
                }
                $_parent = $context['_parent'];
                unset($context['_seq'], $context['_iterated'], $context['_key'], $context['item'], $context['_parent'], $context['loop']);
                $context = array_intersect_key($context, $_parent) + $_parent;
                // line 71
                echo "    ";
            }
        } catch (Exception $e) {
            ob_end_clean();

            throw $e;
        } catch (Throwable $e) {
            ob_end_clean();

            throw $e;
        }

        return ('' === $tmp = ob_get_clean()) ? '' : new Twig_Markup($tmp, $this->env->getCharset());
    }

    public function getTemplateName()
    {
        return "themes/custom/scc_heros/templates/menu/menu--main.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  168 => 71,  162 => 70,  159 => 69,  151 => 67,  141 => 62,  135 => 58,  133 => 57,  127 => 54,  123 => 53,  119 => 51,  116 => 50,  113 => 49,  105 => 44,  100 => 42,  91 => 38,  85 => 34,  82 => 33,  79 => 32,  77 => 29,  72 => 28,  69 => 27,  66 => 26,  52 => 25,  45 => 23,  43 => 18,);
    }
}
/* {#*/
/* /***/
/*  * @file*/
/*  * Default theme implementation to display a menu.*/
/*  **/
/*  * Available variables:*/
/*  * - menu_name: The machine name of the menu.*/
/*  * - items: A nested list of menu items. Each menu item contains:*/
/*  *   - attributes: HTML attributes for the menu item.*/
/*  *   - below: The menu item child items.*/
/*  *   - title: The menu link title.*/
/*  *   - url: The menu link url, instance of \Drupal\Core\Url*/
/*  *   - localized_options: Menu link localized options.*/
/*  **/
/*  * @ingroup templates*/
/*  *//* */
/* #}*/
/* {% import _self as menus %}*/
/* {#*/
/*   We call a macro which calls itself to render the full tree.*/
/*   @see http://twig.sensiolabs.org/doc/tags/macro.html*/
/* #}*/
/* {{ menus.menu_links(items, 0, 'accordion') }}*/
/* */
/* {% macro menu_links(items, menu_level, parentHashId) %}*/
/*     {% import _self as menus %}*/
/*     {% if items %}*/
/*         {% for item in items %}*/
/*             {# {% if menu_level != 0 %}*/
/*                  <ul{{ attributes.addClass('dropdown-menu') }}>*/
/*              {% endif %} #}*/
/*             {% set hashId = uniqid() %}*/
/*             {% if item.below %}*/
/*                 <div class="panel panel-default">*/
/*                     <div class="panel-heading accordion-toggle collapsed">*/
/*                         <h4 class="panel-title">*/
/*                             <a data-toggle="collapse" data-parent="#accordion"*/
/*                                href="#{{ hashId }}" tabindex="-1">{{ item.title }} <span*/
/*                                         class="caret"></span></a>*/
/*                         </h4>*/
/*                     </div>*/
/*                     <div id="{{ hashId }}" class="panel-collapse collapse">*/
/*                         <ul class="list-group">*/
/*                             {{ menus.menu_links(item.below, menu_level + 1, hashId) }}*/
/*                         </ul>*/
/*                     </div>*/
/*                 </div>*/
/*             {% else %}*/
/*                 {% set isGetStarted = item.title|split("::")[1] == "Button" %}*/
/*                 {% if isGetStarted %}*/
/*                     <div class="panel-heading">*/
/*                         <h4 class="panel-title">*/
/*                             <a href="{{ item.url }}" class="btn btn-primary sc-cta-desktop-get-started pull-left"*/
/*                                target="_blank" role="button" tabindex="-1">{{ item.title|split("::")[0] }} </a>*/
/*                         </h4>*/
/*                     </div>*/
/*                 {% elseif item.title|split("::")[1] == "QL" %}*/
/*                     <div class="sc-visible-1200 panel panel-default">*/
/*                         <div class="panel-heading">*/
/*                             <h4 class="panel-title">*/
/*                                 <a target="_blank" role="button"*/
/*                                    href="{{ item.url }}" tabindex="-1">{{ item.title|split("::")[0] }}</a>*/
/*                             </h4>*/
/*                         </div>*/
/*                     </div>*/
/*                 {% else %}*/
/*                     <li class="list-group-item"><a target="_blank" href="{{ item.url }}" tabindex="-1">{{ item.title }}</a></li>*/
/*                 {% endif %}*/
/*             {% endif %}*/
/*         {% endfor %}*/
/*     {% endif %}*/
/* {% endmacro %}*/
