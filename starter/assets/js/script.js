document.querySelector(".ms-auto").addEventListener("click", function () {
    document.querySelector("#modal-task").classList.add("active");
});
document.querySelector(".btn-close").addEventListener("click", function () {
    document.querySelector("#modal-task").classList.remove("active");
});


const form = document.getElementById('form-task');
const Title = document.getElementById('task-title');
const Priority = document.getElementById('task-priority');
const Status = document.getElementById('task-status');
const Dateform = document.getElementById('task-date');
const Description = document.getElementById('task-description');

let tachesList = [];

function addTach() {
    // if (!validationtach()) {
    //     return;
    // }
    
    const taches = {
        id: Date.now(),
        Title: Title.value.trim(),
        Type: document.querySelector('input[name="task-type"]:checked') ? document.querySelector('input[name="task-type"]:checked').value : "",
        Priority: Priority.value.trim(),
        Status: Status.value.trim(),
        Dateform: Dateform.value.trim(),
        Description: Description.value.trim()
    };

    tachesList.push(taches)
    AfficherTach(taches);
    document.getElementById("form-task").reset();
    document.querySelector("#modal-task").classList.remove("active"); 
}


function AfficherTach(taches) {
    const colonne = document.getElementById(`to-do-tasks`); 
    const tacheElement = document.createElement("div");
    tacheElement.classList.add("taches");
    tacheElement.setAttribute("data-id", taches.id);
    tacheElement.innerHTML = `
       <div class="task-card-header">
            <h3 class="task-title">${taches.Title}</h3>
            <span class="task-priority">${taches.Priority}</span>
        </div>
        <p class="task-description">${taches.Description}</p>
        <div class="task-card-footer">
            <span class="task-date">${taches.Dateform}</span>
            <div class="task-actions">
                <button class="edit-button" onclick="modifierTache(${taches.id})">Modifier</button>
                <button class="delete-button" onclick="supprimerTache(${taches.id})">Supprimer</button>
            </div>
        </div>
    `;
    colonne.appendChild(tacheElement);
}

// Validation des champs du formulaire
function validationtach() {
    let valid = true;

    if (Title.value.trim() === '') {
        setError(Title, 'Le titre est obligatoire');
        valid = false;
    } else {
        setSuccess(Title);
    }

    const typeElement = document.querySelector('input[name="task-type"]:checked');
    if (!typeElement) {
        setError(Type, 'Le type est obligatoire');
        valid = false;
    } else {
        setSuccess(Type);
    }

    if (Priority.value.trim() === '') {
        setError(Priority, 'La priorité est obligatoire');
        valid = false;
    } else {
        setSuccess(Priority);
    }

    if (Status.value.trim() === '') {
        setError(Status, 'Le statut est obligatoire');
        valid = false;
    } else {
        setSuccess(Status);
    }

    if (Dateform.value.trim() === '') {
        setError(Dateform, 'La date est obligatoire');
        valid = false;
    } else if (isNaN(Date.parse(Dateform.value.trim()))) {
        setError(Dateform, 'Veuillez entrer une date valide');
        valid = false;
    } else {
        setSuccess(Dateform);
    }

    if (Description.value.trim() === '') {
        setError(Description, 'La description est obligatoire');
        valid = false;
    } else if (Description.value.trim().length < 5) {
        setError(Description, 'La description doit contenir au moins 5 caractères');
        valid = false;
    } else {
        setSuccess(Description);
    }

    return valid; 
}

function setError(element, message) {
    const inputControl = element.parentElement;
    let errorDisplay = inputControl.querySelector('.error');
    if (!errorDisplay) {
        errorDisplay = document.createElement("div");
        errorDisplay.classList.add("error");
        inputControl.appendChild(errorDisplay);
    }
    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}

function setSuccess(element) {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    if (errorDisplay) errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
}


//------------ Modifie tache ------------------//
function tacheModifier(id){
    const taches =tachesList.find(t => t.id ===id);
    if(!taches) return;

    Title.value= taches.Title;
    document.querySelector(`input[name="task-type"][value="${taches.Type}"]`).ariaChecked;
    Priority.value = taches.Priority;
    Status.value = taches.Status;
    Dateform.value= taches.Dateform;
    Description.value = taches.Description;
    form.setAttribute('data')








}

//Supprimer une tâche ---------------------//






// Soumission du formulaire
form.addEventListener('submit', function (e) {
    e.preventDefault();
    addTach();
});
