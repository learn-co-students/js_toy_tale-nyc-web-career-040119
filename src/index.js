const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyName = document.querySelector('#toy-name')
const toyImg = document.querySelector('#toy-image')
const toyCards = document.querySelector('#toy-collection')
let addToy = false


// YOUR CODE HERE
fetch("http://localhost:3000/toys")
  .then(resp=>resp.json())
  .then(function(toys) {
    toys.forEach(function(toy) {
      toyCards.innerHTML += `
        <div class="card">
          <h2>${toy.name}</h2>
          <img src=${toy.image} class="toy-avatar"/>
          <p id="l${toy.id}">${toy.likes} Likes</p>
          <button class="like-btn" id="${toy.id}">Like <3</button>
        </div>
      `
    })
  })

toyForm.addEventListener('submit', function(e) {
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers:
    {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },

    body: JSON.stringify(
    {
      "name": `${toyName.value}`,
      "image": `${toyImg.value}`,
      "likes": 0
    })
  })
})

toyCards.addEventListener('click',function(e) {
  fetch(`http://localhost:3000/toys/${e.target.id}`)
    .then(resp=>resp.json())
    .then(function(toy) {
      fetch(`http://localhost:3000/toys/${e.target.id}`, {
        method: "PATCH",
        headers:
        {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },

        body: JSON.stringify(
          {
            "likes": ++toy.likes
          })
      })
      const myLikes = document.querySelector(`#l${toy.id}`)
      myLikes.innerText = `${toy.likes} Likes`
    })
})

// OR HERE!







addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})
