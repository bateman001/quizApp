// JavaScript Document

//array of question and answer pairs
const QA = [
	{question: "Who interrupted Taylor Swift at the 2009 MTV Music Awards?",
	 answer: ["Kanye West", "2 Chainz", "Rick Ross", "Lil Wayne"],
	 correct: 0
	 
	},
	
	{question: "Who won the 2019 Grammy for best rap album?",
	 answer: ["Future", "J Cole", "Nicki Minaj", "Tyler, the Creator"],
	 correct: 3
	},
	
	
	{question: "Which rapper challenged the boxer, Floyd Mayweather, to read just one page of a Harry Potter Book for $750,000?",
	 answer: ["2 Chainz", "50 Cent", "Drake", "Ice Cube"],
	 correct: 1
	},
	
	
	{question: "Who cheated on Beyonce?",
	 answer: ["Drake", "Kendrick Lamar", "Jay Z", "Rick Ross"],
	 correct: 2
	},
	
	{question: "Which rapper was sued by their own mother?",
	 answer: ["Eminem", "Dr. Dre", "Ice Cube", "Iggy Azalea "],
	 correct: 0
	},
	
	{question: "Who made their acting debut in the show Degrassi?",
	 answer: ["Nicki Minaj", "Drake", "Kid Cudi", "Lizzo"],
	 correct: 1
	},
	
	
	{question: "Which artist is a professional flutist?",
	 answer: ["Nicki Minaj", "John Legend", "Kid Cudi", "Lizzo"],
	 correct: 3
	},
	
	
	{question: "Which rapper wears a gladiator mask every time he performs?",
	 answer: ["MF Doom", "G Eazy", "Logic", "Big Sean"],
	 correct: 0
	},
	
	
	{question: "Which rapper avoided decades in prison by snitching on the New York gang, Nine Trey Gangsta Bloods?",
	 answer: ["21 Savage", "Tekashi 69", "Lil Pump", "The Game"],
	 correct: 1
	},
	
	{question: "Which artist chose their moniker from a Wu-Tang Name generator?",
	 answer: ["Schoolboy Q", "ASAP Mob", "Childish Gambino", "Brockhampton"],
	 correct: 2
	}
];

//points and currentQuestion set to undefined until user hits play
let points, currentQuestion;


$(".js-play").on("click", e =>{
	
		points = 0;
		currentQuestion = 0;
		$(".js-final-score").hide();
		e.preventDefault();
	
		$(".playContainer").hide();
		
		renderQuiz(currentQuestion, points);
	});


function renderQuiz(i, p){
	$("#js-next").hide();
	
	$(".js-answers").empty();
	
	if(i >= QA.length){
		$("#js-quiz-form").hide();
		$(".js-final-score").css("display", "block");
		finalScore(p);
		//show score
		//ask if they want to play again
		
	}else{
		
		renderQuestion(i);
		renderAnswers(i);
		renderQuestionNum(i);
		//displayPicture(i);
		console.log("QA:" + i);
		$("#js-quiz-form").css("display", "flex");
	}
	
}

function renderQuestionNum(i){
	
	$(".js-q-number").html(`<p>${i + 1}/${QA.length}</p>`)
}

function renderQuestion(index){
	//renders question
	$(".js-questions").html(`<legend> ${QA[index].question} <legend>`);	
	
}

function renderAnswers(index){
	//renders correct answer and three wrong answers
	let ansArr = Object.values(QA[index].answer);
	
	$.each(ansArr, function(j, value){
		$(".js-answers").append(`<input type="radio" name="answers${index}" value="${j}" id="img${j}" class="radioInput"> 
		  <label for="img${j}">${value}</label><br>`);
	});
	
}

//submit answer listening
$("#js-submit-answer").on("click", function(e){
	
	$('.radioInput').prop("disabled", true);


	$("#js-submit-answer").hide();
	e.preventDefault();
		
	let rightAns = QA[currentQuestion].correct;
	console.log("This is the right ans: " + rightAns);
	
	let ans = $("input:checked").val();
	console.log("input checked value: " + ans);
	
	if(ans == rightAns){
		points++;
		$(".js-response").html("CORRECT!")
	}else{
		$(".js-response").html(`Wrong, the correct answer is ${QA[currentQuestion].answer[rightAns]}` );
	}
	
	displayScore(points);
	currentQuestion++;
	console.log("Current Question: " + currentQuestion);
	console.log(points + " points");
	$("#js-next").show();
	
});
						  
$("#js-next").on("click", function(e){
	
	
	$(".js-response").empty();
	
	$("#js-next").hide();
	
	renderQuiz(currentQuestion, points);
	
	if(currentQuestion <= QA.length){
	$("#js-submit-answer").show();
	}
});

function displayScore(num){
	
	console.log("this number is: " + num);
	
	let currentScore = num * 10;
	$(".current-score").html(`<p>${currentScore} / 100</p>`)
}

function finalScore(num){
	
	let score = num * 10;
	
	$(".js-final-score").html(`<h2>Your Final Score is</h2><br>
	<h1>${score}/100</h1>`);
	
	$(".js-final-score").append(`<h3>Would you like to play again?</h3>`);
	$(".playContainer").show();
	
}

function displayPicture(num){
	let id = `#${String(num + 1)}`;
	
	$(".images").find(id).css("display", "inline");	
}

