const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

const toyCol = document.querySelector('#toy-collection')
const form = document.querySelector('#toy-form')
const name = document.querySelector('#toy-name')
const image = document.querySelector('#toy-img')
const btn = document.querySelector('.like-btn')



renderToys = () => {
  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(data => {
    console.log(data)
    data.forEach(toy => {
      toyCol.innerHTML += `
        <div class="card">
        <h2>${toy.name}</h2>
        <img src=${toy.image} class="toy-avatar" />
        <p>${toy.likes} Likes </p>
        <button id=${toy.id} class="like-btn">Like <3</button>
        </div>
      `
    })
  })
}
renderToys()


createNewToy = () => {
  form.addEventListener("submit", e => {
    e.preventDefault()

    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers:
        {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
      body: JSON.stringify({
        "name": name.value,
        "image": image.value,
        "likes": 0
      })
    })
    .then(res => res.json())
    .then(data => {
      toyCol.innerHTML += `
        <div class="card">
        <h2>${data.name}</h2>
        <img src=${data.image} class="toy-avatar" />
        <p>${data.likes} Likes </p>
        <button id=${data.id} class="like-btn">Like <3</button>
        </div>
      `
    })
  })
}
createNewToy()


updateLikes = () => {
  toyCol.addEventListener('click', e => {
    // console.log(e.target.id)
    let toyId = e.target.id
    let like = e.target.previousElementSibling
    let likeNum = parseInt(like.innerHTML)

    if (e.target.className === 'like-btn') {
      likeNum++
      like.innerHTML = `
        ${likeNum} Likes
      `
    }

    fetch(`http://localhost:3000/toys/${toyId}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "likes": likeNum++
      })

    })

  })
}
updateLikes()


// YOUR CODE HERE
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


// OR HERE!
