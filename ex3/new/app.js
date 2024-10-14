const postForm = document.getElementById('post-form');
const postContent = document.getElementById('post-content');
const postImage = document.getElementById('post-image');
const postsContainer = document.getElementById('posts-container');
const usersContainer = document.getElementById('users-container');
const registerForm = document.getElementById('register-form');
const loginForm = document.getElementById('login-form');
const feedSection = document.getElementById('feed-section');

let posts = [];
let currentUser = localStorage.getItem('username') || null;
let followers = [];

// Load users from local storage
let users = JSON.parse(localStorage.getItem('users')) || [];

// Load posts from local storage
function loadPosts() {
    const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    posts = storedPosts;
}

// Function to display posts
function displayPosts() {
    postsContainer.innerHTML = '';
    posts.forEach((post, index) => {
        if (followers.includes(post.username) || post.username === currentUser) {
            const postElement = document.createElement('div');
            postElement.className = 'post';
            postElement.innerHTML = `
                <p><strong>${post.username}</strong></p>
                <p>${post.content || ''}</p>
                ${post.image ? `<img src="${post.image}" alt="Post image" class="post-image">` : ''}
                <p><small>${new Date(post.date).toLocaleString()}</small></p>
                <p>Likes: ${post.likes} | Dislikes: ${post.dislikes}</p>
                <button onclick="likePost(${index})">👍</button>
                <button onclick="dislikePost(${index})">👎</button>
                <div>
                    <strong>Comments:</strong>
                    <ul>${post.comments.map((comment, i) => `
                        <li>${comment}
                            <button onclick="replyToComment(${index}, ${i})">Reply</button>
                        </li>`).join('')}</ul>
                </div>
                <textarea id="comment-${index}" placeholder="Write a comment..."></textarea>
                <button onclick="addComment(${index})">Add Comment</button>
            `;
            postsContainer.appendChild(postElement);
        }
    });
}

// Function to display users to follow/unfollow
function displayUsers() {
    usersContainer.innerHTML = '';
    users.forEach(user => {
        if (user.username !== currentUser) {
            const userElement = document.createElement('div');
            userElement.innerHTML = `
                <p>${user.username}</p>
                <button onclick="toggleFollow('${user.username}')">
                    ${followers.includes(user.username) ? 'Unfollow' : 'Follow'}
                </button>
            `;
            usersContainer.appendChild(userElement);
        }
    });
}

// Handle registration
registerForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.getElementById('new-username').value;
    const password = document.getElementById('new-password').value;

    // Check for existing user
    if (users.find(user => user.username === username)) {
        alert('User already exists');
        return;
    }

    // Register new user
    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));

    alert('Registration successful! Please log in.');
    registerForm.style.display = 'none';
    loginForm.style.display = 'block'; // Show the login form
});

// Handle login
loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        localStorage.setItem('username', username);
        currentUser = username;
        followers = JSON.parse(localStorage.getItem('followers')) || []; // Load followers
        loadPosts(); // Load posts
        displayUsers(); // Display users to follow
        displayPosts(); // Display posts
        feedSection.style.display = 'block'; // Show feed section
        loginForm.style.display = 'none'; // Hide login form
        registerForm.style.display = 'none'; // Hide registration form
    } else {
        alert('Invalid username or password');
    }
});

// Handle follow/unfollow functionality
function toggleFollow(username) {
    if (followers.includes(username)) {
        followers = followers.filter(follower => follower !== username);
    } else {
        followers.push(username);
    }
    localStorage.setItem('followers', JSON.stringify(followers));
    displayUsers();
    displayPosts();
}

// Handle post submission
postForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const content = postContent.value;
    const imageFile = postImage.files[0];
    const imageUrl = imageFile ? URL.createObjectURL(imageFile) : null;

    const newPost = {
        username: currentUser,
        content: content || null,
        image: imageUrl,
        likes: 0,
        dislikes: 0,
        comments: [],
        date: new Date()
    };

    posts.push(newPost);
    localStorage.setItem('posts', JSON.stringify(posts));
    postContent.value = '';
    postImage.value = '';
    displayPosts();
});

// Function to add a comment
function addComment(postIndex) {
    const comment = document.getElementById(`comment-${postIndex}`).value;
    if (comment) {
        posts[postIndex].comments.push(comment);
        localStorage.setItem('posts', JSON.stringify(posts));
        displayPosts();
    }
}

// Function to like a post
function likePost(postIndex) {
    posts[postIndex].likes++;
    localStorage.setItem('posts', JSON.stringify(posts));
    displayPosts();
}

// Function to dislike a post
function dislikePost(postIndex) {
    posts[postIndex].dislikes++;
    localStorage.setItem('posts', JSON.stringify(posts));
    displayPosts();
}

// Function to reply to a comment
function replyToComment(postIndex, commentIndex) {
    const reply = prompt('Enter your reply:');
    if (reply) {
        posts[postIndex].comments[commentIndex] += ` - Reply: ${reply}`;
        localStorage.setItem('posts', JSON.stringify(posts));
        displayPosts();
    }
}
