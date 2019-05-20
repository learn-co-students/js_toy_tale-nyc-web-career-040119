const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
    toyForm.addEventListener("submit",function(event){
      event.preventDefault();
      const nameInput = document.querySelector("#name-input")
      const imageInput = document.querySelector("#image-input")


      fetch("http://localhost:3000/toys",
      {
        method: "POST",
        headers:{
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body:JSON.stringify({
          name: `${nameInput.value}`,
          image: `${imageInput.value}`,
          likes: '0'
        })
      }).then(function(resp){
        return resp.json()
      }).then(function(toy){
        const toyCollection = document.querySelector("#toy-collection")

        const eachToy = document.createElement('div')

        eachToy.className = "card"
        toyCollection.appendChild(eachToy)
        eachToy.innerHTML = `
        <h2>${toy.name}</h2>
        <img src="${toy.image}" class="toy-avatar"/>
        <p>${toy.likes} Likes</p>
        <button class="like-btn">Like <3</button>
        `
        const likeButton = eachToy.querySelector("button")

        const likesDisplay = eachToy.querySelector("p")


        likeButton.addEventListener("click",function(event){

          fetch(`http://localhost:3000/toys/${toy.id}`,{
            method:"PATCH",
            headers:{
              "Content-Type": "application/json",
              Accept: "application/json"
            },
            body:JSON.stringify({
              likes: ++toy.likes
            })
          }).then(function(resp){
            return resp.json();
          }).then(function(toy){
            likesDisplay.innerText = `${toy.likes} Likes`
          })

        })// end of like button event listener
      })
    })// end of submit event listener
  } else {
    toyForm.style.display = 'none'
  }
})


// OR HERE!

fetch('http://localhost:3000/toys').then(function(resp){
  return resp.json()
}).then(function(toys){
  const toyCollection = document.querySelector("#toy-collection")

  toys.forEach(function(toy){
    const eachToy = document.createElement('div')

    eachToy.className = "card"
    toyCollection.appendChild(eachToy)
    eachToy.innerHTML = `
    <h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar"/>
    <p id="${toy.id}-likes">${toy.likes} Likes</p>
    <button id="like-btn-${toy.id}" class="like-btn">Like <3</button>
    `

    const likeButton = eachToy.querySelector("button")

    const likesDisplay = eachToy.querySelector("p")


    likeButton.addEventListener("click",function(event){
      fetch(`http://localhost:3000/toys/${toy.id}`,{
        method:"PATCH",
        headers:{
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body:JSON.stringify({
          likes: ++toy.likes
        })
      }).then(function(resp){
        return resp.json();
      }).then(function(toy){
        likesDisplay.innerText = `${toy.likes} Likes`
      })

    })// end of like button event listener
  })//end of toys for each

})//fetch for toys



