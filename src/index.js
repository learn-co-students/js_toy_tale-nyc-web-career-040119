const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE
function tagSelector (tag) {
  return document.querySelector(tag)
}

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  const toyName = tagSelector('#toy-name')
  const toyImg = tagSelector('#toy-img')
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    toyForm.addEventListener('submit', function () {
      fetch('http://localhost:3000/toys', {
        method: "POST",
        headers:
        {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(
        {
          "name": `${toyName.value}`,
          "image": `${toyImg.value}`,
          "likes": 0
        })

    })
    .then (function (respond){
      return respond.json();
    })
    .then (function (toys) {
      toys.forEach( function (toy) {
        const toyCollector = tagSelector('#toy-collection')
        toyCollector.innerHTML += `<div class="card">
          <h2>${toy.name}</h2>
          <img src='${toy.image}' class="toy-avatar" />
          <p>4 ${toy.likes} </p>
          <button class="like-btn">Like <3</button>
        </div>`
      })
      })
    })
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})

//like button event setup
// OR HERE!
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
