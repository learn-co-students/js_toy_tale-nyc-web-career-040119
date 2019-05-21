


const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
const toyCollector = document.querySelector('#toy-collection')
const allToys = "http://localhost:3000/toys"
const toyName = document.querySelector('#toy-name')
const toyImg = document.querySelector('#toy-img')


addBtn.addEventListener('click', function () {
  addToy = !addToy
  if (addToy){
    toyForm.style.display = 'block';
    //if addting a toy return true the following action happens
    const realForm = document.querySelector('.add-toy-form')
    realForm.addEventListener('submit', function (e) {
      e.preventDefault()
        fetch(allToys, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            "name": toyName.value,
            "image": toyImg.value,
            "likes": 0
          })
        })
        .then (respond => respond.json())
        .then ( toy => {
          toyCollector.innerHTML += `<div class="card">
            <h2>${toy.name}</h2>
            <img src='${toy.image}' class="toy-avatar" />
            <p>4 ${toy.likes} </p>
            <button id='${toy.id}' class="like-btn">Like <3</button>
          </div>`
        })
    })
  }else {
    toyForm.style.display = 'none';
  }
})

//fetching and rendering
fetch(allToys, {method: "GET"})
.then (respond => respond.json())
.then (toys => {
  toys.forEach(function(toy) {
  toyCollector.innerHTML += `<div class="card">
    <h2>${toy.name}</h2>
    <img src='${toy.image}' class="toy-avatar" />
    <p>4 ${toy.likes} </p>
    <button id='${toy.id}' class="like-btn">Like <3</button>
  </div>`
  })
})

//adding like button by puting on the parent node
toyCollector.addEventListener('click', function () {
  let clickToyId = e.target.id
  let pTag = e.taget.previousElementSibling
  let likeNum = parseInt(ptag.innerText)
  // pTag.innerText = `${likeNum + 1} likes` pasmisticly

  fetch(`http://localhost:3000/toys/${clickToyId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
        body: JSON.stringify(
        {
          "likes": likeNum++;
        })
    }
  )
  .then(pTag.innerText = `${likeNum} Likes`)
})
