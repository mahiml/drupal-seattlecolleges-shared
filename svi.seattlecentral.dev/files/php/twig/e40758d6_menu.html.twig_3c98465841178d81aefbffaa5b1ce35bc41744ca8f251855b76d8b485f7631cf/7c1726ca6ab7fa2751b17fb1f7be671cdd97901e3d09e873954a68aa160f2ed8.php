<?php

/* sites/svi.seattlecentral.dev/themes/custom/svi_heros/templates/menus/menu.html.twig */
class __TwigTemplate_cab25b3c25e5d09081427807de52d5230f7ee0700bbfb53af55cc1eb64e717f5 extends Twig_Template
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
        $tags = array("import" => 19, "macro" => 25, "if" => 27, "for" => 28);
        $filters = array();
        $functions = array();

        try {
            $this->env->getExtension('sandbox')->checkSecurity(
                array('import', 'macro', 'if', 'for'),
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

        // line 18
        echo "
";
        // line 19
        $context["menus"] = $this;
        // line 24
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->renderVar($context["menus"]->getmenu_links((isset($context["items"]) ? $context["items"] : null), (isset($context["attributes"]) ? $context["attributes"] : null), 0)));
        echo "
";
    }

    // line 25
    public function getmenu_links($__items__ = null, $__attributes__ = null, $__menu_level__ = null)
    {
        $context = $this->env->mergeGlobals(array(
            "items" => $__items__,
            "attributes" => $__attributes__,
            "menu_level" => $__menu_level__,
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
                    if ($this->getAttribute($context["item"], "below", array())) {
                        // line 30
                        echo "                ";
                        if (((isset($context["menu_level"]) ? $context["menu_level"] : null) == 0)) {
                            // line 31
                            echo "                    <li class=\"dropdown\" tabindex=\"0\">
                    <a tabindex=\"-1\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\"
                       aria-haspopup=\"true\" href=\"#\" aria-expanded=\"false\">";
                            // line 33
                            echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->getAttribute($context["item"], "title", array()), "html", null, true));
                            echo " <span class=\"caret\"></span></a>
                ";
                        } else {
                            // line 34
                            echo " <li class=\"dropdown-submenu\">
                    <a href=\"#\">";
                            // line 35
                            echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->getAttribute($context["item"], "title", array()), "html", null, true));
                            echo " <span class=\"caret\"></span></a>
                ";
                        }
                        // line 37
                        echo "                <ul class=\"dropdown-menu\" role=\"menu\">
                    ";
                        // line 38
                        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->renderVar($context["menus"]->getmenu_links($this->getAttribute($context["item"], "below", array()), (isset($context["attributes"]) ? $context["attributes"] : null), ((isset($context["menu_level"]) ? $context["menu_level"] : null) + 1))));
                        echo "
                </ul>
                </li>
            ";
                    } else {
                        // line 42
                        echo "                <li><a ";
                        if (((isset($context["menu_level"]) ? $context["menu_level"] : null) == 2)) {
                            echo " class=\"second-level-smallscreens\" tabindex=\"-1\"";
                        }
                        // line 43
                        echo "                            href=\"";
                        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->getAttribute($context["item"], "url", array()), "html", null, true));
                        echo "\" ";
                        if (((isset($context["menu_level"]) ? $context["menu_level"] : null) == 0)) {
                            echo " tabindex=\"0\" ";
                        } elseif (((isset($context["menu_level"]) ? $context["menu_level"] : null) == 1)) {
                            echo "tabindex=\"-1\"";
                        }
                        echo ">";
                        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->getAttribute($context["item"], "title", array()), "html", null, true));
                        echo "</a></li>
            ";
                    }
                    // line 45
                    echo "        ";
                }
                $_parent = $context['_parent'];
                unset($context['_seq'], $context['_iterated'], $context['_key'], $context['item'], $context['_parent'], $context['loop']);
                $context = array_intersect_key($context, $_parent) + $_parent;
                // line 46
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
        return "sites/svi.seattlecentral.dev/themes/custom/svi_heros/templates/menus/menu.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  137 => 46,  131 => 45,  117 => 43,  112 => 42,  105 => 38,  102 => 37,  97 => 35,  94 => 34,  89 => 33,  85 => 31,  82 => 30,  79 => 29,  74 => 28,  71 => 27,  68 => 26,  54 => 25,  48 => 24,  46 => 19,  43 => 18,);
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
/* */
/* {% import _self as menus %}*/
/* {#*/
/*   We call a macro which calls itself to render the full tree.*/
/*   @see http://twig.sensiolabs.org/doc/tags/macro.html*/
/* #}*/
/* {{ menus.menu_links(items, attributes, 0) }}*/
/* {% macro menu_links(items, attributes, menu_level) %}*/
/*     {% import _self as menus %}*/
/*     {% if items %}*/
/*         {% for item in items %}*/
/*             {% if item.below %}*/
/*                 {% if menu_level==0 %}*/
/*                     <li class="dropdown" tabindex="0">*/
/*                     <a tabindex="-1" class="dropdown-toggle" data-toggle="dropdown" role="button"*/
/*                        aria-haspopup="true" href="#" aria-expanded="false">{{ item.title }} <span class="caret"></span></a>*/
/*                 {% else %} <li class="dropdown-submenu">*/
/*                     <a href="#">{{ item.title }} <span class="caret"></span></a>*/
/*                 {% endif %}*/
/*                 <ul class="dropdown-menu" role="menu">*/
/*                     {{ menus.menu_links(item.below,attributes, menu_level + 1) }}*/
/*                 </ul>*/
/*                 </li>*/
/*             {% else %}*/
/*                 <li><a {% if menu_level==2 %} class="second-level-smallscreens" tabindex="-1"{% endif %}*/
/*                             href="{{ item.url }}" {% if menu_level==0 %} tabindex="0" {% elseif menu_level==1 %}tabindex="-1"{% endif %}>{{ item.title }}</a></li>*/
/*             {% endif %}*/
/*         {% endfor %}*/
/*     {% endif %}*/
/* {% endmacro %}*/
