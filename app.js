var endPoint = {"buttons":[23,24,-10,-46],"bars":[24,81],"limit":130};

var references = document.getElementById('references');

var progressPlayer = document.getElementById('progressPlayer'); 
var buttonControlObj = document.getElementById('buttonControls');
var selectControlObj = document.getElementById('selectControl');

// listener on click of the button
buttonControlObj.addEventListener("click", function(event) {
	if (event.target.nodeName == 'BUTTON') {
		var index = parseInt(selectControlObj.value);
		endPoint.bars[index] = endPoint.bars[index] + parseInt(event.target.value);
		if (endPoint.bars[index] < 0) {
			endPoint.bars[index] = 0;
		}
		updateDOM(index);
	}
});

function updateDOM(index) {
	var toUpdateObj = progressPlayer.getElementsByClassName('barHld')[index];
	if (endPoint.bars[index] > endPoint.limit) {
		toUpdateObj.classList.add('error');
	} else {
		toUpdateObj.classList.remove('error');
	}
	var width = endPoint.bars[index]+'%';
	toUpdateObj.getElementsByClassName('progress')[0].style.width = width;
	toUpdateObj.getElementsByClassName('percent')[0].innerHTML  = '<span>'+width+'</span>';
}

function createBar(index) {
	var bar = references.getElementsByClassName('barHld')[0].cloneNode(true);
	progressPlayer.appendChild(bar);
	selectControlObj.appendChild(getOptionNode(index))
	updateDOM(index);
}

function getOptionNode(index) {
	var option = document.createElement("OPTION");
	option.value = index;
	option.innerHTML = '#progress'+(index+1);
	return option;
}

function createButton(index) {
	var button = document.createElement("BUTTON");
	button.value = endPoint.buttons[index];
	button.innerHTML = endPoint.buttons[index];
	buttonControlObj.appendChild(button);
}

for(var index=0; index < endPoint.bars.length; index++) {
	createBar(index);	
}

for(var index=0; index < endPoint.buttons.length; index++) {
	createButton(index);	
}