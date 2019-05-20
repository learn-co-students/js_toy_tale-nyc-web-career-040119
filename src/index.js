const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // Step 4: Add a new toy
    const toyName = document.querySelector("#toy-name")
    const toyImage = document.querySelector("#toy-image")
    toyForm.addEventListener('submit', (e) => {
      e.preventDefault()
      fetch('http://localhost:3000/toys', {
        method: "POST",
        headers:
        {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(
          {
            "name": toyName.value,
            "image": toyImage.value,
            "likes": 0
          }
        )
      })
      .then(function(response) {
        return response.json()
      })
      .then(function(toy) {
        const toyCollection = document.querySelector('#toy-collection')
        toyCollection.innerHTML += `
        <div class="card" id="${toy.id}">
          <h2>${toy.name}</h2>
          <img src=${toy.image} class="toy-avatar" />
          <p>${toy.likes} Likes </p>
          <button class="like-btn" id="b${toy.id}">Like <3</button>
        </div>
        `
      })
    })
  } else {
    toyForm.style.display = 'none'
  }
})

// Step 3: Add toy info to the card
fetch('http://localhost:3000/toys')
.then(function(response) {
  return response.json()
})
.then(function(toys) {
  const toyCollection = document.querySelector('#toy-collection')
  toys.forEach(function(toy) {
    toyCollection.innerHTML += `
    <div class="card" id="${toy.id}">
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p>${toy.likes} Likes </p>
      <button class="like-btn" id="b${toy.id}">Like <3</button>
    </div>
    `
  })
})

// Step 5: Increase toy's likes
fetch('http://localhost:3000/toys')
.then(function(response) {
  return response.json()
})
.then(function(toys) {
  toys.forEach(function(toy) {
    const likeButton = document.querySelector(`#b${toy.id}`)
    const toyCard = document.getElementById(toy.id)
    likeButton.addEventListener('click', function() {
      fetch(`http://localhost:3000/toys/${toy.id}`, {
        method: "PATCH",
        headers:
        {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(
          {
            "likes": ++toy.likes
          }
        )
      })
      .then(function(response) {
        return response.json()
      })
      .then(function(toyLiked) {
        const pTag = toyCard.querySelector("p")
        pTag.innerText = `${toyLiked.likes} Likes `
      })
    })
  })
})
