function openMainNav() {
    document.getElementById("main-page-container").style.marginLeft = "200px";
    document.getElementById("main-sidenav").style.width = "200px";
}

function closeMainNav() {
    document.getElementById("main-page-container").style.marginLeft = "0";
    document.getElementById("main-sidenav").style.width = "0";
}

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

    if($("#directory").length > 0) {
        $('#directory').DataTable({"iDisplayLength": 100});
    }

    $('#main-menu-div').on('click', function (e) {
        document.getElementById("scSidenav").style.width = "250px";
        $('#scSidenav').find('a').each(function () {
            var $input = $(this);
            $input.attr("tabindex", 0);
        });
    });

    $('.closebtn').on('click', function (e) {
        document.getElementById("scSidenav").style.width = "0px";
        $('#scSidenav').find('a').each(function () {
            var $input = $(this);
            $input.attr("tabindex", -1);
        });
    });

    $('#main-menu-div').keypress(function (e) {
        if (e.keyCode == 13) {
            document.getElementById("scSidenav").style.width = "250px";
            $('#scSidenav').find('a').each(function () {
                var $input = $(this);
                $input.attr("tabindex", 0);
            });
        }
    });

    $(function () {
        /**
         * NAME: Bootstrap 3 Multi-Level by Johne
         * This script will active Triple level multi drop-down menus in Bootstrap 3.*
         */
        $('li.dropdown-submenu').on('click', function (event) {
            event.stopPropagation();
            if ($(this).hasClass('open')) {
                $(this).removeClass('open');
                $('li.dropdown-submenu').find('a').each(function () {
                    var $input = $(this);
                    $input.attr("tabindex", -1);
                });
            } else {
                $('li.dropdown-submenu').removeClass('open');
                $(this).addClass('open');
                $('li.dropdown-submenu').find('a').each(function () {
                    var $input = $(this);
                    $input.attr("tabindex", 0);
                });
            }
        });

        $('li.dropdown').on('click', function (event) {
            if ($(this).hasClass('open')) {
                $(this).find('ul.dropdown-menu').find('li').find('a').each(function () {
                    var $input = $(this);
                    $input.attr("tabindex", -1);
                });
            } else {
                $(this).find('ul.dropdown-menu').find('li').find('a').each(function () {
                    var $input = $(this);
                    $input.attr("tabindex", 0);
                });
            }
        });

        $('li.dropdown-submenu').keydown(function (e) {
            var keyCode = e.keyCode ? e.keyCode : e.which;
            if (keyCode == 13) {
                if ($(this).hasClass('open')) {
                    $('li.dropdown-submenu').find('a').each(function (e) {
                        var $input = $(this);
                        $input.attr("tabindex", -1);
                    });
                } else {
                    $('li.dropdown-submenu').find('a').each(function () {
                        var $input = $(this);
                        $input.attr("tabindex", 0);
                    });
                }
            }
        });

        $('li.dropdown').keydown(function (e) {
            var keyCode = e.keyCode ? e.keyCode : e.which;
            if (keyCode == 13) {
                if ($(this).hasClass('open')) {
                    $(this).find('ul.dropdown-menu').find('li').find('a').each(function () {
                        var $input = $(this);
                        $input.attr("tabindex", -1);
                    });
                } else {
                    $("a:first", this).click();
                    $(this).find('ul.dropdown-menu').find('li').find('a').each(function () {
                        var $input = $(this);
                        $input.attr("tabindex", 0);
                    });
                }
            }
        });
    });

// ===== Scroll to Top ====
    $(window).scroll(function() {
        if ($(this).scrollTop() >= 50) {        // If page is scrolled more than 50px
            $('#return-to-top').fadeIn(200);    // Fade in the arrow
        } else {
            $('#return-to-top').fadeOut(200);   // Else fade out the arrow
        }
    });
    $('#return-to-top').click(function() {      // When arrow is clicked
        $('body,html').animate({
            scrollTop : 0                       // Scroll to top of body
        }, 500);
    });
})(jQuery);

