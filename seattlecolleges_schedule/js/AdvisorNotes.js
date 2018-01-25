

function AdvisorNotes() {
    var self = this;
    this.NoteList = new Object();

    //get all Advisor Notes for this student
    self.getAdvNotesList = function () {
        $.ajax({

            type: 'POST',
            async: true,
            contentType: 'application/json; charset=utf-8',
            url: portalRef + 'WebServices/AdvisorNotesService.asmx/GetAdvNotesList',
            success: function (rValue) {
                var userContext = rValue.d;

                if (userContext.Context.length == undefined || userContext.Context.length == 0) {
                    self.NoteList = 'empty';
                } else {
                    self.NoteList = userContext.Context;
                }

                self.initNotes();
                $.mobile.loading('hide');
                var stophere = '';
            },
            fail: function (rValue) {

            }

        });

    }





    self.initNotes = function () {

        var container;
        if (isMobile()) {
            container = $('#AdvisorItemsControls');
        } else {
            container = $('#myAdvisorTab');
        }

        if (Advisor.NoteList == 'empty') {
            //checked the list but it is empty
            //show empty advisor notes message
            $('<div>').css({ 'padding': '.25em' }).text('No Advisor Notes Found').appendTo(container);

        } else if (Advisor.NoteList.length > 0 && Advisor.NoteList != 'empty') {


            $.each(Advisor.NoteList, function () {
                /* build quarter holder for each quarter */
                var quarterHolder = $('<div>').addClass('quarterHolder');

                //add '20' to the year marker
                var yearTitle = this.yrqTitle;
                yearTitle = yearTitle.split(' ');
                yearTitle = yearTitle[0] + ' 20' + yearTitle[1];
                var quarterName = $('<div>').addClass('quarterName ui-btn-icon-left')
                    .attr({ 'tabindex': '0' })
                    .text(yearTitle).appendTo(quarterHolder);


                var yearTitleMarker = this.yrqTitle;
                yearTitleMarker = yearTitleMarker.split(' ');
                yearTitleMarker = yearTitleMarker[0] + '20' + yearTitleMarker[1];
                yearTitleMarker = yearTitleMarker.toLowerCase();
                quarterHolder.attr({ 'data-quartername': yearTitleMarker });


                if (isMobile()) {
                    $(quarterName).addClass('ui-icon-carat-d');
                } else {
                    //do we want each year open or closed for desktop?
                    //$(quarterHolder).addClass('openQuarter');
                    $(quarterName).addClass('ui-icon-carat-d');
                }

                quarterName.on('click', function () {
                    if ($(this).parent().hasClass('openQuarter')) {
                        $(this.nextSibling).slideUp(400, function () {
                            $(this).parent().removeClass('openQuarter');
                        });
                        $(this).removeClass('ui-icon-carat-u');
                        $(this).addClass('ui-icon-carat-d');
                    } else {
                        $(this.nextSibling).slideDown(400, function () { });

                        $(this).removeClass('ui-icon-carat-d');
                        $(this).addClass('ui-icon-carat-u');

                        $(this).parent().addClass('openQuarter');
                    }
                }).on('keydown', function (e) {
                    var keyCode = e.keyCode || e.which;
                    if (keyCode == 13) {

                        if ($(this).parent().hasClass('openQuarter')) {
                            $(this.nextSibling).slideUp(400, function () {
                                $(this).parent().removeClass('openQuarter');
                            });
                            $(this).removeClass('ui-icon-carat-u');
                            $(this).addClass('ui-icon-carat-d');
                        } else {
                            $(this.nextSibling).slideDown(400, function () { });
                            $(this).removeClass('ui-icon-carat-d');
                            $(this).addClass('ui-icon-carat-u');

                            $(this).parent().addClass('openQuarter');
                        }
                    }
                });



                /*
                    build content holder
                    holds everything that is toggled in and out of view
                    for each quarter
                */
                var quarterContent = $('<div>').addClass('quarterContent').attr({ 'data-quartername': yearTitleMarker }).appendTo(quarterHolder);

                /* build quarter header for each quarter */
                var noteHeader = $('<div>').addClass('noteHeader').appendTo(quarterContent);
                $('<span>').addClass('noteDate').text('Date').appendTo(noteHeader);
                $('<span>').addClass('noteTitle').text('Title').appendTo(noteHeader);
                $('<span>').addClass('noteSubmitterSmall').text('Submitter').appendTo(noteHeader);
                $('<span>').addClass('noteNote').text('Actions/Reffs Content').appendTo(noteHeader);
                $('<span>').addClass('noteSubmitter').text('Submitter').appendTo(noteHeader);




                /* build a row for each note per quarter */
                var noteContent = $('<div>').addClass('noteContent');//.appendTo(quarterContent);

                var thisDate;
                var thisSection;
                var thisSubmitter;
                var needSubmitterName = false;

                var actionsHolder; var noteTextHolder; var referralsHolder;

                $.each(this.advNotes, function () {
                    var date_test = new Date(this.insertTime);
                    convertedDate = (date_test.getMonth() + 1) + '/' + date_test.getDate() + '/' + date_test.getFullYear();

                    //set the date
                    if (thisDate == undefined) {
                        thisDate = convertedDate;
                        insertTimeText = convertedDate;


                        //it's a new date, add some holders
                        actionsHolder = $('<div>').addClass('holder actions').attr({ 'data-dateTitle': thisDate }).appendTo(quarterContent);
                        referralsHolder = $('<div>').addClass('holder referrals').attr({ 'data-dateTitle': thisDate }).appendTo(quarterContent);
                        noteHolder = $('<div>').addClass('holder note').attr({ 'data-dateTitle': thisDate }).appendTo(quarterContent);

                    } else {
                        if (thisDate == convertedDate) {

                        } else {
                            thisDate = convertedDate;
                            insertTimeText = convertedDate;
                            needSubmitterName = true;

                            //it's a new date, add some holders
                            actionsHolder = $('<div>').addClass('holder actions').attr({ 'data-dateTitle': thisDate }).appendTo(quarterContent);
                            referralsHolder = $('<div>').addClass('holder referrals').attr({ 'data-dateTitle': thisDate }).appendTo(quarterContent);
                            noteHolder = $('<div>').addClass('holder note').attr({ 'data-dateTitle': thisDate }).appendTo(quarterContent);

                        }
                    }

                    //set the section
                    thisSection = this.section;
                    sectionText = this.section;

                    //set the submitter
                    submitterText = this.submitter;
                    thisSubmitter = this.submitter;


                    var targetHolderText = sectionText.toLowerCase();

                    targetHolderText = targetHolderText + 'Holder';
                    targetHolderText = targetHolderText.replace(/\s/g, '');

                    noteContent = $('<div>').addClass('noteContent');
                    switch (targetHolderText) {
                        case 'actionsHolder':
                            noteContent.appendTo(actionsHolder);
                            break;

                        case 'referralsHolder':
                            noteContent.appendTo(referralsHolder);
                            break;

                        case 'noteHolder':
                            noteContent.appendTo(noteHolder);
                            break;

                        default:
                    }

                    noteContent.attr({ 'data-thissection': thisSection, 'data-thissubmitter': thisSubmitter, 'data-thisdate': thisDate });

                    var noteDate = $('<span>').addClass('noteDate').text(insertTimeText).appendTo(noteContent);
                    var noteTitle = $('<span>').addClass('noteTitle').text(sectionText).appendTo(noteContent);
                    var noteSubmitterSmall = $('<span>').addClass('noteSubmitterSmall').text(submitterText).appendTo(noteContent);
                    var noteDate = $('<span>').addClass('noteNote').text(this.noteContent).appendTo(noteContent);
                    var noteSubmitter = $('<span>').addClass('noteSubmitter').text(submitterText).appendTo(noteContent);

                });
                container.append(quarterHolder);

            });

        } else {
            Advisor.getAdvNotesList();
        }

        self.alignNotes();

        Html.showNotes();
    }//initNotes





    self.alignNotes = function () {

        //var thisDate;
        var holder;

        $.each($('.quarterHolder .quarterContent .holder'), function () {
            holder = this;
            var thisDate = '';
            var thisSection = '';
            var thisSubmitter = '';

            var submitterMatch = false;
            var sectionMatch = false;
            var dateMatch = false;

            var thisSubmitterSmall = '';
            var submitterSmallMatch = false;
            if ($(holder).html() == '' || $(holder).html() == undefined) {
                //the holder is empty, so we get rid of it
                $(holder).remove();
            } else {

                $.each($(holder).children('div'), function () {
                    trigger = this;
                    var dateMarker;

                    $.each($(trigger).children(), function () {

                        if ($(this).hasClass('noteDate')) {
                            dateMarker = this;

                            if ($(this).text() == thisDate) {
                                dateMatch = true;

                            } else {
                                thisDate = $(this).text();
                                dateMatch = false;
                            }
                        }

                        if ($(this).hasClass('noteTitle')) {

                            if ($(this).text() == thisSection) {
                                sectionMatch = true;
                                $(this).text('');
                                $(dateMarker).text('');
                            } else {
                                thisSection = $(this).text();

                                if (!isMobile()) {
                                    $(dateMarker).text(thisDate);
                                }

                            }
                        }




                        if ($(this).hasClass('noteSubmitter')) {
                            if (thisSubmitter == '') {
                                console.log('submitter blank');
                                thisSubmitter = $(this).text();
                            } else if (thisSubmitter == $(this).text()) {
                                submitterMatch = true;
                                $(this).text('');
                            } else {
                                console.log('submitter NOT blank');
                                submitterMatch = false;

                                thisSubmitter = $(this).text();



                            }

                        }




                        if ($(this).hasClass('noteSubmitterSmall')) {
                            if (thisSubmitterSmall == '') {
                                thisSubmitterSmall = $(this).text();
                            } else if (thisSubmitterSmall == $(this).text()) {
                                submitterSmallMatch = true;
                                $(this).text('');
                            } else {
                                submitterSmallMatch = false;

                                thisSubmitterSmall = $(this).text();



                            }

                        }


                    });

                });

            }

        });
    }//alignNotes


}



var Advisor = new AdvisorNotes();