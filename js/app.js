const url = "https://jsonplaceholder.typicode.com/posts";

const postList = document.getElementById("row");
const addPost = document.getElementById("input-form");
const titleValue = document.getElementById("input-title");
const bodyValue = document.getElementById("input-body");
const btnSubmit = document.getElementById("submit-button");

const btnShare = document.getElementById("display-post");
const blanket = document.querySelector(".input-post");
const closure = document.getElementById("post-close");

const titleEditValue = document.getElementById("edit-title");
const bodyEditValue = document.getElementById("edit-body");
const btnEdit = document.getElementById("edit-button");
const duvet = document.querySelector(".edit-post");
const closeEdit = document.getElementById("close-edit");

let image = "img/comely.jpg"

let posts = [];

//get post
function getPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json())
        .then((data) => {
            posts = data.slice(0,9)
            let outPut = '';
            posts.forEach(post => {
                outPut +=  `  <div class="col-lg-4 col-md-6 mt-4">
                <div class="card h-100">
                    <div class="ps-3 pt-3">
                       <div class="profile-pic w-25">
                          <img src ="${image}" alt="profile picture" width="100%" class="rounded-circle">
                       </div>
                       <h4>Comely Daniel</h4>
                    </div>
                    <div class="card-body">
                      <h6 class="card-subtitle mb-2 text-muted">${post.id}</h6>
                      <h5 class="card-title">${post.title}</h5>
                      <p class="card-text">${post.body}</p>
                      <button class="btn btn-outline-secondary me-2 me-md-4 me-lg-2" onclick="editPost(${post.id})" type="button">Edit</button>
                      <a href="./view.html?id=${post.id}" class="btn btn-outline-info me-4 me-lg-2" id="view-more">View More</a>
                      <button class="btn btn-outline-danger ms-2 ms-md-0" onclick="deletePost(${post.id})" type="button">Delete</button>
                    </div>
                  </div>
              </div> `;
              });
              postList.innerHTML = outPut;
        })
}


getPosts();

//create posts
addPost.addEventListener('submit', createPost)

function createPost(e) {
    e.preventDefault();
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
            title: titleValue.value,
            body: bodyValue.value,
        }),
        headers: {
            'Content-type': 'application/json'
        }
    })
        .then((response) => response.json())
        .then((data) => {
            posts.push(data);
            let outPut = '';
            posts.forEach(post => {
                outPut +=  `  <div class="col-lg-4 col-md-6 mt-4">
                <div class="card h-100">
                    <div class="ps-3 pt-3">
                       <div class="profile-pic w-25">
                          <img src ="${image}" alt="profile picture" width="100%" class="rounded-circle">
                       </div>
                       <h4>Comely Daniel</h4>
                    </div>
                    <div class="card-body">
                      <h6 class="card-subtitle mb-2 text-muted">${post.id}</h6>
                      <h5 class="card-title">${post.title}</h5>
                      <p class="card-text">${post.body}</p>
                      <button class="btn btn-outline-secondary me-2 me-md-4 me-lg-2" onclick="editPost(${post.id})" type="button">Edit</button>
                      <a href="./view.html?id=${post.id}" class="btn btn-outline-info me-4 me-lg-2" id="view-more">View More</a>
                      <button class="btn btn-outline-danger ms-2 ms-md-0" onclick="deletePost(${post.id})" type="button">Delete</button>
                    </div>
                  </div>
              </div> `;
              });
              postList.innerHTML = outPut;
        })
        titleValue.value = "";
        bodyValue.value = "";

        blanket.classList.remove(`float`);
}

// form controls
btnShare.addEventListener('click', () => {
    blanket.classList.add(`float`);
});

closure.addEventListener('click', () => {
    blanket.classList.remove(`float`);
});

closeEdit.addEventListener('click', () => {
  duvet.classList.remove(`float`);
});


//edit
function editPost(id) {
    duvet.classList.add(`float`);

    btnEdit.addEventListener('click', () => {
      fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          id: id,
          title: titleEditValue.value,
          body: bodyEditValue.value
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
      })
        .then((response) => response.json())
        .then((data) => {
          let postTitles = document.querySelectorAll('.card-title');
          let postBodies = document.querySelectorAll('.card-text');
    
          postTitles.forEach((postTitle, index) => {
            if(index + 1 === id) {
                if(data.title !== "") {
                  postTitle.innerHTML = data.title;
                }
            }
          })
    
          postBodies.forEach((postBody, index) => {
            if(index + 1 === id) {
              if(data.title !== "") {
                postBody.innerHTML = data.body;
              }
            }
          })
          id = ""
        })
        
        duvet.classList.remove(`float`);
      })
    
}  

//delete 
function deletePost(id) {
      fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
          method: 'DELETE',
      })
          .then((response) => response.json())
          .then((data) => {
              posts = posts.filter(post => post.id !== id)
              let outPut = '';
              posts.forEach(post => {
                outPut +=  `  <div class="col-lg-4 col-md-6 mt-4">
                <div class="card h-100">
                    <div class="ps-3 pt-3">
                       <div class="profile-pic w-25">
                          <img src ="${image}" alt="profile picture" width="100%" class="rounded-circle">
                       </div>
                       <h4>Comely Daniel</h4>
                    </div>
                    <div class="card-body">
                      <h6 class="card-subtitle mb-2 text-muted">${post.id}</h6>
                      <h5 class="card-title">${post.title}</h5>
                      <p class="card-text">${post.body}</p>
                      <button class="btn btn-outline-secondary me-2 me-md-4 me-lg-2" onclick="editPost(${post.id})" type="button">Edit</button>
                      <a href="./view.html?id=${post.id}" class="btn btn-outline-info me-4 me-lg-2" id="view-more">View More</a>
                      <button class="btn btn-outline-danger ms-2 ms-md-0" onclick="deletePost(${post.id})" type="button">Delete</button>
                    </div>
                  </div>
              </div> `;
                });
              postList.innerHTML = outPut;
               
          })

}




