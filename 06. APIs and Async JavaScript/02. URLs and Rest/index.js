let postsArray = [];

function renderPosts() {
    let html = "";

    for (let i = postsArray.length - 1; i >= 0; i--) {
        const post = postsArray[i];
        html += `
                <article class="post">
                    <h2>${post.title}</h2>
                    <p>${post.body}</p>
                </article>
            `;
    }

    document.getElementById("post-list").innerHTML = html;
}

fetch("https://apis.scrimba.com/jsonplaceholder/posts")
    .then((res) => res.json())
    .then((data) => {
        postsArray = data.slice(0, 5).reverse();
        renderPosts();
    });

document.addEventListener("submit", (event) => {
    event.preventDefault();

    const form = document.getElementById("create-post");
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    fetch("https://apis.scrimba.com/jsonplaceholder/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .then((data) => {
            postsArray.push(data);
            renderPosts();
        });

    for (const input of document.querySelectorAll(".post-input")) {
        input.value = "";
    }
});
