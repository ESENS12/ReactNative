
const title = document.querySelector("#title");    

function handleClick(){
    console.log('click');
    console.log(title);
}

title.addEventListener("click",handleClick);


