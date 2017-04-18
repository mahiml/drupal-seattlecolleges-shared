<?php

/* sites/foundation.seattlecentral.dev/themes/custom/foundation_heros/templates/page.html.twig */
class __TwigTemplate_39b32c99c6a730595c9c538d13400b0a84573b850c455c3d0d75d3662b5a18ea extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
            'navbar' => array($this, 'block_navbar'),
            'main' => array($this, 'block_main'),
            'header' => array($this, 'block_header'),
            'highlighted' => array($this, 'block_highlighted'),
            'breadcrumb' => array($this, 'block_breadcrumb'),
            'action_links' => array($this, 'block_action_links'),
            'help' => array($this, 'block_help'),
            'sidebar_first' => array($this, 'block_sidebar_first'),
            'footer' => array($this, 'block_footer'),
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $tags = array("set" => 62, "if" => 63, "block" => 64);
        $filters = array("clean_class" => 68);
        $functions = array("attach_library" => 60);

        try {
            $this->env->getExtension('Twig_Extension_Sandbox')->checkSecurity(
                array('set', 'if', 'block'),
                array('clean_class'),
                array('attach_library')
            );
        } catch (Twig_Sandbox_SecurityError $e) {
            $e->setSourceContext($this->getSourceContext());

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
        echo $this->env->getExtension('Twig_Extension_Sandbox')->ensureToStringAllowed($this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->env->getExtension('Drupal\Core\Template\TwigExtension')->attachLibrary("scc_heros/page-details-styling"), "html", null, true));
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
        // line 156
        echo "    ";
        if ($this->getAttribute((isset($context["page"]) ? $context["page"] : null), "footer", array())) {
            // line 157
            echo "        ";
            $this->displayBlock('footer', $context, $blocks);
            // line 168
            echo "    ";
        }
        // line 169
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
        echo "            <header role=\"banner\" class=\"sc-bg-blue\">
                <section class=\"container-fluid\">
                    ";
        // line 72
        if ($this->getAttribute((isset($context["page"]) ? $context["page"] : null), "navigation", array())) {
            // line 73
            echo "                        ";
            echo $this->env->getExtension('Twig_Extension_Sandbox')->ensureToStringAllowed($this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->getAttribute((isset($context["page"]) ? $context["page"] : null), "navigation", array()), "html", null, true));
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
            echo $this->env->getExtension('Twig_Extension_Sandbox')->ensureToStringAllowed($this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->getAttribute((isset($context["page"]) ? $context["page"] : null), "navigation_collapsible", array()), "html", null, true));
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
        echo "            <div class=\"container\">
                <div class=\"row\">
                    ";
        // line 106
        echo "
                    ";
        // line 110
        echo "                    <section ";
        echo $this->env->getExtension('Twig_Extension_Sandbox')->ensureToStringAllowed($this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->getAttribute((isset($context["content_attributes"]) ? $context["content_attributes"] : null), "addClass", array(0 => (isset($context["content_classes"]) ? $context["content_classes"] : null)), "method"), "html", null, true));
        echo " >
                        ";
        // line 112
        echo "                        ";
        if ($this->getAttribute((isset($context["page"]) ? $context["page"] : null), "highlighted", array())) {
            // line 113
            echo "                            ";
            $this->displayBlock('highlighted', $context, $blocks);
            // line 116
            echo "                        ";
        }
        // line 117
        echo "
                        ";
        // line 119
        echo "                        ";
        if ((isset($context["breadcrumb"]) ? $context["breadcrumb"] : null)) {
            // line 120
            echo "                            ";
            $this->displayBlock('breadcrumb', $context, $blocks);
            // line 123
            echo "                        ";
        }
        // line 124
        echo "
                        ";
        // line 126
        echo "                        ";
        if ((isset($context["action_links"]) ? $context["action_links"] : null)) {
            // line 127
            echo "                            ";
            $this->displayBlock('action_links', $context, $blocks);
            // line 130
            echo "                        ";
        }
        // line 131
        echo "
                        ";
        // line 133
        echo "                        ";
        if ($this->getAttribute((isset($context["page"]) ? $context["page"] : null), "help", array())) {
            // line 134
            echo "                            ";
            $this->displayBlock('help', $context, $blocks);
            // line 137
            echo "                        ";
        }
        // line 138
        echo "                    </section>

                    ";
        // line 141
        echo "                    ";
        $context["classes"] = array(0 => "col-md-8", 1 => "details-page-main-content");
        // line 142
        echo "                    <article";
        echo $this->env->getExtension('Twig_Extension_Sandbox')->ensureToStringAllowed($this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->getAttribute((isset($context["attributes"]) ? $context["attributes"] : null), "addClass", array(0 => (isset($context["classes"]) ? $context["classes"] : null)), "method"), "html", null, true));
        echo ">
                        ";
        // line 143
        echo $this->env->getExtension('Twig_Extension_Sandbox')->ensureToStringAllowed($this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->getAttribute((isset($context["page"]) ? $context["page"] : null), "content", array()), "html", null, true));
        echo "
                    </article>
                    ";
        // line 145
        if ($this->getAttribute((isset($context["page"]) ? $context["page"] : null), "sidebar_first", array())) {
            // line 146
            echo "                        ";
            $this->displayBlock('sidebar_first', $context, $blocks);
            // line 151
            echo "                    ";
        }
        // line 152
        echo "                </div>
            </div><!-- /.container -->
        </div>
    ";
    }

    // line 92
    public function block_header($context, array $blocks = array())
    {
        // line 93
        echo "                    ";
        echo $this->env->getExtension('Twig_Extension_Sandbox')->ensureToStringAllowed($this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->getAttribute((isset($context["page"]) ? $context["page"] : null), "header", array()), "html", null, true));
        echo "
                ";
    }

    // line 113
    public function block_highlighted($context, array $blocks = array())
    {
        // line 114
        echo "                                <div class=\"highlighted\">";
        echo $this->env->getExtension('Twig_Extension_Sandbox')->ensureToStringAllowed($this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->getAttribute((isset($context["page"]) ? $context["page"] : null), "highlighted", array()), "html", null, true));
        echo "</div>
                            ";
    }

    // line 120
    public function block_breadcrumb($context, array $blocks = array())
    {
        // line 121
        echo "                                ";
        echo $this->env->getExtension('Twig_Extension_Sandbox')->ensureToStringAllowed($this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, (isset($context["breadcrumb"]) ? $context["breadcrumb"] : null), "html", null, true));
        echo "
                            ";
    }

    // line 127
    public function block_action_links($context, array $blocks = array())
    {
        // line 128
        echo "                                <ul class=\"action-links\">";
        echo $this->env->getExtension('Twig_Extension_Sandbox')->ensureToStringAllowed($this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, (isset($context["action_links"]) ? $context["action_links"] : null), "html", null, true));
        echo "</ul>
                            ";
    }

    // line 134
    public function block_help($context, array $blocks = array())
    {
        // line 135
        echo "                                ";
        echo $this->env->getExtension('Twig_Extension_Sandbox')->ensureToStringAllowed($this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->getAttribute((isset($context["page"]) ? $context["page"] : null), "help", array()), "html", null, true));
        echo "
                            ";
    }

    // line 146
    public function block_sidebar_first($context, array $blocks = array())
    {
        // line 147
        echo "                            <aside class=\"col-md-4 details-page-sidebar\">
                                ";
        // line 148
        echo $this->env->getExtension('Twig_Extension_Sandbox')->ensureToStringAllowed($this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->getAttribute((isset($context["page"]) ? $context["page"] : null), "sidebar_first", array()), "html", null, true));
        echo "
                            </aside>
                        ";
    }

    // line 157
    public function block_footer($context, array $blocks = array())
    {
        // line 158
        echo "            <footer class=\"container-fluid sc-footer-container\" role=\"contentinfo\">
                <div class=\"container\">
                    <div class=\"row\">
                        <div class=\"col-sm-12\" style=\"padding-bottom: 30px;\">
                            ";
        // line 162
        echo $this->env->getExtension('Twig_Extension_Sandbox')->ensureToStringAllowed($this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->getAttribute((isset($context["page"]) ? $context["page"] : null), "footer", array()), "html", null, true));
        echo "
                        </div>
                    </div>
                </div>
            </footer>
        ";
    }

    public function getTemplateName()
    {
        return "sites/foundation.seattlecentral.dev/themes/custom/foundation_heros/templates/page.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  308 => 162,  302 => 158,  299 => 157,  292 => 148,  289 => 147,  286 => 146,  279 => 135,  276 => 134,  269 => 128,  266 => 127,  259 => 121,  256 => 120,  249 => 114,  246 => 113,  239 => 93,  236 => 92,  229 => 152,  226 => 151,  223 => 146,  221 => 145,  216 => 143,  211 => 142,  208 => 141,  204 => 138,  201 => 137,  198 => 134,  195 => 133,  192 => 131,  189 => 130,  186 => 127,  183 => 126,  180 => 124,  177 => 123,  174 => 120,  171 => 119,  168 => 117,  165 => 116,  162 => 113,  159 => 112,  154 => 110,  151 => 106,  147 => 97,  145 => 96,  142 => 95,  139 => 92,  136 => 91,  132 => 88,  129 => 87,  124 => 83,  121 => 82,  116 => 80,  114 => 79,  111 => 78,  109 => 77,  106 => 75,  100 => 73,  98 => 72,  94 => 70,  92 => 68,  91 => 67,  89 => 65,  86 => 64,  82 => 169,  79 => 168,  76 => 157,  73 => 156,  71 => 87,  68 => 86,  65 => 85,  62 => 64,  59 => 63,  57 => 62,  52 => 60,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Twig_Source("", "sites/foundation.seattlecentral.dev/themes/custom/foundation_heros/templates/page.html.twig", "/Users/mahim/Sites/devdesktop/seattlecentral-dev/docroot/sites/foundation.seattlecentral.dev/themes/custom/foundation_heros/templates/page.html.twig");
    }
}
