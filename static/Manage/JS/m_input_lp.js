function myFunction() {
  window.location.href = "{% url 'create' %}";
}

function ClickSeason(event) {
  // Lấy ID nút
  const buttonId = event.target.dataset.seasonId;
  // Gửi yêu cầu đến server
  const url = `/api/get-season-info/${buttonId}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // Cập nhật nội dung HTML
      const seasonInfoElement = document.querySelector("#season-info");
      seasonInfoElement.querySelector(".season_name").textContent = data.season_name;
      seasonInfoElement.querySelector(".season-start-time").textContent = data.time_start;
      seasonInfoElement.querySelector(".season-end-time").textContent = data.time_end;
      seasonInfoElement.querySelector(".season-profit").textContent = data.profit;
    });
}
