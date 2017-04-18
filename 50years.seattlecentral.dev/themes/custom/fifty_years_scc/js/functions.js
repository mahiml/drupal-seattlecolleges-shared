(function ($) {
    var searchButtonId = "Search";
    $("#" + searchButtonId).click(function () {
        var searchFieldId = "searchBar";
        $("#" + searchFieldId).toggle();
    });
    $('#navigationMenuButton').click(function () {
        document.getElementById("myNav").style.height = "100%";
    });

    $("#closeNavMenu").click(function () {
        document.getElementById("myNav").style.height = "0%";
    });

    $('#50thnavigationMenuButton').click(function () {
        document.getElementById("50thNav").style.width = "250px";
        document.getElementById("50thNav").style.display = "block";

    });

    $("#50thcloseNavMenu").click(function () {
        document.getElementById("50thNav").style.width = "0px";
        document.getElementById("50thNav").style.display = "none";

    });

    $("#openSearchNav").click(function () {
        document.getElementById("searchNav").style.width = "250px";
        document.getElementById("header").style.marginRight = "250px";
        document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
    });

    $("#closeSearchNav").click(function () {
        document.getElementById("searchNav").style.width = "0";
        document.getElementById("main").style.marginRight = "0";
        document.body.style.backgroundColor = "black";
    });
    $('#then-and-now-carousel').carousel();
    $(window).scroll(function () {
        if ($(".navbar").offset().top > 50) {
            $(".navbar-fixed-top").addClass("top-nav-collapse");
        } else {
            $(".navbar-fixed-top").removeClass("top-nav-collapse");
        }
    });
    $('#history-carousel').carousel();
    $(window).scroll(function () {
        if ($(".navbar").offset().top > 50) {
            $(".navbar-fixed-top").addClass("top-nav-collapse");
        } else {
            $(".navbar-fixed-top").removeClass("top-nav-collapse");
        }
    });

//jQuery for page scrolling feature - requires jQuery Easing plugin
    $(function () {
        $('a.page-scroll').bind('click', function (event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top
            }, 1500, 'easeInOutExpo');
            event.preventDefault();
        });
    });

    $(function($){
        // Removes bottom margin of <p> wrapper that gets inserted around images with caption class
        $('p>a>img').each(function() {
            // Make this code do what you want.
            if(!$(this).hasClass('img-circle')){
                $(this).parent().unwrap();
            }
        });

    });

    $(function(){
        var navMain = $("#50thNav");
        navMain.on("click", "a", null, function () {
            navMain.collapse('hide');
        });
    });

    $(function() {

        var player = new Vimeo.Player('bgvid');

        document.getElementById('page-top').onclick = function () {
            player.getPaused().then(function (paused) {
                if (!paused) {
                    player.pause().then(function () {
                    }).catch(function () {
                    });
                }
                else {
                    player.play().then(function () {
                    }).catch(function () {
                    });
                }
            }).catch(function (error) {
                // an error occurred
            });
        };

        var $window = $(window);
        function checkWidth() {
            var windowsize = $window.width();
            var iframe =  $("#bgvid");
            if (windowsize < 1100) {
                iframe.hide();
            }else {
                iframe.show();
            }
        }
        // Execute on load
        checkWidth();
        // Bind event listener
        $(window).resize(checkWidth);
        var player = new Vimeo.Player('bgvid');
        player.on('loaded', function (id) {
            checkWidth();
        });

    })
})(jQuery);