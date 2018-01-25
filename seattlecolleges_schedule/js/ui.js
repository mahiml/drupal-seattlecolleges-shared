var CheckSecure = false;



//DOUG - the code has become so bloated that objects are not fully loaded
//and available by the time we are trying to use them in many of these assignments below
//I detected this problem while using chrome and finding the page not loading
//each time I opened a new tab, it would only load if I refreshed it
//a cursory examination showed me a javascript error on ui.js when trying to use the
//[user] object before it had fully loaded
$(document).on('ready', function () {

    if (CheckSecure && document.protocol != 'https:') {
        reloadToSecure();
    }

    /*
    $("#critical-dates").collapsible({
        expand: function (event, ui) {
            myCampus.hideSearchBox();
        },
        collapse: function (event, ui) {

        }
    });
    */
    $("#critical-dates").on('click', function () {
        //toggle dates list
        if ($("#critical-dates").hasClass('openList')) {
            $("#critical-dates").removeClass('openList');
        } else {
            $("#critical-dates").addClass('openList');
        }
    });
    $("#quarterSelector").on('click', function () {
        setTimeout(function () {
            $("#critical-dates").removeClass('openList');
        }, 5);
    });


    //$('#SubmitGainfulEmploymentCheck').on('click', function(){
    //    user.SubmitGainfulEmploymentCheck();
    //});



    $('#instructors').click(function () {
        console.log('instructor clicked');
    });

    $('.loginTrigger').click(function () {
        if ($(this).data('menu')) {
            console.log('open menu');
            Html.showMyCampusMenuDisplay($(this).data('menu'));

        } else if (!$($(this).attr('href')).hasClass('activeNav')) {
            $('.loginWrapper').removeClass('activeNav');
            $('.loginTrigger').removeClass('activeNav');
            window.scrollTo(0, 0);

            //myCampus.TTL =0;// for testing

            console.log('TTL: ' + user.TTL);
            if (user.TTL == -1) {

                $($(this).attr('href')).addClass('activeNav');
                $(this).addClass('activeNav');

            } else if (user.TTL < 10000 && $(this).attr('id') == 'myCollegeMenuTrigger') {

                console.log('after SOS hours, show the new login popup/modal');

                $('#sosClosedPopUp').addClass('activeNav');
                $(this).addClass('activeNav');


            } else  {
                //} else if ($(this).attr('id') !== 'myCollegeMenuTrigger') {

                $($(this).attr('href')).addClass('activeNav');
                $(this).addClass('activeNav');

            }

            if ($(this).hasClass('inPortalLink')) {
                $('.activeNav').removeClass('activeNav');
                $('section' + $(this).attr('href')).addClass('activeNav');

                var thisHref = $(this).attr('href');
                $('.footerNav').each(function () {
                    if ($(this).attr('href') == thisHref) {
                        $(this).addClass('activeNav');
                    }
                });

            }
        } else {
            $('.loginWrapper').removeClass('activeNav');
            $('.loginTrigger').removeClass('activeNav');
        }

    });

    $('#LnkLogin').on('click', function (e) {
        //$(   $( this )   ).parent().removeClass('activeNav');
        Html.showLogin();
        e.preventDefault();
    });

    //set the initial login functional
    $('#BtSignIn').on('click', function () {
        //$('#LoginMessages').empty(); /* done in Html */
        user.Login();
    });


    $('#NotAStudentLink').on('click', function () {
        console.log('NotAStudent');
        Html.showNotAStudent();
    });

    $('#SignIn .userMenuButton.notAStudent').on('click', function () {
        console.log('NotAStudent');
        Html.showNotAStudent();
    });

    $('#NotAStudentLinkSosClosed').on('click', function () {
        console.log('NotAStudentLinkSosClosed');
        Html.showNotAStudent();
    });

    $('.closeMenu').click(function () {
        $($(this)).parent().removeClass('activeNav');
    });

    $('#regAppointment').click(function () {
        console.log('regAppointment');

        Html.showRegAppointment();
        e.preventDefault();
    });

    $('.menuRow .first, .menuRow .second, .menuRow .third, #hamburgerMenu div ').click(function () {
        var sectionReturnTo = $('section.activeNav');
        console.log(sectionReturnTo);

        //simplest way to clear tuition amount before opening it
        $('#TuitionDisplay').empty();

        if ($(this).data('menu') != undefined && $(this).data('menu') != "") {
            Html.showMyCampusMenuDisplay($(this).data('menu'), sectionReturnTo);
        }
    });

    $('#RegisterNow').click(function () {
        console.log('registerNow');
        if(!user.IsRegistrationBlocked){
            Html.showRegisterNow();
        }
    });

    $('#CheckGrades').click(function () {
        console.log('checkGrades clicked');


        ga('send', 'pageview', '/unofficialTranscript');
        ga('send', 'event', 'Check Grades Selected');

        user.getTranscript();
    });

    $('#financialAid').click(function () {
        ga('send', 'pageview', '/financialAid');
        ga('send', 'event', 'Check Financial Aid');

    });

    //$('#OfficialTranscript').click(function () {
    //    Html.showOfficialTranscript();
    //});


    $('#BtnViewSchedule').click(function () {
        user.getSchedule();
    });


    viewBlockedSchedule = function(){
        console.log('viewBlockedSchedule');
        $('.footerNav.authenticatedOnly.mycampus').click();
        setTimeout(function(){
            user.getSchedule();
        }, 5 );
    };







    $('#LnkMyRegistrationAppointment').click(function () {
        Html.showRegAppointment();
    });

    $('#BtSubmitQuestion').on('click', function () {
        user.answerQuestions();
    });


    $('.footerNav').click(function () {
        //close the myClasses menus
        Html.hideMyFavorites();
        Html.hideRegisteredItems();
        Html.hideWaitListItems();

        Html.hideEdPlan();
        console.log($.mobile.activePage);

        if (!$(this).hasClass('footerDisabled')) {
            $('.activeNav').removeClass('activeNav');
            $(this).addClass('activeNav');
            $('section' + $(this).attr('href')).addClass('activeNav');

            window.location.href = $(this).attr('href');

            var trackerText = $(this).text();
            if (trackerText == 'Class Schedule') { trackerText = 'home'; }

            ga('send', 'event', trackerText, 'Page Opened');
            ga('set', 'page', '/' + trackerText);
            ga('send', 'pageview');

            $('html, body').animate({
                scrollTop: $('.full-width-branded').offset().top
            }, 500);

            var depts = $('#departments li').text();

            if (depts == undefined || depts == '') {
                myCampus.getDepartments(myCampus.SelectedYRQ);
                Html.showDepts();
            } else {
                if($(this).attr('href') == "#mycampus"){
                    if(user.IsRegistrationBlocked){
                        if($('#RegisterNow').hasClass("registrationBlocked")){} else {
                            $('#RegisterNow').addClass("registrationBlocked");
                        }
                    } else {
                        if($('#RegisterNow').hasClass("registrationNotBlocked")){
                        } else {
                            $('#RegisterNow').addClass("registrationNotBlocked");
                        }
                    }
                }
            }

            var sectionReturnTo = $('section.activeNav');
            console.log(sectionReturnTo);
            Html.closeMyCampusMenuDisplay($(this).data('menu'), sectionReturnTo);
        } else {

            //myCampus.TTL =0;// for testing

            console.log(user.TTL);
            if (user.TTL == -1) {

                console.log('force login');
                Html.showLogin($(this) );

            } else if (user.TTL < 10000) {

                console.log('after SOS hours, show the new login popup/modal');

                $('#sosClosedPopUp').addClass('activeNav');
                $(this).addClass('activeNav');
            }
        }
    });

    $('#LnkMyProfile').on('click', function (e) {

        ga('send', 'pageview','/updateProfile');

        Html.showProfile();
        Html.initProfileUpdate();
        e.preventDefault();
    });

    $('#LnkMyPin').on('click', function (e) {
        $('.loginWrapper').removeClass('activeNav');
        $('.loginTrigger').removeClass('activeNav');

        ga('send', 'pageview', '/changePin');

        Html.showChangePin();
        e.preventDefault();
    });


    /* secret question disabled*/
    $('#LnkSecretQuestion').on('click', function (e) {
        console.log('secret question clicked');
        Html.showSecretQuestion();
        e.preventDefault();
    });


    $('#LnkMyTuition').on('click', function (e) {
        Html.showTuition();
        e.preventDefault();
    });

    $('#LnkMyFavorites').on('click', function (e) {
        Html.showMyFavorites();
        e.preventDefault();
    });

    $('#LnkRegisteredItems').on('click', function (e) {
        Html.showRegisteredItems();
        e.preventDefault();
    });

    $('#LnkWaitListItems').on('click', function (e) {
        Html.showWaitListItems();
        e.preventDefault();
    });

    $('#LnkMyScheduleItem').on('click', function (e) {
        user.getSchedule();
        e.preventDefault();
    });

    $('#LnkMyEdPlanItem').on('click', function (e) {
        //user.getSchedule();
        console.log('show the plans');
        edplan.getEdPlanSelectorData();
        //Html.showEdPlan();
        e.preventDefault();
    });

    $('#LnkMyAdvisorItems').on('click', function (e) {
        console.log('show the notes');
        Advisor.getAdvNotesList();
        e.preventDefault();
    });






    $('#LnkLogOff').click(function (e) {
        user.LogOff();
        e.preventDefault();
    });

    $('.creditreturnDisplayClose').on('click', function () {
        Html.hidePopUp();
    });

    $('.closePopUp').on('click', function () {
        Html.hidePopUp();
    })

    $(".toggle-filters").click(function () {
        //to do:
        //get set the position of the filter
        //to the top of mobile view

        //$("#large-filters").css({ width: '100%', position: 'absolute' });

        console.log('left: ' + $("#large-filters").css('left') + 'top: ' + $("#large-filters").css('top'));

        //if ($("#large-filters").css('left') == '-2000px') {
        //    $("#large-filters").animate({ left: ".5em" }, 200);
        //    $('html, body').animate({ scrollTop: 0 }, 'slow');
        //} else {
        //    $("#large-filters").animate({ left: "-2000px" }, 400);

        //}
        $("#large-filters").animate({ width: 'toggle' });
    });

    $('#selectCampus').on('change', function () {
        console.log('selectCampus: ' + $('#selectCampus').val() );
        var devCampus = $('#selectCampus').val();
        setDevCampus( devCampus );
    });



    $("#TestScores").click(function () {
        console.log('TestScores clicked');

        ga('send', 'pageview', '/testScores');

        testScores.showTestScores();
    });


    $("#StartToFinish").click(function () {
        console.log('StartToFinish');

        ga('send', 'pageview', '/progressIndicators');


        showStartToFinish();
    });

    $("#CourseReview").click(function () {
        var mycampclick = "mycampclick";

        ga('send', 'pageview', '/courseReviews');

        ClassEval.getClassEvaluation(mycampclick);
    });

    $('#BtnDegreeAudit').click(function () {

        ga('send', 'pageview', '/degreeAudit');

    });



    $('#toggleTrigger').on('click', function () {
        console.log("toggle view mode");

        //check for cookie

        //if (myCampus.getCookie("tSessionId") != "") {
        //    console.log(myCampus.getCookie("tSessionId"));
        //} else {
        //    myCampus.setCookie("tSessionId", "", 30);
        //}
        if (isMobile()) {
            myCampus.setCookie("tSessionId", "desktop", 50);
        } else {
            myCampus.setCookie("tSessionId", "mobile", 50);
        }

        console.log(document.location);
        location.reload();
    });


});

