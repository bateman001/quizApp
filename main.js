// JavaScript Document


//This code works as loop in 4 steps repeating steps 2, 3, and 4 until we reach the end of this array
//it increments the currentQuestion variable in the submit step and test whether the currentQuestion >= QA.length()
//Step 1: Press Play, initiate Quiz, displays first question in quiz
//Step 2: RenderQuiz - test currentQuestion >= QA, if not display question, answer, picture, score, question number and submit button.
//Step 3: Submit Answer - adds points, increments current question, unblurs photo, displays response, and next button
//Step 4: Next - rendersQuiz() with newly incremented variables
//
//Once QA length is reached, RenderQuiz will display score and ask user if they'd like to play again. Once user hits play
//the points and currentQuestion variables are set back to 0
//array of question and answer pairs, with correct key equal to index of correct answer in the array
const QA = [
	{question: "Who interrupted Taylor Swift at the 2009 MTV Music Awards?",
	 answer: ["Kanye West", "2 Chainz", "Rick Ross", "Lil Wayne"],
	 correct: 0
	 
	},
	
	{question: "Who won the 2019 Grammy for best rap album?",
	 answer: ["Future", "J Cole", "Cardi B", "Tyler, the Creator"],
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
	
	{question: "Who artist made their acting debut on the show Degrassi?",
	 answer: ["Big Sean", "Drake", "Kid Cudi", "Ice Cube"],
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
	 answer: ["Schoolboy Q", "A$AP Rocky", "Childish Gambino", "Machine Gun Kelly"],
	 correct: 2
	}
];

//points and currentQuestion set to undefined until user hits play
//set them as global variables so they can be accessed by multiple functions but they are only changed inside of one function
let points, currentQuestion;


//Play button starts entire quiz. Sets points and currentquestion to 0. When quiz restarts, variables are again reset to 0
$(".js-play").on("click", e =>{
	
		points = 0;
		currentQuestion = 0;
	
		//adds blur to hide all the images
		$("img").css("filter", "blur(12px)");
	
		//hides the final score container because we wont need it until end of quiz
		$(".js-final-score").hide();
		e.preventDefault();
	
		//hides the play button and container
		$(".playContainer").hide();
		
		//finally starts quiz passing our two global variables
		renderQuiz(currentQuestion, points);
	});


//passes currentQuestion as index of QA array and points as p
function renderQuiz(i, p){
	
	//hiding next button
	$("#js-next").hide();
	
	//clearing answers for next question
	$(".js-answers").empty()
	
	//hiding the response div
	$(".js-response").css("display", "none");
	
	//testing whether currentQuestion is greater than the array length
	if(i >= QA.length){
		//hiding all divs and displaying final score;
		$(".current-score").hide();
		$("#js-quiz-form").hide();
		finalScore(p);
		
	}else{
		//passing currentQuestion to different functions
		renderQuestion(i);
		renderAnswers(i);
		renderQuestionNum(i);
		
		//testing window width for mobile functionality
		if($(window).width() > 800){
		displayPicture(i);
		}
				
		displayScore(p);
		
		//displaying quiz form
		$("#js-quiz-form").css("display", "flex");
	}
	
}

function renderQuestionNum(i){
	//shows which question user is on
	$(".js-q-number").html(`<p>${i + 1}/${QA.length}</p>`)
}

function renderQuestion(index){
	//renders question
	$(".js-questions").html(`<legend> ${QA[index].question} <legend>`);	
	
}

function renderAnswers(index){
	
	//renders correct answer and three wrong answers
	let ansArr = Object.values(QA[index].answer);
	
	//function to output each answer in the array
	$.each(ansArr, function(j, value){
		$(".js-answers").append(`<input type="radio" name="answers${index}" value="${j}" id="img${j}" class="radioInput"> 
		  <label for="img${j}">${value}</label><br>`);
	});
	
}

//submit answer listening
$("#js-submit-answer").on("submit", function(e){
	
	$('.radioInput').prop("disabled", true);

	$("#js-submit-answer").hide();
	e.preventDefault();
	
		
	//user input and find if it's correct
	let ans = $("input:checked").val();
	displayResponse(currentQuestion, ans);
	
	//display next button
	$("#js-next").show();
	
	//only on screens larger than mobile
	let id = `#${String(currentQuestion)}`;
	$(".images").find(id).css("filter", "none");
	
	displayScore(points);
	currentQuestion++;	
});

function displayResponse(i, res){
	
	let rightAns = QA[i].correct;

	if(res == rightAns){
		//add points if correct
		points++;
		$(".js-response").html(`<p>CORRECT!</p>`)
	}else{
		$(".js-response").html(`<p>Wrong! The correct answer is ${QA[i].answer[rightAns]}</p>` );
	}
	
	$(".js-response").css("display", "block");

}
						  
$("#js-next").on("submit", function(e){
	
	//display picture if on computer not mobile
	if($(window).width() > 599){
	//hides previous picture
	let id = currentQuestion - 1;
	if(currentQuestion > id){
		$(".images").find(`#${id}`).hide();
	}	
	}
	
	//tests whether submit button should show up for the next question
	if(currentQuestion <= QA.length){
		$("#js-submit-answer").show();
	}
	
	//renders quiz again with newly incremented variables
	renderQuiz(currentQuestion, points);
	
});

function displayScore(num){
	
	console.log("this number is: " + num);
	
	let currentScore = num * 10;
	$(".current-score").html(`<p>${currentScore} / 100</p>`)
	$(".current-score").show();	
}

function finalScore(num){
	
	let score = num * 10;
	
	$(".js-final-score").html(`<h2>Your Final Score is</h2><br>
	<h1>${score}/100</h1>`);
	
	$(".js-final-score").append(`<h3>Would you like to play again?</h3>`);
	$(".js-final-score").css("display", "block");

	$(".playContainer").css("margin-top", "-10px");	
	$(".playContainer").show();
	
}

function displayPicture(num){
	
	let id = `#${num}`;
	
	$(".images").find(id).css("display", "inline");	
}

