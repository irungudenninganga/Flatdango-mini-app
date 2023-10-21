//initialize an array globaly and copy the array in db to a new array using spread operator
let filmsArr=[]
// to make the web not interactive  an event listner is added "Domcontentloaded"
document.addEventListener('DOMContentLoaded',()=>{
    getElements(filmsArr)
})

// this is a get request made to the db
function getElements(filmsArr){
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
        <li class="dropdown-item" >Premium Movies</li>
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


  const cards = document.getElementById('cards');

filmsArr.forEach(card => {
  //In this code, we create a new card element for each movie and attach the "Buy Ticket"
  const cardElement = document.createElement('div');
  const availableTickets = card.capacity - card.tickets_sold;
  
  cardElement.innerHTML = `
    <div class="card" style="width: 18rem;">
      <img src="${card.poster}" class="card-img-top" alt="movie's image">
      <div class="card-body">
        <h5 class="card-title">${card.title}</h5>
        <p class="card-text">${card.description}</p>
        <p class="card-text">Run Time: ${card.runtime}</p>
        <p class="card-text">Show Time: ${card.showtime}</p>
        <p class="card-text">Capacity: ${card.capacity}</p>
        <p class="card-text">Available Tickets: ${card.capacity - card.tickets_sold}</p>
      </div>
      <button class="buy" class="card-text">Buy Ticket</button>
    </div>
  `;
  

  const buyBtn = cardElement.querySelector('.buy');
// button's click event listener to that specific card.
  buyBtn.addEventListener("click", () => {
    // Modify the card's content when the button is clicked
  // if (availableTickets>0){
    fetch(`http://localhost:3000/films/${card.id}`, {
      method: "PATCH",
      headers:{
        "content-Type": "application/json",
        "Accept": "application/json"
      },
      body:JSON.stringify({
        tickets_sold:card.tickets_sold+1
      })
    })
    
    
   //} else if(availableTickets===0) {
    //buyBtn.textContent= "Sold out"
    
   //}
    

  });
//the card is appended to the DOM
  cards.appendChild(cardElement);
});


};

