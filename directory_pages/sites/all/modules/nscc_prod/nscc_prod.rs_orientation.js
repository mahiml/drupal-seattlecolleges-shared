Drupal.behaviors.rs_orientation_quiz = function(context){

var answers = new Array();
answers['question_1']  = { correct:'a', error_msg:'Running Start students are responsible for the one time student ID card fee, books, transportation, and class fees not associated with the class. The correct answer is A.' }; 
answers['question_2']  = { correct:'f', error_msg:'Running Start students are not eligible to participate in college sports. You are still eligible to participate in high school sports at your high school. The correct answer is False.' };
answers['question_3']  = { correct:'d', error_msg:'Running Start students must meet with their high school counselor to have their pre-enrollment form completed. Meet with a Running Start advisor. Complete a pre-enrollment form and have it signed by the high school counselor, Running Start advisor, your parent/guardian and yourself. The correct answer is All of the above.' };
answers['question_4']  = { correct:'c', error_msg:'Running Start students are responsible for paying for below college level classes (below the 100 level). The correct answer is Below college level classes (below 100 level).' };
answers['question_5']  = { correct:'t', error_msg:'Running Start covers tuition for college level online courses. RS students are responsible for paying applicable online class fees unless they are on the bookfund program. The correct answer is True.' };
answers['question_6']  = { correct:'b', error_msg:'All students at NSCC must maintain a cumulative GPA of 2.0 or better. A student pursuing an AA/AS Degree at NSCC, is required to complete at least 75% of the courses for which he/she is registered. The correct answer is Maintain a cumulative gpa of 2.0 or better and complete at least 75% of courses registered for.' };
answers['question_7']  = { correct:'d', error_msg:'The pre-enrollment form must be signed by your high school counselor, yourself, RS advisor and your parent/guardian (even if you are 18 or older).' };
answers['question_8']  = { correct:'d', error_msg:'The NSCC quarterly class schedule lists important dates, courses offered for the quarter and continuing education classes. The correct answer is All of the above.' };
answers['question_9']  = { correct:'d', error_msg:'Online courses require students to be highly motivated and self- disciplined. Most online courses may have more readings and assignments than on campus classes. The correct answer is All of the above.' };
answers['question_10'] = { correct:'d', error_msg:'Grades will be available for you to view online and will not be mailed to your home. Your official transcripts will be mailed to your high school. NSCC grades will be on your college transcript and your high school transcript. The correct answer is Both B and C.' };
answers['question_11'] = { correct:'t', error_msg:'The Running Start Program is only in the fall, winter and spring quarters. If you are interested in taking classes in the summer you will need to talk and get permission from your high school counselor and parent/guardian. You will be responsible for tuition for summer quarter classes. The correct answer is true.' };
answers['question_12'] = { correct:'d', error_msg:'The Counseling Center provides educational, career and personal counseling. The correct answer is All of the above.' };
answers['question_13'] = { correct:'c', error_msg:'You will earn both high school credit and college credit.' };
answers['question_14'] = { correct:'a', error_msg:'Failure to officially withdraw from class could result in a 0.0 failing grade. A 0.0 failing grade will affect your high school and college cumulative GPA.' };
answers['question_15'] = { correct:'d', error_msg:'To officially withdraw from class(es), you will need to contact or meet with an RS advisor, officially withdraw form the course(s) online, and contact your high school counselor to inform them that you have withdrawn from class(es). The correct answer is All of the above.' };
answers['question_16'] = { correct:'t', error_msg:'For every five college credits you earn, you will earn one high school credit.' };
answers['question_17'] = { correct:'b', error_msg:'The 10th day of the quarter is the last day to withdraw without a W grade on your college transcripts.' };
answers['question_18'] = { correct:'d', error_msg:'This web page contains links to NSCC services and resources. The correct answer is All of the above.' };
answers['question_19'] = { correct:'d', error_msg:'You can register/add/drop classes,view your quarterly grades and view your unofficial transcripts. If your contact information has changed, you can update it online. The correct answer is all of the above.' };
answers['question_20'] = { correct:'d', error_msg:'These are just some strategies for success. It is important to know your instructor\'s office hours and to talk to him/her if you have questions or concerns. NSCC has resources to help you succeed. There is free tutoring at the Loft/Writing Center and the Math/Science Tutoring Center. The Counseling Center provides academic, career and personal counseling. The #1 strategy for success is to Go To Class! The correct answer is All of the above.' };

$('#edit-submit').click(function(){ return score_quiz(); });

function score_quiz(){
	var all_right = true;
	//alert(answers['question_1'].error_msg);
	for (var i in answers) {
	 $('#'+i+'_answer').empty();
		if ($('input[name='+i+']:checked').val() != answers[i].correct){
			$('#'+i+'_answer').append('<div class="messages error">'+answers[i].error_msg+'</div>');
			all_right = false;
		}	else {
		  $('#'+i+'_answer').parent().find('div.form-item > div.form-radios > div.form-item').hide('fast');
		  var hypheni = i.replace(/_/,'-');
		  $('#edit-'+hypheni+'-'+answers[i].correct+'-wrapper').addClass('correct').fadeIn('fast');
			$('#edit-'+hypheni+'-'+answers[i].correct+'-wrapper').prepend('<div>Correct!</div>');
		}
	}	
	return all_right;
}

};



