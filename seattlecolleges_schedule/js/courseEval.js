function EvalGenerator() {
    var self = this;

    self.showCourseReviews = function (whatClass) {

        var incompleteEval = false;
        $.each(whatClass, function () {
            if (!this.completed) {
                incompleteEval = true;
            }
        });

        //If there are incomplete evaluations to be filled out, show the modal
        //If not, move on to other log in checks
        var evalMsg = 'Please take a moment to review your courses this quarter.';
        if (incompleteEval) {
            $('#CourseReviewHolder')
                .empty()
                .append(
                    $('<h3>').html('How are we doing?  Your input matters!<span onClick="Html.hidePopUp();" class="closePopUp ui-btn-icon-right ui-icon-delete"></span>')
                )
                .append(
                    $('<h4>').html('Your response is completely anonymous. <a class="" onClick="ClassEval.showLearnMore();" href="#">Learn More...</a>')
                )
                .append(
                    $('<p >').text(evalMsg)
                )
                .append(
                    $('<div>').addClass('classList')
                );



            var container = $('#CourseReviewHolder .classList');
            var evaluationNumber = 0;
            $.each(whatClass, function () {
                thisClass = whatClass;

                var evalGoLink;
                var evalLinkHolder = $('<div>');

                if (this.completed) {
                    evalLinkHolder.addClass('classToReview complete');
                    evalGoLink = $('<a disabled="true" >').addClass('ui-btn-icon-right ui-icon-check').attr({ 'href': '#', 'data-evalnumber': evaluationNumber })
                        .text('Completed').off();
                } else {
                    evalLinkHolder.addClass('classToReview');
                    evalGoLink = $('<a onClick="ClassEval.buildClassEvaluation( this, thisClass );">').addClass('ui-btn-icon-right ui-icon-edit').attr({ 'href': '#', 'data-evalnumber': evaluationNumber })
                        .text('Review');
                }

                evalLinkHolder
                    .append(
                        $('<span>')
                            .addClass('classID')
                            .text(this.courseID)
                            .append(
                                evalGoLink
                            )
                    )
                    .append(
                        $('<span>')
                            .addClass('classTitle')
                            .text(this.courseTitle)
                    )
                    .appendTo(container);

                evaluationNumber++;
            });


            $('#CourseReviewHolder').append(
                $('<span>')
                    .addClass('feedback')
                    //.text('Feedback must be submitted no later than ' + myCampus.SelectedQuarter.EndEvalDisplay + '.')
                    .text('Feedback must be submitted no later than ' + myCampus.Quarters.YRQCurrent.EndEvalDisplay + '.')
            );

            self.showEvalPopUp();
        }
    }

    //get evaluations for this student
    //evals returned will only include questions if eval is not complete
    self.getClassEvaluation = function (mycampclick) {
        $.mobile.loading('show');
        var parameters = new Object();



        parameters.yrq = myCampus.Quarters.YRQCurrent.YRQ;

        if (myCampus.Quarters.YRQCurrent.DisplayEvals) {//are evals ready to display?

            $.ajax({
                type: 'POST',
                async: true,
                contentType: 'application/json; charset=utf-8',
                url: portalRef + 'WebServices/ClassEvaluationService.asmx/GetEvalList',
                data: JSON.stringify(parameters),
                dataType: 'json',
                success: function (rValue) {
                    var userContext = rValue.d;

                    Html.hidePopUp();
                    //success shows successful authentication in this case
                    if (userContext.ServiceStatus.IsSuccess) {

                        //if the click is from the mycampus page and there are no
                        //evals returned, show evals completed message
                        if (mycampclick == "mycampclick") {
                            self.myCollegeEvalClick(userContext.Context);
                        }
                        else
                        {
                            self.showCourseReviews(userContext.Context);
                        }


                    }
                    $.mobile.loading('hide');
                },
                fail: function (rValue) {
                    var stopHere = '';
                }
            });

        }
        else if (mycampclick == "mycampclick") {
            self.showNoEvalAvailable();
        }

        $.mobile.loading('hide');

    }

    self.myCollegeEvalClick = function (rValue) {

        //check for any incomplete evals in return
        //if no evals are incomplete show
        var incompleteEval = false;
        $.each(rValue, function () {
            if (!this.completed) {
                incompleteEval = true;
            }
        });

        if (incompleteEval == false) {
            self.showAllCompleteEval();
        }
        else {
            self.showCourseReviews(rValue);
        }
    }

    self.buildClassEvaluation = function (trigger, whatClass) {

        //EVAL CLASS PARAMETERS - Portal.ClassEvaluations.Evaluation
        // orderID - id of the individual evaluation
        // itemNo - class item number (used in evaluation header display)
        // courseID - course ID (used in evaluation header display)
        // courseTitle - course title (used in evaluation header display)
        // instructorName - name of instructor (used in evaluation header display)
        // makeAvailableToStudent - date when student should be allowed to complete this evaluation
        // completed - indicates whether a student has completed this eval or not
        // questions - list of questions associated with this evaluation

        //QUESTION CLASS PARAMETERS - Portal.ClassEvaluations.Question
        // orderquestionID - used when saving responses anonymously - NOTE:  will need to be returned with the answer data
        // questionID - used to associate the question with the orderID (I don't think you will need to include this in the build)
        // questionType - indicates whether question is a multi select or fill in (1 = multi, 2 = fill in)
        // questionText - the string question
        // zOrder - the order in which the question should appear in a list ( zOrder one at the top and so on)

        var evalNumber = $(trigger).data('evalnumber');
        if (evalNumber == undefined) { evalNumber = trigger;}

        //Google Analytics event trigger tag
        ga('send', 'event', 'Build Class Eval', evalNumber);


        Html.hidePopUp();

        var container = $('<div>').addClass('classList');

        $('#CourseReviewHolder')
            .empty()
            .append(
                $('<h3>')
                    .html('We want to hear from you')
                    .append(
                        $('<span>')
                            .addClass('closePopUp ui-btn-icon-right ui-icon-delete')
                            .on('click', function () {
                                self.showCourseReviews(whatClass);
                            })
                    )
            )
            .append(
                $('<h4>').html('Your response is completely anonymous. <a class="" onClick="ClassEval.showLearnMore();" href="#">Learn More</a>')
            )
            .append(
                container
            );



        $('<div>').addClass('courseInfo')
            .append($('<div>').addClass('title').text(whatClass[evalNumber].courseTitle))

            .append(
                $('<div>').addClass('courseNumber').text('Course #: ' + whatClass[evalNumber].courseID)
            )
            .append(
                $('<div>').addClass('itemNumber').text('Item #: ' + whatClass[evalNumber].itemNo)
            )

            .append($('<div>').addClass('campus').text('Campus: ' + myCampus.FriendlyName))
            .append($('<div>').addClass('instructor').text('Instructor: ' + whatClass[evalNumber].instructorName))
            .append($('<input>').attr({ 'id': 'hfIsCustom', 'type': 'hidden', 'value': whatClass[evalNumber].isCustom }))
            .appendTo(container);
        var msgText = 'Please complete the following brief survey, answering as many of the questions as you wish, and submit your responses by clicking the button at the bottom of the page.';

        if (!whatClass[evalNumber].questions.length > 0) {
            msgText = 'Please complete the following brief survey.';
        }

        $('<div>').addClass('instructions').text(msgText)
            .appendTo(container);


        //Important to return with each question:   orderquestionID, answerValue
        var myQuestionNumber = 1;

        //-- 20170512 addition DAS
        var ratingsdata = getRatingsValueLabel( whatClass[evalNumber].isIntensiveEnglish );
        //-- end 20170512 addition DAS

        $.each(whatClass[evalNumber].questions, function () {

            var questionNumber = $('<span>').addClass('questionNumber').text(myQuestionNumber + '.');

            var questionHolder = $('<span>').addClass('questionHolder').append(questionNumber).append(

                $('<span>')
                    .addClass('questionText')
                    .text(this.questionText)
            ).appendTo(container);

            if (this.questionType == 1) {//radio
                questionHolder.append(
                    $('<div>').addClass('answerHolder').append(
                        $('<span>')
                            .append(
                                $('<input data-orderquestionid="' + this.orderquestionID + '" data-questionid="' + this.questionID + '" type="radio" value="9" name="question' + myQuestionNumber + '" checked style="display:none;"' + '>'))
                    ).append(
                        $('<span>')
                            .append(
                                //$('<input data-orderquestionid="' + this.orderquestionID + '" data-questionid="' + this.questionID + '" type="radio" value="5" name="question' + myQuestionNumber + '">')
                                //-- 201705
                                $('<input data-orderquestionid="' + this.orderquestionID + '" data-questionid="' + this.questionID + '" type="radio" value="' + ratingsdata.rating5_value + '" name="question' + myQuestionNumber + '">')
                            )
                            //.addClass('excellent')
                            //.append('Excellent')
                            .addClass( ratingsdata.rating5_css )
                            .append( ratingsdata.rating5_key )
                    )
                        .append(
                            $('<span>')
                                .append(
                                    //$('<input data-orderquestionid="' + this.orderquestionID + '" data-questionid="' + this.questionID + '" type="radio" value="4" name="question' + myQuestionNumber + '">')
                                    //-- 201705
                                    $('<input data-orderquestionid="' + this.orderquestionID + '" data-questionid="' + this.questionID + '" type="radio" value="' + ratingsdata.rating4_value + '" name="question' + myQuestionNumber + '">')
                                )
                                //.addClass('veryGood')
                                //.append('Very Good')
                                .addClass( ratingsdata.rating4_css )
                                .append( ratingsdata.rating4_key )

                        )
                        .append(
                            $('<span>')
                                .append(
                                    //$('<input data-orderquestionid="' + this.orderquestionID + '" data-questionid="' + this.questionID + '" type="radio" value="3" name="question' + myQuestionNumber + '">')
                                    //-- 201705
                                    $('<input data-orderquestionid="' + this.orderquestionID + '" data-questionid="' + this.questionID + '" type="radio" value="' + ratingsdata.rating3_value + '" name="question' + myQuestionNumber + '">')
                                )
                                //.addClass('good')
                                //.append('Good')
                                .addClass( ratingsdata.rating3_css )
                                .append( ratingsdata.rating3_key )

                        )
                        .append(
                            $('<span>')
                                .append(
                                    //$('<input data-orderquestionid="' + this.orderquestionID + '" data-questionid="' + this.questionID + '" type="radio" value="2" name="question' + myQuestionNumber + '">')
                                    //-- 201705
                                    $('<input data-orderquestionid="' + this.orderquestionID + '" data-questionid="' + this.questionID + '" type="radio" value="' + ratingsdata.rating2_value + '" name="question' + myQuestionNumber + '">')
                                )
                                //.addClass('fair')
                                //.append('Fair')
                                .addClass( ratingsdata.rating2_css )
                                .append( ratingsdata.rating2_key )

                        )
                        .append(
                            $('<span>')
                                .append(
                                    //$('<input data-orderquestionid="' + this.orderquestionID + '" data-questionid="' + this.questionID + '"type="radio" value="1" name="question' + myQuestionNumber + '">')
                                    //-- 201705
                                    $('<input data-orderquestionid="' + this.orderquestionID + '" data-questionid="' + this.questionID + '" type="radio" value="' + ratingsdata.rating1_value + '" name="question' + myQuestionNumber + '">')
                                )
                                //.addClass('poor')
                                //.append('Poor')
                                .addClass( ratingsdata.rating1_css )
                                .append( ratingsdata.rating1_key )

                        )
                        .append(
                            $('<span>')
                                .append(
                                    $('<input data-orderquestionid="' + this.orderquestionID + '" data-questionid="' + this.questionID + '" type="radio" value="0" name="question' + myQuestionNumber + '">')
                                )
                                .addClass('na')
                                .append('NA')
                        )
                );
            }


            if (this.questionType == 2) {//textarea
                questionHolder.append(
                    $('<div>').addClass('answerHolder').append(
                        $('<textarea data-questionid="' + this.questionID + '" data-orderquestionid="' + this.orderquestionID + '" name="question' + myQuestionNumber + '" >')
                    )
                );
            }

            myQuestionNumber++;
        });

        var submitButton = $('<div>');

        if (whatClass[evalNumber].questions.length > 0) {
            submitButton.addClass('submitButton')
                .text('Submit Evaluation')
                .off()
                .on('click', function () {
                    var evalID = whatClass[evalNumber].orderID;
                    self.createRespondentID(evalID);
                });
        } else {
            submitButton.addClass('thankyouButton')
                .text('Close Evaluation')
                .off()
                .on('click', function () {
                    self.showCourseReviews(whatClass);
                });
        }


        submitButton.appendTo(container);

        self.showEvalPopUp();
    }

    //get responses and sends data to be saved
    self.submitEvaluation = function (respondentID, evalID) {

        //Google Analytics event trigger tag
        var gaInfo = 'EvalID ' + evalID + ' RespondentID ' + respondentID;
        ga('send', 'event', 'Submit Class Eval', gaInfo);

        var evalAnswerArray = new Array();
        var evalParam;

        //loop through controls and save selected or entered answers
        $.each($('#CourseReviewPopUp input:checked'), function () {
            evalParam = new EvalResponse();
            evalParam.respondentID = respondentID.Context;
            evalParam.evalID = evalID;
            evalParam.orderquestionID = $(this).data("orderquestionid");
            evalParam.answerValue = $(this).val();
            evalParam.questionType = 1;
            evalAnswerArray.push(evalParam);
        });


        $.each($('#CourseReviewPopUp textarea'), function () {
            evalParam = new EvalResponse();
            evalParam.respondentID = respondentID.Context;
            evalParam.evalID = evalID;
            evalParam.orderquestionID = $(this).data("orderquestionid");
            evalParam.answerValue = $(this).val();
            evalParam.questionType = 2;
            evalAnswerArray.push(evalParam);
        });

        self.saveEvalResponses(evalAnswerArray);

        function EvalResponse() {
            var self = this;
            self.respondentID;
            self.evalID;
            self.orderquestionID;
            self.answerValue;
            self.questionType;
        }

    }

    //insert new record and get back a respondent id
    //respondent id's are used to save responses in order to make them anonymous
    self.createRespondentID = function (evalID, isCustom) {
        $.mobile.loading('show');
        var parameters = new Object();
        parameters.orderID = evalID;

        $.ajax({
            type: 'POST',
            async: true,
            contentType: 'application/json; charset=utf-8',
            url: portalRef + 'WebServices/ClassEvaluationService.asmx/GetRespondentID',
            data: JSON.stringify(parameters),
            dataType: 'json',
            success: function (rValue) {
                var respondentID = rValue.d;
                //success saves responses
                if (respondentID != 0) {

                    self.submitEvaluation(respondentID, evalID, isCustom);
                }

                $.mobile.loading('hide');
            },
            fail: function (rValue) {
                var stopHere = '';
            }
        });
    }

    //after a successfull save, marks evaluation as complete
    self.saveEvalResponses = function (evalAnswerArray) {
        //get orderquestionID, respondentID, questionType, response

        var param = JSON.stringify(evalAnswerArray);

        $.mobile.loading('show');
        var params = new Object();
        params.evalAnswerArray = evalAnswerArray;

        $.ajax({
            type: 'POST',
            async: true,
            contentType: 'application/json; charset=utf-8',
            url: portalRef + 'WebServices/ClassEvaluationService.asmx/saveResponses',
            data: JSON.stringify(params),
            dataType: 'json',
            success: function (rValue) {
                var success = rValue.d.Context;

                $.mobile.loading('hide');

                if (success) {
                    self.ShowSuccessfulEvalMessage();
                }

            },
            fail: function (rValue) {
                var stopHere = '';
            }
        });

    }

    self.ShowSuccessfulEvalMessage = function () {
        self.getClassEvaluation();
    }

    //get evaluations for this student
    //evals returned will only include questions if eval is not complete
    self.getClassEvaluationForQueryString = function (evalNumber) {
        //evalNumber references the eval itemNo

        $.mobile.loading('show');
        var parameters = new Object();


        parameters.yrq = myCampus.Quarters.YRQCurrent.YRQ;

        if (myCampus.Quarters.YRQCurrent.DisplayEvals) {

            $.ajax({
                type: 'POST',
                async: true,
                contentType: 'application/json; charset=utf-8',
                url: portalRef + 'WebServices/ClassEvaluationService.asmx/GetEvalList',
                data: JSON.stringify(parameters),
                dataType: 'json',
                success: function (rValue) {
                    var userContext = rValue.d;

                    Html.hidePopUp();
                    //success shows successful authentication in this case
                    if (userContext.ServiceStatus.IsSuccess) {

                        var evalCounter = 0;
                        var evanNumberMatched = false;

                        $.each(userContext.Context, function () {
                            if (this.itemNo == evalNumber) {
                                //change the evalNumber to the index value of the eval
                                evalNumber = evalCounter;
                                evanNumberMatched = true;
                            }
                            evalCounter++;
                        });

                        if (!myCampus.SelectedQuarter.DisplayEvals && evanNumberMatched) {//are evals ready to display?
                            self.buildClassEvaluation(evalNumber, userContext.Context);
                        } else {
                            //self.showNoEvalAvailable();
                            self.getClassEvaluation();
                        }

                    }
                    $.mobile.loading('hide');
                },
                fail: function (rValue) {
                    var stopHere = '';
                }
            });

        } else {
            self.showNoEvalAvailable();
        }

    }

    self.showLearnMore = function () {
        $('#CourseReviewHolder').addClass('displayNone');
        $('#LearnMoreHolder').removeClass('displayNone');
    }

    self.closeLearnMore = function () {
        $('#CourseReviewHolder').removeClass('displayNone');
        $('#LearnMoreHolder').addClass('displayNone');
    }

    self.showNoEvalAvailable = function () {
        $('#CourseReviewHolder').empty()
            .append(
                $('<h3>').html('Course Evaluations<span onClick="Html.hidePopUp();" class="ui-btn-icon-right ui-icon-delete"></span>')
            )
            .append(
                $('<div>').addClass('classList').append(
                    $('<div>')
                        .addClass('classToReview')
                        .append(
                            $('<p>').text('Course Evaluations are unavailable for the current quarter.')
                        )
                        .append(
                            $('<p>').text('Evaluations will be available beginning ' + myCampus.Quarters.YRQCurrent.StartEvalDisplay + '.')
                        )
                )

            );

        self.showEvalPopUp();

    }

    self.showAllCompleteEval = function () {

        $('#CourseReviewHolder').empty()
            .append(
                $('<h3>').html('Course Evaluations Complete<span onClick="Html.hidePopUp();" class="ui-btn-icon-right ui-icon-delete"></span>')
            )
            .append(
                $('<div>').addClass('classList').append(
                    $('<div>')
                        .addClass('classToReview')
                        .append(
                            $('<p>').text('You have completed all assigned evaluations for the current quarter.')
                        )
                        .append(
                            $('<p>').text('Thank you, your feedback is important to us!')
                        )
                )

            );

        self.showEvalPopUp();

    }


    self.showEvalPopUp = function () {

        $('.mfp-bg').css({ 'opacity': '.7' });

        $.magnificPopup.open({
            items: {
                src: '#CourseReviewPopUp',
                type: 'inline'
            },
            showCloseBtn: false,
            closeOnBgClick: false,
            mainClass: 'holder'
        });

    };




}



