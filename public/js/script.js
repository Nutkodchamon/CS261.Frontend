function submitLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

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
        document.getElementById('message').innerText = data.message || 'Login successful!';
        
        if (data.status) {  // ตรวจสอบว่าการ login สำเร็จหรือไม่
            showAccountInfo(data); // เรียกฟังก์ชันเพื่อแสดงข้อมูลบัญชี
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('message').innerText = 'An error occurred while processing your request.';
    });
}

// ฟังก์ชันแสดงข้อมูลบัญชีใน HTML
function showAccountInfo(data) {
    const accountInfoContainer = document.getElementById('accountInfo');

    // ตรวจสอบว่าข้อมูลจาก API มีหรือไม่
    accountInfoContainer.innerHTML = `
        <h2>Account Information</h2>
        <p><strong>Username:</strong> ${data.username || 'N/A'}</p>
        <p><strong>Display Name (TH):</strong> ${data.displayname_th || 'N/A'}</p>
        <p><strong>Display Name (EN):</strong> ${data.displayname_en || 'N/A'}</p>
        <p><strong>Email:</strong> ${data.email || 'N/A'}</p>
        <p><strong>Department:</strong> ${data.department || 'N/A'}</p>
        <p><strong>Faculty:</strong> ${data.faculty || 'N/A'}</p>
        <p><strong>Current Status:</strong> ${data.tu_status || 'N/A'}</p>
    `;

    accountInfoContainer.style.display = 'block';  // แสดงข้อมูลบนหน้าเว็บ
}

document.addEventListener('DOMContentLoaded', function() {
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const roleSelect = document.getElementById('role');
    const loginButton = document.querySelector('button[type="button"]:nth-of-type(1)');

    function checkInputs() {
        const isUsernameFilled = usernameInput.value.trim() !== '';
        const isPasswordFilled = passwordInput.value.trim() !== '';
        const isRoleSelected = roleSelect.value !== '';

        loginButton.disabled = !(isUsernameFilled && isPasswordFilled && isRoleSelected);
    }

    usernameInput.addEventListener('input', checkInputs);
    passwordInput.addEventListener('input', checkInputs);
    roleSelect.addEventListener('change', checkInputs);

    checkInputs();
});

function togglePassword() {
    var passwordField = document.getElementById("password");
    var toggleBtn = document.querySelector(".toggle-password");
    
    if (passwordField.type === "password") {
        passwordField.type = "text";  // เปลี่ยนเป็น text เพื่อแสดงรหัสผ่าน
        toggleBtn.textContent = "Hide";  // เปลี่ยนข้อความเป็น Hide
    } else {
        passwordField.type = "password";  // กลับเป็น password เพื่อซ่อนรหัสผ่าน
        toggleBtn.textContent = "Show";  // เปลี่ยนข้อความกลับเป็น Show
    }
}