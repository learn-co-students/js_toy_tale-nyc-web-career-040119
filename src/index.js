const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

const toyContainer = document.querySelector("#toy-collection");
const newToyForm = document.querySelector(".add-toy-form");
const newToyName = document.querySelector("#toy-name");
const newToyImg = document.querySelector("#toy-img");

fetch('http://localhost:3000/toys')
  .then(function(response){
    return response.json();
  })
  .then(function(toys){
    console.log(toys);

    toys.forEach(function(toy){
      toyContainer.innerHTML += `
      <div class="card">
        <h2>${toy.name}</h2>
        <img src=${toy.image} class="toy-avatar" />
        <p>${toy.likes} Likes </p>
        <button id=${toy.id} class="like-btn">Like <3</button>
      </div>
      `
    }); // END OF ALL TOY ITERATION
  }); // END OF GET TOYS FETCH


addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'

    newToyForm.addEventListener('submit', function(e){
      e.preventDefault();

      fetch('http://localhost:3000/toys', {
        method: "POST",
        headers:
        {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
            "name": newToyName.value,
            "image": newToyImg.value,
            "likes": 0
          })
      })
      .then(function(res){
        return res.json();
      })
      .then(function(newToy){
        console.log(newToy);

        // RENDER NEW TOY
        toyContainer.innerHTML += `
          <div class="card">
            <h2>${newToy.name}</h2>
            <img src=${newToy.image} class="toy-avatar" />
            <p>${newToy.likes} Likes </p>
            <button id=${newToy.id} class="like-btn">Like <3</button>
          </div>
        `

      }); // END OF POST NEW TOY FETCH
    }) // END OF FORM SUBMIT
  } else {
    toyForm.style.display = 'none'
  }
})


// LIKE BTN
toyContainer.addEventListener("click", function(e){
  let theToyId = e.target.id;
  let like = e.target.previousElementSibling;
  let likeNum = parseInt(like.innerText);

  if (e.target.className === "like-btn") {

    // likeNum = likeNum + 1
    likeNum++;

    like.innerText = `
    ${likeNum} Likes
    `
  }


  fetch(`http://localhost:3000/toys/${theToyId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      // update likeNum + 1
      "likes": likeNum++
    })
  }); // END OF PATCH LIKE FETCH

}); // END OF LIKE BTN
