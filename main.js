const infoPlayer = document.getElementById('infoPlayer');
const infoLevel = document.getElementById('infoLevel');
const infoScore = document.getElementById('infoScore');
infoPlayer.textContent += localStorage["username"];
const contextInfoLevel = infoLevel.textContent;
const contextInfoScore = infoScore.textContent;

const canvasField = document.getElementById('game');
const contextField = canvasField.getContext('2d');

const sizeСell = 32;
const height = canvasField.height / sizeСell;
const width = canvasField.width / sizeСell;

const canvasNextFigure = document.getElementById('nextFigure');
const contextNextFigure = canvasNextFigure.getContext('2d');

const heightNextFigure = canvasNextFigure.height / sizeСell;
const widthNextFigure = canvasNextFigure.width / sizeСell;

const colorFigures = ['cyan',
					'blue',
					'orange',
					'yellow',
					'green',
					'purple',
					'red'];

const matrixFigures = [[[0, 0, 0, 0],
					  [0, 0, 0, 0],
					  [1, 1, 1, 1],
					  [0, 0, 0, 0]],
					
					[[0, 0, 0],
					[2, 0, 0],
					[2, 2, 2]],
					
					[[0, 0, 0],
					[0, 0, 3],
					[3, 3, 3]],
				
					[[4, 4],
					[4, 4]],
				
					[[0, 0, 0],
					[0, 5, 5],
					[5, 5, 0]],

					[[0, 0, 0],
					[0, 6, 0],
					[6, 6, 6]],

					[[0, 0, 0],
					[7, 7, 0],
					[0, 7, 7]]
					];

let gameField = [];
let speed = 400;
let level = 1;
let points = 0;
infoScore.textContent = contextInfoScore + points.toString();
infoLevel.textContent = contextInfoLevel + level.toString();

for(let i = -2; i < height; i++){
	gameField[i] = [];
	for(let j = 0; j < width; j++){
		gameField[i][j] = 0;
	}
}


function getRandomFigure() {
    let result = Math.floor(Math.random() * 7);
    return result;
}

function checkSetFigure(gameField, matrixFigure, x, y){
	let sizeFigure = matrixFigure.length;
	for (let i = x; i < x + sizeFigure; i++){
		for (let j = y; j < y + sizeFigure; j++){
			if (matrixFigure[(j - y)][(i - x)] != 0 && (j >= gameField.length || i >= gameField[0].length || i < 0 || gameField[j][i] != 0)){
				console.log('error set figure i = ' + i + ' j = ' + j);
				return false;
			}
		}
	}
	return true;
}

function checkSetNewFigure(gameField, matrixFigures, dataCurrFigure){
	let numberFigure = dataCurrFigure[2];
	let x;
	let y;
	if ((gameField[0].length - matrixFigures[numberFigure].length) % 2 === 0){
		x = (gameField[0].length - matrixFigures[numberFigure].length) / 2;
	}
	else{
		x = (gameField[0].length - matrixFigures[numberFigure].length - 1) / 2;
	}
	y = -2;
	dataCurrFigure[0] = x;
	dataCurrFigure[1] = y;
	for (let i = x; i < x + matrixFigures[numberFigure].length; i++){
		for (let j = y; j < y + matrixFigures[numberFigure].length; j++){
			if (matrixFigures[numberFigure][(j - y)][(i - x)] != 0 && gameField[j][i] != 0){
				console.log('Game Finish');
				const sizeRecords = localStorage["records"].length;
				localStorage["records"] += localStorage["username"];
				localStorage["records"] += ' ';
				localStorage["records"] += points;
				localStorage["records"] += ';';
				window.location = "records.html";
				return false;
			}
		}
	}
	let XYNumberFigure = [x, y, numberFigure];
	return XYNumberFigure;
}


function setFigure(gameField, matrixFigure, x, y){
	let x1 = x + matrixFigure.length;
	if (x1 > gameField[0].length){
		x1 = gameField[0].length;
	}
	let y1 = y + matrixFigure.length;
	if (y1 > gameField.length){
		y1 = gameField.length;
	}
		for (let i = x; i < x1; i++){
			for (let j = y; j < y1; j++){
				if (matrixFigure[(j - y)][(i - x)] != 0 && gameField[j][i] === 0)
					gameField[j][i] = matrixFigure[(j - y)][(i - x)];
					
			}
		}
}

