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

outPut = "";

const renderPost = (posts) => {
    posts.forEach(post => {
      outPut +=  `  <div class="col-lg-4 col-md-6 mt-4">
      <div class="card h-100">
          <div class="ps-3 pt-3">
             <div class="profile-picture w-25">
                <img src ="${image}" alt="profile picture" width="100%" class="rounded-circle">
             </div>
             <h4>Comely Daniel</h4>
          </div>
          <div class="card-body">
            <h6 class="card-subtitle mb-2 text-muted">${post.id}</h6>
            <h5 class="card-title">${post.title}</h5>
            <p class="card-text">${post.body}</p>
            <button class="btn btn-outline-secondary me-4" onclick="editPost(${post.id})" type="button">Edit</button>
            <a href="/view.html?id=${post.id}" class="btn btn-outline-info me-4" id="view-more">View More</a>
            <button class="btn btn-outline-danger" onclick="deletePost(${post.id})" type="button">Delete</button>
          </div>
        </div>
    </div> `;
    });
    postList.innerHTML = outPut;
  }

//get posts
fetch(url)
    .then(response => {
        return response.json()
    })
    .then(data => renderPost(data))

//create posts
addPost.addEventListener("submit", (e) => {
    e.preventDefault();
    fetch(url, {
       method: 'POST',
       body: JSON.stringify({
            title: titleValue.value,
            body: bodyValue.value,
            userId: 2
        }),
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        }
    })
        .then(response => {
            return response.json()
          })
        .then(data => {
          const dataArr = [];
          dataArr.unshift(data);
          renderPost(dataArr);
        })

        titleValue.value = "";
        bodyValue.value = "";

        blanket.classList.remove(`float`);

})

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
    console.log(id)
    duvet.classList.add(`float`);

    btnEdit.addEventListener('click', () => {
      console.log(id);
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
          console.log(data);
          /*let postTitles = document.querySelectorAll('.card-title');
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
                postBody.innerHTML = data.title;
              }
            }
          })*/
        })
        duvet.classList.remove(`float`);
    })
     
   
    
    
}  


