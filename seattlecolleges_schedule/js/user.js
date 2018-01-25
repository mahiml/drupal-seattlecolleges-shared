

function User() {
    var self = this;
    this.IsAuthenticated = false;
    this.TTL = -1;
    var TTLcounter = undefined;
    this.InProcessClasses = undefined;
    this.InProcessLinkedClasses = undefined;
    this.UnprocessedItems = undefined;
    this.MyFavoriteClasses = undefined;
    this.QuestionnairePrompts = undefined;
    this.Profile = undefined;
    this.RegisteredClasses = undefined;
    this.WaitListedClasses = undefined;
    this.Account = undefined;
    this.Transcript = undefined;
    this.RegAppointment = undefined;
    this.PunitiveMessages = undefined;
    this.IsRegistrationBlocked = false;
    this.NavigateURL = undefined;
    this.ReturnURL = undefined;
    this.Schedule = undefined;

    //used to get a classitem obect if exists in user's myfavoriteclasses
    //returns [classitem] object by itemNumber passed in else returns undefined
    this.getFavoriteByItemNumber = function (itemNumber) {
        var fav;
        if (self.MyFavoriteClasses != undefined){
            $.each(self.MyFavoriteClasses, function () {
                if (this.ItemNumber == itemNumber) {
                    fav = this;
                }
            });
        }
        return fav;
    }


    this.removeFavoriteByItemNumber = function (itemNumber) {
        var idx = -1;

        for (var i = 0; i < self.MyFavoriteClasses.length; i++) {
            if (self.MyFavoriteClasses[i].ItemNumber == itemNumber) {
                idx = i;
                break;
            }
        };

        if (idx > -1) {
            self.MyFavoriteClasses.splice(idx, 1);
        }
    }


    this.getRegisteredByItemNumber = function (itemNumber) {
        var reg;
        if (self.RegisteredClasses != undefined) {
            $.each(self.RegisteredClasses, function () {
                if (this.ItemNumber == itemNumber) {
                    reg = this;
                }
            });
        }
        return reg;
    }


    this.removeRegisteredByItemNumber = function (itemNumber) {
        var idx = -1;

        for (var i = 0; i < self.RegisteredClasses.length; i++) {
            if (self.RegisteredClasses[i].ItemNumber == itemNumber) {
                idx = i;
                break;
            }
        };

        if (idx > -1) {
            self.RegisteredClasses.splice(idx, 1);
        }
    }


    this.getWaitListByItemNumber = function (itemNumber) {
        var waitL;
        if (self.WaitListedClasses != undefined) {
            $.each(self.WaitListedClasses, function () {
                if (this.ItemNumber == itemNumber) {
                    waitL = this;
                }
            });
        }
        return waitL;
    }


    this.removeWaitListByItemNumber = function (itemNumber) {
        var idx = -1;

        for (var i = 0; i < self.WaitListedClasses.length; i++) {
            if (self.WaitListedClasses[i].ItemNumber == itemNumber) {
                idx = i;
                break;
            }
        };

        if (idx > -1) {
            self.WaitListedClasses.splice(idx, 1);
        }
    }


    this.getStudentData = function () {
        $.mobile.loading('show')

        var parameters = new Object();
        parameters.campusCode = myCampus.CampusCode;
        parameters.quarter = myCampus.SelectedYRQ;
        parameters.today = $('#DevToday').val().length > 0 ? $('#DevToday').val() : '';

        $.ajax({
            type: 'POST',
            async: true,
            contentType: 'application/json; charset=utf-8',
            url: portalRef + 'WebServices/PortalServices.asmx/GetStudentData',
            data: JSON.stringify(parameters),
            dataType: 'json',
            success: function (rValue) {
                $.mobile.loading('hide');
                var userContext = rValue.d;

                //success shows successful authentication in this case
                if (userContext.ServiceStatus.IsSuccess) {

                    self.MyFavoriteClasses = userContext.Context.MyFavoriteClasses;
                    self.RegisteredClasses = userContext.Context.RegisteredClasses;
                    self.WaitListedClasses = userContext.Context.WaitListedClasses;
                    self.Account = userContext.Context.Account;
                    self.RegAppointment = userContext.Context.RegistrationAppointment;

                    //DOUG - Added 5/27/2015 due to various cross-campus registration appt issues
                    //check == false below will allow veterans to register early while still allowing
                    //other students to register regardless of reg appt after registration starts
                    //problem exists with North/South that new students dont apparently have a reg appt
                    //so using it as an indicator to display buttons or not doesn't work
                    //this is cross campus solution that should work for all situations
                    //if (self.RegAppointment.IsPastAppointment == false) {
                    //    self.RegAppointment.IsPastAppointment = myCampus.SelectedQuarter.IsRegistrationOpen;
                    //}

                    Html.QSDetectBehaviors();

                    //DOUG NOTE: if logging in from "departments" for example this gets called un-necessarily
                    //it doesn't seem to have any errors but will figure out way to isolate this behavior later
                    //passing true below will cause all other details to be closed beyond the trigger that
                    //called login
                    Html.addCourseButtons(true);
                }
            },
            error: function (rValue) {
                var stopHere = '';
                $.mobile.loading('hide');
            }
        });

    }


    // method getting Quarters object
    this.Login = function(sender) {

        //***CODE TO DISABLE LOGIN FOR MAINTENANCE
        //Html.clearLoginMessages();
        //Html.showLoginMessages('*We apologize, the Student Portal Services are currently undergoing maintenance. We should have everything completed soon.');
        //return;
        ////this should not fire
        //alert('this shouldnt happen');
        //***END CODE TO DISABLE LOGIN FOR MAINTENANCE

        Html.showLoginMessages( 'Attempting Log In...' );
        var isLoginValid = false;
        if(
            $('#TxSID').val().length == 9 &&
            $.isNumeric( $('#TxSID').val() ) &&
            $('#TxPIN').val().length >= 4 && $('#TxPIN').val().length <= 6 &&
            $.isNumeric( $('#TxPIN').val() )

        ){
            isLoginValid = true;
        } else {
            Html.clearLoginMessages();
            Html.showLoginMessages( '*Invalid Log In' );
        }

        if (isLoginValid) {

            var parameters = new Object();
            parameters.sid = $('#TxSID').val();
            parameters.pin = $('#TxPIN').val();
            parameters.campusCode = myCampus.CampusCode;
            parameters.quarter = myCampus.SelectedYRQ;

            $.mobile.loading( 'show')

            $.ajax({
                type: 'POST',
                async: true,
                contentType: 'application/json; charset=utf-8',
                url: portalRef + 'WebServices/PortalServices.asmx/Login',
                data: JSON.stringify(parameters),
                dataType: 'json',
                success: function(rValue) {
                    $.mobile.loading( 'hide');
                    var userContext = rValue.d;

                    //success shows successful authentication in this case
                    if (userContext.ServiceStatus.IsSuccess) {








                        var QSUserRetrieval = false;
                        console.log(myCampus.Quarters.YRQCurrent.DisplayEvals);
                        console.log(myCampus.QSUserRetrieval.mc);



                        if (myCampus.QSUserRetrieval.mc != "" && myCampus.QSUserRetrieval.mc != undefined) {
                            QSUserRetrieval = true;
                        }

                        if (myCampus.Quarters.YRQCurrent.DisplayEvals && !QSUserRetrieval) {

                            if (!myCampus.QSUserRetrieval.eval == "") {
                                //show eval
                                console.log('show eval for querystring');

                                $('.footerNav').removeClass('activeNav');
                                $('.footerNav.mycampus').addClass('activeNav');

                                $('section').removeClass('activeNav');
                                $('#mycampus').addClass('activeNav');

                                ClassEval.getClassEvaluationForQueryString(myCampus.QSUserRetrieval.eval);

                            } else {
                                console.log('show eval, no querystring');
                                ClassEval.getClassEvaluation();
                            }
                        }






                        self.getStudentData(); //goes to get classes, regappt








                        $('#TxSID').val('');
                        $('#TxPIN').val('');

                        //grab the json payload and instantiate various aspects of [User] object
                        self.Profile = userContext.Context.Profile;
                        self.IsAuthenticated = userContext.ServiceStatus.IsAuthenticated;
                        self.PunitiveMessages = userContext.Context.PunitiveMessages;
                        self.IsRegistrationBlocked = userContext.Context.IsRegistrationBlocked;

                        //flips login controls to user menu (sign out, etc)
                        Html.setAuthenticated();

                        //set the SOS timeout
                        user.TTL = userContext.ServiceStatus.TTL;

                        self.TTLCountDown();


                        Html.showLoginMessages(userContext.ServiceStatus.Message);

                        if (sender != undefined) {
                            //move to the new page
                            $('.activeNav').removeClass('activeNav');
                            $(sender).addClass('activeNav');
                            $('section' + $(sender).attr('href')).addClass('activeNav');
                            window.location.href = $(sender).attr('href');
                        }


                    } else {
                        //failure means authentication failed, look in .Message for reason
                        Html.clearLoginMessages();
                        Html.showLoginMessages(userContext.ServiceStatus.Message);
                    }

                },
                error: function(rValue) {
                    var stopHere = '';
                    $.mobile.loading( 'hide');
                }
            });

        }

    }               //end - Login


    this.reInitialize = function() {
        //this function fires when the page is reloaded and we determine
        //the user is already logged on
        //it re-initializes all the user services to their proper state
        //IMPORTANT NOTE:
        //This is the most logical place to check if the reason the page is being reloaded
        //is because it is returning from the payment page

        var parameters = new Object();
        parameters.campusCode = myCampus.CampusCode;
        parameters.yrq = myCampus.SelectedYRQ;

        $('#MyFavoritesControls').empty();

        console.log('parameters: ' + parameters.campusCode + ' ' + myCampus.Quarters.YRQCurrent.YRQ);
        $.mobile.loading( 'show');
        $.ajax({
            type: 'POST',
            async: true,
            contentType: 'application/json; charset=utf-8',
            url: portalRef + 'WebServices/PortalServices.asmx/ReInitialize',
            data: JSON.stringify(parameters),
            dataType: 'json',
            success: function(rValue) {

                $.mobile.loading( 'hide');

                var userContext = rValue.d;

                if (userContext.ServiceStatus.IsSuccess) {

                    //checking if there is a payment response to report
                    self.checkPaymentReturn();

                    self.getStudentData(); //goes to get classes, regappt

                    self.Profile = userContext.Context.Profile;
                    self.IsAuthenticated = userContext.ServiceStatus.IsAuthenticated;
                    self.PunitiveMessages = userContext.Context.PunitiveMessages;
                    self.IsRegistrationBlocked = userContext.Context.IsRegistrationBlocked;

                    //flips login controls to user menu (sign out, etc)
                    Html.setAuthenticated();

                    //set the SOS timeout
                    user.TTL= userContext.ServiceStatus.TTL;

                    self.TTLCountDown();
                }
            },
            error: function(rValue) {
                var stopHere = '';
                $.mobile.loading( 'hide');
            }
        });
    }      // end - reInitialize


    this.TTLCountDown = function () {
        //self.TTL = 20000
        var ttlStartTime = self.TTL;

        TTLcounter = setInterval(function () {
            ttlStartTime -= 3000;

            self.TTL = ttlStartTime;

            if (self.TTL <= 9000) {
                self.LogOff('Student Online Services are closing for the day. You will automatically be logged off at this time.');
                self.clearTTLCountDown();
            }

        }, 3000);

    }


    this.clearTTLCountDown = function(){
        clearInterval(TTLcounter);
        user.TTL = -1;
    }


    this.checkPaymentReturn = function() {
        $.mobile.loading( 'show');
        $.ajax({
            type: 'POST',
            async: true,
            contentType: 'application/json; charset=utf-8',
            url: portalRef + 'WebServices/PortalServices.asmx/CheckPaymentReturn',
            data: {},
            dataType: 'json',
            success: function(rValue) {
                $.mobile.loading( 'hide');
                var userContext = rValue.d;

                if (userContext.ServiceStatus.IsSuccess) {


                    //DOUG - I have no idea what happened here but this was done and working and now
                    //none of this code points to anything I can see that works so... ? new bug I guess

                    //alert(userContext.Context.ResponseCode + ' - ' + userContext.Context.OrderNumber + ' - ' + userContext.Context.ResponseMessage);


                    var payReturn =  $('<div>').addClass('payReturn')
                        .append(
                            $('<span>')
                                .addClass('payReturnHeader')
                                .html('Order Number: ')
                        )
                        .append(
                            $('<span>').addClass('order').html( userContext.Context.OrderNumber )
                        )

                        .append(
                            $('<span>')
                                .addClass('payReturnHeader')
                                .html('Message: ')
                        )
                        .append(
                            $('<span>').addClass('msg').html( userContext.Context.ResponseMessage)
                        )
                        .append(
                            $('<span>')
                                .addClass('payReturnHeader')
                                .html('ResponseCode: ')
                        )
                        .append(
                            $('<span>').addClass('msg').html(userContext.Context.ResponseCode)
                        )

                    ;

                    $('section#creditreturn #creditreturnControls').empty();
                    $('section#creditreturn #creditreturnControls').append( payReturn );

                    if( userContext.Context.ResponseCode == 100){

                        $('div.payReturn span.msg').addClass('success');

                    } else if (userContext.Context.ResponseCode == 999) {

                        $('div.payReturn span.msg').addClass('cancel');

                    } else {

                        $('div.payReturn span.msg').addClass('fail');

                    }


                    $('#creditreturn').css('display', 'block');
                    $.magnificPopup.open({
                        items: {
                            src: '#creditreturn ',
                            type: 'inline'
                        },
                        showCloseBtn: false,
                        closeOnBgClick: true,
                        mainClass: 'holder'
                    });

                } else {
                    //this means ServiceStatus.IsSuccess == false
                    //usually because the cookie never existed or has been removed after use
                    //DOUG - commented out, we need communicate so I can improve teh understanding of this particular method

                    //var noPaymentMessage = $('<div>').attr({'id': 'noPaymentMessage'}).text('No Credit Card transaction found.');

                    //$('section#creditreturn #creditreturnControls').empty();
                    //$('section#creditreturn #creditreturnControls').append( noPaymentMessage );
                }
            },
            error: function(rValue) {
                var stopHere = '';
                $.mobile.loading( 'hide');
            }
        });
    }      // end - checkPaymentReturn


    this.initializePayment = function (pYRQ) {

        var parameters = new Object();
        parameters.campusCode = myCampus.CampusCode;
        parameters.yrq = pYRQ != undefined ? pYRQ : myCampus.SelectedYRQ;
        //parameters.returnURL = 'http://webdev.sccd.ctc.edu/portal/south/classschedule.htm#creditreturn';
        //parameters.returnURL = 'http://localhost:86/Portal/working/classschedule.htm#creditreturn';
        parameters.returnURL = self.ReturnURL;
        $.mobile.loading('show');
        $.ajax({
            type: 'POST',
            async: true,
            contentType: 'application/json; charset=utf-8',
            url: portalRef + 'WebServices/PortalServices.asmx/InitializePayment',
            data: JSON.stringify(parameters),
            dataType: 'json',
            success: function (rValue) {
                $.mobile.loading('hide');
                var userContext = rValue.d;

                if (userContext.ServiceStatus.IsSuccess) {

                    var ccCookie = Html.getCookie('ccCookie');
                    // var transaction = new Transaction(ccCookie);
                    var ccCookieRtn = Html.getCookie('ccCookieRtn');

                    var campusFolder;
                    switch (myCampus.CampusCode) {
                        case '062':
                            campusFolder = 'seacen';
                            break;
                        case '063':
                            campusFolder = 'seanor';
                            break;
                        case '064':
                            campusFolder = 'seasou';
                            break;
                        case '065':
                            campusFolder = 'seavoc';
                            break;
                    }


                    //var temp = self.NavigateURL;
                    window.location = self.NavigateURL;
                    //window.location = "https://mycentral.seattlecolleges.edu/_dev/mockwaci601p.htm";
                    //window.location = "http://localhost:86/portal/_dev/mockwaci601p.htm";
                    //window.location = "http://webdev.sccd.ctc.edu/portal/_dev/mockwaci601p.htm";
                    //window.location = 'https://wts.seattlecolleges.edu/' + campusFolder + '/webxfer/waci601p.htm';

                    //the CCPay page will return a cookie called "ccResponse"
                    //if it is used at all which will tell us what happened
                    //during the credit card payment phase

                    $.mobile.loading('hide');
                }
                else {
                    //To Do: extend this back into the modal

                    //alert(userContext.ServiceStatus.Message);

                    Html.showErrorPopUp( userContext.ServiceStatus.Message );
                }
            },
            error: function (rValue) {
                var stopHere = '';
                $.mobile.loading('hide');
            }
        });
    }           // end - initializePayment


    this.InitURLs = function () {

        //http://localhost:86/Portal/working/
        //http://webdev.sccd.ctc.edu/portal/south/
        //http://webdev.sccd.ctc.edu/portal/working/
        //https://www.seattlecolleges.edu/portal/south/
        ///Portal/working/ClassSchedule.htm

        var host = window.location.hostname;
        var pathName = window.location.pathname;

        var folderName;//pathName == '/' ? myCampus.CampusName : pathName.split('/')[2].toLowerCase();
        switch (myCampus.CampusCode) {
            case '062':
                folderName = 'central';
                break;

            case '063':
                folderName = 'north';
                break;

            case '064':
                folderName = 'south';
                break;

            case '065':
                folderName = 'svi';
                break;
        }



        var ajaxPrefix;

        switch (host) {
            case 'localhost':

                var port;

                switch (folderName) {
                    case 'central':
                        port = '81';
                        break;
                    case 'north':
                        port = '82';
                        break;
                    case 'south':
                        port = '83';
                        break;
                    case 'svi':
                        port = '999';
                        break;

                }

                this.NavigateURL = 'http://localhost:' + port + '/_dev/mockwaci601p.htm';
                this.ReturnURL = 'http://localhost:' + port + '/classschedule.htm'
                break;

            case 'webdev.sccd.ctc.edu':

                this.NavigateURL = 'http://webdev.sccd.ctc.edu/portal/_dev/mockwaci601p.htm';
                this.ReturnURL = 'http://webdev.sccd.ctc.edu/portal/' + folderName + '/classschedule.htm'

                break;

            case 'tdev.seattlecolleges.edu':

                this.NavigateURL = 'http://tdev.seattlecolleges.edu/portal/_dev/mockwaci601p.htm';
                this.ReturnURL = 'http://tdev.seattlecolleges.edu/portal/working/classschedule.htm'

                break;

            default:

                var liveFolder;

                switch (folderName) {
                    case 'central':
                        liveFolder = 'seacen';
                        break;
                    case 'north':
                        liveFolder = 'seanor';
                        break;
                    case 'south':
                        liveFolder = 'seasou';
                        break;
                    case 'svi':
                        liveFolder = 'seavoc';
                        break;

                }


                this.NavigateURL = 'https://wts.seattlecolleges.edu/' + liveFolder + '/webxfer/waci601p.htm';
                var returnURL;

                switch (myCampus.CampusCode) {
                    case '062':
                        returnURL = 'https://mycentral.seattlecolleges.edu/';
                        break;

                    case '063':
                        returnURL = 'https://mynorth.seattlecolleges.edu/';
                        break;

                    case '064':
                        returnURL = 'https://mysouth.seattlecolleges.edu/';
                        break;

                    case '065':
                        returnURL = 'https://mysvi.seattlecolleges.edu/';
                        break;
                }

                this.ReturnURL = returnURL;

                break;
        }
    }


    this.LogOff = function(msg) {
        console.log('User LogOff');
        $.mobile.loading( 'show');

        self.RegisteredClasses = undefined;
        self.MyFavoriteClasses = undefined;
        self.WaitListedClasses = undefined;
        self.IsAuthenticated = false;

        myCampus.registeredItemNumberMatches = false;
        myCampus.waitlistItemNumberMatches = false;
        myCampus.favoriteItemNumberMatches = false;

        $.ajax({
            type: 'POST',
            async: true,
            contentType: 'application/json; charset=utf-8',
            url: portalRef + 'WebServices/PortalServices.asmx/LogOff',
            data: {},
            dataType: 'json',
            success: function(rValue) {
                $.mobile.loading( 'hide');
                var userContext = rValue.d;


                self.clearTTLCountDown();

                Html.setLogOff();

                if (msg != null) {
                    //alert(msg);
                    Html.showErrorPopUp( msg, 'Logged Off' );
                }
            },
            error: function(rValue) {
                var stopHere = '';
                $.mobile.loading( 'hide');
            }
        });
    }    // end - LogOff


    function IsEmail(email) {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        //put in to fix bug in mobile browsers that incorrectly evaluates the regex
        //no idea why
        if (isMobile) {
            return true;
        } else {
            return regex.test(modifiedEmail);
        }
    }


    function IsPhoneNumber(phone) {
        var regex = /^([0-9\(\)\/\+ \-]*)$/;
        //^[0-9]{10}$
        console.log( regex.test(phone) );
        phone = phone.replace(/\D/g,'');
        console.log(phone);

        if( phone.length < 10 || phone.length > 10){
            return false;
        } else {
            return regex.test(phone);
        }
    }


    this.getSecretQuestionByEmail = function() {


        $('#ForgotSIDResponse').empty();

        var parameters = new Object();
        parameters.campusCode = myCampus.CampusCode;

        //validate email
        if(  IsEmail( $(TxRetrievalEmail).val() )  ){
            $.mobile.loading( 'show');
            parameters.email = $(TxRetrievalEmail).val();

            $.ajax({
                type: 'POST',
                async: true,
                contentType: 'application/json; charset=utf-8',
                url: portalRef + 'WebServices/PortalServices.asmx/GetSecretQuestionByEmail',
                data: JSON.stringify(parameters),
                dataType: 'json',
                success: function(rValue) {
                    $.mobile.loading( 'hide');
                    var userContext = rValue.d;

                    if ( !userContext.ServiceStatus.IsSuccess ) {
                        $('#ForgotSIDResponse').html(userContext.ServiceStatus.Message);
                    }

                    if ( userContext.ServiceStatus.IsSuccess ) {

                        $('.forgotSid.sidInputHolder').addClass( 'displayNone' );
                        $('#SecretQuestionForgotSID').removeClass( 'displayNone' );
                        $('#LbSecretQuestionForgotSID').html(userContext.Context);
                    }
                },
                error: function(rValue) {
                    var stopHere = '';
                    $.mobile.loading( 'hide');
                }
            });
        } else {
            $('#ForgotSIDResponse').text('Not a valid email.');
        }
    }          // end - getSecretQuestionByEmail


    this.retrieveStudentId = function() {

        $('#ForgotSIDResponse').empty();

        var parameters = new Object();
        parameters.campusCode = myCampus.CampusCode;
        parameters.email = $(TxRetrievalEmail).val();
        parameters.answer = $(TxSecretAnswerForgotSID).val();

        $.mobile.loading( 'show');
        $.ajax({
            type: 'POST',
            async: true,
            contentType: 'application/json; charset=utf-8',
            url: portalRef + 'WebServices/PortalServices.asmx/RetrieveStudentId',
            data: JSON.stringify(parameters),
            dataType: 'json',
            success: function(rValue) {
                $.mobile.loading( 'hide');
                var userContext = rValue.d;

                $('#ForgotSIDResponse').html(userContext.ServiceStatus.Message);
            },
            error: function(rValue) {
                var stopHere = '';
                $.mobile.loading( 'hide');
            }
        });
    }         // end - retrieveStudentId


    this.getSecretQuestionBySID = function() {
        $('#ForgotPINResponse').empty();
        var parameters = new Object();
        parameters.campusCode = myCampus.CampusCode;
        var isLoginValid = false;
        if(
            $('#TxRetrievalSID').val().length == 9 &&
            $.isNumeric( $('#TxRetrievalSID').val() )
        ){
            isLoginValid = true; console.log('is good');
        }

        if( isLoginValid ){
            parameters.sid = $(TxRetrievalSID).val();
            $.mobile.loading( 'show');
            $.ajax({
                type: 'POST',
                async: true,
                contentType: 'application/json; charset=utf-8',
                url: portalRef + 'WebServices/PortalServices.asmx/GetSecretQuestionBySID',
                data: JSON.stringify(parameters),
                dataType: 'json',
                success: function(rValue) {
                    $.mobile.loading( 'hide');
                    var userContext = rValue.d;

                    if (userContext.ServiceStatus.IsSuccess) {
                        $('.forgotPin.sidInputHolder').addClass( 'displayNone' );
                        $('#SecretQuestionForgotPIN').removeClass( 'displayNone' );
                        $('#LbSecretQuestionForgotPIN').html(userContext.Context);

                    }
                    if (!userContext.ServiceStatus.IsSuccess) {
                        $('#ForgotPINResponse').html(userContext.ServiceStatus.Message);

                    }


                },
                error: function(rValue) {
                    var stopHere = '';
                    $.mobile.loading( 'hide');
                }
            });
        } else {
            $('#ForgotPINResponse').html('Please enter a valid SID');
        }
    }          // end - getSecretQuestionBySID


    this.retrieveStudentPIN = function() {
        $('#ForgotPINResponse').empty();
        var parameters = new Object();
        parameters.campusCode = myCampus.CampusCode;
        parameters.sid = $(TxRetrievalSID).val();
        parameters.answer = $(TxSecretQuestionForgotPIN).val();
        $.mobile.loading( 'show');
        $.ajax({
            type: 'POST',
            async: true,
            contentType: 'application/json; charset=utf-8',
            url: portalRef + 'WebServices/PortalServices.asmx/RetrieveStudentPIN',
            data: JSON.stringify(parameters),
            dataType: 'json',
            success: function(rValue) {
                $.mobile.loading( 'hide');
                var userContext = rValue.d;
                console.log( userContext.ServiceStatus.Message );
                $('#ForgotPINResponse').html(userContext.ServiceStatus.Message);
            },
            error: function(rValue) {
                var stopHere = '';
                $.mobile.loading( 'hide');
            }
        });
    }         // end - retrieveStudentPIN


    this.getSID = function() {
        $.mobile.loading( 'show');
        var parameters = new Object();
        parameters.campusCode = myCampus.CampusCode;
        parameters.email = myCampus.QSUserRetrieval.re;
        parameters.uniqueId = myCampus.QSUserRetrieval.rid;

        $.ajax({
            type: 'POST',
            async: true,
            contentType: 'application/json; charset=utf-8',
            url: portalRef + 'WebServices/PortalServices.asmx/getSID',
            data: JSON.stringify(parameters),
            dataType: 'json',
            success: function(rValue) {
                $.mobile.loading( 'hide');
                var userContext = rValue.d;

                if (userContext.ServiceStatus.IsSuccess) {
                    //alert('Your Student ID: ' + userContext.Context);
                    Html.showErrorPopUp('Your Student ID: ' + userContext.Context,'Retrieve Student Id');
                    $('#TxSID').val(  userContext.Context );
                    Html.showLogin();
                } else {
                    //alert(userContext.ServiceStatus.Message);

                    Html.showErrorPopUp( userContext.ServiceStatus.Message );


                }
            },
            error: function(rValue) {
                var stopHere = '';
                $.mobile.loading( 'hide');
            }
        });
    }          // end - getSID


    this.getPIN = function() {

        var parameters = new Object();
        parameters.campusCode = myCampus.CampusCode;
        parameters.email = myCampus.QSUserRetrieval.re;
        parameters.uniqueId = myCampus.QSUserRetrieval.rid;
        $.mobile.loading( 'show');
        $.ajax({
            type: 'POST',
            async: true,
            contentType: 'application/json; charset=utf-8',
            url: portalRef + 'WebServices/PortalServices.asmx/getPIN',
            data: JSON.stringify(parameters),
            dataType: 'json',
            success: function(rValue) {
                $.mobile.loading( 'hide');
                var userContext = rValue.d;

                if (userContext.ServiceStatus.IsSuccess) {
                    //alert('Your PIN: ' + userContext.Context);
                    Html.showErrorPopUp('Your PIN: ' + userContext.Context);
                    $('#TxPIN').val(  userContext.Context );
                    Html.showLogin();
                } else {

                    Html.showErrorPopUp(userContext.ServiceStatus.Message, 'Retrieve PIN');
                }
            },
            error: function(rValue) {
                var stopHere = '';
                $.mobile.loading( 'hide');
            }
        });
    }          // end - getPIN


    this.changePin = function(){
        console.log( 'changePin' );

        $('#pinChangeControls .upDatePinFail').remove();
        $('#pinChangeControls .upDatePinSuccess').remove();

        var campus = myCampus.CampusCode;
        var sid = $('input.sid').val();
        var pin = $('input.oldPin').val();
        var newPin = $('input.newPin').val();

        $.mobile.loading('show');
        $.ajax({
            type: 'POST',
            async: true,
            contentType: 'application/json; charset=utf-8',
            url: portalRef + 'WebServices/PortalServices.asmx/changePin',
            data: '{ "campusCode" : "' + myCampus.CampusCode + '", "sid" : "' + sid +'",    "pin" :"' + pin +'",    "newPin" :"' + newPin +'"  }',
            dataType: 'json',
            success: function(rValue) {
                $.mobile.loading( 'hide');
                var userContext = rValue.d;

                if (userContext.ServiceStatus.IsSuccess) {

                    $('#pinChangeControls .pinText').append(
                        $('<div>').addClass('upDatePinSuccess').text(userContext.ServiceStatus.Message)
                    );

                    $('.inputHolder').remove();
                    $('.pinUpdate.ui-btn').remove();

                    //then logoff and sign back on if want with new pin
                    //allow user to see message for short time
                    setTimeout(function () { self.LogOff(); },2000);

                } else {

                    $('#pinChangeControls .pinText').append(
                        $('<div>').addClass('upDatePinFail').text( userContext.ServiceStatus.Message)

                    );
                }

            },
            error: function(rValue) {
                var stopHere = '';
                $.mobile.loading( 'hide');
            }
        });
    }


    this.profileIsValid = function(){
        //this.validateProfileUpdate = function(){
        console.log('validateProfileUpdate');
        var updateProfile = true;

        if( $('#TxProfileAddress').val().length >= 5 && typeof $('#TxProfileAddress').val() == "string") {
            //updateProfile = true;
        } else {
            updateProfile = false;
            Html.showInvalidUpdate( $('#TxProfileAddress') );
        }

        if( $('#TxProfileCity').val().length >= 3 && $('#TxProfileCity').val().length <= 16 && typeof $('#TxProfileCity').val() == "string") {
            //updateProfile = true;
        } else {
            updateProfile = false;
            Html.showInvalidUpdate( $('#TxProfileCity') );
        }

        if( $('#TxProfileState').val().length == 2 && typeof $('#TxProfileState').val() == "string") {
            //updateProfile = true;
        } else {
            updateProfile = false;
            Html.showInvalidUpdate( $('#TxProfileState') );
        }

        if( $('#TxProfileZip').val().length >= 5 && typeof $('#TxProfileZip').val() == "string") {
            //updateProfile = true;
        } else {
            updateProfile = false;
            Html.showInvalidUpdate( $('#TxProfileZip') );
        }

        if(  IsPhoneNumber( $('#TxProfiledPhone').val()  )  ) {
            //updateProfile = true;
        } else {
            updateProfile = false;
            Html.showInvalidUpdate( $('#TxProfiledPhone') );
        }


        /*
		if(  IsPhoneNumber( $('#TxProfileePhone').val() )  ) {
			//updateProfile = true;
		} else {
			updateProfile = false;
			Html.showInvalidUpdate( $('#TxProfileePhone') );
		}
		*/

        if( IsEmail( $('#TxProfileEmail').val() ) ){
            //updateProfile = true;
        } else {
            updateProfile = false;
            Html.showInvalidUpdate( $('#TxProfileEmail') );
        }
        /*
        if( updateProfile == true ){ self.updateProfile(); }
        */
        return updateProfile;



    }


    this.updateProfile = function() {

        //update the profile object from user input so we can send it up to the web service
        self.Profile.Address = $('#TxProfileAddress').val();
        self.Profile.City = $('#TxProfileCity').val();
        self.Profile.State = $('#TxProfileState').val();
        self.Profile.Zip = $('#TxProfileZip').val();
        self.Profile.dPhone = $('#TxProfiledPhone').val();
        self.Profile.ePhone = $('#TxProfileePhone').val();
        self.Profile.Email = $('#TxProfileEmail').val();
        /*
        self.Profile.isCustomQ = isCustom;
        self.Profile.secQuestion = question;
        self.Profile.secAnswer = answer;
        */

        var profileStr = JSON.stringify(self.Profile);
        var stopHere = '';
        $.mobile.loading( 'show');
        $.ajax({
            type: 'POST',
            async: true,
            contentType: 'application/json; charset=utf-8',
            url: portalRef + 'WebServices/PortalServices.asmx/UpdateProfile',
            data: '{ "profile":' + JSON.stringify(self.Profile) + '}',
            dataType: 'json',
            success: function(rValue) {
                $.mobile.loading( 'hide');
                var userContext = rValue.d;

                if (userContext.ServiceStatus.IsSuccess) {
                    self.Profile = userContext.Context;
                    //Html.initProfile();
                    //Html.showProfile();


                    console.log('Need to show Profile updated success msg here');
                    Html.hideProfile();
                }
            },
            error: function(rValue) {
                var stopHere = '';
                $.mobile.loading( 'hide');
            }
        });
    }


    this.myProfileOK = function( sectionReturnTo ) {
        //update the profile object from user input so we can send it up to the web service
        console.log('myProfileOK');

        if( self.isMyProfileOK()  ){

            var profileStr = JSON.stringify(self.Profile);
            var stopHere = '';
            $.mobile.loading( 'show');
            $.ajax({
                type: 'POST',
                async: true,
                contentType: 'application/json; charset=utf-8',
                url: portalRef + 'WebServices/PortalServices.asmx/UpdateProfile',
                data: '{ "profile":' + JSON.stringify(self.Profile) + '}',
                dataType: 'json',
                success: function(rValue) {
                    $.mobile.loading( 'hide');
                    var userContext = rValue.d;

                    if (userContext.ServiceStatus.IsSuccess) {
                        self.Profile = userContext.Context;

                        //Html.closeMyCampusMenuDisplay(sectionReturnTo, sectionReturnTo);

                        Html.hideProfile();
                    }
                },
                error: function(rValue) {
                    var stopHere = '';
                    $.mobile.loading( 'hide');
                }
            });


        } else {
            Html.initProfileUpdate();

            var invalidProfileMessage = $('<div>').html('Your profile is incorrect. Please make the nessecary changes and click Update').addClass('profileInvalid');
            $('#ProfileControls').append( invalidProfileMessage );
        }
    }


    this.isMyProfileOK = function(){
        console.log('validateProfileUpdate');
        var updateProfile = true;
        console.log( $('#TxProfileAddress').val() );
        console.log( updateProfile );
        console.log( $('span.profileAddress').html() );



        if( $('#TxProfileAddress').val().length >= 5 && typeof $('#TxProfileAddress').val() == "string") {
            //if( $('span.profileAddress').html().length >= 5 && typeof $('span.profileAddress').html() == "string") {
            //updateProfile = true;
        } else {
            updateProfile = false;
            //Html.showInvalidUpdate( $('#TxProfileAddress') );
        }

        console.log( updateProfile );


        console.log( $('#TxProfileCity').val() );
        if(  $('#TxProfileCity').val().length >= 3 &&  $('#TxProfileCity').val().length <= 16 && typeof  $('#TxProfileCity').val() == "string") {
            //if( $('span.profileCity').html().length >= 3 && $('span.profileCity').html().length <= 16 && typeof $('span.profileCity').html() == "string") {
            //updateProfile = true;
        } else {
            updateProfile = false;
            //Html.showInvalidUpdate( $('#TxProfileCity') );
        }

        console.log( updateProfile );
        console.log( $('#TxProfileState').val() );
        if( $('#TxProfileState').val().length == 2 && typeof $('#TxProfileState').val() == "string") {
            //if( $('span.profileState').html().length == 2 && typeof $('span.profileState').html() == "string") {
            //updateProfile = true;
        } else {
            updateProfile = false;
            //Html.showInvalidUpdate( $('#TxProfileState') );
        }

        console.log( updateProfile );

        console.log( $('#TxProfileZip').val() );
        if( $('#TxProfileZip').val().length >= 5 && typeof $('#TxProfileZip').val() == "string") {
            //if( $('span.profileZip').html().length >= 5 && typeof $('span.profileZip').html() == "string") {
            //updateProfile = true;
        } else {
            updateProfile = false;
            //Html.showInvalidUpdate( $('#TxProfileZip') );
        }

        console.log( updateProfile );
        console.log( $('#TxProfiledPhone').val() );
        if(  IsPhoneNumber( $('#TxProfiledPhone').val()  )  ) {
            //if(  IsPhoneNumber( $('span.profileDPhone').html()  )  ) {
            //updateProfile = true;
        } else {
            updateProfile = false;
            //Html.showInvalidUpdate( $('span.profileDPhone') );
        }

        console.log( updateProfile );

        console.log( $('#TxProfileePhone').val() );
        if(  IsPhoneNumber( $('#TxProfileePhone').val() )  ) {
            //updateProfile = true;
        } else {
            updateProfile = false;
            //Html.showInvalidUpdate( $('span.profileEPhone') );
        }

        console.log( updateProfile );
        console.log( $('#TxProfileEmail').val() );
        if( IsEmail( $('#TxProfileEmail').val() ) ){
            //if( IsEmail( $('span.profileEmail').html() ) ){
            //updateProfile = true;
        } else {
            updateProfile = false;
            //Html.showInvalidUpdate( $('span.profileEmail') );
        }

        /*
        if( user.Profile.secQuestion != "" ){

        } else {
            updateProfile = false;

        }
        */

        console.log( updateProfile );
        return updateProfile;
    }


    this.securityQuestionIsValid = function () {
        console.log('checking securityQuestionIsValid');
        var isValid = true;
        $('span.question6Box span.invalidSecQuestion').remove();
        $('span.answerBox span.invalidSecQuestion').remove();


        //check custom question
        if(  $( secQuestionSelector ).val() == 'custom'  ){
            console.log('is custom');

            console.log( $('input.question6Box').val() );
            if(  $('input.question6Box').val()  == ""){
                isValid = false;
                console.log( $('input.question6Box').val() );
                Html.showSecretQuestionUpdateFail(  $('span.question6Box')  );
            }
        } else { console.log('not custom'); }


        console.log('ansewrBox value: ' + $('input.answerBox').val() );
        if(  $('input.answerBox').val()  == ""){
            isValid = false;
            Html.showSecretQuestionUpdateFail(  $('span.answerBox')  );
        }

        return isValid;
    }


    this.updateProfileAndSecurityQuestion = function( question, answer, isCustom ){

        //update the profile object from user input so we can send it up to the web service
        self.Profile.Address = $('#TxProfileAddress').val();
        self.Profile.City = $('#TxProfileCity').val();
        self.Profile.State = $('#TxProfileState').val();
        self.Profile.Zip = $('#TxProfileZip').val();
        self.Profile.dPhone = $('#TxProfiledPhone').val();
        self.Profile.ePhone = $('#TxProfileePhone').val();
        self.Profile.Email = $('#TxProfileEmail').val();


        //console.log( $('#secQuestionSelector').val() );
        if(  $(secQuestionSelector).val() == 'custom'  ){
            self.Profile.secQuestion = $('input.question6Box').val();
            self.Profile.isCustomQ = true;
        } else {
            self.Profile.secQuestion = $('#secQuestionSelector').val();//= question;
            self.Profile.isCustomQ = false;
        }

        //console.log( $('input.answerBox').val() );
        self.Profile.secAnswer = $('input.answerBox').val();//answer;



        console.log( 'updateSecurityQuestion' );
        //console.log( 'q: ' + self.Profile.secQuestion + ' a: ' + self.Profile.secAnswer + '  isCustom: ' + self.Profile.isCustomQ );


        var profileStr = JSON.stringify(self.Profile);
        var stopHere = '';
        $.mobile.loading( 'show');
        $.ajax({
            type: 'POST',
            async: true,
            contentType: 'application/json; charset=utf-8',
            url: portalRef + 'WebServices/PortalServices.asmx/UpdateProfile',
            data: '{ "profile":' + JSON.stringify(self.Profile) + '}',
            dataType: 'json',
            success: function(rValue) {
                $.mobile.loading( 'hide');
                var userContext = rValue.d;

                if (userContext.ServiceStatus.IsSuccess) {
                    self.Profile = userContext.Context;
                    //Html.initProfile();
                    Html.showSecretQuestionUpdateSuccess();
                }
            },
            error: function(rValue) {
                var stopHere = '';
                $.mobile.loading( 'hide');
            }
        });

    }


    this.addMyFavoriteItem = function( thisClass, courseId, yrq, scrollToDiv ) {
        console.log( scrollToDiv );
        var itemNumber = thisClass;





        var parameters = new Object();
        parameters.itemNumber = itemNumber;
        parameters.yrq = myCampus.SelectedYRQ;
        parameters.campus = myCampus.CampusCode;

        $.mobile.loading( 'show');
        $.ajax({
            type: 'POST',
            async: true,
            contentType: 'application/json; charset=utf-8',
            url: portalRef + 'WebServices/PortalServices.asmx/AddMyFavorite',
            data: JSON.stringify(parameters),
            dataType: 'json',
            success: function(rValue) {
                $.mobile.loading( 'hide');
                var userContext = rValue.d;

                if (userContext.ServiceStatus.IsSuccess) {
                    self.MyFavoriteClasses = userContext.Context;
                    Html.addCourseButtons(false);
                    Html.showClassAddedToFavoritesPopUp(thisClass, courseId, yrq, scrollToDiv);


                    ga('send', 'event', 'Add favorite Item', 'class added', courseId);


                }
            },
            error: function(rValue) {
                var stopHere = '';
                $.mobile.loading( 'hide');
            }
        });
    }   // end - addMyFavoriteItem


    this.getMyFavorites = function() {
        $.mobile.loading('show');

        $.ajax({
            type: 'POST',
            async: true,
            contentType: 'application/json; charset=utf-8',
            url: portalRef + 'WebServices/PortalServices.asmx/GetMyFavorites',
            data: '{ "campusCode" : "' + myCampus.CampusCode + '", "yrq" : "' + myCampus.SelectedYRQ + '" }',
            dataType: 'json',
            success: function (rValue) {

                $.mobile.loading('hide');


                var userContext = rValue.d;
                if (userContext.ServiceStatus.IsSuccess) {
                    self.MyFavoriteClasses = userContext.Context;
                    if(  isMobile()  ){
                        //Html.initMyFavorites();
                        Html.initMyClassesMobile('MyFavorites');

                    } else {
                        console.log('for desktop');
                        Html.initMyClassesDeskTop( 'myFavTab' );

                    }
                }
            },
            error: function(rValue) {
                var stopHere = '';
            }
        });
    }    // end - getMyFavorites


    this.deleteMyFavoriteItem = function(itemNumber, sender) {

        var parameters = new Object();
        parameters.itemNumber = itemNumber;
        parameters.yrq = myCampus.SelectedYRQ;
        parameters.campus = myCampus.CampusCode;

        $.mobile.loading( 'show');
        $.ajax({
            type: 'POST',
            async: true,
            contentType: 'application/json; charset=utf-8',
            url: portalRef + 'WebServices/PortalServices.asmx/DeleteMyFavorite',
            data: JSON.stringify(parameters),
            dataType: 'json',
            success: function(rValue) {
                $.mobile.loading( 'hide');
                var userContext = rValue.d;

                if (userContext.ServiceStatus.IsSuccess) {
                    self.MyFavoriteClasses = userContext.Context; //==MyFavoriteClasses

                    Html.removeMyFavoriteItem( itemNumber, sender );

                }
            },
            error: function(rValue) {
                var stopHere = '';
                $.mobile.loading( 'hide');
            }
        });
    }               // end - DeleteMyFavoriteItem


    this.answerQuestions = function () {

        var validated = true;

        $.each(user.QuestionnairePrompts, function () {
            var answer = $('input[name="' + this.Key + '"]:checked');

            if (answer.length > 0) {
                this.Value = $(answer).val();

                //removes validation changes previously made
                $('#QuestionValidationMsg').removeAttr('style').empty();
                $('#' + this.Key + ' p').removeAttr('style');

            } else {
                $('#QuestionValidationMsg').css({ 'color': 'red' }).html('Please answer all questions.');
                $('#' + this.Key + ' p').css({ 'color': 'red' });
                validated = false;
            }
        });

        if (validated) {
            var parameters = new Object();
            parameters.campusCode = myCampus.CampusCode;
            parameters.yrq = myCampus.SelectedYRQ;
            parameters.responses = self.QuestionnairePrompts;
            $.mobile.loading('show');
            $.ajax({
                type: 'POST',
                async: true,
                contentType: 'application/json; charset=utf-8',
                url: portalRef + 'WebServices/PortalServices.asmx/AnswerQuestions',
                data: JSON.stringify(parameters),
                dataType: 'json',
                success: function (rValue) {
                    $.mobile.loading('hide');
                    var userContext = rValue.d;

                    if (userContext.ServiceStatus.IsSuccess) {

                        if (self.QuestionnairePrompts != undefined) {
                            self.QuestionnairePrompts.length = 0;
                        }

                        self.resetQuestions();

                        $.magnificPopup.close();

                        self.initIndividualRegistration();
                    }
                },
                error: function (rValue) {
                    var stopHere = '';
                    $.mobile.loading('hide');
                }
            });
        }

    }   // end - answerQuestions


    this.resetQuestions = function () {

        $.each($('.questionnairePrompt'), function () {
            if ($(this).hasClass('displayNone') == false) {
                $(this).addClass('displayNone');
            }
        });

        $.each($('#Questionnaire input:checked'), function () {
            $(this).prop('checked',false);
        });
    }


    this.initIndividualRegistration = function(itemNumber) {


        //grab the relevant inputs that are checked and extract their values into an array
        //for use as a parameter
        var itemNumbers = new Array();
        if (itemNumber != undefined) { itemNumbers.push(itemNumber); }

        if (self.UnprocessedItems != undefined) {
            $.each(self.UnprocessedItems, function () {
                itemNumbers.push(this);
            });
        }

        var initRegistrationParameters = new InitRegistrationParameters(itemNumbers, myCampus.SelectedYRQ, myCampus.CampusCode);
        $.mobile.loading( 'show');
        $.ajax({
            type: 'POST',
            async: true,
            contentType: 'application/json; charset=utf-8',
            url: portalRef + 'WebServices/PortalServices.asmx/InitRegistration',
            data: JSON.stringify(initRegistrationParameters),
            dataType: 'json',
            success: function(rValue) {
                $.mobile.loading( 'hide');
                var userContext = rValue.d;

                if (userContext.ServiceStatus.IsSuccess) {

                    if (userContext.Context.QuestionInterrupted) {

                        self.QuestionnairePrompts = userContext.Context.QuestionnairePrompts;
                        self.UnprocessedItems = userContext.Context.UnprocessedItems;

                        $.each($('.questionnairePrompt'), function () {
                            var promptElement = this;
                            $.each(self.QuestionnairePrompts, function () {
                                if (promptElement.id == this.Key) {
                                    $(promptElement).removeClass('displayNone');
                                }
                            });
                        });

                        Html.showQuestionPopUp();

                    } else {

                        self.UnprocessedItems = undefined;
                        self.InProcessClasses = userContext.Context.InProcessClasses;
                        self.InProcessLinkedClasses = userContext.Context.InProcessLinkedClasses;
                        self.Account = userContext.Context.Account;

                        $.each(self.InProcessClasses, function () {

                            if (this.RegistrationProcessingInfo.RegisterState == 1) {

                                //if registering from myfavorites this will sync the myfavorites array
                                var favItem = self.getFavoriteByItemNumber(this.ItemNumber);

                                if (favItem != undefined) { self.removeFavoriteByItemNumber(this.ItemNumber); }

                                //there should never be a reg item found here
                                //it should always be undefined but this is just a good backup policy to have
                                //this will sync the registeredclasses array
                                var regItem = self.getRegisteredByItemNumber(this.ItemNumber);

                                if (regItem == undefined) { self.RegisteredClasses.push(this); }
                            }
                        });


                        //DOUG - I'm not super happy with this as a solution. It may carry some bug baggage.
                        //need to re-design this entire process to be handled with 1 method not 2.

                        //Html.displayIndividualRegistrationInitResults(userContext.Context.InProcessClasses[0]);
                        Html.displayRegistrationInitResults();

                    }
                }
            },
            error: function(rValue) {
                var stopHere = '';
                $.mobile.loading( 'hide');
            }
        });
    }    // end - initIndividualRegistration


    this.initRegistration = function(itemNumber) {
        $('#RegisteredItemsControls').empty();
        $('#RegistrationResponseContainer').empty();
        $('.nothingSelected').remove();
        $('.deleteMyFavorite').remove();
        $('.ok.ui-btn').remove();

        //itemNumber is an optional parameter for individual class registration

        //grab the relevant inputs that are checked and extract their values into an array
        //for use as a parameter
        var itemNumbers = new Array();
        if (itemNumber != undefined) { itemNumbers.push(itemNumber); }

        var isChecked;

        if( isMobile() ){
            console.log( isChecked );
            isChecked = $('#myclasses .classContainer input:checked');
            console.log( isChecked.length );
        } else {
            isChecked = $('#myFavTab .classContainer input:checked');
            console.log( isChecked.length );
        }

        if ( isChecked.length > 0 ) {

            $.each(isChecked, function () {
                itemNumbers.push($(this).val());
                console.log( $(this).val() );
            });

            var initRegistrationParameters = new InitRegistrationParameters(itemNumbers, myCampus.SelectedYRQ, myCampus.CampusCode);

            $.mobile.loading('show');

            $.ajax({
                type: 'POST',
                async: true,
                contentType: 'application/json; charset=utf-8',
                url: portalRef + 'WebServices/PortalServices.asmx/InitRegistration',
                data: JSON.stringify(initRegistrationParameters),
                dataType: 'json',
                success: function(rValue) {
                    $.mobile.loading( 'hide');
                    var userContext = rValue.d;

                    if (userContext.ServiceStatus.IsSuccess) {

                        if (userContext.Context.QuestionInterrupted) {

                            self.QuestionnairePrompts = userContext.Context.QuestionnairePrompts;
                            self.UnprocessedItems = userContext.Context.UnprocessedItems;

                            $.each($('.questionnairePrompt'), function () {
                                var promptElement = this;
                                $.each(self.QuestionnairePrompts, function () {
                                    if (promptElement.id == this.Key) {
                                        $(promptElement).removeClass('displayNone');
                                    }
                                });
                            });

                            Html.showQuestionPopUp();

                        } else {

                            self.InProcessClasses = userContext.Context.InProcessClasses;
                            self.InProcessLinkedClasses = userContext.Context.InProcessLinkedClasses;
                            self.Account = userContext.Context.Account;

                            //destroy items in myfavorites if success
                            $.each(self.InProcessClasses, function () {

                                if (this.RegistrationProcessingInfo.RegisterState == 1) {

                                    //if registering from myfavorites this will sync the myfavorites array
                                    var favItem = self.getFavoriteByItemNumber(this.ItemNumber);

                                    if (favItem != undefined) { self.removeFavoriteByItemNumber(this.ItemNumber); }

                                    //there should never be a reg item found here
                                    //it should always be undefined but this is just a good backup policy to have
                                    //this will sync the registeredclasses array
                                    var regItem = self.getRegisteredByItemNumber(this.ItemNumber);

                                    if (regItem == undefined) { self.RegisteredClasses.push(this); }

                                    if (isMobile()) {

                                        $('#MyFavoritesControls .classContainer .' + this.ItemNumber).remove();

                                    } else {
                                        $('#myFavTab .classContainer .' + this.ItemNumber ).remove();
                                    }
                                }
                            });

                            Html.displayRegistrationInitResults(); //param is array of ClassInfo

                        }
                    }
                },
                error: function(rValue) {
                    var stopHere = '';
                    $.mobile.loading( 'hide');
                }
            });


        } else {

            Html.showErrorPopUp(  $('<span>').addClass('deleteMyFavorite').html('Nothing Selected.')  );
        }
    }    // end - initRegistration


    function ContinueRegistrationParameters(itemNumber, entryCode) {
        var self = this;
        this.classInfoList = new Array();
        this.yrq = myCampus.SelectedYRQ;
        this.campusCode = myCampus.CampusCode;


        $.each(user.InProcessClasses, function () {
            var classInfo = this;

            if (classInfo.ItemNumber == itemNumber) {

                if (classInfo.RegistrationProcessingInfo.RegisterState == 3) {
                    classInfo.RegistrationProcessingInfo.OptionalEntryCode = entryCode;
                }
                self.classInfoList.push(this);
            }
        });
    }


    this.continueRegistration = function(itemNumber, entryCode, registrationNode) {

        var continueRegistrationParameters = new ContinueRegistrationParameters(itemNumber, entryCode);

        $.mobile.loading('show');
        $.ajax({
            type: 'POST',
            async: true,
            contentType: 'application/json; charset=utf-8',
            url: portalRef + 'WebServices/PortalServices.asmx/ContinueRegistration',
            data: JSON.stringify(continueRegistrationParameters),
            dataType: 'json',
            success: function(rValue) {
                $.mobile.loading( 'hide');
                var userContext = rValue.d;

                if (userContext.ServiceStatus.IsSuccess) {

                    //replace .InProcessClasses[x] with new one from response
                    var idx = -1;
                    var counter = 0;
                    $.each(self.InProcessClasses, function () {
                        if (this.ItemNumber == userContext.Context.InProcessClasses[0].ItemNumber) {
                            idx = counter;
                        }
                        counter++;
                    });

                    if (idx > -1) {
                        self.InProcessClasses[idx] = userContext.Context.InProcessClasses[0];

                        //destroy items in myfavorites if successfully continued
                        if(userContext.Context.InProcessClasses[0].RegistrationProcessingInfo.ContinueRegistrationState == 1
                            || userContext.Context.InProcessClasses[0].RegistrationProcessingInfo.ContinueRegistrationState == 2) {

                            //this could also find the parent using the .ItemNumber instead, either way is fine
                            var input = $('.myFavoritesItemWrapper input[value=' + userContext.Context.InProcessClasses[0].ItemNumber + ']')[0];
                            if (input != undefined) {
                                $(input).parent().remove();
                            }

                            //if registering from myfavorites this will sync the myfavorites array
                            var favItem = self.getFavoriteByItemNumber(userContext.Context.InProcessClasses[0].ItemNumber);

                            if (favItem != undefined) { self.removeFavoriteByItemNumber(userContext.Context.InProcessClasses[0].ItemNumber); }


                            if (userContext.Context.InProcessClasses[0].RegistrationProcessingInfo.ContinueRegistrationState == 1) {

                                //there should never be a reg item found here
                                //it should always be undefined but this is just a good backup policy to have
                                //this will sync the registeredclasses array
                                var regItem = self.getRegisteredByItemNumber(this.ItemNumber);

                                if (regItem == undefined) { self.RegisteredClasses.push(this); }

                            } else if (userContext.Context.InProcessClasses[0].RegistrationProcessingInfo.ContinueRegistrationState == 2) {

                                //there should never be an item found here
                                //it should always be undefined but this is just a good backup policy to have
                                //this will sync the waitlistedclasses array
                                var waitItem = self.getWaitListByItemNumber(this.ItemNumber);

                                if (waitItem == undefined) { self.WaitListedClasses.push(this); }
                            }
                        }
                    }


                    self.Account = userContext.Context.Account;
                    Html.displayContinuedRegistrationResult(userContext.Context.InProcessClasses[0], registrationNode);
                }
            },
            error: function(rValue) {
                var stopHere = '';
                $.mobile.loading( 'hide');
            }
        });

    }      // end - continueRegistration


    function ContinueLinkedRegistrationParameters(linkedArray, linkedClassesWrapper) {
        var self = this;
        this.classInfoList = linkedArray;
        this.yrq = myCampus.SelectedYRQ;
        this.campusCode = myCampus.CampusCode;

        $.each(self.classInfoList, function () {
            var classInfo = this;

            if (classInfo.RegistrationProcessingInfo.RegisterState == 3) {
                var entryCode = $('input.' + classInfo.ItemNumber).val();
                classInfo.RegistrationProcessingInfo.OptionalEntryCode = entryCode;
            }
        });
    }


    this.continueLinkedRegistration = function (linkedClasses, registrationNode) {

        var continueLinkedRegistrationParameters = new ContinueLinkedRegistrationParameters(linkedClasses, registrationNode);

        $.mobile.loading('show');
        $.ajax({
            type: 'POST',
            async: true,
            contentType: 'application/json; charset=utf-8',
            url: portalRef + 'WebServices/PortalServices.asmx/ContinueLinkedRegistration',
            data: JSON.stringify(continueLinkedRegistrationParameters),
            dataType: 'json',
            success: function (rValue) {
                $.mobile.loading('hide');
                var userContext = rValue.d;

                if (userContext.ServiceStatus.IsSuccess) {

                    //replace .InProcessClasses[x] with new one from response
                    var idx = -1;

                    $.each(self.InProcessLinkedClasses, function (index) {
                        var linkedClassArray = this;

                        $.each(linkedClassArray, function () {
                            if (this.ItemNumber == userContext.Context.InProcessLinkedClasses[0][0].ItemNumber) {
                                idx = index;
                            }
                        });
                    });

                    if (idx > -1) {
                        self.InProcessLinkedClasses[idx] = userContext.Context.InProcessLinkedClasses[0];

                        //destroy items in myfavorites if successfully continued
                        //if (userContext.Context.InProcessClasses[0].RegistrationProcessingInfo.ContinueRegistrationState == 1
                        //    || userContext.Context.InProcessClasses[0].RegistrationProcessingInfo.ContinueRegistrationState == 2) {

                        //    //this could also find the parent using the .ItemNumber instead, either way is fine
                        //    var input = $('.myFavoritesItemWrapper input[value=' + userContext.Context.InProcessClasses[0].ItemNumber + ']')[0];
                        //    if (input != undefined) {
                        //        $(input).parent().remove();
                        //    }

                        //    //if registering from myfavorites this will sync the myfavorites array
                        //    var favItem = self.getFavoriteByItemNumber(userContext.Context.InProcessClasses[0].ItemNumber);

                        //    if (favItem != undefined) { self.removeFavoriteByItemNumber(userContext.Context.InProcessClasses[0].ItemNumber); }

                        //}
                    }


                    self.Account = userContext.Context.Account;
                    Html.displayContinuedLinkedRegistrationResult(userContext.Context.InProcessLinkedClasses[0], registrationNode);
                }
            },
            error: function (rValue) {
                var stopHere = '';
                $.mobile.loading('hide');
            }
        });

    }      // end - continueRegistration


    this.getRegisteredClasses = function() {
        $.mobile.loading( 'show');

        $.ajax({
            type: 'POST',
            async: true,
            contentType: 'application/json; charset=utf-8',
            url: portalRef + 'WebServices/PortalServices.asmx/GetRegisteredClasses',
            data: '{ "campusCode" : "' + myCampus.CampusCode + '", "yrq" : "' + myCampus.SelectedYRQ + '" }',
            dataType: 'json',
            success: function(rValue) {
                $.mobile.loading( 'hide');
                var userContext = rValue.d;

                if (userContext.ServiceStatus.IsSuccess) {
                    var student = userContext.Context;

                    //Update for "withdrawn" classes 7/29/2015
                    //new property added to [ClassInfo] obj - [.IsWithdrawn (boolean)]
                    //self.RegisteredClasses[x].IsWithdrawn
                    //can be test using College, Jack – 985841887 – PIN 010175, Summer 2015 ART 101
                    //remove this comment when finished writing markup changes Tim.
                    self.RegisteredClasses = student.RegisteredClasses;
                    self.Account = student.Account;

                    if( isMobile() ){
                        //Html.initRegisteredItems();
                        Html.initMyClassesMobile('RegisteredItems');
                    } else {
                        //Html.initRegisteredItemsDeskTop();
                        console.log('for desktop');
                        Html.initMyClassesDeskTop( 'myRegTab' );
                    }

                }
            },
            error: function(rValue) {
                var stopHere = '';
            }
        });
    }   // end - getRegisteredClasses


    this.getRegistrationAppointment = function (forPopUp) {
        var regAppointmentParameters = new Object();
        //JSON.stringify(regAppointmentParameters)
        regAppointmentParameters.campusCode = myCampus.CampusCode;
        regAppointmentParameters.yrq = myCampus.SelectedYRQ;
        regAppointmentParameters.today = '';

        if ($('#DevToday').val().length > 0) {
            regAppointmentParameters.today = $('#DevToday').val();
        }

        $.mobile.loading('show');
        $.ajax({
            type: 'POST',
            async: true,
            contentType: 'application/json; charset=utf-8',
            url: portalRef + 'WebServices/PortalServices.asmx/GetRegistrationAppointment',
            data: JSON.stringify(regAppointmentParameters),
            dataType: 'json',
            success: function (rValue) {
                $.mobile.loading('hide');

                var userContext = rValue.d;

                if (userContext.ServiceStatus.IsSuccess) {
                    self.RegAppointment = userContext.Context;

                    //DOUG - Added 5/27/2015 due to various cross-campus registration appt issues
                    //Doug - 11/2015 - removing reg appt requirement
                    //self.RegAppointment.IsPastAppointment = true;
                }
            },
            error: function (rValue) {
                var stopHere = '';
                $.mobile.loading('hide');
            }
        });
    }


    this.dropRegistration = function() {

        //grab the relevant inputs that are checked and extract their values into an array
        //for use as a parameter
        var itemNumbers = new Array();
        if( isMobile() ){
            $.each($('#RegisteredItemsControls input:checked'), function () {
                console.log(this.value);
                itemNumbers.push(this.value);
            });
            //console.log('itemNumbers to Drop: ' + itemNumbers.length);
            /*
			$.each($('.registerDropClasses input:checked'), function() {
				console.log(this.value);
				itemNumbers.push(this.value);
			});
            */
        } else {
            $.each( $('#myRegTab .classContainer input:checked'), function() {
                console.log(this.value);
                itemNumbers.push(this.value);
            });

            $.each($('.registerDropClasses input:checked'), function() {
                console.log(this.value);
                itemNumbers.push(this.value);
            });
            //console.log('itemNumbers to Drop: ' + itemNumbers.length);
        }



        var initRegistrationParameters = new InitRegistrationParameters(itemNumbers, myCampus.SelectedYRQ, myCampus.CampusCode);
        $.mobile.loading( 'show');
        $.ajax({
            type: 'POST',
            async: true,
            contentType: 'application/json; charset=utf-8',
            url: portalRef + 'WebServices/PortalServices.asmx/DropRegisteredClass',
            data: JSON.stringify(initRegistrationParameters),
            dataType: 'json',
            success: function(rValue) {
                $.mobile.loading( 'hide');
                var userContext = rValue.d;
                //console.log(rValue.d);

                if (userContext.ServiceStatus.IsSuccess) {


                    //Update for "withdrawn" classes 7/29/2015
                    //new property added to [ClassInfo] obj - [.IsWithdrawn (boolean)]
                    //self.RegisteredClasses[x].IsWithdrawn
                    //can be test using College, Jack – 985841887 – PIN 010175, Summer 2015 ART 101

                    //RegistrationProcessing.RegisterStates
                    //RegistrationProcessingInfo.Message
                    // 1 == Success (Class Dropped Successfully)
                    //4 == Fail (ex. (0043) You have already dropped this class. - Registered[1008,9630])
                    //NOTE:
                    //Somewhere in this process we need to be looking at [user].RegisteredClasses.RegistrationProcessing
                    //and making decisions about whether we are removing items or not
                    //I'd like the message displayed (and cleared properly) for any class attempted to drop
                    //NOTE 2:
                    //remember the variable(array) below has all registered classes being returned
                    //some will not have been a part of the drop attempt and they will have
                    //RegistrationProcessing.RegisterStates == 0 (None) also RegistrationProcessing.RegisterStage == 0
                    //remove this comment when finished writing markup changes Tim.

                    //console.log(self.RegisteredClasses);
                    self.RegisteredClasses = userContext.Context;
                    //console.log(userContext.Context);

                    //Html.initRegisteredItems();
                    console.log(itemNumbers);

                    //I think I'm going to annoy you Tim
                    //Need look at your code idea but it seems to me right now with what I want
                    //just call
                    //Html.initMyClassesMobile('RegisteredItems');
                    //Html.initMyClassesDeskTop('myRegTab');
                    //Can do check in there to see if withdrawn
                    //Can also do check in there for RegistrationProcessing.RegisterStates == 4 (Fail)
                    //after that can call remove below but only on item numbers <> Fail

                    //I dunno I need see your code to see if I like it better but I'm leaning toward what Joyce
                    //initially suggested.. sigh
                    //Html.removeMyRegisteredItem(itemNumbers);



                    if (isMobile()) {
                        Html.initMyClassesMobile('RegisteredItems');
                    } else {
                        Html.initMyClassesDeskTop('myRegTab');
                    }




                }
            },
            error: function(rValue) {
                var stopHere = '';
                $.mobile.loading( 'hide');
            }
        });
    }   // end - dropRegistration


    this.getWaitList = function () {

        ga('send', 'pageview', '/viewWaitlist');

        $.mobile.loading( 'show');
        $.ajax({
            type: 'POST',
            async: true,
            contentType: 'application/json; charset=utf-8',
            url: portalRef + 'WebServices/PortalServices.asmx/GetWaitListClasses',
            data: '{ "campusCode" : "' + myCampus.CampusCode + '", "yrq" : "' + myCampus.SelectedYRQ + '" }',
            dataType: 'json',
            success: function(rValue) {
                $.mobile.loading( 'hide');
                var userContext = rValue.d;

                if (userContext.ServiceStatus.IsSuccess) {

                    self.WaitListedClasses = userContext.Context;

                    if( isMobile() ){
                        //Html.initMyWaitListItems();
                        Html.initMyClassesMobile('WaitListItems');
                    } else {
                        //Html.initMyWaitListItemsDeskTop();
                        Html.initMyClassesDeskTop( 'myWaitTab' );
                    }

                }
            },
            error: function(rValue) {
                var stopHere = '';
                $.mobile.loading( 'hide');
            }
        });
    }    // end - getWaitList


    this.dropWaitList = function() {

        //grab the relevant inputs that are checked and extract their values into an array
        //for use as a parameter
        var itemNumbers = new Array();

        if( isMobile() ){
            //$.each($('.myWaitlistItemWrapper input:checked'), function() {
            $.each($('#WaitListItemsControls .classContainer input:checked'), function () {
                console.log(this.value);
                itemNumbers.push(this.value);
            });
        } else {
            $.each( $('#myWaitTab .classContainer input:checked'), function() {
                console.log(this.value);
                itemNumbers.push(this.value);
            });
        }

        //I can use this same item because it uses the same parameter set
        var initRegistrationParameters = new InitRegistrationParameters(itemNumbers, myCampus.SelectedYRQ, myCampus.CampusCode);
        $.mobile.loading( 'show');
        $.ajax({
            type: 'POST',
            async: true,
            contentType: 'application/json; charset=utf-8',
            url: portalRef + 'WebServices/PortalServices.asmx/RemoveWaitListClasses',
            data: JSON.stringify(initRegistrationParameters),
            dataType: 'json',
            success: function(rValue) {
                $.mobile.loading( 'hide');
                var userContext = rValue.d;

                if (userContext.ServiceStatus.IsSuccess) {

                    self.WaitListedClasses = userContext.Context;

                    Html.removeMyWaitlistItem( itemNumbers );


                }
            },
            error: function(rValue) {
                var stopHere = '';
                $.mobile.loading( 'hide');
            }
        });
    }   // end - dropWaitList


    this.getTuitionAmount = function() {

        $('#TuitionDisplay').slideUp( 400, function(){

            $('#TuitionDisplay').empty();

        });

        ga('send', 'pageview', '/creditCardPayment');
        ga('send', 'event', 'Credit Card Payment');//set to match district waci600


        //check to see if student has a collections ua code for any college
        //if so, show collections modal, if not get tuition amount
        var hasCollectionUA;
        var uaCheckParameters = new Object();
        uaCheckParameters.colCode = myCampus.CampusCode;

        $.mobile.loading('show');

        console.log('check collections block');
        $.ajax({
            type: 'POST',
            async: true,
            contentType: 'application/json; charset=utf-8',
            url: portalRef + 'WebServices/PortalServices.asmx/checkCollectionBlock',
            data: JSON.stringify(uaCheckParameters),
            dataType: 'json',
            success: function (rValue) {
                hasCollectionUA = rValue.d;
                $.mobile.loading('hide');

                if (hasCollectionUA) {
                    //show collection modal and skip the tuition call

                    Html.showTuitionAmount('block');
                    $('#TuitionDisplay').slideDown(400);

                }
                else {
                    var parameters = new Object();
                    parameters.campusCode = myCampus.CampusCode;
                    parameters.yrq = $('#DdlTuitionYRQ').val();

                    console.log($('#DdlTuitionYRQ').text());

                    $.mobile.loading('show');
                    $.ajax({
                        type: 'POST',
                        async: true,
                        contentType: 'application/json; charset=utf-8',
                        url: portalRef + 'WebServices/PortalServices.asmx/GetTuitionAmount',
                        data: JSON.stringify(parameters),
                        dataType: 'json',
                        success: function (rValue) {
                            $.mobile.loading('hide');
                            var userContext = rValue.d;

                            if (userContext.ServiceStatus.IsSuccess) {
                                //$('#TuitionDisplay').html(userContext.Context);
                                console.log(userContext.ServiceStatus.Message);
                                Html.showTuitionAmount(userContext.Context);
                                $('#TuitionDisplay').slideDown(400);
                            }
                        },
                        error: function (rValue) {
                            var stopHere = '';
                            $.mobile.loading('hide');
                        }
                    });
                }
            },
            fail: function(){
                $.mobile.loading('hide');
            }
        });

    }            // end - getTuitionAmount


    this.getTranscript = function () {

        var parameters = new Object();
        parameters.campusCode = myCampus.CampusCode;
        $.mobile.loading('show');
        $.ajax({
            type: 'POST',
            async: true,
            contentType: 'application/json; charset=utf-8',
            url: portalRef + 'WebServices/PortalServices.asmx/GetTranscript',
            data: JSON.stringify(parameters),
            dataType: 'json',
            success: function (rValue) {
                $.mobile.loading('hide');
                var userContext = rValue.d;

                if (userContext.ServiceStatus.IsSuccess) {

                    self.Transcript = userContext.Context;
                    Html.showGrades(userContext.ServiceStatus.ServerDate);
                }
            },
            error: function (rValue) {
                var stopHere = '';
                $.mobile.loading('hide');
            }
        });
    }             // end - getTranscript


    this.getSchedule = function () {

        var parameters = new Object();
        parameters.campusCode = myCampus.CampusCode;
        parameters.yrq = myCampus.SelectedYRQ;
        $.mobile.loading('show');
        $.ajax({
            type: 'POST',
            async: true,
            contentType: 'application/json; charset=utf-8',
            url: portalRef + 'WebServices/PortalServices.asmx/GetSchedule',
            data: JSON.stringify(parameters),
            dataType: 'json',
            success: function (rValue) {
                $.mobile.loading('hide');
                var userContext = rValue.d;

                if (userContext.ServiceStatus.IsSuccess) {
                    user.Schedule = userContext.Context;
                    Html.showSchedule();
                }
            },
            error: function (rValue) {
                var stopHere = '';
                $.mobile.loading('hide');
            }
        });
    }             // end - getTranscript


    //this.answerQuestions = function () {

    //    var validated = true;

    //    $.each(user.QuestionnairePrompts, function () {
    //        var answer = $('input[name="' + this.Key + '"]:checked');

    //        if (answer.length > 0) {
    //            this.Value = $(answer).val();

    //            //removes validation changes previously made
    //            $('#QuestionValidationMsg').removeAttr('style').empty();
    //            $('#' + this.Key + ' p').removeAttr('style');

    //        } else {
    //            $('#QuestionValidationMsg').css({ 'color': 'red' }).html('Please answer all questions.');
    //            $('#' + this.Key + ' p').css({ 'color': 'red' });
    //            validated = false;
    //        }
    //    });

    //    if (validated) {
    //        var parameters = new Object();
    //        parameters.campusCode = myCampus.CampusCode;
    //        parameters.yrq = myCampus.SelectedYRQ;
    //        parameters.responses = self.QuestionnairePrompts;
    //        $.mobile.loading('show');
    //        $.ajax({
    //            type: 'POST',
    //            async: true,
    //            contentType: 'application/json; charset=utf-8',
    //            url: portalRef + 'WebServices/PortalServices.asmx/AnswerQuestions',
    //            data: JSON.stringify(parameters),
    //            dataType: 'json',
    //            success: function (rValue) {
    //                $.mobile.loading('hide');
    //                var userContext = rValue.d;

    //                if (userContext.ServiceStatus.IsSuccess) {

    //                    if (self.QuestionnairePrompts != undefined) {
    //                        self.QuestionnairePrompts.length = 0;
    //                    }

    //                    $.magnificPopup.close();

    //                    self.initIndividualRegistration();
    //                }
    //            },
    //            error: function (rValue) {
    //                var stopHere = '';
    //                $.mobile.loading('hide');
    //            }
    //        });
    //    }

    //}   // end - answerQuestions



    this.SubmitGainfulEmploymentCheck = function(){
        $.mobile.loading('show');
        var notMyProgram = false;

        $.ajax({
            type: 'POST',
            async: true,
            contentType: 'application/json; charset=utf-8',
            //url: portalRef + 'WebServices/MobileSchedule.asmx/recordGainfulEmploymentResponse',
            url: portalRef + 'WebServices/PortalServices.asmx/recordGainfulEmploymentResponse',
            data: '{"notMyProgram":"' + JSON.stringify(notMyProgram) + '"}',
            dataType: 'json',
            success: function(rValue) {
                $.mobile.loading( 'hide');
                console.log(rValue);
                Html.checkProfile();
            }
        });
    }

}

var user = new User();
user.InitURLs();


function InitRegistrationParameters(itemNumbers, yRQ, campus) {
    this.itemNumbers = itemNumbers;
    this.yrq = yRQ;
    this.campusCode = campus;
}