setDevCampus = function( devCampus ){
    console.log('setDevCampus: ' + devCampus);

    $('#selectStudent').empty();

    switch (devCampus) {

        case '062':
            $('<option>').text('none').attr({ 'devPin': '-1' }).val('-1').appendTo($('#selectStudent'));
            $('<option>').text('').attr({ 'devPin': '' }).val('').appendTo($('#selectStudent'));
            $('<option>').text('').attr({ 'devPin': '' }).val('').appendTo($('#selectStudent'));

            $('#selectStudent').selectmenu('refresh');

            break;

        case '063':
            $('<option>').text('none').attr({ 'devPin': '-1' }).val('-1').appendTo($('#selectStudent'));
            $('<option>').text('College Applicant 985753061').attr({ 'devPin': '010175' }).val('985753061').appendTo($('#selectStudent'));
            //$('#TxPIN').val('010175');
            $('<option>').text('College Joe 980300409').attr({ 'devPin': '010375' }).val('980300409').appendTo($('#selectStudent'));
            //$('#TxPIN').val('010375');
            $('<option>').text('Doe Jane 980020833').attr({ 'devPin': '888888' }).val('980020833').appendTo($('#selectStudent'));
            //$('#TxPIN').val('888888');

            $('#selectStudent').selectmenu('refresh');

            break;

        case '064':
            $('<option>').text('none').attr({ 'devPin': '-1' }).val('-1').appendTo($('#selectStudent'));
            $('<option>').text('South Ones 991256201').attr({ 'devPin': '031855' }).val('991256201').appendTo($('#selectStudent'));
            //$('#TxPIN').val('031855');
            $('<option>').text('South Twos 991256209').attr({ 'devPin': '031567' }).val('991256209').appendTo($('#selectStudent'));
            //$('#TxPIN').val('031567');
            $('<option>').text('South Three 991256210').attr({ 'devPin': '102061' }).val('991256210').appendTo($('#selectStudent'));
            //$('#TxPIN').val('102061');
            $('<option>').text('Susie South 991240635').attr({ 'devPin': '031855' }).val('991240635').appendTo($('#selectStudent'));
            //$('#TxPIN').val('031855');
            $('<option>').text('Pat e oFurniture 985634864').attr({ 'devPin': '010670' }).val('985634864').appendTo($('#selectStudent'));
            //$('#TxPIN').val('010670');
            $('<option>').text('Frank N. Stein 985601912').attr({ 'devPin': '010270' }).val('985601912').appendTo($('#selectStudent'));
            //$('#TxPIN').val('010270');
            $('<option>').text('Danelle Johnson 985618652').attr({ 'devPin': '050350' }).val('985618652').appendTo($('#selectStudent'));
            //$('#TxPIN').val('050350')


            $('#selectStudent').selectmenu('refresh');

            break;

        case '065':

            break;

    }

}



