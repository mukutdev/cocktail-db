// https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic  == non-Alcoholic
// https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Optional_alcohol  == optional-alcoholic
// https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic == Alcoholic
// https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita == search by name

//  project overview:
/*
1) select drinking type  alcoholic || non-alcoholic || Occasional-alcoholic
2) show result based on drinking type & hide drinking type section
3) every drinks have a details button when use clicked then the details should be appeared on a modal
4) implement search functionality with enter key press when search is enabled only show search results hide others
 That's Cheers !
 
*/

// variables

const alcoholicBtn = document.getElementById("alcoholic")
const nonAlcoholicBtn = document.getElementById("non-alcoholic")
const drinksContainer = document.getElementById("drinks-container")
const loadDataBtn = document.querySelectorAll('.loadDataBtn')
const preferenceText = document.getElementById('preference')
const searchResultTag = document.getElementById('search-result')

// load alcoholic information
const loadDrinksData =  async (id) => {
     const url =  `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${id}`
     const res = await fetch(url)
     const data = await res.json()
    //  console.log(data.drinks);
     displayData(data.drinks)
}

// displayData all drinks data according to preference

const displayData =  (alcoholData) =>{
   drinksContainer.innerHTML = '';
   alcoholData.forEach(drinks => {
    const {strDrink , strDrinkThumb , idDrink} = drinks
    const createDiv = document.createElement('div')
    createDiv.classList.add('card', 'card-compact' ,'w-96' , 'bg-base-100' ,'shadow-xl')
    createDiv.innerHTML = `
      <figure><img src="${strDrinkThumb}" alt="" /></figure>
      <div class="card-body">
      <h2 class="card-title">${strDrink}</h2>
      <div class="card-actions">
        <button class="btn btn-primary"> See Details </button>
      </div>
    </div>
    `
    drinksContainer.appendChild(createDiv)
   })

}


// passing button id to load function
for(const btn of loadDataBtn){
    btn.addEventListener("click", (e)=>{
      const selectPrefText = e.target.parentNode.parentNode.children[0].innerText
      console.log(selectPrefText);
      searchResultTag.classList.remove('hidden')
        loadDrinksData(e.target.id)
        preferenceText.innerText = selectPrefText
    })
}