function getLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        fetchWeatherData(position.coords.latitude, position.coords.longitude);
      }, error => {
        console.error(error);
      });
    } else {
      alert("Geolocation is not available.");
    }
  }
  
  function fetchWeatherData(latitude, longitude) {
    const endpoint = `/get-weather/?latitude=${latitude}&longitude=${longitude}`;
    fetch(endpoint)
      .then(response => response.json())
      .then(data => {
        console.log(data); // Xử lý và hiển thị thông tin thời tiết nhận được tại đây.
      })
      .catch(error => console.error('Error:', error));
  }