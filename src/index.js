// VARIABLES
const addBtn = document.querySelector('#new-toy-btn')
const toyFormContainer = document.querySelector('.container')
let addToy = false

const TOYS_URL = `http://localhost:3000/toys`
const toyContainer = document.querySelector("#toy-collection")
const toyForm = document.querySelector(".add-toy-form")
// end VARIABLES

// STARTER CODE
addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyFormContainer.style.display = 'block'
    // submit listener here
  } else {
    toyFormContainer.style.display = 'none'
  }
})
// end STARTER CODE

// READ
fetch(TOYS_URL)
  .then(resp => resp.json())
  .then(toys => {
    toys.forEach(toy => {
      addToyHelper(toy.id, toy.name, toy.image, toy.likes)
    })
  })
// end FETCH

// CREATE
toyForm.addEventListener("submit", event => {
  event.preventDefault()

  // variables
  const addToyName = document.querySelector("input[name='name']").value
  const addToyImage = document.querySelector("input[name='image']").value
  // end variables

  // POST REQUEST
  fetch(TOYS_URL, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "name": `${addToyName}`,
      "image": `${addToyImage}`,
      "likes": 0
    })
  })
    .then(response => response.json())
    .then(newToy => {
      addToyHelper(newToy.id, newToy.name, newToy.image, newToy.likes)
    })
  // end POST REQUEST

  toyForm.reset()
})

// UPDATE

// listen for a button click
// click and patch

// fetch(TOYS_URL + `/${id}`, {
//   method: 'PATCH',
//   headers: {
//     "Content-Type": "application/json",
//     Accept: "application/json"
//   },
//   body: {
//     "likes": +=1
//   }
// })


// HELPER FUNCTIONS
function addToyHelper(id, name, image, likes){
  toyContainer.innerHTML += `
  <div class="card" id="${id}">
    <h2>${name}</h2>
    <img src=${image} class="toy-avatar" />
    <p>${likes} Likes </p>
    <button class="like-btn" id="${id}">Like <3</button>
  </div>
  `
}
// end HELPER FUNCTIONS
