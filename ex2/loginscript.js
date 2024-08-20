document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault();  // Prevent the default form submission
    // Redirect to the to-do list page upon signup
    window.location.href = "index.html";
});