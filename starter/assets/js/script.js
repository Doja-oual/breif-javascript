//modale de add task ------>form
document.querySelector(".ms-auto").addEventListener("click", function () {
  document.querySelector("#modal-task").classList.add("active");
});
//modale form------removeform
document.querySelector(".btn-close").addEventListener("click", function () {
  document.querySelector("#modal-task").classList.remove("active");
});

const form = document.getElementById("form-task");
const Title = document.getElementById("task-title");
const Priority = document.getElementById("task-priority");
const Status = document.getElementById("task-status");
const Dateform = document.getElementById("task-date");
const Description = document.getElementById("task-description");

let tachesList = [];


//sauvegarder liste ses taches dans localstorage-----
function savetachelocalstorage() {
  localStorage.setItem("tachesList", JSON.stringify(tachesList));
}

//fonction de Récupérer la liste des tâches de  LocalStorage -------------//
function LocalStoragetacheform() {
  const saveTache = localStorage.getItem("tachesList");
  if (saveTache) {
    tachesList = JSON.parse(saveTache);
    tachesList.forEach(AfficherTach);
  }
}

// function pour ajouter une tâche,
function addTach() {
  if (!validateForm()) return;

  const modifieId = form.getAttribute("data-edit-id");
  if (modifieId) {
    modifieTache(Number(modifieId));
  } else {
    const taches = {
      id: Date.now(),
      Title: Title.value.trim(),
      Type: document.querySelector('input[name="task-type"]:checked').value,
      Priority: Priority.value,
      Status: Status.value,
      Dateform: Dateform.value,
      Description: Description.value.trim(),
    };
    tachesList.push(taches);
    AfficherTach(taches);
    savetachelocalstorage();
  }
  form.reset();
  form.removeAttribute("data-edit-id");
  document.querySelector("#modal-task").classList.remove("active");
}
// Affichie Tache
function AfficherTach(taches) {
  const colonne = document.getElementById(`to-do-tasks`);
  const progressCol = document.getElementById(`in-progress-tasks`);
  const doneCol = document.getElementById(`done-tasks`);

  const tacheElement = document.createElement("div");
  tacheElement.classList.add("taches");
  tacheElement.setAttribute("data-id", taches.id);
  tacheElement.innerHTML = `
       <div class="task-card-header">
            <h3 class="task-title">${taches.Title}</h3>
            <span class="task-priority">${taches.Priority}</span>
            <span class="task-type">${taches.Type}</span>
        </div>
        <p class="task-description">${taches.Description}</p>
        <div class="task-card-footer">
            <span class="task-date">${taches.Dateform}</span>
            <div class="task-actions">
                <button class="edit-button" onclick="opentacheModifier(${taches.id})">Modifier</button>
                <button class="delete-button" onclick="supprimerTache(${taches.id})">Supprimer</button>
            </div>
        </div>
    `;

  switch (taches.Status) {
    case "To Do":

      colonne.appendChild(tacheElement);
      break;
    case "In Progress":
      

      progressCol.appendChild(tacheElement);
      break;
    case "Done":
      

      doneCol.appendChild(tacheElement);
      break;
  }

  //   counting 

  let todoLength = document.getElementById("to-do-tasks-count");
  let progressLenggth = document.getElementById("in-progress-tasks-count");
  let doneLength = document.getElementById("done-tasks-count");

  todoLength.textContent = colonne.children.length;
  progressLenggth.textContent = progressCol.children.length;
  doneLength.textContent = doneCol.children.length;
}

function opentacheModifier(id) {
  const taches = tachesList.find((t) => t.id === id);
  if (!taches) return;

  Title.value = taches.Title;
  document.querySelector(
    `input[name="task-type"][value="${taches.Type}"]`).checked = true; //Problem
  Priority.value = taches.Priority;
  Status.value = taches.Status;
  Dateform.value = taches.Dateform;
  Description.value = taches.Description;
  form.setAttribute("data-edit-id", id);
  document.querySelector("#modal-task").classList.add("active");
}
//Fonction de modification tache
function modifieTache(id) {
  const tacheIndex = tachesList.findIndex((t) => t.id === id);
  if (tacheIndex === -1) return;

  tachesList[tacheIndex] = {
    Title: Title.value.trim(),
    Type: document.querySelector('input[name="task-type"]:checked').value,
    Priority: Priority.value,
    Status: Status.value,
    Dateform: Dateform.value,
    Description: Description.value.trim(),
  };
  tacheRefrech();
  savetachelocalstorage();
  form.reset();
  form.removeAttribute("data-edit-id");
  document.querySelector("#modal-task").classList.remove("active");
}

function tacheRefrech() {
  const colonne = document.getElementById("to-do-tasks");
  colonne.innerHTML = "";
  tachesList.forEach(AfficherTach);
  cointtache();
}

function supprimerTache(id) {
  tachesList = tachesList.filter((t) => t.id !== id);
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
    }
  });
  tacheRefrech();
  savetachelocalstorage();
}
// // Sélection du bouton Save
// const saveButton = document.getElementById('task-save-btn');

// // Initialiser le bouton Save en mode désactivé
// saveButton.disabled = true;

// Fonction de validation du formulaire
function validateForm() {
  let isValid = true;
  resetErrors();

  if (Title.value.trim() === "") {
    showError(Title, "Title is required.");
    isValid = false;
  }

  if (!document.querySelector('input[name="task-type"]:checked')) {
    showError(
      document.querySelector('input[name="task-type"]'),
      "Please select a task type."
    );
    isValid = false;
  }

  if (Priority.value === "") {
    showError(Priority, "Please select a priority.");
    isValid = false;
  }

  if (Status.value === "") {
    showError(Status, "Please select a status.");
    isValid = false;
  }

  if (Dateform.value === "") {
    showError(Dateform, "Please select a date.");
    isValid = false;
  }

  if (Description.value.trim() === "") {
    showError(Description, "Description is required.");
    isValid = false;
  }

  return isValid;
  // saveButton.disabled = !isValid;
}

// Affiche un message d'erreur sous l'élément spécifié
function showError(element, message) {
  const errorText = document.createElement("div");
  errorText.className = "error-text";
  errorText.style.color = "red";
  errorText.style.marginTop = "5px";
  errorText.textContent = message;
  element.parentNode.appendChild(errorText);
}

// Réinitialise les messages d'erreur
function resetErrors() {
  const errorTexts = document.querySelectorAll(".error-text");
  errorTexts.forEach((text) => text.remove());
}
form.addEventListener("submit", function (e) {
  e.preventDefault();
  addTach();
});
document.addEventListener("DOMContentLoaded", function () {
  LocalStoragetacheform();
});
