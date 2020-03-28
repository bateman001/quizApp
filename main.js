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
	 answer: ["J Cole", "Drake", "Kanye West", "Kid Cudi"],
	 correct: 1
	},
	
	
	{question: "Which artist is a professional flutist?",
	 answer: ["Nicki Minaj", "John Legend", "Kid Cudi", "Lizzo"],
	 correct: 3
	},
	
	
	{question: "Which artist from the group Odd Future, went on the produce their solo album Blond?",
	 answer: ["Earl Sweatshirt", "Syd", "Frank Ocean", "Tyler, the Creator"],
	 correct: 2
	},
	
	
	{question: "Which rapper avoided decades in prison by snitching on the New York gang, Nine Trey Grangsta Bloods?",
	 answer: ["21 Savage", "Tekashi 69", "Lil Pump", "The Game"],
	 correct: 1
	},
	
	{question: "Which TDE artist released the 2016 hit album, CTRL?",
	 answer: ["Isaiah Rashad", "Schoolboy Q", "SZA", "Kendrick Lamar"],
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
		
		renderQuiz(currentQuestion);
	});


function renderQuiz(i){
	$("#js-next").hide();
	
	$(".js-answers").empty();
	
	if(i >= QA.length){
		$("#js-quiz-form").hide();
		$(".js-final-score").show();
		finalScore(points);
		//show score
		//ask if they want to play again
		
	}else{
		
		$(".js-questions").html(renderQuestion(i));
		renderAnswers(i);
		renderQuestionNum(i);
		console.log("QA:" + i);

		$("#js-quiz-form").css("display", "block");
	}
	
}

function renderQuestionNum(i){
	$(".js-q-number").html(`<p>${i + 1}/${QA.length}</p>`)
}

function renderQuestion(index){
	//renders question and answers
	let question = `<legend> ${QA[index].question} <legend>`;
	
	return question;
}

function renderAnswers(index){
	//renders correct answer and three wrong answers
	let ansArr = Object.values(QA[index].answer);
	
	$.each(ansArr, function(j, value){
		$(".js-answers").append(`<input type="radio" name="answers${index}" value="${j}"> 
		  <label for="${j}">${value}</label><br>`);
	});
	
}

//submit answer listening
$("#js-submit-answer").on("click", function(e){
	
	$("#js-submit-answer").hide();
	e.preventDefault();
		
	let rightAns = QA[currentQuestion].correct;
	console.log("This is the right ans " + rightAns);
	
	let ans = $("input:checked").val();
	console.log("input checked value " + ans);
	
	if(ans == rightAns){
		points++;
		$(".js-response").html("CORRECT!")
		//return true;
	}else{
		$(".js-response").html(`Wrong, the correct answer is ${QA[currentQuestion].answer[rightAns]}` );
	//	return false;
	}
	
	currentQuestion++;
	console.log("Current Question" + currentQuestion);
	console.log(points + "points");
	$("#js-next").show();
	
});
						  
$("#js-next").on("click", function(e){
	
	
	$(".js-response").empty();
	
	$("#js-next").hide();
	
	renderQuiz(currentQuestion);
	
	if(currentQuestion <= QA.length){
	$("#js-submit-answer").show();
	}
});

function finalScore(num){
	
	let score = num * 10;
	
	$(".js-final-score").html(`<h2>Your Final Score is</h2><br>
	<h1>${score}</h1>`);
	
	$(".js-final-score").append(`<h3>Would you like to play again?</h3>`);
	$(".playContainer").show();
	
}

//function handleScore(){
	//calculates score of the quiz by adding all the point together 



