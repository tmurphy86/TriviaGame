$(function() {

function start() {
	$("#display").html("<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Trivia</a></p>");
}

start();

$("body").on("click", ".start-button", function(event){
	event.preventDefault(); 
	generateHTML();

	timerWrapper();

});

$("body").on("click", ".answer", function(event){
	selectedAnswer = $(this).text();
	if(selectedAnswer === correctAnswers[questionCounter]) {

		clearInterval(clock);
		generateWin();
	}
	else {
		clearInterval(clock);
		generateLoss();
	}
});

$("body").on("click", "#reset", function(event){
	resetGame();
});

});

function generateLossDueToTimeOut() {
	unanswered++;
	$("#display").html("<p class='text-center space'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block space' src='img/wrong.jpg'>");
	setTimeout(wait, 3000);
}

function generateWin() {
	correctCount++;
	$("#display").html("<p class='text-center space'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block space' src='img/right.jpg'>");
	setTimeout(wait, 3000); 
}

function generateLoss() {
	incorrectCount++;
	$("#display").html("<p class='text-center space'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block space' src='img/wrong.jpg'>");
	setTimeout(wait, 3000);
}

function generateHTML() {
	$("#display").html("<p class='text-center space'>Time Remaining: <span class='timer'>20</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='space answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>");
}

function wait() {
	if (questionCounter < 5) {
	questionCounter++;
	generateHTML();
	counter = 20;
	timerWrapper();
	}
	else {
		end();
	}
}

function timerWrapper() {
	clock = setInterval(thirtySeconds, 1000);
	function thirtySeconds() {
		if (counter === 0) {
			clearInterval(clock);
			generateLossDueToTimeOut();
		}
		if (counter > 0) {
			counter--;
		}
		$(".timer").html(counter);
	}
}

function end() {
	$("#display").html("<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>DONE!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctCount + "</p>" + "<p>Wrong Answers: " + incorrectCount + "</p>" + "<p>Unanswered: " + unanswered + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block space' id='reset' role='button'>Restart Trivia!</a></p>");
}

function resetGame() {
	questionCounter = 0;
	correctCount = 0;
	incorrectCount = 0;
	unanswered = 0;
	counter = 20;
	generateHTML();
	timerWrapper();
}

var counter = 20;
var questionArray = ["Which of the following is cross site scripting", "160-bit encryption standard would be which of the following?", "What port does secured ftp use", "Shutting down a site via an overflow of traffic uses which of the following attacks", "Which of the following scan only works if operating system’s TCP/IP implementation is based on RFC 793?", "Which of the following IP spoofing detection technique succeed only when the attacker is in a different subnet?"];
var answerArray = [["Injection of code into SQL", "Injection of client side code to a trusted site", "Uploading virus to a server", "Server being compromised"], ["SSL","SHA-1","RSA","AES"], ["Port 22", "Port 80", "Port 369", "Port 443"], ["Spam","Buffer overflow","Bots","DDoS"], ["Null Scan", "Idle", "TCP Connect", "That isn't a real implementation"], ["IP identification number","TCP flow control methods","Direct TTL Probes","UDP flow control"]];
var correctAnswers = ["B. Injection of client side code to a trusted site", "B. SHA-1", "A. Port 22", "D. DDoS", "A. Null Scan", "C. Direct TTL Probes"];
var questionCounter = 0;
var selecterAnswer;
var clock;
var correctCount = 0;
var incorrectCount = 0;
var unanswered = 0;