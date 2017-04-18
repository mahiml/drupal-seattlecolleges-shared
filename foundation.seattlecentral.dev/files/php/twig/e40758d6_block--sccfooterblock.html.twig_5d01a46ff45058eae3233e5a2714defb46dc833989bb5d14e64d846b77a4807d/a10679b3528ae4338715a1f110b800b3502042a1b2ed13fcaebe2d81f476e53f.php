<?php

/* themes/custom/scc_heros/templates/blocks/block--sccfooterblock.html.twig */
class __TwigTemplate_78a94c3c2093f22ad534f7cbccb117dc136165ef96ab1857245161bd38a23685 extends Twig_Template
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
        $tags = array("set" => 9, "for" => 17);
        $filters = array("raw" => 14, "length" => 15);
        $functions = array("file_url" => 61);

        try {
            $this->env->getExtension('sandbox')->checkSecurity(
                array('set', 'for'),
                array('raw', 'length'),
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
        echo "<div class=\"container\">
    <div class=\"row\">
        <div class=\"col-sm-12\">
            ";
        // line 4
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->getAttribute((isset($context["content"]) ? $context["content"] : null), "body", array(), "array"), "html", null, true));
        echo "
        </div>
    </div>

    <div class=\"row\">
        ";
        // line 9
        $context["footer_elements"] = $this->getAttribute($this->getAttribute((isset($context["content"]) ? $context["content"] : null), "field_footer_elements", array(), "array"), "#items", array(), "array");
        // line 10
        echo "        <div class=\"row\">
            <div class=\"col-sm-9\">
                <div class=\"row\">
                    <div class=\"col-sm-4\">
                        ";
        // line 14
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->renderVar($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute((isset($context["footer_elements"]) ? $context["footer_elements"] : null), 0, array(), "array"), "entity", array()), "body", array()), 0, array(), "array"), "value", array())));
        echo "
                        ";
        // line 15
        $context["size"] = (twig_length_filter($this->env, $this->getAttribute($this->getAttribute($this->getAttribute((isset($context["footer_elements"]) ? $context["footer_elements"] : null), 0, array(), "array"), "entity", array()), "field_links", array())) - 1);
        // line 16
        echo "                        <ul class=\"list-inline social-media-links\">
                            ";
        // line 17
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable(range(0, (isset($context["size"]) ? $context["size"] : null)));
        foreach ($context['_seq'] as $context["_key"] => $context["index"]) {
            // line 18
            echo "                                <li><a href=\"";
            echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute((isset($context["footer_elements"]) ? $context["footer_elements"] : null), 0, array(), "array"), "entity", array()), "field_links", array()), $context["index"], array(), "array"), "url", array()), "html", null, true));
            echo "\" target=\"_blank\" tabindex=\"0\"><i
                                                class=\"";
            // line 19
            echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute((isset($context["footer_elements"]) ? $context["footer_elements"] : null), 0, array(), "array"), "entity", array()), "field_links", array()), $context["index"], array(), "array"), "title", array()), "html", null, true));
            echo " \"></i></a>
                                </li>
                            ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['_key'], $context['index'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 22
        echo "                        </ul>
                    </div>
                    <div class=\"col-sm-4\">
                        ";
        // line 25
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->renderVar($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute((isset($context["footer_elements"]) ? $context["footer_elements"] : null), 1, array(), "array"), "entity", array()), "body", array()), 0, array(), "array"), "value", array())));
        echo "
                        ";
        // line 26
        $context["size"] = (twig_length_filter($this->env, $this->getAttribute($this->getAttribute($this->getAttribute((isset($context["footer_elements"]) ? $context["footer_elements"] : null), 1, array(), "array"), "entity", array()), "field_links", array())) - 1);
        // line 27
        echo "                        <ul class=\"list-unstyled\">
                            ";
        // line 28
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable(range(0, (isset($context["size"]) ? $context["size"] : null)));
        foreach ($context['_seq'] as $context["_key"] => $context["index"]) {
            // line 29
            echo "                                <li><a href=\"";
            echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute((isset($context["footer_elements"]) ? $context["footer_elements"] : null), 1, array(), "array"), "entity", array()), "field_links", array()), $context["index"], array(), "array"), "url", array()), "html", null, true));
            echo "\"
                                       target=\"_blank\" tabindex=\"0\">";
            // line 30
            echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute((isset($context["footer_elements"]) ? $context["footer_elements"] : null), 1, array(), "array"), "entity", array()), "field_links", array()), $context["index"], array(), "array"), "title", array()), "html", null, true));
            echo " </a>
                                </li>
                            ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['_key'], $context['index'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 33
        echo "                        </ul>
                    </div>
                    <div class=\"col-sm-4\">
                        ";
        // line 36
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->renderVar($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute((isset($context["footer_elements"]) ? $context["footer_elements"] : null), 2, array(), "array"), "entity", array()), "body", array()), 0, array(), "array"), "value", array())));
        echo "
                        ";
        // line 37
        $context["size"] = (twig_length_filter($this->env, $this->getAttribute($this->getAttribute($this->getAttribute((isset($context["footer_elements"]) ? $context["footer_elements"] : null), 2, array(), "array"), "entity", array()), "field_links", array())) - 1);
        // line 38
        echo "                        <ul class=\"list-unstyled\">
                            ";
        // line 39
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable(range(0, (isset($context["size"]) ? $context["size"] : null)));
        foreach ($context['_seq'] as $context["_key"] => $context["index"]) {
            // line 40
            echo "                                <li><a href=\"";
            echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute((isset($context["footer_elements"]) ? $context["footer_elements"] : null), 2, array(), "array"), "entity", array()), "field_links", array()), $context["index"], array(), "array"), "url", array()), "html", null, true));
            echo "\" tabindex=\"0\"
                                       target=\"_blank\">";
            // line 41
            echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute((isset($context["footer_elements"]) ? $context["footer_elements"] : null), 2, array(), "array"), "entity", array()), "field_links", array()), $context["index"], array(), "array"), "title", array()), "html", null, true));
            echo " </a>
                                </li>
                            ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['_key'], $context['index'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 44
        echo "                        </ul>
                    </div>
                 </div>
                ";
        // line 47
        $context["size"] = (twig_length_filter($this->env, $this->getAttribute($this->getAttribute($this->getAttribute((isset($context["footer_elements"]) ? $context["footer_elements"] : null), 3, array(), "array"), "entity", array()), "field_links", array())) - 1);
        // line 48
        echo "                <div class=\"row\">
                    <div class=\"col-sm-12\">
                        <ul class=\"list-inline\">
                            ";
        // line 51
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable(range(0, (isset($context["size"]) ? $context["size"] : null)));
        foreach ($context['_seq'] as $context["_key"] => $context["index"]) {
            // line 52
            echo "                                <li><a href=\"";
            echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute((isset($context["footer_elements"]) ? $context["footer_elements"] : null), 3, array(), "array"), "entity", array()), "field_links", array()), $context["index"], array(), "array"), "url", array()), "html", null, true));
            echo "\" tabindex=\"0\"
                                       target=\"_blank\">";
            // line 53
            echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute((isset($context["footer_elements"]) ? $context["footer_elements"] : null), 3, array(), "array"), "entity", array()), "field_links", array()), $context["index"], array(), "array"), "title", array()), "html", null, true));
            echo " </a>
                                </li>
                            ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['_key'], $context['index'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 56
        echo "                        </ul>
                        </div>
                    </div>
            </div>
            <div class=\"col-sm-3\">
                <a target=\"_blank\" href=\"";
        // line 61
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute((isset($context["footer_elements"]) ? $context["footer_elements"] : null), 4, array(), "array"), "entity", array()), "field_links", array()), 0, array(), "array"), "url", array()), "html", null, true));
        echo "\" tabindex=\"0\"><img class=\"sc-50years-community\" src=\"";
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, call_user_func_array($this->env->getFunction('file_url')->getCallable(), array($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute((isset($context["footer_elements"]) ? $context["footer_elements"] : null), 4, array(), "array"), "entity", array()), "field_img", array()), 0, array()), "entity", array()), "uri", array()), "value", array()))), "html", null, true));
        echo "\"
                                                                                                               alt=\"";
        // line 62
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, $this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute((isset($context["footer_elements"]) ? $context["footer_elements"] : null), 4, array(), "array"), "entity", array()), "field_img", array()), 0, array()), "alt", array()), "html", null, true));
        echo "\" ></a>
            </div>

        </div>
    </div>


