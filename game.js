function Card(picture){
	var FOLDER_IMAGES = 'resources/'
	this.picture = picture;
	this.visible = false;
	this.block = false;

	this.equals =  function (cardGame){
		if (this.picture.valueOf() == cardGame.picture.valueOf()){
			return true;
		}
		return false;
	}
	this.getPathCardImage =  function(){
		return FOLDER_IMAGES+picture;
	}
	this.getQuestionImage =  function(){
		return FOLDER_IMAGES+'question.png';
	}
}

function ControllerLogicGame(){
	var firstSelected;
	var secondSelected;
	var block = false;

	this.doLogicGame =  function (card,callback){
		if (!card.block && !block) {
			if (firstSelected == null){
				firstSelected = card;
			}else if (secondSelected == null){
				secondSelected = card;
			}
			card.visible = true;

			if (firstSelected != null && secondSelected != null){
				block = true;
				var timer = setInterval(function(){
					if (secondSelected.equals(firstSelected)){
						firstSelected.block = true;
						firstSelected.block = true;
					}else{
						firstSelected.visible  = false;
						secondSelected.visible  = false;
					}        				  		
					firstSelected = null;
					secondSelected = null;
					callback();
					clearInterval(timer);
					block = false;
				},2000);
			} 
			callback();
		};
	};

}

function CardGame (cards , controllerLogicGame){
	var LINES = 4;
	var COLS  = 5;
	this.cards = cards;
	var logicGame = controllerLogicGame;

	this.clear = function (){
		var game = document.getElementById("game");
		game.innerHTML = '';
	}

	this.show =  function (){
		this.clear();
		var cardCount = 0;
		var game = document.getElementById("game");
		for(var i = 0 ; i < LINES; i++){
			for(var j = 0 ; j < COLS; j++){
				card = cards[cardCount++];
				var cardImage = document.createElement("img");
				if (card.visible){
					cardImage.setAttribute("src",card.getPathCardImage());
				}else{
					cardImage.setAttribute("src",card.getQuestionImage());
				}
				cardImage.onclick =  (function(position,cardGame) {
					return function() {
						card = cards[position];
						var callback =  function (){
							cardGame.show();
						};
						logicGame.doLogicGame(card,callback);
					};
				})(cardCount-1,this);

				game.appendChild(cardImage);
			}
			var br = document.createElement("br");
			game.appendChild(br);
		}
	}
}

function BuilderCardGame(){
	var pictures = new Array ('black.png','black.png',
		'blue.png','blue.png',
		'blue_2.png','blue_2.png',
		'green.png','green.png',
		'pink.png','pink.png',
		'purple.png','purple.png',
		'red.png','red.png',
		'white.png','white.png',
		'wine.png','wine.png',
		'yellow.png','yellow.png');
	this.doCardGame =  function (){
		shufflePictures();
		cards  = buildCardGame();
		cardGame =  new CardGame(cards, new ControllerLogicGame())
		return cardGame;
	}

	var shufflePictures = function(){
		var i = pictures.length, j, tempi, tempj;
		if ( i == 0 ) return false;
		while ( --i ) {
			j = Math.floor( Math.random() * ( i + 1 ) );
			tempi = pictures[i];
			tempj = pictures[j];
			pictures[i] = tempj;
			pictures[j] = tempi;
		}
	}

	var buildCardGame =  function (){
		var countCards = 0;
		cards =  new Array();
		for (var i = pictures.length - 1; i >= 0; i--) {
			card =  new Card(pictures[i]);
			cards[countCards++] = card;
		};
		return cards;
	}
}