var ClassEval = new EvalGenerator();




//-- 20170512 addition DAS
function getRatingsValueLabel( isCIE )
{
    var value5 = '5';
    var value4 = '4';
    var value3 = '3';
    var value2 = '2';
    var value1 = '1';

    var key5 = 'Excellent';
    var key4 = 'Very Good';
    var key3 = 'Good';
    var key2 = 'Fair';
    var key1 = 'Poor';

    var css5 = 'excellent';
    var css4 = 'veryGood';
    var css3 = 'good';
    var css2 = 'fair';
    var css1 = 'poor';

    if ( isCIE )
    {
        value5 = '15';
        value4 = '14';
        value3 = '13';
        value2 = '12';
        value1 = '11';

        key5 = 'Strongly Agree';
        key4 = 'Agree';
        key3 = 'Neutral';
        key2 = 'Disagree';
        key1 = 'Strongly Disagree';

        css5 = 'stronglyAgree';
        css4 = 'agree';
        css3 = 'neutral';
        css2 = 'disagree';
        css1 = 'stronglyDisagree';

    }


    //--20170512 DAS
    //-- can't just just use a return
    //-- possible conflicts with jQuery library - when called, object returns undefined
    //--  i.e. return{ rating5_value: value5,
    //--               rating4_value: value4,
    //--               ...
    //--               rating4_key: key1 };
    //-- set to variable and return variable instead
    var temp =
        {
            rating5_value: value5,
            rating4_value: value4,
            rating3_value: value3,
            rating2_value: value2,
            rating1_value: value1,
            rating5_key: key5,
            rating4_key: key4,
            rating3_key: key3,
            rating2_key: key2,
            rating1_key: key1,
            rating5_css: css5,
            rating4_css: css4,
            rating3_css: css3,
            rating2_css: css2,
            rating1_css: css1
        }

    return temp;


}


