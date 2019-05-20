const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE
fetch("http://localhost:3000/toys")
  .then(function(res){
    return res.json()
  })
  .then(function(toys){
    const toyCollection = document.querySelector("#toy-collection")
    // console.log(toyCollection)
    const show = function(toy){
      const toyCard = document.createElement("div")
      toyCard.className = "card"

      const toyName = document.createElement("h2")
      toyName.innerText = toy.name
      toyCard.appendChild(toyName)

      const toyImg = document.createElement("img")
      toyImg.className = "toy-avatar"
      toyImg.src = toy.image
      toyCard.appendChild(toyImg)

      const toyLikes = document.createElement("p")
      toyLikes.innerText = `${toy.likes} Likes`
      toyCard.appendChild(toyLikes)

      const likeBtn = document.createElement("button")
      likeBtn.className = "like-btn"
      likeBtn.innerText = "Like <3"

      likeBtn.addEventListener("click",function(){
        toy.likes ++
        toyLikes.innerText = `${toy.likes} Likes`
        fetch(`http://localhost:3000/toys/${toy.id}`,{
          method: "PATCH",
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({likes: toy.likes})
        })

      })

      toyCard.appendChild(likeBtn)
      toyCollection.appendChild(toyCard)
    }
    toys.forEach(show)




    addBtn.addEventListener('click', () => {
      // hide & seek with the form
      addToy = !addToy
      if (addToy) {
        toyForm.style.display = 'block'
        const newForm = document.querySelector("#toy-form")
        // submit listener here
        newForm.addEventListener("submit",function(e){
          e.preventDefault()
          // const toyCollection = document.querySelector("#toy-collection")
          const newToyName = document.querySelector("#new-name")
          const newToyImg = document.querySelector("#new-image")
          const newToyObj = {name: newToyName.value , image: newToyImg.value, likes: 0 }

          fetch("http://localhost:3000/toys", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
          },
          body: JSON.stringify(newToyObj)
          })
          .then(function(res){
            return res.json()
          })
          .then(function(toy){
            show(toy)
          })

        })

      } else {
        toyForm.style.display = 'none'
      }
    })

})

// OR HERE!
