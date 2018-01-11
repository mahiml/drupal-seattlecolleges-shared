Drupal.behaviors.nscc_testing_score_form = function(context){
	write_score_form();
};

function write_score_form(){
	$('div#score_form_div').empty();
	$('div#score_form_div').append('<form id="weighted_score_form" name="weighted_score_form">');
	$('div#score_form_div').append('<div id="inputs"><h3> Enter Your Raw Scores</h3>');
	$('div#score_form_div').append('<div class="form-item"><label for="raw_reading">Reading:</label><input type="text" name="raw_reading" id="raw_reading"></div>');
	$('div#score_form_div').append('<div class="form-item"><label for="raw_writing">Writing:</label><input type="text" name="raw_writing" id="raw_writing"></div>');
	$('div#score_form_div').append('<div class="form-item"><input type="button" name="calculate" id="calculate" value="Calculate"></div>');
	$('div#score_form_div').append('</div>');

	$('div#score_form_div').append('<div id="Output">');
	$('div#score_form_div').append('</div>');
	
	$('div#score_form_div').append('</form>');
	
	$('#calculate').click(function(){calculate_score_weight();});
}




function calculate_score_weight () {

  var ReadingWeight    = .50;
  var WritingWeight    = .50;
  
  var ReadingMean      = 79.06;
  var WritingMean      = 64.36;
  var ReadingDeviation = 15.80;
  var WritingDeviation = 26.90;

  var ReadingScore = parseFloat($('#raw_reading').val(),10);
  var WritingScore = parseFloat($('#raw_writing').val(),10);

  var FinalScore = (WritingWeight * (((WritingScore - WritingMean)/WritingDeviation) * ReadingDeviation + ReadingMean)) + (ReadingWeight * ReadingScore);
  FinalScore = FinalScore.toFixed(2);
  RoundedFinalScore = Math.round(FinalScore);
  //ranges:
  // 1-59 ABE/ESL
  // 60-70 ENGL095/096 & ENGL080
  // 71-80 ENGL097/098 & ENGL080
  // 81-83 ENGL099
  // 84-99 ENGL&amp;101
  var ClassRangemsg;
  
  // Use combined weighted score to determine placement only if writing score is adequate?
  if (WritingScore > 24) {
   
    // 1-59 ABE/ESL   
    if (RoundedFinalScore <= 59) {
       ClassRangemsg = "<p>Native English Speakers: See ABE Advisor in Advising Center<br>English as a Second Language Speakers:  Take the ESL Test</p>";
    
    // 60-70 ENGL095/096 &amp; ENGL080
    } else if (RoundedFinalScore <= 70) {
       ClassRangemsg = "<p>ENGL095/096 &amp; ENGL080</p>";
    
    // 71-80 ENGL097/098 &amp; ENGL080
    } else if(RoundedFinalScore <= 80) {
       ClassRangemsg = "<p>ENGL097/098 &amp; ENGL080</p>";
    
    // 81-83 ENGL099
    } else if(RoundedFinalScore <= 83) {
       ClassRangemsg = "<p>ENGL099 with mandatory ENGL&amp;101 support</p>";
    
    // 84-99 ENGL&101
    } else {
       ClassRangemsg = "<p>ENGL&amp;101</p>";
    }
          
    $("#Output").empty();
    $("#Output").append("Combined/Weighted Score: " + FinalScore + "<h4> This places you in:</h4>" + ClassRangemsg);
    
  // Otherwise, ABE/ESL
  } else {
    $("#Output").empty();
    $("#Output").append("<p>Native English Speakers: See ABE Advisor in Advising Center<br>English as a Second Language Speakers:  Take the ESL Test</p>");
  }
}



