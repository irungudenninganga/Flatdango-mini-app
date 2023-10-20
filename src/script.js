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
            
            displayDropDown(filmsArr)
            displayCards(filmsArr)
        
        
        })
        
        
}
// displayDropDown() is used to display the movies available 
function displayDropDown(filmsArr){
    console.log(filmsArr)
    const dropDown=document.getElementById('drop-down-movies')
    //the innerHtml part is from the bootsrap an apply the styling 
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
// this event listner is used to display each movie when a click is made it display's all movies    
const btn=document.querySelector('#li')
btn.addEventListener('click', ()=> {
  filmsArr.forEach( title => dropDown.innerHTML+=` <span><li class="movie-name">${title.title}</li> </span><br> <br> `

  )
})
  
}  
// this displayCards() is used to display each movie 
function displayCards(filmsArr){
  // console.log(filmsArr)
  // the grab hold of the location to store the new elements 
  let cards=document.getElementById('cards')
  // a loop over the array and create each card with this details below
  filmsArr.forEach( card => {
    cards.innerHTML+= `
    <div class="card" style="width: 18rem;">
    <img src="${card.poster}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
  </div>
    `
  })
}
