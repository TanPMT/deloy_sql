// JavaScript
const notificationCount = document.querySelector('.text');
const notificationRows = document.querySelectorAll('.notifi__row');

// Đếm số thông báo
const count = notificationRows.length;

// Hiển thị số thông báo
notificationCount.textContent = count.toString();

// Kiểm tra và khôi phục trạng thái đã đọc
notificationRows.forEach((row) => {
    const context = row.querySelector('.notifi__context');

    // Kiểm tra trạng thái đã đọc từ localStorage
    const isRead = localStorage.getItem('notificationRead-' + row.dataset.id);

    if (isRead) {
        context.style.fontWeight = 'normal'; // Kiểu chữ bình thường cho thông báo đã đọc
        row.classList.add('read'); // Thêm lớp 'read' để đánh dấu đã đọc
    } else {
        context.style.fontWeight = 'bold'; // Kiểu in đậm cho thông báo chưa đọc
    }
});

// // JavaScript
// const markAllReadLink = document.querySelector('.mark-all-read');

// markAllReadLink.addEventListener('click', function(event) {
//     event.preventDefault();

//     notificationRows.forEach((row) => {
//         const context = row.querySelector('.notifi__context');
//         context.style.fontWeight = 'normal'; // Đặt kiểu chữ bình thường cho tất cả thông báo
//         row.classList.add('read'); // Thêm lớp 'read' để đánh dấu đã đọc

//         // Lưu trạng thái đã đọc vào localStorage
//         localStorage.setItem('notificationRead-' + row.dataset.id, true);
//     });
// });




////////////////


const confirmButtons = document.querySelectorAll('.mark-all-read');

confirmButtons.forEach((button) => {
    button.addEventListener('click', function() {
        alert('Đánh dấu đã đọc thành công.');
    });
});

document.getElementById('sell').onclick = function(){
    window.location.href = "/notify/";
    
}

function showConfirmation() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/confirm/", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            if (response.success) {
                var notificationDiv = window.parent.document.getElementById("notification");
                notificationDiv.innerHTML = "Bạn đã xác nhận thành công.";
                notificationDiv.parentElement.parentElement.style.display = "block";
            }
        }
    };
    xhr.send();
}