function setNewFigure(gameField, matrixFigures, dataCurrFigure){
	let x = dataCurrFigure[0];
	let y = dataCurrFigure[1];
	let numberFigure = dataCurrFigure[2];
	for (let i = x; i < x + matrixFigures[numberFigure].length; i++){
		for (let j = y; j < y + matrixFigures[numberFigure].length; j++){
			if (matrixFigures[numberFigure][(j - y)][(i - x)] != 0)
				gameField[j][i] = matrixFigures[numberFigure][(j - y)][(i - x)]; 	
		}
	}
}

function deleteFigure(gameField, matrixFigure, x, y){
	let x1 = x + matrixFigure.length;
	if (x1 > gameField[0].length){
		x1 = gameField[0].length;
	}
	let y1 = y + matrixFigure.length;
	if (y1 > gameField.length){
		y1 = gameField.length;
	}
	
	for (let i = x; i < x1; i++){
		for (let j = y; j < y1; j++){
			if (matrixFigure[(j - y)][(i - x)] == gameField[j][i])
				gameField[j][i] = 0; 	
		}
	}
}

function figureRotation(figure){
	let resultFigure = [];
	for (let i = 0; i < figure.length; i++){
		resultFigure[i] = [];
		for(let j = 0; j < figure.length; j++){
			resultFigure[i][j] = 0;
		}
	}
	for (let i = 0; i < figure.length; i++){
		for (let j = 0; j < figure.length; j++){
			resultFigure[j][figure.length - i - 1] = figure[i][j];
		}
	}
	return resultFigure;
}

function movementFigure(dataCurrFigure, gameField, matrixFigure, direction){
	let x = dataCurrFigure[0];
	let y = dataCurrFigure[1];
	deleteFigure(gameField, matrixFigure, x, y);
	switch (direction){
		case 'down':
			if (checkSetFigure(gameField, matrixFigure, x, (y + 1))){
				setFigure(gameField, matrixFigure, x, (y + 1));
				dataCurrFigure[1] += 1;
			}
			else{
				setFigure(gameField, matrixFigure, x, y);
				return false;
			}
			break;

		case 'downAll':
			while(checkSetFigure(gameField, matrixFigure, x, (y + 1))){
				y = y + 1;
				points += 1;
			}
			setFigure(gameField, matrixFigure, x, y);
			dataCurrFigure[1] = y;
			break;

		case 'left':
			if (checkSetFigure(gameField, matrixFigure, (x - 1), y)){
				setFigure(gameField, matrixFigure, (x - 1), y);
				dataCurrFigure[0] -= 1;
			}
			else{
				setFigure(gameField, matrixFigure, x, y);
				
			}
			break;
		case 'right': 
			if (checkSetFigure(gameField, matrixFigure, (x + 1), y)){
				setFigure(gameField, matrixFigure, (x + 1), y);
				dataCurrFigure[0] += 1;
			}
			else{
				setFigure(gameField, matrixFigure, x, y);
				
			}
			break;
		case 'rotation':
			let newMatrixFigure = figureRotation(matrixFigure);
			if (checkSetFigure(gameField, newMatrixFigure, x, y)){
				setFigure(gameField, newMatrixFigure, x, y);
			}
			else{
				setFigure(gameField, matrixFigure, x, y);
				return false;
			}
			break;
	}
	return true;
}




function getFigure(numberFigure){
	let matrixFigure = [];
	for (let i = 0; i < matrixFigures[numberFigure].length; i++){
		matrixFigure[i] = [];
		for(let j = 0; j < matrixFigures[numberFigure].length; j++){
			matrixFigure[i][j] = matrixFigures[numberFigure][i][j];
		}
	}
	return matrixFigure;
}


function deleteFilledRow(gameField, numberRows){
	for (let i = numberRows; i > 0; i--){
		for (let j = 0; j < gameField[0].length; j++){
			gameField[i][j] = gameField[(i - 1)][j];
		}
	}
	for (let j = 0; j < gameField[0].length; j++){
		gameField[0][j] = 0;
	}
}

function disappearanceRows(gameField){
	let countDeleteRows = 0;
	let filledRow = true;
	for (let i = 0; i < gameField.length; i++){
		for (let j = 0; j < gameField[0].length; j++){
			if (gameField[i][j] === 0){
				filledRow = false;
				break;
			}
		}
		if (filledRow){
			deleteFilledRow(gameField, i);
			countDeleteRows += 1;
		}
		filledRow = true;
		
	}
	switch(countDeleteRows){
		case 1:
			points += 100;
			document.getElementById('disappearance').play();
			break;
		case 2:
			points += 300;
			document.getElementById('disappearance').play();
			break;
		case 3:
			points += 700;
			document.getElementById('disappearance').play();
			break;
		case 4:
			points += 1500;
			document.getElementById('disappearance').play();
			break;
		default:
			break;
	}
	infoScore.textContent = contextInfoScore + points.toString();
}


