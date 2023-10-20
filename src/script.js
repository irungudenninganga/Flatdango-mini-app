//initialize an array globaly and copy the array in db to a new array using spread operator
let filmsArr=[]
// to make the web not interactive  an event listner is added "Domcontentloaded"
document.addEventListener('DOMContentLoaded',()=>{
    getElements()
})

// this is a get request made to the db
function getElements(){
    fetch('http://localhost:3000/films')
        .then(res => res.json())
        .then(data => {
            filmsArr=[...data]
            //console.log(filmsArr)
            displayDropDown(filmsArr)
        
        
        })
        //console.log(filmsArr)
        
}

function displayDropDown(filmsArr){
    console.log(filmsArr)
    const dropDown=document.getElementById('drop-down-movies')
    dropDown.innerHTML+=`
    <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Available Movies
  </button> <br> 
  <ul class="dropdown-menu dropdown-menu-dark">
    <li id="li" class="dropdown-item active" >Top Play</li>
    <li class="dropdown-item" >Another action</li>
    
  </ul>
</div>  <br>
    `
const btn=document.querySelector('#li')
btn.addEventListener('click', ()=> {
  filmsArr.forEach( title => {
    dropDown.innerHTML+=`
      
    <span><li class="movie-name">${title.title}</li> </span><br> <br>
    `
  })
})
  
}   