function reloadToSecure() {

    var campusFolder;
    switch (myCampus.CampusCode) {
        case '062':
            campusFolder = 'central';
            break;
        case '063':
            campusFolder = 'north';
            break;
        case '064':
            campusFolder = 'south';
            break;
        case '065':
            campusFolder = 'svi';
            break;
    }


    if (CheckSecure) {
        window.location = 'https://' + window.location.host + window.location.pathname;
    } else {
        alert('https://' + window.location.host + window.location.pathname);
    }
}




//this is convenient for catching all AJAX errors
//but it creates slight complications in exception handling
//no big but explanation listed out below.
$(document).ajaxError(function (event, jqxhr, settings, thrownError) {

    //remove ajax popup
    $.mobile.loading('hide');

    //NOTE THIS ALLOWS SECURE CHECK TO RESPOND TO EXCEPTION PURPOSELY THROWN
    //we could examine the [jqxhr] parameter and find the specific message
    //"Secure Connection Required." but this involves parsing a big string
    //the below will have the same effect but we won't do the string parsing unless we must

    //Also this would be unnecessary if we were using the individual .error
    //function in each AJAX call because the allows for a direct look at
    //[webmethodrValue.responseJSON.Message] which would give us the
    //specific exception without parsing strings
    if (CheckSecure && document.protocol != 'https:') {
        if (jqxhr.responseText.indexOf('Secure Connection Required') > -1) {
            reloadToSecure();
        }
    } else {
        //alert('An unknown problem occurred with your last request. Please refresh the page and try again or try again later.');
        var msg = 'An unknown problem occurred with your last request. Please refresh the page and try again or try again later.';
        //show AJAX error popUp
        Html.showErrorPopUp( msg );
    }


});


