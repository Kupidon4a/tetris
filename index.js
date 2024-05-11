document.getElementById('start').play();
const formInput = document.getElementById('formInput');
formInput.addEventListener('submit',store);

const nameUser = document.getElementById('nameUser');
if(localStorage["username"]){
    nameUser.value = localStorage["username"];
}

function store(event) {
    event.preventDefault();
    const name = formInput.querySelector('[name="name"]');
    localStorage["username"] = name.value;
    if (!localStorage["records"]){
        localStorage["records"] = [];
    }
    window.location = "main.html";
}

   