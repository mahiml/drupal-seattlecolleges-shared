


var testScores = new TestScores();


function TestScores() {
    var self = this;

    self.showTestScores = function () {
        console.log('showTestScores');

        $('.mfp-bg').css({ 'opacity': '.7' });

        $.mobile.loading('show');
        var parameters = new Object();


        $.ajax({
            type: 'POST',
            async: true,
            contentType: 'application/json; charset=utf-8',
            url: portalRef + 'WebServices/PortalServices.asmx/GetTestScores',
            data: '{}',
            dataType: 'json',
            success: function (rValue) {
                var userContext = rValue.d;

                $.mobile.loading('hide');

                esltests = userContext.Context.testScoresESL;
                generalTests = userContext.Context.testScoresGeneral;

                //console.log(esltests.scoreObjs.length);
                if (esltests.scoreObjs.length > 0) {
                    self.buildEslTestScoreDisplay(esltests);
                }

                //console.log(generalTests.scoreObjs.length);
                if (generalTests.scoreObjs.length > 0) {
                    self.buildGeneralTestScoreDisplay(generalTests);
                }

                if (esltests.scoreObjs.length < 1 && generalTests.scoreObjs.length < 1) {
                    self.buildNoTestScoresToDisplay();
                }



                $.magnificPopup.open({
                    items: {
                        src: '#TestScoresPopUp',
                        type: 'inline'
                    },
                    showCloseBtn: false,
                    closeOnBgClick: true,
                    mainClass: 'holder'
                });


            },
            fail: function (rValue) {
                var stopHere = '';
            }
        });




    }

    self.buildEslTestScoreDisplay = function (scores) {
        console.log('buildEslTestScoreDisplay');

        $('#EslTestScoresHolder').empty();


        var titleBar = $('<div>').addClass('tableName').html('ESL Test Scores')
            .appendTo($('#EslTestScoresHolder'));

        titleBar = $('<div>').addClass('titleBar');
        titleBar
            .append($('<span>').addClass('month').text('Month'))
            .append($('<span>').addClass('year').text('Year'))
            .append($('<span>').addClass('testName').html('<span>Test</span> Name'))

            .append($('<span>').addClass('rdPlace').html('<span>Central </span> Rd Place'))
            .append($('<span>').addClass('wtPlace').html('<span>Central </span> Wt Place'))
            .append($('<span>').addClass('place').html('<span>North </span> Place'))
            .append($('<span>').addClass('grammer').html('<span>South </span> Grammar'))


            .append($('<span>').addClass('reading').html('<span>South </span> Reading'))

            .append($('<span>').addClass('raw').html('<span>Central </span> Raw List'))
            .append($('<span>').addClass('raw').html('<span>Central </span> Raw Gram'))
            .append($('<span>').addClass('raw').html('<span>Central </span> Raw Read'))

            .appendTo($('#EslTestScoresHolder'));




        var containerDiv = $('<div>').addClass('testScoresContent');
        $.each(scores.scoreObjs, function () {
            console.log(this);

            $(containerDiv)
                .clone()
                .append($('<span>').addClass('month').text(this.testMonth))
                .append($('<span>').addClass('year').text(this.testYear))
                .append($('<span>').addClass('testName').text(this.testName))

                .append($('<span>').addClass('rdPlace').text(this.ReadingPlace))
                .append($('<span>').addClass('wtPlace').text(this.WritingPlace))
                .append($('<span>').addClass('place').text(this.Placement))

                .append($('<span>').addClass('grammer').text(this.Gram))

                .append($('<span>').addClass('reading').text(this.Read))

                .append($('<span>').addClass('raw').text(this.RawList))
                .append($('<span>').addClass('raw').text(this.RawGram))
                .append($('<span>').addClass('raw').text(this.RawRead))

                .appendTo($('#EslTestScoresHolder'));
        });




        var secondTitleBar = $('<div>').addClass('secondTitleBar');
        secondTitleBar
            .append($('<span>').addClass('month').text('Month'))
            .append($('<span>').addClass('year').text('Year'))
            .append($('<span>').addClass('testName').html('<span>Test</span> Name'))
            /*
            .append($('<span>').addClass('rdPlace').html('<span>Central </span> Rd Place'))
            .append($('<span>').addClass('wtPlace').html('<span>Central </span> Wt Place'))
            .append($('<span>').addClass('place').html('<span>North </span> Place'))
            .append($('<span>').addClass('grammer').html('<span>South </span> Grammar'))
            */
            .append($('<span>').addClass('reading').html('<span>South </span> Reading'))

            .append($('<span>').addClass('raw').html('<span>Central </span> Raw List'))
            .append($('<span>').addClass('raw').html('<span>Central </span> Raw Gram'))
            .append($('<span>').addClass('raw').html('<span>Central </span> Raw Read'));


        if (isMobile()) {
            secondTitleBar.appendTo($('#EslTestScoresHolder'));
        }



        var containerDiv = $('<div>').addClass('secondTestScoresContent');
        $.each(scores.scoreObjs, function () {
            console.log(this);

            $(containerDiv)
                .clone()
                .append($('<span>').addClass('month').text(this.testMonth))
                .append($('<span>').addClass('year').text(this.testYear))
                .append($('<span>').addClass('testName').text(this.testName))
                /*
                .append($('<span>').addClass('rdPlace').text(this.ReadingPlace))
                .append($('<span>').addClass('wtPlace').text(this.WritingPlace))
                .append($('<span>').addClass('place').text(this.Placement))

                .append($('<span>').addClass('grammer').text(this.Gram))
                */
                .append($('<span>').addClass('reading').text(this.Read))

                .append($('<span>').addClass('raw').text(this.RawList))
                .append($('<span>').addClass('raw').text(this.RawGram))
                .append($('<span>').addClass('raw').text(this.RawRead));
            if(isMobile()){
                $(containerDiv).appendTo($('#EslTestScoresHolder'))
            }
        });

    }

    self.buildGeneralTestScoreDisplay = function (scores) {
        console.log('buildGeneralTestScoreDisplay');
        $('#TestScoresHolder').empty();

        var titleBar = $('<div>').addClass('tableName').html('Compass Scores');
        titleBar.appendTo($('#TestScoresHolder'));

        titleBar = $('<div>').addClass('titleBar');

        titleBar
            .append($('<span>').addClass('month').text('Month'))
            .append($('<span>').addClass('year').text('Year'))
            .append($('<span>').addClass('testName').html('<span>Test</span> Name'))

            .append($('<span>').addClass('preAlg').html('<span>Pre- </span>Algebra'))
            .append($('<span>').addClass('alg').text('Algebra'))
            .append($('<span>').addClass('clvlAlg').html('<span>CLVL</span> Algebra'))
            .append($('<span>').addClass('trig').text('Trig'))
            //.appendTo(titleBar);

            .append($('<span>').addClass('reading').text('Reading'))
            .append($('<span>').addClass('writing').text('Writing'))
            .append($('<span>').addClass('admin').text('Admin'))
            .append($('<span>').addClass('coll').text('Col'))
        //.appendTo(titleBar);

        titleBar.appendTo($('#TestScoresHolder'));


        var containerDiv = $('<div>').addClass('testScoresContent');


        $.each(scores.scoreObjs, function () {
            console.log(this.location);

            switch (this.location) {
                case '062':
                    this.location = "Central";
                    break;
                case '063':
                    this.location = "North";
                    break;
                case '064':
                    this.location = "South";
                    break;
                case '065':
                    this.location = "SVI";
                    break;
                default:
                //default code block
            }

            $(containerDiv)
                .clone()
                .append($('<span>').addClass('month').text(this.testMonth))
                .append($('<span>').addClass('year').text(this.testYear))
                .append($('<span>').addClass('testName').text(this.testName))
                .append($('<span>').addClass('preAlg').text(this.PreAlgebra))
                .append($('<span>').addClass('alg').text(this.ElementaryAlgebra))
                .append($('<span>').addClass('clvlAlg').text(this.CLVLAlgebra))
                .append($('<span>').addClass('trig').text(this.Trig))

                .append($('<span>').addClass('reading').text(this.ReadingSkill))
                .append($('<span>').addClass('writing').text(this.WritingSkill))
                .append($('<span>').addClass('admin').text(this.admin))
                .append($('<span>').addClass('coll').text(this.location))
                .appendTo($('#TestScoresHolder'));

        });


        var secondTitleBar = $('<div>').addClass('secondTitleBar');
        secondTitleBar
            .append($('<span>').addClass('month').text('Month'))
            .append($('<span>').addClass('year').text('Year'))
            .append($('<span>').addClass('testName').html('<span>Test</span> Name'))

            .append($('<span>').addClass('reading').text('Reading'))
            .append($('<span>').addClass('writing').text('Writing'))
            .append($('<span>').addClass('admin').text('Admin'))
            .append($('<span>').addClass('coll').text('Col'));

        if (isMobile()) {
            secondTitleBar.appendTo($('#TestScoresHolder'));
        }







        var secondContainerDiv = $('<div>').addClass('secondTestScoresContent');

        $.each(scores.scoreObjs, function () {
            console.log(this.location);

            switch (this.location) {
                case '062':
                    this.location = "Central";
                    break;
                case '063':
                    this.location = "North";
                    break;
                case '064':
                    this.location = "South";
                    break;
                case '065':
                    this.location = "SVI";
                    break;
                default:
                //default code block
            }

            $(secondContainerDiv)
                .clone()
                .append($('<span>').addClass('month').text(this.testMonth))
                .append($('<span>').addClass('year').text(this.testYear))
                .append($('<span>').addClass('testName').text(this.testName))

                .append($('<span>').addClass('reading').text(this.ReadingSkill))
                .append($('<span>').addClass('writing').text(this.WritingSkill))
                .append($('<span>').addClass('admin').text(this.admin))
                .append($('<span>').addClass('coll').text(this.location));
        });



        if (isMobile()) {
            $(secondContainerDiv).appendTo($('#TestScoresHolder'));
        }





    }

    self.buildNoTestScoresToDisplay = function () {
        console.log('buildNoTestScoresToDisplay');


        $('#TestScoresHolder').empty();

        var titleBar = $('<div>').addClass('tableName').html('No Test Scores Available');
        titleBar.appendTo($('#TestScoresHolder'));

        titleBar = $('<div>').addClass('titleBar');



        titleBar.appendTo($('#TestScoresHolder'));


    }

}