</div>";
    }

    public function getTemplateName()
    {
        return "themes/custom/scc_heros/templates/blocks/block--sccfooterblock.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  198 => 62,  192 => 61,  185 => 56,  176 => 53,  171 => 52,  167 => 51,  162 => 48,  160 => 47,  155 => 44,  146 => 41,  141 => 40,  137 => 39,  134 => 38,  132 => 37,  128 => 36,  123 => 33,  114 => 30,  109 => 29,  105 => 28,  102 => 27,  100 => 26,  96 => 25,  91 => 22,  82 => 19,  77 => 18,  73 => 17,  70 => 16,  68 => 15,  64 => 14,  58 => 10,  56 => 9,  48 => 4,  43 => 1,);
    }
}
/* <div class="container">*/
/*     <div class="row">*/
/*         <div class="col-sm-12">*/
/*             {{ content['body'] }}*/
/*         </div>*/
/*     </div>*/
/* */
/*     <div class="row">*/
/*         {% set footer_elements = content['field_footer_elements']['#items'] %}*/
/*         <div class="row">*/
/*             <div class="col-sm-9">*/
/*                 <div class="row">*/
/*                     <div class="col-sm-4">*/
/*                         {{ footer_elements[0].entity.body[0].value|raw }}*/
/*                         {% set size =  footer_elements[0].entity.field_links|length - 1 %}*/
/*                         <ul class="list-inline social-media-links">*/
/*                             {% for index in 0..size %}*/
/*                                 <li><a href="{{ footer_elements[0].entity.field_links[index].url }}" target="_blank" tabindex="0"><i*/
/*                                                 class="{{ footer_elements[0].entity.field_links[index].title }} "></i></a>*/
/*                                 </li>*/
/*                             {% endfor %}*/
/*                         </ul>*/
/*                     </div>*/
/*                     <div class="col-sm-4">*/
/*                         {{ footer_elements[1].entity.body[0].value|raw }}*/
/*                         {% set size =  footer_elements[1].entity.field_links|length - 1 %}*/
/*                         <ul class="list-unstyled">*/
/*                             {% for index in 0..size %}*/
/*                                 <li><a href="{{ footer_elements[1].entity.field_links[index].url }}"*/
/*                                        target="_blank" tabindex="0">{{ footer_elements[1].entity.field_links[index].title }} </a>*/
/*                                 </li>*/
/*                             {% endfor %}*/
/*                         </ul>*/
/*                     </div>*/
/*                     <div class="col-sm-4">*/
/*                         {{ footer_elements[2].entity.body[0].value|raw }}*/
/*                         {% set size =  footer_elements[2].entity.field_links|length - 1 %}*/
/*                         <ul class="list-unstyled">*/
/*                             {% for index in 0..size %}*/
/*                                 <li><a href="{{ footer_elements[2].entity.field_links[index].url }}" tabindex="0"*/
/*                                        target="_blank">{{ footer_elements[2].entity.field_links[index].title }} </a>*/
/*                                 </li>*/
/*                             {% endfor %}*/
/*                         </ul>*/
/*                     </div>*/
/*                  </div>*/
/*                 {% set size =  footer_elements[3].entity.field_links|length - 1 %}*/
/*                 <div class="row">*/
/*                     <div class="col-sm-12">*/
/*                         <ul class="list-inline">*/
/*                             {% for index in 0..size %}*/
/*                                 <li><a href="{{ footer_elements[3].entity.field_links[index].url }}" tabindex="0"*/
/*                                        target="_blank">{{ footer_elements[3].entity.field_links[index].title }} </a>*/
/*                                 </li>*/
/*                             {% endfor %}*/
/*                         </ul>*/
/*                         </div>*/
/*                     </div>*/
/*             </div>*/
/*             <div class="col-sm-3">*/
/*                 <a target="_blank" href="{{ footer_elements[4].entity.field_links[0].url }}" tabindex="0"><img class="sc-50years-community" src="{{ file_url(footer_elements[4].entity.field_img.0.entity.uri.value) }}"*/
/*                                                                                                                alt="{{ footer_elements[4].entity.field_img.0.alt }}" ></a>*/
/*             </div>*/
/* */
/*         </div>*/
/*     </div>*/
/* */
/* */
/* </div>*/
