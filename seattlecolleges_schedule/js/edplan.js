var edPlan = new EducationPlan();

function EducationPlan() {
    var self = this;

    //gets all ed plans associated with a user and lists them in the dropdown
    //builds html view of default or selected ed plan automatically or adds "no ed plan" message
    self.getEdPlanSelectorData = function (showEpID) {

        console.log('getEdPlanSelectorData - GetEdPlanList');
        $.mobile.loading('show');

        $.ajax({
            type: 'POST',
            async: true,
            contentType: 'application/json; charset=utf-8',
            url: portalRef + 'WebServices/EdPlanService.asmx/GetEdPlanList',
            data: '{}',
            dataType: 'json',
            success: function (rValue) {
                var userContext = rValue.d;
                //success shows successful authentication in this case
                if (userContext.ServiceStatus.IsSuccess) {


                    if (userContext.Context.kvpList != null) {

                        self.initEdPlanSelector(userContext.Context.kvpList, showEpID);

                        //if an optional epID has been passed in, skip to display that ed plan
                        //otherwise display the default ed plan in the list
                        if (typeof (showEpID == 'undefined') || (showEpID = null)) {
                            console.log(userContext.Context.edPlan);
                            self.buildEdPlanDeskTop(userContext.Context.edPlan);

                        }
                        else {

                            self.getEdPlanByID(showEpID);
                        }


                    } else {
                        self.showNoEdPlanMessage();
                    }
                }
                $.mobile.loading('hide');
            },
            fail: function (rValue) {
                var stopHere = '';
            }
        });
    }

    //populated ed plan drop down with all user ed plans
    self.initEdPlanSelector = function (kvpList, selectedPlan) {
        console.log('initEdPlanSelector');
        console.log(selectedPlan);

        $('#MyEdPlanItemControls').remove();

        $('#mcontainer').remove();
        var container;

        if (isMobile()) {
            container = $('<div>').attr({ 'id': 'MyEdPlanItemControls' });
            $(container).appendTo($('#MyEdPlanWrapper'));
        } else {

            $('<div>').attr({ 'id': 'MyEdPlanItemControls' }).appendTo($('#myEdPlanTab'));

            container = $('#MyEdPlanItemControls');
        }


        self.appendCollegeMessage();


        $('#DdlEdPlans').remove();

        $('<select>').attr({ 'id': 'DdlEdPlans' }).appendTo(container);

        console.log('initEdPlanSelector');

        $.each(kvpList, function () {
            var kvp = this;
            console.log(kvp.value + ' : ' + selectedPlan);

            if (selectedPlan == undefined) {
                $('#DdlEdPlans')
                    .append(
                        $('<option>')
                            .val(kvp.value)
                            .html(kvp.key)
                            .prop('selected', kvp.isDefault ? true : false)
                    );
            } else {

                if (selectedPlan == kvp.value) {
                    console.log('selected true');
                    $('#DdlEdPlans')
                        .append(
                            $('<option>')
                                .val(kvp.value)
                                .html(kvp.key)
                                .prop('selected', true)
                        );

                } else {
                    console.log('selected false');
                    $('#DdlEdPlans')
                        .append(
                            $('<option>')
                                .val(kvp.value)
                                .html(kvp.key)
                                .prop('selected', false)
                        );
                }

            }

        });

        $('#DdlEdPlans').selectmenu().selectmenu("refresh");

        $('#DdlEdPlans').on('change', function () {
            console.log('edPlan Id: ' + $(this).val());
            self.getEdPlanByID($(this).val());

        }).selectmenu("refresh");

    }

    //shows message if no user ed plan exists
    self.showNoEdPlanMessage = function () {
        $('.loginWrapper').removeClass('activeNav');

        console.log('showNoEdPlan');

        $('#MyEdPlanItemControls').remove();

        var container;
        container = $('<div>').attr({ 'id': 'MyEdPlanItemControls' });

        if (isMobile()) {
            $(container).appendTo($('#MyEdPlanWrapper'));
        } else {
            $(container).appendTo($('#myEdPlanTab'));
        }


        self.appendCollegeMessage();

        $('#DdlEdPlans').remove();
        $('<select>').attr({ 'id': 'DdlEdPlans' }).appendTo(container);


        $('#DdlEdPlans')
            .append(
                $('<option>')
                    .val('0')
                    .html('Please Create an Ed Plan')
                    .prop('selected', true)
            );


        $('#DdlEdPlans').selectmenu().selectmenu("refresh");


        $('#txbNewEdPlanName').val('');

        var EdPlanContent = $('<div>').attr({ 'id': 'EdPlanContent' }).appendTo(container);
        var EdPlanHeader = $('<div>').attr({ 'id': 'EdPlanHeader' }).appendTo(EdPlanContent);

        $('#EdPlanHeader')

            .append(  //ADD A YEAR ED PLAN--------------------------------------------------------------------->
                $('<div>').attr({ 'id': 'btnAddYearPopUp' }).text('Add a Year').addClass('addYear ui-btn-icon-left ui-icon-plus disabled')
            )

            .append(  //COPY ED PLAN--------------------------------------------------------------------->
                $('<div>').attr({ 'id': 'btnCopyEdPlanPopUp' }).text('Copy Ed Plan').addClass('copyPlan ui-btn-icon-left ui-icon-copy disabled')
            )
            .append(  //DELETE ED PLAN--------------------------------------------------------------------->
                $('<div>').attr({ 'id': 'btnDeleteEdPlanPopUp' }).text('Delete Ed Plan').addClass('deletePlan ui-btn-icon-left ui-icon-minus disabled')
            )
            .append(  //PRINT ED PLAN---------------------------------------------------------------------->
                $('<div>').attr({ 'id': 'btnPrintEdPlanPopUp' }).text('Print Ed Plan').addClass('copyPlan ui-btn-icon-left ui-icon-grid disabled')
                    .on('click', function () {


                        /*
                        //remove unwanted content
                        $('#custMsg').remove();
                        $('#DdlEdPlans').remove();
                        $('#btnCreateEdPlan').remove();
                        $('#btnDeleteEdPlanPopUp').remove();
                        $('#btnCopyEdPlanPopUp').remove();
                        $('#btnAddYearPopUp').remove();
                        $('#btnPrintEdPlanPopUp').remove();

                        //set the background to white so the dk grey modal background is covered
                        $('#MyEdPlanItemControls').attr({ 'style': 'background-color:#ffffff;' });
                        */


                        /*
                        //create print and close buttons and show pop up
                        var printButton = $('<button>')
                                       .attr({ 'id': 'printPlan' })
                                       .text('Print Ed Plan')
                                       .on('click', function () {
                                           window.print();
                                           //repopulate the ed plan page
                                           self.getEdPlanSelectorData();
                                           $.magnificPopup.close();
                                       });

                        var closeButton = $('<button>')
                                        .attr({ 'id': 'closeEPPrint' })
                                        .text('X')
                                        .addClass('mfp-close')
                                        .on('click', function () {

                                           //repopulate the ed plan page
                                            self.getEdPlanSelectorData();
                                            $.magnificPopup.close();

                                        });
                        */

                        /*
                        //insert the print and close buttons above the modal content
                        $('#MyEdPlanItemControls')
                            .prepend(printButton);

                        $('#MyEdPlanItemControls')
                        .prepend(closeButton);

                        $.magnificPopup.open({
                            items: {
                                src: '#MyEdPlanItemControls',
                                type: 'inline'
                            },
                            showCloseBtn: false,
                            closeOnBgClick: false,
                            mainClass: 'holder'
                        });

                        */
                    }))
            .append( //CREATE ED PLAN--------------------------------------------------------------------->
                $('<div>').attr({ 'data-role': 'button', 'id': 'btnCreateEdPlan' }).text('Create Ed Plan').addClass('edPlanCreateLinkIcon ui-btn-icon-left ui-icon-edit disabled')
                    .on('click', function () {
                        //empty create txb
                        $('#txbNewEdPlanName').val('');
                        console.log('show edplan info popup');
                        $.magnificPopup.open({

                            items: {
                                src: '#createEdPlan',
                                type: 'inline'
                            },
                            showCloseBtn: false,
                            closeOnBgClick: true,
                            mainClass: 'holder'
                        });


                    }))

            .append(
                $('<span>').attr({ 'id': 'lblEdPlanTitle' }).addClass('edPlanTitle').text('Please create an Ed Plan')
            );



        Html.showEdPlan();

        var stopHere = '';
    }

    //builds ed plan html display (including mobile)
    self.buildEdPlanDeskTop = function (edPlan) {
        console.log('BuildEdPlanDeskTop');
        console.log(edPlan.edPlanName);

        //Google Anaylytics event log tag
        var gaInfo = 'EdPlanID ' + edPlan.edPlanID;
        ga('send', 'event', 'Build Ed Plan Desktop', gaInfo);

        var controls = $('#MyEdPlanItemControls');

        var EdPlanContent = $('<div>').attr({ 'id': 'EdPlanContent' }).appendTo(controls);
        var EdPlanHeader = $('<div>').attr({ 'id': 'EdPlanHeader' }).appendTo(EdPlanContent);

        var EdPlanYearsWrapper = $('<div>').attr({ 'id': 'EdPlanYearsWrapper' }).appendTo(EdPlanContent);
        var EdPlanYearsControls = $('<div>').attr({ 'id': 'EdPlanYearsControls' }).appendTo(EdPlanYearsWrapper);


        $('#EdPlanCommentsContent').remove();
        $('#EdPlanComments').remove();


        var EdPlanCommentsContent = $('<div>').attr({ 'id': 'EdPlanCommentsContent' }).appendTo(controls);
        var EdPlanComments = $('<div>').attr({ 'id': 'EdPlanComments' }).appendTo(EdPlanCommentsContent);


        self.buildEdPlanTitle(edPlan);


        $('#EdPlanYearsWrapper').empty();
        if (edPlan.yearObjs.length > 0) {
            self.buildEdPlanYears(edPlan);
        }

        self.buildEdPlanComments(edPlan);


        Html.showEdPlan();

        var stopHere = '';
    }

    //build the title and edit buttons for an ed plan
    //includes (Create, Delete, Copy and  Add Year buttons and functions)
    //if an ed plan is approved, all but Copy and Create New will be disabled
    self.buildEdPlanTitle = function (edPlan) {
        console.log(edPlan.edPlanName);

        //append draft or approved message to plan name
        if (edPlan.approved) {
            edPlan.edPlanName = edPlan.edPlanName + " *APPROVED*";
        }
        else {
            edPlan.edPlanName = edPlan.edPlanName + " -DRAFT";
        }

        var container = $('#EdPlanHeader');

        var edPlanCreatedByHolder = $('<div>').addClass('edPlanCreatedByHolder');

        var primaryEdPlanMarkerHolder = $('<span>').attr({ 'id': 'primaryEdPlanMarkerHolder' });

        var edPlanApprovedMessageHolder = $('<span>').attr({ 'id': 'edPlanApprovedMessageHolder' });


        $(container).empty();

        $(container)
            .append(
                edPlanCreatedByHolder
                    .append(
                        $('<div>')
                            .addClass('edPlanName')
                            .text('Plan Name: ')
                            .append(
                                $('<span>').text(edPlan.edPlanName)
                            )
                    )
                    .append(
                        primaryEdPlanMarkerHolder
                    )
                    .append(
                        edPlanApprovedMessageHolder
                    )
                    .append(
                        edPlan.createdByLink
                    )

                    .append(
                        $('<span>').addClass('updatedByLink').append(edPlan.updatedByLink)

                    )
            );




        var primaryEdPlanMarkerLabel = $('<label>').attr({ 'for': 'primaryEdPlanMarker', 'id': 'primaryEdPlanMarkerLabel' });

        var primaryEdPlanMarker = $('<input>').attr({ 'type': 'checkbox', 'id': 'primaryEdPlanMarker' })
            .on('change', function () {
                console.log('check changed');

                console.log($(primaryEdPlanMarker).is(':checked'));

                if ($(primaryEdPlanMarker).is(':checked')) {
                    self.setEdPlanAsDefault();
                }
            });


        if (edPlan.isDefault) {
            primaryEdPlanMarkerLabel.text('This is your Primary Ed Plan');
        } else {
            primaryEdPlanMarkerLabel.text('Make this my Primary Ed Plan');

            $(primaryEdPlanMarkerHolder)
                .append(
                    primaryEdPlanMarker
                );
        }


        $(primaryEdPlanMarkerHolder)
            .append(
                primaryEdPlanMarkerLabel
            );



        var addYearButton = $('<div>').attr({ 'id': 'btnAddYearPopUp' })
            .text('Add a Year').addClass('addYear ui-btn-icon-left ui-icon-plus')
            .on('click', function () {
                console.log('build year list then show add year pop up');
                self.addYear();

                $.magnificPopup.open({
                    items: {
                        src: '#addYear',
                        type: 'inline'
                    },
                    showCloseBtn: false,
                    closeOnBgClick: true,
                    mainClass: 'holder'
                });
            });

        var copyEdPlanButton = $('<div>').attr({ 'id': 'btnCopyEdPlanPopUp' })
            .text('Copy Ed Plan').addClass('copyPlan ui-btn-icon-left ui-icon-action')
            .on('click', function () {
                $('#txbCopyEdPlanName').val('');
                console.log('show copy edplan pop up');
                $.magnificPopup.open({
                    items: {
                        src: '#copyEdPlan',
                        type: 'inline'
                    },
                    showCloseBtn: false,
                    closeOnBgClick: true,
                    mainClass: 'holder'
                });
            });

        var deleteEdPlanButton = $('<div>').attr({ 'id': 'btnDeleteEdPlanPopUp' })
            .text('Delete Ed Plan').addClass('deletePlan ui-btn-icon-left ui-icon-delete')
            .on('click', function () {
                console.log('show edplan delete popup');
                $.magnificPopup.open({
                    items: {
                        src: '#deleteEdPlan',
                        type: 'inline'
                    },
                    showCloseBtn: false,
                    closeOnBgClick: true,
                    mainClass: 'holder'
                });
            });
        var printEdPlanButton = $('<div>').attr({ 'id': 'btnPrintEdPlanPopUp' })
            .text('Print Ed Plan').addClass('copyPlan ui-btn-icon-left ui-icon-grid')
            .on('click', function () {
                //remove unwanted content add background color
                $('#custMsg').remove();
                $('#DdlEdPlans').remove();
                $('#btnCreateEdPlan').remove();
                $('#btnDeleteEdPlanPopUp').remove();
                $('#btnCopyEdPlanPopUp').remove();
                $('#btnAddYearPopUp').remove();
                $('#btnPrintEdPlanPopUp').remove();

                //set the background to white so the dk grey modal background is covered
                $('#MyEdPlanItemControls').attr({ 'style': 'background-color:#ffffff;' });

                //create print button and show pop up
                var printButton = $('<button>')
                    .attr({ 'id': 'printPlan' , 'style' : 'padding:10px;'})
                    .text('Print Ed Plan')
                    .on('click', function () {
                        window.print();
                        //repopulate the ed plan page
                        self.getEdPlanSelectorData();
                        $.magnificPopup.close();
                    });

                var closeButton = $('<button>')
                    .attr({ 'id': 'closeEPPrint' , 'style' : 'color:#000000;'})
                    .text('x')
                    .addClass('mfp-close')
                    .on('click', function () {

                        //repopulate the ed plan page
                        self.getEdPlanSelectorData();
                        $.magnificPopup.close();

                    });

                //insert the print and close buttons above the modal content
                $('#MyEdPlanItemControls')
                    .prepend(printButton);
                $('#MyEdPlanItemControls')
                    .prepend(closeButton);


                $.magnificPopup.open({
                    items: {
                        src: '#MyEdPlanItemControls',
                        type: 'inline'
                    },
                    showCloseBtn: false,
                    closeOnBgClick: false,
                    mainClass: 'holder'
                });
            });
        var createEdPlanButton = $('<div>').attr({ 'data-role': 'button', 'id': 'btnCreateEdPlan' })
            .text('Create Ed Plan').addClass('edPlanCreateLinkIcon ui-btn-icon-left ui-icon-edit')
            .on('click', function () {
                //empty create txb
                $('#txbNewEdPlanName').val('');
                console.log('show edplan info popup');
                $.magnificPopup.open({
                    items: {
                        src: '#createEdPlan',
                        type: 'inline'
                    },
                    showCloseBtn: false,
                    closeOnBgClick: true,
                    mainClass: 'holder'
                });

            });

        //determin the campus and contact information then append it to the approved message container

        switch (myCampus.CampusCode) {
            case '062':
                var lnk = '<a href="http://seattlecentral.edu/educational-planning/index.php" target="_blank" title="Advising Contact" style="display:inline-block; padding:.5em;">Contact Central Advising Here </a> <br >';
                break;
            case '063':
                var lnk = '<span style="display:inline-block; margin-left:.5em;">Contact North Advising Here 206-934-3658</span> <br > ';
                break;
            case '064':
                var lnk = '<a href="http://www.southseattle.edu/advising/advising-counseling-appointments.aspx" target="_blank" title="Advising Contact" style="display:inline-block;" >Contact South Advising Here </a> <br >';
                break;
            case '065':
                var lnk = '<a href="http://sviweb.sccd.ctc.edu/sr_counsel.htm" target="_blank" title="Advising Contact" style="display:inline-block;">Contact SVI Advising Here </a> <br >';
                break;
            default:
                edPlanApprovedMessageHolder.append($('<p>').text('Visit your college web site for advising contact information.'));
        }

        console.log(edPlan.approved);
        if (edPlan.approved) {
            console.log('approved');
            $(addYearButton).off().addClass('disabled');
            $(deleteEdPlanButton).off().addClass('disabled');


            edPlanApprovedMessageHolder
                .append(
                    $('<span class="appMsg" >').text('This plan has been approved by an advisor or counselor and cannot be edited or deleted. ')
                )
                .append(
                    $('<span style="display: inline-block; margin-left:.5em;" >').text(' If you need to make changes, you can copy this plan to a new plan, or contact your advisor or counselor.').addClass()

                )
                .append(lnk)
                .append(
                    $('<span style="display:inline; margin-left:.5em; ">').text('Approved by:')
                )
                .append(
                    $('<span>').addClass('approvedDate').text(edPlan.approvedBy)
                )
                .append(
                    $('<span style="margin-left:1em;">').addClass('approvedLabel').text('Approved date:')
                )
                .append(
                    $('<span style="margin-bottom:1em;" >').addClass('approvedDate').text(edPlan.approvedDate)
                );
        }
        else {

            edPlanApprovedMessageHolder
                .append(
                    $('<span class="appMsg" > ').text('This ed plan has not been approved by an advisor or counselor. ')
                )
                .append(
                    $('<span style="margin-left:.5em;" >').text(' Education Plans must be approved by an advisor or counselor.')
                )
                .append(
                    $('<span style="display: inline-block; margin-bottom:1em; margin-left:.5em;" >').text(' If this is the plan you are basing your schedule on, please be sure to contact your advisor or counselor for approval.')

                ).append(
                lnk
            );
        }


        container
            .append(  //ADD A YEAR ED PLAN--------------------------------------------------------------------->
                addYearButton
            )

            .append(  //COPY ED PLAN--------------------------------------------------------------------->
                copyEdPlanButton
            )
            .append(  //DELETE ED PLAN--------------------------------------------------------------------->
                deleteEdPlanButton
            )
            .append( //PRINT ED PLAN-------------------------------------------------------------------------->
                printEdPlanButton
            )
            .append( //CREATE ED PLAN--------------------------------------------------------------------->
                createEdPlanButton
            )

            .append(
                $('<span>').attr({ 'id': 'lblEdPlanTitle' }).addClass('edPlanTitle').text(edPlan.edPlanName)
            );

    }

    //builds an email link to an ed plans creator
    self.buildEdPlanCreatedInfo = function (edPlan) {
        $('#EdPlanCreatedInfo').empty();

        $('#EdPlanCreatedInfo')
            .append(
                $('<div>').addClass('createdBy')
                    .append($('<span>').addClass('edPlanYearLabel').text('Created:'))
                    .append($('<span>').addClass('edPlanYearContent').text(edPlan.createdBy))
            )
            .append(
                $('<div>').addClass('createdOn')
                //.append( $('<span>').addClass('edPlanYearLabel').text('On:') )
                    .append($('<span>').addClass('edPlanOnContent').text(edPlan.createdDate))
            );
    }

    //builds an email link to an ed plans creator
    self.buildEdPlanUpdateInfo = function (edPlan) {

        $('#EdPlanUpdatedInfo').empty();

        $('#EdPlanUpdatedInfo')
            .append(
                $('<div>').addClass('updatedBy')
                    .append($('<span>').addClass('edPlanYearLabel').text('Updated:'))
                    .append($('<span>').addClass('edPlanYearContent').text(edPlan.updatedBy))
            )
            .append(
                $('<div>').addClass('updatedOn')
                //.append( $('<span>').addClass('edPlanYearLabel').text('On:') )
                    .append($('<span>').addClass('edPlanOnContent').text(edPlan.updatedDate))
            );
    }

    //builds years, quarters and courses associated with this ed plan
    self.buildEdPlanYears = function (edPlan) {
        $('#EdPlanYearsWrapper').empty();
        console.log('buildEdPlanYears: ' + edPlan.yearObjs.length);

        var counter = 0;

        $('#ddlMoveCourse option[value!= "0"]').remove();

        if (edPlan.yearObjs.length > 0) {


            //for each year object with a valid id, build the quarters and courses
            $(edPlan.yearObjs).each(function () {

                //add this year to the move course dropdown
                $('#ddlMoveCourse').append('<option value="' + this.yearID + '/Summer' + '">' + this.yearTitle + '  Summer' + '</option>');
                $('#ddlMoveCourse').append('<option value="' + this.yearID + '/Fall' + '">' + this.yearTitle + '  Fall' + '</option>');
                $('#ddlMoveCourse').append('<option value="' + this.yearID + '/Winter' + '">' + this.yearTitle + '  Winter' + '</option>');
                $('#ddlMoveCourse').append('<option value="' + this.yearID + '/Spring' + '">' + this.yearTitle + '  Spring' + '</option>');

                var edPlanYearMarker = this.yearID;
                console.log('edplan number: ' + edPlanYearMarker);

                var edPlanYearID = this.yearID;

                if (this.yearID != '0') {
                    console.log('building EdPlan-Year');

                    //set the year title and append the "Delete Year" link and function
                    var thisYear = '' + this.yearTitle;
                    var thisYearID = '' + this.yearID;
                    console.log(thisYear);

                    var deleteYearButton = $('<div>').attr({ 'id': this.yearID }).text('Delete Year')
                        .addClass('deleteYear  ui-btn-icon-left ui-icon-delete')
                        .on('click', function (e) {
                            console.log(edPlanYearID);
                            self.showDeleteYearPopUp(edPlanYearID);
                            return false;
                        });

                    //disable delete year button on approved plans
                    if (edPlan.approved) {
                        deleteYearButton.off().addClass('disabled');
                    }

                    //Add open/close icon and year title
                    var edPlanYear = $('<a data-edplanyear="' + this.yearID + '">')

                        .addClass('edPlanYear ' + this.yearTitle + ' ui-btn-icon-left ui-icon-carat-u')
                        .on('click', function () {
                            console.log(thisYear);
                            self.toggleEdplanYear(thisYearID);
                        })
                        .append(
                            $('<span>').text('Academic Year: ').addClass('yearTitle')
                        )
                        .append(
                            $('<span>').text(this.yearTitle)
                        )
                        .append(
                            deleteYearButton
                        );


                    //build each quarter and courses with course edit link and functionality
                    //add on click function to each course
                    var summerClasses = $('<div data-edplanyear="' + this.yearID + '">').addClass('summerClasses edPlanQuarter').attr({ 'id': 'summerClasses' + '-' + edPlanYearMarker });

                    //SUMMER QTR COURSES-------------------------------------------------->
                    if (this.summerQuarter.courseList.length >= 1) {

                        //total quarter credits saved here then displayed next to qtr title
                        var creditCountS = 0;

                        $(this.summerQuarter.courseList).each(function () {

                            var thiscourse = this;
                            var crds;

                            //if the title has credits, cast as float and add to quarter total display
                            if (thiscourse.courseTitle.indexOf('-') > 0) {
                                if (edPlan.progID == 0)
                                {
                                    var startidx = thiscourse.courseTitle.indexOf('-') + 1;
                                    var endidx = thiscourse.courseTitle.indexOf('(', startidx);
                                    crds = parseFloat($.trim(thiscourse.courseTitle.substring(startidx, endidx)));
                                } else {
                                    crds = parseFloat($.trim(thiscourse.courseTitle.split('-').pop()));
                                }

                                creditCountS += crds;
                            }

                            var courseLink = $('<a>').addClass('disabled').text(this.courseTitle)
                                .attr({ 'href': '#', 'id': this.courseID });

                            if (edPlan.approved == false) {

                                courseLink
                                    .removeClass('disabled')
                                    .on('click', function () {

                                        self.closeEdPlanPopUp();

                                        //add edit pop up title
                                        $('#editCourseTitle').text('Edit ' + ' ' + thiscourse.courseTitle);
                                        $('#editCourseTitle').data('orgCourse', thiscourse.courseTitle);

                                        //set the drop down back to default
                                        $('#ddlMoveCourse').val("0").change();




                                        //add autocomplete function to the edit textbox
                                        var tbox4 = $('#txtChangeCourseAuto');
                                        tbox4.off();
                                        tbox4.on('keyup', function () {
                                            self.callCourseAutoWebService(this);
                                        });




                                        //add mutually exclusive text boxes function
                                        $("#zero-out :input").each(function () {
                                            $(this).keydown(function () {
                                                $("#zero-out :input").not(this).val("");
                                            });
                                        });

                                        //info for edit/delete/move course functions
                                        var container = $('#editCoursePopUp');


                                        $('#hfOriginalClassID').remove();
                                        $('#hfOriginalQuarter').remove();


                                        $('<input>').attr({ 'type': 'hidden', 'id': 'hfOriginalClassID', 'value': thiscourse.courseID }).appendTo(container);
                                        $('<input>').attr({ 'type': 'hidden', 'id': 'hfOriginalQuarter', 'value': 'summer' }).appendTo(container);


                                        //ADD COURSE EDIT POP UP HERE
                                        $.magnificPopup.open({
                                            items: {
                                                src: '#editCoursePopUp',
                                                type: 'inline'
                                            },
                                            showCloseBtn: false,
                                            closeOnBgClick: true,
                                            mainClass: 'holder'
                                        });

                                    })
                            }

                            $(summerClasses)
                                .append(
                                    courseLink
                                );

                        });
                    }//end if
                    else {
                        $(summerClasses).append($('<span>').addClass('').text('No plan this quarter.'));
                    }//end else

                    //FALL QTR COURSES-------------------------------------------------->
                    var fallClasses = $('<div data-edplanyear="' + this.yearID + '">').addClass('fallClasses edPlanQuarter').attr({ 'id': 'fallClasses' + edPlanYearMarker });

                    if (this.fallQuarter.courseList.length >= 1) {

                        $(this.fallQuarter.courseList).each(function () {
                            var thiscourse = this;



                            var courseLink = $('<a>').addClass('disabled').text(this.courseTitle)
                                .attr({ 'href': '#', 'id': this.courseID });

                            if (edPlan.approved == false) {

                                courseLink
                                    .removeClass('disabled')
                                    .on('click', function () {


                                        self.closeEdPlanPopUp();

                                        //add edit pop up title
                                        $('#editCourseTitle').text('Edit ' + ' ' + thiscourse.courseTitle);
                                        $('#editCourseTitle').data('orgCourse', thiscourse.courseTitle);

                                        //set the drop down back to default
                                        $('#ddlMoveCourse').val("0").change();




                                        //add autocomplete function to the edit textbox
                                        var tbox4 = $('#txtChangeCourseAuto');
                                        tbox4.off();
                                        tbox4.on('keyup', function () {
                                            self.callCourseAutoWebService(this);
                                        });





                                        //add mutually exclusive text boxes function
                                        $("#zero-out :input").each(function () {
                                            $(this).keydown(function () {
                                                $("#zero-out :input").not(this).val("");
                                            });
                                        });

                                        //info for edit/delete/move course functions
                                        var container = $('#editCoursePopUp');



                                        $('#hfOriginalClassID').remove();
                                        $('#hfOriginalQuarter').remove();




                                        $('<input>').attr({ 'type': 'hidden', 'id': 'hfOriginalClassID', 'value': thiscourse.courseID }).appendTo(container);
                                        $('<input>').attr({ 'type': 'hidden', 'id': 'hfOriginalQuarter', 'value': 'fall' }).appendTo(container);



                                        //ADD COURSE EDIT POP UP
                                        $.magnificPopup.open({
                                            items: {
                                                src: '#editCoursePopUp',
                                                type: 'inline'
                                            },
                                            showCloseBtn: false,
                                            closeOnBgClick: true,
                                            mainClass: 'holder'
                                        });

                                    });
                            }

                            $(fallClasses)
                                .append(
                                    courseLink
                                );


                        });
                    }//end if
                    else {
                        $(fallClasses).append(
                            $('<span>').addClass('').text('No plan this quarter.')
                        );
                    }//end else

                    //WINTER QTR COURSES-------------------------------------------------->
                    var winterClasses = $('<div data-edplanyear="' + this.yearID + '">').addClass('winterClasses edPlanQuarter').attr({ 'id': 'winterClasses' + edPlanYearMarker });

                    if (this.winterQuarter.courseList.length >= 1) {

                        $(this.winterQuarter.courseList).each(function () {
                            var thiscourse = this;



                            var courseLink = $('<a>').addClass('disabled').text(this.courseTitle)
                                .attr({ 'href': '#', 'id': this.courseID });

                            if (edPlan.approved == false) {

                                courseLink
                                    .removeClass('disabled')
                                    .on('click', function () {


                                        self.closeEdPlanPopUp();



                                        //add edit pop up title
                                        $('#editCourseTitle').text('Edit ' + ' ' + thiscourse.courseTitle);
                                        $('#editCourseTitle').data('orgCourse', thiscourse.courseTitle);

                                        //set the drop down back to default
                                        $('#ddlMoveCourse').val("0").change();




                                        //add autocomplete function to the edit textbox
                                        var tbox4 = $('#txtChangeCourseAuto');
                                        tbox4.off();
                                        tbox4.on('keyup', function () {
                                            self.callCourseAutoWebService(this);
                                        });





                                        //add mutually exclusive text boxes function
                                        $("#zero-out :input").each(function () {
                                            $(this).keydown(function () {
                                                $("#zero-out :input").not(this).val("");
                                            });
                                        });

                                        //info for edit/delete/move course functions
                                        var container = $('#editCoursePopUp');



                                        $('#hfOriginalClassID').remove();
                                        $('#hfOriginalQuarter').remove();




                                        $('<input>').attr({ 'type': 'hidden', 'id': 'hfOriginalClassID', 'value': thiscourse.courseID }).appendTo(container);
                                        $('<input>').attr({ 'type': 'hidden', 'id': 'hfOriginalQuarter', 'value': 'winter' }).appendTo(container);

                                        //ADD COURSE EDIT POP UP
                                        $.magnificPopup.open({
                                            items: {
                                                src: '#editCoursePopUp',
                                                type: 'inline'
                                            },
                                            showCloseBtn: false,
                                            closeOnBgClick: true,
                                            mainClass: 'holder'
                                        });

                                    })

                            }

                            $(winterClasses)
                                .append(
                                    courseLink
                                );
                        });


                    }//end if
                    else {
                        $(winterClasses).append($('<span>').addClass('').text('No plan this quarter.'));
                    }//end else

                    //SPRING QTR COURSES-------------------------------------------------->
                    var springClasses = $('<div data-edplanyear="' + this.yearID + '">').addClass('springClasses edPlanQuarter').attr({ 'id': 'springClasses' + edPlanYearMarker });

                    if (this.springQuarter.courseList.length >= 1) {

                        $(this.springQuarter.courseList).each(function () {
                            var thiscourse = this;



                            var courseLink = $('<a>').addClass('disabled').text(this.courseTitle)
                                .attr({ 'href': '#', 'id': this.courseID });

                            if (edPlan.approved == false) {

                                courseLink
                                    .removeClass('disabled')
                                    .on('click', function () {


                                        self.closeEdPlanPopUp();


                                        //add edit pop up title
                                        $('#editCourseTitle').text('Edit ' + ' ' + thiscourse.courseTitle);
                                        $('#editCourseTitle').data('orgCourse', thiscourse.courseTitle);

                                        //set the drop down back to default
                                        $('#ddlMoveCourse').val("0").change();




                                        //add autocomplete function to the edit textbox
                                        var tbox4 = $('#txtChangeCourseAuto');
                                        tbox4.off();
                                        tbox4.on('keyup', function () {
                                            self.callCourseAutoWebService(this);
                                        });





                                        //add mutually exclusive text boxes function
                                        $("#zero-out :input").each(function () {
                                            $(this).keydown(function () {
                                                $("#zero-out :input").not(this).val("");
                                            });
                                        });

                                        //info for edit/delete/move course functions
                                        var container = $('#editCoursePopUp');



                                        $('#hfOriginalClassID').remove();
                                        $('#hfOriginalQuarter').remove();


                                        $('<input>').attr({ 'type': 'hidden', 'id': 'hfOriginalClassID', 'value': thiscourse.courseID }).appendTo(container);
                                        $('<input>').attr({ 'type': 'hidden', 'id': 'hfOriginalQuarter', 'value': 'spring' }).appendTo(container);

                                        //ADD COURSE EDIT POP UP
                                        $.magnificPopup.open({
                                            items: {
                                                src: '#editCoursePopUp',
                                                type: 'inline'
                                            },
                                            showCloseBtn: false,
                                            closeOnBgClick: true,
                                            mainClass: 'holder'
                                        });

                                    })
                            }

                            $(springClasses)
                                .append(
                                    courseLink
                                );
                        });
                    }//end if
                    else {
                        $(springClasses).append(
                            $('<span>').addClass('').text('No plan this quarter.')
                        );
                    }//end else












                    //create containers to hold quarters.  this is used for mobile display
                    //add "Add Course" link and function to quarter title
                    var edPlanContainer1 = $('<span data-edplanyear="' + this.yearID + '">').addClass('edPlanQuarterContainer ' + this.yearTitle);

                    //SUMMER QTR TITLE-------------------------------------------------------------------------------------------->
                    var edPlanHeader1 = $('<div>').text('Summer').addClass('btnAddCoursePopUp ui-btn-icon-left ui-icon-plus').on('click', function () {

                        self.closeEdPlanPopUp();

                        //create and add dynamic pop up title and hidden fields with year row and quarter id
                        var popUpTitle = $('#addCourseTitle');
                        popUpTitle.text('Add up to three courses and a note to Summer Quarter ' + thisYear);
                        popUpTitle.data('qtr', 'Summer');



                        $('#hfOriginalYearRowID').remove();
                        var hiddenYrID = $('<input id="hfOriginalYearRowID" type="hidden" data-year="' + edPlanYearMarker + '" ></input>').appendTo($('#addCourseTitle'));





                        //show popup
                        $.magnificPopup.open({
                            items: {
                                src: '#addCoursePopUp',
                                type: 'inline'
                            },
                            showCloseBtn: false,
                            closeOnBgClick: true,
                            mainClass: 'holder'
                        });
                    });






                    //FALL QTR TITLE-------------------------------------------------------------------------------------------->
                    var edPlanHeader2 = $('<div>').text('Fall').addClass('btnAddCoursePopUp ui-btn-icon-left ui-icon-plus').on('click', function () {

                        self.closeEdPlanPopUp();

                        //create and add dynamic pop up title and hidden fields with year row and quarter id
                        var popUpTitle = $('#addCourseTitle');
                        popUpTitle.text('Add up to three courses and a note to Fall Quarter ' + thisYear);
                        popUpTitle.data('qtr', 'Fall');

                        //add year row id to add class pop up
                        $('#hfOriginalYearRowID').remove();
                        var hiddenYrID = $('<input id="hfOriginalYearRowID" type="hidden" data-year="' + edPlanYearMarker + '" ></input>').appendTo(popUpTitle);


                        //show popup
                        $.magnificPopup.open({
                            items: {
                                src: '#addCoursePopUp',
                                type: 'inline'
                            },
                            showCloseBtn: false,
                            closeOnBgClick: true,
                            mainClass: 'holder'
                        });

                    });


                    //console.log(edPlanYearMarker);
                    console.log(this.yearID);


                    $(edPlanContainer1)
                        .append(edPlanHeader1)
                        .append(edPlanHeader2)
                        .append(summerClasses)
                        .append(fallClasses);


                    var edPlanContainer2 = $('<span data-edplanyear="' + this.yearID + '">').addClass('edPlanQuarterContainer ' + this.yearTitle);

                    //WINTER QTR TITLE-------------------------------------------------------------------------------------------->
                    var edPlanHeader3 = $('<div>').text('Winter').addClass('btnAddCoursePopUp ui-btn-icon-left ui-icon-plus').on('click', function () {

                        self.closeEdPlanPopUp();

                        //create and add dynamic pop up title and hidden fields with year row and quarter id
                        var popUpTitle = $('#addCourseTitle');
                        popUpTitle.text('Add up to three courses and a note to Winter Quarter ' + thisYear);
                        popUpTitle.data('qtr', 'Winter');

                        //add year row id to add class pop up
                        $('#hfOriginalYearRowID').remove();
                        var hiddenYrID = $('<input id="hfOriginalYearRowID" type="hidden" data-year="' + edPlanYearMarker + '" ></input>').appendTo(popUpTitle);


                        //show popup
                        $.magnificPopup.open({
                            items: {
                                src: '#addCoursePopUp',
                                type: 'inline'
                            },
                            showCloseBtn: false,
                            closeOnBgClick: true,
                            mainClass: 'holder'
                        });
                    });

                    //console.log(edPlanYearMarker);
                    //console.log(this.yearID);


                    //SPRING QTR TITLE-------------------------------------------------------------------------------------------->
                    var edPlanHeader4 = $('<div>').text('Spring').addClass('btnAddCoursePopUp ui-btn-icon-left ui-icon-plus').on('click', function () {

                        self.closeEdPlanPopUp();

                        //create and add dynamic pop up title and hidden fields with year row and quarter id
                        var popUpTitle = $('#addCourseTitle');
                        popUpTitle.text('Add up to three courses and a note to Spring Quarter ' + thisYear);
                        popUpTitle.data('qtr', 'Spring');

                        //add year row id to add class pop up
                        $('#hfOriginalYearRowID').remove();
                        var hiddenYrID = $('<input id="hfOriginalYearRowID" type="hidden" data-year="' + edPlanYearMarker + '" ></input>').appendTo(popUpTitle);



                        //show popup
                        $.magnificPopup.open({
                            items: {

                                src: '#addCoursePopUp',
                                type: 'inline'
                            },
                            showCloseBtn: false,
                            closeOnBgClick: true,
                            mainClass: 'holder'
                        });
                    });





                    //console.log(edPlanYearMarker);
                    //console.log(this.yearID);


                    $(edPlanContainer2)
                        .append(edPlanHeader3)
                        .append(edPlanHeader4)
                        .append(winterClasses)
                        .append(springClasses);

                    //add year and quarters to year container
                    $('#EdPlanYearsWrapper')

                        .append(
                            $('<div data-edplanyear="' + this.yearID + '">').addClass('edPlanYearHolder')
                                .append(
                                    edPlanYear
                                ).append(
                                edPlanContainer1
                            ).append(
                                edPlanContainer2
                            )
                        );

                    if (isMobile() && counter >= 1) {
                        console.log(this.yearID);
                        //edPlanContainer1.addClass('displayNone');
                        //edPlanContainer2.addClass('displayNone');
                    }
                    counter++;

                    if (edPlan.approved) {
                        $(edPlanHeader1).addClass('disabled').off();
                        $(edPlanHeader2).addClass('disabled').off();
                        $(edPlanHeader3).addClass('disabled').off();
                        $(edPlanHeader4).addClass('disabled').off();
                    } else {

                    }




                }//end if yearid != 0





            });//end yearobj for each




            //add on focus to auto complete text boxes
            //var tbox1 = $('#txtDisciplinesAuto');
            //var tbox2 = $('#txtDisciplinesAutoTwo');
            //var tbox3 = $('#txtDisciplinesAutoThree');

            $('#txtDisciplinesAuto').off();
            $('#txtDisciplinesAutoTwo').off();
            $('#txtDisciplinesAutoThree').off();

            $('#txtDisciplinesAuto').on('keyup', function () {
                self.callCourseAutoWebService(this);
            });

            $('#txtDisciplinesAutoTwo').on('keyup', function () {
                self.callCourseAutoWebService(this);
            });

            $('#txtDisciplinesAutoThree').on('keyup', function () {
                self.callCourseAutoWebService(this);
            });




            $('#txtDisciplinesAuto').on('click', function () {
                $('#courseListResultsHolder').hide();
            });

            $('#txtDisciplinesAutoTwo').on('click', function () {
                $('#courseListResultsHolder').hide();
            });

            $('#txtDisciplinesAutoThree').on('click', function () {
                $('#courseListResultsHolder').hide();
            });

            $('#txtAddMisc').on('click', function () {
                $('#courseListResultsHolder').hide();
            });




        }//end if yearobj > 0



        else {
            $('#EdPlanYearsWrapper').append('This Education Plan is currently empty.');
        }//end else

    }//end build ed plan years function

    //build comments associated with this ed plan
    //if user is the submitter of a comment, they are allowed to edit it
    self.buildEdPlanComments = function (edPlan) {
        console.log('buildEdPlanComments');

        var commentPlaceHolder = 'Use this space to write a comment to your advisor about your plan and your advisor can use this space to respond to you. All comments entered will list below.';

        var commentBuilder = $('<textarea>')
            .addClass('edPlanCommentBuilder')
            .attr({ 'placeholder': commentPlaceHolder });


        var addCommentSubmit = $('<span>')
            .addClass('addComment')
            .text('Add Comment')
            .on('click', function () {
                var commentText = $('.edPlanCommentBuilder').val();


                if (commentText != '') {
                    console.log(commentText);
                    self.addEdPlanComment(edPlan, commentText);
                }
            });




        $('#EdPlanCommentsContent').empty();

        var col1 = $('<span>').addClass('edPlanCommentDate');
        var col2 = $('<span>').addClass('edPlanCommentSubmitter');
        var col3 = $('<span>').addClass('edPlanComment');

        $('#EdPlanCommentsContent')
            .append(
                $('<div>').addClass('edPlanCommentTitle ui-btn-icon-left ui-icon-carat-u')
                    .text('Ed Plan Comments:')
                    .on('click', function () {
                        self.toggleEdPlanComments();
                    })
            )
            .append(
                $('<div>').addClass('edPlanCommentHolder edPlanCommentHeader')
                    .append($(col1).text('Last Updated'))
                    .append($(col2).text('Submitter'))
                    .append($(col3).text('Comment'))
            );

        $(edPlan.commentObjs).each(function () {
            console.log('comment found');
            console.log(this);
            var thisEp = this;

            col1 = $('<span data-commentID="' + thisEp.commentID + '">').addClass('edPlanCommentDate');
            col2 = $('<span data-commentID="' + thisEp.commentID + '">').addClass('edPlanCommentSubmitter');
            col3 = $('<span data-commentID="' + thisEp.commentID + '">').addClass('edPlanComment');

            var edPlanCommentEditButton = $('<span>').text('Edit').addClass('editEdPlanComment').on('click', function () {

                console.log('edit comment: ' + thisEp.commentID + ' :: ' + thisEp.Comment);
                var commentText = thisEp.Comment;
                self.showEditEdPlanCommentPopUp(thisEp.commentID, commentText);
            });

            var edPlanCommentDeleteButton = $('<span>').text('Delete').addClass('deleteEdPlanComment').on('click', function () {
                console.log('delete comment: ' + thisEp.commentID);
                //deleteEdPlanComment(thisEp.commentID);
                self.showDeleteEdPlanCommentPopUp(thisEp.commentID);

            });






            console.log(thisEp.allowEdit);
            if (thisEp.allowEdit == false) {
                edPlanCommentEditButton.off().addClass('disabled');
                edPlanCommentDeleteButton.off().addClass('disabled');
            }



            var edPlanCommentHolder = $('<div data-commentID="' + thisEp.commentID + '">').addClass('edPlanCommentHolder');

            $('#EdPlanCommentsContent')
                .append(
                    edPlanCommentHolder
                        .append($(col1).text(this.lastUpdated))
                        .append($(col2).text(this.Submitter))
                        .append($(col3).text(this.Comment))
                );


            if (thisEp.allowEdit) {
                edPlanCommentHolder
                    .append(
                        $('<span>').addClass('edPlanCommentButtons')
                            .append(edPlanCommentEditButton)
                            .append(edPlanCommentDeleteButton)
                    );
            }

        });


        $('#EdPlanCommentsContent').append(

            $('<div>').addClass('edPlanCommentHolder')
                .append($('<div>').addClass('edPlanLabel').text('Add Ed Plan Comments:'))
                .append(commentBuilder)
                .append(addCommentSubmit)

        );

    }

    //get and display a specific ed plan
    self.getEdPlanByID = function(epId) {
        console.log('getEdPlanByID');
        $.mobile.loading('show');
        var parameters = new Object();
        parameters.epId = epId;

        $.ajax({
            type: 'POST',
            async: true,
            contentType: 'application/json; charset=utf-8',
            url: portalRef + 'WebServices/EdPlanService.asmx/GetEdPlanByID',
            data: JSON.stringify(parameters),
            dataType: 'json',
            success: function (rValue) {
                var userContext = rValue.d;
                //success shows successful authentication in this case
                if (userContext.ServiceStatus.IsSuccess) {

                    self.buildEdPlanDeskTop(userContext.Context);


                }
                $.mobile.loading('hide');
            },
            fail: function (rValue) {
                var stopHere = '';
            }
        });
    }



    //Ed Plan edit/delete functions///////////////////////////////////////////////////////
    //get name of new ed plan
    //create new ed plan with name and return new epID
    //build ed plan with epID
    self.getNewEdPlan = function() {
        //add check for blank entry on front
        console.log('getNewEdPlan');

        $('#myEdPlanTab').html('');
        $.mobile.loading('show');

        var parameters = new Object();
        var nameTxb = $('#txbNewEdPlanName');
        var name = nameTxb.val();
        //alert(name);
        parameters.planName = name;

        //Google Anaylytics event log tag
        ga('send', 'event', 'New Ed Plan', name);

        $.ajax({
            type: 'POST',
            async: true,
            contentType: 'application/json; charset=utf-8',
            url: portalRef + 'WebServices/EdPlanService.asmx/GetNewEdPlan',
            data: JSON.stringify(parameters),
            dataType: 'json',
            success: function (rValue) {
                var newEpID = rValue.d;

                //re-initiate selecter with new ed plan selected
                //getEdPlanByID is called there

                self.getEdPlanSelectorData(newEpID);

                $.mobile.loading('hide');

                //clear any name txboxes and close the pop up
                var txb = $('#txbNewEdPlanName');
                txb.empty();
                var txb2 = $('#txbCopyEdPlanName');
                txb2.empty();
                //$.magnificPopup.close();
                self.closeEdPlanPopUp();
            },
            fail: function (rValue) {
                var stop = '';
            }
        });


    }

    //copy this ed plan to new
    self.copyEdPlan = function() {
        //check for blank name entry

        console.log('copyEdPlan');
        $.mobile.loading('show');

        var parameters = new Object();
        var ddl = $('#DdlEdPlans');
        var oldEpID = ddl.val();
        var newName = $('#txbCopyEdPlanName').val();


        parameters.oldID = oldEpID;
        parameters.name = newName;
        $.ajax({
            type: 'POST',
            async: true,
            contentType: 'application/json; charset=utf-8',
            url: portalRef + 'WebServices/EdPlanService.asmx/copyEdPlan',
            data: JSON.stringify(parameters),
            dataType: 'json',
            success: function (rValue) {
                var newEpID = rValue.d;

                //re-initiate selecter with new ed plan selected
                //getEdPlanByID is called there
                self.getEdPlanSelectorData(newEpID);

                $.mobile.loading('hide');

                //clear any name txboxes and close the pop up
                var txb = $('#txbNewEdPlanName');
                txb.empty();
                var txb2 = $('#txbCopyEdPlanName');
                txb2.empty();
                //$.magnificPopup.close();
                self.closeEdPlanPopUp();
            },

            fail: function (rValue) {
                var stop = '';
            }
        });

        //clear text box
        $('#txbCopyEdPlanName').val('');
    }

    //delete ed plan including years, courses and comments
    self.deleteEdPlan = function() {
        console.log('delete ed plan by id');
        $.mobile.loading('show');

        var parameters = new Object();
        var ddl = $('#DdlEdPlans');
        var epID1 = ddl.val();

        parameters.epid = epID1;

        //alert(parameters.epid);

        $.ajax({
            type: 'POST',
            async: true,
            contentType: 'application/json; charset=utf-8',
            url: portalRef + 'WebServices/EdPlanService.asmx/deleteEdPlanByID',
            data: JSON.stringify(parameters),
            dataType: 'json',
            success: function (rValue) {
                //show success message
                var result = rValue;
                var noShowNeeded;

                //re-initiate selecter with new ed plan selected
                //getEdPlanByID is called there
                self.getEdPlanSelectorData(noShowNeeded);
                var stop = '';
                $.mobile.loading('hide');
                //$.magnificPopup.close();
                self.closeEdPlanPopUp();
            },
            fail: function (rValue) {
                //show failure message
                var result = rValue;
                $.mobile.loading('hide');
            }
        });
    }

    //set an ed plan as default
    self.setEdPlanAsDefault = function() {
        console.log('setEdPlanAsDefault');
        $.mobile.loading('show');

        var edPlanID = $('#DdlEdPlans').val();
        var parameters = new Object();

        parameters.edPlanID = edPlanID;
        $.ajax({
            type: 'POST',
            async: true,
            contentType: 'application/json; charset=utf-8',
            url: portalRef + 'WebServices/EdPlanService.asmx/setDefaultEdPlan',
            data: JSON.stringify(parameters),
            dataType: 'json',
            success: function (rValue) {
                //rebuild ed plan
                $.mobile.loading('hide');

                $('#primaryEdPlanMarker').remove();
                $('#primaryEdPlanMarkerLabel').text('This is your Primary Ed Plan');

            },
            fail: function () {

                $.mobile.loading('hide');
                //$.magnificPopup.close();
                self.closeEdPlanPopUp();
            }
        });


    }
    //Ed Plan edit/delete functions///////////////////////////////////////////////////////



    //Year edit/delete functions/////////////////////////////////////////////////////////

    //build a list of years for a user to choose from on add year main navigation click
    //List is based on current academic year and provides five previous and five future
    //show pop up for user to choose year
    self.addYear = function () {

        console.log('get academic year list');
        $.mobile.loading('show');

        var parameters = new Object();
        parameters.epID = $('#DdlEdPlans').val();

        $.ajax({
            type: 'POST',
            async: true,
            contentType: 'application/json; charset=utf-8',
            url: portalRef + 'WebServices/EdPlanService.asmx/getAcademicYears',
            data: JSON.stringify(parameters),
            dataType: 'json',
            success: function (rValue) {

                //yearList is now a kvp list of Boolean,String
                //Boolean is true if year is already in the ed plan, otherwise false
                //String is the title of the year
                var yearList = rValue.d;

                if (yearList != null) {
                    //create and append the year select
                    //$('<label>').attr({ 'for': 'ddlAddYear' }).text('Choose a year:').appendTo($('#addYearContent'));


                    //$('#ddlAddYear').remove();
                    $('#addYearContent').empty();

                    $('<select>').attr({ 'id': 'ddlAddYear' }).appendTo($('#addYearContent')).selectmenu().selectmenu('refresh');



                    $('<div>')
                    //.attr({ 'id': "btnAddYear" })
                        .text('Cancel')
                        .addClass('cancel').on('click', function () {
                        //Html.hidePopUp();
                        self.closeEdPlanPopUp();
                    })
                        .appendTo($('#addYearContent'));

                    $('<div>')
                        .attr({ 'id': "btnAddYear" })
                        .text('Add Year')
                        .addClass('submit').on('click', function () { self.addThisYearToEdPlan(); })
                        .appendTo($('#addYearContent'));

                    self.initEdPlanYearSelector(yearList);

                    $.mobile.loading('hide');

                }

            },
            fail: function (rValue) {
                //show failure message
                var result = rValue;
                alert(result);
                var stopf = '';
                $.mobile.loading('hide');
            }
        });
    }

    //builds a dropdown of years to choose from when adding a year to an ed plan
    //if the year is already in the ed plan, it will be labeled and disabled for selection
    self.initEdPlanYearSelector = function (yearList) {
        console.log('initEdPlanYearSelector');
        var container = $('#ddlAddYear')

        container.empty();

        //default selection
        $('#ddlAddYear').append($('<option>')
            .val('0')
            .html('Choose an Academic Year')
            .prop('selected', true));


        $.each(yearList, function () {
            console.log(this);
            var itm = this;

            //if key is false then year is active
            //if key is true, then the year is already in ed plan and should be inactive
            if (itm.Key) {
                container
                    .append(
                        $('<option disabled="true">')
                            .val(itm.Value)
                            .html(itm.Value + ' year in Ed Plan')
                    );
            } else {
                container
                    .append(
                        $('<option>')
                            .val(itm.Value)
                            .html(itm.Value)
                    );
            }



        });
        $('#ddlAddYear').selectmenu().selectmenu("refresh");

    }

    //add selected year to ed plan
    self.addThisYearToEdPlan = function () {
        console.log('add this year to ed plan');
        $.mobile.loading('show');

        var parameters = new Object();
        var ddl = $('#DdlEdPlans');
        var epID = ddl.val();
        var yddl = $('#ddlAddYear');
        var year = yddl.val();


        parameters.epID = epID
        parameters.year = year

        $.ajax({
            type: 'POST',
            async: true,
            contentType: 'application/json; charset=utf-8',
            url: portalRef + 'WebServices/EdPlanService.asmx/addThisYear',
            data: JSON.stringify(parameters),
            dataType: 'json',
            success: function (rValue) {
                var addedYear = rValue.d;

                if (addedYear) {
                    //rebuild ed plan
                    $.mobile.loading('hide');

                    //$.magnificPopup.close();
                    self.closeEdPlanPopUp();
                    var show = epID
                    self.getEdPlanByID(show)
                }
                else {
                    //show error message
                    $.mobile.loading('hide');
                    //$.magnificPopup.close();
                    self.closeEdPlanPopUp();
                }

            },
            fail: function () {

                $.mobile.loading('hide');
                //$.magnificPopup.close();
                self.closeEdPlanPopUp();
            }
        });
    }

    self.showDeleteYearPopUp = function (yearID) {
        console.log('delete year click: ' + yearID);

        $('#btnDeleteEdPlanYear').remove();

        var deleteYearButton = $('<div>').attr({ 'id': 'btnDeleteEdPlanYear' })
            .addClass('submit')
            .on('click', function () {
                self.deleteYear(yearID)
                //Html.hidePopUp();
                self.closeEdPlanPopUp();
            })
            .text('Delete');

        $('#edPlanDeleteYearContent').append(deleteYearButton);

        $.magnificPopup.open({
            items: {
                src: '#deleteEdPlanYear',
                type: 'inline'
            },
            showCloseBtn: false,
            closeOnBgClick: true,
            mainClass: 'holder'
        });
    }

    self.deleteYear = function (buttonID) {

        console.log('delete year: ' + buttonID);

        $.mobile.loading('show');

        var yearID = buttonID;
        var parameters = new Object();
        parameters.yid = yearID;

        $.ajax({
            type: 'POST',
            async: true,
            contentType: 'application/json; charset=utf-8',
            url: portalRef + 'WebServices/EdPlanService.asmx/deleteThisYear',
            data: JSON.stringify(parameters),
            dataType: 'json',
            success: function (rValue) {
                var yeardeleted = rValue.d

                if (yeardeleted) {
                    //console.log('searching');
                    $.each($('#EdPlanYearsWrapper .edPlanYearHolder'), function () {
                        //console.log('found one');
                        if ($(this).data('edplanyear') == yearID) {
                            //console.log('found it');
                            $(this).slideUp();
                        }
                    });

                    $.each($('#ddlMoveCourse option'), function () {
                        var str = $(this).val().split('/');
                        if (str[0] == yearID) { $(this).remove(); }
                    });


                } else {
                    var ddl = $('#DdlEdPlans');
                    var show = ddl.val();
                    self.getEdPlanByID(show);
                }

                $.mobile.loading('hide');

            },
            fail: function (rValue) {
                //show failure message
                $.mobile.loading('hide');
            }
        });
        $('#ddlMoveCourse')
    }

    self.toggleEdplanYear = function (trigger) {
        $('.loginWrapper').removeClass('activeNav');

        console.log(trigger)

        $.each($('.edPlanQuarterContainer'), function () {
            //console.log('yearID: ' + $(this).data('edplanyear'));

            if ($(this).data('edplanyear') == trigger) {
                //console.log('match');

                if ($(this).hasClass('displayNone')) {
                    $(this).removeClass('displayNone');
                } else {
                    $(this).addClass('displayNone');
                }
            }

        });

        $.each($('.edPlanYear'), function () {
            //console.log('yearID: ' + $(this).data('edplanyear'));

            if ($(this).data('edplanyear') == trigger) {
                //console.log('match: ' + $(this).data('edplanyear'));

                if ($(this).hasClass('ui-icon-carat-d')) {
                    $(this).removeClass('ui-icon-carat-d');
                    $(this).addClass('ui-icon-carat-u');
                } else {
                    $(this).addClass('ui-icon-carat-d');
                    $(this).removeClass('ui-icon-carat-u');

                }
            }

        });

    }
    //Year edit/delete functions////////////////////////////////////////////////////////




    //Course edit/delete functions/////////////////////////////////////////////////////

    //grab what was typed in the add course text box and send it to be stringified
    //col code is hard coded per college file
    self.callCourseAutoWebService = function(sender) {

        console.log('get what was typed and stringify');
        $.mobile.loading('show');

        var parameters = new Object();
        parameters.prefixText = $(sender).val();
        parameters.count = 12;
        parameters.col = myCampus.CampusCode;

        var senderid = sender.id;

        //call service, if successful build ul list items
        if (sender.value.length > 0) {
            $.ajax({
                type: 'POST',
                async: true,
                contentType: 'application/json; charset=utf-8',
                url: 'WebServices/EdPlanService.asmx/retrieveAutoCourseList',
                data: JSON.stringify(parameters),
                dataType: 'json',
                success: function (rValue) {

                    var courseListResults = $('#courseListResults')[0];

                    var listResults = rValue.d;

                    $('#courseListResults').empty();
                    $('#courseListResultsHolder').hide();

                    $.each(listResults, function () {
                        var listResult = this;
                        var li = document.createElement('li');
                        li.innerHTML = listResult;
                        courseListResults.appendChild(li);

                        $(li).on('click', function () {
                            var senderli = this;
                            $(sender).val(unescape($(senderli).text()));
                            $('#courseListResults').empty();
                            $('#courseListResultsHolder').hide();
                        });
                    });



                    //show list
                    $('#courseListResultsHolder').show();

                }//end success function

            });
        } else {
            $('#courseListResults').empty();
            $('#courseListResultsHolder').hide();
        }

        $.mobile.loading('hide');
    }

    //edit a selected course
    //will either update a course value, or update a courses quarter location
    self.editThisCourse = function() {
        console.log("editThisCourse");
        $.mobile.loading('show');

        //save epID for rebuilding ed plan after add
        var strs = $('#ddlMoveCourse').val().split('/');

        var show = $('#DdlEdPlans').val();
        var originalClassID = $('#hfOriginalClassID').val();
        var originalQuarter = $('#hfOriginalQuarter').val();
        var newYearRowID = strs[0];
        var newClass = '';
        var newQuarter = strs[1];

        if ($('#txtChangeCourseAuto').val() != '') {
            newClass = $('#txtChangeCourseAuto').val();
        }
        else if ($('#txtChangeCourseToNote').val() != '') {
            newClass = $('#txtChangeCourseToNote').val();
        }


        //if there is a new class run the update class
        //after the class is updated, check for quarter move
        //if there is a new selected quarter, run the move
        if (newClass != '') {

            console.log("update course");
            parameters = new Object();
            parameters.originalClassID = originalClassID;
            parameters.originalQuarter = originalQuarter;
            parameters.newClass = newClass;

            $.ajax({
                type: 'POST',
                async: true,
                contentType: 'application/json; charset=utf-8',
                url: portalRef + 'WebServices/EdPlanService.asmx/updateThisCourse',
                data: JSON.stringify(parameters),
                dataType: 'json',
                success: function (rValue) {
                    $.mobile.loading('hide');
                    var courseUpdated = rValue.d;
                    //only rebuild ed plan after course move check
                },
                fail: function () {

                    $.mobile.loading('hide');
                    //$.magnificPopup.close();
                    self.closeEdPlanPopUp();
                }
            });

        }//end new course check


        console.log('check for course move');


        if ($('#ddlMoveCourse').val() != 0) {

            $.mobile.loading('show');

            parameters = new Object()
            parameters.originalClassID = originalClassID;
            parameters.originalQuarter = originalQuarter;
            parameters.newQuarter = newQuarter;
            parameters.newYearRowID = newYearRowID;
            if (newClass == '') {
                newClass = $('#editCourseTitle').data('orgCourse');
            }
            parameters.newClass = newClass;
            parameters.toolTip = '';

            $.ajax({
                type: 'POST',
                async: true,
                contentType: 'application/json; charset=utf-8',
                url: portalRef + 'WebServices/EdPlanService.asmx/moveThisCourse',
                data: JSON.stringify(parameters),
                dataType: 'json',
                success: function (rValue) {
                    var courseUpdated = rValue.d;
                    $.mobile.loading('hide');
                    $.magnificPopup.close();
                    //only rebuild ed plan after course move check
                },
                fail: function () {

                    $.mobile.loading('hide');
                    $.magnificPopup.close();
                }
            });

        }

        //clear edit controls
        $('#txtChangeCourseAuto').val('');
        $('#txtChangeCourseToNote').val('');
        $('#ddlMoveCourse option[value!= "0"]').remove();
        //$.magnificPopup.close();
        self.closeEdPlanPopUp();

        self.getEdPlanByID(show);
    }

    //delete a course from an ed plan quarter
    self.deleteThisCourse = function() {

        console.log('deleteThisCourse');

        $.mobile.loading('show');

        var show = $('#DdlEdPlans').val();

        var parameters = new Object();
        parameters.originalClassID = $('#hfOriginalClassID').val();
        parameters.originalQuarter = $('#hfOriginalQuarter').val();

        $.ajax({
            type: 'POST',
            async: true,
            contentType: 'application/json; charset=utf-8',
            url: portalRef + 'WebServices/EdPlanService.asmx/deleteThisCourse',
            data: JSON.stringify(parameters),
            dataType: 'json',
            success: function (rValue) {
                //rebuild ed plan
                self.getEdPlanByID(show);

                $.mobile.loading('hide');
                //$.magnificPopup.close();
                self.closeEdPlanPopUp();
            },
            fail: function () {

                $.mobile.loading('hide');
                $.magnificPopup.close();
            }
        });
    }

    //add selected course to quarter
    self.addThisCourseToQuarter = function() {
        console.log('addThisCourseToQuarter');

        $.mobile.loading('show');

        //save epID for rebuilding ed plan after add
        var show = $('#DdlEdPlans').val();

        //get selected values and save to an array
        var coursestoadd = new Array();

        //if a textbox has been filled with a value, create a param and add to array
        if (!$('#txtDisciplinesAuto').val() == '') {
            var courseParam = new CourseToAdd();
            courseParam.quarterTitle = $('#addCourseTitle').data('qtr');
            courseParam.yearRowID = $('#hfOriginalYearRowID').data('year');
            courseParam.courseText = $('#txtDisciplinesAuto').val();
            coursestoadd.push(courseParam);
        }
        if (!$('#txtDisciplinesAutoTwo').val() == '') {
            var courseParam = new CourseToAdd();
            courseParam.quarterTitle = $('#addCourseTitle').data('qtr');
            courseParam.yearRowID = $('#hfOriginalYearRowID').data('year');
            courseParam.courseText = $('#txtDisciplinesAutoTwo').val();
            coursestoadd.push(courseParam);
        }
        if (!$('#txtDisciplinesAutoThree').val() == '') {
            var courseParam = new CourseToAdd();
            courseParam.quarterTitle = $('#addCourseTitle').data('qtr');
            courseParam.yearRowID = $('#hfOriginalYearRowID').data('year');
            courseParam.courseText = $('#txtDisciplinesAutoThree').val();
            coursestoadd.push(courseParam);
        }
        if (!$('#txtAddMisc').val() == '') {
            var courseParam = new CourseToAdd();
            courseParam.quarterTitle = $('#addCourseTitle').data('qtr');
            courseParam.yearRowID = $('#hfOriginalYearRowID').data('year');
            courseParam.courseText = $('#txtAddMisc').val();
            coursestoadd.push(courseParam);
        }

        function CourseToAdd() {
            var self = this;
            self.quarterTitle;
            self.yearRowID;
            self.courseText;
        }

        //stringify the array before saving it to the parameters object
        var param = JSON.stringify(coursestoadd);

        var parameters = new Object();
        parameters.coursestoadd = coursestoadd;

        $.ajax({
            type: 'POST',
            async: true,
            contentType: 'application/json; charset=utf-8',
            url: portalRef + 'WebServices/EdPlanService.asmx/addThisCourse',
            data: JSON.stringify(parameters),
            dataType: 'json',
            success: function (rValue) {
                var addedCourse = rValue.d;
                //rebuild ed plan
                self.getEdPlanByID(show);

            },
            fail: function () {

                $.mobile.loading('hide');
                //$.magnificPopup.close();
                self.closeEdPlanPopUp();
            }
        });


        //clear textboxes
        $('#txtDisciplinesAuto').val('');
        $('#txtDisciplinesAutoTwo').val('');
        $('#txtDisciplinesAutoThree').val('');
        $('#txtAddMisc').val('');

        $("#courseListResults").empty();
        $.mobile.loading('hide');
        //$.magnificPopup.close();
        self.closeEdPlanPopUp();



    }
    //Course edit/delete functions/////////////////////////////////////////////////////



    //Comment edit/delete functions////////////////////////////////////////////////////
    self.deleteEdPlanComment = function (commentID) {
        console.log('deleteEdPlanComment: ' + commentID);

        $.mobile.loading('show');
        var parameters = new Object();
        parameters.commentID = commentID;


        //Html.hidePopUp();
        self.closeEdPlanPopUp();

        $.ajax({
            type: 'POST',
            async: true,
            contentType: 'application/json; charset=utf-8',
            url: portalRef + 'WebServices/EdPlanService.asmx/deleteThisComment',
            data: JSON.stringify(parameters),
            dataType: 'json',
            success: function (rValue) {
                var userContext = rValue.d;

                $.each($('.edPlanCommentHolder'), function () {
                    if ($(this).data('commentid') == commentID) {
                        console.log('found it');

                        $(this).slideUp('slow', function () {
                            $(this).remove();
                        });

                    }
                });

                $.mobile.loading('hide');

            },
            fail: function (rValue) {
                var stopHere = '';
            }
        });


    }

    self.editEdPlanComment = function (newText, commentID) {

        console.log('editEdPlanComment: ' + commentID + ' : ' + newText);
        var edPlanID = $('#DdlEdPlans').val();

        $.mobile.loading('show');
        var parameters = new Object();
        parameters.newText = newText;
        parameters.commentID = commentID;


        $.ajax({
            type: 'POST',
            async: true,
            contentType: 'application/json; charset=utf-8',
            url: portalRef + 'WebServices/EdPlanService.asmx/editThisComment',
            data: JSON.stringify(parameters),
            dataType: 'json',
            success: function (rValue) {
                var userContext = rValue.d;

                $.mobile.loading('hide');
                //Html.hidePopUp();
                self.closeEdPlanPopUp();

                $.each($('.edPlanComment'), function () {
                    //console.log($(this).data('commentid'));

                    if ($(this).data('commentid') == commentID) {
                        //console.log('found it');
                        $(this).text(newText);
                    }
                });


            },
            fail: function (rValue) {
                var stopHere = '';
            }
        });


    }

    self.addEdPlanComment = function (edPlan, commentText) {
        console.log('addEdPlanComment');


        $.mobile.loading('show');
        var parameters = new Object();
        parameters.edPlanID = edPlan.edPlanID;
        parameters.commentText = $('.edPlanCommentBuilder').val();
        console.log($('.edPlanCommentBuilder').val());

        $.ajax({
            type: 'POST',
            async: true,
            contentType: 'application/json; charset=utf-8',
            url: portalRef + 'WebServices/EdPlanService.asmx/addThisComment',
            data: JSON.stringify(parameters),
            dataType: 'json',
            success: function (rValue) {
                var userContext = rValue.d;

                $.mobile.loading('hide');

                //self.getEdPlanSelectorData(edPlan.edPlanID);


                self.getEdPlanByID(edPlan.edPlanID);

                //Html.hidePopUp();
                self.closeEdPlanPopUp();
            },
            fail: function (rValue) {
                var stopHere = '';
            }
        });


    }

    self.showEditEdPlanCommentPopUp = function (commentID, commentText) {
        console.log('showEditEdPlanCommentPopUp')

        var container = $('#editEdPlanCommentContent');
        container.empty();

        var editText = $('.edPlanComment');

        $.each(editText, function () {
            if ($(this).data('commentid') == commentID) {
                commentText = $(this).text();
            }
        });


        var editArea = $('<textarea id="editEdPlanCommentArea">').val(commentText);

        var commentCancel = $('<div>')
            .addClass('cancel')
            .text('Cancel')
            .on('click', function () {
                //Html.hidePopUp();
                self.closeEdPlanPopUp();
            });

        var commentSubmit = $('<div>')
            .addClass('submit')
            .text('Submit')
            .on('click', function () {

                commentText = editArea.val();
                console.log(commentText);
                self.editEdPlanComment(commentText, commentID);

            });

        editArea.appendTo(container);
        commentCancel.appendTo(container);
        commentSubmit.appendTo(container);

        $.magnificPopup.open({
            items: {
                src: '#editEdPlanComment',
                type: 'inline'
            },
            showCloseBtn: false,
            closeOnBgClick: true,
            mainClass: 'holder'
        });

    }

    self.showDeleteEdPlanCommentPopUp = function (commentID) {

        var container = $('#deleteEdPlanComment');
        container.empty();


        var edPlanCommentDeleteTitle = $('<div>');
        edPlanCommentDeleteTitle.addClass('popUpTitle')
            .text('Delete Ed Plan Comment')
            .append(
                $('<span>').addClass('closePopUp ui-btn ui-btn-icon-right ui-icon-delete').on('click', function () {
                    //Html.hidePopUp();
                    self.closeEdPlanPopUp();
                })
            );

        var commentCancel = $('<div>')
            .addClass('cancel')
            .text('Cancel')
            .on('click', function () {
                //Html.hidePopUp();
                self.closeEdPlanPopUp();
            });

        var commentSubmit = $('<div>')
            .addClass('submit')
            .text('Delete')
            .on('click', function () {
                self.deleteEdPlanComment(commentID);
            });



        edPlanCommentDeleteTitle.appendTo(container);

        commentCancel.appendTo(container);
        commentSubmit.appendTo(container);

        $.magnificPopup.open({
            items: {
                src: '#deleteEdPlanComment',
                type: 'inline'
            },
            showCloseBtn: false,
            closeOnBgClick: true,
            mainClass: 'holder'
        });

    }

    self.toggleEdPlanComments = function () {
        console.log('toggleEdPlanComments');

        if ($('.edPlanCommentTitle').hasClass('ui-icon-carat-u')) {
            console.log('toggleEdPlanComments u');
            $('.edPlanCommentTitle').removeClass('ui-icon-carat-u');
            $('.edPlanCommentTitle').addClass('ui-icon-carat-d');

            $('.edPlanCommentHolder').slideUp();



        } else {
            console.log('toggleEdPlanComments d');
            $('.edPlanCommentTitle').removeClass('ui-icon-carat-d');
            $('.edPlanCommentTitle').addClass('ui-icon-carat-u');

            $('.edPlanCommentHolder').slideDown();

        }

    }
    //Comment edit/delete functions/////////////////////////////////////////////////////

    self.toggleEdPlanExplaination = function (learnmore) {

        console.log(learnmore);
        if ($(learnmore).next().hasClass('displayNone')) {
            $(learnmore).next().removeClass('displayNone');
        } else {
            $(learnmore).next().addClass('displayNone');
        }
    }

    self.closeEdPlanPopUp = function () {
        console.log('closeEdPlanPopUp');

        $("#txtDisciplinesAuto").val("");
        $("#txtDisciplinesAutoTwo").val("");
        $("#txtDisciplinesAutoThree").val("");
        $("#txtAddMisc").val("");

        $("#txtDisciplinesAuto").text("");
        $("#txtDisciplinesAutoTwo").text("");
        $("#txtDisciplinesAutoThree").text("");
        $("#txtAddMisc").text("");

        $('#txtChangeCourseAuto').text("");
        $('#txtChangeCourseAuto').val("");
        $('#txtChangeCourseToNote').val("");
        $('#txtChangeCourseToNote').text("");

        $('#courseListResults').empty();
        $('#courseListResultsHolder').hide();

        $.magnificPopup.close();
    }

    //take user from myCollege to myClasses/edPlan tab
    self.myColEdPlan = function() {

        //Google Anaylytics event log tag
        ga('send', 'event', 'MyCollege to Ed Plan Click', '');

        //change active main nav link
        $('.footerNav').removeClass('activeNav');
        $('.footerNav.myClasses').addClass('activeNav');
        $('section').removeClass('activeNav');
        $('section#myclasses').addClass('activeNav');

        Html.hideMyFavorites();
        Html.hideRegisteredItems();
        Html.hideWaitListItems();


        var noShow = null;
        //self.getEdPlanSelectorData(noShow);

        var trigger;


        if (isMobile()) {
            trigger = $('#LnkMyEdPlanItem');

            //var container = $('<div>').attr({ 'id': 'MyEdPlanItemControls' });
            //$(container).appendTo($('#MyEdPlanWrapper'));

        } else {

        }

        trigger = $('.tabTrigger.myed');
        trigger.click();
        self.getEdPlanSelectorData(noShow);

    }


    self.appendCollegeMessage = function () {
        console.log('appendCollegeMessage');
        var container =$('#MyEdPlanItemControls');
        var showMore = $('<a style="color:#000000; font-style:italic;">')
            .text('Learn More...')
            .addClass('')
            .on('click', function () {

                console.log(this);
                self.toggleEdPlanExplaination(this);
            });

        switch (myCampus.CampusCode) {
            case '062':
                // Centrals message

                console.log(container);
                container.empty().append(
                    $('<p>').addClass('')
                        .append(
                            $('<span>').html('Good educational planning is essential to your success as a student!  An educational plan is an outline of the coursework required to complete your educational goal or program of study, and is your roadmap toward a college certificate or degree that can save you time and money.&nbsp &nbsp')
                        ).append(
                        showMore
                    ).append(
                        $('<span class="displayNone">').html('<br />Your advisor or counselor is your key resource for helping you develop your Educational Plan. We strongly recommend you consult with an academic advisor or counselor to ensure your education plan will work to help you achieve your goals. <br />Once you have created an education plan, please work with an advisor or counselor regularly to ensure you stay on track. Educational planning is a process that normally will require some modifications during your educational journey.<br />To schedule an appointment with a counselor or advisor click here: ')
                            .append(
                                $('<a style="color:#000000; font-style:italic;" href="http://seattlecentral.edu/educational-planning/index.php" target="_blank">').html('Central Advising')
                            )
                    ))
                ;
                break;

            case '063':
                //Norths message
                container.empty().append(
                    $('<p>').addClass('')
                        .append(
                            $('<span>').html('Good educational planning is essential to your success as a student!  An educational plan is an outline of the coursework required to complete your educational goal or program of study, and is your roadmap toward a college certificate or degree that can save you time and money.&nbsp &nbsp')
                        ).append(
                        showMore
                    ).append(
                        $('<span class="displayNone">').html('<br />Your advisor is your key resource for helping you develop your Educational Plan. Use this tool to create your educational plan. We strongly recommend you consult with an academic advisor to ensure your education plan will work to help you achieve your goals.<br />Once you have created an education plan, please work with an advisor regularly to ensure you stay on track. Educational planning is a process that normally will require some modifications during your educational journey.<br />To schedule an appointment with an advisor, please call 206-934-3658.<br />Please note: If you are pursuing certificates or degrees in Early Childhood Education, Health and Human Services, or Watch Technology, please contact those division offices directly for advising and information on your program. '
                        )));
                break;

            case '064':
                //Souths message
                container.empty().append(
                    $('<p>').addClass('')
                        .append(
                            $('<span>').html('Good educational planning is essential to your success as a student!  An educational plan is an outline of the coursework required to complete your educational goal or program of study, and is your roadmap toward a college certificate or degree that can save you time and money.&nbsp &nbsp')
                        ).append(
                        showMore
                    ).append(
                        $('<span class="displayNone">').html('<br />Your advisor is your key resource for helping you develop your Educational Plan. Use this Education Plan tool to create your educational plan. We strongly recommend you consult with an academic advisor to ensure your education plan will work to help you achieve your goals.<br />Once you have created an education plan, please work with an advisor regularly to ensure you stay on track. Educational planning is a process that normally will require some modifications during your educational journey.<br />To schedule an educational planning appointment, please call 206-934-5387. You can also <a style="color:#000000; font-style:italic;" href="http://www.southseattle.edu/advising/advising-counseling-appointments.aspx" target="_blank" >schedule an appointment online.</a> <br />Please note: If you are pursuing certificates or degrees through our Center for International Education or Bachelors of Applied Sciences, please contact those division offices directly for advising and information on your program.'
                        )));
                break;

            case '065':
                //SVI message
                container.empty().append(
                    $('<p>').addClass('')
                        .append(
                            $('<span>').html('Good educational planning is essential to your success as a student!  An educational plan is an outline of the coursework required to complete your educational goal or program of study, and is your roadmap toward a college certificate or degree that can save you time and money.&nbsp &nbsp')
                        ).append(
                        showMore
                    ).append(
                        $('<span class="displayNone">').html('<br />Your advisor is your key resource for helping you develop your Educational Plan.  Please connect with Advising to start creating your educational plan right away! &nbsp &nbsp <a style="color:#000000; font-style:italic;" href="http://sviweb.sccd.ctc.edu/sr_counsel.htm" target="_blank">SVI Advising</a>'
                        )));
                break;

        }
    }
}//end EducationPlan








