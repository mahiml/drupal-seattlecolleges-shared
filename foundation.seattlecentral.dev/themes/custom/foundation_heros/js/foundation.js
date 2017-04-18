(function ($) {
    $('#collapseSectionmenu').on('shown.bs.collapse', function () {
        $(".icon.ion-chevron-down").removeClass("ion-chevron-down").addClass("ion-chevron-up");
    });

    $('#collapseSectionmenu').on('hidden.bs.collapse', function () {
        $(".icon.ion-chevron-up").removeClass("ion-chevron-up").addClass("ion-chevron-down");
    });

    $('#collapseSearch').on('shown.bs.collapse', function () {
        $(".icon.ion-search").removeClass("ion-search").addClass("ion-close-circled");
    });

    $('#collapseSearch').on('hidden.bs.collapse', function () {
        $(".icon.ion-close-circled").removeClass("ion-close-circled").addClass("ion-search");
    });
})(jQuery);