// Disable button until all inputs are filled
const loginButton = document.getElementById('loginButton');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const roleSelect = document.getElementById('role');

// Function to check if all fields are filled
function checkFields() {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    const role = roleSelect.value;
    
    // Enable the button if all fields are filled, otherwise disable it
    if (username !== "" && password !== "" && role !== "") {
        loginButton.disabled = false;
    } else {
        loginButton.disabled = true;
    }
}

// Add event listeners to the inputs
usernameInput.addEventListener('input', checkFields);
passwordInput.addEventListener('input', checkFields);
roleSelect.addEventListener('change', checkFields);

// Submit Login function
function submitLogin() {
    const username = usernameInput.value;
    const password = passwordInput.value;
    const role = roleSelect.value;
    const messageElement = document.getElementById('message');

    fetch('https://restapi.tu.ac.th/api/v1/auth/Ad/verify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Application-Key': 'TU55f30406e2a6ae3ebbde97cf13d0c5dd536ad3867b7a71e244c3e408133c23c4d325c4811f7d247e56d124446875530e'
        },
        body: JSON.stringify({
            "UserName": username,
            "PassWord": password
        })
    })
    .then(response => response.json())
    .then(data => {
        messageElement.innerText = data.message;
        messageElement.style.color = "green";
    })
    .catch(error => {
        console.error('Error:', error);
        messageElement.innerText = "An error occurred during login.";
        messageElement.style.color = "red";
    });
}