const grab = (selector) => document.querySelector(selector);

const addBtn = grab('#new-toy-btn');
const toyFormContainer = grab('.container');
let addToy = false

const toyCollection = grab("#toy-collection");

const createToy = (toyObj) => {
  const newToy = document.createElement("div");

  newToy.className = "card";
  newToy.id = `toy-${toyObj.id}`;
  newToy.style.height = "auto";

  newToy.innerHTML = `
    <h1>${toyObj.name}</h1>
    <img width="100%" height="200px" src="${toyObj.image}">
    <h4>Likes: ${toyObj.likes}</h4>
    <br>
    <button height="100%" id="toy-${toyObj.id}-likes">👍</button>
  `;

  toyCollection.appendChild(newToy);

  const likeButton = grab(`#toy-${toyObj.id} button`);

  likeButton.addEventListener("click", (e) => {

    fetch(`http://localhost:3000/toys/${toyObj.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({likes: toyObj.likes += 1})
    })
      .then(resp => resp.json())
      .then(updatedToy => {
        const likes = newToy.querySelector("h4");
        likes.innerText = `Likes: ${updatedToy.likes}`
    });
  });
};



// LOAD FROM /toys ////////////////////
fetch("http://localhost:3000/toys", {method: "GET"})
  .then(resp => resp.json())
  .then(toysArr => {
      for (const toyObj of toysArr) { // BEGIN for //////////
        createToy(toyObj);
      } // END for //////////
});


// NEW TOY ////////////////////
addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyFormContainer.style.display = 'block'
    // submit listener here
  } else {
    toyFormContainer.style.display = 'none'
  }
})

const toyForm = grab(".add-toy-form");

toyForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = toyForm.querySelector('[name="name"]').value;
  const image = toyForm.querySelector('[name="image"]').value;

  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({name: name, image: image, likes: 0})
  })
    .then(resp => resp.json())
    .then(addThisToy => {
        createToy(addThisToy);
        toyForm.reset();
  });
});
