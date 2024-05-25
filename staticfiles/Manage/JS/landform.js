    let searchInput = document.getElementById('land_pos');
        searchInput.addEventListener('input', function() {
            
            document.addEventListener('click', function(e) {
                
    let suggestions = document.getElementById('suggestions');
    if (e.target.id !== 'land_pos' && e.target.parentNode.id !== 'suggestions') {
        suggestions.style.display = 'none';
    }
            });

            searchInput.addEventListener('focus', function() {
                let suggestions = document.getElementById('suggestions');
                if (suggestions.innerHTML.trim() !== '') {
                    suggestions.style.display = 'block';
                }
            });
                        let query = this.value;
            if (query.length > 1) { // Thực hiện tìm kiếm khi người dùng đã nhập ít nhất 3 ký tự
                fetch(`https://rsapi.goong.io/Place/AutoComplete?api_key=irESJaYhu9GSYh2g8waOxsDolPKwMzkFcGKNGxNy&location=21.013715429594125,105.79829597455202&input=${query}`)
                .then(response => response.json())
                .then(data => {
                    let suggestions = document.getElementById('suggestions');
                    suggestions.innerHTML = ''; // Xóa các gợi ý cũ
                    data.predictions.forEach(item => {
                        let div = document.createElement('div');
                        div.innerHTML = item.description;
                        div.addEventListener('click', function() {
                            searchInput.value = item.description; // Điền gợi ý vào ô tìm kiếm
                            suggestions.innerHTML = ''; // Ẩn gợi ý sau khi chọn
                        });
                        suggestions.appendChild(div);
                    });
                })
                .catch(error => console.error('Error:', error));
            }
        });