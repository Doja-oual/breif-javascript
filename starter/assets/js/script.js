document.querySelector(".ms-auto").addEventListener("click",function(){
    document.querySelector("#modal-task").classList.add("active");
});
document.querySelector(".btn-close").addEventListener("click",function(){
    document.querySelector("#modal-task").classList.remove("active");
});
const form = document.getElementsById('task-id');
const Title = document.getElementById('task-title');
const Type = document.getElementById('Type-form');
const Priority = document.getElementById('task-priority');
const Status = document.getElementById('task-status');
const Dateform = document.getElementById('task-date');
const Description = document.getElementById('task-description');



form.addEventListener('submit',e => {
    e.preventDefault();

    validateInputes();
});
 const setError =(element, message) =>{
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error')
    
    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
 };

 const setSuccess =element=>{
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error')
    
    errorDisplay.innerText = message;
    inputControl.classList.add('success');
    inputControl.classList.remove('error')
 };


const validateInputes= () => {
    const TitleValue =Title.value.trim();
    const TypeValue =Type.value.trim();
    const PriorityValue =Priority.value.trim();
    const StatusValue =Status.value.trim();
    const DateformValue = Dateform.value.trim();
    const DescriptionValue = Description.value.trim();

    if(TitleValue === ''){
        setError(Title,'Le titre est obligatoire');
    }else{
        setSuccess(Title);

    }

 if (TypeValue === '') {
        setError(Type, 'Le type est obligatoire');
    } else {
        setSuccess(Type);
    }

    if (PriorityValue === '') {
        setError(Priority, 'La priorité est obligatoire');
    } else {
        setSuccess(Priority);
    }

    if (StatusValue === '') {
        setError(Status, 'Le statut est obligatoire');
    } else {
        setSuccess(Status);
    }

    if (DateformValue === '') {
        setError(Dateform, 'La date est obligatoire');
    } else if (isNaN(Date.parse(DateformValue))) {
        setError(Dateform, 'Veuillez entrer une date valide');
    } else {
        setSuccess(Dateform);
    }

    if (DescriptionValue === '') {
        setError(Description, 'La description est obligatoire');
    } else if (DescriptionValue.length < 10) {
        setError(Description, 'La description doit contenir au moins 10 caractères');
    } else {
        setSuccess(Description);
    }



}