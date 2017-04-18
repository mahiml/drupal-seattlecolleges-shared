<?php

/* sites/svi.seattlecentral.dev/themes/custom/svi_heros/templates/blocks/block--sviprofilesblock.html.twig */
class __TwigTemplate_77887d924bd3ecca7f45b808e9f3a9d5255166c2d680d3587fd92195ba7b2ffd extends Twig_Template
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
        $tags = array("set" => 27, "for" => 29);
        $filters = array("length" => 27);
        $functions = array();

        try {
            $this->env->getExtension('sandbox')->checkSecurity(
                array('set', 'for'),
                array('length'),
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
        // line 7
        echo "    <form class=\"navbar-form svi-invisible-1200\" action=\"/search/node\" method=\"get\" id=\"search-block-form\" accept-charset=\"UTF-8\"
          role=\"search\">
        <div class=\"input-group add-on\">
            <input class=\"form-search form-control\" placeholder=\"Search SVI\" type=\"text\"
                   placeholder=\"Search Seattle Vocational Institute\" type=\"search\" id=\"edit-keys\" name=\"keys\">
            <div class=\"input-group-btn\">
                <button class=\"btn btn-info\" name=\"search\" type=\"submit\"><i class=\"glyphicon glyphicon-search\"></i></button>
            </div>
        </div>
    </form>
    <div class=\"btn-group\" role=\"toolbar\">
        ";
        // line 22
        echo "        <button type=\"button\" class=\"btn btn-default dropdown-toggle svi-invisible-1200\" data-toggle=\"dropdown\"
                aria-haspopup=\"true\"
                aria-expanded=\"false\">
            Quick Links <span class=\"caret\"></span>
        </button>
        ";
        // line 27
        $context["size"] = (twig_length_filter($this->env, $this->getAttribute($this->getAttribute((isset($context["content"]) ? $context["content"] : null), "field_quick_links_menu", array(), "array"), "#items", array(), "array")) - 1);
        // line 28
        echo "        <ul class=\"dropdown-menu\">
            ";
        // line 29
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable(range(0, (isset($context["size"]) ? $context["size"] : null)));
        foreach ($context['_seq'] as $context["_key"] => $context["index"]) {
            // line 30
            echo "                <li>
                    <a target=\"_blank\"
                       href=\"";
            // line 32
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
        // line 35
        echo "        </ul>
    </div>
</div>";
    }

    public function getTemplateName()
    {
        return "sites/svi.seattlecentral.dev/themes/custom/svi_heros/templates/blocks/block--sviprofilesblock.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  90 => 35,  79 => 32,  75 => 30,  71 => 29,  68 => 28,  66 => 27,  59 => 22,  46 => 7,  43 => 1,);
    }
}
/* <div class="sc-header-home-page-links navbar-right">*/
/*     {#{% set size =  content['field_profiles']['#items']|length -1 %}*/
/*     {% for index in 0..size %}*/
/*         {% set tokens =  content['field_profiles']['#object'].field_profiles[index].title|split("***") %}*/
/*         <a class="btn btn-default" href="{{ tokens[1] }}" role="button">{{ tokens[0] }}</a>*/
/*     {% endfor %}#}*/
/*     <form class="navbar-form svi-invisible-1200" action="/search/node" method="get" id="search-block-form" accept-charset="UTF-8"*/
/*           role="search">*/
/*         <div class="input-group add-on">*/
/*             <input class="form-search form-control" placeholder="Search SVI" type="text"*/
/*                    placeholder="Search Seattle Vocational Institute" type="search" id="edit-keys" name="keys">*/
/*             <div class="input-group-btn">*/
/*                 <button class="btn btn-info" name="search" type="submit"><i class="glyphicon glyphicon-search"></i></button>*/
/*             </div>*/
/*         </div>*/
/*     </form>*/
/*     <div class="btn-group" role="toolbar">*/
/*         {#<div class="svi-header-global-menu-search">*/
/*             <a tabindex="0" class="btn btn-default" role="button" data-toggle="collapse"*/
/*                data-target="#collapseSearch" aria-expanded="false" aria-controls="collapseSearch"><i class="icon ion-search"></i></a>*/
/*         </div>#}*/
/*         <button type="button" class="btn btn-default dropdown-toggle svi-invisible-1200" data-toggle="dropdown"*/
/*                 aria-haspopup="true"*/
/*                 aria-expanded="false">*/
/*             Quick Links <span class="caret"></span>*/
/*         </button>*/
/*         {% set size =  content['field_quick_links_menu']['#items']|length - 1 %}*/
/*         <ul class="dropdown-menu">*/
/*             {% for index in 0..size %}*/
/*                 <li>*/
/*                     <a target="_blank"*/
/*                        href="{{ content.field_quick_links_menu[index]['#url'] }}">{{ content.field_quick_links_menu[index]['#title'] }}</a>*/
/*                 </li>*/
/*             {% endfor %}*/
/*         </ul>*/
/*     </div>*/
/* </div>*/
