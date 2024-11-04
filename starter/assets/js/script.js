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
    const modifieId = form.getAttribute('data-edit-id');
    if (modifieId) {
        modifieTache(Number(modifieId));
    } else {
        const taches = {
            id: Date.now(),
            Title: Title.value.trim(),
            Type: document.querySelector('input[name="task-type"]:checked')?.value || "",
            Priority: Priority.value.trim(),
            Status: Status.value.trim(),
            Dateform: Dateform.value.trim(),
            Description: Description.value.trim()
        };
        tachesList.push(taches);
        AfficherTach(taches);
    }
    form.reset();
    form.removeAttribute('data-edit-id');
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
                <button class="edit-button" onclick="opentacheModifier(${taches.id})">Modifier</button>
                <button class="delete-button" onclick="supprimerTache(${taches.id})">Supprimer</button>
            </div>
        </div>
    `;
    colonne.appendChild(tacheElement);
}

function opentacheModifier(id) {
    const taches = tachesList.find(t => t.id === id);
    if (!taches) return;

    Title.value = taches.Title;
    document.querySelector(`input[name="task-type"][value="${taches.Type}"]`).checked = true;
    Priority.value = taches.Priority;
    Status.value = taches.Status;
    Dateform.value = taches.Dateform;
    Description.value = taches.Description;
    form.setAttribute('data-edit-id', id);
    document.querySelector("#modal-task").classList.add("active");
}

function modifieTache(id) {
    const tacheIndex = tachesList.findIndex(t => t.id === id);
    if (tacheIndex === -1) return;

    tachesList[tacheIndex] = {
        ...tachesList[tacheIndex],
        Title: Title.value.trim(),
        Type: document.querySelector('input[name="task-type"]:checked').value,
        Priority: Priority.value.trim(),
        Status: Status.value.trim(),
        Dateform: Dateform.value.trim(),
        Description: Description.value.trim()
    };
    tacheRefrech();
    form.reset();
    form.removeAttribute('data-edit-id');
    document.querySelector("#modal-task").classList.remove("active");
}

function tacheRefrech() {
    const colonne = document.getElementById('to-do-tasks');
    colonne.innerHTML = "";
    tachesList.forEach(AfficherTach);
}

function supprimerTache(id) {
    tachesList = tachesList.filter(t => t.id !== id);
    tacheRefrech();
}

form.addEventListener('submit', function (e) {
    e.preventDefault();
    addTach();
});
