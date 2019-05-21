const addBtn = document.querySelector('#new-toy-btn');
const toyForm = document.querySelector('.container');
let addToy = false;



// storing url to make a get request
const allToys = 'http://localhost:3000/toys';
//selecting html div by id and storing it into constant to manipulation
const toyColl = document.querySelector('#toy-collection');
// console.log(toyColl);
const toyName = document.querySelector('#toy-name');
// console.log(toyName);
const toyImage = document.querySelector('#toy-image');
// console.log(toyImage);

// console.log(toyName.value);

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy;
  if (addToy)
  {
    toyForm.style.display = 'block';
    // submit listener here
    const realForm = document.querySelector('.add-toy-form');
    // console.log(realForm);
    realForm.addEventListener('submit', function(e){
      e.preventDefault();
      // console.log("U SUBMITTD YAY");

      fetch(allToys, { method: "POST",
      headers:
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },

      body: JSON.stringify(
        {
          "name": toyName.value,
          "image": toyImage.value,
          "likes": 0
        }
      )
    })
      .then(r => r.json())
      // .then(newToy => console.log(newToy));
      .then(newToy => {
        toyColl.innerHTML += `
        <div class="card">
          <h2>${newToy.name}</h2>
          <img src=${newToy.image} class="toy-avatar" />
          <p>${newToy.likes} </p>
          <button id="${newToy.id}" class="like-btn">Like <3</button>
        </div>
        `;

    });

  });

  } else {
    toyForm.style.display = 'none';
  }
});


// OR HERE!

// fetch to get all the data for toys and....
fetch(allToys, { method: "GET"
})
  .then(response => response.json())
  // .then(toys => console.log(toys)); //displays an array of toy object
  .then(toys => {
    toys.forEach(function(toy) {
      // console.log(toy);
      // ...then append to the DOM
      toyColl.innerHTML += `
                          <div class="card">
                            <h2>${toy.name}</h2>
                            <img src=${toy.image} class="toy-avatar" />
                            <p>${toy.likes} </p>
                            <button id="${toy.id}" class="like-btn">Like <3</button>
                          </div>
                         `;
  });
});
  toyColl.addEventListener('click', function(e){
    // console.log(e.target);
    console.log(e.target);
    let clickedToyID = e.target.id;

    fetch();
});
