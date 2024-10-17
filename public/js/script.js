function submitLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('https://restapi.tu.ac.th/api/v1/auth/Ad/verify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Application-Key': 'TU55f30406e2a6ae3ebbde97cf13d0c5dd536ad3867b7a71e244c3e408133c23c4d325c4811f7d247e56d124446875530e'
        },
        body: JSON.stringify({"UserName" : "username","PassWord" : "password"})
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('message').innerText = data.message;
    })
    .catch(error => console.error('Error:', error));
}