
var myCampus;
myCampus = new Campus();

$(document).ready(function () {
    //console.log(myCampus.CampusCode);

    Html.buildFilters();
    //myCampus.getIntentList();
    myCampus.getQuarters();
});


function QSUserRetrieval() {
    var self = this;
    this.re = '';
    this.rt = '';
    this.rid = '';
    this.validated = true;
    this.mc = '';
    this.eval = '';

    var queryString = window.location.search == '' ? null : window.location.search.split('?')[1].split('&');

    //?re=doug.day@seattlecolleges.edu&rt=s&rid=937194b5-a9cb-46b4-9853-b052f2936400
    if (queryString != null) {
        $.each(queryString, function() {

            if (this.toLowerCase().indexOf('re') > -1) {
                self.re = this.split('=')[1];
            }

            if (this.toLowerCase().indexOf('rt') > -1) {
                self.rt = this.split('=')[1];
            }

            if (this.toLowerCase().indexOf('rid') > -1) {
                self.rid = this.split('=')[1].toLowerCase();
            }
            if (this.toLowerCase().indexOf('mc') > -1) {
                self.mc = this.split('=')[1].toLowerCase();
            }
            if (this.toLowerCase().indexOf('eval') > -1) {
                self.eval = this.split('=')[1].toLowerCase();
            }

        });
    }

    if (self.re == '' || self.rt == '' || self.rid == '') {
        self.validated = false;
    }

    if (self.mc != '') {
        self.validated = false;
    }

    if (self.eval != '') {
        self.validated = false;
        //console.log('eval #: ' + self.eval);
    }

}


function QSFilters() {
    var self = this;
    this.IsActive = false;
    this.YRQ = '';
    this.Subject = '';
    this.CourseType = '';
    this.Credits = '';
    this.TimeOfDay = '';
    this.SelectedInstructorValue = -1;
    this.TransferBasic = '';
    this.TransferAOK = '';
    this.TransferSR = '';
    this.TransferIS = '';

    var queryString = window.location.search == '' ? null : window.location.search.split('?')[1].split('&');

    //?yrq=B122&subject=ART&type=elearning
    //?yrq=B561&subject=ART&type=elearning
    //fills and cleans querystring data a bit
    if (queryString != null) {
        $.each(queryString, function () {
            if (this.toLowerCase().indexOf('yrq') > -1) {
                self.YRQ = this.split('=')[1];
                if (self.YRQ.length = 4) { //no point cleaning up if not in right format
                    var firstLetter = self.YRQ.charAt(0).toUpperCase();
                    self.YRQ = self.YRQ.replace(self.YRQ.charAt(0), firstLetter);
                    self.IsActive = true;
                }
            }


            if (this.toLowerCase().indexOf('subject') > -1) {console.log('subject');
                self.Subject = this.split('=')[1];
                self.IsActive = true;
            }

            if (this.toLowerCase().indexOf('type') > -1) {console.log('type');
                self.CourseType = this.split('=')[1].toLowerCase();
                self.IsActive = true;
            }

            if (this.toLowerCase().indexOf('credits') > -1) {console.log('credits');
                self.Credits = this.split('=')[1];
                console.log('credits: ' + self.Credits);
                self.IsActive = true;
            }

            if (this.toLowerCase().indexOf('timeofday') > -1) {console.log('timeofday');
                self.TimeOfDay = this.split('=')[1].toLowerCase();
                self.IsActive = true;
            }

            if (this.toLowerCase().indexOf('selectedinstructorvalue') > -1) {console.log('selectedinstructorvalue');
                self.SelectedInstructorValue = this.split('=')[1].toLowerCase();
                self.IsActive = true;
            }

            if (this.toLowerCase().indexOf('transferbasic') > -1) {console.log('transferbasic');
                self.TransferBasic = this.split('=')[1].toLowerCase();
                self.IsActive = true;
            }

            if (this.toLowerCase().indexOf('transferaok') > -1) {console.log('transferaok');
                self.TransferAOK = this.split('=')[1].toLowerCase();
                self.IsActive = true;
            }

            if (this.toLowerCase().indexOf('transfersr') > -1) {console.log('transfersr');
                self.TransferSR = this.split('=')[1].toLowerCase();
                self.IsActive = true;
            }

            if (this.toLowerCase().indexOf('transferis') > -1) {console.log('transferis');
                self.TransferIS = this.split('=')[1].toLowerCase();
                self.IsActive = true;
            }

        });
        console.log('query string IsActive: ' + self.IsActive);
    }
}



