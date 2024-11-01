let isLoginMode = true;

// Toggle between Login and Register mode
function toggleAuthMode() {
    isLoginMode = !isLoginMode;
    document.getElementById('authTitle').textContent = isLoginMode ? 'Login' : 'Register';
    document.getElementById('authToggle').textContent = isLoginMode ? "Don't have an account? Register" : 'Already have an account? Login';
}

// Authentication (Register/Login)
function authenticate() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (username === '' || password === '') {
        alert('Please enter both username and password');
        return;
    }

    if (isLoginMode) {
        // Login
        const storedPassword = localStorage.getItem(username);
        if (storedPassword === password) {
            loginSuccess();
        } else {
            alert('Incorrect username or password');
        }
    } else {
        // Register
        if (localStorage.getItem(username)) {
            alert('Username already exists');
        } else {
            localStorage.setItem(username, password);
            alert('Registration successful! You can now log in.');
            toggleAuthMode();
        }
    }
}

// Successful login function
function loginSuccess() {
    document.getElementById('authPage').style.display = 'none';
    document.getElementById('todoPage').style.display = 'block';
}

// Logout function
function logout() {
    document.getElementById('todoPage').style.display = 'none';
    document.getElementById('authPage').style.display = 'block';
}

// To-Do List functionality
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskValue = taskInput.value.trim();
    if (taskValue === '') {
        alert('Please enter a task');
        return;
    }

    const taskList = document.getElementById('taskList');
    const li = document.createElement('li');
    li.innerHTML = `
        ${taskValue}
        <button class="delete" onclick="removeTask(this)">Delete</button>
    `;
    taskList.appendChild(li);
    taskInput.value = '';
}

function removeTask(button) {
    const taskList = document.getElementById('taskList');
    taskList.removeChild(button.parentElement);
}
