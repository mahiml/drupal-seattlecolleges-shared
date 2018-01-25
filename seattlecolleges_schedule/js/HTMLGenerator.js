// Up = &#9650;    \u25B2
// Down = &#9660;  \u25BC
// Left =
// Right = &#9654;


function Transaction(pArg) {
    var break1 = pArg.split('&');
    var data = new Array();
    for (var i = 0; i < break1.length; i++) {
        data.push(break1[i].split('=')[1]);
    }
    this.Idx = data[0];
    this.CustomerID = data[1] + 'S';
    this.TicketID = data[2];
    this.Amount = data[3];
    this.Quarter = data[4];
    this.Result = data[5];
    this.PassType = data[6];
}

function HTMLGenerator() {

    var self = this;


    this.buildFilters = function () {
        console.log('buildFilters');

        var filterHolder = $('<div>').attr({ 'id': 'large-filters' });

        var applyFiltersButton = $('<a>').attr({ 'id': 'ApplyFilter', 'tabindex': '0' })
            .on('click', function () { myCampus.validateFilter(this); return false; })
            .on('keydown', function (e) {
                var trigger = this;
                var keyCode = e.keyCode || e.which;
                console.log(keyCode);
                if (keyCode == 13) {
                    setTimeout(function () { trigger.click(); }, 5);
                }
            })
            .text('Apply Filters').appendTo(filterHolder);

        var closeFiltersButton = $('<a>').attr({ 'id': 'btn-close-filters' }).addClass('toggle-filters').text('Back to Department List').appendTo(filterHolder);

        var filterHeader = $('<h4>').attr({ 'id': 'filtersHeader' }).text('Filters:').appendTo(filterHolder);


        //Class Status
        var classStatusBlock = $('<div data-role="collapsible" data-collapsed="true">').appendTo(filterHolder);
        var classStatusFilterTitle = $('<h4>').addClass('filterTitle chkOpenOnly').text('Class Status').appendTo(classStatusBlock);
        var classStatusFilterItem = $('<span>').addClass('filter-items chkOpenOnly').text('Filter:').appendTo(classStatusFilterTitle);
        var classStatusFilterReport = $('<span>').addClass('filterReport chkOpenOnly').text('All').appendTo(classStatusFilterItem);
        var classStatusRow = $('<div>').addClass('row').appendTo(classStatusBlock);
        var classStatusFieldset = $('<fieldset data-role="controlgroup" data-iconpos="left">').appendTo(classStatusRow);
        var classStatusLabel = $('<label>').text('Open Classes Only').appendTo(classStatusFieldset);
        var classStatusInput = $('<input type="checkbox" name="chkOpenOnly" id="chkOpenOnly" data-label="Open Classes Only" value="1"  onclick="radioizeLargeFilter(this);">').appendTo(classStatusLabel);

        //Course Type
        var courseTypeBlock = $('<div data-role="collapsible">').appendTo(filterHolder);
        var courseTypeFilterTitle = $('<h4>').addClass('filterTitle course-type-small').text('Course Type').appendTo(courseTypeBlock);
        var courseTypeFilterItem = $('<span>').addClass('filter-items course-type-small').text('Filter:').appendTo(courseTypeFilterTitle);
        var courseTypeFilterReport = $('<span>').addClass('filterReport course-type-small').text('All').appendTo(courseTypeFilterItem);
        var courseTypeRow = $('<div>').appendTo(courseTypeBlock);
        var courseTypeFieldset = $('<fieldset data-role="controlgroup" data-iconpos="right">').appendTo(courseTypeRow);

        var courseTypeInput = $('<input type="radio" name="course-type-small" id="course-type-small-all" data-label="All" value="0" checked="checked" onclick="radioizeLargeFilter(this);">').appendTo(courseTypeFieldset);
        var courseTypeLabel = $('<label for="course-type-small-all">').text('All').appendTo(courseTypeFieldset);

        var courseTypeInput = $('<input type="radio" name="course-type-small" id="course-type-small-elearning" data-label="eLearning" value="1" onclick="radioizeLargeFilter(this);">').appendTo(courseTypeFieldset);
        var courseTypeLabel = $('<label for="course-type-small-elearning">').text('eLearning').appendTo(courseTypeFieldset);

        var courseTypeInput = $('<input type="radio" name="course-type-small" id="course-type-small-hybrid" data-label="Hybrid" value="2" onclick="radioizeLargeFilter(this);">').appendTo(courseTypeFieldset);
        var courseTypeLabel = $('<label for="course-type-small-hybrid">').text('Hybrid').appendTo(courseTypeFieldset);

        /*north campus bypass */
        if (myCampus.CampusCode != '063') {
            var courseTypeInput = $('<input type="radio" name="course-type-small" id="course-type-small-conted" data-label="Continuing Ed." value="3" onclick="radioizeLargeFilter(this);">').appendTo(courseTypeFieldset);
            var courseTypeLabel = $('<label for="course-type-small-conted">').attr({ 'id': 'label-course-type-small-conted' }).text('Continuing Ed.').appendTo(courseTypeFieldset);
        }

        //Credits
        var creditsBlock = $('<div data-role="collapsible">').appendTo(filterHolder);
        var creditsFilterTitle = $('<h4>').addClass('filterTitle credits-small').text('Credits').appendTo(creditsBlock);
        var creditsFilterItem = $('<span>').addClass('filter-items credits-small').text('Filter:').appendTo(creditsFilterTitle);
        var creditsFilterReport = $('<span>').addClass('filterReport credits-small').text('Any').appendTo(creditsFilterItem);
        var creditsRow = $('<div>').appendTo(creditsBlock);
        var creditsFieldset = $('<fieldset data-role="controlgroup" data-iconpos="right">').appendTo(creditsRow);

        var creditsInput = $('<input type="radio" name="credits-small" id="credits-small-0" data-label="Any" value="0" checked="checked" onclick="radioizeLargeFilter(this);">').appendTo(creditsFieldset);
        var creditsLabel = $('<label for="credits-small-0">').text('Any').appendTo(creditsFieldset);

        var creditsInput = $('<input type="radio" name="credits-small" id="credits-small-1" data-label="1 Credits" value="1" onclick="radioizeLargeFilter(this);">').appendTo(creditsFieldset);
        var creditsLabel = $('<label for="credits-small-1">').text('1 Credits').appendTo(creditsFieldset);

        var creditsInput = $('<input type="radio" name="credits-small" id="credits-small-2" data-label="2 Credits" value="2" onclick="radioizeLargeFilter(this);">').appendTo(creditsFieldset);
        var creditsLabel = $('<label for="credits-small-2">').text('2 Credits').appendTo(creditsFieldset);

        var creditsInput = $('<input type="radio" name="credits-small" id="credits-small-3" data-label="3 Credits" value="3" onclick="radioizeLargeFilter(this);">').appendTo(creditsFieldset);
        var creditsLabel = $('<label for="credits-small-3">').text('3 Credits').appendTo(creditsFieldset);

        var creditsInput = $('<input type="radio" name="credits-small" id="credits-small-4" data-label="4 Credits" value="4" onclick="radioizeLargeFilter(this);">').appendTo(creditsFieldset);
        var creditsLabel = $('<label for="credits-small-4">').text('4 Credits').appendTo(creditsFieldset);

        var creditsInput = $('<input type="radio" name="credits-small" id="credits-small-5" data-label="5 Credits" value="5" onclick="radioizeLargeFilter(this);">').appendTo(creditsFieldset);
        var creditsLabel = $('<label for="credits-small-5">').text('5 Credits').appendTo(creditsFieldset);

        var creditsInput = $('<input type="radio" name="credits-small" id="credits-small-6" data-label="6+ Credits" value="6" onclick="radioizeLargeFilter(this);">').appendTo(creditsFieldset);
        var creditsLabel = $('<label for="credits-small-6">').text('6+ Credits').appendTo(creditsFieldset);

        //Time
        var timeBlock = $('<div data-role="collapsible">').appendTo(filterHolder);
        var timeFilterTitle = $('<h4>').addClass('filterTitle time-small').text('Time').appendTo(timeBlock);
        var timeFilterItem = $('<span>').addClass('filter-items time-small').text('Filter:').appendTo(timeFilterTitle);
        var timeFilterReport = $('<span>').addClass('filterReport time-small').text('Any').appendTo(timeFilterItem);
        var timeRow = $('<div>').appendTo(timeBlock);
        var timeFieldset = $('<fieldset data-role="controlgroup" data-iconpos="right">').appendTo(timeRow);

        var timeInput = $('<input type="radio" name="time-small" id="time-small-any" data-label="Any" value="0" checked="checked" onclick="radioizeLargeFilter(this);">').appendTo(timeFieldset);
        var timeLabel = $('<label for="time-small-any">').text('Any').appendTo(timeFieldset);

        var timeInput = $('<input type="radio" name="time-small" id="time-small-morning" data-label="Morning" value="1" onclick="radioizeLargeFilter(this);">').appendTo(timeFieldset);
        var timeLabel = $('<label for="time-small-morning">').text('Morning').appendTo(timeFieldset);

        var timeInput = $('<input type="radio" name="time-small" id="time-small-afternoon" data-label="Afternoon" value="2" onclick="radioizeLargeFilter(this);">').appendTo(timeFieldset);
        var timeLabel = $('<label for="time-small-afternoon">').text('Afternoon').appendTo(timeFieldset);

        var timeInput = $('<input type="radio" name="time-small" id="time-small-evening" data-label="Evening" value="3" onclick="radioizeLargeFilter(this);">').appendTo(timeFieldset);
        var timeLabel = $('<label for="time-small-evening">').text('Evening').appendTo(timeFieldset);

        var timeInput = $('<input type="radio" name="time-small" id="time-small-weekend" data-label="Weekend" value="4" onclick="radioizeLargeFilter(this);">').appendTo(timeFieldset);
        var timeLabel = $('<label for="time-small-weekend">').text('Weekend').appendTo(timeFieldset);



        //Instructors
        var instructorBlock = $('<div>').attr({ 'id': 'instructors' }).addClass('ui-field-contain').appendTo(filterHolder);
        var instructorFilterTitle = $('<h5 style="font-size:1.25em;">').addClass('filterTitle credits-small').text('Instructor').appendTo(instructorBlock);

        /*
        var instructorFilterSelect = $('<select>').attr({ 'id': 'filter-instructor' }).appendTo(instructorBlock);
        var instructorFilterOption = $('<option value="-1">').appendTo(instructorBlock);
        */



        //AA Requirements
        var aaHeader = $('<div>').attr({ 'id': 'aaHeader' }).addClass('ui-field-contain').text('AA Transfer Degree Requirements').appendTo(filterHolder);
        var aaBlock = $('<div style="position:relative;">').appendTo(filterHolder);


        /* aa-reqs-popup basic */
        var aaReqHolder = $('<div>').addClass('large-12-columns aa-reqs-popup-description').appendTo(aaBlock);
        var aaPopUpHolder = $('<div>').addClass('ui-popup-container aa-reqs-popup pop ui-popup-hidden').attr({ 'id': 'aa-basic-legend-popup' }).on('click', function () { popOut('aa-basic-legend'); }).appendTo(aaReqHolder);
        var aaPopUpTitleHolder = $('<div>').addClass('popup-title').appendTo(aaPopUpHolder);
        var aaPopUpLink = $('<a>').attr({ 'href': '#' }).addClass('ui-btn ui-icon-delete ui-btn-icon-notext ui-corner-all right').appendTo(aaPopUpTitleHolder);


        var aaPopUpTitle = $('<h4>').text('Transfer AA Degree Requirements - Basic Requirements').appendTo(aaPopUpHolder);
        var aaPopUpBody = $('<div>').text('Courses that meet requirements for associates degrees and will transfer to four-year institutions within guidelines established by those schools.').appendTo(aaPopUpHolder);

        var aaPopUpTitle = $('<h4>').text('Quantitative / Symbolic Reasoning (QSR)').appendTo(aaPopUpHolder);
        var aaPopUpBody = $('<div>').text('Students completing the QSR requirement will be able to use quantitative or symbolic reasoning to understand, analyze, interpret and solve problems. Successful completion of these courses satisfies the QSR requirement for Seattle Colleges. These courses may also satisfy the QSR requirement at baccalaureate institutions. Always consult your advisor for exact details.').appendTo(aaPopUpHolder);



        /* aa-sr-legend-popup */
        var aaReqHolder = $('<div>').addClass('large-12-columns aa-reqs-popup-description').appendTo(aaBlock);
        var aaPopUpHolder = $('<div>').addClass('ui-popup-container aa-reqs-popup pop ui-popup-hidden').attr({ 'id': 'aa-sr-legend-popup' }).on('click', function () { popOut('aa-sr-legend'); }).appendTo(aaReqHolder);
        var aaPopUpTitleHolder = $('<div>').addClass('popup-title').appendTo(aaPopUpHolder);
        var aaPopUpLink = $('<a>').attr({ 'href': '#' }).addClass('ui-btn ui-icon-delete ui-btn-icon-notext ui-corner-all right').appendTo(aaPopUpTitleHolder);
        var aaPopUpTitle = $('<h4>').text('Transfer AA Degree Requirements - Special Requirements').appendTo(aaPopUpHolder);
        var aaPopUpBody = $('<div>').text('Courses that meet requirements for associates degrees and will transfer to four-year institutions within guidelines established by those schools.').appendTo(aaPopUpHolder);
        var aaPopUpBody2 = $('<p>').text('Within the 90 credits required for the A.A. degree, students must complete special requirements in Integrated Studies, Communication (COM), U.S. Culture (US) and Global Studies (GS) Students should consult their college advising office for a current listing of these courses. Specially designated courses that satisfy these requirements differ by college. Special designation credit for courses taken at one of the Seattle Colleges will transfer to other colleges in the district.').appendTo(aaPopUpBody);


        /* aa-aok-legend-popup */
        var aaReqHolder = $('<div>').addClass('large-12-columns aa-reqs-popup-description').appendTo(aaBlock);
        var aaPopUpHolder = $('<div>').addClass('ui-popup-container aa-reqs-popup pop ui-popup-hidden').attr({ 'id': 'aa-aok-legend-popup' }).on('click', function () { popOut('aa-aok-legend'); }).appendTo(aaReqHolder);
        var aaPopUpTitleHolder = $('<div>').addClass('popup-title').appendTo(aaPopUpHolder);
        var aaPopUpLink = $('<a>').attr({ 'href': '#' }).addClass('ui-btn ui-icon-delete ui-btn-icon-notext ui-corner-all right').appendTo(aaPopUpTitleHolder);
        var aaPopUpTitle = $('<h4>').text('Transfer AA Degree Requirements - Areas of Knowledge').appendTo(aaPopUpHolder);
        var aaPopUpBody = $('<div>').text('Courses that meet requirements for associates degrees and will transfer to four-year institutions within guidelines established by those schools.').appendTo(aaPopUpHolder);

        var aaPopUpTitle = $('<h4>').text('Visual, Literary and Performing Arts (VLPA)').appendTo(aaPopUpHolder);
        var aaPopUpBody = $('<div>').text('Choices must include a minimum of two different course prefixes. Always confer with your college advising office for more details.').appendTo(aaPopUpHolder);

        var aaPopUpTitle = $('<h4>').text('Individuals, Cultures, and Societies (ICS)').appendTo(aaPopUpHolder);
        var aaPopUpBody = $('<div>').text('Choices must include a minimum of two different course prefixes. Always confer with your college advising office for more details.').appendTo(aaPopUpHolder);

        var aaPopUpTitle = $('<h4>').text('The Natural World (NW)').appendTo(aaPopUpHolder);
        var aaPopUpBody = $('<div>').text('Choices must include a minimum of two different prefixes; 5 credits must be in a lab science. Always confer with your college advising office for more details.').appendTo(aaPopUpHolder);


        /* aa-is-legend-popup */
        var aaReqHolder = $('<div>').addClass('large-12-columns aa-reqs-popup-description').appendTo(aaBlock);
        var aaPopUpHolder = $('<div>').addClass('ui-popup-container aa-reqs-popup pop ui-popup-hidden').attr({ 'id': 'aa-is-legend-popup' }).on('click', function () { popOut('aa-is-legend'); }).appendTo(aaReqHolder);
        var aaPopUpTitleHolder = $('<div>').addClass('popup-title').appendTo(aaPopUpHolder);
        var aaPopUpLink = $('<a>').attr({ 'href': '#' }).addClass('ui-btn ui-icon-delete ui-btn-icon-notext ui-corner-all right').appendTo(aaPopUpTitleHolder);
        var aaPopUpTitle = $('<h4>').text('Transfer AA Degree Requirements - Integrated Studies').appendTo(aaPopUpHolder);
        var aaPopUpBody = $('<div>').text('Courses that meet requirements for associates degrees and will transfer to four-year institutions within guidelines established by those schools.').appendTo(aaPopUpHolder);

        var aaPopUpTitle = $('<h4>').text('Integrated Studies').appendTo(aaPopUpHolder);
        var aaPopUpBody = $('<div>').text('This class satisfies the Integrated Studies requirement for AA/AS degrees.').appendTo(aaPopUpHolder);




        /* Basic Requirements */
        var aaInfoButtonHolder = $('<span style="width:100%; height:1px; display:inline-block; position:relative; float:right; ">').addClass('aaInfoButtonHolder').appendTo(aaBlock);

        var aaRequirements = $('<div data-role="collapsible" data-collapsed="true">').attr({ 'id': 'aa-reqs' }).appendTo(aaBlock);
        var aaRequirementsTitle = $('<h4>').addClass('filterTitle aa-qsr').text('Basic Requirements').appendTo(aaRequirements);

        var aaInfoButton = $('<span style="width:24px;">').addClass('aaInfoButton').appendTo(aaInfoButtonHolder);
        var aaInfoButtonLink = $('<a data-rel="popup" data-role="button" data-icon="info" data-iconpos="notext" >').attr({ 'href': '#aa-basic-legend-popup' }).on('click', function () { popIn('aa-basic-legend', 300); }).addClass('info-icon').appendTo(aaInfoButton);

        var aaRequirementsFilterItem = $('<span>').addClass('filter-items').text('Filter:').appendTo(aaRequirementsTitle);
        var aaRequirementsFilterReport = $('<span>').addClass('filterReport aa-qsr').text('None').appendTo(aaRequirementsFilterItem);
        var aaRequirementsRow = $('<div>').addClass('row').appendTo(aaRequirements);
        var aaRequirementsFieldset = $('<fieldset data-role="controlgroup" data-iconpos="left">').appendTo(aaRequirementsRow);

        var aaRequirementsLabel = $('<label>').text('Quantitative / Symbolic Reasoning').appendTo(aaRequirementsFieldset);
        var aaRequirementsInput = $('<input type="checkbox" onclick="radioizeLargeFilter(this);" name="aa-qsr" id="aa-qsr" value="1" data-label="Quantitative / Symbolic Reasoning" title="Quantitative / Symbolic Reasoning">').appendTo(aaRequirementsLabel);






        /* Areas of Knowledge */
        var aaInfoButtonHolder = $('<span style="width:100%; height:1px; display:inline-block; position:relative; float:right; ">').addClass('aaInfoButtonHolder').appendTo(aaBlock);

        var aaRequirements = $('<div data-role="collapsible" data-collapsed="true">').attr({ 'id': 'aa-reqs-AOK' }).appendTo(aaBlock);
        var aaRequirementsTitle = $('<h4>').addClass('filterTitle aa-AOK').text('Areas of Knowledge').appendTo(aaRequirements);

        var aaInfoButton = $('<span style="width:24px;">').addClass('aaInfoButton').appendTo(aaInfoButtonHolder);
        var aaInfoButtonLink = $('<a data-rel="popup" data-role="button" data-icon="info" data-iconpos="notext" >').attr({ 'href': '#aa-aok-legend-popup' }).on('click', function () { popIn('aa-aok-legend', 300); }).addClass('info-icon').appendTo(aaInfoButton);

        var aaRequirementsFilterItem = $('<span>').addClass('filter-items').text('Filter:').appendTo(aaRequirementsTitle);
        var aaRequirementsFilterReport = $('<span>').addClass('filterReport aa-AOK').text('None').appendTo(aaRequirementsFilterItem);
        var aaRequirementsRow = $('<div>').addClass('row').appendTo(aaRequirements);
        var aaRequirementsFieldset = $('<fieldset data-role="controlgroup" data-iconpos="left">').appendTo(aaRequirementsRow);

        var aaRequirementsLabel = $('<label>').text('Visual, Literary, Performing Arts').appendTo(aaRequirementsFieldset);
        var aaRequirementsInput = $('<input type="checkbox" onclick="radioizeLargeFilter(this);" name="aa-AOK" id="aa-vlpa" value="1" data-label="Visual, Literary, Performing Arts" title="Visual, Literary, Performing Arts">').appendTo(aaRequirementsLabel);

        var aaRequirementsLabel = $('<label>').text('Individuals, Cultures, Societies').appendTo(aaRequirementsFieldset);
        var aaRequirementsInput = $('<input type="checkbox" onclick="radioizeLargeFilter(this);" name="aa-AOK" id="aa-isc" value="2" data-label="Individuals, Cultures, Societies" title="Individuals, Cultures, Societies">').appendTo(aaRequirementsLabel);

        var aaRequirementsLabel = $('<label>').text('The Natural World').appendTo(aaRequirementsFieldset);
        var aaRequirementsInput = $('<input type="checkbox" onclick="radioizeLargeFilter(this);" name="aa-AOK" id="aa-nw" value="3" data-label="The Natural World" title="The Natural World">').appendTo(aaRequirementsLabel);


        /* Special Requirements */
        var aaInfoButtonHolder = $('<span style="width:100%; height:1px; display:inline-block; position:relative; float:right; ">').addClass('aaInfoButtonHolder').appendTo(aaBlock);

        var aaRequirements = $('<div data-role="collapsible" data-collapsed="true">').attr({ 'id': 'aa-reqs-sr' }).appendTo(aaBlock);
        var aaRequirementsTitle = $('<h4>').addClass('filterTitle aa-sr').text('Special Requirements').appendTo(aaRequirements);


        var aaInfoButton = $('<span style="width:24px;">').addClass('aaInfoButton').appendTo(aaInfoButtonHolder);
        var aaInfoButtonLink = $('<a data-rel="popup" data-role="button" data-icon="info" data-iconpos="notext" >').attr({ 'href': '#aa-sr-legend-popup' }).on('click', function () { popIn('aa-sr-legend', 300); }).addClass('info-icon').appendTo(aaInfoButton);

        var aaRequirementsFilterItem = $('<span>').addClass('filter-items').text('Filter:').appendTo(aaRequirementsTitle);
        var aaRequirementsFilterReport = $('<span>').addClass('filterReport aa-sr').text('None').appendTo(aaRequirementsFilterItem);
        var aaRequirementsRow = $('<div>').addClass('row').appendTo(aaRequirements);
        var aaRequirementsFieldset = $('<fieldset data-role="controlgroup" data-iconpos="left">').appendTo(aaRequirementsRow);

        var aaRequirementsLabel = $('<label>').text('Communication').appendTo(aaRequirementsFieldset);
        var aaRequirementsInput = $('<input type="checkbox" onclick="radioizeLargeFilter(this);" name="aa-sr" id="aa-com" value="1" data-label="Communication" title="Communication">').appendTo(aaRequirementsLabel);

        var aaRequirementsLabel = $('<label>').text('U.S. Culture').appendTo(aaRequirementsFieldset);
        var aaRequirementsInput = $('<input type="checkbox" onclick="radioizeLargeFilter(this);" name="aa-sr" id="aa-us" value="2" data-label="U.S. Culture" title="U.S. Culture">').appendTo(aaRequirementsLabel);

        var aaRequirementsLabel = $('<label>').text('Global Studies').appendTo(aaRequirementsFieldset);
        var aaRequirementsInput = $('<input type="checkbox" onclick="radioizeLargeFilter(this);" name="aa-sr" id="aa-gs" value="3" data-label="Global Studies" title="Global Studies">').appendTo(aaRequirementsLabel);



        /* Integrated Studies */
        var aaInfoButtonHolder = $('<span style="width:100%; height:1px; display:inline-block; position:relative; float:right; ">').addClass('aaInfoButtonHolder').appendTo(aaBlock);

        var aaRequirements = $('<div data-role="collapsible" data-collapsed="true">').attr({ 'id': 'aa-reqs-is' }).appendTo(aaBlock);
        var aaRequirementsTitle = $('<h4>').addClass('filterTitle aa-is').text('Integrated Studies').appendTo(aaRequirements);

        var aaInfoButton = $('<span style="width:24px;">').addClass('aaInfoButton').appendTo(aaInfoButtonHolder);

        var aaInfoButtonLink = $('<a data-rel="popup" data-role="button" data-icon="info" data-iconpos="notext" >').attr({ 'href': '#aa-is-legend-popup' }).on('click', function () { popIn('aa-is-legend', 300); }).addClass('info-icon').appendTo(aaInfoButton);

        var aaRequirementsFilterItem = $('<span>').addClass('filter-items').text('Filter:').appendTo(aaRequirementsTitle);
        var aaRequirementsFilterReport = $('<span>').addClass('filterReport aa-is').text('None').appendTo(aaRequirementsFilterItem);
        var aaRequirementsRow = $('<div>').addClass('row').appendTo(aaRequirements);
        var aaRequirementsFieldset = $('<fieldset data-role="controlgroup" data-iconpos="left">').appendTo(aaRequirementsRow);

        var aaRequirementsLabel = $('<label>').text('Integrated Studies').appendTo(aaRequirementsFieldset);
        var aaRequirementsInput = $('<input type="checkbox" onclick="radioizeLargeFilter(this);" name="aa-is" id="aa-is" value="1" data-label="Integrated Studies" title="Integrated Studies">').appendTo(aaRequirementsLabel);


        filterHolder.appendTo($('#sidebar'));
    }


    this.showPopUp = function () {

        $.magnificPopup.open({
            items: {
                src: '#PopUp',
                type: 'inline'
            },
            showCloseBtn: false,
            closeOnBgClick: false,
            mainClass: 'holder'
        });
        $('.mfp-bg').css({ 'opacity': '.7' });
        //DOUG - removed as is unnecessary
        //$('#TuitionPopUp').appendTo( $('#PopUp') );//put the buttons at the bottom
        $('#TuitionPopUp div.closePopUp').on('click', function () { Html.hidePopUp(); });
        $('#PayNow').on('click', function (e) {
            e.preventDefault();
            user.initializePayment();
        });

        $('#PayLater').on('click', function () {
            console.log('PayLater');

            Html.showPayLater();
        });


    }


    this.hidePopUp = function(){
        //$('span.ui-btn.ok').remove();
        //$('span.ui-btn.cancel').remove();
        //$('#PopUpHolder').addClass('displayNone');
        //$('#PopUp').addClass('displayNone');
        $('#RegistrationResponseContainer').empty();
        $('.deleteMyFavorite').remove();
        $('.ok.ui-btn').remove();
        $('.cancel.ui-btn').remove();

        if( !$('#AccountInfoHolder').hasClass('displayNone') ){
            $('#AccountInfoHolder').addClass('displayNone');
        }
        if( !$('#TuitionPopUp').hasClass('displayNone') ){
            $('#TuitionPopUp').addClass('displayNone');
        }

        $.magnificPopup.close();

        //DOUG - I removed this as it is causing issues and it's not apparent why it's being done, it shouldn't be done.
        //var TuitionButtonsClone = $('#TuitionPopUp').clone();
        //$('#TuitionPopUp').remove();
        //$('#PopUp').append(TuitionButtonsClone);
    }


    this.showErrorPopUp = function( msg, title ){

        $.magnificPopup.open({
            items: {
                src: '#ErrorPopUp',
                type: 'inline'
            },
            showCloseBtn: true,
            closeOnBgClick: true,
            mainClass: 'holder'
        });
        $('.mfp-bg').css({'opacity': '.7'});
        var errorPopUp = $('#ErrorPopUp');
        var errorPopUpTitle = $('<h2>').addClass('errorPopUpTitle');

        if (title != null || title != undefined) {
            $(errorPopUpTitle).text( title );
        } else {
            $( errorPopUpTitle ).text('Error');
        }

        var content = $('<div>').addClass('errorPopUp').html( msg );
        var closeButton = $('<div>').addClass('closeButton').html('x').on('click', function(e){
            e.preventDefault();
            $.magnificPopup.close();
        });
        $( errorPopUp ).empty().append( closeButton ).append( errorPopUpTitle ).append( content );


    }


    this.validateDropPopUp = function(){

        $.magnificPopup.open({
            items: {
                src: '#ValidateDropPopUp',
                type: 'inline'
            },
            showCloseBtn: true,
            closeOnBgClick: true,
            mainClass: 'holder'
        });
        $('.mfp-bg').css({'opacity': '.7'});
        var validateDropPopUp = $('#ValidateDropPopUp');
        //var content = $('<div>').addClass('validateDropPopUp').html( msg );
        var closeButton = $('<div>').addClass('closeButton').html('x').on('click', function(e){
            e.preventDefault();
            $.magnificPopup.close();
        });
        //$( validateDropPopUp ).empty().append( closeButton );//.append( content );

    }


    this.showQuestionPopUp = function () {

        $.magnificPopup.open({
            items: {
                src: '#PopUpQuestion',
                type: 'inline'
            },
            showCloseBtn: false,
            closeOnBgClick: false,
            mainClass: 'holder'
        });
    }


    this.getCookie = function(name) {
        var dc = document.cookie;
        var prefix = name + "=";
        var begin = dc.indexOf("; " + prefix);
        if (begin == -1) {
            begin = dc.indexOf(prefix);
            if (begin != 0) return null;
        } else
            begin += 2;
        var end = document.cookie.indexOf(";", begin);
        if (end == -1)
            end = dc.length;
        return unescape(dc.substring(begin + prefix.length, end));
    } //-end getCookie


    this.RegisterStates = function(pValue){
        var rValue = 'none';
        switch(pValue){
            case 0:
                rValue = 'none'
                break;
            case 1:
                rValue = 'success'
                break;
            case 2:
                rValue = 'promptWaitList'
                break;
            case 3:
                rValue = 'promptCode'
                break;
            case 4:
                rValue = 'fail'
                break;
            case 5:
                rValue = 'errors'
                break;
        }
        return rValue;
    }


    this.ContinueRegistrationStates = function(pValue) {

        //    Public Enum ContinueRegistrationStates
        //        None = 0
        //        SuccessWithCode = 1
        //        SuccessWithWaitList = 2
        //        Fail = 3
        //        Errors = 4
        //    End Enum

        var rValue = 'none';
        switch (pValue) {
            case 0:
                rValue = 'none'
                break;
            case 1:
                rValue = 'successWithCode'
                break;
            case 2:
                rValue = 'successWithWaitList'
                break;
            case 3:
                rValue = 'fail'
                break;
            case 4:
                rValue = 'errors'
                break;
        }
        return rValue;
    }


    this.initQuarterSelector = function() {
        //used to build quarter options and set quarter friendly name into label
        //here-after any changes to these items will fire the Campus.quarterChanged event

        //DOUG - 4/16/2015
        //this is so messed up there isn't even an element with this ID anymore
        //$('#DdlQuarter').off();
        //$.each(myCampus.Quarters.QuarterList, function() {
        //    $('#DdlQuarter')
        //    .append($('<option>')
        //                .val(this.YRQ)
        //                .html(this.FriendlyName)
        //                .prop('selected', this.YRQ == myCampus.Quarters.DefaultQuarter ? true : false)
        //                .on('click', function() {
        //                    myCampus.quarterChanged(this);
        //                    var stopHere = '';
        //                }));
        //});

        $('#QuarterName').html(myCampus.SelectedQuarter.FriendlyName);




        //I'm just going to use this same area to populate the dropdown for quarter/tuition charges
        $('#DdlTuitionYRQ').empty();

        $('#DdlTuitionYRQ')
            .append($('<option>')
                .val('')
                .html('All Quarters'));

        $.each(myCampus.Quarters.QuarterList, function() {
            $('#DdlTuitionYRQ')
                .append($('<option>')
                    .val(this.YRQ)
                    .html(this.FriendlyName));
        });

        $('#DdlTuitionYRQ').selectmenu().selectmenu("refresh");
    }    //-end initQuarterSelector


    this.initProfile = function() {
        console.log('initProfile');

        $('.profileUpdateMessage').remove();
        $('#ProfilePopUp').empty();


        var controls = $('<div>').attr({'id': 'ProfileControls'});
        var msgHolder = $('<div>').addClass('profileUpdateMessage');

        var msgLine1 = $('<p>').addClass('profileUpdateMessage').html('The accuracy of your profile information is vital for us to serve your needs.');

        var msgLine2 = $('<p>').addClass('profileUpdateMessage').html('Please check your profile and update any information that is incorrect.');

        $( msgHolder ).append( msgLine1 ).append( msgLine2 );

        var phone = user.Profile.dPhone;
        phone = phone.replace(/\D/g,'');

        var phonePart1, phonePart2, phonePart3;
        phonePart1 = phone.slice(0,3);
        phonePart2 = phone.slice(3,6);
        phonePart3 = phone.slice(6,11);

        var newDPhone = "(" + phonePart1 + ") " + phonePart2 + "-" + phonePart3;

        var phone2 = user.Profile.ePhone;
        phone2 = phone2.replace(/\D/g,'');


        var phonePart1, phonePart2, phonePart3;
        phonePart1 = phone2.slice(0,3);
        phonePart2 = phone2.slice(3,6);
        phonePart3 = phone2.slice(6,11);

        var newEPhone = "(" + phonePart1 + ") " + phonePart2 + "-" + phonePart3;

        /*
		if( user.Profile.IsOutOfDate ){
			self.showProfileOutOfDateMessage();
		}*/

        $( controls )
            .append( $('<div>')
                .append( $('<span>').addClass( 'profileLabel' ).html('Name: ') )
                .append( $('<span>').html( user.Profile.Name ).addClass( 'profileName' ) )
            )
            .append( $('<div>')
                .append( $('<span>').addClass( 'profileLabel' ).html('Address: ') )
                .append( $('<span>').html( user.Profile.Address ).addClass( 'profileAddress' ) )
            )
            .append( $('<div>')
                .append( $('<span>').addClass( 'profileLabel' ).html('City: ') )
                .append( $('<span>').html( user.Profile.City ).addClass( 'profileCity' ) )
            )
            .append( $('<div>')
                .append( $('<span>').addClass( 'profileLabel' ).html('State: ') )
                .append( $('<span>').html( user.Profile.State ).addClass( 'profileState' ) )
            )
            .append( $('<div>')
                .append( $('<span>').addClass( 'profileLabel' ).html(' ZIP: ') )
                .append( $('<span>').html( user.Profile.Zip ).addClass( 'profileZip' ) )
            )
            .append( $('<div>')
                .append( $('<span>').addClass( 'profileLabel' ).html('Day Phone: ') )
                .append( $('<span>').html( newDPhone ).addClass( 'profileDPhone' ) )
            )
            .append( $('<div>')
                .append( $('<span>').addClass( 'profileLabel' ).html('Eve Phone: ') )
                .append( $('<span>').html( newEPhone ).addClass( 'profileEPhone' ) )
            )
            .append( $('<div>')
                .append( $('<span>').addClass( 'profileLabel' ).html('Email: ') )
                .append( $('<span>').html( user.Profile.Email ).addClass( 'profileEmail' ) )
            );
        $('#ProfilePopUp').append( msgHolder );
        $('#ProfilePopUp').append( controls );



        //$('#ProfileControlsHolder')
        $('#ProfilePopUp')
            .append($('<div>').addClass('profileUpdate')
                .append($('<button>')
                    .attr('type', 'button')
                    .text('Edit MyProfile')
                    .on('click', function() {
                        self.initProfileUpdate();
                    })
                )
                .append($('<button>').addClass('last')
                    .attr('type', 'button')
                    .text('MyProfile OK')
                    .on('click', function() {
                        user.myProfileOK( );
                        //self.closeMyCampusMenuDisplay(sectionReturnTo, sectionReturnTo);
                    })
                )
            );


    }


    this.initProfileUpdate = function() {
        console.log('show initProfileUpdate');
        //var setProfileUpdateButton = false;
        var setProfileUpdateButton = $('<span>').addClass('setProfileUpdateButton displayNone').html( 'false' );



        $('.profileUpdateMessage').remove();

        var msgLine1 = $('<p>').addClass('profileUpdateMessage').html('The accuracy of your profile information is vital for us to serve your needs.');

        var msgLine2 = $('<p>').addClass('profileUpdateMessage').html('Please check your profile and update any information that is incorrect.');

        //$('#ProfileControls').empty();
        $('.profileUpdate').remove();
        $('.profileInvalid').remove();

        $('#ProfilePopUp').empty();


        var title = $('<span>').addClass( 'profileTitle' ).text('Student Profile');
        $('#ProfilePopUp').append( title );


        $('<div>').attr({'id': 'ProfileControls'}).appendTo(  $('#ProfilePopUp')  );


        console.log( 'profile out of date: ' + user.Profile.IsOutOfDate );
        if( user.Profile.IsOutOfDate ){
            self.showProfileOutOfDateMessage('#ProfilePopUp');
        }

        var updateControls = $('<div>').attr({'id':'updateControls'});
        $( updateControls )
        //.append( msgLine1 )
        //.append( msgLine2 )
            .append( setProfileUpdateButton )
            .append( $('<div>')
                .append( $('<span>').html('Name: ') )
                .append( $('<span>').html( user.Profile.Name ) )
            )
            .append( $('<div>')
                .append( $('<span>').html('Address: ') )
                .append( $('<input>').attr({ 'type': 'text', 'id': 'TxProfileAddress', 'maxlength': '34', 'class': 'profileInput' }).val(user.Profile.Address)
                    .change(function(){ $( setProfileUpdateButton ).html( 'true'); console.log( $( setProfileUpdateButton ).html() );  }) )
            )
            .append( $('<div>')
                .append( $('<span>').html('City: ')
                )
                .append( $('<input>').attr({ 'type': 'text', 'id': 'TxProfileCity', 'maxlength': '24', 'class': 'profileInput' }).val(user.Profile.City)
                    .change(function(){ $( setProfileUpdateButton ).html( 'true'); console.log( $( setProfileUpdateButton ).html() );  }) )
            )
            .append( $('<div>')
                .append( $('<span>').html('State: ') )
                .append( $('<input>').attr({ 'type': 'text', 'id': 'TxProfileState', 'maxlength': '2', 'class': 'profileInput' }).val(user.Profile.State)
                    .change(function(){ $( setProfileUpdateButton ).html( 'true'); console.log( $( setProfileUpdateButton ).html() );  }) )
            )
            .append( $('<div>')
                .append( $('<span>').html('Zip: ') )
                .append( $('<input>').attr({ 'type': 'text', 'id': 'TxProfileZip', 'maxlength': '5', 'class': 'profileInput' }).val(user.Profile.Zip)
                    .change(function(){  $( setProfileUpdateButton ).html( 'true'); console.log( $( setProfileUpdateButton ).html() );  }) )
            )
            .append(
                $('<div>')
                    .append( $('<span>').html('Day Phone: ') )
                    .append( $('<input>').attr({ 'type': 'text', 'id': 'TxProfiledPhone', 'maxlength': '24', 'class': 'profileInput' }).val(user.Profile.dPhone)
                        .change(function(){ $( setProfileUpdateButton ).html( 'true'); console.log( $( setProfileUpdateButton ).html() );  }) )
            )
            .append( $('<div>')
                .append( $('<span>').html('Eve Phone: ') )
                .append( $('<input>').attr({ 'type': 'text', 'id': 'TxProfileePhone', 'maxlength': '24', 'class': 'profileInput' }).val(user.Profile.ePhone)
                    .change(function(){ $( setProfileUpdateButton ).html( 'true'); console.log( $( setProfileUpdateButton ).html() );   }) )
            )
            .append( $('<div>')
                .append( $('<span>').html('Email: ') )
                .append( $('<input>').attr({ 'type': 'text', 'id': 'TxProfileEmail', 'maxlength': '60', 'class': 'profileInput' }).val(user.Profile.Email)
                    .change(function(){  $( setProfileUpdateButton ).html( 'true'); console.log( $( setProfileUpdateButton ).html() );   }) )
            )

        $( updateControls ).appendTo('#ProfileControls');

        $('#ProfileControls').append( $('<div>').addClass('profileUpdate') );




        var profileUpdateButton = $('<button>').addClass('last update')
            .text('Update myProfile')
            .attr('type', 'button')
            .on('click', function() {
                console.log( $( setProfileUpdateButton ).html() );

                $('.profileInvalid').slideUp( 400, function(){
                    //$('.profileInvalid').remove();

                });


                if(  $( setProfileUpdateButton ).html() == 'true'   ){
                    //user.updateProfile();
                    $('.invalidUpdate').remove();
                    if( user.profileIsValid() ){
                        console.log('profile is valid ');
                        //user.validateProfileUpdate();

                        if( user.Profile.secQuestion == "" ){

                            if( user.securityQuestionIsValid() ){
                                user.updateProfileAndSecurityQuestion();

                            }
                        } else {
                            if( user.profileIsValid ){
                                user.updateProfile();
                            }
                        }
                    }

                } else {
                    var invalidProfileMessage = $('<div>').html('*No changes were made.').addClass('profileInvalid');
                    $('#ProfileControls').append( invalidProfileMessage );
                }
            });//.hide()

        var updateProfileAndQuestion = $('<button>').addClass('updateProfileAndQuestion')
            .text('Update my Profile')
            .attr('type', 'button')
            .on('click', function() {

                $('.invalidUpdate').remove();

                if( user.profileIsValid() ){
                    console.log('profile is valid ');

                    if( user.securityQuestionIsValid() ){
                        user.updateProfileAndSecurityQuestion();

                    }

                }

            });//.hide();

        var cancelButton = $('<button>').addClass('last cancel')
            .text('Cancel')
            .attr('type', 'button')
            .on('click', function() {
                //self.showProfile();
                //self.hideProfile();
            });//.hide();

        var myProfileOK = $('<button>').addClass('myProfileOK')
        //.text('MyProfile OK')
            .text('Profile is Correct')
            .attr('type', 'button')
            .on('click', function() {
                //self.initProfile();
                if( user.profileIsValid() ){
                    user.updateProfile();
                }
                //self.showProfile();
            });//.hide()




        $('#ProfileControls .profileUpdate')
            .append( myProfileOK )
            .append( cancelButton )
            .append( profileUpdateButton )
            .append( updateProfileAndQuestion );

        if(  user.Profile.IsOutOfDate && user.Profile.secQuestion != ""  ){
            console.log('cancel hide');
            $( cancelButton ).hide();
        } else {
            console.log('myProfileOK hide');
            //$( myProfileOK ).hide();
            $( cancelButton ).hide();
        }




        $('.profileInput').on('click', function(){

            console.log('profileInput clicked');
            if(  !$('button.updateProfileAndQuestion').is(':visible')  ){
                console.log('is NOT visible');
                $('button.update').show();
            } else {
                console.log('IS visible');

            }


            //$('button.myProfileOK').hide();
        });







        if( user.Profile.secQuestion == "" ){
            console.log('showSecQuestionOutOfDateMessage profileUpdateButton');
            self.showSecQuestionOutOfDateMessage();
            $( profileUpdateButton ).hide();
            $( myProfileOK ).hide();
            $( cancelButton ).show();
        } else {
            console.log('initSecretQuestion updateProfileAndQuestion');
            self.initSecretQuestion();
            $( updateProfileAndQuestion ).hide();
        }



    }


    this.showInvalidUpdate = function( trigger ){
        console.log( 'showInvalidUpdate' );

        var errorMessage = $('<span>').addClass('invalidUpdate').html('*Invalid');
        $( trigger ).parent().append( errorMessage );
    }


    this.initMyClassesDeskTop = function (trigger) {

        var container = $('#' + trigger);
        var withdrawnContainer = $('<div>').attr({ 'class': trigger + ' withdrawn' });

        $(container).empty();
        $('p.notActive').remove();

        var buildTheseClasses;

        var buttonContainer = $('<div>').addClass('buttonContainer');

        var regButton = $('<a>').addClass('registerButton')
            .append($('<span>').addClass('ui-btn-icon-left ui-icon-plus'))
            .append('Register Class');

        var dropButton = $('<a>').addClass('registerButton')
            .append($('<span>').addClass('ui-btn-icon-left ui-icon-minus'));
        //.append('Remove Class')


        var selectAll = $('<div>').addClass('classContainerSelectAll')
            .append(
                $('<input>').attr({ 'type': 'checkbox', 'id': 'selectAllCheckbox' }).val('selectAll')
                    .on('click', function () {
                        console.log('select all clicked');

                        if ($(this).prop("checked")) {
                            console.log('select all is checked');
                            $('#' + trigger + ' .classContainer input[type="checkbox"]').prop("checked", "checked");
                        } else {
                            $('#' + trigger + ' .classContainer input[type="checkbox"]').prop("checked", "");
                        }

                    })
            )
            .append($('<label>').attr({ 'for': 'selectAllCheckbox' }).html('Select All').addClass('selectAllCheckbox'));



        $('#tabHolder .tabTrigger.active').removeClass('active');
        $('#tabHolder .tabTrigger').each(function () {
            console.log($(this).data('tabtrigger') + ' : ' + trigger);
            var triggerName = $(this).data('tabtrigger') + 'Tab';
            console.log(triggerName);
            if (triggerName == trigger) {
                //console.log('set trigger: ' + $(this).attr('id') );
                $(this).addClass('active');
            }


        });


        if (trigger == 'myFavTab') {
            $(container).append(
                $('<p>').append(
                    $('<span>').html('My Favorites').addClass('notActiveTitle')
                )
                    .append(
                        $('<span>').html(' is for planning only. Classes shown here are ones that you have indicated your interest in.')
                    )
            )
                .append(
                    $('<p>').text('You are NOT REGISTERED for these classes and they are not reserved.')
                );
            buildTheseClasses = user.MyFavoriteClasses;
            $(dropButton).append('Remove from Favorites').css({ 'width': '230px' });
        }
        if (trigger == 'myRegTab') {
            $(container).append(
                $('<p>').append(
                    $('<span>').html('My Registered').addClass('notActiveTitle')
                )
                    .append(
                        $('<span>').html(' are classes for which you have REGISTERED. Please remember that your tuition must be paid in full by your payment due date to assure your seat in these classes.')
                    )
            )

            console.log('build regs');
            buildTheseClasses = user.RegisteredClasses;
            $('#tabHolder .tab').addClass('displayNone');
            $('#tabHolder #myRegTab').removeClass('displayNone');
            $(dropButton).append('Drop Registered Class').css({ 'width': '230px' });
        }
        if (trigger == 'myWaitTab') {
            $(container).append(
                $('<p>').append(
                    $('<span>').html('My Waitlist').addClass('notActiveTitle')
                )
                    .append(
                        $('<span>').html(' feature offers students a fair and consistent way to enroll in a full class if openings occur. Students who choose to be placed on a waitlist will be automatically enrolled in the class if space becomes available.')
                    )

            )
                .append(
                    $('<p>').html(' You may add or remove yourself from a waitlist on the web or in the Registration Office. Please remove your name if you no longer wish to be waitlisted. You will receive an email notification any time there is a change in your waitlist status so it is important your email address is current.')
                );

            buildTheseClasses = user.WaitListedClasses;


            $('#tabHolder .tab').addClass('displayNone');
            $('#tabHolder #myWaitTab').removeClass('displayNone');
            $(dropButton).append('Remove from Waitlist').css({ 'width': '230px' });
        }

        console.log(buildTheseClasses);
        //console.log(buildTheseClasses.length);

        //if (buildTheseClasses.length > 0 && !user.IsRegistrationBlocked) {
        if (buildTheseClasses.length > 0) {

            var goodClasses = buildTheseClasses.length;
            var withdrawnClasses = 0;
            $.each(buildTheseClasses, function () {
                console.log($(this)[0].IsWithdrawn);
                //$(this)[0].IsWithdrawn = true;
                if ($(this)[0].IsWithdrawn && trigger == 'myRegTab') { withdrawnClasses++; goodClasses--; }
                console.log(goodClasses);

            });

            if (goodClasses > 1) {
                console.log('add select all');
                $(container).append(selectAll);
            }

            $.each(buildTheseClasses, function () {
                console.log('got a class');
                var aClass = this;
                console.log(aClass);
                var classContainer = $('<div>').addClass('classContainer ' + aClass.ItemNumber);

                if (aClass.Meets.MeetDays == "ARRANGED") {
                    aClass.Meets.MeetDays = "ARR";
                }

                var meetTime = $('<span>').addClass('classMeetTime');
                if (aClass.Meets.StartTime != "ARR") {

                    $(meetTime)
                        .append(
                            $('<span>').html(aClass.Meets.StartTime).addClass('startTime')
                        )
                        .append(
                            $('<span>').html('&nbsp;-&nbsp; ').addClass('endTime')
                        )
                        .append(
                            $('<span>').html(aClass.Meets.EndTime).addClass('endTime')
                        );

                } else {
                    $(meetTime).append($('<span>').html('ARRANGED').addClass('startTime'));
                }


                var distanceLearningType = $('<span>').addClass('distanceLearningType');
                if (aClass.DistanceLearningType == 'None') {

                } else if (aClass.DistanceLearningType == 'TeleCourse') {

                    $(meetTime).empty().remove();
                    $(distanceLearningType).html('TeleCourse');

                } else if (aClass.DistanceLearningType == 'Hybrid') {

                    $(distanceLearningType).html('Hybrid: ');

                } else if (aClass.DistanceLearningType == 'Online') {

                    meetTime.empty().remove();
                    $(distanceLearningType).html('Online');

                } else if (aClass.DistanceLearningType == 'Seminar') {

                    $(distanceLearningType).html('Seminar');

                } else if (aClass.DistanceLearningType == 'Correspondence') {

                    $(meetTime).empty().remove();
                    $(distanceLearningType).html('Correspondence');

                } else if (aClass.DistanceLearningType == 'SelfPaced') {

                    $(meetTime).empty().remove();
                    $(distanceLearningType).html('Self-Paced');

                }



                if (aClass.IsWithdrawn && trigger == 'myRegTab') {
                    $(classContainer)
                        .append($('<input>').attr({ 'type': 'checkbox' })
                            .val(aClass.ItemNumber).css({ 'visibility': 'hidden' }));
                } else {
                    $(classContainer)
                        .append($('<input>').attr({ 'type': 'checkbox' }).val(aClass.ItemNumber));
                }



                $(classContainer)
                    .append($('<span>').html(aClass.CourseId).addClass('CourseId'))
                    .append($('<span>').html(aClass.CourseTitle).addClass('CourseTitle'))
                    .append($('<span>').html(aClass.Credits).addClass('Credits'))

                    .append(
                        $('<a>')
                            .addClass('ui-btn-icon-right ui-icon-carat-d ' + aClass.ItemNumber)
                            .on('click', function (e) {

                                var triggerPage = trigger;
                                var triggerClass = aClass.ItemNumber;
                                console.log('open the description: ' + trigger + ': ' + aClass.ItemNumber + ' : ' + aClass.CourseId);

                                self.toggleClassDescription(triggerPage, triggerClass, aClass);
                                e.preventDefault();
                            })
                    )
                    .append(
                        $('<span>').addClass('classMeets')
                            .append($('<span>').html(aClass.ItemNumber + '.').addClass('itemNumber'))
                            .append($('<span>').html(aClass.SectionNumber).addClass('sectionNumber'))

                            .append($('<span>').html(aClass.Meets.MeetDays).addClass('meetDays'))

                            .append(
                                $('<span>').addClass('classTimeType')
                                    .append(
                                        distanceLearningType
                                    )
                                    .append(
                                        meetTime
                                    )

                            )
                        //.append( $('<span>').html( aClass.Status ).addClass('status') )

                    );

                if (aClass.Labs.length > -1) {

                    var labDetail = $('<div>').addClass('labDetail');
                    $.each(aClass.Labs, function () {
                        var labTitle = $('<div>').addClass('labTitle').html('Lab:');
                        var labTime = $('<div>').addClass('labTime').html(this.LabTime);


                        //if(this.LabDays.trim() == 'ARR-ARR'){ this.labDays = 'ARR'}
                        if ($.trim(this.LabDays) == 'ARR-ARR') { this.labDays = 'ARR' }


                        var labDays = $('<div>').addClass('labDays').html(this.LabDays);

                        var buildingRoom = $('<div>').addClass('buildingRoom');

                        if (myCampus.CampusCode == '063') {
                            buildingRoom.append($('<a>').addClass('location')
                                .attr({
                                    href: "http://northseattle.edu/locator/locate/" + this.RoomLocationParameter.toLowerCase(),
                                    target: "_Blank"
                                }).html(this.Building + ' ' + this.Room)
                            );
                        } else {
                            $(buildingRoom).html(this.Building + ' ' + this.Room);
                        }

                        console.log(buildingRoom);

                        $(labDetail).addClass(aClass.ItemNumber)
                            .append($('<span>').html('Also Meets: ').addClass('alsoMeets'))
                            .append(labDays)
                            .append(labTime);
                        //.append( buildingRoom.html() );

                        $(classContainer).append(labDetail);
                    });
                }

                if (trigger == 'myWaitTab') {
                    $(classContainer)
                        .append($('<span>').html('Position: ' + aClass.EnrollmentInfo.Position).addClass('position'));
                }

                if (aClass.IsWithdrawn && trigger == 'myRegTab') {
                    console.log('withdrawn');

                    $(classContainer)
                        .append($('<span>').css({ 'padding-left': '1em', 'margin-top': '1em', 'width': '100%', 'display': 'block', 'color': 'red'}).html('Class Withdrawn'));

                    $(classContainer).appendTo(withdrawnContainer);
                } else {
                    $(classContainer).appendTo(container);
                }

            });


            $(container).append(buttonContainer);

            if (buildTheseClasses.length > 0) {
                if (trigger == 'myFavTab') {
                    $(dropButton).on('click', function () {
                        if ($('#myFavTab .classContainer input:checked').length > 0) {
                            //self.validateDeleteMyFavorites();
                            self.validateDeleteMyRegistered('fav');
                        }
                    });

                    $(regButton).on('click', function () {
                        if ($('#myFavTab .classContainer input:checked').length > 0) {
                            //user.initRegistration();
                            self.showAgreementMessage();
                        }
                    });


                    //DOUG - Updated to only check registration appointment date
                    //to allow veterans to register early
                    //I left this here simply because it can be useful when
                    //testing and don't want to contact registrar because student isn't setup correctly
                    //if (myCampus.SelectedQuarter.IsRegistrationOpen) {
                    //if (myCampus.SelectedQuarter.IsRegistrationOpen && user.RegAppointment.IsPastAppointment) {

                    //remove for production
                    //myCampus.SelectedQuarter.IsRegistrationOpen = true;

                    //Doug - 11/2015 - removing reg appt requirement
                    //if (user.RegAppointment.IsPastAppointment && myCampus.SelectedQuarter.IsRegistrationOpen) {
                    if (myCampus.SelectedQuarter.IsRegistrationOpen) {
                        $(buttonContainer).append(dropButton);
                        if(!user.IsRegistrationBlocked){$(buttonContainer).append(regButton);}
                    } else {
                        $(buttonContainer).append(dropButton);
                    }
                }

                if (trigger == 'myRegTab' && goodClasses > 0) {
                    $(dropButton).on('click', function () {
                        if ($('#myRegTab .classContainer input:checked').length > 0) {
                            self.validateDeleteMyRegistered('reg');
                        }
                    })
                    $(buttonContainer).append(dropButton);
                }

                if (trigger == 'myWaitTab') {
                    $(dropButton).on('click', function () {

                        if ($('#myWaitTab .classContainer input:checked').length > 0) {
                            self.validateDeleteMyRegistered('wait');
                            //self.validateDeleteMyWaitlist();
                        }

                    })
                    $(buttonContainer).append(dropButton);
                }
            }

            if (withdrawnClasses > 0) {
                $(withdrawnContainer).appendTo(container);
            }


        } else {

            if (user.IsRegistrationBlocked) {

                if (trigger == 'myFavTab') {

                    $(container).append($('<div>').addClass('noListedClass').html('You have no Favorite  Classes this quarter.'));
                }

                if (trigger == 'myRegTab') {
                    /*
	                $(container).append($('<div>').addClass('noListedClass').html('Your account status blocks access to registered classes in this view. You may view your scheduled classes on your "' + myCampus.myCampusName + '" page.'));
                    */
                    $(container).append($('<div>').addClass('noListedClass viewBlockedSchedule').html('Students with registration blocks may view their schedules <button id="viewBlockedSchedule" onclick="viewBlockedSchedule(); return false;">here</button>'));
                }

                if (trigger == 'myWaitTab') {

                    $(container).append($('<div>').addClass('noListedClass').html('Your account status blocks access to wait list classes in this view.'));
                }

            } else {

                if (trigger == 'myFavTab') {

                    $(container).append($('<div>').addClass('noListedClass').html('You have no Favorite  Classes this quarter.'));
                }

                if (trigger == 'myRegTab') {

                    $(container).append($('<div>').addClass('noListedClass').html('You have no Registered Classes this quarter.'));

                }

                if (trigger == 'myWaitTab') {

                    $(container).append($('<div>').addClass('noListedClass').html('You have no Waitlisted Classes this quarter.'));

                }
            }
        }
    }

    this.initMyClassesMobile = function (trigger) {
        console.log('initMyClassesMobile: ' + trigger);
        var container = $('#' + trigger + 'Controls');
        var withdrawnContainer = $('<div>').attr({ 'class': trigger + ' withdrawn' });

        //ga('send', 'event', [eventCategory], [eventAction], [eventLabel], [eventValue], [fieldsObject]);
        ga('send', 'event', 'My Classes Mobile', 'View '+ trigger);


        $(container).empty().addClass('myclasses');
        $('p.notActive').remove();

        var buildTheseClasses = '';
        var selectAllID = ''; var selectAllContainer = '';
        var triggerPage = '';
        var buttonContainer = $('<div>').addClass('buttonContainer');

        var regButton = $('<a>').addClass('registerButton')
            .append($('<span>').addClass('ui-btn-icon-left ui-icon-plus'))
            .append('Register Classes');

        var dropButton = $('<a>').addClass('registerButton dropButton')
            .append($('<span>').addClass('ui-btn-icon-left ui-icon-minus'));
        //.append('Remove Class')


        if (trigger == 'MyFavorites') {
            $(container).append(
                $('<p>').addClass('noListedClass').append(
                    $('<span>').html('My Favorites').addClass('notActiveTitle')
                )
                    .append(
                        $('<span>').html(' is for planning only. Classes shown here are ones that you have indicated your interest in.')
                    )
            )
                .append(
                    $('<p>').addClass('noListedClass').text('You are NOT REGISTERED for these classes and they are not reserved.')
                );

            ga('send', 'pageview', '/viewFavorites');
            console.log('build favs');
            buildTheseClasses = user.MyFavoriteClasses;
            selectAllID = 'myFavSelect';
            selectAllContainer = 'MyFavoritesControls';
            triggerPage = 'MyFavoritesControls';
            $(dropButton).append('Remove from Favorites');
        }
        if (trigger == 'RegisteredItems') {
            $(container).append(
                $('<p>').addClass('noListedClass').append(
                    $('<span>').html('My Registered').addClass('notActiveTitle')
                )
                    .append(
                        $('<span>').html(' are classes for which you have REGISTERED. Please remember that your tuition must be paid in full by your payment due date to assure your seat in these classes.')
                    )
            );

            ga('send', 'pageview', '/viewSchedule');

            console.log('build regs');
            buildTheseClasses = user.RegisteredClasses;
            selectAllID = 'myRegSelect';
            selectAllContainer = 'RegisteredItemsControls';
            triggerPage = 'RegisteredItemsControls';
            $(dropButton).append('Drop Registered Class');
        }
        if (trigger == 'WaitListItems') {

            $(container).append(
                $('<p>').addClass('noListedClass').append(
                    $('<span>').html('My Waitlist').addClass('notActiveTitle')
                )
                    .append(
                        $('<span>').html(' feature offers students a fair and consistent way to enroll in a full class if openings occur. Students who choose to be placed on a waitlist will be automatically enrolled in the class if space becomes available.')
                    )

            )
                .append(
                    $('<p>').addClass('noListedClass').html(' You may add or remove yourself from a waitlist on the web or in the Registration Office. Please remove your name if you no longer wish to be waitlisted. You will receive an email notification any time there is a change in your waitlist status so it is important your email address is current.')
                );

            ga('send', 'pageview', '/viewWaitlist');

            buildTheseClasses = user.WaitListedClasses;
            selectAllID = 'myWaitSelect';
            selectAllContainer = 'WaitListItemsControls';
            triggerPage = 'WaitListItemsControls';
            $(dropButton).append('Remove from Waitlist');
        }



        console.log(buildTheseClasses);
        //console.log(buildTheseClasses.length );

        if (buildTheseClasses.length > 0) {

            //console.log("greater than 0");

            if (buildTheseClasses.length > 1) {

                //console.log("greater than 1");

                console.log('add select all');

                var selectAll = $('<div>').addClass('classContainerSelectAll')
                    .append(
                        $('<input>').attr({ 'type': 'checkbox', 'id': selectAllID }).val('Select All')

                            .on('click', function () {
                                console.log('select all clicked');
                                //$('input#favoritesItemSelect').click();



                                if ($(this).prop("checked")) {
                                    console.log('select all is checked');
                                    $('#' + selectAllContainer + ' .classContainer input[type="checkbox"]').prop("checked", "checked");
                                } else {
                                    $('#' + selectAllContainer + ' .classContainer input[type="checkbox"]').prop("checked", "");
                                }

                            })
                    )
                    .append(
                        $('<label>').addClass('selectAll').attr('for', selectAllID).html('Select All')
                    );

                //$(container).append(selectAll);
            }




            var goodClasses = buildTheseClasses.length;
            var withdrawnClasses = 0;
            $.each(buildTheseClasses, function () {
                console.log($(this)[0].IsWithdrawn);
                //$(this)[0].IsWithdrawn = true;
                if ($(this)[0].IsWithdrawn && trigger == 'RegisteredItems') { withdrawnClasses++; goodClasses--; }
                console.log(goodClasses);

            });

            if (goodClasses > 1) {
                console.log('add select all');
                $(container).append(selectAll);
            }

            $.each(buildTheseClasses, function () {
                console.log('got a class');
                var aClass = this;
                console.log(aClass);
                var classContainer = $('<div>').addClass('classContainer ' + aClass.ItemNumber);

                if (aClass.Meets.MeetDays == "ARRANGED") {
                    aClass.Meets.MeetDays = "ARR";
                }

                var meetTime = $('<span>').addClass('classMeetTime');
                if (aClass.Meets.StartTime != "ARR") {

                    $(meetTime)
                        .append(
                            $('<span>').html(aClass.Meets.StartTime).addClass('startTime')
                        )
                        .append(
                            $('<span>').html('&nbsp;-&nbsp; ').addClass('endTime')
                        )
                        .append(
                            $('<span>').html(aClass.Meets.EndTime).addClass('endTime')
                        );

                } else {
                    $(meetTime).append($('<span>').html('ARRANGED').addClass('startTime'));
                }


                var distanceLearningType = $('<span>').addClass('distanceLearningType');
                if (aClass.DistanceLearningType == 'None') {

                } else if (aClass.DistanceLearningType == 'TeleCourse') {

                    $(meetTime).empty().remove();
                    $(distanceLearningType).html('TeleCourse');

                } else if (aClass.DistanceLearningType == 'Hybrid') {

                    $(distanceLearningType).html('Hybrid: ');

                } else if (aClass.DistanceLearningType == 'Online') {

                    meetTime.empty().remove();
                    $(distanceLearningType).html('Online');

                } else if (aClass.DistanceLearningType == 'Seminar') {

                    $(distanceLearningType).html('Seminar');

                } else if (aClass.DistanceLearningType == 'Correspondence') {

                    $(meetTime).empty().remove();
                    $(distanceLearningType).html('Correspondence');

                } else if (aClass.DistanceLearningType == 'SelfPaced') {

                    $(meetTime).empty().remove();
                    $(distanceLearningType).html('Self-Paced');
                }

                /*
	            $(classContainer)
                        .append($('<input>').attr({ 'type': 'checkbox' }).val(aClass.ItemNumber))
                */


                if (aClass.IsWithdrawn && trigger == 'RegisteredItems') {
                    $(classContainer)
                        .append($('<input>').attr({ 'type': 'checkbox' })
                            .val(aClass.ItemNumber).css({ 'visibility': 'hidden' }));
                } else {
                    $(classContainer)
                        .append($('<input>').attr({ 'type': 'checkbox' }).val(aClass.ItemNumber));
                }


                $(classContainer)
                    .append($('<span>').html(aClass.CourseId).addClass('CourseId'))
                    .append($('<span>').html(aClass.CourseTitle).addClass('CourseTitle'))
                    .append($('<span>').html(aClass.Credits).addClass('Credits'))

                    .append(
                        $('<a>')
                            .addClass('ui-btn-icon-right ui-icon-carat-d ' + aClass.ItemNumber)
                            .on('click', function (e) {

                                var triggerClass = aClass.ItemNumber;
                                console.log('open the description: ' + trigger + ': ' + aClass.ItemNumber + ' : ' + aClass.CourseId);

                                self.toggleClassDescription(triggerPage, triggerClass, aClass);
                                e.preventDefault();
                            })
                    )
                    .append(
                        $('<span>').addClass('classMeets')
                            .append($('<span>').html(aClass.ItemNumber + '.').addClass('itemNumber'))
                            .append($('<span>').html(aClass.SectionNumber).addClass('sectionNumber'))

                            .append($('<span>').html(aClass.Meets.MeetDays).addClass('meetDays'))

                            .append(
                                $('<span>').addClass('classTimeType')
                                    .append(
                                        distanceLearningType
                                    )
                                    .append(
                                        meetTime
                                    )

                            )
                        //.append($('<span>').html(aClass.Status).addClass('status'))

                    );

                if (aClass.Labs.length > -1) {

                    var labDetail = $('<div>').addClass('labDetail');
                    $.each(aClass.Labs, function () {
                        var labTitle = $('<div>').addClass('labTitle').html('Lab:');
                        var labTime = $('<div>').addClass('labTime').html(this.LabTime);


                        //if (this.LabDays.trim() == 'ARR-ARR') { this.labDays = 'ARR' }
                        if ($.trim(this.LabDays) == 'ARR-ARR') { this.labDays = 'ARR' }


                        var labDays = $('<div>').addClass('labDays').html(this.LabDays);

                        var buildingRoom = $('<div>').addClass('buildingRoom');

                        if (myCampus.CampusCode == '063') {
                            buildingRoom.append($('<a>').addClass('location')
                                .attr({
                                    href: "http://northseattle.edu/locator/locate/" + this.RoomLocationParameter.toLowerCase(),
                                    target: "_Blank"
                                }).html(this.Building + ' ' + this.Room)
                            );
                        } else {
                            $(buildingRoom).html(this.Building + ' ' + this.Room);
                        }

                        console.log(buildingRoom);

                        $(labDetail).addClass(aClass.ItemNumber)
                            .append($('<span>').html('Also Meets: ').addClass('alsoMeets'))
                            .append(labDays)
                            .append(labTime);
                        //.append( buildingRoom.html() );

                        $(classContainer).append(labDetail);
                    });
                }

                //$(classContainer).appendTo(container);

                if (aClass.IsWithdrawn && trigger == 'RegisteredItems') {

                    $(classContainer)
                        .append(
                            $('<span>')
                                .addClass('classWithdrawn')
                                //.css({ 'padding-left': '1em', 'margin-top': '1em', 'width': '100%', 'display': 'block', 'color': 'red' })
                                .html('Class Withdrawn')
                        );

                    $(classContainer).appendTo(withdrawnContainer);
                } else {
                    $(classContainer).appendTo(container);
                }


            });


            //$(container).append(buttonContainer);

            if (goodClasses >= 1) {
                console.log('add button');
                $(container).append(buttonContainer);
            }

            if (buildTheseClasses.length > 0) {
                if (trigger == 'MyFavorites') {
                    $(dropButton).on('click', function () {
                        if ($('#MyFavoritesControls .classContainer input:checked').length > 0) {
                            //self.validateDeleteMyFavorites();
                            self.validateDeleteMyRegistered('fav');
                        }
                    });

                    $(regButton).on('click', function () {
                        if ($('#MyFavoritesControls .classContainer input:checked').length > 0) {
                            //user.initRegistration();
                            self.showAgreementMessage();
                        }
                    });

                    //DOUG - Updated to only check registration appointment date
                    //to allow veterans to register early
                    //I left this here simply because it can be useful when
                    //testing and don't want to contact registrar because student isn't setup correctly
                    //if (myCampus.SelectedQuarter.IsRegistrationOpen) {

                    //Doug - 11/2015 - removing reg appt requirement
                    //if (myCampus.SelectedQuarter.IsRegistrationOpen && user.RegAppointment.IsPastAppointment) {
                    //if (user.RegAppointment.IsPastAppointment) {
                    //if (myCampus.SelectedQuarter.IsRegistrationOpen) {
                    //    $(buttonContainer).append(dropButton).append(regButton);
                    //} else {
                    //    $(buttonContainer).append(dropButton);
                    //}


                    if (myCampus.SelectedQuarter.IsRegistrationOpen) {
                        $(buttonContainer).append(dropButton);
                        if(!user.IsRegistrationBlocked){$(buttonContainer).append(regButton);}
                    } else {
                        $(buttonContainer).append(dropButton);
                    }




                }

                if (trigger == 'RegisteredItems') {
                    $(dropButton).on('click', function () {
                        if ($('#RegisteredItemsControls .classContainer input:checked').length > 0) {
                            self.validateDeleteMyRegistered('reg');
                        }
                    })
                    $(buttonContainer).append(dropButton);
                }

                if (trigger == 'WaitListItems') {
                    $(dropButton).on('click', function () {

                        if ($('#WaitListItemsControls .classContainer input:checked').length > 0) {
                            self.validateDeleteMyRegistered('wait');
                            //self.validateDeleteMyWaitlist();
                        }

                    })
                    $(buttonContainer).append(dropButton);
                }

                if (withdrawnClasses > 0) {
                    $(withdrawnContainer).appendTo(container);
                }

            }

        } else {


            //console.log("NOT greater than 0");

            if (user.IsRegistrationBlocked) {

                if (trigger == 'MyFavorites') {

                    $(container).append($('<div>').addClass('noListedClass').html('You have no Favorite Classes this quarter.'));
                }

                if (trigger == 'RegisteredItems') {
                    /*
	                $(container).append($('<div>').addClass('noListedClass').html('Your account status blocks access to registered classes in this view.'));
                    */
                    $(container).append($('<div>').addClass('noListedClass viewBlockedSchedule').html('Students with registration blocks may view their schedules <button id="viewBlockedSchedule" onclick="viewBlockedSchedule(); return false;">here</button>'));


                }

                if (trigger == 'WaitListItems') {

                    $(container).append($('<div>').addClass('noListedClass').html('Your account status blocks access to wait list classes in this view.'));

                }
            } else {
                if (trigger == 'MyFavorites') {

                    $(container).append($('<div>').addClass('noListedClass').html('You have no Favorite Classes this quarter.'));
                }

                if (trigger == 'RegisteredItems') {

                    $(container).append($('<div>').addClass('noListedClass').html('You have no Registered Classes this quarter.'));

                }

                if (trigger == 'WaitListItems') {

                    $(container).append($('<div>').addClass('noListedClass').html('You have no Waitlisted Classes this quarter.'));

                }
            }

        }

    }





    this.toggleClassDescription = function( triggerPage, triggerClass, classId ){

        console.log( 'toggleClassDescription: ' + triggerPage );
        if(  $( '#'+triggerPage + ' .classContainer .' + triggerClass ).hasClass( 'ui-icon-carat-d' ) ){
            console.log( 'open class' );
            $( '#'+triggerPage + ' .classContainer .' + triggerClass ).removeClass( 'ui-icon-carat-d' ).addClass( 'ui-icon-carat-u');

            myCampus.getDescriptionAndEnrollmentMyClassesDesktop( triggerPage, triggerClass,  classId  );
            $( '#'+triggerPage + ' .classContainer.' + triggerClass + ' .classMeets').hide();
            $( '#'+triggerPage + ' .classContainer.' + triggerClass + ' .labDetail').hide();


        } else {

            $('.classContainer.' +  triggerClass + ' .classDescription' ).slideUp( 400, function(){
                $('.classContainer.' +  triggerClass + ' .classDescription').remove();

                $( '#'+triggerPage + ' .classContainer.' + triggerClass + ' .classMeets').show();
                $( '#'+triggerPage + ' .classContainer.' + triggerClass + ' .labDetail').show();

                $( '#'+triggerPage + ' .classContainer .' + triggerClass ).removeClass( 'ui-icon-carat-u' ).addClass( 'ui-icon-carat-d');

            });
        }

    }


    // utilize json returned for classlist (courses)
    // builds course, class and lab html
    // remember [Departments] have [Courses] - [Courses] have classes [ClassInfo] - classes [ClassInfo] have [Labs]
    this.buildCourses = function () {

        self.buildCoursesHeader();

        var Courses = $('#course-list');
        $(Courses).empty();

        // go through each course in the department chosen
        $.each(myCampus.SelectedDepartment.CourseList, function () {

            var courseX = this;

            var courseBlock = $('<div>').addClass('courseTitleBlock ' + courseX.CourseId);
            $(Courses).append(courseBlock);

            //build the course header
            var courseHeader =
                $('<h5>').on('click', function() {
                    var classList = $(this).parent().children('.classlist')[0];
                    self.toggleClassList(this,classList); //course/class summary - css changes to show/hide/color/etc
                    return false;
                });

            if (!isMobile()) {
                $(courseHeader).prop({ 'class': 'courseHeader ui-collapsible-heading ui-btn-icon-left ui-icon-carat-u ui-btn-inherit openCourse'});
            } else {
                $(courseHeader).prop({ 'class': 'courseHeader ui-collapsible-heading ui-btn-icon-left ui-icon-carat-d ui-btn-inherit' });
            }

            var spanCourseId = $('<span>').addClass('courseID').html(courseX.CourseId);
            var spanCourseTitle = $('<div>').addClass('courseTitle').html(courseX.Title);
            var spanCourseCredits = $('<div>').addClass('courseCredits right').html(courseX.Credits);

            $(courseHeader).append(spanCourseId).append(spanCourseTitle).append(spanCourseCredits);

            //build the course list
            var courseList = $('<div>').addClass('classlist');
            if (isMobile()) {
                $(courseList).addClass('closed');
            }

            var addedClass = 0;

            // go through each class in the course
            $.each(courseX.ClassInfoList, function () {
                var classX = this;

                console.log(classX);
                var isCoordinatedStudiesClass = false;
                var sectionNumber = classX.SectionNumber;
                var n = /C/;


                //if sectionNumber starts with a 'C'
                if(myCampus.CampusCode == "063"){
                    if (sectionNumber[0].match(n) && myCampus.SelectedYRQ != "B782" && myCampus.CampusCode == "063" && myCampus.Departments.FilterOptions.SpecialType != 0) {
                        isCoordinatedStudiesClass = true;
                        courseBlock.addClass('coordinatedStudy').attr({ 'data-courseid': courseX.CourseId });
                    }
                }


                //console.log("SectionNumber: " + classX.SectionNumber + " : " + isCoordinatedStudiesClass);

                var itemSectionNumber = $('<span>')
                    .addClass('itemSectionNumber')
                    .append(classX.ItemNumber + '.' + classX.SectionNumber);
                var itemMeetDays = $('<span>').addClass('itemMeetDays');
                var buildingRoom = $('<span>').addClass('buildingRoom');
                var itemMeetTimeType = $('<span>').addClass('itemMeetTimeType');
                var spacerSpan = $('<span>').addClass('spacerSpan');
                //var onlineTitle = $('<span>').addClass('onlineTitle');


                //var statusSnippet = classX.Status == 'Unavailable' ? '' : classX.Status;
                var statusSnippet;
                console.log(classX.Status);
                switch (classX.Status) {
                    case 'Unavailable':
                        statusSnippet = '';
                        break;

                    case 'UnKnown':
                        statusSnippet = '';
                        break;

                    default:
                        statusSnippet = classX.Status;

                }



                //determine how to show class meeting information
                //type None is a "normal" class
                //type Hybrid has a special way of displaying info
                //any other type is a distance learning class of some type and so this is displayed
                //.meetDaysOut is a prototype parameter used for creating a "display" version of info
                if (this.DistanceLearningType == 'None') {
                    classX.meetDaysOut = classX.Meets.MeetDays;

                    if (classX.meetDaysOut == 'ARRANGED') { classX.meetDaysOut = "ARR"; }

                    classX.meetTimeOut = classX.Meets.StartTime + ' - ' + classX.Meets.EndTime;

                    //if (classX.meetTimeOut.trim() == 'ARR - ARR') { classX.meetTimeOut = 'ARRANGED' }
                    if ( $.trim(classX.meetTimeOut) == 'ARR - ARR') { classX.meetTimeOut = 'ARRANGED' }


                    classX.elTypeOut = "";

                    itemMeetDays.addClass('itemMeetDays')
                        .append(classX.meetDaysOut);
                    itemMeetTimeType.addClass('itemMeetTimeType').append(classX.meetTimeOut);
                    buildingRoom.addClass('buildingRoom')
                        .append(classX.Meets.Building + ' ' + classX.Meets.Room);
                    //onlineTitle.addClass('onlineTitle');
                }
                else if (this.DistanceLearningType == 'Hybrid') {
                    classX.meetDaysOut = classX.Meets.MeetDays;
                    if (classX.meetDaysOut == 'ARRANGED') { classX.meetDaysOut = "ARR"; }
                    classX.meetTimeOut = classX.Meets.StartTime + ' - ' + classX.Meets.EndTime;
                    classX.elTypeOut = classX.DistanceLearningType;

                    itemMeetDays.addClass('itemMeetDays')
                        .html(classX.meetDaysOut);

                    //if (classX.meetTimeOut.trim() == 'ARR - ARR') { classX.meetTimeOut = 'ARRANGED' }
                    if ($.trim(classX.meetTimeOut) == 'ARR - ARR') { classX.meetTimeOut = 'ARRANGED' }


                    itemMeetTimeType.addClass('itemMeetTimeType').append(classX.elTypeOut + ': ' + classX.meetTimeOut);
                    spacerSpan.addClass('spacerSpan');
                    buildingRoom.addClass('buildingRoom')
                        .append(classX.Meets.Building + ' ' + classX.Meets.Room);

                } else if (classX.DistanceLearningType == 'Online') {
                    classX.meetDaysOut = "";
                    classX.meetTimeOut = "";
                    classX.elTypeOut = classX.DistanceLearningType;

                    itemMeetDays.addClass('itemMeetDays');
                    itemMeetTimeType.addClass('itemMeetTimeType').append(classX.elTypeOut);
                    spacerSpan.addClass('spacerSpan');
                    buildingRoom.addClass('buildingRoom');


                } else {
                    classX.meetDaysOut = "";
                    classX.meetTimeOut = "";
                    //classX.elTypeOut = classX.DistanceLearningType;
                    classX.elTypeOut = (classX.DistanceLearningType == 'SelfPaced') ? 'Self-Paced': classX.DistanceLearningType;

                    itemMeetTimeType.addClass('itemMeetTimeType').html(classX.elTypeOut);
                    spacerSpan.addClass('spacerSpan');
                    buildingRoom.addClass('buildingRoom')
                        .append(classX.Meets.Building + ' ' + classX.Meets.Room);
                }



                var course = $('<div>').addClass('course closedCourse ui-collapsible-heading ui-btn-icon-right ui-btn-inherit ui-icon-carat-d').attr('id', classX.ClassId);
                var courseHeadingBlock = $('<div>').addClass('courseHeadingBlock closed');
                var meetNumber = $('<div>').addClass('itemSectionNumber').html('Item Number');
                var meetDays = $('<div>').addClass('itemMeetDays').html('Days');
                var meetTime = $('<div>').addClass('itemMeetTimeType').html('Time');
                var meetRoom = $('<div>').addClass('buildingRoom').html('Room');
                var meetStatus = $('<div>').addClass('statusSpan').html('Status');

                var statusSpan = $('<span>')
                    .addClass('statusSpan')
                    .append(statusSnippet);


                $(course).append($(itemSectionNumber).clone())
                    .append($(itemMeetDays).clone())
                    .append($(itemMeetTimeType).clone())
                    .append($(statusSpan).clone());

                $(course).on('click', { 'courseId': courseX.CourseId }, function (e) {
                    var detailOpen = $('#' + $(this).attr('id') + ' .courseDetail');
                    if ($(detailOpen).hasClass('closed')) {


                        //calling this here keeps us from having to repeat it in every "getDescription*" call
                        myCampus.InitSelectedCourseAndClass(classX.ClassId);

                        var courseOrClassName = classX.ClassId;
                        if(myCampus.CampusCode == "063"){
                            console.log("courseOrClassName: " + classX.CourseId);
                            if (isCoordinatedStudiesClass) { myCampus.SelectedCourse.CourseId = classX.CourseId; }
                        }
                        myCampus.getDescriptionAndEnrollment();
                    }

                    myCampus.toggleClassDetails(classX.ClassId); //class details - css changes to show/hide/color/etc
                    return false;
                });


                var courseDetail = $('<div >').addClass('courseDetail closed');
                var courseLabs = $('<div>').addClass('courseLabs');
                if(myCampus.CampusCode == "063"){
                    if (isCoordinatedStudiesClass && myCampus.Departments.FilterOptions.SpecialType != 0) {
                        courseList
                            .append(
                                $('<h3>')
                                    .on('click', function () {
                                        console.log(this);
                                        if ($(this).hasClass('ui-icon-carat-d')) {
                                            console.log('remove');
                                            $(this).removeClass('ui-icon-carat-d').addClass('ui-icon-carat-u');
                                            $(this).siblings('.isDescription').removeClass('closed');
                                            $(this).siblings('.options').removeClass('closed');
                                        } else {
                                            console.log('add');
                                            $(this).addClass('ui-icon-carat-d').removeClass('ui-icon-carat-u');
                                            $(this).siblings('.isDescription').addClass('closed');
                                            $(this).siblings('.options').addClass('closed');
                                        }
                                    })
                                    .prop({ 'class': 'ui-btn-icon-right ui-icon-carat-d ' })
                                    .append($('<span>').addClass('title').html("This is a Coordinated Studies Cluster"))
                                    .append($('<span>').addClass('status').html(classX.Status))


                            )
                            .append($('<div>').addClass('isDescription courseDescription closed').text(classX.IS_description));
                    }
                }

                //build lab detail
                if (classX.Labs.length > 0) {

                    $.each(classX.Labs, function () {

                        //to do: add better 'trim' to arranged dates and times
                        classX.labTime = this.LabTime;//.replace(' - ', ' - ');
                        if (this.LabDays == 'ARR       ') {
                            this.LabDays = 'ARR';
                            classX.labTime = '';
                        }
                        if (classX.labTime == 'ARR    -ARR    ' || classX.labTime == 'arr -arr ') {
                            classX.labTime = "ARRANGED";
                        }

                        classX.labDays = this.LabDays;

                        classX.labBuilding = this.Building == null ?
                            '' :
                            //this.Building.trim();
                            $.trim(this.Building);

                        classX.labRoom = this.Room == null ?
                            '' :
                            //this.Room.trim();
                            $.trim(this.Room);

                        var titleSpan = $('<span>').addClass('labTitle').html('Also&nbsp;Meets:');

                        var spanLabDays = $('<span>').addClass('labDays').html(classX.labDays);
                        var spanLabTime = $('<span>').addClass('labTime').html(classX.labTime);;
                        var spanLabBuilding = $('<span>').addClass('labBuilding').html(classX.labBuilding + ' ' + classX.labRoom);
                        var labRule = $('<hr/>');

                        $(courseLabs).append(labRule).append(titleSpan)
                            .append(spanLabDays)
                            .append(spanLabTime);
                        $(course).append(courseLabs);
                    });

                }//end build lab detail
                $(courseDetail).append($(courseLabs).clone());



                var courseWrapper = $('<div>').addClass('courseWrapper');
                if(myCampus.CampusCode == "063"){
                    if (isCoordinatedStudiesClass) {
                        //var classTitle = $('<div>').addClass('classTitle isShut ' + classX.ClassId)
                        var classTitle = $('<div>').addClass('classTitle ' + classX.ClassId)
                            .html("<span class='ui-icon-carat-d ui-btn-icon-left icon'></span>    <span class='courseID'>" + classX.CourseId + "</span>     <span>" + classX.ClassTitle + "</span><span class='courseCredits right'>" + classX.Credits + "</span><span></span>")
                            .on('click', function () {
                                var trigger = this;
                                if ($(trigger).hasClass('isShut')) {
                                    $(trigger).removeClass('isShut ui-icon-carat-d');
                                    $('.classTitle.' + classX.ClassId + ' .icon').removeClass('ui-icon-carat-d');
                                    $('.classTitle.' + classX.ClassId + ' .icon').addClass('ui-icon-carat-u');

                                } else {
                                    $(trigger).addClass('isShut ui-icon-carat-d');
                                    $('.classTitle.' + classX.ClassId + ' .icon').removeClass('ui-icon-carat-u');
                                    $('.classTitle.' + classX.ClassId + ' .icon').addClass('ui-icon-carat-d');
                                    //$('.classTitle.' + classX.ClassId + ' ~ .course').addClass('closedCourse');
                                    myCampus.toggleClassDetails( classX.ClassId );
                                }
                            });

                        if (isMobile()) {
                            classTitle.addClass('isShut');
                        }
                        $(courseWrapper).append($(classTitle));//for coordinated studies only
                    }
                }

                $(course).append(courseDetail);
                $(courseWrapper).append(course);


                if(myCampus.CampusCode == "063"){
                    if (!isCoordinatedStudiesClass || myCampus.Departments.FilterOptions.SpecialType != 0) {
                        $(courseList).append(courseWrapper);
                        addedClass++;
                    }
                } else {
                    $(courseList).append(courseWrapper);
                }

            });// end go through each class in the course

            //put it all together
            if(myCampus.CampusCode == "063"){
                if ( addedClass > 0 ) {
                    $(courseBlock).append(courseHeader);
                    $(courseBlock).append(courseList);
                }
            } else {
                $(courseBlock).append(courseHeader);
                $(courseBlock).append(courseList);
            }
        });

        if(myCampus.CampusCode == "063"){
            if ( myCampus.Departments.FilterOptions.SpecialType != 0) {
                console.log("sort for isCoordinatedStudiesClass");
                Html.sortCoursesForCoordinatedStudiesClass();
            }
        }

        Html.showCourses();
    }//end buildCourses()

//north only function
    this.sortCoursesForCoordinatedStudiesClass = function () {
        var currentSection;
        var currentHolder;// = $('<div>');//add classes to this
        var sectionToCheck;//take classes from here
        var courseHeader = $('<h5>').attr({ 'class': 'courseHeader ui-collapsible-heading ui-btn-icon-left ui-icon-carat-d ui-btn-inherit' });

        $.each($(".courseTitleBlock"), function () {
            var courseHolder = this; //console.log(courseHolder);
            sectionToCheck = $(courseHolder).attr('data-courseid'); //console.log("sectionToCheck: " + sectionToCheck)

            if (sectionToCheck != undefined) {
                if (sectionToCheck == currentSection) {
                    //console.log("current: " + sectionToCheck);// take these children and add to currentSection
                    $(currentHolder).append($(".courseTitleBlock." + sectionToCheck + " .courseWrapper")  );
                    $(courseHolder).remove();
                } else { //new section
                    currentSection = sectionToCheck; //console.log("NOT current");
                    var n = /C/;
                    if (sectionToCheck[0].match(n)) {
                        currentHolder =
                            $('<div>').addClass('options closed')
                                .appendTo($(courseHolder).children('.classlist'));
                    }
                }
            }
        });

        //sort into coordinated studies options
        var currentOption;
        var currentOptionHolder;
        var optionToCheck;

        $.each($('.courseTitleBlock.coordinatedStudy .isDescription.courseDescription ~ div'), function () {
            var availableOptionsHolder = this; console.log(availableOptionsHolder);
            var iterator = 1;

            $.each($(availableOptionsHolder).children(), function () {
                var classHolder = this;
                //console.log(classHolder);
                //console.log($(classHolder).children());
                //console.log($(classHolder).children('.itemSectionNumber').html());
                //console.log($(classHolder).children().children('.itemSectionNumber').html());

                var selector = $(classHolder).children().children('.itemSectionNumber').html();
                if (selector == undefined) { selector = $(classHolder).children('.itemSectionNumber').html(); }
                //console.log("selector: " + selector);

                var optionString = selector.slice(-3);
                if (optionString != undefined) { } else { optionString = "000"; }  console.log(optionString);
                optionToCheck = optionString.slice(-1);  console.log(optionToCheck);

                if (optionToCheck != undefined && optionString[0] != "." && optionString[2] != "Z") {
                    if (optionToCheck == currentOption) {
                        console.log("current: " + optionToCheck);
                        $(classHolder).appendTo(currentOptionHolder );
                    } else {
                        //new option
                        currentOption = optionToCheck; console.log("NOT current: " + optionToCheck);
                        currentOptionHolder = $('<div>').addClass("optionHolder")
                            .append($('<div>').addClass("optionMarker").text('Option ' + iterator))
                            .appendTo($(availableOptionsHolder)).append(classHolder);
                        iterator++;
                    }
                } else if (optionString[2] == "Z") {
                    console.log('optional class');

                    currentOptionHolder = $('<div>').addClass("optionHolder")
                        .append($('<div>').addClass("optionMarker").text('Optional two-credits available:'))
                        .appendTo($(availableOptionsHolder)).append(classHolder);


                }


            });

        });
    }


    //updates header elements in courses view
    this.buildCoursesHeader = function () {

        var ClassCountStr;

        if (myCampus.SelectedDepartment.AllClassCount == 1) {
            ClassCountStr = '1 Class';
        } else {
            ClassCountStr = myCampus.SelectedDepartment.AllClassCount + ' Classes';
        }

        $('#class-count').empty();
        $('#class-count')
            .append($('<h3>').html(myCampus.SelectedDepartment.DepartmentName))
            .append($('<div>')
                .addClass('normalprint')
                .html(ClassCountStr + ' Offered this Quarter'));

        $('#class-count-sm').html(ClassCountStr);

    }


    this.toggleClassList = function (trigger, triggerTarget) {
        //trigger = h5
        //triggerTarget = .classlist

        console.log(trigger);
        console.log(triggerTarget);

        myCampus.closeHeaderMenus();

        $('.classlist.closed .course')
            .addClass('closedCourse ui-icon-carat-d')
            .removeClass('ui-icon-carat-u');


        if ($(triggerTarget).hasClass('closed')) {
            $(trigger).removeClass('ui-icon-carat-d');
            $(trigger).addClass('ui-icon-carat-u');
            $(trigger).addClass('openCourse');

            $(triggerTarget).removeClass('closed');

            $(triggerTarget).find('.course').css({ 'background-color': 'none', 'padding': '.25em;'});

            //console.log('open ClassList');

            ga('send', 'event', 'Class List Opended', $(trigger).children('.courseID').text());

        } else {

            $(trigger).addClass('ui-icon-carat-d');
            $(trigger).removeClass('ui-icon-carat-u');
            $(trigger).removeClass('openCourse');

            $(triggerTarget).addClass('closed');
            $(triggerTarget).find('.courseDetail').addClass('closed');
            $(triggerTarget).find('.classTags').remove();
            $('.tagDesc').remove();
            $(triggerTarget).find('.classStatus').remove();
            $(triggerTarget).find('.classDetailHolder').remove();
            $(triggerTarget).find('.courseLabs').removeClass('closed');

            $(triggerTarget).find('.options').addClass('closed');
            $(triggerTarget).find('.isDescription').addClass('closed');
            $(triggerTarget).find($('h3')).addClass('ui-icon-carat-d').removeClass('ui-icon-carat-u');
        }

    }

    //this function fires for both mobile and desktop
    this.buildMyClassesDeskTopDescription = function( triggerPage, triggerClass, myClass ){
        console.log( 'triggerPage: ' + triggerPage + ' triggerClass: ' + triggerClass );
        console.log( myClass );
        console.log(myCampus.SelectedClass);//myClass is NOT myCampus.SelectedClass
        //target
        var targetClass = $('#' + triggerPage + ' .classContainer.'+triggerClass );
        //content
        var details = $('<div>').addClass('classDescriptionDetails');


        ga('send', 'event', 'My Classes Description viewed', triggerPage);


        //meet Time
        var meetTime = $('<span>').addClass('classMeetTime');
        if( myClass.Meets.StartTime != "ARR" ){

            $( meetTime )
                .append(
                    $('<span>').html( 'Time: ' + myClass.Meets.StartTime ).addClass('startTime')
                )
                .append(
                    $('<span>').html( '&nbsp;-&nbsp; ' ).addClass('spacerTime')
                )
                .append(
                    $('<span>').html( myClass.Meets.EndTime ).addClass('endTime')
                );

        } else {
            $( meetTime ).append( $('<span>').html( 'Time: ARRANGED' ).addClass('startTimeArranged') );
        }


        //class Id
        var classId = $('<span>').addClass('classId')
            .append( $('<div>').addClass('classIdHeader').html('Class ID') )
            //class ID
            .append( $('<span>').html( 'Item No: ' + myClass.ItemNumber ).addClass('itemNumber') )
            .append( $('<span>').html( 'Section: ' + myClass.SectionNumber ).addClass('sectionNumber') )
            //instructors
            .append( $('<span>').html( 'Instructor: ' + myClass.Instructor.LastName ).addClass('instructorSpan') );


        //team Instructor
        //myClass.HasTeamInstructor = true; //for testing
        //myClass.TeamInstructor = "TeamInstructor"; //for testing

        if( myClass.HasTeamInstructor ){
            var teamInstructor = myClass.TeamInstructor;
            $( classId )
                .append( $('<span>')
                    .addClass('instructorSpan')
                    .html('Instructor: ' + teamInstructor )
                );
        }



        //dates
        $( classId ).append(
            $('<span>')
                .html( 'Dates: ' + myClass.StartDate + ' - ' + myClass.EndDate )
                .addClass('dates')
        );



        //distance Learning Type
        //myClass.DistanceLearningType = 'Seminar'; //for testing

        var distanceLearningType = $('<span>').addClass( 'distanceLearningType' );
        if ( myClass.DistanceLearningType == 'None') {
            $( distanceLearningType ).addClass('none');
        } else if ( myClass.DistanceLearningType == 'TeleCourse' ) {

            $( meetTime ).addClass( 'none' );
            $( distanceLearningType ).html( 'TeleCourse' );

        } else if ( myClass.DistanceLearningType == 'Hybrid' ) {

            $( distanceLearningType ).html( 'Hybrid ' );

        } else if ( myClass.DistanceLearningType == 'Online' ) {

            $(meetTime).addClass('none');
            $( distanceLearningType ).html( 'Online' );

        } else if ( myClass.DistanceLearningType == 'Seminar' ) {

            $( distanceLearningType ).html( 'Seminar' );

        } else if ( myClass.DistanceLearningType == 'Correspondence' ) {

            $(meetTime).addClass('none');
            $( distanceLearningType ).html( 'Correspondence' );

        } else if ( myClass.DistanceLearningType == 'SelfPaced' ) {

            $(meetTime).addClass('none');
            $( distanceLearningType ).html( 'Self-Paced' );

        }




        //classMeets
        var classMeets = $('<span>').addClass('classMeets')
            .append( $('<div>').addClass('classMeetsHeader').html('Class Meets') )
            //Class Meets
            .append( $('<span>').html( 'Days: ' + myClass.Meets.MeetDays ).addClass('meetDays') )

            //distanceLearningType
            .append(

                distanceLearningType

            )

            //time
            .append(
                meetTime
            )

            //location
            .append( $('<span>').html( 'Location: ' + myClass.Meets.Building + ' ' + myClass.Meets.Room ).addClass('location') );


        //registration dates
        var registerDates = $('<span>').addClass('registerDates')
            .append(
                $('<span>').html('Registration for this class beginning:')
            )
            .append(
                $('<span>').html('Returning Students - ' + myCampus.SelectedQuarter.ReturnStudentRegistrationBegin )
            )
            .append(
                $('<span>').html('New Students - ' + myCampus.SelectedQuarter.NewStudentRegistrationBegin )
            );



        if( myClass.Labs.length > -1 ){

            var labDetail = $('<div>').addClass('labDetails');
            $.each( myClass.Labs, function() {

                var labTitle = $('<div>').addClass('labTitle').html('Lab:');
                var labTime = $('<div>').addClass('labTime').html('Time: ' + this.LabTime);

                //if (this.LabDays.trim() == 'ARR-ARR') { this.labDays = 'ARR' }
                if ($.trim(this.LabDays) == 'ARR-ARR') { this.labDays = 'ARR' }

                var labDays = $('<div>').addClass('labDays').html('Days: ' + this.LabDays);

                var buildingRoom = $('<div>').addClass('buildingRoom').html('Location: ');

                if (myCampus.CampusCode == '063') {
                    $( buildingRoom ).append( $('<a>').addClass('location')
                        .attr({
                            href : "http://northseattle.edu/locator/locate/"+ this.RoomLocationParameter.toLowerCase(),
                            target : "_Blank"
                        }).html(this.Building + ' ' + this.Room)
                    );
                } else {
                    $( buildingRoom ).append( this.Building + ' ' + this.Room);
                }

                console.log( buildingRoom );
                $(labDetail).addClass( myClass.ItemNumber )
                    .append(  $('<div>').html('Also Meets: ').addClass('alsoMeetsHeader')  )
                    .append( labDays )
                    //.append(  labDays.html() + labTime.html()  )
                    .append( labTime )
                    .append( buildingRoom  );
            });

        }

        //enrollment info and class status
        //console.log(myClass.EnrollmentInfo.Capacity);
        //console.log(myClass.EnrollmentInfo.Filled);
        //console.log(myClass);
        var capacity =  myClass.EnrollmentInfo.Capacity;
        var seatsFilled = myClass.EnrollmentInfo.Filled;
        var classStatus = '';

        //var enrollmentInfo = $('<div>').addClass('enrollmentInfo').append( classStatus );

        //if (myClass.Status != 'Waitlist') {

        //    classStatus = $('<div>').addClass('classStatus').text('Class is ' + myClass.Status + '.')
        //                                .append(myClass.EnrollmentInfo.Filled + ' seats of ' + myClass.EnrollmentInfo.Capacity + ' filled.');
        //} else {

        //    classStatus = $('<div>').addClass('classStatus').text('Class is Waitlisted. ')
        //                            .append(' Current position ' + myClass.EnrollmentInfo.Capacity + '. ' );
        //}


        var FeeCodesHolder = $('<div>').addClass('feeCodesHolder');

        if(myClass.FeeCodes.length > 0){
            FeeCodesHolder.append($('<div>').addClass('feeCodesTitle').text("Additional Class Fees:"));



            $.each(myClass.FeeCodes, function () {
                //console.log(this);

                if (this.Rate == ""
                    || this.Rate == "0"
                    || this.Rate == null
                    || this.Rate == undefined ) {

                    FeeCodesHolder.append(
                        $('<div>').addClass('feeCode')
                            .append(
                                $('<span>').addClass('code').html(this.ID)
                            ).append(
                            $('<span>').addClass('reason').html("See Registrar for specifics")
                        )
                    );

                } else {

                    console.log(this.ID);

                    var infoButton = $('<span>');
                    if (this.ID == "cl" || this.ID == "CL") {
                        $(infoButton).addClass('labFeeInfoButton')

                            .append($('<span> ').addClass("ui-icon-info ui-btn-icon-notext").attr('data-feeinfo', myClass.ItemNumber )
                                .on('click', function () {
                                    console.log($(this).attr('data-feeinfo'));
                                    $('.labFeeInfoHolder.' + $(this).attr('data-feeinfo')).toggle();
                                })
                            );
                    }

                    FeeCodesHolder
                        .append(
                            $('<span style="display:none;">').addClass('labFeeInfoHolder ' + myClass.ItemNumber)
                                .on('click', function () {
                                    $(this).toggle();
                                })
                                .append(
                                    $('<span>').addClass('labFeeInfo')
                                        .append($('<span>').addClass('labFeeInfoTitle').html('<a class="ui-btn ui-icon-delete ui-btn-icon-notext ui-corner-all right"></a>Computer Lab'))

                                        .append($('<span>').html('Fee covers costs associated with providing student use of campus computer-related technology and services.'))
                                        .append($('<span>').html('Fee is charged upon enrollment in a class requiring use of a computer lab or campus servers. The fee is charged per class up to a maximum of $82.71 per quarter.'))
                                )
                        )
                        .append(
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

        }

        $( details ).append( classId )
            .append( classMeets )
            .append( registerDates )
            .append( labDetail )

            .append( FeeCodesHolder )

            .append( classStatus );

        $( targetClass ) .append(
            $('<div>').addClass( 'classDescription' )
                .append($('<p>').html(myClass.Description))
            //.append(details)
        );

        if (myClass.ClassNote != '') {
            $(targetClass).append(
                $('<div>').addClass('classDescription classNotes')
                    .append($('<p>').html(myClass.ClassNote))
                //.append(details)
            );
        }

        if (myClass.ClassURL != '') {
            $(targetClass).append(
                $('<div>').addClass('classDescription classURL')
                    .append( myClass.ClassURL )
                //.append(details)
            );
        }

        if (myClass.ELearningMessage != '') {
            $(targetClass).append(
                $('<div>').addClass('classDescription elearningMessage')
                    .append($('<p>').html(myClass.ELearningMessage))
                //.append(details)
            );
        }

        if (myClass.ElearningURL != '') {
            $(targetClass).append(
                $('<div>').addClass('classDescription elearningURL')
                    .append( myClass.ElearningURL )
                //.append(details)
            );
        }

        if (myClass.CorrespondenceNote != '') {
            $(targetClass).append(
                $('<div>').addClass('classDescription correspondenceNote')
                    .append($('<p>').html(myClass.CorrespondenceNote))
                //.append(details)
            );
        }

        if (myClass.InstructorMessage != '') {
            $(targetClass).append(
                $('<div>').addClass('classDescription instructorMessage')
                    .append($('<h4>').html('A Message From The Instructor'))
                    .append($('<p>').html(myClass.InstructorMessage))

            );
        }

        if (myClass.InstructorURL != '') {
            $(targetClass).append(
                $('<div>').addClass('classDescription instructorURL')
                    .append( myClass.InstructorURL )

            );
        }

        $(targetClass).append(
            $('<div>').addClass('classDescription')
                .append(details)
        );

    }


    this.validateDeleteMyRegistered = function (whichClassList) {
        //whichClassList: reg, fav or wait
        console.log(whichClassList);
        var trigger, title, msg;
        if (whichClassList == 'reg') {
            title = 'Drop Registered Class';
            //msg = 'You are about to drop a class from your registered classes.';

            msg = $('<span>').html('You are about to drop a class from your registered classes.');

            msg1 = $('<span>').html('<br />Classes dropped after the 10th day may qualify for a refund.');
            msg2 = $('<span>').html('Classes dropped at this point will be “withdrawn”.');
            msg3 = $('<span>').html('Classes with a late start or early ending may be dropped as normal.');
            msg4 = $('<span>').html('If you have questions about this process please contact the registrar before continuing.');

            msg5 = $('<span>').html('Are you sure you would like to drop this class?');


            if (myCampus.SelectedQuarter.IsPastTenthDay) {
                msg.append(msg1).append(msg2).append(msg3).append(msg4);
            }

            msg.append(msg5);


        } else if (whichClassList == 'fav') {
            title = 'Remove Class from Favorites';
            msg = 'You are about to remove a class from your favorites.';

        } else if (whichClassList == 'wait') {
            title = 'Remove Class from Waitlist';
            msg = 'You are about to remove a class from your waitlist.';

        }

        $('#ValidateDropPopUp').empty();
        $('#ValidateDropPopUp')
            .append(
                $('<h2>').addClass('deleteMyRegisteredTitle').html( title )
            )
            .append(
                $('<span>').addClass('deleteMyRegistered').html( msg )
            )
            .append(
                $('<span>').addClass('cancel ui-btn').html('CANCEL')
                    .on('click', function(){

                        $('#RegisterNowPopUp').empty();//so we don't register from myReg by mistake
                        self.hidePopUp();
                    })
            )
            .append(
                $('<span>').addClass('ok ui-btn').html('OK')
                    .on('click', function(){
                        console.log('run thru items to drop');
                        self.hidePopUp();
                        if( isMobile() ){

                            if (whichClassList == 'reg') {
                                user.dropRegistration( );
                                //user.dropRegistration(this.value);
                            } else if (whichClassList == 'fav') {
                                $.each($('#MyFavoritesControls .classContainer  input:checked'), function () {
                                    user.deleteMyFavoriteItem(this.value);
                                });
                                //user.deleteMyFavoriteItem(this.value);
                            } else if (whichClassList == 'wait') {
                                user.dropWaitList( );
                                //user.dropWaitList(this.value);
                            }


                        } else {
                            //desktop
                            if (whichClassList == 'reg') {
                                user.dropRegistration();
                            } else if (whichClassList == 'fav') {

                                $.each($('#myFavTab .classContainer input:checked'), function () {
                                    console.log(this.value);
                                    user.deleteMyFavoriteItem(this.value);
                                });

                            } else if (whichClassList == 'wait') {
                                user.dropWaitList();
                            }

                        }

                    })
            );

        //self.showPopUp();
        self.validateDropPopUp();
    }


    this.removeMyFavoriteItem = function( itemNumber, sender ) {
        var counter = 0;

        if( isMobile() ){
            $('#MyFavoritesControls .classContainer.' + itemNumber).slideUp(400, function () {

                $('#MyFavoritesControls .classContainer.' + itemNumber).remove();

                /*
				$('#MyFavoritesControls .labDetail.' + itemNumber).slideUp( 400, function(){
					$('#MyFavoritesControls .labDetail ' + itemNumber).remove();
				});
				*/

                console.log($('#MyFavoritesControls .classContainer').length);

                if ($('#MyFavoritesControls .classContainer').length <= 0) {

                    $('#myFavSelect').slideUp( 400, function(){
                        $('#myFavSelect').remove();
                    });

                    $('.favoriteSelectAllCheckBox').slideUp( 400, function(){
                        $('.favoriteSelectAllCheckBox').remove();
                    });


                    $('.selectAll').slideUp( 400, function(){
                        $('.selectAll').remove();
                    });
                    $('.buttonContainer').slideUp( 400, function(){
                        $('.buttonContainer').remove();
                    });


                    $('#MyFavoritesControls').append( $('<div>').addClass('noListedClass').html('You have no Favorites this quarter.')   );
                }

            });

            /*
			$('.responseMessageWrapper.' + itemNumber).slideUp( 400, function(){
				$('.responseMessageWrapper.' + itemNumber).remove();
			});
			*/



        } else {
            $('#myFavTab .classContainer.' + itemNumber ).slideUp( 400, function(){
                $('#myFavTab .classContainer.' + itemNumber ).remove();

                if( $('#myFavTab .classContainer').length <= 0){
                    $('#myFavTab').append( $('<div>').addClass('noListedClass').html('You have no Favorites this quarter.')   );
                    $('#myFavTab .classContainerSelectAll').slideUp(400, function () {
                        $('#myFavTab .classContainerSelectAll').remove();
                    });
                    $('#myFavTab a.registerButton').remove();
                }

            });

        }

    }




    this.removeMyRegisteredItem = function( itemNumbers ) {
        console.log(itemNumbers);
        $( itemNumbers ).each(function(){
            var itemNumber = this;
            console.log(itemNumber);

            if (isMobile()) {
                console.log($('#RegisteredItemsControls .classContainer').length);
                $('#RegisteredItemsControls .classContainer.' + itemNumber)
                    .slideUp(400, function () {
                        console.log(itemNumber);
                        $('#RegisteredItemsControls .classContainer.' + itemNumber).remove();

                        console.log($('#RegisteredItemsControls .classContainer').length);
                        if ($('#RegisteredItemsControls .classContainer').length < 1) {
                            self.clearRegisteredItems();
                        }
                    });
            } else {
                $('#myRegTab .classContainer.' + itemNumber)
                    .slideUp( 400, function(){
                        $('#myRegTab .classContainer.' + itemNumber).remove();
                        if( $('#myRegTab .classContainer').length < 1 ){
                            console.log( 'length is < 1' );
                            self.clearRegisteredItems();
                        }
                    });

            }

        });
    }


    this.clearRegisteredItems = function(){
        console.log( 'clearRegisteredItems' );

        console.log($('#RegisteredItemsControls .classContainer').length);
        if( isMobile() ){

            $('#myRegSelect').slideUp(400, function () {
                $('#myRegSelect').remove();
            });

            $('.favoriteSelectAllCheckBox').slideUp(400, function () {
                $('.favoriteSelectAllCheckBox').remove();
            });


            $('.selectAll').slideUp(400, function () {
                $('.selectAll').remove();
            });
            $('.buttonContainer').slideUp(400, function () {
                $('.buttonContainer').remove();
            });


            $('#RegisteredItemsControls').append($('<div>').addClass('noListedClass').html('You have no Registered classes this quarter.'));
        } else {

            if( $('#myRegTab .classContainer').length <= 1 ){
                $('#myRegTab').append( $('<div>').addClass('noListedClass').html('You have no Registered Classes this quarter.') );
                $('#myRegTab .classContainerSelectAll').slideUp(400, function () {
                    $('#myFavTab .classContainerSelectAll').remove();
                });
                $('#myRegTab a.registerButton').remove();
            }
        }
    }


    this.initQuestions = function() {

        $('#QuestionDisplay').show();

        $.each(user.QuestionnairePrompts, function() {
            var test = this.Key;
            $('#' + this.Key).show();
        });
    }


    this.validateMyCampusRegistration = function () {

        var txtInput = $('#MyCampusRegisterControls input[type=text]')[0];

        if (txtInput.value.length != 4) {
            $('#MyCampusRegisterControls .validation').html('**Incorrect Item # Entry.');
        }
        else {
            $('#MyCampusRegisterControls .validation').empty();
            self.showAgreementMessage(txtInput.value)
            txtInput.value = '';
        }
    }


    this.addSuccessRegisteredItem = function (classX) {

        var RegistrationResponseContainer = $('#RegistrationResponseContainer'); //parent (origin in markup)
        var RegistrationResponseItem = $('<div>').addClass('registrationResponseItem');
        var img = $('<img>').attr({ 'src': 'img/reg_success.png', 'border': '0', 'alt': 'Registration Success' });
        var item = $('<div>').html(classX.CourseId + ' - ' + classX.CourseTitle);
        var response = $('<div>').addClass('success').html(classX.RegistrationProcessingInfo.Message);

        $(RegistrationResponseItem).append(img);
        $(RegistrationResponseItem).append(item);
        $(RegistrationResponseItem).append(response);
        $(RegistrationResponseContainer).append(RegistrationResponseItem);
        $('#TuitionPopUp').removeClass('displayNone');
        console.log( classX );

        $('#RegistrationResponseContainer .registrationResponseItem .closeButton').remove();

        self.removeMyFavoriteItem(classX.ItemNumber);


        ga('send', 'event', 'Success Registered Item Added', classX.CourseId);

    }


    this.addSuccessLinkedRegisteredItem = function (linkedGroupWrapper, classX) {

        var RegistrationResponseContainer = $('#RegistrationResponseContainer'); //parent (origin in markup)
        var RegistrationResponseItem = $('<div>').addClass('registrationResponseItem');
        var img = $('<img>').attr({ 'src': 'img/reg_success.png', 'border': '0', 'alt': 'Registration Success' });
        var item = $('<div>').html(classX.CourseId + ' - ' + classX.CourseTitle);
        var response = $('<div>').addClass('success').html(classX.RegistrationProcessingInfo.Message);

        $(RegistrationResponseItem).append(img);
        $(RegistrationResponseItem).append(item);
        $(RegistrationResponseItem).append(response);
        $(linkedGroupWrapper).append(RegistrationResponseItem);
        $(RegistrationResponseContainer).append(linkedGroupWrapper);
        $('#TuitionPopUp').removeClass('displayNone');
        console.log(classX);

        $('#RegistrationResponseContainer .registrationResponseItem .closeButton').remove();

        self.removeMyFavoriteItem(classX.ItemNumber);
    }


    //THIS STILL NEEDS PROMPT ADDED WHEN I HAVE A TEST CLASS
    this.addWaitListRegisteredItem = function (classX) {

        var RegistrationResponseContainer = $('#RegistrationResponseContainer'); //parent (origin in markup)
        var RegistrationResponseItem = $('<div>').addClass('registrationResponseItem');
        var img = $('<img>').attr({ 'src': 'img/reg_waitlist.png', 'border': '0', 'alt': 'Wait List Prompt' });
        var item = $('<div>').html(classX.CourseId + ' - ' + classX.CourseTitle);
        var response = $('<div>').addClass('waitlist').html(classX.RegistrationProcessingInfo.Message);
        var prompt = $('<div>').addClass('prompt');



        if( !$('#RegistrationResponseContainer .registrationResponseItem .closeButton').hasClass('closeButton')  ){
            var closeButton = $('<div>').addClass('closeButton').html('x').on('click', function(e){
                e.preventDefault();
                $.magnificPopup.close();
            });

        }

        if(  !$('#RegistrationResponseContainer .registrationResponseItem div.success').hasClass('success')  ){
            $(RegistrationResponseItem).append(closeButton);
        }

        $(RegistrationResponseItem).append(img);
        $(RegistrationResponseItem).append(item);
        $(RegistrationResponseItem).append(response);
        var regNow = $('<a>')
            .attr({ 'title': 'Join Wait List', 'href': '#RegisterNow' })
            .html('Join Wait List')
            .on('click', function (e) {
                e.preventDefault();
                var entryCode = $(this).prev().val();
                user.continueRegistration(classX.ItemNumber, null, $(this).parent().parent())
            });

        $(prompt).append(regNow);
        $(RegistrationResponseItem).append(prompt);
        $(RegistrationResponseContainer).append(RegistrationResponseItem);

        //console.log( classX ); /* for testing */
        //self.removeMyFavoriteItem( classX.ItemNumber ); /* for testing */

    }


    this.addWaitListLinkedRegisteredItem = function (linkedGroupWrapper, classX) {

        var RegistrationResponseContainer = $('#RegistrationResponseContainer'); //parent (origin in markup)
        var RegistrationResponseItem = $('<div>').addClass('registrationResponseItem');
        var img = $('<img>').attr({ 'src': 'img/reg_waitlist.png', 'border': '0', 'alt': 'Wait List Prompt' });
        var item = $('<div>').html(classX.CourseId + ' - ' + classX.CourseTitle);
        var response = $('<div>').addClass('waitlist').html(classX.RegistrationProcessingInfo.Message);


        //if (!$('#RegistrationResponseContainer .registrationResponseItem .closeButton').hasClass('closeButton')) {
        //    var closeButton = $('<div>').addClass('closeButton').html('x').on('click', function (e) {
        //        e.preventDefault();
        //        $.magnificPopup.close();
        //    });

        //}

        //if (!$('#RegistrationResponseContainer .registrationResponseItem div.success').hasClass('success')) {
        //    $(RegistrationResponseContainer).append(closeButton);
        //}

        $(RegistrationResponseItem).append(img);
        $(RegistrationResponseItem).append(item);
        $(RegistrationResponseItem).append(response);

        $(linkedGroupWrapper).append(RegistrationResponseItem);
        $(RegistrationResponseContainer).append(linkedGroupWrapper);

        //self.removeMyFavoriteItem( classX.ItemNumber ); /* for testing */
    }


    //THIS STILL NEEDS PROMPT ADDED WHEN I HAVE A TEST CLASS
    this.addPromptCodeRegisteredItem = function (classX) {

        var RegistrationResponseContainer = $('#RegistrationResponseContainer'); //parent (origin in markup)
        var RegistrationResponseItem = $('<div>').addClass('registrationResponseItem');
        var img = $('<img>').attr({ 'src': 'img/reg_fail.png', 'border': '0', 'alt': 'Prompt Code Response' });
        var item = $('<div>').html(classX.CourseId + ' - ' + classX.CourseTitle);
        var response = $('<div>').addClass('promptcode').html(classX.RegistrationProcessingInfo.Message);
        var valErr = $('<div>').addClass('valError');

        var prompt = $('<div>').addClass('prompt');
        var label = $('<span>').html('Enter Code:');
        var input = $('<input>').attr({ 'maxlength': '5' });
        var regNow = $('<a>')
            .attr({ 'title': 'Register Now', 'href': '#RegisterNow' })
            .html('Register')
            .on('click', function (e) {
                e.preventDefault();
                var entryCode = $(this).prev().val();
                if (entryCode.length < 5) {
                    var valErr = $(this).parent().next();
                    $(valErr).html('**Incorrect Entry Code.');
                }
                else {
                    user.continueRegistration(classX.ItemNumber, entryCode, $(this).parent().parent());
                }
            });

        if( !$('#RegistrationResponseContainer .registrationResponseItem .closeButton').hasClass('closeButton')  ){
            var closeButton = $('<div>').addClass('closeButton').html('x').on('click', function(e){
                e.preventDefault();
                $.magnificPopup.close();
            });
        }

        if(  !$('#RegistrationResponseContainer .registrationResponseItem div.success').hasClass('success')  ){
            $(RegistrationResponseItem).append(closeButton);
        }


        $(RegistrationResponseItem).append(img);
        $(RegistrationResponseItem).append(item);
        $(RegistrationResponseItem).append(response);
        $(prompt).append(label);
        $(prompt).append(input);
        $(prompt).append(regNow);
        $(RegistrationResponseItem).append(prompt);
        $(RegistrationResponseItem).append(valErr);
        $(RegistrationResponseContainer).append(RegistrationResponseItem);

        //console.log( classX ); /* for testing */
        //self.removeMyFavoriteItem( classX.ItemNumber ); /* for testing */


    }


    this.addPromptCodeLinkedRegisteredItem = function (linkedGroupWrapper, classX) {

        var RegistrationResponseContainer = $('#RegistrationResponseContainer'); //parent (origin in markup)
        var RegistrationResponseItem = $('<div>').addClass('registrationResponseItem');
        var img = $('<img>').attr({ 'src': 'img/reg_fail.png', 'border': '0', 'alt': 'Prompt Code Response' });
        var item = $('<div>').html(classX.CourseId + ' - ' + classX.CourseTitle);
        var response = $('<div>').addClass('promptcode').html(classX.RegistrationProcessingInfo.Message);
        var valErr = $('<div>').addClass('valError');

        var prompt = $('<div>').addClass('prompt');
        var label = $('<span>').html('Enter Code:');
        var input = $('<input>').attr({ 'maxlength': '5' }).addClass(classX.ItemNumber);


        if (!$('#RegistrationResponseContainer .registrationResponseItem .closeButton').hasClass('closeButton')) {
            var closeButton = $('<div>').addClass('closeButton').html('x').on('click', function (e) {
                e.preventDefault();
                $.magnificPopup.close();
            });
        }

        if (!$('#RegistrationResponseContainer .registrationResponseItem div.success').hasClass('success')) {

            if ($('#RegistrationResponseContainer .closeButton').length == 0) {
                $(RegistrationResponseContainer).prepend(closeButton);
            }
        }


        $(RegistrationResponseItem).append(img);
        $(RegistrationResponseItem).append(item);
        $(RegistrationResponseItem).append(response);
        $(prompt).append(label);
        $(prompt).append(input);
        $(RegistrationResponseItem).append(prompt);
        $(RegistrationResponseItem).append(valErr);
        $(linkedGroupWrapper).append(RegistrationResponseItem);
        $(RegistrationResponseContainer).append(linkedGroupWrapper);

        //self.removeMyFavoriteItem( classX.ItemNumber ); /* for testing */


    }


    this.addFailedRegisteredItem = function (classX) {
        console.log('addFailedRegisteredItem');
        var RegistrationResponseContainer = $('#RegistrationResponseContainer'); //parent (origin in markup)
        var RegistrationResponseItem = $('<div>').addClass('registrationResponseItem');
        var img = $('<img>').attr({ 'src': 'img/reg_fail.png', 'border': '0', 'alt': 'Registration Failed' });
        var item = $('<div>').html(classX.CourseId + ' - ' + classX.CourseTitle);
        var response = $('<div>').addClass('failed').html('Registration Failed: ' + classX.RegistrationProcessingInfo.Message);

        if( !$('#RegistrationResponseContainer .registrationResponseItem .closeButton').hasClass('closeButton')  ){
            var closeButton = $('<div>').addClass('closeButton').html('x').on('click', function(e){
                e.preventDefault();
                $.magnificPopup.close();
            });
        }

        if(  !$('#RegistrationResponseContainer .registrationResponseItem div.success').hasClass('success')  ){
            $(RegistrationResponseItem).append(closeButton);
        }

        $(RegistrationResponseItem).append(img);
        $(RegistrationResponseItem).append(item);
        $(RegistrationResponseItem).append(response);
        $(RegistrationResponseContainer).append(RegistrationResponseItem);

        //console.log( classX ); /* for testing */
        //self.removeMyFavoriteItem( classX.ItemNumber ); /* for testing */
    }


    this.addFailedLinkedRegisteredItem = function (linkedGroupWrapper, classX) {

        var RegistrationResponseContainer = $('#RegistrationResponseContainer'); //parent (origin in markup)
        var RegistrationResponseItem = $('<div>').addClass('registrationResponseItem');
        var img = $('<img>').attr({ 'src': 'img/reg_fail.png', 'border': '0', 'alt': 'Registration Failed' });
        var item = $('<div>').html(classX.CourseId + ' - ' + classX.CourseTitle);
        var response = $('<div>').addClass('failed').html('Registration Failed: ' + classX.RegistrationProcessingInfo.Message);

        if (!$('#RegistrationResponseContainer .registrationResponseItem .closeButton').hasClass('closeButton')) {
            var closeButton = $('<div>').addClass('closeButton').html('x').on('click', function (e) {
                e.preventDefault();
                $.magnificPopup.close();
            });


        }

        if (!$('#RegistrationResponseContainer .registrationResponseItem div.success').hasClass('success')) {
            if ($('#RegistrationResponseContainer .closeButton').length == 0) {
                $(RegistrationResponseContainer).prepend(closeButton);
            }
        }

        $(RegistrationResponseItem).append(img);
        $(RegistrationResponseItem).append(item);
        $(RegistrationResponseItem).append(response);
        $(linkedGroupWrapper).append(RegistrationResponseItem);
        $(RegistrationResponseContainer).append(linkedGroupWrapper);

        //console.log( classX ); /* for testing */
        //self.removeMyFavoriteItem( classX.ItemNumber ); /* for testing */
    }


    this.displayRegistrationInitResults = function( ) {
        //    'Public Enum RegisterStates
        //    '  None = 0 '  Success = 1 '  PromptWaitList = 2 '  PromptCode = 3 '  Fail = 4 '  Errors = 5 ' End Enum
        //self.showPopUp();
        var RegistrationResponseContainer = $('#RegistrationResponseContainer');
        $(RegistrationResponseContainer).empty();

        $.each(user.InProcessClasses, function() {

            var aClass = this;

            //if success (success = 1)
            if ( aClass.RegistrationProcessingInfo.RegisterState == 1 ) {

                self.addSuccessRegisteredItem(aClass);
            }

            //if waitlist (waitlist = 2)
            if (aClass.RegistrationProcessingInfo.RegisterState == 2) {

                self.addWaitListRegisteredItem(aClass);
            }

            //if promptcode (PromptCode = 3)
            if (aClass.RegistrationProcessingInfo.RegisterState == 3) {

                self.addPromptCodeRegisteredItem(aClass);
            }


            //if fail/error (fail = 4, error = 5)
            if (aClass.RegistrationProcessingInfo.RegisterState == 4
                || aClass.RegistrationProcessingInfo.RegisterState == 5) {

                self.addFailedRegisteredItem(aClass);
            }
        });


        $.each(user.InProcessLinkedClasses, function () {
            var linkedClassArray = this;

            var linkedClassesWrapper = $('<div>').addClass('linkedClassesWrapper');
            var title = $('<div>').html('These classes are linked.')
            $(linkedClassesWrapper).append(title);

            var areAnyPrompts = false;
            var areAnyFailures = false;
            var needRegButton = false;

            $.each(linkedClassArray, function (index) {
                var aClass = this;

                if (aClass.RegistrationProcessingInfo.RegisterState == 2
                    || aClass.RegistrationProcessingInfo.RegisterState == 3) {

                    areAnyPrompts = true;
                }

                if (aClass.RegistrationProcessingInfo.RegisterState == 4
                    || aClass.RegistrationProcessingInfo.RegisterState == 5) {
                    areAnyFailures = true;
                }
            });

            if (areAnyPrompts && !areAnyFailures) {
                needRegButton = true;
            }


            $.each(linkedClassArray, function (index) {

                var aClass = this;


                //if success (success = 1)
                if (aClass.RegistrationProcessingInfo.RegisterState == 1) {

                    self.addSuccessLinkedRegisteredItem(linkedClassesWrapper, aClass);

                    if (index == (linkedClassArray.length - 1) && needRegButton) {
                        var buttonHolder = $('<div>').addClass('promptLinked');
                        var regNow = $('<a>')
                            .attr({ 'title': 'Register Now', 'href': '#RegisterNow' })
                            .html('Register')
                            .on('click', function (e) {
                                e.preventDefault();

                                var validated = true;

                                $.each($(linkedClassesWrapper).find('input'), function (index) {
                                    if ($(this).val().length < 5) {
                                        $(linkedClassesWrapper).find('.valError')[index].innerHTML = '**Incorrect Entry Code.';
                                        validated = false;
                                    }
                                });

                                if (validated) {
                                    user.continueLinkedRegistration(linkedClassArray, linkedClassesWrapper);
                                }
                            });
                        $(buttonHolder).append(regNow);
                        $(linkedClassesWrapper).append(buttonHolder);
                    }
                }

                //if waitlist (waitlist = 2)
                if (aClass.RegistrationProcessingInfo.RegisterState == 2) {

                    self.addWaitListLinkedRegisteredItem(linkedClassesWrapper, aClass);

                    var regNow = $('<a>')
                        .attr({ 'title': 'Register Now', 'href': '#RegisterNow' })
                        .html('Register')
                        .on('click', function (e) {
                            e.preventDefault();

                            var validated = true;

                            $.each($(linkedClassesWrapper).find('input'), function (index) {
                                if ($(this).val().length < 5) {
                                    $(linkedClassesWrapper).find('.valError')[index].innerHTML = '**Incorrect Entry Code.';
                                    validated = false;
                                }
                            });

                            if (validated) {
                                user.continueLinkedRegistration(linkedClassArray, linkedClassesWrapper);
                            }
                        });


                    if (index == (linkedClassArray.length - 1) && needRegButton) {
                        var prompt = $('<div>').addClass('promptLinked');
                        $(prompt).append(regNow);
                        $(linkedClassesWrapper).append(prompt);

                        if (!$('#RegistrationResponseContainer .registrationResponseItem .closeButton').hasClass('closeButton')) {
                            var closeButton = $('<div>').addClass('closeButton').html('x').on('click', function (e) {
                                e.preventDefault();
                                $.magnificPopup.close();
                            });

                        }

                        //if (!$('#RegistrationResponseContainer .registrationResponseItem div.success').hasClass('success')) {
                        //    $(RegistrationResponseContainer).prepend(closeButton);
                        //}
                    }
                }

                //if promptcode (PromptCode = 3)
                if (aClass.RegistrationProcessingInfo.RegisterState == 3) {

                    self.addPromptCodeLinkedRegisteredItem(linkedClassesWrapper, aClass);


                    if (index == (linkedClassArray.length - 1) && needRegButton) {
                        var buttonHolder = $('<div>').addClass('promptLinked');
                        var regNow = $('<a>')
                            .attr({ 'title': 'Register Now', 'href': '#RegisterNow' })
                            .html('Register')
                            .on('click', function (e) {
                                e.preventDefault();

                                var validated = true;

                                $.each($(linkedClassesWrapper).find('input'), function (index) {
                                    if ($(this).val().length < 5) {
                                        $(linkedClassesWrapper).find('.valError')[index].innerHTML = '**Incorrect Entry Code.';
                                        validated = false;
                                    }
                                });

                                if (validated) {
                                    user.continueLinkedRegistration(linkedClassArray, linkedClassesWrapper);
                                }
                            });
                        $(buttonHolder).append(regNow);
                        $(linkedClassesWrapper).append(buttonHolder);
                    }
                }

                //if fail/error (fail = 4, error = 5)
                if (aClass.RegistrationProcessingInfo.RegisterState == 4
                    || aClass.RegistrationProcessingInfo.RegisterState == 5) {

                    self.addFailedLinkedRegisteredItem(linkedClassesWrapper, aClass);
                }

            });

        });


        self.initAccountInfo();
        self.showPopUp();
    }


    this.initAccountInfo = function () {

        console.log('init account info');
        $('#AccountInfoSummary').remove();

        $('#AccountInfoHolder').empty();

        $('#AccountInfoHeader').remove();

        var AccountInfoHeader = $('<div>').attr('id', 'AccountInfoHeader').addClass('summaryCollapsed')
            .append(
                $('<span>').addClass( 'title' ).html('Charges/Payments - Total Due: ' + user.Account.Totals.TotalDue )

                    .append(
                        $('<span>').addClass('ui-icon-carat-d ui-btn-icon-right')


                    )


            )
            .on('click', function(){
                if( $(this).hasClass('summaryCollapsed')   ){
                    $(this).removeClass('summaryCollapsed');

                    $('#AccountInfoSummary').removeClass('summaryCollapsed');
                    $('#AccountInfoHeader span.title span').removeClass('ui-icon-carat-d');
                    $('#AccountInfoHeader span.title span').addClass('ui-icon-carat-u');
                } else {
                    $(this).addClass('summaryCollapsed');
                    $('#AccountInfoSummary').addClass('summaryCollapsed');
                    $('#AccountInfoHeader span.title span').addClass('ui-icon-carat-d');
                    $('#AccountInfoHeader span.title span').removeClass('ui-icon-carat-u');
                }

            });



        //var title = $('<div>').addClass( 'title' ).html('Charges/Payments - Total Due: ' + user.Account.Totals.TotalDue );
        //$( AccountInfoHeader ).append( title );


        var AccountInfoSummary = $('<div>').attr('id', 'AccountInfoSummary').addClass('summaryCollapsed');


        var notice = $('<div>').addClass( 'notice' ).html('Charges/Payments include tuition/fees only.');
        var headingCharges = $('<div>').addClass( 'headingCharges accountSummaryHeader' ).html('Charges');

        var tuition = $('<div>').addClass( 'tuition' ).html('Tuition: ')
            .append(  $('<span>').html(  user.Account.Charges.Tuition ) );
        var fees = $('<div>').addClass( 'fees' ).html('Fees: ')
            .append(  $('<span>').html( user.Account.Charges.Fees ) );
        var chargesTotal = $('<div>').addClass( 'chargesTotal' ).html('Total: ')
            .append(  $('<span>').html( user.Account.Charges.Total ) );


        var headingPayments = $('<div>').addClass( 'headingPayments accountSummaryHeader' ).html('Payments');
        var payment = $('<div>').addClass( 'payment' ).html('Payment: ')
            .append(  $('<span>').html( user.Account.Payments.Total ) );
        var financialaid = $('<div>').addClass( 'financialaid' ).html('Fin Aid: ')
            .append(  $('<span>').html( user.Account.Payments.FinancialAid ) );
        var paymentTotal = $('<div>').addClass( 'paymentTotal' ).html('Total: ')
            .append(  $('<span>').html( user.Account.Payments.Total ) );


        var headingTotals = $('<div>').addClass( 'headingTotals accountSummaryHeader' ).html('Totals');
        var totalDue = $('<div>').addClass( 'totalDue' ).html('Total Due: ')
            .append(  $('<span>').html( + user.Account.Totals.TotalDue) );
        var refund = $('<div>').addClass( 'refund' ).html('Refund: ')
            .append(  $('<span>').html( + user.Account.Totals.Refund) );
        var credits = $('<div>').addClass( 'credits' ).html('Credits: ')
            .append(  $('<span>').html(user.Account.Credits) );

        //$(AccountInfoSummary).append(title);
        $(AccountInfoSummary).append(notice);
        $(AccountInfoSummary).append(headingCharges);
        $(AccountInfoSummary).append(tuition);
        $(AccountInfoSummary).append(fees);
        $(AccountInfoSummary).append(chargesTotal);
        $(AccountInfoSummary).append(headingPayments);
        $(AccountInfoSummary).append(payment);
        $(AccountInfoSummary).append(financialaid);
        $(AccountInfoSummary).append(paymentTotal);

        $(AccountInfoSummary).append(headingTotals);
        $(AccountInfoSummary).append(credits);

        $(AccountInfoSummary).append(refund);
        $(AccountInfoSummary).append(totalDue);


        var creditCardLogoMessage = $('<span>')
            .addClass('creditCardLogoMessage')
            .html('To pay with a Debit card please ensure that there is a MasterCard or Visa Logo on your card in order for your payment to be processed. Debit cards without these logos are not accepted');


        $('#AccountInfoHolder').removeClass('displayNone').append( AccountInfoHeader ).append( AccountInfoSummary );
        //console.log(user.Account.Totals.TotalDue);
        if(user.Account.Totals.TotalDue != ".00"){
            $('#AccountInfoHolder').append( creditCardLogoMessage );
        }
        //DOUG REMOVED FIX MODAL SECTION DISPLAY ISSUE
        //$('#AccountInfoHolder').appendTo( $('#PopUp') );

    }


    this.addSuccessContinuedRegistrationItem = function (classX, nodeX) {

        $(nodeX).empty();
        $(nodeX).addClass('registrationResponseItem');
        var img = $('<img>').attr({ 'src': 'img/reg_success.png', 'border': '0', 'alt': 'Registration Success' });
        var item = $('<div>').html(classX.CourseId + ' - ' + classX.CourseTitle);
        var response = $('<div>').addClass('success').html(classX.RegistrationProcessingInfo.Message);

        $(nodeX).append(img);
        $(nodeX).append(item);
        $(nodeX).append(response);

        self.removeMyFavoriteItem( classX.ItemNumber );
    }


    this.addSuccessContinuedLinkedRegistrationItem = function (classX, nodeX) {

        var registrationResponseItem = $('<div>');
        $(registrationResponseItem).addClass('registrationResponseItem');
        var img = $('<img>').attr({ 'src': 'img/reg_success.png', 'border': '0', 'alt': 'Registration Success' });
        var item = $('<div>').html(classX.CourseId + ' - ' + classX.CourseTitle);
        var response = $('<div>').addClass('success').html(classX.RegistrationProcessingInfo.Message);

        $(registrationResponseItem).append(img);
        $(registrationResponseItem).append(item);
        $(registrationResponseItem).append(response);

        $(nodeX).append(registrationResponseItem);

        self.removeMyFavoriteItem(classX.ItemNumber);
    }


    this.addSuccessContinuedWaitlistItem = function (classX, nodeX) {

        $(nodeX).empty();
        $(nodeX).addClass('registrationResponseItem');


        var RegistrationResponseContainer = $('#RegistrationResponseContainer'); //parent (origin in markup)
        //var RegistrationResponseItem = $('<div>').addClass('registrationResponseItem');
        var RegistrationResponseItem = $( nodeX );



        var img = $('<img>').attr({ 'src': 'img/reg_success.png', 'border': '0', 'alt': 'Registration Success' });
        var item = $('<div>').html(classX.CourseId + ' - ' + classX.CourseTitle);
        var response = $('<div>').addClass('waitlist').html(classX.RegistrationProcessingInfo.Message);




        if( !$('#RegistrationResponseContainer .registrationResponseItem .closeButton').hasClass('closeButton')  ){
            var closeButton = $('<div>').addClass('closeButton').html('x').on('click', function(e){
                e.preventDefault();
                //$.magnificPopup.close();
                self.hidePopUp();
            });


        }

        if(  !$('#RegistrationResponseContainer .registrationResponseItem div.success').hasClass('success')  ){
            $(RegistrationResponseItem).append(closeButton);
        }





        $(nodeX).append(img);
        $(nodeX).append(item);
        $(nodeX).append(response);

        //console.log( classX ); /* for testing */
        self.removeMyFavoriteItem( classX.ItemNumber );

    }


    this.addSuccessContinuedLinkedWaitlistItem = function (classX, nodeX) {

        var registrationResponseItem = $('<div>');
        $(registrationResponseItem).addClass('registrationResponseItem');

        var img = $('<img>').attr({ 'src': 'img/reg_success.png', 'border': '0', 'alt': 'Registration Success' });
        var item = $('<div>').html(classX.CourseId + ' - ' + classX.CourseTitle);
        var response = $('<div>').addClass('waitlist').html(classX.RegistrationProcessingInfo.Message);

        $(registrationResponseItem).append(img);
        $(registrationResponseItem).append(item);
        $(registrationResponseItem).append(response);
        $(nodeX).append(registrationResponseItem);

        self.removeMyFavoriteItem(classX.ItemNumber);

    }


    this.addFailedContinuedRegistrationItem = function (classX, nodeX) {

        $(nodeX).empty();
        $(nodeX).addClass('registrationResponseItem');
        var img = $('<img>').attr({ 'src': 'img/reg_fail.png', 'border': '0', 'alt': 'Registration Failed' });
        var item = $('<div>').html(classX.CourseId + ' - ' + classX.CourseTitle);
        var response = $('<div>').addClass('failed').html('Registration Failed: ' + classX.RegistrationProcessingInfo.Message);
        var closeButton;


        if( !$('#RegistrationResponseContainer .registrationResponseItem .closeButton').hasClass('closeButton')  ){
            closeButton = $('<div>').addClass('closeButton').html('x').on('click', function(e){
                e.preventDefault();
                $.magnificPopup.close();
            });
        }

        $(nodeX).append(closeButton);


        $(nodeX).append(img);
        $(nodeX).append(item);
        $(nodeX).append(response);
    }


    this.addFailedContinuedLinkedRegistrationItem = function (classX, nodeX) {

        var registrationResponseItem = $('<div>');
        $(registrationResponseItem).addClass('registrationResponseItem');
        var img = $('<img>').attr({ 'src': 'img/reg_fail.png', 'border': '0', 'alt': 'Registration Failed' });
        var item = $('<div>').html(classX.CourseId + ' - ' + classX.CourseTitle);
        var response = $('<div>').addClass('failed').html('Registration Failed: ' + classX.RegistrationProcessingInfo.Message);
        var closeButton;

        $(registrationResponseItem).append(img);
        $(registrationResponseItem).append(item);
        $(registrationResponseItem).append(response);
        $(nodeX).append(registrationResponseItem);
    }


    this.displayContinuedRegistrationResult = function (classX, registrationNode) {
        console.log('displayContinuedRegistrationResult');
        switch (classX.RegistrationProcessingInfo.ContinueRegistrationState) {
            case 1:
                //SuccessWithCode = 1
                self.addSuccessContinuedRegistrationItem(classX, registrationNode);
                $('#TuitionPopUp').removeClass('displayNone');
                break;
            case 2:
                //SuccessWithWaitList = 2
                console.log('SuccessWithWaitList');
                //self.addSuccessContinuedRegistrationItem(classX, registrationNode);
                self.addSuccessContinuedWaitlistItem(classX, registrationNode);
                $('#TuitionPopUp').removeClass('displayNone');
                break;
            case 3:
                //Fail = 3
                self.addFailedContinuedRegistrationItem(classX, registrationNode);
                break;
            case 4:
                //Errors = 4
                self.addFailedContinuedRegistrationItem(classX, registrationNode);
                break;
            default:
                //None = 0
                self.addFailedContinuedRegistrationItem(classX, registrationNode);
                break;
        }
        self.initAccountInfo();
    }


    this.displayContinuedLinkedRegistrationResult = function (linkedClassArray, linkedGroupWrapper) {

        $(linkedGroupWrapper).empty();
        $(linkedGroupWrapper).append($('<div>').html('These classes are linked.'));

        $.each(linkedClassArray, function (index) {
            var classX = this;

            switch (classX.RegistrationProcessingInfo.ContinueRegistrationState) {
                case 1:
                    //SuccessWithCode = 1
                    self.addSuccessContinuedLinkedRegistrationItem(classX, linkedGroupWrapper);
                    break;
                case 2:
                    //SuccessWithWaitList = 2
                    self.addSuccessContinuedLinkedWaitlistItem(classX, linkedGroupWrapper);

                    if (index == (linkedClassArray.length - 1)) {
                        if (!$('#RegistrationResponseContainer .registrationResponseItem .closeButton').hasClass('closeButton')) {
                            var closeButton = $('<div>').addClass('closeButton').html('x').on('click', function (e) {
                                e.preventDefault();
                                //$.magnificPopup.close();
                                self.hidePopUp();
                            });
                        }

                        if (!$('#RegistrationResponseContainer .registrationResponseItem div.success').hasClass('success')) {
                            if ($('#RegistrationResponseContainer .closeButton').length == 0) {
                                $(linkedGroupWrapper).parent().prepend(closeButton);
                            }
                        }
                    }

                    break;
                case 3:
                    //Fail = 3

                    self.addFailedContinuedLinkedRegistrationItem(classX, linkedGroupWrapper);

                    if (index == (linkedClassArray.length - 1)) {
                        if (!$('#RegistrationResponseContainer .registrationResponseItem .closeButton').hasClass('closeButton')) {
                            closeButton = $('<div>').addClass('closeButton').html('x').on('click', function (e) {
                                e.preventDefault();
                                $.magnificPopup.close();
                            });
                        }

                        if ($('#RegistrationResponseContainer .closeButton').length == 0) {
                            $(linkedGroupWrapper).parent().prepend(closeButton);
                        }
                    }

                    break;
                case 4:
                    //Errors = 4
                    self.addFailedContinuedLinkedRegistrationItem(classX, linkedGroupWrapper);

                    if (index == (linkedClassArray.length - 1)) {
                        if (!$('#RegistrationResponseContainer .registrationResponseItem .closeButton').hasClass('closeButton')) {
                            closeButton = $('<div>').addClass('closeButton').html('x').on('click', function (e) {
                                e.preventDefault();
                                $.magnificPopup.close();
                            });
                        }

                        if ($('#RegistrationResponseContainer .closeButton').length == 0)
                            $(linkedGroupWrapper).parent().prepend(closeButton);
                    }

                    break;
                default:
                    //None = 0
                    self.addFailedContinuedLinkedRegistrationItem(classX, linkedGroupWrapper);

                    if (index == (linkedClassArray.length - 1)) {
                        if (!$('#RegistrationResponseContainer .registrationResponseItem .closeButton').hasClass('closeButton')) {
                            closeButton = $('<div>').addClass('closeButton').html('x').on('click', function (e) {
                                e.preventDefault();
                                $.magnificPopup.close();
                            });
                        }

                        if ($('#RegistrationResponseContainer .closeButton').length == 0)
                            $(linkedGroupWrapper).parent().prepend(closeButton);
                    }
                    break;
            }
        });

        self.initAccountInfo();
    }


    this.removeMyWaitlistItem = function (itemNumbers) {
        console.log(itemNumbers);
        $( itemNumbers ).each(function(){
            var itemNumber = this;
            console.log(itemNumber);


            if( isMobile() ){
                $('#WaitListItemsControls .classContainer.' + itemNumber)
                    .slideUp( 400, function(){
                        $('#WaitListItemsControls .classContainer.' + itemNumber).remove();
                        //$('.responseMessageWrapper.' + itemNumber).slideUp( 400 );
                        console.log( $('#WaitListItemsControls .classContainer').length );
                        if ($('#WaitListItemsControls .classContainer').length <= 0) {
                            self.clearWaitlistItems();
                        }
                    });
            } else {
                $('#myWaitTab .classContainer.' + itemNumber)

                    .slideUp( 400, function(){
                        $('#myWaitTab .classContainer.' + itemNumber).remove();

                        console.log( $('#myWaitTab .classContainer').length );
                        if( $('#myWaitTab .classContainer').length <= 1 ){
                            self.clearWaitlistItems();
                        }
                    });
            }



        }).promise().done( function(){
            console.log( $('.myWaitlistItemWrapper').length );
            console.log( $('#myWaitTab .classContainer').length );


            if( isMobile() ){
                if( $('.myWaitlistItemWrapper').length <= 1 ){
                    self.clearWaitlistItems();
                }
            } else {

            }

        });
    }


    this.clearWaitlistItems = function () {
        console.log( 'clearWaitlistItems' );
        console.log( $('.myWaitlistItemWrapper').length );
        console.log( $('#myWaitTab .classContainer').length );


        if( isMobile() ){
            if( $('.waitlistItemWrapper').length <= 1 ){
                console.log('no classes');


                $('#WaitListItemsControls .waitlistItemSelect')
                    .slideUp();
                $('#WaitListItemsControls .selectAll')
                    .slideUp();
                $('#WaitListItemsControls .registrationSubmit')
                    .slideUp();

                $('#WaitListItemsControls .myWaitlistItemWrapper')
                    .slideUp();
                $('#WaitListItemsControls #myWaitSelect')
                    .slideUp();
                $('#WaitListItemsControls')
                    .append( $('<div>').addClass('noListedClass').html('You have no Waitlisted Classes this quarter.') );


            }
        } else {
            if( $('#myWaitTab .classContainer').length < 1 ) {
                $('#myWaitTab .classContainerSelectAll').slideUp(400, function () {
                    $('#myFavTab .classContainerSelectAll').remove();
                });
                $('#myWaitTab a.registerButton').remove();
                $('#myWaitTab')
                    .append( $('<div>').addClass('noListedClass').html('You have no Waitlisted Classes this quarter.') );

            }
        }
    }


    this.displayIndividualRegistrationInitResults = function (aClass) {
        //    'Public Enum RegisterStates
        //    '  None = 0 '  Success = 1 ' PromptWaitList = 2 ' PromptCode = 3 ' Fail = 4 ' Errors = 5

        var RegistrationResponseContainer = $('#RegistrationResponseContainer');
        $(RegistrationResponseContainer).empty();

        //if success (success = 1)
        if (aClass.RegistrationProcessingInfo.RegisterState == 1) {

            self.addSuccessRegisteredItem(aClass);
        }

        //if waitlist (waitlist = 2)
        if (aClass.RegistrationProcessingInfo.RegisterState == 2) {

            self.addWaitListRegisteredItem(aClass);
        }

        //if promptcode (PromptCode = 3)
        if (aClass.RegistrationProcessingInfo.RegisterState == 3) {

            self.addPromptCodeRegisteredItem(aClass);
        }


        //if fail/error (fail = 4, error = 5)
        if (aClass.RegistrationProcessingInfo.RegisterState == 4
            || aClass.RegistrationProcessingInfo.RegisterState == 5) {

            self.addFailedRegisteredItem(aClass);
        }


        self.initAccountInfo();

        self.showPopUp();
    }


    //this.displayIndividualContinueRegistration = function( trigger, RegisterState ) {
    this.displayIndividualContinueRegistration = function( thisClass, courseId, yrq, RegisterState ) {
        //    Public Enum ContinueRegistrationStates
        //  None = 0// SuccessWithCode = 1// SuccessWithWaitList = 2// Fail = 3// Errors = 4

        console.log('displayIndividualContinueRegistration: '+ RegisterState);
        var registerMsg;
        var trigger = thisClass + yrq;

        $('.registrationInitWrapper').remove();

        var registrationInitWrapper = $('<div>').addClass('registrationInitWrapper');

        if(RegisterState == 2){
            console.log('waitlist: '+ RegisterState + ' ContinueRegistrationState: ' + user.InProcessClasses[0].RegistrationProcessingInfo.ContinueRegistrationState);
            $(registrationInitWrapper)
                .append($('<h4>').html('Class Added to Waitlist'));
        }

        if(RegisterState == 3){
            console.log('promptCode: '+ RegisterState + ' ' + user.InProcessClasses[0].ItemNumber);

            console.log(user.InProcessClasses[0].RegistrationProcessingInfo.ContinueRegistrationState);
            $(registrationInitWrapper)
                .append( $('<div>').html(user.InProcessClasses[0].RegistrationProcessingInfo.Message) );

            registerMsg = "Registration Code Required";

        }
        $('button.' + trigger).parent().append(registrationInitWrapper);


        self.showClassAddedToRegisteredPopUp( thisClass, courseId, yrq, 0, registerMsg )
        console.log( trigger );
    } //end displayIndividualContinueRegistration


    //this.showRegistrationMessage = function( trigger, msg ){
    this.showRegistrationMessage = function( thisClass, courseId, yrq, msg, scrollToDiv ){
        // thisClass, courseId, yrq
        var trigger = thisClass + yrq;
        console.log('showRegistrationMessage: ' + trigger + ' msg: ' + msg );

        var registeredItemWrapper = msg;

        //$('.classDetailHolder.' + trigger ).parent().append( registeredItemWrapper );
        $('.classDetailHolder.' + trigger + ' .registrationStatusHolder' ).append( registeredItemWrapper );

        //var scrollToDiv = $( '.' + thisClass + yrq + ' .classTags' ).offset();
        console.log( scrollToDiv );
        $("html, body").animate({ scrollTop: scrollToDiv }, '400');
        //window.scroll( 0, scrollToDiv.bottom );

    }


    this.showAlreadyFavoriteMessage = function( trigger, msg ){
        console.log( msg);
        $('.classDetailHolder.' + trigger + ' .registrationStatusHolder').append( msg );

    }


    this.showClassAddedToFavoritesPopUp = function( thisClass, courseId, yrq, scrollToDiv ){

        var trigger = thisClass + yrq;
        var popUpLeft = ( $(window).width() /2 ) - 150;
        console.log('show popup: ' + trigger + ' : ' + scrollToDiv  + ' : ' +  popUpLeft );

        var registerMsg = 'Class added to MyFavorites';

        $('.classAdded').remove();
        var popupClose = $('<span>').addClass('classAddedIcon ui-btn-icon-left ui-icon-delete') ;
        var popUp = $('<div>')
            .addClass('classAdded')
            .append(    $( popupClose )   )
            .append( registerMsg );

        setTimeout( "$('.classAdded').remove();",15000 );

        //$('#MyFavoritesControls').appendTo( popUp );
        $( popUp ).clone().appendTo( '#MyFavoritesControls .responseMessageWrapper.' + thisClass);
        $( '#MyFavoritesControls .responseMessageWrapper.' + thisClass + ' button').slideUp();


        //$('#home .row.homePage').appendTo( popUp );
        $( popUp ).clone().appendTo( '#home .row.homePage .classDetailHolder.' + thisClass+yrq + ' .addCourseWrapper' );

        $('.classAdded').on('click', function(){
            $('.classAdded').remove();
        });

    }


    this.showClassAddedToRegisteredPopUp = function( thisClass, courseId, yrq, scrollToDiv, registerMsg ){
        //fired when a class is registered from the MyFavorites list
        var trigger = thisClass + yrq;

        console.log('show popup: ' + registerMsg );

        var popUp = $('<div>')
            .append( registerMsg )
            .appendTo( $('#PopUp') );
        self.showPopUp();

    }


    this.displayContinueRegistration = function() {
        //    Public Enum ContinueRegistrationStates
        //        None = 0 SuccessWithCode = 1  SuccessWithWaitList = 2  Fail = 3  Errors = 4
        //    End Enum
        console.log('Continue Registration Results' );

        $.each(user.InProcessClasses, function() {
            var aClass = this;
            console.log('Continue Results: ' + aClass.RegistrationProcessingInfo.ContinueRegistrationState );

            var registrationInitWrapper = $('<div>').addClass('registrationInitWrapper ' + aClass.ItemNumber);

            var cssClass = self.ContinueRegistrationStates(aClass.RegistrationProcessingInfo.ContinueRegistrationState);
            var inputCheck = $('<input>').attr('type', 'checkbox').addClass(cssClass).val(aClass.ItemNumber);


            if (aClass.RegistrationProcessingInfo.ContinueRegistrationState == 1
                || aClass.RegistrationProcessingInfo.ContinueRegistrationState == 2) {
                $(inputCheck).hide();
            }

            var responseMessageWrapper = $('<div>'); //so I can just append to it later if need input for code

            $(registrationInitWrapper)
                .append($('<div>')
                    .append(inputCheck).addClass('registrationInit')
                    .append($('<span>').html(aClass.ItemNumber).addClass('ItemNumber')   )
                    .append($('<span>').html(aClass.CourseId).addClass('CourseId')   )
                    .append($('<span>').html(aClass.CourseTitle).addClass('CourseTitle')   )
                    .append($('<span>').html(aClass.Status).addClass('Status')   )
                    .append($(responseMessageWrapper)
                        .addClass(cssClass.concat(' hidden registrationInitResult'))
                        .html(aClass.RegistrationProcessingInfo.Message)));


            //the condition is the equivalent of
            //fail
            //  AND
            //"(1027) Invalid course entry code."
            if (aClass.RegistrationProcessingInfo.ContinueRegistrationState == 3 &&
                aClass.RegistrationProcessingInfo.Message.indexOf('(1027)') > -1) {

                $(responseMessageWrapper).append($('<div>')
                    .append($('<span>').html('Course Entry Code: '))
                    .append($('<input>')
                        .attr('type', 'text')
                        .val('Length must be 5')
                        .one('click', function() {
                            $(this).val('11111'); //just takes out the initial default text
                        })));
            }

            $('#MyFavoritesControls').empty();
            $('#MyFavoritesControls').append(registrationInitWrapper);
        });

        $('.continueRegistrationSubmit').remove();

        $('.myFavoritesItemWrapper').last()
            .append($('<div>').addClass('continueRegistrationSubmit')
                .append($('<button>')
                    .text('2 Continue Registration')
                    .on('click', function() {
                        var n = $('.registrationInit input[type=checkbox]:checked').length;

                        if(  n >= 1  ){
                            user.continueRegistration();
                        }

                    })));

    }


    this.addCourseButtons = function (afterLogin) {

        //close all details except the "selectedClass" if parameter==true
        if (afterLogin) {
            $.each($('.course'), function () {
                //$(this).addClass('.closedCourse');

                if (this.id != myCampus.SelectedClass.ClassId && !($(this).hasClass('closedCourse'))) {
                    myCampus.toggleClassDetails(this.id);
                } else if (this.id == myCampus.SelectedClass.ClassId) {
                    $('html, body').animate({
                        scrollTop: $(this).offset().top
                    }, 1000);
                }
            });
        }

        $('.' + myCampus.SelectedClass.ClassId + '.classDetailHolder  .addCourseWrapper').remove();
        $('.' + myCampus.SelectedClass.ClassId + '.classDetailHolder  .loginButtonMsg').remove();

        var classDetailHolder = $('.classDetailHolder.' + myCampus.SelectedClass.ClassId);
        var addCourseWrapper = $('<div>').addClass('addCourseWrapper');

        if (user.IsAuthenticated) {
            $(classDetailHolder).append(addCourseWrapper);
        }

        //None = 0, Past = 1, Present = 2, Future = 3
        switch (myCampus.SelectedQuarter.RelativeState) {
            case 1:
                //no buttons for past quarters
                break;
            case 2:
                self.manageButtonsPresentQuarter();
                break;
            case 3:
                self.manageButtonsFutureQuarter();
                break;
            default:
                //should never be 0 or otherwise
                //if this fires something is broken
                break;
        }

    } //End- addCourseRegisterButtons


    this.showLogin = function (sender) {
        self.clearLoginMessages();
        $('.loginWrapper').removeClass('activeNav');
        $('#SignIn').addClass('activeNav');

        $('#TxSID').focus();

        $("#TxSID").keyup(function (event) {
            if (event.keyCode == 13) {
                $("#TxPIN").focus();


                $("#TxPIN").keyup(function (event) {
                    if (event.keyCode == 13) {
                        $("#BtSignIn").click();
                    }
                });

            }
        });

        //window.scrollTo(0, 0);

        if (isMobile()) {
            $.magnificPopup.open({
                items: {
                    src: '#SignIn',
                    type: 'inline'
                },
                showCloseBtn: false,
                closeOnBgClick: true,
                mainClass: 'holder'
            });
            $('.mfp-bg').css({ 'opacity': '0' });
            $('.mfp-content').css({ 'height': '100%', 'max-width': '980px' });

        }


        $('#BtSignIn').off();
        $('#BtSignIn').on('click', function () {
            user.Login(sender);
        });
    }


    //Concern I may have about this in future is
    //Does this properly support "between quarters"?
    this.manageButtonsPresentQuarter = function () {

        if (user.IsAuthenticated) {
            self.buildFavoriteControl();
            self.buildSecondaryControl();

        } else {
            self.buildLoginControl();
        }
    }


    //Concern I may have about this in future is
    //Does this properly support "between quarters"?
    this.manageButtonsFutureQuarter = function () {

        if (user.IsAuthenticated) {
            self.buildFavoriteControl();
            self.buildSecondaryControl();
            if(myCampus.SelectedClass.Status == 'Unavailable'){
                $('.classDetailHolder.' + myCampus.SelectedClass.ClassId + ' .registrationStatusHolder')
                    .append(
                        $('<span>').html('Registration is currently unavailable at this time.')
                            .addClass('classStatus unavailable')
                    );
            }
        } else {
            self.buildLoginControl();
        }
    }



    this.buildLoginControl = function () {

        var classId = myCampus.SelectedClass.ClassId;
        var classDetailHolder = $('.classDetailHolder.' + myCampus.SelectedClass.ClassId);
        var addCourseWrapper = $(classDetailHolder).find('.addCourseWrapper');
        var loginButtonMsg = $('<div>').addClass('loginButtonMsg')
            .text('Log In')
            //.text('Log in to add class')
            .on('click', null, { 'classId': classId }, function (event) {

                //pay special attention to this classId as it is specifically scoped to this event

                myCampus.InitSelectedCourseAndClass(classId);
                Html.showLogin();
            });

        if (myCampus.SelectedClass.Status != 'Closed' && myCampus.SelectedClass.Status != 'Cancelled') {
            var classDetailHolder = $('.classDetailHolder.' + myCampus.SelectedClass.ClassId);
            $(classDetailHolder).append(loginButtonMsg);
        }

    }


    this.buildFavoriteControl = function () {

        if (myCampus.SelectedClass.Status != 'Closed' && myCampus.SelectedClass.Status != 'Cancelled') {

            var aFavorite = user.getFavoriteByItemNumber(myCampus.SelectedClass.ItemNumber);
            var favoriteButton;
            var classId = myCampus.SelectedClass.ClassId;

            if (aFavorite == undefined) { //not in users favorites
                favoriteButton = $('<div>')
                    .attr({ 'class': myCampus.SelectedClass.ItemNumber + "-FavoriteButton FavoriteButton ui-btn-icon-left ui-btn ui-icon-plus", 'data-role': 'button' })
                    .on('click', null, { 'classId': classId }, function (event) {

                        //pay special attention to this classId as it is specifically scoped to this event
                        ga('send', 'event', 'Add Favorites Button clicked', classId);


                        var scrollToDiv = $('.' + myCampus.SelectedClass.ItemNumber + myCampus.SelectedYRQ + '.classDetailHolder .addCourseWrapper');
                        var
                            scrollTop = $(window).scrollTop(),
                            elementOffset = $(scrollToDiv).offset().bottom,
                            distance = (scrollTop + 20);

                        myCampus.InitSelectedCourseAndClass(classId);
                        user.addMyFavoriteItem(myCampus.SelectedClass.ItemNumber, myCampus.SelectedCourse.CourseId, myCampus.SelectedYRQ, distance);

                        var msg = $('<span>').html('Class added to MyFavorites').addClass('responseMessageWrapper');
                    }).text('Add MyFavorites');

            } else {
                var msg = $('<span>').html('Class added to MyFavorites').addClass('responseMessageWrapper');
                Html.showAlreadyFavoriteMessage(myCampus.SelectedClass.ItemNumber + myCampus.SelectedYRQ, msg);

                favoriteButton = $('<div>')
                    .attr({ 'class': myCampus.SelectedClass.ItemNumber + "-FavoriteButton FavoriteButton ui-btn-icon-left ui-btn ui-icon-plus", 'data-role': 'button' })
                    .on('click', null, { 'classId': classId }, function (event) {

                        //pay special attention to this classId as it is specifically scoped to this event
                        ga('send', 'event', 'View Favorites Button clicked', classId);

                        myCampus.InitSelectedCourseAndClass(classId);
                        self.viewMyFavorites();
                    })
                    .text('View MyFavorites');
            }

            var classDetailHolder = $('.classDetailHolder.' + myCampus.SelectedClass.ClassId);
            var addCourseWrapper = $(classDetailHolder).find('.addCourseWrapper');
            $(addCourseWrapper).append(favoriteButton);
        }
    }


    this.buildSecondaryControl = function () {

        //no secondary buttons get added if registration closed
        if (myCampus.SelectedQuarter.IsRegistrationOpen || myCampus.SelectedClass.IsLateStart) {

            //this is to accomodate mocking the date
            //future quarters will often be unavailable do to the date so if classes haven't been
            //assigned a status I'm setting them to open
            if ($('#TxDevDate').val().length > 0 && myCampus.SelectedClass.Status == 'Unavailable') {
                myCampus.SelectedClass.Status = 'Open';
            }

            switch (myCampus.SelectedClass.Status) {
                case 'Waitlist':
                    self.buildWaitListControl();
                    break;
                case 'Unavailable':
                    //no buttons
                    break;
                case 'Closed':
                    //no buttons
                    break;
                case 'Cancelled':
                    //no buttons
                    break;
                default:
                    //should catch all "normal" type classes
                    self.buildRegisterControl();
                    break;
            }
        }
    }


    this.buildRegisterControl = function () {

        var regItem = user.getRegisteredByItemNumber(myCampus.SelectedClass.ItemNumber);
        var registerButton;
        var classId = myCampus.SelectedClass.ClassId;
        if(!user.IsRegistrationBlocked){
            if (regItem == undefined) { //item not already registred

                registerButton = $('<div>')
                    .attr({ 'class': myCampus.SelectedClass.ItemNumber + "-RegisterButton RegisterButton ui-btn-icon-left  ui-btn ui-icon-plus ", 'data-role': 'button' })
                    .text('Register Class Now')
                    .on('click', null, { 'classId': classId }, function (event) {

                        //pay special attention to this classId as it is specifically scoped to this event
                        ga('send', 'event', 'Register Button Clicked', classId);

                        ga('send', 'pageview', '/registerNow');

                        //user.initIndividualRegistration(myCampus.SelectedClass.ItemNumber);
                        myCampus.InitSelectedCourseAndClass(classId);
                        self.showAgreementMessage(myCampus.SelectedClass.ItemNumber);
                    });

            } else {
                registerButton = $('<div>')
                    .attr({ 'class': myCampus.SelectedClass.ItemNumber + "-RegisterButton RegisterButton ui-btn ui-btn-icon-left ui-icon-plus ", 'data-role': 'button' })
                    .text('View MyRegistered')
                    .on('click', null, { 'classId': classId }, function (event) {

                        //pay special attention to this classId as it is specifically scoped to this event
                        ga('send', 'event', 'View Registered Button clicked', classId);


                        myCampus.InitSelectedCourseAndClass(classId);
                        self.viewMyRegistered();

                    });
            }
        } else {
            //registration blocked by UA code
            registerButton = $('<div>')
                .attr({"class": " punitiveMessage " })
                .text( user.PunitiveMessages )
            ;
        }




        //Doug - 11/2015 - removing check for registration appt
        //if (user.RegAppointment.IsPastAppointment) {

        var classDetailHolder = $('.classDetailHolder.' + myCampus.SelectedClass.ClassId);
        var addCourseWrapper = $(classDetailHolder).find('.addCourseWrapper');
        if(!user.IsRegistrationBlocked){
            $(addCourseWrapper).append(registerButton);
        } else {
            $(classDetailHolder).append(registerButton);
        }
    }


    this.buildWaitListControl = function () {

        var waitItem = user.getWaitListByItemNumber(myCampus.SelectedClass.ItemNumber);
        var waitButton;
        var classId = myCampus.SelectedClass.ClassId;

        if (waitItem == undefined) { //item not already waitlisted

            waitButton = $('<div>')
                .attr({ 'class': myCampus.SelectedClass.ItemNumber + "-WaitlistButton WaitlistButton ui-btn ui-btn-icon-left ui-icon-plus", 'data-role': 'button' })
                .text('Add MyWaitlist')
                .on('click', null, { 'classId': classId }, function (event) {

                    //pay special attention to this classId as it is specifically scoped to this event
                    ga('send', 'event', 'Add Waitlist Button clicked', classId);

                    //user.initIndividualRegistration(myCampus.SelectedClass.ItemNumber);
                    myCampus.InitSelectedCourseAndClass(classId);
                    self.showAgreementMessage(myCampus.SelectedClass.ItemNumber);
                });

        } else {

            waitButton = $('<div>')
                .attr({ 'class': myCampus.SelectedClass.ItemNumber + "-WaitlistButton WaitlistButton ui-btn ui-btn-icon-left ui-icon-plus", 'data-role': 'button' })
                .text('View MyWaitlist')
                .on('click', null, { 'classId': classId }, function (event) {

                    //pay special attention to this classId as it is specifically scoped to this event
                    ga('send', 'event', 'View Waitlist Button clicked', classId);

                    myCampus.InitSelectedCourseAndClass(classId);
                    self.viewMyWaitlist();
                });

        }

        //Doug - 11/2015 - removing check for registration appt
        //if (user.RegAppointment.IsPastAppointment) {

        var classDetailHolder = $('.classDetailHolder.' + myCampus.SelectedClass.ClassId);
        var addCourseWrapper = $(classDetailHolder).find('.addCourseWrapper');
        $(addCourseWrapper).append(waitButton);
        //}
    }


    this.showAgreementMessage = function ( thisClass ){
        //console.log('showAgreementMessage');
        //ga('send', 'event', 'Show Agreement Message', classId);

        var msgTitle = $('<h2>').addClass('agreementMsgTitle').text('Notice');

        //var agreementMsg = $('<div>').addClass('agreementMsg')
        //                    .append(
        //                        $('<p>').text('Payment is due within 7 business days of your first registration')
        //                    )
        //                    .append(
        //                        $('<p>').css('text-align', 'center').text('- or -')
        //                    )
        //                    .append(
        //                        $('<p>').text('prior to the first day of the quarter whichever comes first. Students that do not pay by the deadline may be dropped from their class(es).')
        //                    );

        var agreementMsg = '';

        if (myCampus.SelectedQuarter.IsPastDeferredDate) {

            agreementMsg = $('<div>').addClass('agreementMsg')
                .append(
                    $('<p>').text('Payment is due within 7 business days of your first registration.')
                )
                .append(
                    $('<p>').css('text-align', 'center').text('- OR -')
                )
                .append(
                    $('<p>').text('Payment is due prior to the first day of the quarter whichever comes first. Students that do not pay by the deadline may be dropped from their class(es).'))
                .append(
                    $('<p>').css({ 'margin-bottom': '20px', 'margin-top':'10px' }).text('Students that do not pay by the deadline may be dropped from their class(es).'))
                .append(
                    $('<p>').text('I understand that it is my responsibility to know college enrollment policies, procedures and deadlines. Unpaid debts may be referred to collections and assessed an additional contingent fee of up to 50 percent of the amount.'));

        } else {

            agreementMsg = $('<div>').addClass('agreementMsg')
                .append(
                    $('<div>').css({ 'text-align': 'center', 'margin-bottom': '20px', 'background-color': '#FFFF99' })
                        .append($('<p>').text('Students who register today, please note:'))
                        .append($('<p>').text('Tuition for ' + myCampus.SelectedQuarter.FriendlyName + ' is due ' + myCampus.SelectedQuarter.DeferredTuitionDate))
                )
                .append(
                    $('<p>').css({ 'text-align': 'center', 'margin-bottom': '20px' }).text('Students that do not pay by the deadline may be dropped from their class(es).')
                )
                .append(
                    $('<p>').text('I understand that it is my responsibility to know college enrollment policies, procedures and deadlines. Unpaid debts may be referred to collections and assessed an additional contingent fee of up to 50 percent of the amount.')
                );

        }


        if (isMobile()) {
            var okButton = $('<div>')
                .attr({ 'class': 'ui-btn-icon-left ui-btn ui-icon-plus mobile', 'data-role': 'button' })
                .on('click', function ($this) {
                    console.log('init registration OK: ' + thisClass);
                    ga('send', 'event', 'Show Agreement Message', 'Terms Agreed ' + thisClass);

                    if (thisClass != undefined) {
                        user.initIndividualRegistration(thisClass);
                    } else {

                        user.initRegistration();
                    }
                })
                .text('I agree to these terms');

            var cancelButton = $('<div>')
                .attr({ 'class': 'ui-btn-icon-left ui-btn ui-icon-minus mobile', 'data-role': 'button' })
                .on('click', function ($this) {
                    console.log('init registration CANCEL');
                    ga('send', 'event', 'Show Agreement Message', 'Terms NOT Agreed ' + thisClass);

                    $.magnificPopup.close();
                })
                .text('I do not agree');
        } else {
            var okButton = $('<div>')
                .attr({ 'class': 'ui-btn-icon-left ui-btn ui-icon-plus', 'data-role': 'button' })
                .on('click', function ($this) {
                    console.log('init registration OK: ' + thisClass);

                    ga('send', 'event', 'Show Agreement Message', 'Terms Agreed ' + thisClass);

                    if (thisClass != undefined) {
                        user.initIndividualRegistration(thisClass);
                    } else {

                        user.initRegistration();
                    }
                })
                .text('I agree to these terms');

            var cancelButton = $('<div>')
                .attr({ 'class': 'ui-btn-icon-left ui-btn ui-icon-minus', 'data-role': 'button' })
                .on('click', function ($this) {
                    console.log('init registration CANCEL');
                    ga('send', 'event', 'Show Agreement Message', 'Terms NOT Agreed ' + thisClass);

                    $.magnificPopup.close();
                })
                .text('I do not agree');
        }




        //$('#RegistrationResponseContainer')
        //$('#ErrorPopUp').empty().append(msgTitle).append(agreementMsg).append(cancelButton).append(okButton);


        if (isMobile()) {
            $('#ErrorPopUp').empty().append(msgTitle).append(agreementMsg).append(okButton).append($('<div>')).append(cancelButton);
        } else {
            $('#ErrorPopUp').empty().append(msgTitle).append(agreementMsg).append(okButton).append(cancelButton);
        }


        $.magnificPopup.open({
            items: {
                src: '#ErrorPopUp',
                type: 'inline'
            },
            showCloseBtn: false,
            closeOnBgClick: false,
            mainClass: 'holder'
        });
    }



    this.showPayLater = function () {
        $('#TuitionAgreementMsg').empty();
        var agreementMsg = '';

        if (myCampus.SelectedQuarter.IsPastDeferredDate) {

            agreementMsg = $('<div>').addClass('agreementMsg')
                .append(
                    $('<p>').text('Payment is due within 7 business days of your first registration.')
                )
                .append(
                    $('<p>').css('text-align', 'center').text('- OR -')
                )
                .append(
                    $('<p>').text('Payment is due prior to the first day of the quarter whichever comes first. Students that do not pay by the deadline may be dropped from their class(es).'))
            /*.append(
                                    $('<p>').css({ 'margin-bottom': '20px', 'margin-top': '10px' }).text('Students that do not pay by the deadline may be dropped from their class(es).'))
                            .append(
                                    $('<p>').text('I understand that it is my responsibility to know college enrollment policies, procedures and deadlines. Unpaid debts may be referred to collections and assessed an additional contingent fee of up to 50 percent of the amount.'))*/

            ;

        } else {

            agreementMsg = $('<div>').addClass('agreementMsg')
                .append(
                    $('<div>').css({ 'text-align': 'center', 'margin-bottom': '20px', 'background-color': '#FFFF99' })
                        .append($('<p>').text('Students who register today, please note:'))
                        .append($('<p>').text('Tuition for ' + myCampus.SelectedQuarter.FriendlyName + ' is due ' + myCampus.SelectedQuarter.DeferredTuitionDate))
                )
                .append(
                    $('<p>').css({ 'text-align': 'center', 'margin-bottom': '20px' }).text('Students that do not pay by the deadline may be dropped from their class(es).')
                )
            /*
                                .append(
                                    $('<p>').text('I understand that it is my responsibility to know college enrollment policies, procedures and deadlines. Unpaid debts may be referred to collections and assessed an additional contingent fee of up to 50 percent of the amount.')
                                )*/
            ;

        }

        var okButton = $('<div>')
            .attr({ 'class': 'okButton', 'data-role': 'button' })
            .on('click', function ($this) {
                $('#TuitionAgreementMsg').removeClass('displayNone');
                $.magnificPopup.close();
            })
            .text('OK');




        $(agreementMsg).appendTo($('#TuitionAgreementMsg'));
        $(okButton).appendTo(agreementMsg);
        $('#TuitionAgreementMsg').removeClass('displayNone');

        $.magnificPopup.open({
            items: {
                src: '#TuitionAgreementMsg',
                type: 'inline'
            },
            showCloseBtn: false,
            closeOnBgClick: false,
            mainClass: 'holder'
        });


    }



    this.viewMyRegistered = function() {
        $('.activeNav').removeClass('activeNav');
        $( '.footerNav.myClasses' ).addClass('activeNav');
        $('#myclasses' ).addClass('activeNav');
        window.location.href = '#myclasses';
        Html.showRegisteredItems();
    }

    this.viewMyFavorites = function() {
        $('.activeNav').removeClass('activeNav');
        $( '.footerNav.myClasses' ).addClass('activeNav');
        $('#myclasses' ).addClass('activeNav');
        window.location.href = '#myclasses';
        Html.showMyFavorites();
    }

    this.viewMyWaitlist = function() {
        $('.activeNav').removeClass('activeNav');
        $( '.footerNav.myClasses' ).addClass('activeNav');
        $('#myClasses' ).addClass('activeNav');
        window.location.href = '#myclasses';
        Html.showWaitListItems();
    }



    this.hideLogin = function() {
        $('#LoginControls').slideUp('400').addClass('displayNone');
        $('#LnkLogin').html('Sign In');
        $('#LnkLogin').off();
        $('#LnkLogin').on('click', function(e) {
            self.showLogin();
            e.preventDefault();
        });

        //hide other menus
        $('#ForgotPassword').slideUp('400').addClass('displayNone');
        $('#ForgotSID').slideUp('slow').addClass('displayNone');

    }


    this.showForgotSID = function() {
        console.log('showForgotSID');
        $('.forgotSid.sidInputHolder').removeClass( 'displayNone' );
        $('#ForgotSIDResponse').empty()

        $('#TxRetrievalEmail').val('');

        $('.loginWrapper').removeClass('activeNav');
        $('#ForgotSID').addClass('activeNav');
        if( !$('#SecretQuestionForgotSID').hasClass( 'displayNone' ) ){
            $('#SecretQuestionForgotSID').addClass( 'displayNone' );
        }
    }

    this.showForgotPIN = function() {
        console.log('showForgotPIN');
        $('.forgotPin.sidInputHolder').removeClass( 'displayNone' );
        $('#ForgotPINResponse').empty()

        $('#TxRetrievalSID').val('');

        $('.loginWrapper').removeClass('activeNav');
        $('#ForgotPIN').addClass('activeNav');
        if( !$('#SecretQuestionForgotPIN').hasClass( 'displayNone' ) ){
            $('#SecretQuestionForgotPIN').addClass( 'displayNone' );
        }
    }


    this.showNotAStudent = function() {
        console.log('showNotAStudent');
        $('.forgotPin.sidInputHolder').removeClass( 'displayNone' );

        $('.loginWrapper').removeClass('activeNav');
        $('#NotAStudent').addClass('activeNav');


    }





    this.showRegisterNow = function(){
        $('.loginWrapper').removeClass('activeNav');
        self.initRegisterNow();
    }

    this.initRegisterNow = function (regNowValue) {
        console.log('initRegisterNow - regNowValue: ' + regNowValue);
        $('#RegisterNowPopUp').empty();


        ga('send', 'pageview', '/registerNow');

        $.each(myCampus.Quarters.QuarterList, function () {

            if (this.YRQ == myCampus.SelectedYRQ) {


                var RegisterNowTitleHolder = $('<div>').addClass('RegisterNowTitleHolder');
                var RegisterNowTitle = $('<span>').addClass('RegisterNowTitle').text('Register Now -');
                var RegisterNowQuarter = $('<span>').addClass('RegisterNowQuarter').text(myCampus.SelectedQuarter.FriendlyName);

                $(RegisterNowTitleHolder).append(RegisterNowTitle).append(RegisterNowQuarter);

                //Doug - 11/2015 - removing reg appt requirement
                if (this.IsRegistrationOpen || regNowValue == 'continue') {

                    ga('send', 'event', 'Register Now Available');

                    var registerNow = $('<div>').addClass('registerNow').attr({ 'id': 'registerNow' });
                    var registerNowControls = $('<div>').addClass('MyCampusRegisterControls').attr({ 'id': 'MyCampusRegisterControls' });
                    var registerNowDialog1 = $('<p>').addClass('addClasses').text('Add Classes');

                    var radioHolder1 = $('<span>').addClass('radioHolder1');
                    var registerNowRadio1 = $('<input>').attr({ 'type': 'radio', 'id': 'registerNowRadio1', 'name': 'registerNowRadio' }).val('');

                    var registerNowRadio1Label = $('<a>').attr({})
                        .text('Register from MyFavorites folder')
                        .addClass('radioLabel')
                        .on('click', function () {

                            ga('send', 'event', 'Register Now From Favorites Selected');

                            $('.footerNav.myClasses').click();

                            $.magnificPopup.close();

                            self.showMyFavorites();
                        });

                    var radioHolder2 = $('<span>').addClass('radioHolder2');
                    var registerNowRadio2 = $('<input>').attr({ 'type': 'radio', 'id': 'registerNowRadio2', 'name': 'registerNowRadio', 'checked': 'checked' }).val('');
                    var registerNowRadio2Label = $('<label>').attr({ 'for': 'registerNowRadio2' })
                        .text('Register here by entering an item number')
                        .addClass('radioLabel');



                    var enterTextHolder = $('<div>').addClass('enterTextHolder');
                    var registerNowEnterText = $('<span>').addClass('enterText').text('Enter Item #: ');
                    var registerNowTextInput = $('<input>').attr({ 'maxlength': '4', 'type': 'text' });

                    var registerNowInput = $('<div>').addClass('MyCampusRegister')
                        .attr({ 'id': 'MyCampusRegister' })
                        .text('Register Class').val('Register')
                        .on('click', function () {
                            Html.validateMyCampusRegistration();
                        })
                        .append($('<span>').addClass('ui-btn-icon-left ui-icon-plus'));


                    var validation = $('<span>').addClass('validation');


                    $(RegisterNowTitleHolder).appendTo($('#RegisterNowPopUp'));


                    $(registerNowEnterText).appendTo(enterTextHolder);
                    $(registerNowTextInput).appendTo(enterTextHolder);

                    $(registerNowDialog1).appendTo(registerNowControls);


                    //radioHolder1
                    $(registerNowRadio1Label).appendTo(radioHolder1);
                    $(radioHolder1).appendTo(registerNowControls);

                    //OR
                    $('<div>').addClass('RegisterNowOr').html('OR').appendTo(registerNowControls);

                    //radioHolder2
                    $(registerNowRadio2Label).appendTo(radioHolder2);
                    $(radioHolder2).appendTo(registerNowControls);

                    $(enterTextHolder).appendTo(registerNowControls);
                    $(validation).appendTo(registerNowControls);

                    $(registerNowControls).appendTo(registerNow);

                    $(registerNowInput).appendTo(registerNow);
                    $(validation).appendTo(registerNow);

                    $(registerNow).appendTo($('#RegisterNowPopUp'));

                } else {
                    //registration not open
                    $(RegisterNowTitleHolder).appendTo($('#RegisterNowPopUp'));

                    ga('send', 'event', 'Register Now NOT Available');


                    $('#RegisterNowPopUp')
                        .append(
                            $('<p>').addClass('registerNow').text('Registration is not open for most classes. If you need to register for a late start class, click continue to proceed.')
                        )
                        .append(
                            $('<div>')
                                .addClass('buttonHolder')
                                .append(
                                    $('<button>')
                                        .text('Continue')
                                        .addClass('continue ui-btn-icon-left ui-icon-plus')
                                        .on('click', function () {
                                            self.initRegisterNow('continue');
                                        })
                                )
                                .append(
                                    $('<button>')
                                        .text('Cancel')
                                        .addClass('cancel ui-btn-icon-left ui-icon-delete')
                                        .on('click', function () {
                                            Html.hidePopUp();
                                        })
                                )
                        );




                }//IsRegistrationOpen

            }//yrq matched


            //open popUp
            $.magnificPopup.open({
                items: {
                    src: '#RegisterNowPopUp',
                    type: 'inline'
                },

                showCloseBtn: true,
                closeOnBgClick: false,
                mainClass: 'holder'
            });

        });
    }



    this.buildDropableClasses = function(){
        console.log( 'buildDropableClasses' );
        //$('#registerDropClasses').append();

        //Drop Classes
        var registerNowRule = $('<hr>').addClass('registerNowRule');
        $( registerNowRule ).appendTo( registerNow );

        var registerNowDialog2 = $('<p>').addClass('dropClasses').text( 'Drop Classes' );
        var registerNowDropHolder = $('<div>').addClass('registerNowDropHolder');

        var dropClasses = $('<div>').attr('id','registerDropClasses').addClass('registerDropClasses');

        console.log( user.RegisteredClasses );
        $.each(user.RegisteredClasses, function () {
            console.log(this);
            var classHolder = $('<div>').addClass('classHolder');
            if( this.ItemNumber != null ){
                var select = $('<input>')
                    .attr({'type': 'checkbox', 'value': this.ItemNumber })
                    .addClass( this.ItemNumber + ' registerDropClasses' )
                    .appendTo( classHolder );

                var dropableId = $('<div>').addClass('registerDropClasses id')
                    .html( this.CourseId ).appendTo( classHolder );
                console.log( this.CourseId );

                var dropableTitle = $('<div>').addClass('registerDropClasses title  ' +  this.ItemNumber)
                    .html( this.CourseTitle ).appendTo( classHolder );


                var dropableCredits = $('<div>').addClass('registerDropClasses credits')
                    .html( this.Credits ).appendTo( classHolder );




                var secondLine =  $('<div>').addClass('secondLine');


                var dropableItemNumber = $('<div>').addClass('registerDropClasses itemNumber')
                    .html( this.ItemNumber ).appendTo( secondLine );


                var dropableSectionNumber = $('<div>').addClass('registerDropClasses sectionNumber')
                    .html( '.' + this.SectionNumber ).appendTo( secondLine );


                var dropableMeetsMeetDays = $('<div>').addClass('registerDropClasses meetDays')
                    .html( this.Meets.MeetDays ).appendTo( secondLine );


                var dropableMeetsStartTime = $('<div>').addClass('registerDropClasses startTime')
                    .html( this.Meets.StartTime ).appendTo( secondLine );


                var dropableMeetsEndTime = $('<div>').addClass('registerDropClasses endTime')
                    .html( '&nbsp;- ' + this.Meets.EndTime ).appendTo( secondLine );


            }
            $(secondLine).appendTo( classHolder );
            $(classHolder).appendTo( dropClasses );



        });


        var registerNowInput2 = $('<div>')
            .addClass( 'registerNowDrop' )
            .attr({'id': 'registerNowDrop'})
            .text('Drop Classes').val('Drop')
            .on('click', function(){
                console.log('drop a class');

                var dropable = $('#registerDropClasses input:checked').length;
                console.log('dropable: ' + dropable );
                if( dropable >=1 ){
                    console.log('drop it');
                    self.validateDeleteMyRegistered('reg');

                    $.each( $('#registerDropClasses input:checked'), function(){
                        console.log( this.value );
                        var contentName = $('div.registerDropClasses.' + this.value );
                        console.log( contentName );

                        $('#ValidateDropPopUp .dropableClasses').append(

                            contentName

                        );

                    } );

                }
            })
            .append(
                $('<span>').addClass( 'ui-btn-icon-left ui-icon-minus')

            );



        $( registerNowDialog2 ).appendTo(    $('#RegisterNowPopUp')    );
        $( dropClasses ).appendTo(    registerNowDropHolder    );
        $( registerNowInput2 ).appendTo(    registerNowDropHolder    );
        $( registerNowDropHolder ).appendTo(    $('#RegisterNowPopUp')    );
    }


    this.showProfile = function() {
        $('.loginWrapper').removeClass('activeNav');
        self.initProfile();

        $.magnificPopup.open({
            items: {
                src: '#ProfilePopUp',
                type: 'inline'
            },
            showCloseBtn: false,
            closeOnBgClick: false,
            mainClass: 'holder'
        });

        $('.mfp-content').css({'vertical-align': 'top'});
        $('.mfp-bg').css({'opacity': '0'});


        var triggerPosition = $('#myCollegeMenuTrigger' ).position().left;
        var triggerWidth = $( '#myCollegeMenuTrigger' ).width();
        console.log( triggerWidth );
        if( isMobile() ){
            if( triggerWidth > 0 ){
                var popUpPosition = triggerPosition - 150;
            } else {
                var popUpPosition = triggerPosition - 280;
            }
        } else {
            var popUpPosition = triggerPosition - 190;

        }

        if( windowWidth  > 370){
            $('#ProfilePopUp').css({'position': 'absolute', 'top': '60px ', 'left': popUpPosition  });
        } else {
            console.log('window less than 370');
            $('#ProfilePopUp').css({'position': 'absolute', 'top': '60px ', 'left': '0'  });
        }


        console.log( 'popUpPosition: ' + triggerPosition );
        console.log( 'popUpPosition: ' + popUpPosition );

        $( window ).resize(function() {
            windowWidth = $(window).width();
            triggerWidth = $( '#myCollegeMenuTrigger' ).width();
            triggerPosition = $('#myCollegeMenuTrigger' ).position().left;
            if( isMobile() ){
                console.log('isMobile');
                if( triggerWidth > 0 ){
                    console.log('trigger greater than 0');
                    var popUpPosition = triggerPosition - 150;
                } else {
                    var popUpPosition = triggerPosition - 280;
                }
            } else {
                popUpPosition = triggerPosition - 190;

            }

            if( windowWidth  > 370){
                $('#ProfilePopUp').css({'position': 'absolute', 'top': '60px ', 'left': popUpPosition  });
            } else {
                console.log('window less than 370');
                $('#ProfilePopUp').css({'position': 'absolute', 'top': '60px ', 'left': '0'  });
            }
        });
    }


    this.hideProfile = function() {
        console.log('hideProfile');
        $.magnificPopup.close();
    }


    this.showProfileOutOfDateMessage = function( trigger ) {
        console.log( 'showProfileOutOfDateMessage' );
        console.log(trigger);

        var msg, msgLine1, msgLine2, msgLine3;


        $('.profileUpdateMessage').remove();

        msg = $('<div>').addClass('profileUpdateMessage');
        //msg = $('div.profileUpdateMessage');

        msgLine1 = $('<p>').addClass('profileUpdateMessage').html('It\'s been awhile since you\'ve updated your contact information.');

        msgLine2 = $('<p>').addClass('profileUpdateMessage').html('The accuracy of your profile information is vital for us to serve your needs.');

        msgLine3 = $('<p>').addClass('profileUpdateMessage').html('Please check your profile and update any information that is incorrect.');


        $(msg)
            .append( msgLine1 )
            .append( msgLine2 )
            .append( msgLine3 );

        if( trigger == undefined  ){

            console.log( 'ProfilePopUp' );
            $('#ProfilePopUp').append( $(msg).clone() );

        } else {

            console.log( 'ProfileControls' );

            $('#ProfileControls').append( $(msg).clone() );

        }

    }


    this.showSecQuestionOutOfDateMessage = function(){
        console.log( 'showSecQuestionOutOfDateMessage' );

        $('#secretQuestionDialog').remove();
        $('#secretQuestionControls').remove();
        $('#updateControls').append(
            $('<p>').addClass('needUpdate').html('Change my security question')
        );
        self.initSecretQuestion();

    }


    this.showSecretQuestion = function(){
        console.log('showSecretQuestion');

        Html.showProfile();
        Html.initProfileUpdate();

        $('#updateControls .profileUpdateMessage.secQuestion').removeClass('collapsed');

    }


    this.initSecretQuestion = function(){

        var dialogBox = $('<div>').attr({'id': 'secretQuestionDialog'});

        var dialog1 = $('<p>').text('Your security question will be used to recover forgotten login credentials.');
        var dialog2 = $('<p>').text('You currently do not have a security question. Please select from the list below or create a new one.');
        var dialog3 = $('<p>').text('Your current security question is: ' + user.Profile.secQuestion );
        var dialog4 = $('<p>').text('Your current security answer is: #### ###' );
        //var dialog5 = $('<p>').text('Your current security answer is not set.' );

        var controlBox = $('<div>').attr({'id': 'secretQuestionControls'});

        var changeSecQuestion = $('<a>').addClass( 'changeSecQuestion' )
            .text('Change my security question')
            .on('click', function(){
                if( $(msg).hasClass('collapsed') ){
                    $(msg).removeClass('collapsed');
                } else {
                    $(msg).addClass('collapsed');
                }
            });
        var msg;

        msg = $('<div>').addClass('profileUpdateMessage secQuestion');
        if( user.Profile.secQuestion != "" ){
            $(msg).addClass('collapsed');
        }


        //msgLine1 = $('<p>').html('It\'s been awhile since you\'ve updated your security question, bla bla.');

        $(msg)
        //.append( msgLine1 )
            .append( dialogBox )
            .append( controlBox );
        if( user.Profile.secQuestion != "" ){
            $('#updateControls').append( changeSecQuestion );

        }
        $('#updateControls').append( msg );

        var question6Box = $('<input>')
            .addClass('question6Box')
            .attr({'type': 'text', 'placeholder': 'Custom question'});

        var answerBox =  $('<input>')
            .addClass('answerBox')
            .attr({'type': 'text', 'placeholder': 'Your answer'});

        var secQuestionSelectorLabel = $('<label>').attr({'for': 'secQuestionSelector'}).text('Select New Question:');

        var secQuestionSelector = $('<select>').attr({'id': 'secQuestionSelector', 'name': 'secQuestionSelector', 'placeholder': 'Choose a new question.'});



        var question0 = $('<option disabled selected >').html('Choose a new question')
            .val( '' );



        var question1 = $('<option>').addClass('secretQuestion')
            .val( 'Who was your first kiss?' )
            .html( 'Who was your first kiss?' );

        var question2 = $('<option>').addClass('secretQuestion')
            .val( 'What was the first concert you saw?' )
            .html( 'What was the first concert you saw?' );

        var question3 = $('<option>').addClass('secretQuestion')
            .val( 'What was your first car?' ).html( 'What was your first car?' );

        var question4 = $('<option>').addClass('secretQuestion')
            .val( 'What street did you grow up on?' ).html( 'What street did you grow up on?' );

        var question5 = $('<option>').addClass('secretQuestion')
            .val( 'Who was your favorite teacher?' ).html( 'Who was your favorite teacher?' );

        var question6 = $('<option>').addClass('secretQuestion')
            .val( 'custom' ).html( 'Create your own security question' );


        $( secQuestionSelector )
            .append( question0 ).append( question1 ).append( question2 ).append( question3 )
            .append( question4 ).append( question5 ).append( question6 );




        if( user.Profile.secQuestion == "" ){
            $( dialogBox )
                .append( dialog1 )
                .append( dialog2 );


        } else {
            $( dialogBox )
                .append( dialog1 )

                .append( dialog3 )
                .append( dialog4 );

        }




        $( controlBox )
            .append( secQuestionSelectorLabel )
            .append( secQuestionSelector )

            .append(
                $('<span>').addClass('question6BoxHolder displayNone')
                    .append( $('<span>').addClass('question6Box').text('Custom Question:') )
                    .append( question6Box )

            )

            .append(
                $('<span>').addClass('answerBoxHolder').append( answerBox )
                    .append( $('<span>').addClass('answerBox').text('New Answer') )
                    .append( answerBox )

            );




        $( answerBox ).on('click', function(){
            $('button.updateProfileAndQuestion').show();

            $('button.update').hide();

        });


        $( answerBox ).on('change', function(){
            console.log(  $(answerBox).val()  );
            var custom = false;

            $('span .invalidUpdate').remove();
            $('span.invalidSecQuestion').remove();

            $('.profileInvalid').slideUp('400', function(){
                $('.profileInvalid').remove();
            });

            if( $( secQuestionSelector ).val() == "custom" ){
                custom = true;
            }

            if(  $(answerBox).val() != ""  ){
                console.log(  custom  );
                if(  custom == false  ){
                    $('span.setProfileUpdateButton').html('true');

                } else {
                    if(  $(question6Box).val() != ""  ){


                        $('span.setProfileUpdateButton').html('true');


                    } else {
                        console.log('custom question empty');
                        $('span.setProfileUpdateButton').html('false');

                        Html.showSecretQuestionUpdateFail(  $('span.question6Box')  );

                    }
                }

            } else {
                $('span.setProfileUpdateButton').html('false');

            }

        });


        $( secQuestionSelector ).on('change', function(){
            console.log('secQuestionSelector changed: ' +  $(secQuestionSelector).val()   );

            //$('.invalidUpdate').remove();
            //$('span.invalidSecQuestion').remove();

            $('span.setProfileUpdateButton').html('true');
            $('button.update').hide()
            $('button.updateProfileAndQuestion').show();
            //$('button.myProfileOK').hide();
            //$('button.cancel').show();

            if( $(secQuestionSelector).val() == 'custom' ){
                console.log('secQuestionSelector is custom');
                $( '.question6BoxHolder' ).removeClass('displayNone');

                $('span.setProfileUpdateButton').html('true');

                //$('button.update').hide();
                $('button.profileUpdateCancel').show();

            } else {
                if( !$( '.question6BoxHolder' ).hasClass('displayNone') ){
                    $( '.question6BoxHolder' ).addClass('displayNone');

                }
                $('span.setProfileUpdateButton').html('true');
                //$('button.profileUpdateCancel').hide();
            }

        });


    }


    this.showSecretQuestionUpdateSuccess = function(){
        console.log( 'showSecretQuestionUpdateSuccess' );
        self.hideProfile();
    }


    this.showSecretQuestionUpdateFail = function( trigger ){
        console.log( 'showSecretQuestionUpdateFail' );
        //$('span.invalidSecQuestion').remove();
        console.log( trigger );

        $( trigger ).append(  $('<span>').addClass('invalidSecQuestion').html('*Invalid')   );

    }

    this.showChangePin = function(){
        console.log('showChangePin');

        self.initChangePin();

    }

    this.initChangePin = function(){
        console.log('initChangePin');
        $('#pinChangeControls').empty();

        //I don't understand why these aren't all instantiated properly (var)
        pinDialog1 = $('<p>').html("What's Your PIN Number?");
        pinDialog2 = $('<p>').html("Your Personal Identification Number is the same as your Touchtone PIN number, often your birthday.");
        pinDialog3 = $('<p>').html("We recommend that you change your pin for greater security.");

        var pinDialog4 = $('<p>').html("Please Note:");
        var pinDialog5 = $('<p>').html("Upon successfully changing your PIN you will be logged off and may re-login with your new PIN.");

        var pinText = $('<div>')
            .addClass('pinText')
            .append(pinDialog1)
            .append(pinDialog2)
            .append(pinDialog3)
            .append(pinDialog4)
            .append(pinDialog5);


        var inputDialog1 = $('<span>').addClass('pinInputDialog').text("SID");

        var inputDialog2 = $('<span>').addClass('pinInputDialog').text("OLD Pin");
        var inputDialog3 = $('<span>').addClass('pinInputDialog').text("NEW Pin");
        var inputDialog4 = $('<span>').addClass('pinInputDialog').text("Confirm Pin");

        var textBox1 = $('<input>').addClass('pinInput sid').attr({'type': 'text', 'placeholder': '', 'id': 'changePinInputSid'});

        var textBox2 = $('<input>').addClass('pinInput oldPin').attr({'type': 'password', 'placeholder': ''});
        var textBox3 = $('<input>').addClass('pinInput newPin').attr({'type': 'password', 'placeholder': ''});
        var textBox4 = $('<input>').addClass('pinInput confirmPin').attr({'type': 'password', 'placeholder': ''});

        var inputHolder1 = $('<div>')
            .addClass('inputHolder')
            .append(inputDialog1)
            .append(textBox1);

        var inputHolder2 = $('<div>')
            .addClass('inputHolder')
            .append(inputDialog2)
            .append(textBox2);

        var inputHolder3 = $('<div>')
            .addClass('inputHolder')
            .append(inputDialog3)
            .append(textBox3);

        var inputHolder4 = $('<div>')
            .addClass('inputHolder')
            .append(inputDialog4)
            .append(textBox4);

        var pinUpdate = $('<div>')
            .addClass('pinUpdate ui-btn')
            .html('Update PIN')
            .on('click', function(){
                $('#pinChangeControls .upDatePinFail').remove();
                if( self.pinChageIsValid() ){
                    user.changePin();
                } else {
                    console.log('pinChageIsValid not valid');
                    $('#pinChangeControls .pinText').append(
                        $('<div>').addClass('upDatePinFail').text( 'PIN update failed.' )

                    );
                }
            });

        $('#pinChangeControls')
            .append(pinText)
            .append(inputHolder1)
            .append(inputHolder2)
            .append(inputHolder3)
            .append(inputHolder4)
            .append(pinUpdate)
        ;




        $.magnificPopup.open({
            items: {
                src: '#pinChangeWrapper',
                type: 'inline'
            },
            showCloseBtn: true,
            closeOnBgClick: true,
            mainClass: 'holder'
        });


        $('#changePinInputSid').focus();
    }

    this.pinChageIsValid = function(){
        console.log('checkingPin');
        var isPinValid = false;
        var oldPin = $('input.oldPin').val();
        var newPin = $('input.newPin').val();
        var confirmPin = $('input.confirmPin').val();
        var sid = $('.pinInput.sid').val();
        var regex = /^[0-9]{4,6}$/;
        var sidRegex = /^[0-9]{9}$/;

        if(
            sidRegex.test(sid) &&
            regex.test(oldPin) &&
            regex.test(newPin) &&
            oldPin != newPin &&
            newPin == confirmPin
        ) {
            isPinValid = true;
        }
        console.log(isPinValid);
        return isPinValid;
    }


    this.showTuition = function() {


        //$('#TuitionCControlWrapper').append( tuitionTitleBar );


        $.magnificPopup.open({
            items: {
                src: '#TuitionCControlWrapper',
                type: 'inline'
            },
            showCloseBtn: true,
            closeOnBgClick: true,
            mainClass: 'holder'
        });
        $('#DdlTuitionYRQ').on('change', function(){

            $('#TuitionDisplay').slideUp();
        });
    }

    this.hideTuition = function() {
        console.log('hideTuition');
        $('.loginWrapper').removeClass('activeNav');
        $('#LnkMyTuition span').removeClass('ui-icon-carat-u')
        $('#LnkMyTuition span').addClass('ui-icon-carat-d')

        $('#TuitionCControls').slideUp('slow').addClass('displayNone');

        $('#LnkMyTuition').off();
        $('#LnkMyTuition').on('click', function(e) {
            self.showTuition();
            e.preventDefault();
        });
    }

    this.showTuitionAmount = function (amount) {
        console.log('showTuitionAmount');
        //$('#TuitionDisplay').empty();


        console.log('amount: ' + amount);
        if (amount != "block") {
            var payNow = $('<input>').attr({ 'type': 'button' }).val('Pay Tuition Now')
                .on('click', function () { user.initializePayment($('#DdlTuitionYRQ').val()); });

            var payDeferred = $('<input>').attr({ 'type': 'button' }).val('Deferred Payment')
                .on('click', function () {

                    switch (myCampus.CampusCode) {
                        case '062':
                            //self.FriendlyName = 'Seattle Central';
                            window.open("http://www.seattlecentral.edu/tuition/ecashier.php");
                            break;

                        case '063':
                            //self.FriendlyName = 'North Seattle';
                            window.open("https://northseattle.edu/tuition-fees/deferred-tuition-payment-system");
                            break;

                        case '064':
                            //self.FriendlyName = 'South Seattle';
                            window.open("http://www.southseattle.edu/financial/facts-payment.aspx");
                            break;

                        case '065':
                            //self.FriendlyName = 'Seattle SVI';
                            break;
                    }




                });



            var msgText = $('#DdlTuitionYRQ').val();
            console.log(msgText);
            if (msgText == "") {
                msgText = 'Charges retrieved successfully for All Quarters.'
            } else {
                msgText = 'Charges retrieved successfully for selected quarter.';
            }

            var message = $('<span>')
                .addClass('tuitionMessage').html(msgText);

            var tuitionAmount = $('<span>')
                .addClass('tuitionAmount').html('Amount Due: $' + amount);


            var creditCardLogoMsg = $('<span>')
                .addClass('creditCardLogoMsg').text('To pay with a Debit card please ensure that there is a MasterCard or Visa Logo on your card in order for your payment to be processed. Debit cards without these logos are not accepted.');


            $('#TuitionDisplay').append(creditCardLogoMsg);
            $('#TuitionDisplay').append(message);
            $('#TuitionDisplay').append(tuitionAmount);


            var tuitionPayButtons = $('<div>').addClass('tuitionPayButtons');
            $(tuitionPayButtons).append(payDeferred);
            $(tuitionPayButtons).append(payNow);//.append( payFinancialAid ).append( payLater );

            $('#TuitionDisplay').append(tuitionPayButtons);
        } else {
            console.log('tuition blocked due to user in  collections');
            var creditCardLogoMsg = $('<span>')
                .addClass('creditCardLogoMsg')

                .append($('<span>').text('Your account is past due and has been referred to a collection agency.'))
                .append($('<span>').text('You are blocked from using the online payment system until your overdue balance is corrected.'))
                .append($('<span>').text('If you received a letter from Williams & Fudge agency they can be reached at 1-800-849-9791 or if you received a letter from the ConServe agency they can be reached at 1-800-724-4439.'))
                .append($('<span>').text('If you are receiving this message and you have not received a letter from either of our collection agencies please call our District Office at 1-206-934-4187.'));

            //$('body').append(creditCardLogoMsg);
            //$('#TuitionDisplay').append(creditCardLogoMsg);
            $('#TuitionCControls').append(creditCardLogoMsg);
            $('#getChargesButtons').slideUp();
        }
    }


    this.showGrades = function(serverDate) {
        //append to $('#CheckGradesControls')
        //console.log(serverDate);
        var transcriptTitleBar = $('<div>').addClass('transcriptTitleBar')
        //.text('UNOFFICIAL STUDENT TRANSCRIPT - ' + myCampus.SelectedQuarter.FriendlyName)
            .text('UNOFFICIAL STUDENT TRANSCRIPT - ' + serverDate)
            .append($('<span>')
                .addClass('ui-btn-icon-right ui-icon-delete mfp-close').html(''));


        $('#CheckGradesControls').empty().append(transcriptTitleBar);



        var printButton = $('<button>')
            .attr({ 'id': 'printGrades' })
            .text('Print Transcript')
            .on('click', function () {

                var divToPrint = document.getElementById('CheckGradesControls');

                var newWin = window.open('', 'Print-Window');

                var pbutton = document.getElementById('printGrades');
                pbutton.hidden = true;


                newWin.document.open();

                newWin.document.write('<html><body onload="window.print()">' + divToPrint.innerHTML + '</body></html>');

                newWin.document.close();

                setTimeout(function () { newWin.close(); }, 10);

            });




        $('#CheckGradesControls')
            .append( printButton )
            .append($('<p>').html(user.Transcript));

        var transcriptMessage = new Object();

        switch (myCampus.CampusCode) {
            case '062':
                transcriptMessage.part1 = $('<p>').html('If you need an "official" transcript please read the following...');
                transcriptMessage.part2 = $('<p>').html('Official, sealed transcripts are required by other institutions when students transfer. Official transcripts (a copy of a student\'s permanent academic record) must be requested in writing from the Registration Office of the college where the classes were taken. Cost is $4.20 per copy and requires two working days for processing. In compliance with the Family Educational Rights and Privacy Act of 1974, grade transcripts will be released only upon written request.');
                transcriptMessage.part3 = $('<p>').html('Students can get an unofficial transcript at no cost, via Student Online Services at the college website. Transcripts will not be released if students have not fulfilled all financial obligations to the college.');
                transcriptMessage.part4 = $('<p>').html('GED transcripts (copy of test scores) must be requested in writing from the campus Testing Office, and include the student\'s social security number and signature. There is a $4.40 charge per copy.');
                break;

            case '063':
                transcriptMessage.part1 = $('<p>').html('If you need an "official" transcript please read the following...');
                transcriptMessage.part2 = $('<p>').html("Official transcripts are issued by North Seattle College Registrar's Office and bear the Registrar's signature and college seal. Official transcripts take approximately 48 hours to process");
                transcriptMessage.part3 = $('<a>').attr({ 'href': 'https://resources.northseattle.edu/transcripts', 'target': '_blank' }).html('more information');
                break;

            case '064':
                transcriptMessage.part1 = $('<p>').html('If you need an "official" transcript please read the following...');
                transcriptMessage.part2 = $('<p>').html('Official, sealed transcripts are required by other institutions when students transfer. Official transcripts (a copy of a student\'s permanent academic record) must be requested in writing from the Registration Office of the college where the classes were taken. Cost is $7.50 per copy, or $9.75 if ordered online, and requires two working days for processing. In compliance with the Family Educational Rights and Privacy Act of 1974, grade transcripts will be released only upon written request. More detailed information on transcript ordering is available on our website.');
                transcriptMessage.part3 = $('<p>').html('Students can get an unofficial transcript at no cost, via Student Online Services at the college website. Transcripts will not be released if students have not fulfilled all financial obligations to the college.');
                transcriptMessage.part4 = $('<p>').html('GED transcripts (copy of test scores) must be requested  through the GED Testing Service website at www.gedtestingservice.com. Select “Get your transcript”.');
                break;


            case '065':
                transcriptMessage.part1 = $('<p>').html('If you need an "official" transcript please read the following...');
                transcriptMessage.part2 = $('<p>').html('Official, sealed transcripts are required by other institutions when students transfer. Official transcripts (a copy of a student\'s permanent academic record) must be requested in writing from the Registration Office of the college where the classes were taken. Cost is $4.20 per copy and requires two working days for processing. In compliance with the Family Educational Rights and Privacy Act of 1974, grade transcripts will be released only upon written request.');
                transcriptMessage.part3 = $('<p>').html('Students can get an unofficial transcript at no cost, via Student Online Services at the college website. Transcripts will not be released if students have not fulfilled all financial obligations to the college.');
                transcriptMessage.part4 = $('<p>').html('GED transcripts (copy of test scores) must be requested in writing from the campus Testing Office, and include the student\'s social security number and signature. There is a $4.40 charge per copy.');
                break;
        }


        $.each(transcriptMessage, function () {
            //console.log(this.text());
            $('#CheckGradesControls').append(this);
        });

        $.magnificPopup.open({
            items: {
                src: '#CheckGradesWrapper',
                type: 'inline'
            },
            showCloseBtn: false,
            closeOnBgClick: true,
            mainClass: 'holder'
        });
    }

    this.showMyFavorites = function() {
        $('#MyFavoritesControls').empty();
        $('.loginWrapper').removeClass('activeNav');
        user.getMyFavorites();

        //self.hideProfile();
        self.hideRegisteredItems();
        self.hideWaitListItems();
        self.hideEdPlan();

        Html.hideNotes();

        $('#MyFavoritesControls').removeClass('displayNone').slideDown( 1000 );
        $('#LnkMyFavorites span').removeClass('ui-icon-carat-d')
        $('#LnkMyFavorites span').addClass('ui-icon-carat-u')

        $('#LnkMyFavorites').off();
        $('#LnkMyFavorites').on('click', function(e) {
            self.hideMyFavorites();
            e.preventDefault();
        });
    }

    this.hideMyFavorites = function() {
        $('.loginWrapper').removeClass('activeNav');
        $('#MyFavoritesControls').slideUp( 400 ).addClass('displayNone');
        $('#LnkMyFavorites span').removeClass('ui-icon-carat-u')
        $('#LnkMyFavorites span').addClass('ui-icon-carat-d')

        $('#LnkMyFavorites').off();
        $('#LnkMyFavorites').on('click', function(e) {
            self.showMyFavorites();
            e.preventDefault();
        });
    }

    this.showRegisteredItems = function() {
        $('.loginWrapper').removeClass('activeNav');
        $('#RegisteredItemsControls').empty();
        user.getRegisteredClasses();

        //self.hideProfile();
        self.hideMyFavorites();
        self.hideWaitListItems();
        self.hideEdPlan();

        Html.hideNotes();

        $('#RegisteredItemsControls').removeClass('displayNone').slideDown( 1000, function(){

        });


        $('#LnkRegisteredItems span').removeClass('ui-icon-carat-d')
        $('#LnkRegisteredItems span').addClass('ui-icon-carat-u')

        $('#LnkRegisteredItems').off();
        $('#LnkRegisteredItems').on('click', function(e) {
            self.hideRegisteredItems();
            e.preventDefault();
        });
    }

    this.hideRegisteredItems = function() {
        $('.loginWrapper').removeClass('activeNav');
        //$('#RegisteredItemsControls').slideUp( 1000 ).addClass('displayNone');

        $('#RegisteredItemsControls').slideUp( 400, function(){
            $('#RegisteredItemsControls').addClass('displayNone').empty();

        });

        $('#LnkRegisteredItems span').removeClass('ui-icon-carat-u')
        $('#LnkRegisteredItems span').addClass('ui-icon-carat-d')

        $('#LnkRegisteredItems').off();
        $('#LnkRegisteredItems').on('click', function(e) {
            self.showRegisteredItems();
            e.preventDefault();
        });
    }

    this.showWaitListItems = function() {

        $('.loginWrapper').removeClass('activeNav');
        user.getWaitList();

        //self.hideProfile();
        self.hideMyFavorites();
        self.hideRegisteredItems();
        self.hideEdPlan();

        Html.hideNotes();

        $('#WaitListItemsControls').removeClass('displayNone').slideDown('slow');

        $('#WaitListItemsWrapper span').removeClass('ui-icon-carat-d')
        $('#WaitListItemsWrapper span').addClass('ui-icon-carat-u')

        $('#LnkWaitListItems').off();
        $('#LnkWaitListItems').on('click', function(e) {
            self.hideWaitListItems();
            e.preventDefault();
        });
    }

    this.hideWaitListItems = function() {
        $('.loginWrapper').removeClass('activeNav');

        $('#WaitListItemsControls').slideUp( 400, function(){
            $('#WaitListItemsControls').addClass('displayNone');
        });

        $('#WaitListItemsWrapper span').removeClass('ui-icon-carat-u')
        $('#WaitListItemsWrapper span').addClass('ui-icon-carat-d')

        $('#LnkWaitListItems').off();
        $('#LnkWaitListItems').on('click', function(e) {
            self.showWaitListItems();
            e.preventDefault();
        });
    }

    this.showEdPlan = function () {

        ga('send', 'event', 'Show EdPlan', 'Show EdPlan');


        $('.loginWrapper').removeClass('activeNav');
        console.log('showEdPlan');
        self.hideMyFavorites();
        self.hideRegisteredItems();
        self.hideWaitListItems();

        Html.hideNotes();


        if (isMobile()) {
            $('#MyEdPlanItemControls').removeClass('displayNone').slideDown(400);

            $('#MyEdPlanWrapper span.lnkMyEdPlanItem').removeClass('ui-icon-carat-d')
            $('#MyEdPlanWrapper span.lnkMyEdPlanItem').addClass('ui-icon-carat-u')

            $('#LnkMyEdPlanItem').off();

            $('#LnkMyEdPlanItem').on('click', function (e) {
                self.hideEdPlan();
                e.preventDefault();
            });
        }


    }

    this.hideEdPlan = function() {
        $('.loginWrapper').removeClass('activeNav');


        if (isMobile()) {
            $('#MyEdPlanItemControls').slideUp(400, function () {
                $('#MyEdPlanItemControls').addClass('displayNone');
                $('#MyEdPlanItemControls').remove();
            });


            $('#MyEdPlanWrapper span.lnkMyEdPlanItem').removeClass('ui-icon-carat-u')
            $('#MyEdPlanWrapper span.lnkMyEdPlanItem').addClass('ui-icon-carat-d')

            $('#LnkMyEdPlanItem').off();
            $('#LnkMyEdPlanItem').on('click', function (e) {
                edPlan.getEdPlanSelectorData();


                e.preventDefault();
            });
        }


    }






    this.showNotes = function () {
        ga('send', 'event', 'Show Notes', 'Show Advisor Notes');

        $('.loginWrapper').removeClass('activeNav');
        console.log('open advisor area');
        self.hideMyFavorites();
        self.hideRegisteredItems();
        self.hideWaitListItems();
        self.hideEdPlan();

        if (isMobile()) {
            $('#AdvisorItemsControls').removeClass('displayNone').slideDown(400);

            $('#MyAdvisorNotesWrapper span.lnkMyAdvisorItem').removeClass('ui-icon-carat-d')
            $('#MyAdvisorNotesWrapper span.lnkMyAdvisorItem').addClass('ui-icon-carat-u')

            $('#LnkMyAdvisorItems').off();

            $('#LnkMyAdvisorItems').on('click', function (e) {
                self.hideNotes();
                e.preventDefault();
            });
        }


    }

    this.hideNotes = function () {
        $('.loginWrapper').removeClass('activeNav');

        if (isMobile()) {
            $('#AdvisorItemsControls').slideUp(400, function () {
                $('#AdvisorItemsControls').addClass('displayNone');
                $('#AdvisorItemsControls').empty();
            });


            $('#MyAdvisorNotesWrapper span.lnkMyAdvisorItem').removeClass('ui-icon-carat-u')
            $('#MyAdvisorNotesWrapper span.lnkMyAdvisorItem').addClass('ui-icon-carat-d')

            $('#LnkMyAdvisorItems').off();
            $('#LnkMyAdvisorItems').on('click', function (e) {
                //advisor.getNotes();
                //Html.showNotes();
                Advisor.initNotes();
                e.preventDefault();
            });
        }


    }

    this.initNotesOLD = function () {
        console.log('initNotes');

        var container;
        if (isMobile()) {
            container = $('#AdvisorItemsControls');
        } else {
            container = $('#myAdvisorTab');
        }

        //console.log(Advisor.NoteList);
        //console.log(Advisor.NoteList.length);

        if (Advisor.NoteList == 'empty') {
            //checked the list but it is empty
            //show empty advisor notes message
            //console.log('noteList is empty');
            $('<div>').css({'padding': '.25em'}).text('No Advisor Notes Found').appendTo(container);

        } else if (Advisor.NoteList.length > 0 && Advisor.NoteList != 'empty') {
            //console.log('got some notes');
            $.each(Advisor.NoteList, function () {
                /* build quarter holder for each quarter */
                var quarterHolder = $('<div>').addClass(' quarterHolder');

                //add '20' to the year marker
                var yearTitle = this.yrqTitle;
                yearTitle = yearTitle.split(' ');
                yearTitle = yearTitle[0] + ' 20' + yearTitle[1];
                //console.log(yearTitle);

                var quarterName = $('<div>').addClass('quarterName ui-btn-icon-left').text(yearTitle).appendTo(quarterHolder);

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
                        $(this.nextSibling).slideDown(400, function () {

                        });

                        $(this).removeClass('ui-icon-carat-d');
                        $(this).addClass('ui-icon-carat-u');

                        $(this).parent().addClass('openQuarter');
                    }
                });

                var quarterContent = $('<div>').addClass('quarterContent').appendTo(quarterHolder);

                /* build quarter header for each quarter */
                var noteHeader = $('<div>').addClass('noteHeader').appendTo(quarterContent);
                $('<span>').addClass('noteDate').text('Date').appendTo(noteHeader);
                $('<span>').addClass('noteTitle').text('Title').appendTo(noteHeader);
                $('<span>').addClass('noteSubmitterSmall').text('Submitter').appendTo(noteHeader);
                $('<span>').addClass('noteNote').text('Actions/Reffs Content').appendTo(noteHeader);
                $('<span>').addClass('noteSubmitter').text('Submitter').appendTo(noteHeader);


                /* build a row for each note per quarter */
                var thisDate;
                var thisSection;
                var thisSubmitter;
                var needSubmitterName = false;

                var noteHolder = $('<div>').addClass('noteHolder').appendTo(quarterContent);


                $.each(this.advNotes, function () {
                    var date_test = new Date(this.insertTime);
                    convertedDate = (date_test.getMonth() + 1) + '/' + date_test.getDate() + '/' + date_test.getFullYear();

                    //set the date
                    if (thisDate == undefined) {
                        thisDate = convertedDate;
                        insertTimeText = convertedDate;
                    } else {
                        if (thisDate == convertedDate) {
                            //console.log('match');
                            insertTimeText = '';
                        } else {
                            //console.log('no match');
                            thisDate = convertedDate;
                            insertTimeText = convertedDate;
                            needSubmitterName = true;
                        }
                    }


                    //set the section
                    if (thisSection == undefined) {
                        thisSection = this.section;
                        sectionText = this.section;
                    } else {
                        if (thisSection == this.section) {
                            //console.log('match');
                            sectionText = '';
                        } else {
                            //console.log('no match');
                            sectionText = this.section;
                            thisSection = this.section;

                            if (isMobile()) {
                                //we need the name listed because we may lose track
                                //of info when the device screen is narrow
                                needSubmitterName = true;
                            }

                        }
                    }


                    //set the submitter name
                    if (thisSubmitter == undefined) {
                        thisSubmitter = this.submitter;
                        submitterText = this.submitter;
                    } else {
                        if (thisSubmitter == this.submitter && !needSubmitterName) {
                            //console.log('match');
                            submitterText = '';
                        } else {
                            //console.log('no match');
                            insertTimeText = convertedDate;
                            insertTimeText = convertedDate;

                            sectionText = this.section;
                            thisSection = this.section;

                            submitterText = this.submitter;
                            thisSubmitter = this.submitter;

                            noteHolder = $('<div>').addClass('noteHolder').appendTo(quarterContent);
                        }
                    }

                    //reset needSubmitterName for next loop
                    needSubmitterName = false;


                    var note = $('<div>').addClass('noteContent').appendTo(noteHolder);

                    var noteDate = $('<span>').addClass('noteDate').text(insertTimeText).appendTo(note);
                    if (insertTimeText == '') {
                        noteDate.addClass('empty');
                    }

                    var noteTitle = $('<span>').addClass('noteTitle').text(sectionText).appendTo(note);
                    if (sectionText == '') {
                        noteTitle.addClass('empty');
                    }

                    var noteSubmitterSmall = $('<span>').addClass('noteSubmitterSmall').text(submitterText).appendTo(note);

                    var noteDate = $('<span>').addClass('noteNote').text(this.noteContent).appendTo(note);
                    var noteSubmitter = $('<span>').addClass('noteSubmitter').text(submitterText).appendTo(note);

                    if (submitterText == '') {
                        //console.log('empty submitter');
                        noteSubmitterSmall.addClass('empty');
                        noteSubmitter.addClass('empty');
                    }

                });

                container.append(quarterHolder);

            });


        } else {
            Advisor.getAdvNotesList();
        }




        Html.showNotes();
    }








    this.showRegAppointment = function(){
        console.log('showRegAppointment');

        ga('send', 'pageview', '/registrationAppointment');


        $('#RegisterNowPopUp').empty();
        $('#RegisterNowPopUp').append( $('<div>').addClass('loading').append('Loading Registration Appointment') );

        self.buildRegAppointment();

    }


    this.buildRegAppointment = function () {

        var regAppointmentControls = $('<div>').attr({ 'id': 'regAppointmentControls' });

        var regAppointmentBar = $('<div>').addClass('regAppointmentTitleBar')
            .append($('<span>').addClass('regAppointmentTitle').html('Registration Appointment - ' + myCampus.SelectedQuarter.FriendlyName))
            .append($('<span>').addClass('ui-btn-icon-right ui-icon-delete mfp-close').html(''))
            .appendTo($(regAppointmentControls));

        $('<span>').addClass('registrationBegins').html('Registration Begins:')
            .appendTo($(regAppointmentControls));

        $('<span>').addClass('returningStudent').html('Returning Students: ' + myCampus.SelectedQuarter.ReturnStudentRegistrationBegin)
            .appendTo($(regAppointmentControls));

        $('<span>').addClass('newStudent').html('New Students: ' + myCampus.SelectedQuarter.NewStudentRegistrationBegin)
            .appendTo($(regAppointmentControls));

        if (myCampus.SelectedQuarter.IsRegistrationOpen) {

            $('<span>').addClass('open').html('Registration is open for ' + myCampus.SelectedQuarter.FriendlyName).appendTo($(regAppointmentControls));

            if (user.RegAppointment.IsPastAppointment) {

                var availableText = $('<span>').html('');

                $('<span>').addClass('available')
                    .html('You may register beginning: ' + user.RegAppointment.Appointment + '.')
                    .appendTo($(regAppointmentControls));

            } else {
                var supplementMsg = "";

                if (user.RegAppointment.Appointment == "You do not have a registration appointment.") {
                    supplementMsg = "<span>You do not have a registration appointment but you may</span> <br/> <br/><span>register beginning " + myCampus.SelectedQuarter.NewStudentRegistrationBegin + "</span>";
                } else {
                    supplementMsg = "<span>Your registration appointment is on " + user.RegAppointment.Appointment + "</span>";
                }
                $('<span>').addClass('availableOn')
                    .html(supplementMsg)
                    .appendTo($(regAppointmentControls));
            }


        } else { //IsRegistrationOpen == false


            $('<span>').addClass('returningStudent').html('Registration is not open for ' + myCampus.SelectedQuarter.FriendlyName)
                .appendTo($(regAppointmentControls));


            $('<span>').addClass('available')
                .html(user.RegAppointment.Appointment)
                .appendTo($(regAppointmentControls));
        }

        $('.loading').remove();
        $(regAppointmentControls).appendTo($('#RegisterNowPopUp'));

        $.magnificPopup.open({
            items: {
                src: '#RegisterNowPopUp',
                type: 'inline'
            },
            showCloseBtn: false,
            closeOnBgClick: true,
            mainClass: 'holder'
        });

    }

    this.showOfficialTranscript = function () {
        console.log('showOfficialTranscript');

        var transcriptTitleBar = $('<div>').addClass('transcriptTitleBar').text('Official Transcript').append($('<span>').addClass('ui-btn-icon-right ui-icon-delete mfp-close').html(''));


        $.magnificPopup.open({
            items: {
                src: '#OfficialTranscriptWrapper',
                type: 'inline'
            },
            showCloseBtn: false,
            closeOnBgClick: true,
            mainClass: 'holder'
        });
    }


    this.showSchedule = function () {

        ga('send', 'pageview', '/viewSchedule');

        $('#ViewScheduleControls').empty();

        var transcriptTitleBar = $('<div>').addClass('transcriptTitleBar').text('View Schedule').append($('<span>').addClass('ui-btn-icon-right ui-icon-delete mfp-close').html(''));

        var printButton = $('<button>')
            .attr({ 'id': 'printSchedule' })
            .text('Print Schedule')
            .on('click', function () {
                window.print();
            });

        $('#ViewScheduleControls').append(printButton).append(user.Schedule);

        $.magnificPopup.open({
            items: {
                src: '#ViewScheduleWrapper',
                type: 'inline'
            },
            showCloseBtn: false,
            closeOnBgClick: true,
            mainClass: 'holder'
        });
    }


    this.showMyCampusMenuDisplay = function( trigger, sectionReturnTo ){
        console.log( trigger );
        console.log( sectionReturnTo );
        $('.loginWrapper').removeClass('activeNav');
        $('.loginTrigger').removeClass('activeNav');
        $('.myCampusMenuDisplayClose').removeClass('displayNone');
        //var sectionReturnTo = $('section.activeNav');
        $('section').removeClass('activeNav');

        var footerReturnPoint = $('#footer-nav a.activeNav');
        console.log( footerReturnPoint );
        $('footer a').removeClass('activeNav');

        $('#myCampusMenuDisplay').addClass('activeNav');

        $('#' + trigger ).removeClass('displayNone');
        //$('.menuRow').addClass('displayNone');

        if( trigger == "myProfile" ){
            $('.myCampusMenuDisplayClose').addClass('displayNone');
        }
        $('.myCampusMenuDisplayClose').off().on('click', function(){
            self.closeMyCampusMenuDisplay( footerReturnPoint, sectionReturnTo );
        });
    }

    this.closeMyCampusMenuDisplay = function( footer, section ){
        console.log('myCampusMenuDisplayClose');
        //console.log( $(footer).attr('id') );
        //console.log( footer );
        console.log( $(section).attr('id') );

        section = $(section).attr('id');
        //footer = $(footer).attr('id');

        if(  section == 'myCampusMenuDisplay'  ){
            section = 'more';
        }
        console.log( section );
        $('.loginWrapper').removeClass('activeNav');
        $('.loginTrigger').removeClass('activeNav');

        $('#myCampusMenuDisplay').removeClass('activeNav');

        $('.myCampusMenuPage' ).each(function(){
            if(   !$( this).hasClass('displayNone')   ){
                $( this ).addClass('displayNone');
            }
        });

        $( 'section#' + section ).addClass('activeNav');
        $( '#footer-nav a.' + section ).addClass('activeNav');
    }



    this.buildClassPageForDesktop = function(){
        var pageContainer = $('#myclasses');
        $(pageContainer).empty();

        if (user.PunitiveMessages != undefined && user.PunitiveMessages.length > 0) {
            $('div.punitiveMessageArea').empty();

            $(pageContainer).append(
                $('<div>').addClass('punitiveMessageArea')
            );
            self.buildPunitiveMesages();
        }


        var tabHolder = $('<div>').attr({ 'id': 'tabHolder' }).addClass('tabHolder').appendTo( pageContainer );
        var triggerHolder = $('<div>').addClass('triggerHolder').appendTo( tabHolder );


        var tabTrigger1 = $('<div data-tabtrigger="myFav">').addClass('tabTrigger tabTittle myfav')
            .html('My Favorite Classes')
            .appendTo( triggerHolder );

        var tabTrigger2 = $('<div data-tabtrigger="myReg">').addClass('tabTrigger tabTittle myreg')
            .html('My Registered Classes')
            .appendTo( triggerHolder );

        var tabTrigger3 = $('<div data-tabtrigger="myWait">').addClass('tabTrigger tabTittle mywait')
            .html('My Waitlisted Classes')
            .appendTo( triggerHolder );

        var tabTrigger4 = $('<div data-tabtrigger="myEdPlan">').addClass('tabTrigger tabTittle myed')
            .html('My EdPlan')
            .appendTo(triggerHolder);

        var tabTrigger5 = $('<div data-tabtrigger="myAdvisor">').addClass('tabTrigger tabTittle myan')
            .html('My Advisor Notes')
            .appendTo(triggerHolder);



        var myFavTab = $('<div>').attr({ 'id': 'myFavTab' }).addClass('tab').appendTo( tabHolder );
        var myRegTab = $('<div>').attr({ 'id': 'myRegTab' }).addClass('tab displayNone').appendTo( tabHolder );
        var myWaitTab = $('<div>').attr({ 'id': 'myWaitTab' }).addClass('tab displayNone').appendTo( tabHolder );
        var myEdPlanTab = $('<div>').attr({ 'id': 'myEdPlanTab' }).addClass('tab displayNone').appendTo(tabHolder);
        var myAdvisorTab = $('<div>').attr({ 'id': 'myAdvisorTab' }).addClass('tab displayNone').appendTo(tabHolder);


        $('.tabTrigger').off();
        $('.tabTrigger').on('click', function(){
            console.log('trigger clicked' );
            var trigger = $( this ).data('tabtrigger');
            console.log( trigger );


            ga('send', 'event', 'Classes Tab clicked',  trigger);

            $('.notActiveTitle').remove();
            $('.notActive').remove();
            $('#tabHolder .tab').empty();

            if( trigger == 'myFav' ){ console.log('myFav'); user.getMyFavorites(); }
            if( trigger == 'myReg' ){ console.log('myReg'); user.getRegisteredClasses(); }
            if( trigger == 'myWait' ){ console.log('myWait'); user.getWaitList(); }
            if( trigger == 'myEdPlan' ){ console.log('myEdPlanTrigger'); edPlan.getEdPlanSelectorData(); }
            if (trigger == 'myAdvisor') { console.log('myAdvisorNotes'); Advisor.getAdvNotesList();   }

            $('.tabTrigger').removeClass('active');

            $( this ).addClass('active')

            $('.tab').addClass('displayNone');

            $(   '#' + trigger + 'Tab'  ).removeClass('displayNone');

        });

        if (!$('tabTrigger.tabTittle').hasClass('active')) {
            console.log('not active');
            $(pageContainer)
                .append(
                    $('<p>').addClass('notActive').html('<span class="notActiveTitle">My Favorites</span> is for planning only. Classes shown here are ones that you have indicated your interest in. You are NOT REGISTERED for these classes and they are not reserved.')
                )
                .append(
                    $('<p>').addClass('notActive').html('<span class="notActiveTitle">My Registered</span> are classes for which you have REGISTERED. Please remember that your tuition must be paid in full by your payment due date to assure your seat in these classes.')
                )
                .append(
                    $('<p>').addClass('notActive').html('<span class="notActiveTitle">My Waitlist</span> feature offers students a fair and consistent way to enroll in a full class if openings occur. Students who choose to be placed on a waitlist will be automatically enrolled in the class if space becomes available. You may add or remove yourself from a waitlist on the web or in the Registration Office. Please remove your name if you no longer wish to be waitlisted. You will receive an email notification any time there is a change in your waitlist status so it is important your email address is current.')
                )
                .append(
                    $('<p>').addClass('notActive').html('<span class="notActiveTitle">My EdPlan</span> is an outline of the coursework required to complete your educational goal or program of study, and is your roadmap toward a college certificate or degree that can save you time and money.')
                );


        } else {
            //should never get here
            console.log('active');
        }

    }

    this.setAuthenticated = function() {
        console.log('user authenticated');

        //user.Profile.IsOutOfDate = true; //for testing
        //user.Profile.secQuestion = ""; //for testing

        //setting usermenu "username"
        console.log('user.Profile.Name: ' + user.Profile.Name);

        $('#myCollegeMenuTrigger span').text( user.Profile.Name );
        $('#myCollegeMenuTrigger').attr('href', '#UserMenu');

        $('#LoginMessages').addClass('authenticatedOnly');
        $('footer a.footerDisabled').removeClass('footerDisabled');
        $('#header-nav a.footerDisabled').removeClass('footerDisabled');

        setTimeout(function(){
            $('.loginWrapper.activeNav').removeClass('activeNav');
        }, 2000);


        //user.PunitiveMessages = ["(0112) You do not meet", "(0019) There is a flag on your records that blocks registration.", "joe", "(011s) You do meet, yo", "(0113) You do meet"];  //for testing user.PunitiveMessages

        if (user.PunitiveMessages != undefined && user.PunitiveMessages.length > 0) {
            $('div.punitiveMessageArea').empty();
            self.buildPunitiveMesages();
        }


        //check for Gainful Employment Requirement then for profile update and question
        if(user.Profile.IsGainfulEmploymentCheckRequired && !user.Profile.IsGainfulEmploymentChecked  && user.Profile.Name == "TUCKER TESS N"){
            console.log('isRequired');
            self.showGainfulEmploymentCheck();
        } else {
            console.log('NOT isRequired');
            self.checkProfile();
        }


    }

    this.checkProfile = function(){
        if (user.Profile.secQuestion == "") {
            console.log('show the profile update init');
            self.showProfile();
            self.initProfileUpdate();
        } else if (user.Profile.IsOutOfDate) {
            console.log('show the profile');
            self.showProfile();
            self.initProfileUpdate();
        }
    }

    this.showGainfulEmploymentCheck = function(){
        console.log("showGainfulEmploymentCheck");

        console.log('user.Profile.ProgramEPC: ' + user.Profile.ProgramEPC);
        console.log('user.Profile.GainfulEmploymentCheckURL: '+ user.Profile.GainfulEmploymentCheckURL);
        console.log('user.Profile.IsGainfulEmploymentChecked: ' + user.Profile.IsGainfulEmploymentChecked);
        console.log('user.Profile.IsCorrectPRogramForGainfulEmployment: ' + user.Profile.IsCorrectPRogramForGainfulEmployment);


        var iframeSRC = user.Profile.GainfulEmploymentCheckURL;
        if(iframeSRC.includes("http://")){
            iframeSRC = iframeSRC.replace("http://", "https://");
        } else {

        }

        $('#GainfulPopUp').append(
            $('<div>').addClass('iframeHolder')
                .append(
                    $('<iframe>').attr('src', iframeSRC )
                )
                .append(
                    $('<div>').addClass('inputHolder').append(
                        $('<input>').addClass('gainfulPopUpButton').attr('type', 'checkbox').attr('name', 'notmine')
                    ).append(
                        $('<label>').addClass('gainfulPopUpLabel').text('Not my program').attr('for', 'notmine')
                    )
                )
                .append(
                    $('<div>').addClass('inputHolder').append(
                        $('<input>').addClass('gainfulPopUpButton').attr('type', 'checkbox').attr('name', 'iagree')
                    ).append(
                        $('<label>').addClass('gainfulPopUpLabel').text('I see the info, yo.').attr('for', 'iagree')
                    )
                )
                .append(
                    $('<div>').addClass('inputHolder')
                        .append(
                            $('<button>').attr({'id':'SubmitGainfulEmploymentCheck'}).addClass('gainfulPopUpButton').html('SUBMIT')
                                .on('click', function(){user.SubmitGainfulEmploymentCheck(); return false;})
                        )
                )
        );

        $.magnificPopup.open({
            items: {
                src: '#GainfulPopUp',
                type: 'inline'
            },
            showCloseBtn: false,
            closeOnBgClick: false,
            mainClass: 'holder'
        });

        $('.mfp-content').css({'vertical-align': 'top'});
        $('.mfp-bg').css({'opacity': '0'});

        var triggerPosition = $('#myCollegeMenuTrigger' ).position().left;
        var triggerWidth = $( '#myCollegeMenuTrigger' ).width();
        console.log( triggerWidth );
        if( isMobile() ){
            if( triggerWidth > 0 ){
                var popUpPosition = triggerPosition - 150;
            } else {
                var popUpPosition = triggerPosition - 280;
            }
        } else {
            var popUpPosition = triggerPosition - 290;
        }

        if( windowWidth  > 370){
            $('#GainfulPopUp').css({'position': 'absolute', 'top': '60px ', 'left': popUpPosition  });
        } else {
            console.log('window less than 370');
            $('#GainfulPopUp ').css({'position': 'absolute', 'top': '60px ', 'left': '0'  });		}

    }


    this.buildPunitiveMesages = function () {

        var substring = "(0112)"; //(0112) You do not meet minimum age requirement

        if (user.PunitiveMessages != undefined) {

            if (user.PunitiveMessages.length > 1) {
                var iterator = 0;
                $.each(user.PunitiveMessages, function () {

                    messageString = this;
                    //console.log(messageString.toLowerCase());
                    if (messageString.toLowerCase().indexOf(substring) > -1) {
                        //console.log('block');
                    } else {
                        //console.log('no block');
                        $('div.punitiveMessageArea').append(
                            $('<p>').addClass('punitiveMessage').text(messageString)
                        ).removeClass('displayNone');
                    }

                });
            } else {
                messageString = user.PunitiveMessages[0];
                $('div.punitiveMessageArea').append(
                    $('<p>').addClass('punitiveMessage').text(messageString)
                ).removeClass('displayNone');
            }
        }
    }

    this.QSDetectBehaviors = function () {

        if (myCampus.QSUserRetrieval.mc != '' || myCampus.QSUserRetrieval.mc != undefined) {
            switch (myCampus.QSUserRetrieval.mc) {

                case 'ra':
                    console.log('mc show reg appointment');
                    $('.footerNav.mycampus').click();
                    $('#LnkMyRegistrationAppointment').click();
                    break;

                case 'pt':
                    console.log('mc show pay now');
                    $('.footerNav.mycampus').click();
                    $('#LnkMyTuition').click();
                    break;

                case 'cg':
                    console.log('mc show CheckGrades');
                    $('.footerNav.mycampus').click();
                    $('#CheckGrades').click();
                    break;

                case 'vs':
                    console.log('mc show BtnViewSchedule');
                    $('.footerNav.mycampus').click();
                    $('#BtnViewSchedule').click();
                    break;

                case 'mf':
                    console.log('mc show myFavTab');
                    $('.footerNav.myClasses ').click();

                    if (!isMobile()) {
                        $('.tabTrigger.myfav').click();
                    } else {
                        $('#LnkMyFavorites').click();
                    }
                    break;

                case 'mr':
                    console.log('mc show myRegTab');
                    $('.footerNav.myClasses ').click();

                    if (!isMobile()) {
                        $('.tabTrigger.myreg').click();
                    } else {
                        $('#LnkRegisteredItems').click();
                    }
                    break;

                case 'mw':
                    console.log('mc show myWaitTab');
                    $('.footerNav.myClasses ').click();

                    if (!isMobile()) {
                        $('.tabTrigger.mywait').click();
                    } else {
                        $('#LnkWaitListItems').click();
                    }
                    break;

                case 'me':
                    console.log('mc show myEdTab');
                    $('.footerNav.myClasses ').click();

                    setTimeout(function(){

                        if (!isMobile()) {
                            $('.tabTrigger.myed').click();
                        } else {
                            $('#LnkMyEdPlanItem').click();
                        }
                    },15);

                    break;

                default:
                    //do nothing
                    break;
            }
        }

        if (!myCampus.QSUserRetrieval.eval == "") {
            //show eval

            $('.footerNav').removeClass('activeNav');
            $('.footerNav.mycampus').addClass('activeNav');

            $('section').removeClass('activeNav');
            $('#mycampus').addClass('activeNav');
            ClassEval.getClassEvaluationForQueryString(myCampus.QSUserRetrieval.eval);
        }
    }


    this.setLogOff = function() {
        console.log('setLogOff');
        //console.log(myCampus.myURL);
        window.location = myCampus.myURL;

    }


    this.showLoginMessages = function(msg) {
        //console.log('showLoginMessages: ' + msg);
        $('#LoginMessages').removeClass('displayNone').html(msg);
    }

    this.clearLoginMessages = function() {
        $('#LoginMessages').empty().addClass('displayNone');
        console.log('clearLoginMessages');
    }



    this.showCourses = function() {
        $('#content-depts').removeClass('visible').addClass('hidden');
        $('#content-courses').removeClass('hidden').addClass('visible');

        if ($('#content-header').css('text-align') == 'center') {
            console.log('do we need this?');
            $('#content-header').toggle();
        }

    }

    this.showDepts = function() {

        $('#content-depts').removeClass('hidden').addClass('visible');
        $('#content-courses').removeClass('visible').addClass('hidden');

        $('#content-header').toggle();

    }
}

var Html = new HTMLGenerator();










