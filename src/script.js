// to make the web not interactive  an event listner is added "Domcontentloaded"
document.addEventListener('DOMContentLoaded',()=>{
    getElements()
})

// this is a get request made to the db
function getElements(){
    fetch('http://localhost:3001/films')
        .then(res => res.json())
        .then(data => console.log(data))

}