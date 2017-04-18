<?php

/* sites/svi.seattlecentral.dev/themes/custom/svi_heros/templates/blocks/block--jumbotron-block.html.twig */
class __TwigTemplate_b4e44eb61415a4ba32b4beef7bdd23ec1d6218917cfc84d7c81b11ecfdd16a47 extends Twig_Template
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
        $tags = array("if" => 4);
        $filters = array();
        $functions = array("file_url" => 1);

        try {
            $this->env->getExtension('sandbox')->checkSecurity(
                array('if'),
                array(),
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

        // line 1
        echo "<header style=\"background-image: url(";
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, call_user_func_array($this->env->getFunction('file_url')->getCallable(), array($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute((isset($context["content"]) ? $context["content"] : null), "field_img", array(), "array"), "#object", array(), "array"), "field_img", array()), 0, array()), "entity", array()), "uri", array()), "value", array()))), "html", null, true));
        echo ")\"
        class=\"";
        // line 2
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute((isset($context["content"]) ? $context["content"] : null), "field_class_name", array(), "array"), "#items", array(), "array"), 0, array(), "array"), "value", array()), "html", null, true));
        echo "\">
    <div class=\"container\">
        ";
        // line 4
        if (((isset($context["label"]) ? $context["label"] : null) &&  !(null === (isset($context["label"]) ? $context["label"] : null)))) {
            // line 5
            echo "            <div class=\"col-sm-12 program-page-secondary-content\">
                <h2 class=\"news-feed-title\">";
            // line 6
            echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, (isset($context["label"]) ? $context["label"] : null), "html", null, true));
            echo "</h2>
            </div>
        ";
        }
        // line 9
        echo "        <div class=\"row\">
            <div class=\"col-xs-12\">
                ";
        // line 11
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->getAttribute((isset($context["content"]) ? $context["content"] : null), "body", array(), "array"), "html", null, true));
        echo "
            </div>
        </div>
    </div>
</header>

";
    }

    public function getTemplateName()
    {
        return "sites/svi.seattlecentral.dev/themes/custom/svi_heros/templates/blocks/block--jumbotron-block.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  68 => 11,  64 => 9,  58 => 6,  55 => 5,  53 => 4,  48 => 2,  43 => 1,);
    }
}
/* <header style="background-image: url({{ file_url(content['field_img']['#object'].field_img.0.entity.uri.value) }})"*/
/*         class="{{ content['field_class_name']['#items'][0].value }}">*/
/*     <div class="container">*/
/*         {% if label and label is not null %}*/
/*             <div class="col-sm-12 program-page-secondary-content">*/
/*                 <h2 class="news-feed-title">{{ label }}</h2>*/
/*             </div>*/
/*         {% endif %}*/
/*         <div class="row">*/
/*             <div class="col-xs-12">*/
/*                 {{ content['body'] }}*/
/*             </div>*/
/*         </div>*/
/*     </div>*/
/* </header>*/
/* */
/* */
