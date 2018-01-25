(function ($) {

    'use strict';

    /**
     * Attach behaviors to the file fields passed in the settings.
     *
     * @type {Drupal~behavior}
     *
     * @prop {Drupal~behaviorAttach} attach
     *   Attaches validation for file extensions.
     * @prop {Drupal~behaviorDetach} detach
     *   Detaches validation for file extensions.
     */
    Drupal.behaviors.initScheduleElement = {
        attach: function (context, settings) {
            $("div.scc-schedule-tab-menu>div.list-group>a").click(function (e) {
                e.preventDefault();
                $(this).siblings('a.active').removeClass("active");
                $(this).addClass("active");
                var index = $(this).index();
                $("div.scc-schedule-tab>div.scc-schedule-tab-content").removeClass("active");
                $("div.scc-schedule-tab>div.scc-schedule-tab-content").eq(index).addClass("active");
            });
        }
    }
})(jQuery);