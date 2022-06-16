const url = "https://jsonplaceholder.typicode.com/posts";

const allPostList = document.getElementById("row");
const getButton = document.getElementById("get-stories");
const newPost = document.getElementById("new-post");

let outPut ="";

const allPost = (posts) => {
    posts.forEach(post =>{
      outPut +=  `  <div class="col-lg-4 col-md-6 mb-3">
      <div class="card mb-3 h-100">
          <div class="ps-3 pt-3">
              <div class="profile-picture w-25 rounded-circle"></div>
              <h4>Profile Name</h4>
          </div>
          <div class="card-body">
            <h6 class="card-subtitle mb-2 text-muted">${post.id}</h6>
            <h5 class="card-title">${post.title}</h5>
            <p class="card-text">${post.body}</p>
            <a href="viewtwo.html?id=${post.id}" class="btn btn-outline-info me-4">View More</a>
          </div>
        </div>
    </div> `;
    });
    allPostList.innerHTML = outPut;
  }

  //get posts
fetch(url)
.then(response => {
    return response.json()
})
.then(data => allPost(data));


getButton.addEventListener("click", function () {
    fetch(url)
        .then(response => {
            return response.json()
        })
        .then(data => {
            for (let i = 0; i < 6; i++) {
                newPost.innerHTML += `   <div class="col-lg-4 col-md-6 mb-3">
                <div class="card mb-3 h-100">
                    <h6 class="card-subtitle pt-2 ps-2 mb-2 text-muted">NEW</h6>
                    <div class="ps-3 pt-3">
                        <div class="profile-picture w-25 rounded-circle"></div>
                         <h4>Profile Name</h4>
                    </div>
                    <div class="card-body">
                      <h5 class="card-title">${data[i].title}</h5>
                      <p class="card-text">${data[i].body}</p>
                      <a href="viewtwo.html?id=${data[i].id}" class="btn btn-outline-info me-4">View More</a>
                    </div>
                  </div>
              </div> `;
            }
        })
})


//view more
let newWindow;

function viewMore() {
  newWindow = window.open("view.html", "_self");
}