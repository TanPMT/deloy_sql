
		const confirmButtons = document.querySelectorAll('.confirm-btn');

		confirmButtons.forEach((button) => {
			button.addEventListener('click', function() {
				alert('Bạn đã xác nhận thành công');
			});
		});

		document.getElementById('sell').onclick = function(){
			window.location.href = "/maker/";
			
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