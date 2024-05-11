document.getElementById('gameover').play();
let data = localStorage["records"].split(';');

let table = document.querySelector('#table');
data.pop();
for (let i = 0; i < data.length; i++){
    data[i] = data[i].split(' ');
}

for(let i = 0; i < data.length; i++){
    data[i][1] = Number(data[i][1]); 
}

function cmp(a, b){

    if (a[1] > b[1]){
        return -1;
    }
    else if(a[1] < b[1]){
        return 1;
    }
    else{
        return 0;
    }
}
data.sort(cmp);

let tr = document.createElement('tr');
let td = document.createElement('td');
td.innerHTML = 'Имя игрока';
tr.appendChild(td);
td = document.createElement('td');
td.innerHTML = 'Очки';
tr.appendChild(td); 
table.appendChild(tr);

for (let i = 0; i < data.length && i < 5; i++) {
	tr = document.createElement('tr');
	for (let j = 0; j < data[i].length; j++){
        td = document.createElement('td');
        td.innerHTML = data[i][j];
        tr.appendChild(td);
    }	
	table.appendChild(tr);
}


const button = document.getElementById('btn');
button.onclick = transfer;
function transfer(){
    window.location = "index.html";
}