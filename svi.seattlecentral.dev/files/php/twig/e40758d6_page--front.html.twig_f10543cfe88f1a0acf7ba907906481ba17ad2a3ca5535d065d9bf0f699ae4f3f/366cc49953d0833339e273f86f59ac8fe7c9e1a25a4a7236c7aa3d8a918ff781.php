<?php

/* sites/svi.seattlecentral.dev/themes/custom/svi_heros/templates/page--front.html.twig */
class __TwigTemplate_2671857bcfd87a2d222e37d0e9c1e83c518037b450ec658dc2aa1ff0d19e6c82 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
            'navbar' => array($this, 'block_navbar'),
            'main' => array($this, 'block_main'),
            'header' => array($this, 'block_header'),
            'sidebar_first' => array($this, 'block_sidebar_first'),
            'sidebar_second' => array($this, 'block_sidebar_second'),
            'highlighted' => array($this, 'block_highlighted'),
            'breadcrumb' => array($this, 'block_breadcrumb'),
            'action_links' => array($this, 'block_action_links'),
            'help' => array($this, 'block_help'),
            'content' => array($this, 'block_content'),
            'footer' => array($this, 'block_footer'),
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $tags = array("set" => 62, "if" => 63, "block" => 64);
        $filters = array("clean_class" => 68);
        $functions = array("attach_library" => 60);

        try {
            $this->env->getExtension('sandbox')->checkSecurity(
                array('set', 'if', 'block'),
                array('clean_class'),
                array('attach_library')
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

        // line 60
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->env->getExtension('drupal_core')->attachLibrary("svi_heros/top-page-styling"), "html", null, true));
        echo "
