// JavaScript Document
var api = 'http://api.wordnik.com/v4/words.json/randomWord';
var key = 'a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5';

var corpus = 2000; // higher = less complex words
var def = true; // only words with definitions ?

var word = "";
var wordCount = 0;
var charsLeft = 0;
var guessesLeft = 6;

function getWord(type, c) {
    return $.get(
        api + 
        '?includePartOfSpeech=' + type +
        '&hasDictionaryDef=' + def +
        '&minCorpusCount=' + corpus + 
        '&api_key=' + key
    );    
}

function generateWord(){
	$.when (getWord('noun'))
		.then(function(genWord){
			word = genWord.word;
			//console.log(word);
			var wordDiv = document.getElementById("word");
			wordDiv.innerHTML = word;
			
			
			//word = "test do's-don'ts";
			//generate blank spaces
			var buildBlanks = "";
			var length = word.length;
			var counter = 0;
			
			
			
			for(var i = 0; i < length; i++){
				switch (word.charAt(i)){
					case " ":
						buildBlanks += "<div id=\"blank" + counter + "\"class=\"space\"></div>";
						charsLeft --;
						break;
					case "-":
						buildBlanks += "<div id=\"blank" + counter + "\" class=\"sym\">-</div>";
						charsLeft --;
						break;
					case "\'":
						buildBlanks += "<div id=\"blank" + counter + "\" class=\"sym\">\'</div>";
						charsLeft --;
						break;
					default:
						buildBlanks += "<div id=\"blank" + counter + "\" class=\"blank\"></div>";
						break;
				}
				counter ++;
				charsLeft ++;
			}
			//console.log("The word is " + word);
			//console.log("There are " + counter + " characters in this word");
			//console.log("Characters left to guess: " + charsLeft);
			wordCount = counter;
			var blanksDiv = document.getElementById("blanks");
			blanksDiv.innerHTML = buildBlanks;
		})
		.fail(function() { alert('ERROR'); });
	;
	
	return word;
}

function guess(letter){
	//TODO: clear contents of input box
	//TODO: deal with capitals
	
	
	var indices = [];
	for(var i=0; i<wordCount;i++) {
		if (word[i] === letter) indices.push(i);
	}
	//if letter is right
	if(indices.length > 0){
		console.log(indices);
		var numRight = indices.length;
		for(var i = 0; i < numRight; i++){
			var fillBlank = document.getElementById("blank" + indices[i]);
			fillBlank.className = "letter";
			fillBlank.innerHTML = letter;
			charsLeft --;
			//console.log("Characters left to guess: " + charsLeft);
		}
	}
	//if letter is wrong
	else{
		var wrongLetters = document.getElementById("wrongLetters");
		wrongLetters.innerHTML += " " + letter;
		guessesLeft --;
	}
	
	if (charsLeft == 0){
		console.log("You Win!");
		alert("Congratulations, you win!");
		resetGame();
	}
	if (guessesLeft == 0){
		console.log("You Lose :(");
		alert("Sorry, you lose :(. The word was " + word);
		resetGame();
	}
	
	document.getElementById("guessing").value = "";
	
	
}

function resetGame(){
	var wrongLetters = document.getElementById("wrongLetters");
	wrongLetters.innerHTML = "";
	var word = "";
	var wordCount = 0;
	var charsLeft = 0;
	var guessesLeft = 6;
}