$(window).on('hashchange', function () {
    console.log('hashchange');

    var hash = window.location.hash;
    //if (hash == "filter-instructor-dialog") {
    //    console.log('instructor');
    //}

    //console.log(hash.indexOf("ui-state") > -1);



    switch (hash) {
        case '':

            break;
        case '#':
            //logoff
            //Apply Filters
            //Back to Department List
            //no text - title of Transfer AA Degree Requirements
            //no text - title of Special Requirements
            //no text - title of Areas of Knowledge
            //no text - title of Integrated Studies
            //id="SmallFiltersBtn"
            //id="btn-deptlist"

            break;
        case '#home':
            //if you're doing something like this it would be nice
            //to leave a comment on what is the signifigance of "ui-state" in this case?
            if (!(hash.indexOf("ui-state") > -1)) {
                console.log('hash = home');

                $('#filter-instructor-dialog').removeClass('ui-page-active');
                $('div.ui-page:first-child').addClass('ui-page-active');

            }


            break;
        case '#myCollegeMenu':

            break;
        case '#myclasses':
            console.log(isMobile());

            if (!isMobile()) {
                Html.buildClassPageForDesktop();
            }
            break;
        case '#RegisteredItems':

            break;
        case '#WaitListItems':

            break;
        case '#MyEdPlanItem':

            break;
        case '#hamburgerMenu':

            break;
        case '#more':

            break;
        case '#mycampus':

            break;
        case '#Login':

            break;
        case '#ForgotSID':

            break;
        case '#ForgotPassword':

            break;
        case '#notAStudent':

            break;
        case '#myProfile':

            break;
        case '#changePin':

            break;
        case '#secretQuestion':

            break;
        case '#aa-aok-legend-popup':

            break;
        case '#aa-sr-legend-popup':

            break;
        case '#aa-is-legend-popup':

            break;
        case '#Favorites':

            break;
        case 'filter-instructor-dialog':
            console.log('instructor');
            break;
        default:
            break;
    }


});




