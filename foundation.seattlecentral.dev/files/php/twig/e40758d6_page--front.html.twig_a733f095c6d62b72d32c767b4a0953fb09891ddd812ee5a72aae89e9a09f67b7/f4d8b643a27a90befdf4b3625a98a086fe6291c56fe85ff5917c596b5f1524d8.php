<?php

/* sites/foundation.seattlecentral.dev/themes/custom/foundation_heros/templates/page--front.html.twig */
class __TwigTemplate_69937abf2185658ccc335133b7a97600e4c7bf3f71876fd0d7116184ffab2b18 extends Twig_Template
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
        $tags = array("set" => 63, "if" => 64, "block" => 65);
        $filters = array("clean_class" => 69);
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
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->env->getExtension('drupal_core')->attachLibrary("scc_heros/top-page-styling"), "html", null, true));
        echo "
";
        // line 61
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->env->getExtension('drupal_core')->attachLibrary("foundation_heros/parallax-styling"), "html", null, true));
        echo "
<div id=\"main-page-container\">
    ";
        // line 63
        $context["container"] = (($this->getAttribute($this->getAttribute((isset($context["theme"]) ? $context["theme"] : null), "settings", array()), "fluid_container", array())) ? ("container-fluid") : ("container"));
        // line 64
        echo "    ";
        if (($this->getAttribute((isset($context["page"]) ? $context["page"] : null), "navigation", array()) || $this->getAttribute((isset($context["page"]) ? $context["page"] : null), "navigation_collapsible", array()))) {
            // line 65
            echo "        ";
            $this->displayBlock('navbar', $context, $blocks);
            // line 86
            echo "    ";
        }
        // line 87
        echo "
    ";
        // line 88
        $this->displayBlock('main', $context, $blocks);
        // line 158
        echo "    ";
        if ($this->getAttribute((isset($context["page"]) ? $context["page"] : null), "footer", array())) {
            // line 159
            echo "        ";
            $this->displayBlock('footer', $context, $blocks);
            // line 170
            echo "    ";
        }
        // line 171
        echo "</div>";
    }

    // line 65
    public function block_navbar($context, array $blocks = array())
    {
        // line 66
        echo "            ";
        $context["navbar_classes"] = array(0 => "navbar", 1 => (($this->getAttribute($this->getAttribute(        // line 68
(isset($context["theme"]) ? $context["theme"] : null), "settings", array()), "navbar_inverse", array())) ? ("navbar-inverse") : ("navbar-default")), 2 => (($this->getAttribute($this->getAttribute(        // line 69
(isset($context["theme"]) ? $context["theme"] : null), "settings", array()), "navbar_position", array())) ? (("navbar-" . \Drupal\Component\Utility\Html::getClass($this->getAttribute($this->getAttribute((isset($context["theme"]) ? $context["theme"] : null), "settings", array()), "navbar_position", array())))) : ((isset($context["container"]) ? $context["container"] : null))));
        // line 71
        echo "            <header role=\"banner\" class=\"sc-bg-blue\">
                <section class=\"container-fluid\">
                    ";
        // line 73
        if ($this->getAttribute((isset($context["page"]) ? $context["page"] : null), "navigation", array())) {
            // line 74
            echo "                        ";
            echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->getAttribute((isset($context["page"]) ? $context["page"] : null), "navigation", array()), "html", null, true));
            echo "
                    ";
        }
        // line 76
        echo "                </section>
                ";
        // line 78
        echo "                ";
        // line 79
        echo "                ";
        if ($this->getAttribute((isset($context["page"]) ? $context["page"] : null), "navigation_collapsible", array())) {
            // line 80
            echo "                    ";
            // line 81
            echo "                    ";
            echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->getAttribute((isset($context["page"]) ? $context["page"] : null), "navigation_collapsible", array()), "html", null, true));
            echo "
                    ";
            // line 83
            echo "                ";
        }
        // line 84
        echo "            </header>
        ";
    }

    // line 88
    public function block_main($context, array $blocks = array())
    {
        // line 89
        echo "        <div role=\"main\" id=\"main-container-id\" class=\"main-container js-quickedit-main-content bg-white curtain\" tabindex=\"-1\">
            ";
        // line 91
        echo "            ";
        if ($this->getAttribute((isset($context["page"]) ? $context["page"] : null), "header", array())) {
            // line 92
            echo "                ";
            $this->displayBlock('header', $context, $blocks);
            // line 95
            echo "            ";
        }
        // line 96
        echo "            ";
        // line 97
        echo "            ";
        if ($this->getAttribute((isset($context["page"]) ? $context["page"] : null), "sidebar_first", array())) {
            // line 98
            echo "                ";
            $this->displayBlock('sidebar_first', $context, $blocks);
            // line 105
            echo "            ";
        }
        // line 106
        echo "            ";
        if ($this->getAttribute((isset($context["page"]) ? $context["page"] : null), "sidebar_second", array())) {
            // line 107
            echo "                ";
            $this->displayBlock('sidebar_second', $context, $blocks);
            // line 112
            echo "            ";
        }
        // line 113
        echo "
            ";
        // line 117
        echo "
            <section ";
        // line 118
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->getAttribute((isset($context["content_attributes"]) ? $context["content_attributes"] : null), "addClass", array(0 => (isset($context["content_classes"]) ? $context["content_classes"] : null)), "method"), "html", null, true));
        echo " >
                ";
        // line 120
        echo "                ";
        if ($this->getAttribute((isset($context["page"]) ? $context["page"] : null), "highlighted", array())) {
            // line 121
            echo "                    ";
            $this->displayBlock('highlighted', $context, $blocks);
            // line 124
            echo "                ";
        }
        // line 125
        echo "
                ";
        // line 127
        echo "                ";
        if ((isset($context["breadcrumb"]) ? $context["breadcrumb"] : null)) {
            // line 128
            echo "                    ";
            $this->displayBlock('breadcrumb', $context, $blocks);
            // line 131
            echo "                ";
        }
        // line 132
        echo "
                ";
        // line 134
        echo "                ";
        if ((isset($context["action_links"]) ? $context["action_links"] : null)) {
            // line 135
            echo "                    ";
            $this->displayBlock('action_links', $context, $blocks);
            // line 138
            echo "                ";
        }
        // line 139
        echo "
                ";
        // line 141
        echo "                ";
        if ($this->getAttribute((isset($context["page"]) ? $context["page"] : null), "help", array())) {
            // line 142
            echo "                    ";
            $this->displayBlock('help', $context, $blocks);
            // line 145
            echo "                ";
        }
        // line 146
        echo "            </section>

            ";
        // line 149
        echo "            ";
        $this->displayBlock('content', $context, $blocks);
        // line 153
        echo "            ";
        // line 155
        echo "<!-- /.container -->
        </div>
    ";
    }

    // line 92
    public function block_header($context, array $blocks = array())
    {
        // line 93
        echo "                    ";
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->getAttribute((isset($context["page"]) ? $context["page"] : null), "header", array()), "html", null, true));
        echo "
                ";
    }

    // line 98
    public function block_sidebar_first($context, array $blocks = array())
    {
        // line 99
        echo "                    ";
        // line 101
        echo "                    <aside class=\"col-md-4 details-page-sidebar\">
                        ";
        // line 102
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->getAttribute((isset($context["page"]) ? $context["page"] : null), "sidebar_first", array()), "html", null, true));
        echo "
                    </aside>
                ";
    }

    // line 107
    public function block_sidebar_second($context, array $blocks = array())
    {
        // line 108
        echo "                    <div class=\"btn-group details-page-sidebar-small-screens\" role=\"group\">
                        ";
        // line 109
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->getAttribute((isset($context["page"]) ? $context["page"] : null), "sidebar_second", array()), "html", null, true));
        echo "
                    </div>
                ";
    }

    // line 121
    public function block_highlighted($context, array $blocks = array())
    {
        // line 122
        echo "                        <div class=\"highlighted\">";
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->getAttribute((isset($context["page"]) ? $context["page"] : null), "highlighted", array()), "html", null, true));
        echo "</div>
                    ";
    }

    // line 128
    public function block_breadcrumb($context, array $blocks = array())
    {
        // line 129
        echo "                        ";
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, (isset($context["breadcrumb"]) ? $context["breadcrumb"] : null), "html", null, true));
        echo "
                    ";
    }

    // line 135
    public function block_action_links($context, array $blocks = array())
    {
        // line 136
        echo "                        <ul class=\"action-links\">";
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, (isset($context["action_links"]) ? $context["action_links"] : null), "html", null, true));
        echo "</ul>
                    ";
    }

    // line 142
    public function block_help($context, array $blocks = array())
    {
        // line 143
        echo "                        ";
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->getAttribute((isset($context["page"]) ? $context["page"] : null), "help", array()), "html", null, true));
        echo "
                    ";
    }

    // line 149
    public function block_content($context, array $blocks = array())
    {
        // line 150
        echo "                <a id=\"main-content\"></a>
                ";
        // line 151
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->getAttribute((isset($context["page"]) ? $context["page"] : null), "content", array()), "html", null, true));
        echo "
            ";
    }

    // line 159
    public function block_footer($context, array $blocks = array())
    {
        // line 160
        echo "            <footer class=\"container-fluid sc-footer-container\" role=\"contentinfo\">
                <div class=\"container\">
                    <div class=\"row\">
                        <div class=\"col-sm-12\">
                            ";
        // line 164
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
        return "sites/foundation.seattlecentral.dev/themes/custom/foundation_heros/templates/page--front.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  339 => 164,  333 => 160,  330 => 159,  324 => 151,  321 => 150,  318 => 149,  311 => 143,  308 => 142,  301 => 136,  298 => 135,  291 => 129,  288 => 128,  281 => 122,  278 => 121,  271 => 109,  268 => 108,  265 => 107,  258 => 102,  255 => 101,  253 => 99,  250 => 98,  243 => 93,  240 => 92,  234 => 155,  232 => 153,  229 => 149,  225 => 146,  222 => 145,  219 => 142,  216 => 141,  213 => 139,  210 => 138,  207 => 135,  204 => 134,  201 => 132,  198 => 131,  195 => 128,  192 => 127,  189 => 125,  186 => 124,  183 => 121,  180 => 120,  176 => 118,  173 => 117,  170 => 113,  167 => 112,  164 => 107,  161 => 106,  158 => 105,  155 => 98,  152 => 97,  150 => 96,  147 => 95,  144 => 92,  141 => 91,  138 => 89,  135 => 88,  130 => 84,  127 => 83,  122 => 81,  120 => 80,  117 => 79,  115 => 78,  112 => 76,  106 => 74,  104 => 73,  100 => 71,  98 => 69,  97 => 68,  95 => 66,  92 => 65,  88 => 171,  85 => 170,  82 => 159,  79 => 158,  77 => 88,  74 => 87,  71 => 86,  68 => 65,  65 => 64,  63 => 63,  58 => 61,  54 => 60,);
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
/* {{ attach_library('scc_heros/top-page-styling') }}*/
/* {{ attach_library('foundation_heros/parallax-styling') }}*/
/* <div id="main-page-container">*/
/*     {% set container = theme.settings.fluid_container ? 'container-fluid' : 'container' %}*/
/*     {% if page.navigation or page.navigation_collapsible %}*/
/*         {% block navbar %}*/
/*             {% set navbar_classes = [*/
/*             'navbar',*/
/*             theme.settings.navbar_inverse ? 'navbar-inverse' : 'navbar-default',*/
/*             theme.settings.navbar_position ? 'navbar-' ~ theme.settings.navbar_position|clean_class : container,*/
/*             ] %}*/
/*             <header role="banner" class="sc-bg-blue">*/
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
/*             <footer class="container-fluid sc-footer-container" role="contentinfo">*/
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