function updateLevelSpeed(){
	if (points > level * 3000){
		document.getElementById('nextlevel').play();
		level += 1;
		speed = Math.ceil((speed*2)/3);
	}
	infoLevel.textContent = contextInfoLevel + level.toString();
}

function drawField(){
	for (let i = 0; i < height; i++){
		for (let j = 0; j < width; j++){
			if (gameField[i][j] != 0){
				contextField.fillStyle = colorFigures[gameField[i][j] - 1];
				contextField.fillRect(j*sizeСell , i*sizeСell, sizeСell, sizeСell);
				contextField.strokeRect(j*sizeСell , i*sizeСell, sizeСell, sizeСell);
			}
			else{
				contextField.fillStyle = 'white';
				contextField.fillRect(j*sizeСell , i*sizeСell, sizeСell, sizeСell);
				contextField.strokeRect(j*sizeСell , i*sizeСell, sizeСell, sizeСell);
			}
		}
	}
}

function drawNextFigure(numberFigure){
	let figure = [];
	for (let i = 0; i < matrixFigures[numberFigure].length; i++){
		figure[i] = [];
		for (let j = 0; j < matrixFigures[numberFigure].length; j++){
			figure[i][j] = matrixFigures[numberFigure][i][j];
		}
	}

	for (let i = 0; i < heightNextFigure; i++){
		for (let j = 0; j < widthNextFigure; j++){
			if (i > 0 && j > 0 && i <= figure.length && j <= figure.length && figure[(i - 1)][(j - 1)] != 0){
				contextNextFigure.fillStyle = colorFigures[figure[(i - 1)][(j - 1)] - 1];
				contextNextFigure.fillRect(j*sizeСell , i*sizeСell, sizeСell, sizeСell);
				contextNextFigure.strokeRect(j*sizeСell , i*sizeСell, sizeСell, sizeСell);
			}
			else{
				contextNextFigure.fillStyle = 'white';
				contextNextFigure.fillRect(j*sizeСell , i*sizeСell, sizeСell, sizeСell);
				contextNextFigure.strokeRect(j*sizeСell , i*sizeСell, sizeСell, sizeСell);
			}
		}
	}
}

let dataCurrFigure = [];
let matrixFigure;


function generateFigure(){
	let numberNextFigure = getRandomFigure();
	drawNextFigure(numberNextFigure);
	let numberFigure = dataCurrFigure[2];
	matrixFigure = getFigure(numberFigure);
	setNewFigure(gameField, matrixFigures, dataCurrFigure);
	drawField();
	var interval = setInterval(() =>
		{	if(movementFigure(dataCurrFigure, gameField, matrixFigure, 'down') === false){
				disappearanceRows(gameField);
				updateLevelSpeed();
				clearInterval(interval);
				dataCurrFigure = [];
				dataCurrFigure[2] = numberNextFigure;
				let temp = checkSetNewFigure(gameField, matrixFigures, dataCurrFigure);
				if(temp != false){
					document.getElementById('fall').play();
					dataCurrFigure[0] = temp[0];
					dataCurrFigure[1] = temp[1];
					dataCurrFigure[2] = temp[2];
					generateFigure();
				}
		}
		drawField()}
		, speed);
}



document.addEventListener('keydown', (event) => {
	const keyName = event.key;
	console.log('Событие keydown: ' + keyName);
	switch (keyName){
		case 'ArrowRight':
			movementFigure(dataCurrFigure, gameField, matrixFigure, 'right');
			break;
		case 'ArrowLeft':
			movementFigure(dataCurrFigure, gameField, matrixFigure, 'left');
			break;
		case 'ArrowDown':
			movementFigure(dataCurrFigure, gameField, matrixFigure, 'downAll');
			break;
		case 'ArrowUp':
			if(movementFigure(dataCurrFigure, gameField, matrixFigure, 'rotation')){
				matrixFigure = figureRotation(matrixFigure);
			}
			break;
		}
	});



	
drawField();
dataCurrFigure[0] = -1;
dataCurrFigure[1] = -1;
dataCurrFigure[2] = getRandomFigure();
let temp = checkSetNewFigure(gameField, matrixFigures, dataCurrFigure);
generateFigure();

