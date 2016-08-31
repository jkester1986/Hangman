// JavaScript Document
var api = 'http://api.wordnik.com/v4/words.json/randomWord';
var key = 'a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5';

var corpus = 2000; // higher = less complex words
var def = true; // only words with definitions ?

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
	var word = "";
	$.when (getWord('noun'))
		.then(function(genWord){
			word = genWord.word;
			console.log(word);
			var wordDiv = document.getElementById("word");
			wordDiv.innerHTML = word;
		})
		.fail(function() { alert('ERROR'); });
	;
	
	return word;
}

function guess(letter){
	//if letter is right
	
	
	//if letter is wrong
	var wrongLetters = document.getElementById("wrongLetters");
	wrongLetters.innerHTML += " " + letter;
}