<div id=\"main-page-container\">
    ";
        // line 62
        $context["container"] = (($this->getAttribute($this->getAttribute((isset($context["theme"]) ? $context["theme"] : null), "settings", array()), "fluid_container", array())) ? ("container-fluid") : ("container"));
        // line 63
        echo "    ";
        if (($this->getAttribute((isset($context["page"]) ? $context["page"] : null), "navigation", array()) || $this->getAttribute((isset($context["page"]) ? $context["page"] : null), "navigation_collapsible", array()))) {
            // line 64
            echo "        ";
            $this->displayBlock('navbar', $context, $blocks);
            // line 85
            echo "    ";
        }
        // line 86
        echo "
    ";
        // line 87
        $this->displayBlock('main', $context, $blocks);
        // line 157
        echo "    ";
        if ($this->getAttribute((isset($context["page"]) ? $context["page"] : null), "footer", array())) {
            // line 158
            echo "        ";
            $this->displayBlock('footer', $context, $blocks);
            // line 169
            echo "    ";
        }
        // line 170
        echo "</div>";
    }

    // line 64
    public function block_navbar($context, array $blocks = array())
    {
        // line 65
        echo "            ";
        $context["navbar_classes"] = array(0 => "navbar", 1 => (($this->getAttribute($this->getAttribute(        // line 67
(isset($context["theme"]) ? $context["theme"] : null), "settings", array()), "navbar_inverse", array())) ? ("navbar-inverse") : ("navbar-default")), 2 => (($this->getAttribute($this->getAttribute(        // line 68
(isset($context["theme"]) ? $context["theme"] : null), "settings", array()), "navbar_position", array())) ? (("navbar-" . \Drupal\Component\Utility\Html::getClass($this->getAttribute($this->getAttribute((isset($context["theme"]) ? $context["theme"] : null), "settings", array()), "navbar_position", array())))) : ((isset($context["container"]) ? $context["container"] : null))));
        // line 70
        echo "            <header role=\"banner\" class=\"svi-bg-blue\">
                <section class=\"container-fluid\">
                    ";
        // line 72
        if ($this->getAttribute((isset($context["page"]) ? $context["page"] : null), "navigation", array())) {
            // line 73
            echo "                        ";
            echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->getAttribute((isset($context["page"]) ? $context["page"] : null), "navigation", array()), "html", null, true));
            echo "
                    ";
        }
        // line 75
        echo "                </section>
                ";
        // line 77
        echo "                ";
        // line 78
        echo "                ";
        if ($this->getAttribute((isset($context["page"]) ? $context["page"] : null), "navigation_collapsible", array())) {
            // line 79
            echo "                    ";
            // line 80
            echo "                    ";
            echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->getAttribute((isset($context["page"]) ? $context["page"] : null), "navigation_collapsible", array()), "html", null, true));
            echo "
                    ";
            // line 82
            echo "                ";
        }
        // line 83
        echo "            </header>
        ";
    }

    // line 87
    public function block_main($context, array $blocks = array())
    {
        // line 88
        echo "        <div role=\"main\" id=\"main-container-id\" class=\"main-container js-quickedit-main-content bg-white curtain\" tabindex=\"-1\">
            ";
        // line 90
        echo "            ";
        if ($this->getAttribute((isset($context["page"]) ? $context["page"] : null), "header", array())) {
            // line 91
            echo "                ";
            $this->displayBlock('header', $context, $blocks);
            // line 94
            echo "            ";
        }
        // line 95
        echo "            ";
        // line 96
        echo "            ";
        if ($this->getAttribute((isset($context["page"]) ? $context["page"] : null), "sidebar_first", array())) {
            // line 97
            echo "                ";
            $this->displayBlock('sidebar_first', $context, $blocks);
            // line 104
            echo "            ";
        }
        // line 105
        echo "            ";
        if ($this->getAttribute((isset($context["page"]) ? $context["page"] : null), "sidebar_second", array())) {
            // line 106
            echo "                ";
            $this->displayBlock('sidebar_second', $context, $blocks);
            // line 111
            echo "            ";
        }
        // line 112
        echo "
            ";
        // line 116
        echo "
            <section ";
        // line 117
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->getAttribute((isset($context["content_attributes"]) ? $context["content_attributes"] : null), "addClass", array(0 => (isset($context["content_classes"]) ? $context["content_classes"] : null)), "method"), "html", null, true));
        echo " >
                ";
        // line 119
        echo "                ";
        if ($this->getAttribute((isset($context["page"]) ? $context["page"] : null), "highlighted", array())) {
            // line 120
            echo "                    ";
            $this->displayBlock('highlighted', $context, $blocks);
            // line 123
            echo "                ";
        }
        // line 124
        echo "
                ";
        // line 126
        echo "                ";
        if ((isset($context["breadcrumb"]) ? $context["breadcrumb"] : null)) {
            // line 127
            echo "                    ";
            $this->displayBlock('breadcrumb', $context, $blocks);
            // line 130
            echo "                ";
        }
        // line 131
        echo "
                ";
        // line 133
        echo "                ";
        if ((isset($context["action_links"]) ? $context["action_links"] : null)) {
            // line 134
            echo "                    ";
            $this->displayBlock('action_links', $context, $blocks);
            // line 137
            echo "                ";
        }
        // line 138
        echo "
                ";
        // line 140
        echo "                ";
        if ($this->getAttribute((isset($context["page"]) ? $context["page"] : null), "help", array())) {
            // line 141
            echo "                    ";
            $this->displayBlock('help', $context, $blocks);
            // line 144
            echo "                ";
        }
        // line 145
        echo "            </section>

            ";
        // line 148
        echo "            ";
        $this->displayBlock('content', $context, $blocks);
        // line 152
        echo "            ";
        // line 154
        echo "<!-- /.container -->
        </div>
    ";
    }

    // line 91
    public function block_header($context, array $blocks = array())
    {
        // line 92
        echo "                    ";
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->getAttribute((isset($context["page"]) ? $context["page"] : null), "header", array()), "html", null, true));
        echo "
                ";
    }

    // line 97
    public function block_sidebar_first($context, array $blocks = array())
    {
        // line 98
        echo "                    ";
        // line 100
        echo "                    <aside class=\"col-md-4 details-page-sidebar\">
                        ";
        // line 101
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->getAttribute((isset($context["page"]) ? $context["page"] : null), "sidebar_first", array()), "html", null, true));
        echo "
                    </aside>
                ";
    }

    // line 106
    public function block_sidebar_second($context, array $blocks = array())
    {
        // line 107
        echo "                    <div class=\"btn-group details-page-sidebar-small-screens\" role=\"group\">
                        ";
        // line 108
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->getAttribute((isset($context["page"]) ? $context["page"] : null), "sidebar_second", array()), "html", null, true));
        echo "
                    </div>
                ";
    }

    // line 120
    public function block_highlighted($context, array $blocks = array())
    {
        // line 121
        echo "                        <div class=\"highlighted\">";
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->getAttribute((isset($context["page"]) ? $context["page"] : null), "highlighted", array()), "html", null, true));
        echo "</div>
                    ";
    }

    // line 127
    public function block_breadcrumb($context, array $blocks = array())
    {
        // line 128
        echo "                        ";
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, (isset($context["breadcrumb"]) ? $context["breadcrumb"] : null), "html", null, true));
        echo "
                    ";
    }

    // line 134
    public function block_action_links($context, array $blocks = array())
    {
        // line 135
        echo "                        <ul class=\"action-links\">";
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, (isset($context["action_links"]) ? $context["action_links"] : null), "html", null, true));
        echo "</ul>
                    ";
    }

    // line 141
    public function block_help($context, array $blocks = array())
    {
        // line 142
        echo "                        ";
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->getAttribute((isset($context["page"]) ? $context["page"] : null), "help", array()), "html", null, true));
        echo "
                    ";
    }

    // line 148
    public function block_content($context, array $blocks = array())
    {
        // line 149
        echo "                <a id=\"main-content\"></a>
                ";
        // line 150
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->getAttribute((isset($context["page"]) ? $context["page"] : null), "content", array()), "html", null, true));
        echo "
            ";
    }

    // line 158
    public function block_footer($context, array $blocks = array())
    {
        // line 159
        echo "            <footer class=\"container-fluid svi-footer-container\" role=\"contentinfo\">
                <div class=\"container\">
                    <div class=\"row\">
                        <div class=\"col-sm-12\">
                            ";
        // line 163
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->getAttribute((isset($context["page"]) ? $context["page"] : null), "footer", array()), "html", null, true));
        echo "
                        </div>
                    </div>
                </div>
            </footer>
        ";
    }

    public function getTemplateName()
    {
        return "sites/svi.seattlecentral.dev/themes/custom/svi_heros/templates/page--front.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  335 => 163,  329 => 159,  326 => 158,  320 => 150,  317 => 149,  314 => 148,  307 => 142,  304 => 141,  297 => 135,  294 => 134,  287 => 128,  284 => 127,  277 => 121,  274 => 120,  267 => 108,  264 => 107,  261 => 106,  254 => 101,  251 => 100,  249 => 98,  246 => 97,  239 => 92,  236 => 91,  230 => 154,  228 => 152,  225 => 148,  221 => 145,  218 => 144,  215 => 141,  212 => 140,  209 => 138,  206 => 137,  203 => 134,  200 => 133,  197 => 131,  194 => 130,  191 => 127,  188 => 126,  185 => 124,  182 => 123,  179 => 120,  176 => 119,  172 => 117,  169 => 116,  166 => 112,  163 => 111,  160 => 106,  157 => 105,  154 => 104,  151 => 97,  148 => 96,  146 => 95,  143 => 94,  140 => 91,  137 => 90,  134 => 88,  131 => 87,  126 => 83,  123 => 82,  118 => 80,  116 => 79,  113 => 78,  111 => 77,  108 => 75,  102 => 73,  100 => 72,  96 => 70,  94 => 68,  93 => 67,  91 => 65,  88 => 64,  84 => 170,  81 => 169,  78 => 158,  75 => 157,  73 => 87,  70 => 86,  67 => 85,  64 => 64,  61 => 63,  59 => 62,  54 => 60,);
    }
}
/* {#*/
/* /***/
/*  * @file*/
/*  * Default theme implementation to display a single page.*/
/*  **/
/*  * The doctype, html, head and body tags are not in this template. Instead they*/
/*  * can be found in the html.html.twig template in this directory.*/
/*  **/
/*  * Available variables:*/
/*  **/
/*  * - base_path: The base URL path of the Drupal installation. Will usually be*/
/*  *   "/" unless you have installed Drupal in a sub-directory.*/
/*  * - is_front: A flag indicating if the current page is the front page.*/
/*  * - logged_in: A flag indicating if the user is registered and signed in.*/
/*  * - is_admin: A flag indicating if the user has permission to access*/
/*  *   administration pages.*/
/*  **/
/*  * Site identity:*/
/*  * - front_page: The URL of the front page. Use this instead of base_path when*/
/*  *   linking to the front page. This includes the language domain or prefix.*/
/*  **/
/*  * Navigation:*/
/*  * - breadcrumb: The breadcrumb trail for the current page.*/
/*  **/
/*  * Page content (in order of occurrence in the default page.html.twig):*/
/*  * - title_prefix: Additional output populated by modules, intended to be*/
/*  *   displayed in front of the main title tag that appears in the template.*/
/*  * - title: The page title, for use in the actual content.*/
/*  * - title_suffix: Additional output populated by modules, intended to be*/
/*  *   displayed after the main title tag that appears in the template.*/
/*  * - messages: Status and error messages. Should be displayed prominently.*/
/*  * - tabs: Tabs linking to any sub-pages beneath the current page (e.g., the*/
/*  *   view and edit tabs when displaying a node).*/
/*  * - action_links: Actions local to the page, such as "Add menu" on the menu*/
/*  *   administration interface.*/
/*  * - node: Fully loaded node, if there is an automatically-loaded node*/
/*  *   associated with the page and the node ID is the second argument in the*/
/*  *   page's path (e.g. node/12345 and node/12345/revisions, but not*/
/*  *   comment/reply/12345).*/
/*  **/
/*  * Regions:*/
/*  * - page.header: Items for the header region.*/
/*  * - page.navigation: Items for the navigation region.*/
/*  * - page.navigation_collapsible: Items for the navigation (collapsible) region.*/
/*  * - page.highlighted: Items for the highlighted content region.*/
/*  * - page.help: Dynamic help text, mostly for admin pages.*/
/*  * - page.content: The main content of the current page.*/
/*  * - page.sidebar_first: Items for the first sidebar.*/
/*  * - page.sidebar_second: Items for the second sidebar.*/
/*  * - page.footer: Items for the footer region.*/
/*  **/
/*  * @ingroup templates*/
/*  **/
/*  * @see template_preprocess_page()*/
/*  * @see html.html.twig*/
/*  *//* */
/* */
/* */
/* {# Navbar #}*/
/* {{ attach_library('svi_heros/top-page-styling') }}*/
/* <div id="main-page-container">*/
/*     {% set container = theme.settings.fluid_container ? 'container-fluid' : 'container' %}*/
/*     {% if page.navigation or page.navigation_collapsible %}*/
/*         {% block navbar %}*/
/*             {% set navbar_classes = [*/
/*             'navbar',*/
/*             theme.settings.navbar_inverse ? 'navbar-inverse' : 'navbar-default',*/
/*             theme.settings.navbar_position ? 'navbar-' ~ theme.settings.navbar_position|clean_class : container,*/
/*             ] %}*/
/*             <header role="banner" class="svi-bg-blue">*/
/*                 <section class="container-fluid">*/
/*                     {% if page.navigation %}*/
/*                         {{ page.navigation }}*/
/*                     {% endif %}*/
/*                 </section>*/
/*                 {# .btn-navbar is used as the toggle for collapsed navbar content #}*/
/*                 {# Navigation (collapsible) #}*/
/*                 {% if page.navigation_collapsible %}*/
/*                     {#<div id="navbar-collapse" class="bg-white sc-gold-border navbar-collapse collapse">#}*/
/*                     {{ page.navigation_collapsible }}*/
/*                     {#</div>#}*/
/*                 {% endif %}*/
/*             </header>*/
/*         {% endblock %}*/
/*     {% endif %}*/
/* */
/*     {% block main %}*/
/*         <div role="main" id="main-container-id" class="main-container js-quickedit-main-content bg-white curtain" tabindex="-1">*/
/*             {# Header #}*/
/*             {% if page.header %}*/
/*                 {% block header %}*/
/*                     {{ page.header }}*/
/*                 {% endblock %}*/
/*             {% endif %}*/
/*             {# Sidebar First #}*/
/*             {% if page.sidebar_first %}*/
/*                 {% block sidebar_first %}*/
/*                     {# <div class="container">*/
/*                      <div class="row">#}*/
/*                     <aside class="col-md-4 details-page-sidebar">*/
/*                         {{ page.sidebar_first }}*/
/*                     </aside>*/
/*                 {% endblock %}*/
/*             {% endif %}*/
/*             {% if page.sidebar_second %}*/
/*                 {% block sidebar_second %}*/
/*                     <div class="btn-group details-page-sidebar-small-screens" role="group">*/
/*                         {{ page.sidebar_second }}*/
/*                     </div>*/
/*                 {% endblock %}*/
/*             {% endif %}*/
/* */
/*             {# Content*/
/*             {% set content_classes = [page.sidebar_first ? 'col-sm-9' : 'col-sm-12'] %}*/
/*             #}*/
/* */
/*             <section {{ content_attributes.addClass(content_classes) }} >*/
/*                 {# Highlighted #}*/
/*                 {% if page.highlighted %}*/
/*                     {% block highlighted %}*/
/*                         <div class="highlighted">{{ page.highlighted }}</div>*/
/*                     {% endblock %}*/
/*                 {% endif %}*/
/* */
/*                 {# Breadcrumbs #}*/
/*                 {% if breadcrumb %}*/
/*                     {% block breadcrumb %}*/
/*                         {{ breadcrumb }}*/
/*                     {% endblock %}*/
/*                 {% endif %}*/
/* */
/*                 {# Action Links #}*/
/*                 {% if action_links %}*/
/*                     {% block action_links %}*/
/*                         <ul class="action-links">{{ action_links }}</ul>*/
/*                     {% endblock %}*/
/*                 {% endif %}*/
/* */
/*                 {# Help #}*/
/*                 {% if page.help %}*/
/*                     {% block help %}*/
/*                         {{ page.help }}*/
/*                     {% endblock %}*/
/*                 {% endif %}*/
/*             </section>*/
/* */
/*             {# Content #}*/
/*             {% block content %}*/
/*                 <a id="main-content"></a>*/
/*                 {{ page.content }}*/
/*             {% endblock %}*/
/*             {#</div>*/
/* */
/*         </div>#}<!-- /.container -->*/
/*         </div>*/
/*     {% endblock %}*/
/*     {% if page.footer %}*/
/*         {% block footer %}*/
/*             <footer class="container-fluid svi-footer-container" role="contentinfo">*/
/*                 <div class="container">*/
/*                     <div class="row">*/
/*                         <div class="col-sm-12">*/
/*                             {{ page.footer }}*/
/*                         </div>*/
/*                     </div>*/
/*                 </div>*/
/*             </footer>*/
/*         {% endblock %}*/
/*     {% endif %}*/
/* </div>*/
