const addBtn = document.querySelector('#new-toy-btn');
const toyForm = document.querySelector('.container');
const toyCollection = document.querySelector('#toy-collection');
let addToy = false


// RENDERING TOY CARDS
fetch('http://localhost:3000/toys')
  .then(function(resp){
    return resp.json();
  })
  .then(function(toys){
    console.log(toys);

  for(let toy of toys){
    toyCollection.innerHTML +=`
    <div  class='card'>
      <h2>${toy.name}</h2>
      <img src=${toy.image} style="width:100%;max-height: 230px">
      <p id="like">${toy.likes} Likes</p>
      <button id=${toy.id} class="like-btn">Like <3</button>
    </div>`
  };


  // LIKE TOY BUTTON
  toyCollection.addEventListener("click", function(e){
    const likeBtn = e.target
    console.log(likeBtn)
    const like = likeBtn.previousElementSibling;
    let likeNum = parseInt(like.innerText);
    likeNum += 1;
    like.innerText = `${likeNum} Likes`
    // debugger
    fetch(`http://localhost:3000/toys/${likeBtn.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({"likes": `${likeNum}`})
    });
  }); // ENDING LIKE BUTTON
}); // ENDING GET FETCH



// ADD TOY BUTTON
addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
    const createForm = document.querySelector("form");
    const createBtn = document.querySelector("#createBtn");
    const name = document.querySelector("#name");
    const image = document.querySelector("#image");

    createForm.addEventListener("submit", function(e){
      e.preventDefault();

      fetch('http://localhost:3000/toys', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          "name": name.value,
          "image": image.value,
          "likes": 0
        })
      })
      .then(function(resp){
        return resp.json();
      })
      .then(function(json){
        console.log(json);

      toyCollection.innerHTML +=`
        <div class='card'>
          <h2>${json.name}<h2>
          <img src=${json.image} style="width:100%;max-height: 230px">
          <p>0 Likes</p>
          <button id=${json.id} class="like-btn">Like <3</button>
        </div>`
      })
    }) // ENDING OF CREATE BTN EVENT LISTENER
  } else {
    toyForm.style.display = 'none'
  }
})
