var passwordInput = document.getElementById('password');
    var passwordMessage = document.getElementById('password-message');
    var signupButton = document.getElementById('signup');
    
    passwordInput.addEventListener('input', function() {
        var password = passwordInput.value;
    
        if (password.length < 8) {
            passwordMessage.textContent = 'Mật khẩu cần ít nhất 8 ký tự';
            passwordMessage.style.color = 'red';
            signupButton.disabled = true;
            return;
        }
    
        if (!containsUpperCase(password)) {
            passwordMessage.textContent = 'Mật khẩu cần chứa ít nhất một chữ hoa';
            passwordMessage.style.color = 'orange';
            signupButton.disabled = true;
            return;
        }

        if (!containsNumber(password)) {
            passwordMessage.textContent = 'Mật khẩu cần chứa ít nhất một số';
            passwordMessage.style.color = 'orange';
            signupButton.disabled = true;
            return;
        }

        if (!containsLowerCase(password)) {
            passwordMessage.textContent = 'Mật khẩu cần chứa ít nhất một chữ thường';
            passwordMessage.style.color = 'orange';
            signupButton.disabled = true;
            return;
        }

        if (!containsSpecialCharacter(password)) {
            passwordMessage.textContent = 'Mật khẩu cần chứa ít nhất một ký tự đặc biệt';
            passwordMessage.style.color = 'orange';
            signupButton.disabled = true;
            return;
        }
    
        passwordMessage.textContent = 'Mật khẩu hợp lệ';
        passwordMessage.style.color = 'green';
        signupButton.disabled = false;
    });
    
    function containsUpperCase(password) {
        return /[A-Z]/.test(password);
    }
    
    function containsLowerCase(password) {
        return /[a-z]/.test(password);
    }

    function containsNumber(password) {
        return /[0-9]/.test(password);
    }

    function containsSpecialCharacter(password) {
        var specialCharacterRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>\/?]+/;
        return specialCharacterRegex.test(password);
    }

   
        // Đợi DOM được tải hoàn thành
        document.addEventListener("DOMContentLoaded", function() {
            var messageContainer = document.getElementById("message-container");
            var duration = 3000; // Thời gian hiển thị thông điệp (tính bằng mili giây)
    
            // Xác định lớp CSS để ẩn khối div
            var hideClass = "hidden";
    
            // Tạo một hàm để ẩn khối div
            function hideMessageContainer() {
                messageContainer.classList.add(hideClass);
            }
    
            // Gọi hàm ẩn khối div sau khoảng thời gian quy định
            setTimeout(hideMessageContainer, duration);
        });