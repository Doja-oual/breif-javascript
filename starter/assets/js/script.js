document.querySelector(".ms-auto").addEventListener("click",function(){
    document.querySelector("#modal-task").classList.add("active");
});
document.querySelector(".btn-close").addEventListener("click",function(){
    document.querySelector("#modal-task").classList.remove("active");
});
const 