//campus object
function Campus() {


    var self = this;
    this.CampusCode = '062';
    this.Quarters = new Object();
    //this.ProgramIntentsList = new Object();
    this.Departments = new Object();
    this.SelectedDepartment = new Object();
    this.SelectedCourse = new Object();
    this.SelectedClass = new Object();
    this.SelectedYRQ = new Object();
    this.CriticalDates = new Object();
    this.Instructors = new Object();
    this.FeeCodes = new Object();
    this.FilterApplied = 'none'; //options are 'small' OR 'large' OR 'none'
    this.QSUserRetrieval = new QSUserRetrieval();
    this.QSFilters = new QSFilters();
    this.registeredItemNumberMatches = false;
    this.waitlistItemNumberMatches = false;
    this.favoriteItemNumberMatches = false;

    switch (self.CampusCode) {
        case '062':
            //rValue = 'myCentral';
            self.FriendlyName = 'Seattle Central';
            self.CampusName = 'central';
            self.myCampusName = 'myCentral';
            //self.myURL = 'http://localhost:81';
            self.myURL = 'http://mycentral.seattlecolleges.edu';
            break;

        case '063':
            self.FriendlyName = 'North Seattle';
            self.CampusName = 'north';
            self.myCampusName = 'myNorth';
            self.myURL = 'http://localhost:82';
            //this.myURL = 'http://mynorth.seattlecolleges.edu';
            break;

        case '064':
            self.FriendlyName = 'South Seattle';
            self.CampusName = 'south';
            self.myCampusName = 'mySouth';
            self.myURL = 'http://localhost:83';
            //this.myURL = 'http://mysouth.seattlecolleges.edu';
            break;

        case '065':
            self.FriendlyName = 'Seattle Vocational Institute';
            self.CampusName = 'svi';
            self.myCampusName = 'mySVI';
            self.myURL = 'http://localhost:84';
            //this.myURL = 'http://mysvi.seattlecolleges.edu';
            break;
    }

    /*
        this.getIntentList = function(){
            console.log('getIntentList');

            var programIntents;
            var parameters = new Object();
            //parameters.campusCode = myCampus.CampusCode;
            //parameters.sid = null;

            $.ajax({
                type: 'POST',
                async: true,
                contentType: 'application/json; charset=utf-8',
                url: portalRef + 'WebServices/PortalServices.asmx/GetIntentList',
                data: JSON.stringify(parameters),
                dataType: 'json',
                success: function(rValue) {
                    programIntents = rValue.d;
                    self.ProgramIntentsList = programIntents;
                    //console.log(self.ProgramIntentsList);
                }
            });

        }
    */

    this.closeHeaderMenus = function(){
        $('.loginWrapper').removeClass('activeNav');
        $('.loginTrigger').removeClass('activeNav');
    }

    this.SelectedQuarter = function() {
        //must be called with () like self.SelectedQuarter().propertyName
        //automatically manages which {Quarter} object is selected
        //based on interactions with SelectedYRQ
        var rValue;
        $.each(self.Quarters.QuarterList, function() {
            if (this.YRQ == self.SelectedYRQ) { rValue = this; }
        });
        return rValue;
    }


    this.quarterChanged = function(sender) {
        //manages updating of Campus.SelectedYRQ/SelectedQuarter
        //and updates the quarter name in header

        //Doug - 11/2015 - removing reg appt requirement
        //if (self.SelectedQuarter.IsRegistrationOpen
        //    && self.SelectedQuarter.IsRegistrationApptAvailable) {
        if (self.SelectedQuarter.IsRegistrationOpen) {

            user.getRegistrationAppointment();
        }

        self.SelectedYRQ = $(sender).val();
        $('#QuarterName').html(self.SelectedQuarter().FriendlyName);
        self.getDepartments();
    }   //end - quarterChanged


    //initialize Campus object properties for SelectedCourse And SelectedClass
    this.InitSelectedCourseAndClass = function(classId) {

        $.each(self.SelectedDepartment.CourseList, function () {
            var stopNow = true;
            $.each(this.ClassInfoList, function() {
                if (this.ClassId == classId) {
                    self.SelectedClass = this;
                    stopNow = false;
                    return (false);
                }
            });

            if (!stopNow) self.SelectedCourse = this;
            return (stopNow);
        });
    }//end InitSelectedCourseAndClass


    // method getting Quarters object
    this.getQuarters = function() {
        $.mobile.loading('show');

        var today = '';
        var devCampus = '';
        var devStudent = '';
        var devPin = '';

        $('#devToolOutputHolder').empty();

        if ($('#DevToday').val().length > 0) {
            today = $('#DevToday').val();
            console.log(today);
            $('#devToolOutputHolder').append( $('#DevToday').val() );
        }

        if ($('#selectCampus').val() != -1) {
            devCampus = $('#selectCampus').find(":selected").val();
            this.CampusCode = devCampus;
            console.log(devCampus);
            $('#devToolOutputHolder').append(' campus: ' + devCampus);
        }

        if ($('#selectStudent').val() != -1) {
            devStudent = $('#selectStudent').find(":selected");
            devPin = $( devStudent ).attr('devPin');
            devStudent = $(devStudent).val();

            $('#TxSID').val(devStudent);
            $('#TxPIN').val(devPin);

            console.log(devStudent + ' : ' + devPin);
            $('#devToolOutputHolder').append(' sid: ' + devStudent);
            $('#devToolOutputHolder').append(' pin: ' + devPin);
        }

        $.ajax({
            type: 'POST',
            async: true,
            contentType: 'application/json; charset=utf-8',
            url: portalRef + 'WebServices/MobileSchedule.asmx/GetQuarters',
            data: '{"campusCode":' + JSON.stringify(self.CampusCode) + ",today:" + JSON.stringify(today) + '}',
            dataType: 'json',
            success: function(rValue) {
                $.mobile.loading( 'hide');
                //fills Quarters object
                self.Quarters = rValue.d.Context;

                //self.Quarters.YRQCurrent.DisplayEvals = true; //for testing


                //set the selected quarter to the default quarter initially
                //or if there is a querystring YRQ use that as the default quarter
                if (self.QSFilters.IsActive && self.QSFilters.YRQ != '') {
                    self.Quarters.DefaultQuarter = self.QSFilters.YRQ;
                    self.QSFilters.YRQ = '';
                }

                //console.log(self.Quarters);

                //self.TTL = rValue.d.ServiceStatus.TTL;


                self.SelectedYRQ = self.Quarters.DefaultQuarter;
                self.buildYRQList($('#yrq-list'));
                self.setQuarter();

                self.buildMoreInfo();//moved from getDepartments
            }
        });
    }


    //method getting Departments object
    this.getDepartments = function(yrq) {
        //Only going to call for departments IF we are changing quarters
        //otherwise we already have the info we need
        console.log('get departments');
        if (self.Departments.DepartmentList == undefined) {

            $.mobile.loading('show');
            $.ajax({
                type: 'POST',
                async: true,
                contentType: 'application/json; charset=utf-8',
                url: portalRef + 'WebServices/MobileSchedule.asmx/GetDepartments',
                data: '{"campusCode":' + JSON.stringify(self.CampusCode) + ',"yrq":' + JSON.stringify(yrq) + '}',
                dataType: 'json',
                success: function(rValue) {

                    $.mobile.loading('hide');

                    var userContext = rValue.d;

                    //fill departments object
                    self.Departments = userContext.Context;

                    //this is activated if there is a querystring for sid/pin retrieval
                    //so the querystring only runs once I need to either clear out the
                    //"QSUserRetrieval" object (this would leave it firing again if the page were re-loaded so not ideal)
                    //or I was considering once the SID/PIN have been displayed go ahead and reload the page
                    //as normal without the querystring
                    //ALTERNATELY we alter this is some way so it only fires once no matter (similar to the other querystring stuff I built)
                    if (self.QSUserRetrieval.validated) {

                        if (self.QSUserRetrieval.rt == 'p') {
                            //retrieve pin
                            user.getPIN();

                        } else if (self.QSUserRetrieval.rt == 's') {
                            //retrieve sid
                            user.getSID();
                        }
                    }

                    //querystring filter
                    if (self.QSFilters.IsActive) {
                        self.manageQueryStringFilter();
                    }


                    //build department list and more info list
                    self.buildDeptList();
                    Html.showDepts();
                    //self.buildMoreInfo();

                    //call to get instructor info for use in filter
                    if (self.Instructors.length == undefined) {
                        self.getDepartmentFilterInfo();
                    }


                    //this code is there to resolve the "state" of data issues
                    //that will arise if someone reloads the page after being authenticated
                    //in this case we want to go ahead and re-initialize all the normal data that
                    //is delivered after a user logs in
                    if (userContext.ServiceStatus.IsAuthenticated) {
                        user.reInitialize();
                    }



                    if (self.QSUserRetrieval.mc == '' && self.QSUserRetrieval.eval == '') {
                        console.log('no mc');
                    } else {
                        console.log('mc');
                        Html.showLogin();
                    }

                }
            });
        } else {
            console.log( 'buildDeptList' );
            self.buildDeptList();
            Html.showDepts();
        }
    }

    //?yrq=B344&subject=ART&type=elearning
    this.manageQueryStringFilter = function() {

        //removing continuing education from North campus
        if (self.CampusCode == "063" && self.QSFilters.CourseType == "coned") {
            self.QSFilters.CourseType = "";
        }

        if (self.QSFilters.Subject != '' || self.QSFilters.CourseType != '' ||
            self.QSFilters.Credits != '' || self.QSFilters.TimeOfDay != '' ||
            self.QSFilters.SelectedInstructorValue != '' ||
            self.QSFilters.TransferBasic != '' || self.QSFilters.TransferAOK != '' ||
            self.QSFilters.CourseType != '' || self.QSFilters.TransferSR != '' ||
            self.QSFilters.TransferIS != ''
        ) {


            //set departmentId so it will get picked up inside this.getFilteredList
            self.SelectedDepartment.DepartmentId = self.QSFilters.Subject;


            //All = 0
            //ELearning = 1
            //Hybrid = 2
            //ConEd = 3
            //acceptable values:  elearning  or  hybrid  or  coned
            //set filteroptions
            switch (self.QSFilters.CourseType) {
                case '':
                    self.Departments.FilterOptions.CourseType = 0;
                    break;
                case 'elearning':
                    self.Departments.FilterOptions.CourseType = 1;
                    break;
                case 'hybrid':
                    self.Departments.FilterOptions.CourseType = 2;
                    break;
                case 'coned':
                    self.Departments.FilterOptions.CourseType = 3;
                    break;
                default:
                    self.Departments.FilterOptions.CourseType = 0;
                    break;
            }


            switch (self.QSFilters.Credits) {
                case '':
                    self.Departments.FilterOptions.Credits = 0;
                    break;
                case '1':
                    self.Departments.FilterOptions.Credits = 1;
                    break;
                case '2':
                    self.Departments.FilterOptions.Credits = 2;
                    break;
                case '3':
                    self.Departments.FilterOptions.Credits = 3;
                    break;
                case '4':
                    self.Departments.FilterOptions.Credits = 4;
                    break;
                case '5':
                    self.Departments.FilterOptions.Credits = 5;
                    break;
                case '6':
                    self.Departments.FilterOptions.Credits = 6;
                    break;

                default:
                    self.Departments.FilterOptions.Credits = 0;
                    break;
            }

            switch (self.QSFilters.TimeOfDay) {
                case '':
                    self.Departments.FilterOptions.TimeOfDay = 0;
                    break;
                case '1':
                    self.Departments.FilterOptions.TimeOfDay = 1;
                    break;
                case '2':
                    self.Departments.FilterOptions.TimeOfDay = 2;
                    break;
                case '3':
                    self.Departments.FilterOptions.TimeOfDay = 3;
                    break;
                case '4':
                    self.Departments.FilterOptions.TimeOfDay = 4;
                    break;
                default:
                    self.Departments.FilterOptions.TimeOfDay = 0;
                    break;
            }

            switch (self.QSFilters.TransferBasic) {
                case '':
                    self.Departments.FilterOptions.TransferBasic = 0;
                    break;
                case '1':
                    self.Departments.FilterOptions.TransferBasic = 1;
                    break;
                default:
                    self.Departments.FilterOptions.TransferBasic = 0;
                    break;
            }

            switch (self.QSFilters.TransferAOK) {
                case '':
                    self.Departments.FilterOptions.TransferAOK = 0;
                    break;
                case '1':
                    self.Departments.FilterOptions.TransferAOK = 1;
                    break;
                case '2':
                    self.Departments.FilterOptions.TransferAOK = 2;
                    break;
                case '3':
                    self.Departments.FilterOptions.TransferAOK = 3;
                    break;
                default:
                    self.Departments.FilterOptions.TransferAOK = 0;
                    break;
            }

            switch (self.QSFilters.TransferSR) {
                case '':
                    self.Departments.FilterOptions.TransferSR = 0;
                    break;
                case '1':
                    self.Departments.FilterOptions.TransferSR = 1;
                    break;
                case '2':
                    self.Departments.FilterOptions.TransferSR = 2;
                    break;
                case '3':
                    self.Departments.FilterOptions.TransferSR = 3;
                    break;
                default:
                    self.Departments.FilterOptions.TransferSR = 0;
                    break;
            }

            switch (self.QSFilters.TransferIS) {
                case '':
                    self.Departments.FilterOptions.TransferIS = 0;
                    break;
                case '1':
                    self.Departments.FilterOptions.TransferIS = 1;
                    break;
                default:
                    self.Departments.FilterOptions.TransferIS = 0;
                    break;
            }



            self.QSFilters.Subject = '';
            self.QSFilters.CourseType = '';
            self.QSFilters.Credits = '';
            self.QSFilters.TimeOfDay = '';
            self.QSFilters.SelectedInstructorValue = -1;
            self.QSFilters.TransferBasic = '';
            self.QSFilters.TransferAOK = '';
            self.QSFilters.TransferSR = '';
            self.QSFilters.TransferIS = 0;

            self.getFilteredList();
        }
    }


    // gets courses, classes and lab info for the selected department (subject)
    this.getDepartmentDetails = function(campusCode, yrq, deptId, deptName, openClassesOnly) {
        self.closeHeaderMenus();

        ga('send', 'event', 'Department Opened', deptName.toLowerCase());



        openClassesOnly = $('#chkOpenOnly').prop("checked");

        $.mobile.loading('show');
        $.ajax({
            type: 'POST',
            async: true,
            contentType: 'application/json; charset=utf-8',
            url: portalRef + 'WebServices/MobileSchedule.asmx/GetDepartmentDetails',
            data: '{"campusCode":"' + campusCode +
            '", "yrq":"' + yrq +
            '", "deptId":"' + deptId +
            '", "deptName":"' + deptName +
            '", "openClassesOnly":"' + openClassesOnly +
            '", "filterOpts":' + JSON.stringify(self.Departments.FilterOptions) + '}',
            dataType: 'json',
            success: function(rValue) {
                $.mobile.loading('hide');
                self.SelectedDepartment = rValue.d;
                Html.buildCourses();
                window.scrollTo(0, 0);
            }
        });
    }// -- end getDepartmentDetails


    this.getDescriptionAndEnrollment = function(){
        console.log('getDescriptionAndEnrollment');
        var test = self.SelectedCourse;
        var test2 = self.SelectedClass;


        ga('send', 'event', 'Course Detail Opened', self.SelectedClass.ClassId);


        $.mobile.loading('show');

        var parameters = new Object();
        parameters.campusCode = self.CampusCode;
        parameters.classId = self.SelectedClass.ClassId;
        parameters.courseId = self.SelectedCourse.CourseId;
        parameters.yrq = self.SelectedYRQ;

        $.ajax({
            type: 'POST',
            async: true,
            contentType: 'application/json; charset=utf-8',
            url: portalRef + 'WebServices/MobileSchedule.asmx/GetClassDescAndEnrollment',
            data: JSON.stringify(parameters),
            dataType: 'json',
            success: function (rValue) {

                $.mobile.loading('hide');

                //take partial data needed for class detail and put into [ClassInfo] object
                self.SelectedClass.Description = rValue.d.Description;
                self.SelectedClass.EnrollmentInfo.Filled = rValue.d.EnrollmentInfo.Filled;
                self.SelectedClass.ClassNote = rValue.d.ClassNote;
                self.SelectedClass.ClassURL = rValue.d.ClassURL;
                self.SelectedClass.ELearningMessage = rValue.d.ELearningMessage;
                self.SelectedClass.ElearningURL = rValue.d.ElearningURL;
                self.SelectedClass.CorrespondenceNote = rValue.d.CorrespondenceNote;
                self.SelectedClass.InstructorMessage = rValue.d.InstructorMessage;
                self.SelectedClass.InstructorURL = rValue.d.InstructorURL;
                self.SelectedClass.FeeCodes = rValue.d.FeeCodes;
                if(self.CampusCode == "063"){
                    self.SelectedClass.NorthISCS = rValue.d.NorthISCS;
                }

                if(self.CampusCode == '063'){
                    self.SelectedClass.Instructor.NorthProfileParameter = rValue.d.Instructor.NorthProfileParameter
                }

                //build class details
                self.buildClassDetail();
            }
        });

    }


    this.getDescriptionAndEnrollmentMyClassesDesktop = function( triggerPage, triggerClass, myClass ){
        console.log('getDescriptionAndEnrollmentMyClassesDesktop: ' + triggerPage + ': ' + triggerClass);

        ga('send', 'event', 'Course Detail Opened', self.SelectedClass.ClassId);


        //self.InitSelectedCourseAndClass(myClass.ClassId);

        $.mobile.loading( 'show');
        $.ajax({
            type: 'POST',
            async: true,
            contentType: 'application/json; charset=utf-8',
            url: portalRef + 'WebServices/MobileSchedule.asmx/GetClassDescAndEnrollment',
            data: '{"campusCode":"' + self.CampusCode
            + '", "classId":"'
            + triggerClass + self.SelectedYRQ + '", "courseId":"'
            + myClass.CourseId + '", "yrq":'
            + JSON.stringify( self.SelectedYRQ ) + '}',
            dataType: 'json',
            success: function(rValue) {

                $.mobile.loading( 'hide');

                //take partial data needed for class detail and put into [ClassInfo] object
                myClass.Description = rValue.d.Description;
                myClass.EnrollmentInfo.Filled = rValue.d.EnrollmentInfo.Filled;
                myClass.ClassNote = rValue.d.ClassNote;
                myClass.ClassURL = rValue.d.ClassURL;
                myClass.ELearningMessage = rValue.d.ELearningMessage;
                myClass.ElearningURL = rValue.d.ElearningURL;
                myClass.CorrespondenceNote = rValue.d.CorrespondenceNote;
                myClass.InstructorMessage = rValue.d.InstructorMessage;
                myClass.InstructorURL = rValue.d.InstructorURL;
                myClass.FeeCodes = rValue.d.FeeCodes;

                /*
                //take partial data needed for class detail and put into [ClassInfo] object
                myClass.Description = rValue.d.Description;
                myClass.EnrollmentInfo.Filled = rValue.d.EnrollmentInfo.Filled;
                Html.buildMyClassesDeskTopDescription( triggerPage, triggerClass, myClass );
                */

                Html.buildMyClassesDeskTopDescription(triggerPage, triggerClass, myClass);


            }
        });
    }




    this.getDepartmentFilterInfo = function () {
        console.log('GetDepartmentFilter');

        $.mobile.loading( 'show');
        $.ajax({
            type: 'POST',
            async: true,
            contentType: 'application/json; charset=utf-8',
            url: portalRef + 'WebServices/MobileSchedule.asmx/GetDepartmentFilter',
            data: '{"campusCode":' + JSON.stringify(self.CampusCode) + ',"yrq":' + JSON.stringify(self.SelectedYRQ) + '}',
            dataType: 'json',
            success: function(rValue) {

                $.mobile.loading( 'hide');
                self.Departments.FilterOptions = rValue.d;

                console.log(self.Departments.FilterOptions);

                //remove the list of instructors from the filterOptions
                //as they are too large to be passed back and forth via AJAX
                self.Instructors = self.Departments.FilterOptions.Instructors;
                self.Departments.FilterOptions.Instructors = [{"FirstName":"","MiddleName":"","LastName":"","NorthProfileParameter":"","RawName":"","UniqueId":0,"FilterValueName":"||","FilterValue":-1}];

                //initialize instructor filter title to populate list of instructors
                //when it is first opened only
                //this is only for the large filter
                //the small filter populates on 'pagecreate'
                self.populateFilterInstructors('#filter-instructor');
            }
        });
    }


    //this is only called from checkbox id=chkOpenOnly
    //otherwise open only is evaluated when a filter is done
    //or when a search is done
    //each independently
    this.useOpenClasses = function (sender){

        //determine whether to use search or filter when
        //checkbox for openclassesonly is selected
        //or do nothing if trying use openclassesonly checkbox and
        //no search or filter in use and not selected on department
        //when we use a filter the search boxes are automatically cleared
        if($('#txt-search').val() != '' || $('#txt-search-small').val() != ''){

            self.getDepartmentDetails_Search(sender);
        }else if(self.SelectedDepartment.DepartmentId != undefined){

            self.getFilteredList(sender);
        }
    }

    this.validateFilter = function(sender){
        $('.filter-header span.filterButtonTitle').text('NO FILTER SELECTED');

        if(self.largeFilterIsValid()){
            self.getFilteredList(sender);
            $('.filter-header span.filterButtonTitle').text('FILTERED BY: ');
            //close up filters for the mobile browser
            if( isMobile()  ){
                if( $("#large-filters").css('left') != '-2000px') {
                    $('#btn-close-filters').trigger('click');
                }
            }
        }
    }


    //gets called from either small or large filter apply button
    //or from openclassesonlycheckbox (only if department selected)
    this.getFilteredList = function(sender) {
        console.log('getfilteredList: GetDepartmentDetails_Filtered');
        //allows method to be called without sender parameter
        var senderId = sender == undefined ? '' : sender.id;

        //if filter was chosen then lets clear out any search criteria
        $('#txt-search').val('')
        $('#txt-search-small').val('');

        console.log(self.Departments.FilterOptions);
        console.log(self.SelectedDepartment.DepartmentId);

        if (self.SelectedDepartment.DepartmentId != undefined) {
            self.SelectedDepartment.DepartmentName = self.SelectedDepartment.DepartmentId.toUpperCase();
        }

        console.log(self.SelectedDepartment.DepartmentName);


        var checkbox = document.getElementById('chkOpenOnly');
        var openClassesOnly = $('#chkOpenOnly').prop('checked');
        var deptId = self.SelectedDepartment.DepartmentId == undefined ? deptId = '' : self.SelectedDepartment.DepartmentId;
        var deptName = self.SelectedDepartment.DepartmentName == undefined ? deptName = '' : self.SelectedDepartment.DepartmentName;

        //if sender is from either filter then filterOptions will be updated
        //if sender is from chkOpenOnly then filterOptions will be same as they were last set
        //(or none if havent been set yet)
        if (senderId == 'ApplyFilter') {

            self.initFilterOptionsLarge();

        } else if (senderId == 'ApplyFilter-Small') {
            //doesn't look like we use 'small' filters anymore
            //don't think we need this block
            self.initFilterOptionsSmall();

            $('#SmallFiltersBtn').text('Clear Filters');

            $('#SmallFiltersBtn').one('click', function(e) {
                self.resetSmallFilterOptions();
                e.preventDefault();
            });
        } else if (self.QSFilters != undefined) {
            console.log('query string set');
            self.initFilterOptionsQuery();
        }

        $.mobile.loading('show');

        $.ajax({
            type: 'POST',
            async: true,
            contentType: 'application/json; charset=utf-8',
            url: portalRef + 'WebServices/MobileSchedule.asmx/GetDepartmentDetails_Filtered',
            data: '{ "campusCode":"' + self.CampusCode +
            '", "yrq":"' + self.SelectedYRQ +
            '", "deptId":"' + deptId +
            '", "deptName":"' + deptName +
            '", "openClassesOnly":' + JSON.stringify(openClassesOnly) +
            ', "filterOpts":' + JSON.stringify(self.Departments.FilterOptions) + '}',
            dataType: 'json',
            success: function(rValue) {
                self.SelectedDepartment = rValue.d;
                Html.buildCourses();

                if (senderId == 'ApplyFilter-Small'){
                    $('span.back-btn-text.filter').trigger( "click" );
                }
                $.mobile.loading('hide');

                //removing any traces of querystrings from any further page functional
                if (self.QSFilters != undefined) {
                    if (self.QSFilters.IsActive) {
                        self.QSFilters.IsActive = false;
                        self.Departments.FilterOptions.CourseType = 0;
                        self.Departments.FilterOptions.Credits = 0;
                        self.Departments.FilterOptions.TimeOfDay = 0;
                        self.Departments.FilterOptions.SelectedInstructorValue = -1;
                        self.Departments.FilterOptions.TransferBasic = 0;
                        self.Departments.FilterOptions.TransferAOK = 0;
                        self.Departments.FilterOptions.TransferSR = 0;
                        self.Departments.FilterOptions.TransferIS = 0;
                    }
                }


            }
        });
    }


    //gets department, courses, classes and lab info
    //gets called from either small or large search button
    //or openclassesonly checkbox
    this.getDepartmentDetails_Search = function(sender) {
        var searchtxt;

        if(sender.id == 'btn-search'){
            //searchtxt = $('#txt-search').val();
            searchtxt = $('#searchInput').val();
            $('#txt-search-small').val('');

            self.resetFilterOptions();

        }else if(sender.id == 'txt-search-small'){
            searchtxt = $('#txt-search-small').val();
            $('#txt-search').val('');
        }else{
            //should never get here if both of these are empty
            //bc this.useOpenClasses will not call this method if the search boxes are empty
            //and otherwise the sender will be picked up as one of the buttons above

            //searchtxt = $('#txt-search').val() == '' ? $('#txt-search-small').val() : $('#txt-search').val();
            searchtxt = $('#searchInput').val();
        }



        //search is not contextual to department selected
        //we will look at removing these from signature of webmethod later
        var deptId = '';
        var deptName = '';

        //this does not work (David says it wasn't in original design but I'll try make work later)
        //update - it works now (Doug)
        var openClassesOnly = $('#chkOpenOnly').prop('checked');

        if(searchtxt != ''){
            $.mobile.loading( 'show');
            $.ajax({
                type: 'POST',
                async: true,
                contentType: 'application/json; charset=utf-8',
                url: portalRef + 'WebServices/MobileSchedule.asmx/GetDepartmentDetails_Search',
                data: '{ "campusCode":"' + self.CampusCode +
                '", "yrq":"' + this.SelectedYRQ +
                '", "deptId":"' + deptId +
                '", "deptName":"' + deptName +
                '", "openClassesOnly":"' + openClassesOnly +
                '", "searchText":' + JSON.stringify( searchtxt ) + '}',
                dataType: 'json',
                success: function(rValue) {
                    $.mobile.loading( 'hide');
                    self.SelectedDepartment = rValue.d;
                    Html.buildCourses();

                    reportSearchResult( searchtxt );
                    myCampus.hideSearchBox();
                }
            });
        }

        $('#searchInput').val('');

    }   //-- end [getDepartmentDetails_Search]


    this.initFilterOptionsQuery = function () {
        console.log('initFilterOptionsQuery');

        console.log('course set: ' + self.Departments.FilterOptions.CourseType);
        if (self.Departments.FilterOptions.CourseType != 0) {

            $.each(
                $('input[name="course-type-small"]'), function () {
                    if ($(this).val() == self.Departments.FilterOptions.CourseType) {
                        $('.filterReport.course-type-small').html($(this).data('label'));
                        $(this).attr("checked", true).checkboxradio().checkboxradio("refresh");
                    }
                }
            );
        }


        console.log('Credits set: ' + self.Departments.FilterOptions.Credits);
        if (self.Departments.FilterOptions.Credits != 0) {

            $.each(
                $('input[name="credits-small"]'), function () {
                    if ($(this).val() == self.Departments.FilterOptions.Credits) {
                        $('.filterReport.credits-small').html($(this).data('label'));
                        $(this).attr("checked", true).checkboxradio().checkboxradio("refresh");
                    }
                }
            );
        }


        console.log('TimeOfDay set: ' + self.Departments.FilterOptions.TimeOfDay);
        if (self.Departments.FilterOptions.TimeOfDay != 0) {

            $.each(
                $('input[name="time-small"]'), function () {
                    if ($(this).val() == self.Departments.FilterOptions.TimeOfDay) {
                        $('.filterReport.time-small').html($(this).data('label'));
                        $(this).attr("checked", true).checkboxradio().checkboxradio("refresh");
                    }
                }
            );
        }

        /* instructor
        console.log('SelectedInstructorValue set: ' + self.Departments.FilterOptions.SelectedInstructorValue);
        if (self.Departments.FilterOptions.SelectedInstructorValue != 0) {

            $.each(
                $('input[name="time-small"]'), function () {
                    if ($(this).val() == self.Departments.FilterOptions.SelectedInstructorValue) {
                        $('.filterReport.time-small').html($(this).data('label'));
                        $(this).attr("checked", true).checkboxradio().checkboxradio("refresh");
                    }
                }
            );
        }
        */




        console.log('TransferBasic set: ' + self.Departments.FilterOptions.TransferBasic);
        if (self.Departments.FilterOptions.TransferBasic != 0) {

            $.each(
                $('input[name="aa-qsr"]'), function () {
                    if ($(this).val() == self.Departments.FilterOptions.TransferBasic) {
                        $('.filterReport.aa-qsr').html($(this).data('label'));
                        $(this).attr("checked", true).checkboxradio().checkboxradio("refresh");
                    }
                }
            );
        }


        console.log('TransferAOK set: ' + self.Departments.FilterOptions.TransferAOK);
        if (self.Departments.FilterOptions.TransferAOK != 0) {

            $.each(
                $('input[name="aa-AOK"]'), function () {
                    if ($(this).val() == self.Departments.FilterOptions.TransferAOK) {
                        $('.filterReport.aa-AOK').html($(this).data('label'));
                        $(this).attr("checked", true).checkboxradio().checkboxradio("refresh");
                    }
                }
            );
        }

        console.log('TransferSR set: ' + self.Departments.FilterOptions.TransferSR);
        if (self.Departments.FilterOptions.TransferSR != 0) {

            $.each(
                $('input[name="aa-sr"]'), function () {
                    if ($(this).val() == self.Departments.FilterOptions.TransferSR) {
                        $('.filterReport.aa-sr').html($(this).data('label'));
                        $(this).attr("checked", true).checkboxradio().checkboxradio("refresh");
                    }
                }
            );
        }


        console.log('TransferIS set: ' + self.Departments.FilterOptions.TransferIS);
        if (self.Departments.FilterOptions.TransferIS != 0) {
            $.each(
                $('input[name="aa-is"]'), function () {
                    if ($(this).val() == self.Departments.FilterOptions.TransferIS) {
                        $('.filterReport.aa-is').html($(this).data('label'));
                        $(this).attr("checked", true).checkboxradio().checkboxradio("refresh");
                    }
                }
            );
        }


        $('#ApplyFilter').click();
    }


    this.initFilterOptionsLarge = function() {
        console.log('initFilterOptionsLarge');
        self.FilterApplied = 'large';

        //clear any previously set values from FilterOptions
        self.Departments.FilterOptions.CourseType = 0;
        self.Departments.FilterOptions.Credits = 0;
        self.Departments.FilterOptions.TimeOfDay = 0;
        self.Departments.FilterOptions.SelectedInstructorValue = -1;
        self.Departments.FilterOptions.TransferBasic = 0;
        self.Departments.FilterOptions.TransferAOK = 0;
        self.Departments.FilterOptions.TransferSR = 0;
        self.Departments.FilterOptions.SpecialType = 0;

        //newly separated Integrated Studies
        //self.Departments.FilterOptions.TransferIS = 0;

        //-- get selected filter items
        if ( $('input[name="course-type-small"]:checked').val() != undefined ) {
            self.Departments.FilterOptions.CourseType = $('input[name="course-type-small"]:checked').val();
        }

        if ($('input[name="credits-small"]:checked').val() != undefined ) {
            self.Departments.FilterOptions.Credits = $('input[name="credits-small"]:checked').val();
        }

        if ($('input[name="time-small"]:checked').val() != undefined ) {
            self.Departments.FilterOptions.TimeOfDay = $('input[name="time-small"]:checked').val();
        }







        /*
        self.Departments.FilterOptions.SelectedInstructorValue =
		    $('#filter-instructor option:selected').val() == undefined
		    ? -1
		    : $('#filter-instructor option:selected').val();
        */
        self.Departments.FilterOptions.SelectedInstructorValue = $('#selectedInstructorValue').data('filtervalue');






        //console.log(self.Instructors.length);
        for (i = 0; i < self.Instructors.length; i++) {

            if (self.Instructors[i].FilterValue == self.Departments.FilterOptions.SelectedInstructorValue) {
                self.Departments.FilterOptions.Instructors[0] = self.Instructors[i];
            }


        }





        if ($('input[name="aa-qsr"]:checked').length > 0) {
            self.Departments.FilterOptions.TransferBasic = $('input[name="aa-qsr"]:checked').val();
        }

        if ($('input[name="aa-AOK"]:checked').length > 0) {
            self.Departments.FilterOptions.TransferAOK = $('input[name="aa-AOK"]:checked').val();
        }

        if ($('input[name="aa-sr"]:checked').length > 0) {
            self.Departments.FilterOptions.TransferSR = $('input[name="aa-sr"]:checked').val();
        }

        //newly separated Integrated Studies
        if ($('input[name="aa-is"]:checked').length > 0) {
            //self.Departments.FilterOptions.TransferIS = $('input[name="aa-is"]:checked').val();

            //doug change for integrated studies
            //self.Departments.FilterOptions.TransferSR = 4;
            self.Departments.FilterOptions.SpecialType = 1;
        }
    }


    //applied to the "Subjects" link that returns
    //from viewing courses/classes/filtered list/search list
    //need reset filters when return to department list
    //otherwise "selected" department is off when using filter/search
    //since we are using same button on large and small
    //I added a global "Campus.FilterApplied" to know which filter was in use
    //and only clear that filter otherwise we get jQuery mobile errors
    //for trying to work with controls that are not yet initialized
    this.resetFiltersExclusive = function () {
        console.log('resetFiltersExclusive');
        $('#class-count-sm').html(''); //need clear small class count display

        self.SelectedDepartment = new Object();
        self.SelectedCourse = new Object();
        self.SelectedClass = new Object();

        if( $('.filterReports a').hasClass('remove-filterHolder') ){

        } else {
            $('.filter-header span.filterButtonTitle').html('NO FILTER SELECTED');
            $('.filterReports').css({'padding':'.25em'}).empty();
        }
        Html.showDepts();
    }

    this.resetFilterOptions = function (trigger) {
        console.log('resetFilterOptions');


        self.FilterApplied = 'none';

        $('.filter-header span.filterButtonTitle').html('NO FILTER SELECTED');

        //-- clear class status(open classes only) options
        $('input[name="chkOpenOnly"]').attr("checked",false).checkboxradio("refresh");
        $( '.filterReport.chkOpenOnly' ).html( 'All' );

        //-- clear course type options
        self.Departments.FilterOptions.CourseType = 0;
        $('input[name="course-type-small"]').attr("checked",false).checkboxradio("refresh");
        $('input[name="course-type-small"]:first').attr("checked",true).checkboxradio("refresh");
        $( '.filterReport.course-type-small' ).html( 'All' );

        //-- clear credit options
        self.Departments.FilterOptions.Credits = 0;
        $('input[name="credits-small"]').attr("checked", false).checkboxradio("refresh");
        $('input[name="credits-small"]:first').attr("checked", true).checkboxradio("refresh");
        $( '.filterReport.credits-small' ).html( 'Any' );

        //-- clear time of day options
        self.Departments.FilterOptions.TimeOfDay = 0;
        $('input[name="time-small"]').attr("checked",false).checkboxradio("refresh");
        $('input[name="time-small"]:first').attr("checked", true).checkboxradio("refresh");
        $( '.filterReport.time-small' ).html( 'Any' );

        //reset radio button filters to their first positions
        $('.ui-btn.ui-corner-all.ui-btn-inherit.ui-btn-icon-right.ui-first-child').addClass('ui-radio-on').removeClass('ui-radio-off');






        //-- clear instructor option
        self.Departments.FilterOptions.SelectedInstructorValue = -1;
        //var theInstructorSelected = $('#filter-instructor');
        //theInstructorSelected[0].selectedIndex = "-1";
        //theInstructorSelected.selectmenu("refresh");
        //$('#filter-instructor-button span');
        $('#selectedInstructorValue').remove();
        $('#selectedInstructorHolder').text('All').append($('<span data-filtervalue="-1">').attr({ 'id': 'selectedInstructorValue' }));









        //-- clear transfer options
        self.Departments.FilterOptions.TransferBasic = 0;
        $('#aa-qsr').attr("checked",false).checkboxradio("refresh");
        $( '.filterReport.aa-qsr' ).html( 'None' );

        self.Departments.FilterOptions.TransferSR = 0;
        $('#aa-com').attr("checked", false).checkboxradio("refresh");
        $('#aa-us').attr("checked", false).checkboxradio("refresh");
        $('#aa-gs').attr("checked", false).checkboxradio("refresh");
        $( '.filterReport.aa-sr' ).html( 'None' );

        self.Departments.FilterOptions.TransferAOK = 0;
        $('#aa-vlpa').attr("checked", false).checkboxradio("refresh");
        $('#aa-isc').attr("checked", false).checkboxradio("refresh");
        $('#aa-nw').attr("checked", false).checkboxradio("refresh");
        $( '.filterReport.aa-AOK' ).html( 'None' );

        //newly separated Integrated Studies
        if(myCampus.CampusCode == "063"){
            self.Departments.FilterOptions.SpecialType = 0
        }
        $('#aa-is').attr("checked", false).checkboxradio("refresh");
        $( '.filterReport.aa-is' ).html( 'None' );

        var deptId = self.SelectedDepartment.DepartmentId == undefined ? deptId = '' : self.SelectedDepartment.DepartmentId;
        var deptName = self.SelectedDepartment.DepartmentName == undefined ? deptName = '' : self.SelectedDepartment.DepartmentName;

        if (deptId != '' && trigger != "quarterSelector") {
            self.getDepartmentDetails(self.CampusCode,self.SelectedQuarter.YRQ,deptId,deptName,false);
        } else {
            self.getDepartments(self.SelectedYRQ);
        }

        self.reportFilters(false);

        if( isMobile() && trigger != 'removeAll' && $('#larg-filters').css('left') <= 0  ){
            $('#btn-close-filters').trigger('click');
            $('#class-count-sm').html('');
        }

        checkReports();

    }

    this.largeFilterIsValid = function(){
        var rValue = false;
        //var theSelectedInstructor = $('#filter-instructor option:selected').val();

        var theSelectedInstructor = $('#selectedInstructorValue').data('filtervalue');

        console.log(theSelectedInstructor);

        if(theSelectedInstructor == undefined){
            self.Departments.FilterOptions.SelectedInstructorValue -1;
        } else {
            self.Departments.FilterOptions.SelectedInstructorValue = theSelectedInstructor;
        }

        //check if filters set at default
        //return false if they are
        var openClassesOnly = $('#chkOpenOnly').prop('checked');


        console.log(self.Departments.FilterOptions.SelectedInstructorValue);


        if(
            openClassesOnly == false &&

            $('input[name="course-type-small"]:checked').val() == 0 &&

            $('input[name="credits-small"]:checked').val() == 0 &&

            $('input[name="time-small"]:checked').val() == 0 &&

            self.Departments.FilterOptions.SelectedInstructorValue == -1 &&

            $('input[name="aa-qsr"]:checked').val() == undefined &&

            $('input[name="aa-sr"]:checked').val() == undefined &&

            $('input[name="aa-AOK"]:checked').val() == undefined &&

            //newly separated Integrated Studies
            $('input[name="aa-is"]:checked').val() == undefined

        ){
            /*
             if( $('#ApplyFilter').css() == 'block' ) {
                 $('#filterSubmitPopUp').slideDown().delay(3000).slideUp();
             }
             */
            rValue = false;

        } else if(
            openClassesOnly == false &&

            $('input[name="course-type-small"]:checked').val() == undefined  &&

            $('input[name="credits-small"]:checked').val() == undefined &&

            $('input[name="time-small"]:checked').val() == undefined &&

            self.Departments.FilterOptions.SelectedInstructorValue == -1 &&

            $('input[name="aa-qsr"]:checked').val() == undefined &&

            $('input[name="aa-sr"]:checked').val() == undefined &&

            $('input[name="aa-AOK"]:checked').val() == undefined &&

            //newly separated Integrated Studies
            $('input[name="aa-is"]:checked').val() == undefined

        ){

            rValue = false;

        } else {
            //some filter options are set to return true
            rValue = true;
        }

        self.reportFilters(rValue);

        return rValue;
    }


    this.reportFilters = function(rValue) {

        $('#removeAllFilterButton').remove();

        if( rValue == false ){
            $('.filterReports').html('');
            $('#SmallFiltersBtn').text('Add Filters');

        } else {
            //clear the area for new html
            $('.filterReports').html('');

            //display used/set filters
            $.each( $('input[name="chkOpenOnly"]:checked'), function(){
                if(
                    $('input[name="chkOpenOnly"]:checked').val() != 0 &&
                    $('input[name="chkOpenOnly"]:checked').val() != undefined
                ){
                    $('.filterReports').append('  <a class="remove-filterHolder"  data-label="chkOpenOnly" href="#" style="margin:.5em; display:inline-block;">'+ $('input[name="chkOpenOnly"]:checked').data('label') +'<div class="remove-filter" data-label="chkOpenOnly" tabindex="0" onClick="removeFilterReport(this);">X</div></a>  ');
                }
            } );

            $.each( $('input[name="course-type-small"]:checked'), function(){
                if(
                    $('input[name="course-type-small"]:checked').val() != 0 &&
                    $('input[name="course-type-small"]:checked').val() != undefined
                ){
                    $('.filterReports').append('  <a class="remove-filterHolder"  data-label="course-type-small" href="#" style="margin:.5em; display:inline-block;">'+ $('input[name="course-type-small"]:checked').data('label') +'<div class="remove-filter" data-label="course-type-small" tabindex="0" onClick="removeFilterReport(this);">X</div></a>  ');
                }
            } );

            $.each( $('input[name="credits-small"]:checked'), function(){
                if(
                    $('input[name="credits-small"]:checked').val() != 0 &&
                    $('input[name="credits-small"]:checked').val() != undefined
                ){
                    $('.filterReports').append('  <a class="remove-filterHolder"  data-label="credits-small" href="#" style="margin:.5em; display:inline-block;">'+ $('input[name="credits-small"]:checked').data('label') +'<div class="remove-filter" data-label="credits-small" tabindex="0" onClick="removeFilterReport(this)" >X</div></a>  ');
                }
            } );

            $.each( $('input[name="time-small"]:checked'), function(){
                if(
                    $('input[name="time-small"]:checked').val() != 0 &&
                    $('input[name="time-small"]:checked').val() != undefined
                ){
                    $('.filterReports').append('  <a class="remove-filterHolder" data-label="time-small" href="#" style="margin:.5em; display:inline-block;">'+ $('input[name="time-small"]:checked').data('label') +'<div class="remove-filter" data-label="time-small" tabindex="0" onClick="removeFilterReport(this)" >X</div></a>  ');
                }
            } );


            if ( self.Departments.FilterOptions.SelectedInstructorValue !== -1 ){

                console.log(self.Departments.FilterOptions.SelectedInstructorValue);

                //if ($('#filter-instructor-button span').text() != 'All') {


                $('.filterReports').append('  <a class="remove-filterHolder" data-label="instructor" href="#" style="margin:.5em; display:inline-block;">'
                    //+ $('#filter-instructor-button span').text()
                    + $('#selectedInstructorHolder').text()
                    +'<div class="remove-filter" data-label="instructor" tabindex="0" onClick="removeFilterReport(this)" >X</div></a>  ');
                //}


            }


            $.each( $('input[name="aa-qsr"]'), function(){
                if(
                    $('input[name="aa-qsr"]:checked').val() != 0 &&
                    $('input[name="aa-qsr"]:checked').val() != undefined
                ){
                    $('.filterReports').append('  <a class="remove-filterHolder" data-label="aa-qsr" href="#" style="margin:.5em; display:inline-block;">'+ $('input[name="aa-qsr"]:checked').data('label') +'<div class="remove-filter" data-label="aa-qsr" tabindex="0" onClick="removeFilterReport(this)" >X</div></a>  ');
                }
            } );

            $.each( $('input[name="aa-sr"]:checked'), function(){
                if(
                    $('input[name="aa-sr"]:checked').val() != 0 &&
                    $('input[name="aa-sr"]:checked').val() != undefined
                ){
                    $('.filterReports').append('  <a class="remove-filterHolder" data-label="aa-sr" href="#" style="margin:.5em; display:inline-block;">'+ $('input[name="aa-sr"]:checked').data('label') +'<div class="remove-filter" data-label="aa-sr" tabindex="0" onClick="removeFilterReport(this)" >X</div></a>  ');

                    $('#specialRequirements span.filterReport').html('Special Requirements');

                }
            } );

            $.each( $('input[name="aa-AOK"]:checked'), function(){
                if(
                    $('input[name="aa-AOK"]:checked').val() != 0 &&
                    $('input[name="aa-AOK"]:checked').val() != undefined
                ){
                    $('.filterReports').append('  <a class="remove-filterHolder" data-label="aa-AOK" href="#" style="margin:.5em; display:inline-block;">'+ $('input[name="aa-AOK"]:checked').data('label') +'<div class="remove-filter" data-label="aa-AOK" tabindex="0" onClick="removeFilterReport(this)" >X</div></a>  ');

                    $('#areasOfKnowledge span.filterReport').empty().append(
                        $('input[name="aa-AOK"]:checked').data('label')
                    );
                }

            } );

            $.each( $('input[name="aa-is"]:checked'), function(){
                if(
                    $('input[name="aa-is"]:checked').val() != 0 &&
                    $('input[name="aa-is"]:checked').val() != undefined
                ){
                    $('.filterReports').append('  <a class="remove-filterHolder" data-label="aa-is" href="#" style="margin:.5em; display:inline-block;">'+ $('input[name="aa-is"]:checked').data('label') +'<div class="remove-filter" data-label="aa-is" tabindex="0" onClick="removeFilterReport(this)" >X</div></a>  ');

                    $('#integratedStudies span.filterReport').html('Integrated Studies');

                }
            } );



            $('#SmallFiltersBtn').text('Edit Filters');

            var button = $('<a>');

            button.attr({
                'id' :'removeAllFilterButton' ,
                'class' : ' ui-btn ui-corner-all',
                'onClick' : 'myCampus.resetFilterOptions("removeAll")'
            }).css({
                'font-size': '80%',
                'position': 'relative',

                'color': '#fff',
                'padding': '6px',
                'text-shadow': 'none',

                'float': 'right'
            }).text('Remove All');

            $('#filterButtonHolder').append( button );



            var allSubjectsButton = $('#allSubjects').html();

            if( allSubjectsButton == undefined){

                var allSubjectsSlot = $('<li>');
                var allSubjectsButton = $('<a>')
                    .attr({'id': 'allSubjects', 'onclick': 'myCampus.validateFilter(this);'})
                    .addClass('ui-btn ui-btn-icon-right ui-icon-carat-r')
                    .html('All Filtered Classes - ALL')

                $( allSubjectsSlot ).append( allSubjectsButton );
                $('#departments').prepend( allSubjectsSlot );
            }
        }
    }

    // this function is called once on pageload
    this.buildYRQList = function(yrqRadioGroup) {
        //$('#quarterSelector').off();
        $('#quarterSelector').empty();

        // iterate over the quarters list and create a radio button for each available quarter

        $.each(self.Quarters.QuarterList, function(e) {
            var shortFriendly = shortFriendlyName(this.FriendlyName);


            if(this.YRQ == self.Quarters.DefaultQuarter){
                $('#quarterSelector').append(
                    $('<option/>').attr({ 'class':'quarterSelector', id : this.YRQ, value : this.YRQ, selected:'' }).text( this.FriendlyName ).data('placeholder','true')
                );
            } else {
                $('#quarterSelector').append(
                    $('<option/>').attr({ 'class':'quarterSelector', id : this.YRQ, value : this.YRQ }).text( this.FriendlyName )
                );
            }

        });
        $('#quarterSelector').selectmenu().selectmenu("refresh");


        $('#quarterSelector')
            .on('change', function () {


                //reset all the filters with a new quarter
                //'trigger' is arbitrary

                if (self.Departments.FilterOptions != undefined) {
                    self.resetFilterOptions('quarterSelector');
                }


                self.SelectedYRQ = $('#quarterSelector').val();

                //these 3 items need to be reset to trigger a new data
                //pull because the quarter has changed
                self.Departments = new Object();
                self.SelectedDepartment = new Object();
                self.Instructors = new Object();

                self.setQuarter();
                self.buildMoreInfo();
                user.getStudentData();

                //this code resets "myclasses" when quarter is changed
                if(!isMobile()){
                    Html.buildClassPageForDesktop();
                } else {
                    //whatever we need to do to reset mobile
                    Html.hideMyFavorites();
                    Html.hideRegisteredItems();
                    Html.hideWaitListItems();
                    Html.hideEdPlan();
                }

            });

        $('#quarterSelector').selectmenu("refresh");

        Html.initQuarterSelector();
        if (!isMobile()) {
            Html.buildClassPageForDesktop();
        }
    }


    // Update the name of the quarter and refresh the department list
    this.setQuarter = function() {
        console.log('setQuarter');
        user.MyFavoriteClasses = undefined;
        user.RegisteredClasses = undefined;
        user.WaitListedClasses = undefined;
        $('#date-list').empty();
        $('.date-list').empty();

        $.each(self.Quarters.QuarterList, function() {
            if (this.YRQ == self.SelectedYRQ) {
                self.SelectedQuarter = this;

                if (this.NextUpcomingDate != '') {
                    $('#next-relevant-date').empty();

                    $('#next-relevant-date')
                        .append($('<h5>')
                            .css({ 'margin': '0px 0px 4px 0px' })
                            .text('Registration Begins:'));

                    $('#next-relevant-date')
                        .append($('<div>')
                            .css({ 'padding-bottom': '4px' })
                            .text('Returning Student: ' + this.ReturnStudentRegistrationBegin));

                    $('#next-relevant-date')
                        .append($('<div>')
                            .css({ 'padding-bottom': '4px' })
                            .text('New Student: ' + this.NewStudentRegistrationBegin));

                } else {
                    //I don't honestly think this block has a point anymore but leaving for now
                    //apparently we do need this for when the Spring Quarter is past

                    $('#next-relevant-date-sm').text('');

                    $('#next-relevant-date').empty();
                    $('#next-relevant-date')
                        .append($('<h5>')
                            .css({ 'margin': '0px 0px 4px 0px' })
                            .text('Registration Begins:'));
                    $('#next-relevant-date')
                        .append($('<div>')
                            .css({ 'padding-bottom': '4px' })
                            .text('Returning Student: ' + this.ReturnStudentRegistrationBegin));
                    $('#next-relevant-date')
                        .append($('<div>')
                            .css({ 'padding-bottom': '4px' })
                            .text('New Student: ' + this.NewStudentRegistrationBegin));
                }

                var criticalDates = $('<span>');

                criticalDates
                    .append(
                        $('<span>').addClass('criticalDayTitle header').text('Registration Begins')
                    )

                    .append(
                        $('<p>').append( $('<span>').addClass('criticalDayTitle newStudent').text('') )
                            .append(  $('<span>').addClass('criticalDayDate').text( this.ReturnStudentRegistrationBegin ) )
                            .append( $('<span>').addClass('criticalDayDateSummary').text('Returning Students' ) )
                    )

                    .append(
                        $('<p>').append(  $('<span>').addClass('criticalDayDate').text( this.NewStudentRegistrationBegin ) )
                            .append($('<span>').addClass('criticalDayDateSummary').text('New Students')).css({'margin-bottom' : '20px'})
                    )

                    .append(
                        $('<p>').append( $('<span>').addClass('criticalDayDate').text(this.FirstDay) )
                            .append( $('<span>').addClass('criticalDayDateSummary').text(this.FirstDaySummary) )

                    )

                    .append(
                        $('<p>').append( $('<span>').addClass('criticalDayDate').text( this.FifthDay ) )
                            .append( $('<span>').addClass('criticalDayDateSummary').text( this.FifthDaySummary ) )

                    )

                    .append(
                        $('<p>').append( $('<span>').addClass('criticalDayDate').text( this.TenthDay ) )
                            .append( $('<span>').addClass('criticalDayDateSummary').text( this.TenthDaySummary ) )
                    )

                    .append(
                        $('<p>').append( $('<span>').addClass('criticalDayDate').text( this.LastDay ) )
                            .append( $('<span>').addClass('criticalDayDateSummary').text( this.LastDaySummary ) )
                    );

                $(criticalDates)
                    .append(
                        $('<a>').addClass('ui-link').text('See Academic Calendar')
                            .attr({ 'href': 'http://seattlecolleges.edu/district/calendar/academiccalendar.aspx', 'target': '_blank' })

                    );


                //$('#date-list').html(criticalDates.html() );//view critical dates button-home page
                $('#date-list').append(criticalDates.html());//view critical dates button-home page

                $('.date-list').html(criticalDates.html() );//view critical dates-mycampus menu


                $('.criticalDatesQuarterName').remove();
                var quarterName = $('<span>').addClass('criticalDatesQuarterName').append(this.FriendlyName);

                $('#criticalDates .myCampusMenuPageTitle').append( quarterName );

                var moreCriticalDates = $('<span>').addClass('moreCriticalDates');

                moreCriticalDates
                    .append(
                        $('<p>').append( $('<span>').addClass('criticalDayTitle header').text('Registration Appointment Available') )
                            .append( $('<span>').addClass('criticalDayTitle newStudent').text('') )
                            .append( $('<span>').addClass('criticalDayDate').text( this.RegistrationApptAvailableOn ) )
                            .append( $('<span>').addClass('criticalDayDateSummary').text( 'Registration Appointment' ) )
                    )
                    .append(
                        $('<p>').append( $('<span>').addClass('criticalDayTitle header').text('Final Grades Available') )
                            .append( $('<span>').addClass('criticalDayTitle newStudent').text('') )
                            .append( $('<span>').addClass('criticalDayDate').text( this.FinalGradesAvailableOn ) )
                            .append( $('<span>').addClass('criticalDayDateSummary').text('Final Grades'))
                    );

                $('.date-list').append( moreCriticalDates.html() )

            }
        });

        self.getDepartments(self.SelectedYRQ);
    }//end setQuarter




    this.setQuarterForHash = function( hash, authenticated ) {
        console.log('setQuarterForHash');
        user.MyFavoriteClasses = undefined;
        user.RegisteredClasses = undefined;
        user.WaitListedClasses = undefined;

        $.each(self.Quarters.QuarterList, function() {
            if (this.YRQ == self.SelectedYRQ) {
                self.SelectedQuarter = this;

                if (this.NextUpcomingDate != '') {
                    $('#next-relevant-date').empty();
                    $('#next-relevant-date')
                        .append($('<h5>')
                            .css({ 'margin': '0px 0px 4px 0px' })
                            .text('Registration Begins:'));
                    $('#next-relevant-date')
                        .append($('<div>')
                            .css({ 'padding-bottom': '4px' })
                            .text('Returning Student: ' + this.ReturnStudentRegistrationBegin));
                    $('#next-relevant-date')
                        .append($('<div>')
                            .css({ 'padding-bottom': '4px' })
                            .text('New Student: ' + this.NewStudentRegistrationBegin));

                    $('.next-relevant-date').empty();
                    $('.next-relevant-date')
                        .append($('<h5>')
                            .css({ 'margin': '0px 0px 4px 0px' })
                            .text('Registration Begins:'));
                    $('.next-relevant-date')
                        .append($('<div>')
                            .css({ 'padding-bottom': '4px' })
                            .text('Returning Student: ' + this.ReturnStudentRegistrationBegin));
                    $('.next-relevant-date')
                        .append($('<div>')
                            .css({ 'padding-bottom': '4px' })
                            .text('New Student: ' + this.NewStudentRegistrationBegin));

                } else {
                    //I don't honestly think this block has a point anymore but leaving for now
                    //apparently we do need this for when the Spring Quarter is past

                    $('#next-relevant-date-sm').text('');

                    $('#next-relevant-date').empty();
                    $('#next-relevant-date')
                        .append($('<h5>')
                            .css({ 'margin': '0px 0px 4px 0px' })
                            .text('Registration Begins:'));
                    $('#next-relevant-date')
                        .append($('<div>')
                            .css({ 'padding-bottom': '4px' })
                            .text('Returning Student: ' + this.ReturnStudentRegistrationBegin));
                    $('#next-relevant-date')
                        .append($('<div>')
                            .css({ 'padding-bottom': '4px' })
                            .text('New Student: ' + this.NewStudentRegistrationBegin));
                }

                var criticalDates = $('<span>');

                criticalDates
                    .append(
                        $('<span>').addClass('criticalDayTitle header').text('Registration Begins')
                    )

                    .append(
                        $('<p>').append( $('<span>').addClass('criticalDayTitle newStudent').text('') )
                            .append(  $('<span>').addClass('criticalDayDate').text( this.ReturnStudentRegistrationBegin ) )
                            .append( $('<span>').addClass('criticalDayDateSummary').text('Returning Students' ) )
                    )
                    .append(
                        $('<p>').append( $('<span>').addClass('criticalDayTitle newStudent').text('') )
                            .append(  $('<span>').addClass('criticalDayDate').text( this.NewStudentRegistrationBegin ) )
                            .append( $('<span>').addClass('criticalDayDateSummary').text('New Students' ) )
                    )

                    .append(
                        $('<p>').append( $('<span>').addClass('criticalDayTitle').text('First Day') )
                            .append( $('<span>').addClass('criticalDayDate').text(this.FirstDay) )
                            .append( $('<span>').addClass('criticalDayDateSummary').text(this.FirstDaySummary) )

                    )

                    .append(
                        $('<p>').append( $('<span>').addClass('criticalDayTitle').text( 'Fifth Day' ) )
                            .append( $('<span>').addClass('criticalDayDate').text( this.FifthDay ) )
                            .append( $('<span>').addClass('criticalDayDateSummary').text( this.FifthDaySummary ) )

                    )

                    .append(
                        $('<p>').append( $('<span>').addClass('criticalDayTitle').text('Tenth Day') )
                            .append( $('<span>').addClass('criticalDayDate').text( this.TenthDay ) )
                            .append( $('<span>').addClass('criticalDayDateSummary').text( this.TenthDaySummary ) )
                    )

                    .append(
                        $('<p>').append( $('<span>').addClass('criticalDayTitle').text('Last Day') )
                            .append( $('<span>').addClass('criticalDayDate').text( this.LastDay ) )
                            .append( $('<span>').addClass('criticalDayDateSummary').text( this.LastDaySummary ) )
                    );

                $('#date-list').html(criticalDates.html() );//view critical dates button-home page


                $('.date-list').html(criticalDates.html() );//view critical dates-mycampus menu
                $('.criticalDatesQuarterName').remove();
                var quarterName = $('<span>').addClass('criticalDatesQuarterName').append(this.FriendlyName);

                $('#criticalDates .myCampusMenuPageTitle').append( quarterName );

                var moreCriticalDates = $('<span>').addClass('moreCriticalDates');

                moreCriticalDates
                    .append(
                        $('<p>').append( $('<span>').addClass('criticalDayTitle header').text('Registration Appointment Available') )
                            .append( $('<span>').addClass('criticalDayTitle newStudent').text('') )
                            .append( $('<span>').addClass('criticalDayDate').text( this.RegistrationApptAvailableOn ) )
                            .append( $('<span>').addClass('criticalDayDateSummary').text( 'Registration Appointment' ) )
                    )
                    .append(
                        $('<p>').append( $('<span>').addClass('criticalDayTitle header').text('Final Grades Available') )
                            .append( $('<span>').addClass('criticalDayTitle newStudent').text('') )
                            .append( $('<span>').addClass('criticalDayDate').text( this.FinalGradesAvailableOn ) )
                            .append( $('<span>').addClass('criticalDayDateSummary').text('Final Grades'))
                    );

                $('.date-list').append( moreCriticalDates.html() )

            }
        });

        //self.getDepartments(self.SelectedYRQ);
    }//end setQuarterForHash


    // gets the departments (subjects) list and dynamically populates the jQuery Mobile listview
    this.buildDeptList = function() {

        var departments = $('#departments');
        $(departments).empty();

        $.each(self.Departments.DepartmentList, function() {
            var dept = this;
            $(departments).append($('<li>').append($('<a>')
                .on('click', function() { self.getDepartmentDetails(
                    self.Departments.Campus,
                    self.Departments.YRQ,
                    dept.DepartmentId,
                    dept.DepartmentName);
                    return false;
                })
                .text(this.DepartmentName + ' - ' + this.DepartmentId)
                .prop('href', '#')
                .prop('id', this.DepartmentId)));
        });

        //I dont see why we need to call this method [n] times so... this seems work fine(DOUG)
        departments.listview().listview('refresh');
    }


    this.populateFilterInstructors = function(ddl){
        console.log('populate instructors');
        $('#instructors').empty();

        var instructorHolder = $('<div>').attr({ 'id': 'filter-instructor', 'name': 'filter-instructor' });

        var selectedInstructorHolder = $('<div>')
            .attr({ 'id': 'selectedInstructorHolder', 'tabindex': '0' })
            .on('keydown', function (e) {
                var trigger = this;
                var keyCode = e.keyCode || e.which;
                console.log(keyCode);
                if (keyCode == 13) {
                    setTimeout(function () { trigger.click(); }, 5);
                }
            })
            .addClass('ui-btn ui-icon-carat-d ui-btn-icon-right ui-corner-all ui-shadow')
            .text('All')
            .appendTo($('#instructors'));


        var letterPageMarkerHolder = $('<div>').attr({'id': 'pageMarkerHolder'}).appendTo($('#instructors'));
        var letterPageMarker = $('<span>').addClass('pageMarker').attr({'tabindex': '0' })
            .on('keydown', function (e) {
                var trigger = this;
                var keyCode = e.keyCode || e.which;
                console.log(keyCode);
                if (keyCode == 13) {
                    setTimeout(function () { trigger.click(); }, 5);
                }
            });
        var letterPage = $('<div>').addClass('letterPage');

        var lastPageLetter;


        //create the default instructor marker
        $('<span data-pageletter="All">')
            .addClass('pageMarker All').val(-1).text('All')
            .attr({'tabindex': '0' })
            .on('keydown', function (e) {
                var trigger = this;
                var keyCode = e.keyCode || e.which;
                console.log(keyCode);
                if (keyCode == 13) {
                    setTimeout(function () { trigger.click(); }, 5);
                }

                if (keyCode == 37) {
                    //console.log(keyCode);
                    $(trigger).prev().focus();
                }
                if (keyCode == 39) {
                    //console.log(keyCode);
                    $(trigger).next().focus();
                }
            })
            .appendTo(letterPageMarkerHolder);




        //create the default instructor page
        $('<div data-pageletter="All">')
            .addClass('letterPage selectedPage All')
            //.text('All')
            .append(
                $('<span data-filtervalue="-1">').text('All').addClass('instructorMarker firstMarker')
                    .attr({'tabindex': '0' ,'data-pageletter': 'All'})
                    .on('keydown', function (e) {
                        var trigger = this;
                        var keyCode = e.keyCode || e.which;
                        console.log(keyCode);
                        if (keyCode == 13) {
                            setTimeout(function () { trigger.click(); }, 5);
                        }

                        if(event.shiftKey && event.keyCode == 9) {
                            if( $(trigger).hasClass('firstMarker') ){
                                console.log( $(trigger).attr('data-pageletter') );
                                setTimeout(function () { $('.pageMarker.' + $(trigger).attr('data-pageletter')).focus(); }, 15);
                            }
                        }

                    })
            )
            .appendTo($('#instructors'));



        $.each(this.Instructors, function () {
            thisPageLetter = this.LastName.charAt(0);

            thisInstructor = $('<span data-filtervalue="' + this.FilterValue + '" data-pageletter = "' + thisPageLetter + '">')
                .on('keydown', function (e) {
                    var trigger = this;
                    var keyCode = e.keyCode || e.which;
                    console.log(keyCode);
                    if (keyCode == 13) {
                        setTimeout(function () { trigger.click(); }, 5);
                    }
                    if(e.shiftKey && e.keyCode == 9) {
                        if( $(trigger).hasClass('firstMarker') ){
                            console.log( $(trigger).attr('data-pageletter') );
                            setTimeout(function () { $('.pageMarker.' + $(trigger).attr('data-pageletter')).focus(); }, 15);
                        }
                    }
                })
                .attr({'tabindex': '0' })
                .text(this.LastName + ', ' + this.FirstName.charAt(0) + '.').addClass('instructorMarker '+ thisPageLetter);

            if (thisPageLetter == lastPageLetter) {
                //add instructor to existing page
                thisInstructor.appendTo(letterPage);

            } else {
                //add a new marker
                letterPageMarker = $('<span data-pageletter="' + thisPageLetter + '">').addClass('pageMarker ' + thisPageLetter).attr({'tabindex': '0' })
                    .on('keydown', function (e) {
                        var trigger = this;
                        var keyCode = e.keyCode || e.which;
                        console.log(keyCode);
                        if (keyCode == 13) {
                            setTimeout(function () { trigger.click(); }, 5);
                        }
                        if (keyCode == 37) {
                            //console.log(keyCode);
                            $(trigger).prev().focus();
                        }
                        if (keyCode == 39) {
                            //console.log(keyCode);
                            $(trigger).next().focus();
                        }
                    })
                    .html(thisPageLetter)
                    .appendTo(letterPageMarkerHolder);

                //add a new letter page
                letterPage = $('<div data-pageletter="' + thisPageLetter + '">').addClass('letterPage ')
                //.html(letterPageMarker.clone().html(thisPageLetter))
                    .appendTo($('#instructors'));

                //add instructor to new page
                thisInstructor.addClass('firstMarker').appendTo(letterPage);
            }

            lastPageLetter = thisPageLetter;

        });

        selectedInstructorHolder
            .on('click', function () {
                if ($('#instructors').hasClass('openList')) {
                    self.closeInstructorList();
                } else {
                    self.openInstructorList();
                }
            });

        $('#home').trigger('create');


        $('.pageMarker').click(function () {
            //console.log($(this).data('pageletter'));
            var selectedPageLetter = $(this).data('pageletter');
            $('.letterPage').removeClass('selectedPage');
            $.each($('.letterPage'), function () {
                //console.log($(this).data('pageletter'));
                if ($(this).data('pageletter') == selectedPageLetter) {
                    //console.log('page match');
                    $(this).addClass('selectedPage');
                    setTimeout(function () { $('.letterPage.selectedPage .instructorMarker')[0].focus(); }, 25);

                }
            });
        });

        $('.instructorMarker').on( "click",  function () {
            var filterVal = $(this).data('filtervalue');

            selectedInstructorHolder.text($(this).text()).focus();
            $('#selectedInstructorHolder').append($('<span data-filtervalue="' + filterVal + '">').attr({ 'id': 'selectedInstructorValue' }));
            radioizeLargeFilter("instructor");

            self.closeInstructorList();

        }).on("keydown", function (e) {
            var trigger = this;
            var keyCode = e.keyCode || e.which;
            if (keyCode == 38) {
                //console.log(keyCode);
                if ($(trigger).hasClass('firstMarker')) {
                    //console.log($(trigger).attr('data-pageletter'));
                    setTimeout(function () { $('.pageMarker.' + $(trigger).attr('data-pageletter')).focus(); }, 15);
                } else {
                    $(trigger).prev().focus();
                }
            }
            if (keyCode == 40) {
                //console.log(keyCode);
                $(trigger).next().focus();
            }


        });



    }  //-- end [populateFilterInstructors]

    this.openInstructorList = function () {
        $('#instructors').addClass('openList');
        $('#selectedInstructorHolder').addClass('ui-icon-carat-u');
        $('#selectedInstructorHolder').removeClass('ui-icon-carat-d');
    }

    this.closeInstructorList = function () {
        $('#instructors').removeClass('openList');
        $('#selectedInstructorHolder').addClass('ui-icon-carat-d');
        $('#selectedInstructorHolder').removeClass('ui-icon-carat-u');
    }





    this.buildMoreInfo = function () {
        console.log('buildMoreInfo');
        //var MoreInfoList = $('.MoreInfoList');
        var MoreInfoListTarget = $('#hamburgerMenu');
        $('a.dynamic').remove();


        $.each(self.Quarters.QuarterList, function () {
            console.log('this.YRQ: ' + this.YRQ + ' self.SelectedQuarter.YRQ: ' + self.SelectedQuarter.YRQ );
            if (this.YRQ == self.SelectedQuarter.YRQ) {
                console.log('yrq match');
                $.each(this.MoreInfoList, function () {

                    $(MoreInfoListTarget)
                        .append($('<a>')
                            .addClass('hamburgerMenuButton active ui-btn ui-btn-icon-right ui-icon-action dynamic')
                            .text(this.Text)
                            .prop({ 'href': this.URL })
                            .prop('target', '_blank'));
                });
            }
        });

        $(MoreInfoListTarget).listview().listview('refresh');
    }


    this.buildClassDetail = function () {
        console.log('buildClassDetail: ' + self.SelectedClass.Status);
        //class enrollment status
        var status = $('<div>').addClass(self.SelectedClass.ClassId);

        switch (self.SelectedClass.Status) {
            case 'Waitlist':
                status.addClass('classStatus').html('Class is Full:  Waitlist Available');
                break;
            case 'Cancelled':
                status.addClass('classStatus').html('Registration is Cancelled');
                break;
            case 'Closed':
                status.addClass('classStatus').html('Registration is Closed. ');
                break;


            case 'UnKnown':
                status.addClass('classStatus').html('');
                break;



            case 'Unavailable':
                status.addClass('classStatus').html('');
                break;
            default:
                status.addClass('classStatus').html('Class is Open. Enrollment: ' + self.SelectedClass.EnrollmentInfo.Filled + ' of ' + self.SelectedClass.EnrollmentInfo.Capacity + ' seats filled');
        }//end class enrollment status

        //class lab detail
        var labDetail = $('<div>');
        $.each(self.SelectedClass.Labs, function () {

            var labTitle = $('<div>').addClass('labTitle').html('Lab:');
            var labTime = $('<div>').addClass('labTime').html(this.LabTime);


            //if (this.LabDays.trim() == 'ARR-ARR') { this.labDays = 'ARR' }
            if ($.trim(this.LabDays) == 'ARR-ARR') { this.labDays = 'ARR' }

            var labDays = $('<div>').addClass('labDays').html(this.LabDays);

            var buildingRoom = $('<div>').addClass('buildingRoom');

            if (self.CampusCode == '063') {
                buildingRoom.append($('<a>').addClass('location')
                    .attr({
                        href: "http://northseattle.edu/locator/locate/" + this.RoomLocationParameter.toLowerCase(),
                        target: "_Blank"
                    }).html(this.Building + ' ' + this.Room)
                );
            } else {
                buildingRoom.html(this.Building + ' ' + this.Room);
            }

            var labRule = $('<hr />');

            $(labDetail).addClass('labDetail courseLabs')
                .append(labDays)
                .append(labTime)
                .append(buildingRoom)
                .append(labRule);

        });//end class lab detail

        var thisClass = self.SelectedClass;
        var itemMeetDays = $('<div>').html('Days: ').addClass('classDays');
        var itemMeetTimeType = $('<div>').html('Time: ').addClass('classTime');
        var buildingRoom = $('<div>').html('Location: ').addClass('classLocation');
        var onlineTitle = $('<div>');
        var spacerSpan = $('<div>');



        if (self.SelectedClass.DistanceLearningType == 'None') {
            thisClass.meetDaysOut = self.SelectedClass.Meets.MeetDays;
            thisClass.meetTimeOut = self.SelectedClass.Meets.StartTime + ' - ' + self.SelectedClass.Meets.EndTime;

            //if (thisClass.meetTimeOut.trim() == 'ARR - ARR') { thisClass.meetTimeOut = 'ARRANGED' }
            if ($.trim(thisClass.meetTimeOut) == 'ARR - ARR') { thisClass.meetTimeOut = 'ARRANGED' }


            thisClass.elTypeOut = "";

            itemMeetDays.addClass('itemMeetDays')
                .append(thisClass.meetDaysOut);

            itemMeetTimeType.addClass('itemMeetTimeType').append(thisClass.meetTimeOut);

            buildingRoom.addClass('buildingRoom')
                .append(self.SelectedClass.Meets.Building + ' ' + self.SelectedClass.Meets.Room);

            onlineTitle.addClass('onlineTitle');
        } else if (self.SelectedClass.DistanceLearningType == 'TeleCourse') {
            thisClass.meetDaysOut = self.SelectedClass.DistanceLearningType;
            self.SelectedClass.meetTimeOut = 'N/A'
            thisClass.elTypeOut = "";

            itemMeetDays.addClass('itemMeetDays')
                .append('TeleCourse');

            itemMeetTimeType.addClass('itemMeetTimeType').append(thisClass.meetTimeOut);
            buildingRoom.addClass('buildingRoom')
                .append(self.SelectedClass.Meets.Building + ' ' + self.SelectedClass.Meets.Room);
            onlineTitle.addClass('onlineTitle');
        } else if (self.SelectedClass.DistanceLearningType == 'Hybrid') {
            thisClass.meetDaysOut = self.SelectedClass.Meets.MeetDays;

            if (thisClass.meetDaysOut == 'ARRANGED') { thisClass.meetDaysOut = "ARR"; }
            thisClass.meetTimeOut = self.SelectedClass.Meets.StartTime + ' - ' + self.SelectedClass.Meets.EndTime;

            if ($.trim(thisClass.meetTimeOut) == 'ARR - ARR') { thisClass.meetTimeOut = 'ARRANGED' }

            thisClass.elTypeOut = self.SelectedClass.DistanceLearningType;

            itemMeetDays.addClass('itemMeetDays')
                .append(thisClass.meetDaysOut);



            itemMeetTimeType.addClass('itemMeetTimeType').append(thisClass.elTypeOut + ': ' + thisClass.meetTimeOut);
            spacerSpan.addClass('spacerSpan');
            buildingRoom.addClass('buildingRoom')
                .append(self.SelectedClass.Meets.Building + ' ' + self.SelectedClass.Meets.Room);

        } else if (self.SelectedClass.DistanceLearningType == 'Online') {
            thisClass.meetDaysOut = "Online";

            self.SelectedClass.meetTimeOut = 'N/A';

            thisClass.elTypeOut = self.SelectedClass.DistanceLearningType;

            itemMeetDays.addClass('itemMeetDays').append(thisClass.meetDaysOut);
            itemMeetTimeType.addClass('itemMeetTimeType').append(thisClass.elTypeOut);
            spacerSpan.addClass('spacerSpan');
            buildingRoom.addClass('buildingRoom').append('Online');

        } else if (self.SelectedClass.DistanceLearningType == 'Seminar') {

            thisClass.meetDaysOut = "Arranged";
            thisClass.meetTimeOut = "Arranged";
            thisClass.elTypeOut = self.SelectedClass.DistanceLearningType;
            itemMeetDays.addClass('itemMeetDays').append(thisClass.meetDaysOut);
            itemMeetTimeType.addClass('itemMeetTimeType').append(thisClass.elTypeOut);
            spacerSpan.addClass('spacerSpan');
            buildingRoom.addClass('buildingRoom')
                .append(self.SelectedClass.Meets.Building + ' ' + self.SelectedClass.Meets.Room);

        } else if (self.SelectedClass.DistanceLearningType == 'Correspondence') {

            thisClass.meetDaysOut = "Correspondence";
            self.SelectedClass.meetTimeOut = 'N/A';
            thisClass.elTypeOut = self.SelectedClass.DistanceLearningType;
            itemMeetDays.addClass('itemMeetDays').append(thisClass.meetDaysOut);
            itemMeetTimeType.addClass('itemMeetTimeType').append(thisClass.elTypeOut);
            spacerSpan.addClass('spacerSpan');
            buildingRoom.addClass('buildingRoom')
                .append(self.SelectedClass.Meets.Building + ' ' + self.SelectedClass.Meets.Room);

        } else if (self.SelectedClass.DistanceLearningType == 'SelfPaced') {

            thisClass.meetDaysOut = 'Self-Paced';
            self.SelectedClass.meetTimeOut = 'N/A';
            thisClass.elTypeOut = self.SelectedClass.DistanceLearningType;
            itemMeetDays.addClass('itemMeetDays').append(thisClass.meetDaysOut);
            //itemMeetTimeType.addClass('itemMeetTimeType').append(thisClass.elTypeOut);
            itemMeetTimeType.addClass('itemMeetTimeType').append('Self-Paced');
            spacerSpan.addClass('spacerSpan');
            buildingRoom.addClass('buildingRoom')
                .append(self.SelectedClass.Meets.Building + ' ' + self.SelectedClass.Meets.Room);


        } else {
            thisClass.meetDaysOut = "";
            thisClass.meetTimeOut = "";
            thisClass.elTypeOut = self.SelectedClass.DistanceLearningType;

            itemMeetTimeType.addClass('itemMeetTimeType').append(thisClass.elTypeOut);
            spacerSpan.addClass('spacerSpan');
            buildingRoom.addClass('buildingRoom')
                .append(self.SelectedClass.Meets.Building + ' ' + self.SelectedClass.Meets.Room);
        }

        //setup roomSnippet
        if (self.CampusCode == '063') {


            //if ((self.SelectedClass.Meets.Building + self.SelectedClass.Meets.Room).trim().toLowerCase() == 'oc') {
            if ( $.trim(self.SelectedClass.Meets.Building + self.SelectedClass.Meets.Room).toLowerCase() == 'oc') {
                buildingRoom.html('Location: Online');
            } else {
                buildingRoom.html('Location: ').append(
                    $('<a>').addClass('location')
                        .attr({
                            href: 'http://northseattle.edu/locator/locate/' + self.SelectedClass.Meets.RoomLocationParameter,
                            title: 'Room Loction',
                            target: "_Blank"
                        }).html(self.SelectedClass.Meets.Building + self.SelectedClass.Meets.Room)
                );
            }
        } else {
            //not north campus
        }
        //end roomSnippet

        $('#' + self.SelectedClass.ClassId + ' .class-tags-' + self.SelectedClass.ItemNumber).remove();
        $('#' + self.SelectedClass.ClassId + ' .courseDetail .classStatus').remove();
        $('#' + self.SelectedClass.ClassId + ' .courseDetail .courseDescription').remove();
        $('#' + self.SelectedClass.ClassId + ' .courseDetail .courseLabs').remove();



        var courseDescription = $('<div>').addClass('courseDescription').html(self.SelectedClass.Description);
        var classNote = $('<div>').addClass('classNote').html(self.SelectedClass.ClassNote);

        var classURL = $('<div>').addClass('classURL')
            .append($('<a>').attr({ 'href': self.SelectedClass.ClassURL,'target':'_blank' }).html(self.SelectedClass.ClassURL));

        var eLearningMessage = $('<div>').addClass('eLearningMessage').html(self.SelectedClass.ELearningMessage);

        var eLearningURL = $('<div>').addClass('eLearningURL')
            .append($('<a>').attr({ 'href': self.SelectedClass.ElearningURL, 'target': '_blank' }).html(self.SelectedClass.ElearningURL));

        var correspondenceNote = $('<div>').addClass('correspondenceNote').html(self.SelectedClass.CorrespondenceNote);

        var instructorMessageTitle = $('<div>').addClass('instructorMessageTitle').html('A Message From The Instructor');
        var instructorMessage = $('<div>').addClass('instructorMessage').html(self.SelectedClass.InstructorMessage);

        var instructorURL = $('<div>').addClass('instructorURL')
            .append($('<a>').attr({ 'href': self.SelectedClass.InstructorURL, 'target': '_blank' }).html(self.SelectedClass.InstructorURL));

        var spacer = $('<div>').addClass('spacer');


        var popupDiv = $('<div>');
        var popupDescriptionDiv = $('<div>');

        var classMeetsHolder = $('<div>').addClass('classMeetsHolder');
        var classMeetsHolderTitle = $('<div>').addClass('classMeetsHolderTitle').html('Class Meets:');
        var classSpecificsHolder = $('<div>').addClass('classSpecificsHolder');
        var classSpecificsHolderTitle = $('<div>').addClass('classSpecificsHolderTitle').html('Class ID:');

        //var instructorNameSnippet = self.SelectedClass.Instructor.LastName.trim() == '' ?
        var instructorNameSnippet = $.trim(self.SelectedClass.Instructor.LastName) == '' ?
            'STAFF' :
            self.SelectedClass.Instructor.LastName;


        //-- 2015.08.18 DAS per North request - changed from using last name to name returned from advisor's table - as used for url
        //-- 	was: }).html(self.SelectedClass.Instructor.LastName)
        if (self.CampusCode == '063') {

            //if (self.SelectedClass.Instructor.LastName.trim() == '') {
            if (  $.trim(self.SelectedClass.Instructor.LastName) == '') {
                $(instructorNameSnippet).html('STAFF');
            } else {
                instructorNameSnippet = $('<span>').addClass('instructor');
                $(instructorNameSnippet).append(
                    $('<a>').addClass('instructor')
                        .attr({
                            href: 'https://people.northseattle.edu/users/' + self.SelectedClass.Instructor.NorthProfileParameter.toLowerCase(),
                            title: 'Instructor Profile',
                            target: '_Blank'
                        }).html(self.SelectedClass.Instructor.NorthProfileParameter)
                );
            }
        }

        var instructorSpan = $('<div>').addClass('instructorSpan').html('Instructor: ');
        var teamInstructor;

        var classNumber = $('<div>').addClass('classNumber').html('Item No: ' + self.SelectedClass.ItemNumber);
        var sectionNumber = $('<div>').addClass('sectionNumber').html('Section: ' + self.SelectedClass.SectionNumber);
        var classDates = $('<div>').addClass('classDates').html('Dates: ' + self.SelectedClass.StartDate + ' - ' + self.SelectedClass.EndDate);


        if (!$('#' + self.SelectedClass.ClassId + ' .courseDetail').hasClass('closed')) {
            $(instructorSpan).append(instructorNameSnippet);


            classMeetsHolder
                .append(classMeetsHolderTitle)
                .append(itemMeetDays)
                .append(itemMeetTimeType)
                .append(buildingRoom);
            classSpecificsHolder
                .append(classSpecificsHolderTitle)
                .append(classNumber)
                .append(sectionNumber)
                .append(instructorSpan);

            //self.SelectedClass.HasTeamInstructor = true; //for testing
            //self.SelectedClass.TeamInstructor = "TeamInstructor"; //for testing
            if (self.SelectedClass.HasTeamInstructor) {
                teamInstructor = self.SelectedClass.TeamInstructor;
                $(classSpecificsHolder)
                    .append($('<div>')
                        .addClass('instructorSpan')
                        .html('Team Instructor: ' + teamInstructor.LastName)
                    );
            }


            $(classSpecificsHolder)
                .append(classDates);

            var classDetailTopWrapper = $('<div>').addClass('classDetailTopWrapper');
            var classDetailHolder = $('<div>').addClass('classDetailHolder ' + self.SelectedClass.ClassId);


            $('#' + self.SelectedClass.ClassId).parent().append(classDetailHolder);

            //$(classDetailHolder)
            //			.append(courseDescription)
            //			.append(classSpecificsHolder)
            //			.append(classMeetsHolder);

            classDetailHolder.append(courseDescription);

            if (self.SelectedClass.ClassNote != '') {
                $(classDetailHolder).append(classNote);
            }

            if (self.SelectedClass.ClassURL != '') {
                $(classDetailHolder).append(classURL);
            }

            if (self.SelectedClass.ELearningMessage != '') {
                $(classDetailHolder).append(eLearningMessage);
            }

            if (self.SelectedClass.ElearningURL != '') {
                $(classDetailHolder).append(eLearningURL);
            }

            if (self.SelectedClass.CorrespondenceNote != '') {
                $(classDetailHolder).append(correspondenceNote);
            }

            if (self.SelectedClass.InstructorMessage != '') {
                $(classDetailHolder).append(instructorMessageTitle);
                $(classDetailHolder).append(instructorMessage);
            }

            if (self.SelectedClass.InstructorURL != '') {
                $(classDetailHolder).append(instructorURL);
            }

            classDetailHolder.append(spacer);

            classDetailHolder.append(classSpecificsHolder).append(classMeetsHolder);

            var alsoMeets = $('<div>').html('This class also meets: ').addClass('classAlsoMeets');
            var registrationStatusHolder = $('<div>').addClass('registrationStatusHolder');


            if (labDetail.html() != '') {
                $(classDetailHolder)
                    .append(labDetail.prepend(alsoMeets));
            } else {

                $(labDetail).addClass('labDetail courseLabs');
                $(classDetailHolder)
                    .append(labDetail);
            }

            classDetailHolder
                .append($(popupDiv).addClass('class-tags-' + self.SelectedClass.ItemNumber + ' classTags'))
                .append($(popupDescriptionDiv).addClass('class-tags-desc-' + self.SelectedClass.ItemNumber + ' tagDesc').css({ 'position': 'absolute' }));

            registrationStatusHolder.append(status);

            classDetailHolder.append(registrationStatusHolder);


            //add register and favorites buttons here
            //Html.addCourseRegisterButtons(self.SelectedClass.ItemNumber, self.SelectedCourse.CourseId, myCampus.SelectedYRQ);
            //passing false below (true causes all but "selected class" to close)
            Html.addCourseButtons(false);




            //console.log(self.SelectedQuarter);
            var returningStudentDate = self.SelectedQuarter.ReturnStudentRegistrationBegin;
            var newStudentDate = self.SelectedQuarter.NewStudentRegistrationBegin;
            var registerDates = $('<div>').addClass('registerDates');

            registerDates
                .append(
                    $('<div>').addClass('registerDatesTitle').html('Register for this class beginning:')
                )
                .append(
                    $('<div>').addClass('registerDate').html('Returning Students - ' + returningStudentDate)
                )
                .append(
                    $('<div>').addClass('registerDate').html('New Students - ' + newStudentDate)
                );

            classSpecificsHolder.append(registerDates);
            //tags
            if (self.CampusCode == '063') {
                var tag;
                var popup;

                $.each(self.SelectedClass.NorthClassTags, function () {

                    var parseShortName = this.ShortName.replace('/', '');
                    parseShortName = parseShortName.replace(':', '');

                    popid = 'popup-'
                        + self.SelectedClass.ItemNumber
                        + parseShortName;
                    popid = popid.replace(/\s/g, '');

                    tag = $('<a data-rel = "popup">')
                        .attr({ href: '#' + popid, onclick: 'popIn( \'' + popid + '\'\, \'details\');' })
                        .addClass('ui-btn ui-corner-all ui-shadow ui-btn-inline classTag' + popid)
                        .html(this.ShortName);

                    popup = $('<div>')
                        .addClass('ui-popup-container custom-popup pop ui-popup-hidden')
                        .attr({ 'id': popid + '-popup', onclick: 'popOut( \'' + popid + '\' );' });

                    popup.append(
                        $('<div>').addClass('popup-title')
                            .append(
                                $('<a>').addClass('ui-btn ui-icon-delete ui-btn-icon-notext ui-corner-all right')
                                    .attr({ href: '#'})
                            ).append(this.ShortName)
                    ).append(this.Description);

                    $("div.class-tags-" + self.SelectedClass.ItemNumber).append(tag);
                    $("div.class-tags-desc-" + self.SelectedClass.ItemNumber).append(popup);
                });

            } else {

                var tag;
                var popup;

                $.each(self.SelectedClass.ClassTags, function () {
                    console.log('has a class tag');
                    popid = 'popup-'
                        + self.SelectedClass.ItemNumber
                        + ClassTagLegend.ClassTagList[this].ShortName;

                    popid = popid.replace(/\s/g, '');
                    var tag = $('<a data-rel = "popup">')
                        .attr({ href: '#' + popid, onclick: 'popIn( \'' + popid + '\'\, \'details\');' })
                        .addClass('ui-btn ui-corner-all ui-shadow ui-btn-inline classTag' + popid)
                        .html(ClassTagLegend.ClassTagList[this].ShortName);

                    var popup = $('<div>')
                        .addClass('ui-popup-container custom-popup pop ui-popup-hidden')
                        .attr({ 'id': popid + '-popup', onclick: 'popOut( \'' + popid + '\' );' });

                    popup.append(
                        $('<div>').addClass('popup-title')
                            .append(
                                $('<a>').addClass('ui-btn ui-icon-delete ui-btn-icon-notext ui-corner-all right')
                                    .attr({ href: '#' })
                            ).append(ClassTagLegend.ClassTagList[this].ShortName)
                    ).append(ClassTagLegend.ClassTagList[this].Description);

                    $("div.class-tags-" + self.SelectedClass.ItemNumber).append(tag);
                    $("div.class-tags-desc-" + self.SelectedClass.ItemNumber).append(popup);
                });

                if (self.SelectedClass.IsLinkedClass) {
                    console.log('is a linked class');
                    var linkClassesMarkup = $('<span>');
                    $.each(self.SelectedClass.LinkedClasses, function () {

                        linkClassesMarkup.append(
                            $('<p>').append($('<span>').text(this.ShortName))
                                .append($('<span>').text(this.Name))
                        );

                    });

                    popid = 'popup-'
                        + self.SelectedClass.ItemNumber
                        + this.ShortName;

                    popid = popid.replace(/\s/g, '');

                    tag = $('<a data-rel = "popup">')
                        .attr({ href: '#' + popid, title: 'Linked Classes', onclick: 'popIn( \'' + popid + '\'\, \'details\');' })
                        .addClass('ui-btn ui-corner-all ui-shadow ui-btn-inline classTag' + popid)
                        .html('LC');


                    popup = $('<div>')
                        .addClass('ui-popup-container custom-popup pop ui-popup-hidden')
                        .attr({ 'id': popid + '-popup', onclick: 'popOut( \'' + popid + '\' );' });

                    popup.append(
                        $('<div>').addClass('popup-title')
                            .append(
                                $('<a>').addClass('ui-btn ui-icon-delete ui-btn-icon-notext ui-corner-all right')
                                    .attr({ href: '#' })
                            ).append($('<span>').text('Linked Classes'))
                    ).append(linkClassesMarkup);

                    $("div.class-tags-" + self.SelectedClass.ItemNumber).append(tag);
                    $("div.class-tags-desc-" + self.SelectedClass.ItemNumber).append(popup);
                }
            }

            //add class fee codes
            console.log(self.SelectedClass.FeeCodes);
            if(self.SelectedClass.FeeCodes.length > 0){

                var FeeCodesHolder = $('<div>').addClass('feeCodesHolder');
                FeeCodesHolder.append($('<div>').addClass('feeCodesTitle').text("Additional Class Fees:"));

                $.each(self.SelectedClass.FeeCodes, function(){
                    //console.log(this);

                    if (this.Rate == ""
                        || this.Rate == "0"
                        || this.Rate == null
                        || this.Rate == undefined
                    ) {


                        FeeCodesHolder.append(
                            $('<div>').addClass('feeCode')
                                .append(
                                    $('<span>').addClass('code').html(this.ID)
                                ).append(
                                $('<span>').addClass('reason').html("See Registrar for specifics")
                            )
                        );

                    } else {
                        //console.log(this.ID);
                        var infoButton = $('<span>').addClass('infoButton');
                        if (this.ID == "cl" || this.ID == "CL") {
                            $(infoButton).addClass('labFeeInfoButton').attr({ 'data-feeinfo': '' + self.SelectedClass.ClassId }).html('<span class="ui-icon-info ui-btn-icon-notext"></span>')
                                .on('click', function () {
                                    console.log($(this).attr('data-feeinfo'));
                                    $('.labFeeInfoHolder.' + $(this).attr('data-feeinfo')).toggle();
                                });
                            //$(popupDescriptionDiv).append(
                            //$(FeeCodesHolder).append(
                            $(classSpecificsHolder).append(
                                $('<span style="display:none;">').addClass('labFeeInfoHolder ' + self.SelectedClass.ClassId).attr({ 'data-feeinfo': '' + self.SelectedClass.ClassId })
                                    .on('click', function () {
                                        $(this).toggle();
                                    })
                                    .append(
                                        $('<span>').addClass('labFeeInfo')
                                            .append($('<span>').addClass('labFeeInfoTitle').html('<a class="ui-btn ui-icon-delete ui-btn-icon-notext ui-corner-all right"></a>Computer Lab'))

                                            .append($('<span>').html('Fee covers costs associated with providing student use of campus computer-related technology and services.'))
                                            .append($('<span>').html('Fee is charged upon enrollment in a class requiring use of a computer lab or campus servers. The fee is charged per class up to a maximum of $' + this.MaxAmount + ' per quarter.'))
                                    )
                            );
                        }
                        FeeCodesHolder.append(
                            $('<div>').addClass('feeCode')
                                .append(
                                    $('<span>').addClass('code').html(this.ID)
                                ).append(
                                $('<span>').addClass('reason').html(this.FeeCodeTitle)
                            ).append(
                                $('<span>').addClass('fee').html("$" + this.Rate + " / " + this.UnitTitle).append(infoButton)
                            )
                        );

                    }



                });


                if(self.SelectedClass.Labs.length == 0  &&  self.SelectedClass.ClassTags == 0){
                    classMeetsHolder.append(FeeCodesHolder);
                } else {
                    classSpecificsHolder.append(FeeCodesHolder);
                }
            }



            //coordinatedStudiesDiv
            console.log(self.SelectedClass.SectionNumber);





        }
    }//end buildClassDetail




    this.showSearchBox = function(){
        $('#SearchInner').css('display', 'inline-block');
        $('#searchInput').focus();

        $("#searchInput").keyup(function (event) {
            if (event.keyCode == 13) {
                $("#btn-search").click();
            }
        });


        self.hideDatesBox();
    }


    this.hideSearchBox = function(){
        $('#SearchInner').css('display','none');
        $('#searchInput').blur();
    }


    this.hideDatesBox = function(){
        //check the state of the dates box
        if ($('#critical-dates #date-list').hasClass('ui-collapsible-content-collapsed')) {
            //the dates box is closed, do nothing with it
        } else {
            //the dates box is open, close it
            $('#critical-dates #date-list').addClass('ui-collapsible-content-collapsed');
        }
    }

    //if the user closes the opened dates list,
    //we need to close it up
    $('#critical-dates #date-list').click(function(){
        self.hideDatesBox();
    });



    this.toggleClassDetails = function(trigger) {
        console.log('toggleClassDetails');

        self.closeHeaderMenus();
        if ( $('#' + trigger).hasClass('closedCourse') ) {
            console.log('closed, open it');
            $('#' + trigger).removeClass('ui-icon-carat-d closedCourse');
            $('#' + trigger).addClass('ui-icon-carat-u');

            $('#' + trigger + ' .courseDetail').removeClass('closed').addClass('rebuildable');
            $('#' + trigger + ' .courseLabs').addClass('closed');
        } else {
            console.log('open, close it');
            $('#' + trigger).addClass('ui-icon-carat-d closedCourse');
            $('#' + trigger).removeClass('ui-icon-carat-u');

            $('#' + trigger + ' .courseDetail').addClass('closed');

            $('#' + trigger + ' .courseLabs').removeClass('closed');
            $('.' + trigger + '.classStatus').remove();
            $('#' + trigger).next().remove();
        }
    }






    this.setCookie = function(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays  * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    this.getCookie = function(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }


}

function setSelectedYRQ (yrqval) {
    myCampus.SelectedYRQ = yrqval;
    myCampus.setQuarter();
}

function shortFriendlyName (friendlyName) {
    var shortenedName = "";
    var  hyphen = friendlyName.indexOf(" ");
    shortenedName = friendlyName.substr(0, hyphen);
    return shortenedName;
}


function popIn( popid, trigger ) {
    $('#'+popid+'-popup').removeClass('out');
    $('#'+popid+'-popup').addClass('in');
    $('#'+popid+'-popup').addClass('ui-popup-active');
    $('#'+popid+'-popup').removeClass('ui-popup-hidden');
    if (trigger == 'details') {
        $('.ui-popup-container').css({'bottom': '10em'});
    } else {
        $('.ui-popup-container').css({ 'bottom': '1.5em'});
    }
}

function popOut(popid) {
    $('#'+popid+'-popup').removeClass('in');
    $('#'+popid+'-popup').addClass('out');
    $('#'+popid+'-popup').removeClass('ui-popup-active');
    $('#'+popid+'-popup').addClass('ui-popup-hidden');
    $('#'+popid+'-popup').removeClass('out');
}

//from filters.js
function reportSearchResult(searchtxt) {


    var searchResult = $('<span>').addClass('searchResult').text( searchtxt );

    if (isMobile()) {
        $('.filter-header span.filterButtonTitle').text('SEARCH RESULTS FOR: ');
        $('.filterReports').append(searchResult);

    } else {
        $('.filter-header span.filterButtonTitle').text('SEARCH RESULTS FOR: ').append(searchResult);
    }

}


function removeFilterReport(filter){
    var trigger = $( filter );
    trigger.attr({"checked" : false });
    var filterCount = 0;

    trigger.parent().remove();

    $('.filterReports a').each(function(){ filterCount ++; });
    if( filterCount <= 0  ){
        myCampus.resetFilterOptions("removeAll");
    }

    else if( $('input[name="'+ trigger.data('label') +'"]').attr('type') == 'radio' ){

        $('input[name="'+ trigger.data('label') +'"]').attr('checked' , 'false' ).checkboxradio("refresh");

        $('input[name="'+ trigger.data('label') +'"]:first').attr('checked' , 'checked' ).checkboxradio("refresh");

        $('input[name="'+ trigger.data('label') +'"]:first').click().checkboxradio("refresh").click();

        var replacementText = $('input[name="'+ trigger.data('label') +'"]:first').data('label');
        $('span.filterReport.' + trigger.data('label') ).html( replacementText );

        trigger.id ="ApplyFilter";

    } else if( $('input[name="'+ trigger.data('label') +'"]').attr('type') == 'checkbox' ){
        $('span.filterReport.' + trigger.data('label') ).html( 'None' );

        $('input[name="'+ trigger.data('label') +'"]').attr({"checked" : false });

        $('input[name="'+ trigger.data('label') +'"]').checkboxradio("refresh");

        $('span.filterReport.' + trigger.data('label') ).html( 'None' );
        trigger.id ="ApplyFilter";
    } else if( trigger.data('label') == 'instructor' ){
        //-- clear instructor option
        myCampus.Departments.FilterOptions.SelectedInstructorValue = -1;
        var theInstructorSelected = $('#filter-instructor');
        theInstructorSelected[0].selectedIndex = "-1";
        theInstructorSelected.selectmenu("refresh");
        $('#filter-instructor-button span').text('All');
    }

    //re-run the filters after they are reset
    myCampus.validateFilter(trigger);

}

function radioizeLargeFilter( trigger ) {
    if(trigger == 'instructor'){

    } else {
        var triggerName = $('input[name="'  +   trigger.name + '"]');
        if(trigger.checked == false){
            triggerName.each(function(){
                this.checked =false;
                $(this).checkboxradio("refresh");
            });

            $( '.filterReport.'+trigger.name ).html( 'None' );
        } else {
            triggerName.each(function(){
                this.checked = false;
                $(this).checkboxradio("refresh");
            });
            trigger.checked = true;
            $( '.filterReport.'+trigger.name ).html( $( trigger).data('label') );
        }

        if( $(trigger).hasClass('remove-filterHolder')  ){

        } else {
            $('h4.filterTitle.'+trigger.name ).click();
        }
    }
    checkReports();
}

//if we have filters to report,
//show the Apply Filters button
function checkReports(){
    var reportCounter = 0;
    /*
    if ($('#filter-instructor-button span').text() != 'All') {
        reportCounter++;
    }
    */

    if ($('#selectedInstructorHolder').text() != 'All') {
        //console.log('instructor not default');
        reportCounter++;
    }

    $('.filterReport').each( function(){
        //var filterValue = $(this).text().trim().toLowerCase();
        var filterValue = $.trim($(this).text()).toLowerCase();
        console.log(filterValue);
        if(  filterValue != "all" && filterValue != "none" && filterValue != "any") {
            reportCounter++;
        } else {

        }

    });

    console.log(reportCounter);

    if (reportCounter >= 1) {
        //console.log('got one');
        $('#ApplyFilter').css('display','block');
        $('#btn-close-filters').css('display','none');

    } else {
        if( isMobile() ){
            $('#btn-close-filters').css('display','block');
        }
        $('#ApplyFilter').css('display','none');
    }


}
//end from filters.js


//detectBrowser
var deviceAgent = navigator.userAgent.toLowerCase();

var isTouchDevice = Modernizr.touch || (
    deviceAgent.match(/(iphone|ipod|ipad)/) ||
    deviceAgent.match(/(android)/)  ||
    deviceAgent.match(/(iemobile)/) ||
    deviceAgent.match(/iphone/i) ||
    deviceAgent.match(/ipad/i) ||
    deviceAgent.match(/ipod/i) ||
    deviceAgent.match(/blackberry/i) ||
    deviceAgent.match(/bada/i)
);

var isEdge = navigator.userAgent.indexOf("Edge") > -1;
var isPortraitBrowser;
var windowWidth = $(window).width();
var windowHeight = $(window).height();

function isMobile(){
    var index = navigator.appVersion.indexOf("Mobile");
    //console.log(navigator);
    //console.log(deviceAgent);
    //console.log(index);
    //console.log(navigator.userAgent.indexOf("Edge") > -1);

    if (isTouchDevice &&  !isEdge) {
        index = 1;
        //console.log('isTouch');
    } else {
        //console.log('not touch');
    }

    if (myCampus.getCookie("tSessionId") != "") {
        //console.log("session set: " + myCampus.getCookie("tSessionId"));
        if (myCampus.getCookie("tSessionId") == "desktop") {
            index = -1;
        } else if (myCampus.getCookie("tSessionId") == "mobile") {
            index = 1;
        }
    } else {
        //console.log("session NOT set");
    }

    return (index > -1);
    //return true; //test mobile, set to true
}

var theBrowser = function(){
    var ua= navigator.userAgent, tem,
        M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if(/trident/i.test(M[1])){
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        console.log('ie');
        //return 'IE '+(tem[1] || '');
        return 'IE';
    }
    if(M[1]=== 'Chrome'){
        tem= ua.match(/\bOPR\/(\d+)/)
        if(tem!= null) return 'Opera '+tem[1];
    }
    M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
    return M.join(' ').toLowerCase();
}


//initially set portrait or landscape
if(windowWidth > windowHeight){
    isPortraitBrowser = false;
} else {
    isPortraitBrowser = true;
}


if(isMobile()){
    $('#SmallFiltersBtn').removeClass('show-for-small');

    //$('#large-filters  div:first-child').first().collapsible({ disabled: true });

    $('#footer-nav').removeClass('displayNone');
    $('#headerNavHolder').addClass('displayNone');
    $('#toggleTrigger .desktop').addClass('displayNone');

    $('body').append('<link rel="stylesheet" href="css/mobileClassSchedule.css" />')
        .append('<link rel="stylesheet" href="css/foundation-gridMobile.css" />')
        .append('<link rel="stylesheet" href="css/portal.css" />');

} else {
    //give the desktop view a minimum width
    $('body').css({'overflow':'auto', 'width': '100%', 'min-width':'961px', 'display':'block'});
    //$('section#home').css({'overflow':'auto', 'min-width':'750px', 'width': '100%', 'display':'block'});
    $('.large-4').css({ 'position': 'relative', 'width': '100%', 'padding':'0px' });
    $('.large-8').css({ 'position': 'relative', 'width': '63%' });
    $('#sidebar').css({'display':'inline-block','width':'30%', 'float':'left', 'margin-right':'1em', 'margin-left':'1em'});
    $('#filter-status').css({'display':'inline-block',  'width':'63%'});
    $('.aaInfoButton').css({ 'top': '.5em', 'right':'.5em'});
    $('#filterButtonHolder').css({'right':'1em', 'bottom':'.5em', 'display':'inline-block', 'float':'right'});
    $('body').append('<link rel="stylesheet" href="css/desktopClassSchedule.css" />')
        .append('<link rel="stylesheet" href="css/portal.css" />');


    $('#myclasses .mobile').remove();

    //DOUG - Why is this here? It's out of the flow for anything so there must be a reason it was put here.
    //a note would be nice
    //Html.buildClassPageForDesktop();

    $('#toggleTrigger .mobile').addClass('displayNone');

}

if ( theBrowser() == 'IE' && !isMobile() ) {
    $('body').append('<link rel="stylesheet" href="css/ieOnly.css" />');
}

/* if North wants to be special, let them do it
if (myCampus.CampusCode == '063') {
    $('body').append('<link rel="stylesheet" href="css/northClassSchedule.css" />');
} else {

}
*/


if ( isTouchDevice ) {

}







//set initial value of session cookie
if (myCampus.getCookie("tSessionId") != "") {
    //console.log(myCampus.getCookie("tSessionId"));
} else {
    myCampus.setCookie("tSessionId", "", 30);
}





