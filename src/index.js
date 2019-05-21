const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    toyForm.addEventListener('submit', (event) => {
      event.preventDefault(event);
      const nameInput = toyForm.querySelector('#form-name-input.input-text')
      const imageInput = toyForm.querySelector('#form-image-input.input-text')
      fetch('http://localhost:3000/toys', {
        method: 'POST',
        headers:
          {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            "name": nameInput.value,
            "image": imageInput.value,
            "likes": 0
          })
        })
        .then(function(response){
          return response.json()
        })
        .then(function(toy){
        toysContainer.innerHTML =+ `
        <div class="card">
          <h2>${toy.name}</h2>
          <img src="${toy.image}" class="toy-avatar" />
          <p>${toy.likes} Likes </p>
          <button class="like-btn" id="${toy.id}">Like <3</button>
        </div>
        `
      })
      return newToy;
    })
  } else {
    toyForm.style.display = 'none'
  }
})

const toysContainer = document.querySelector('#toy-collection')


fetch('http://localhost:3000/toys', {method: 'GET'})
.then(function(response){
  return response.json();
})
.then(function(toysObj){
  console.log(toysObj)
  toysObj.forEach(function(toy){
    toysContainer.innerHTML += `
    <div class="card">
      <h2>${toy.name}</h2>
      <img src="${toy.image}" class="toy-avatar" />
      <p>${toy.likes} Likes </p>
      <button class="like-btn" id="${toy.id}">Like <3</button>
    </div>
    `
  })
  })

  toysContainer.addEventListener('click', function(event){
    let targetEvent = event.target

    let targetId = parseInt(event.target.id)
    let pTag = targetEvent.previousElementSibling
    let numLikes = parseInt(pTag.innerText[0])
    pTag.innerText = `${numLikes + 1} Likes`
    fetch(`http://localhost:3000/toys/${targetId}`, {
                              method:"PATCH",
                              headers: {
                                "Content-Type":"application/json",
                                Accept: "application/json"
                              },
                              body: JSON.stringify({
                                "likes": ++numLikes
                              })
                            }).then(pTag.innerText)


    })

// OR HERE!