$(document).on('pageinit', function () {
    console.log('pageinit');

    var hash = window.location.hash;

    console.log(hash);
    console.log(hash.indexOf("ui-state") > -1);

});



$(document).on('pagebeforeshow', function () {
    console.log('pagebeforeshow');
    var hash = window.location.hash;

    console.log(hash);
    console.log(hash.indexOf("ui-state") > -1);

    var uiState = (hash.indexOf("ui-state") > -1);



    if (uiState && myCampus.SelectedQuarter.FriendlyName == undefined) {
        //myCampus.getQuarters();
    }

    if (hash == '#home' || hash == '' || hash == undefined || hash == '#creditreturn') {

        //console.log(myCampus.SelectedQuarter.FriendlyName);

        //DOUG - What is this? Why would the friendlyname be undefined?
        //How is that a good indicator of something? Perhaps if I understand the context I will agree?
        if (myCampus.SelectedQuarter.FriendlyName == undefined) {
            console.log('go home');
            //myCampus.getQuarters();

            //resetting the instructor filter, trying to solve instructor filter baggage
            $('#filter-instructor-dialog').removeClass('ui-page-active');
            $('div.ui-page:first-child').addClass('ui-page-active');

        }

    }
});



$(document).on("mobileinit", function() {
    console.log('mobileinit');
    $.mobile.loader.prototype.options.text = "loading";
    $.mobile.loader.prototype.options.textVisible = true;
    $.mobile.loader.prototype.options.theme = "b";
    $.mobile.loader.prototype.options.html = "";
});

