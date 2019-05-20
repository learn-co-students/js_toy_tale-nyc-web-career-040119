const TOYS_URL = "http://localhost:3000/toys"
// Add Toy Form Variables
const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyName = document.querySelector('#toy-name')
const toyImg = document.querySelector('#toy-image')
let addToy = false
// Holds All Toy Cards
const toyCards = document.querySelector('#toy-collection')

// Load All Toys On Front Page
fetch("http://localhost:3000/toys")
  .then(resp=>resp.json())
  .then(function(toys) {
    toys.forEach(function(toy) {
      toyCards.innerHTML += `
        <div class="card">
          <h2>${toy.name}</h2>
          <img src=${toy.image} class="toy-avatar"/>
          <p>${toy.likes} Likes</p>
          <button class="like-btn" id="${toy.id}">Like <3</button>
        </div>
      `
    })
  })
// Add New Toy
addBtn.addEventListener('click', () => {
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    toyForm.addEventListener('submit', e => {
      fetFunc(TOYS_URL, "POST", {"name": `${toyName.value}`, "image": `${toyImg.value}`, "likes": 0})
    })
  } else {
    toyForm.style.display = 'none'
  }
})

// Add Likes to Toy
toyCards.addEventListener('click',function(e) {
  let toyID = e.target.id
  let likesStr = e.target.previousElementSibling
  let likeNum = parseInt(likesStr.innerText)
  likesStr.innerText = `${++likeNum} Likes`
  fetFunc(TOYS_URL + `/${toyID}`, "PATCH", {"likes": likeNum})
})

// Helper Method For Fetching
function fetFunc(url,method,body) {
  fetch(url, {
    method: method,
    headers:
      {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
    body: JSON.stringify(body)
  })
}
