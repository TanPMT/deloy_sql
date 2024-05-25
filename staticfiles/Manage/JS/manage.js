  
// HÀM ĐỂ QUẢN LÝ, TÍNH TOÁN
// Lấy thông tin mùa vụ từ server --------------------------------------
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

    // Định dạng ngày bắt đầu
    const startDate = new Date(data.start_time);
    const formattedStartDate = formatDate(startDate);
    seasonInfoElement.querySelector(".season-start-time").textContent = formattedStartDate;

    // Định dạng ngày kết thúc
    const endDate = new Date(data.end_time);
    const formattedEndDate = formatDate(endDate);
    seasonInfoElement.querySelector(".season-end-time").textContent = formattedEndDate;

    seasonInfoElement.querySelector(".season-profit").textContent = data.profit;
  });

// Hàm định dạng ngày-tháng-năm
function formatDate(date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}
  }

  // Lấy thoong tin đất --------------------------------------
  function showLandInfo(landId) {
    // Gọi API hoặc thực hiện các thao tác khác để lấy dữ liệu cho landId cụ thể
    fetch(`/api/get-land-info/${landId}`)
      .then((response) => response.json())
      .then((landInfo) => {
        var mapContainer = document.getElementById('map'); // Lấy container cho bản đồ từ ID 'map'
        mapContainer.innerHTML = ''; // Xóa bản đồ hiện tại nếu có 
        var area = document.getElementById('dientich');
        var pH_num = document.getElementById('pH'); 
        var doAm = document.getElementById('doam'); 
        
        // Điền dữ liệu vào phần tử map        
        goongjs.accessToken = 'waGtXEnjW1d7EVK5RI6XA57FNjobxksYfUgIl6TT';
        var map = new goongjs.Map({
            container: 'map', // container id
            style: 'https://tiles.goong.io/assets/goong_map_web.json', // stylesheet location
            center: [105.83991, 21.028], // starting position [lng, lat]
            zoom: 12 // starting zoom
            });
        
        var marker = new goongjs.Marker()
        .setLngLat([105.83991, 21.028])
        .addTo(map);

        area.innerHTML = landInfo.area; 
        ph_dec = landInfo.ph / 14 * 100; 
        pH_num.style.width = ph_dec + '%';
        doAm.style.width = landInfo.moisture + '%';
      });
  }

  // Lấy thông tin chi tiết đất đai ---------------------------------
  function ClickLand(event) {
    // Lấy seasonId từ event.target hoặc các thuộc tính khác của sự kiện
    const seasonId = event.target.dataset.seasonId;

    // Kiểm tra seasonId có tồn tại và hợp lệ
    if (seasonId) {
      // Construct the URL to fetch land data for the provided season ID
      const landUrl = `/api/get-land-by-season/${seasonId}`;

   
    // Fetch land data
    fetch(landUrl)
      .then((response) => response.json())
      .then((landData) => {
        // Update land information in the UI
        const landContainer = document.getElementById("land-container");
  
        // Clear previous land data (optional)
        landContainer.innerHTML = ""; // Uncomment if you want to clear previous content
  
        // Process and display land data
        for (const landItem of landData) {
          // Create a new land element (div)
          const landElement = document.createElement("div");
          landElement.classList.add("land__item", "col-2");

          // Add land ID as a data attribute to the land element
          landElement.setAttribute("data-land-id", landItem.id);
  
          // Add land name
          const landName = document.createElement("p");
          landName.innerHTML = landItem.name;
          landName.style.fontWeight = "bold";
          landName.style.marginBottom = "10px";
          landElement.appendChild(landName);
  
          // Add land status (assuming a "status" property is returned from the API)
          const landStatus = document.createElement("div");
          landStatus.classList.add("land__status");
          if (landItem.ph === 6 | landItem.moisture === 50) {
            landStatus.classList.add("green");
            landStatus.textContent = "Normal";
          }
          else {
            landStatus.classList.add("red");
            landStatus.textContent = "Warning";
          }
          
          
          
          landElement.appendChild(landStatus);
          landElement.addEventListener("click", function(event) {
            const landId = this.dataset.landId;
            Earse(event);
            showLandInfo(landId); 
            ClickLandShowPlant(event);
            
            
          });
  
          // Append the land element to the container
          landContainer.appendChild(landElement);
        }
      });
    }
}

function ClickLandShowPlant(event){
  const landId = event.target.dataset.landId;
  
  // Kiểm tra seasonId có tồn tại và hợp lệ
  if (landId) {

    // ------------------ HEADER ------------------
    var plantdiv = document.getElementById('plant');
    // Tạo phần tử h4 và gán nội dung
    var h4 = document.createElement('h4');
    h4.textContent = 'THÔNG TIN CÂY TRỒNG';
    // Tạo phần tử div có lớp "row p__row"
    var rowDiv = document.createElement('div');
    rowDiv.className = 'row p__row';
    // Tạo các phần tử div có lớp tương ứng và gán nội dung
    var col1 = document.createElement('div');
    col1.className = 'col-2 plant__id';
    col1.textContent = 'STT';
    var col2 = document.createElement('div');
    col2.className = 'col-3 plant__name';
    col2.textContent = 'Tên loại cây';
    var col3 = document.createElement('div');
    col3.className = 'col-3 plant__detail';
    col3.textContent = 'Thông tin chi tiết';
    var col4 = document.createElement('div');
    col4.className = 'col-2 plant__status';
    col4.textContent = 'Tình trạng';
    var col5 = document.createElement('div');
    col5.className = 'col-2 plant__time';
    col5.textContent = 'Thời gian thu hoạch';

    // Gắn các phần tử con vào phần tử cha
    rowDiv.appendChild(col1);
    rowDiv.appendChild(col2);
    rowDiv.appendChild(col3);
    rowDiv.appendChild(col4);
    rowDiv.appendChild(col5);

    plantdiv.appendChild(h4);
    plantdiv.appendChild(rowDiv); 
    var cnt = 0;
    var infoCaytrong = [];

    const plantSamURL = `api/get-plantmode/`;
    fetch(plantSamURL)
    .then((response) => response.json())
    .then((plantSample)=> {
      
      const landURL = `/api/get-land-info/${landId}`;
      fetch(landURL)
      .then((response) => response.json())
      .then((landData)=> {
        
        const plantURL = `/api/get-plant-by-land/${landId}`;
        fetch(plantURL)
        .then((response) => response.json())
        .then((plantData) => {

          
        for (item of plantData) {
          cnt++;
          var infoCaytrong = [];
          var rowDiv1 = document.createElement('div');
          rowDiv1.className = 'row p__row';

          // Tạo các phần tử div có lớp tương ứng và gán nội dung
          var pID = document.createElement('div');
          pID.className = 'col-2 plant__id';
          pID.textContent = cnt;

          var pName = document.createElement('div');
          pName.className = 'col-3 plant__name';
          pName.textContent = item.name;

          var pDetail = document.createElement('div');
          pDetail.className = 'col-3 plant__detail';

          // Tạo phần tử ul
          var ul = document.createElement('ul');

          // Tạo các phần tử li và gán nội dung
          var loaiCayTrong = document.createElement('li');
          loaiCayTrong.textContent = 'Loại cây trồng: ' + typePlant(item.type);

          var thoiGianPhatTrien = document.createElement('li');
          thoiGianPhatTrien.textContent = 'Thời gian phát triển: ' + item.timeDev + ' tháng';

          var chuKyBonPhan = document.createElement('li');
          chuKyBonPhan.textContent = 'Chu kỳ bón phân: ' + item.bp + ' tháng';

          var nongDoKhoang = document.createElement('li');
          nongDoKhoang.textContent = 'Chất khoáng cần thiết: ' + item.nd;

          // Gắn các phần tử li vào phần tử ul
          ul.appendChild(loaiCayTrong);
          ul.appendChild(thoiGianPhatTrien);
          ul.appendChild(chuKyBonPhan);
          ul.appendChild(nongDoKhoang);

          // Gắn phần tử ul vào phần tử col3
          pDetail.appendChild(ul);
              for (var itemP of plantSample) {
                if (itemP.plant_name == item.name) {
                  infoCaytrong.push(itemP.plant_pH_min);
                  infoCaytrong.push(itemP.plant_pH_max);
                  infoCaytrong.push(itemP.plant_DoAm_min);
                  infoCaytrong.push(itemP.plant_DoAm_max);
                }
              }
              console.log("Test cay trong ", item.id)
              console.log(infoCaytrong);

              var pStatus = document.createElement('div');
              
              if (
                landData.ph > infoCaytrong[0] &&
                landData.ph < infoCaytrong[1] &&
                landData.moisture > infoCaytrong[2] &&
                landData.moisture < infoCaytrong[3]
              ) {
                pStatus.textContent = 'Tốt';
                pStatus.className = 'col-2 plant__status1';
              } else {
                pStatus.textContent = 'Xấu';
                pStatus.className = 'col-2 plant__status2';
              }

              var pTime = document.createElement('div');
              pTime.className ='col-2 plant__time';
              let endTime = calculateEndDate(
                document.querySelector('.season__info .season-start-time').textContent,
                item.timeDev
              );
              pTime.textContent = calculateDaysLeft(endTime) + ' ngày';

              // Gắn các phần tử con vào phần tử cha
              rowDiv1.appendChild(pID);
              rowDiv1.appendChild(pName);
              rowDiv1.appendChild(pDetail);
              rowDiv1.appendChild(pStatus);
              rowDiv1.appendChild(pTime);

              plantdiv.appendChild(rowDiv1);
        }

        document.getElementById('num_plant').innerHTML = cnt;
         
          
          
         
          
          var timeCollect = document.getElementById('timeCollect');
          var seasonStartDateString = document.querySelector('.season__info .season-start-time').textContent;
          var timeDev = plantData[0].timeDev;
          
          
          var timeCollectValue = calculateEndDate(seasonStartDateString, timeDev);
          // Gán giá trị cho phần tử HTML
          timeCollect.innerHTML = timeCollectValue;
  
         
  
        
        
          // Gán giá trị cho phần tử HTML
          document.getElementById('time_left').textContent = calculateDaysLeft(timeCollectValue) + " days left"
      
      
      })


      })

    })
  }
}




// hàm zô tri


function Earse(event){
  var p = document.getElementById('plant');
  p.innerHTML = ' ';
}
function parseDateString(dateString) {
  var parts = dateString.split('-');
  var day = parseInt(parts[0], 10);
  var month = parseInt(parts[1], 10) - 1; // Trừ đi 1 vì tháng trong JavaScript tính từ 0 đến 11
  var year = parseInt(parts[2], 10);
  return new Date(year, month, day);
}
// hàm tính toán ngày kết thúc - thu hoạch -------------------
function calculateEndDate(startDate, timeDev) {
  function parseDateString(dateString) {
    var parts = dateString.split('-');
    var day = parseInt(parts[0], 10);
    var month = parseInt(parts[1], 10) - 1; // Trừ đi 1 vì tháng trong JavaScript tính từ 0 đến 11
    var year = parseInt(parts[2], 10);
    return new Date(year, month, day);
  }

  var seasonStartDate = parseDateString(startDate);
  var endDate = new Date(seasonStartDate.getFullYear(), seasonStartDate.getMonth() + parseInt(timeDev), seasonStartDate.getDate());
  
  var day = String(endDate.getDate()).padStart(2, '0');
  var month = String(endDate.getMonth() + 1).padStart(2, '0'); // Tháng trong JavaScript tính từ 0 đến 11
  var year = endDate.getFullYear();

  var timeCollectValue = day + '-' + month + '-' + year;
  return timeCollectValue;
}
// hàm tính toán số ngày còn lại ----------------------------
function calculateDaysLeft(endDateString) {
  // Chuyển đổi chuỗi ngày kết thúc thành đối tượng Date
  var day = parseInt(endDateString.substring(0, 2), 10);
  var month = parseInt(endDateString.substring(3, 5), 10) - 1;
  var year = parseInt(endDateString.substring(6, 10), 10);
  var endDate = new Date(year, month, day);

  var currentTime = new Date();
  var timeDiff = endDate - currentTime;
  var daysLeft = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  return daysLeft;
}

// xác định loại cây trồng
function  typePlant(t){
  if (t == 0)
    return "Cây lương thực"; 
  else if (t == 1)
    return "Cây ăn quả"; 
  else 
    return "Cây rau củ";
}
  

// THÊM XOÁ SỬA SEASON, LAND, PLANT
// HÀM TẠO FORM 
// Gọi hàm để tạo form tự động
let selectedSeasonId; // Biến để lưu ID mùa vụ được chọn
function modifyInfor(event) {
  // Lấy ID mùa vụ từ nút được nhấp vào
  const buttonId = event.target.dataset.seasonId;
  selectedSeasonId = event.target.dataset.seasonId;
  
  // Gửi yêu cầu đến API để lấy thông tin mùa vụ
  const url = `/api/get-season-info/${buttonId}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // Cập nhật giá trị vào form
      document.getElementById("name").value = data.season_name;
      document.getElementById("time_s").value = data.start_time;
      document.getElementById("time_e").value = data.end_time;
      document.getElementById("num").value = data.profit;
    });
}
function ClickLandInfor(event) {
  // Lấy seasonId từ event.target hoặc các thuộc tính khác của sự kiện
  const seasonId = event.target.dataset.seasonId;

  // Kiểm tra seasonId có tồn tại và hợp lệ
  if (seasonId) {
    // Construct the URL to fetch land data for the provided season ID
    const landUrl = `/api/get-land-by-season/${seasonId}`;

    // Fetch land data
    fetch(landUrl)
      .then((response) => response.json())
      .then((landData) => {
        // Lấy số lượng mảnh đất từ landData
        const numberOfLands = landData.length;

        const landContainer = document.getElementById('landContainer');
        landContainer.innerHTML = ''; // Xóa nội dung hiện tại của landContainer
      
        for (let i = 0; i < numberOfLands; i++) {
          const landId = landData[i].id; // Định nghĩa land_id
          const landDiv = document.createElement('div');
          landDiv.classList.add('formModal', 'special');
      
          const nameLabel = document.createElement('label');
          nameLabel.textContent = `Tên mảnh đất:`;
      
          const nameInput = document.createElement('input');
          nameInput.type = 'text';
          nameInput.name = `nameLand${landId}`;
          nameInput.id = `nameLand${landId}`;
          nameInput.value = landData[i].name;
      
          const rowDiv = document.createElement('div');
          rowDiv.classList.add('formModal', 'row');
      
          const col1Div = document.createElement('div');
          col1Div.classList.add('col-4', 'formItem');
      
          const doamLabel = document.createElement('label');
          doamLabel.textContent = 'Độ ẩm:';
      
          const doamInput = document.createElement('input');
          doamInput.type = 'number';
          doamInput.name = `landDoam${landId}`;
          doamInput.id = `landDoam${landId}`;
          doamInput.value = landData[i].moisture;
      
          col1Div.appendChild(doamLabel);
          col1Div.appendChild(doamInput);
      
          const col2Div = document.createElement('div');
          col2Div.classList.add('col-4', 'formItem');
      
          const pHLabel = document.createElement('label');
          pHLabel.textContent = 'Độ pH:';
      
          const pHInput = document.createElement('input');
          pHInput.type = 'number';
          pHInput.name = `landpH${landId}`;
          pHInput.id = `landpH${landId}`;
          pHInput.value = landData[i].ph;
      
          col2Div.appendChild(pHLabel);
          col2Div.appendChild(pHInput);
      
          const col3Div = document.createElement('div');
          col3Div.classList.add('col-4', 'formItem');
      
          const areaLabel = document.createElement('label');
          areaLabel.textContent = 'Diện tích:';
      
          const areaInput = document.createElement('input');
          areaInput.type = 'number';
          areaInput.name = `landArea${landId}`;
          areaInput.id = `landArea${landId}`;
          areaInput.value = landData[i].area;
      
          col3Div.appendChild(areaLabel);
          col3Div.appendChild(areaInput);
      
          rowDiv.appendChild(col1Div);
          rowDiv.appendChild(col2Div);
          rowDiv.appendChild(col3Div);
      
          const posDiv = document.createElement('div');
          posDiv.classList.add('formModal');
      
          const posLabel = document.createElement('label');
          posLabel.textContent = 'Vị trí:';
      
          const posInput = document.createElement('input');
          posInput.type = 'text';
          posInput.name = `landPos${landId}`;
          posInput.id = `landPos${landId}`;
          posInput.value = landData[i].position;
      
          posDiv.appendChild(posLabel);
          posDiv.appendChild(posInput);
          posDiv.style.marginBottom = '30px';
      
          landDiv.appendChild(nameLabel);
          landDiv.appendChild(nameInput);
          landDiv.appendChild(rowDiv);
          landDiv.appendChild(posDiv);
      
          landContainer.appendChild(landDiv);
          
          const buttonDel = document.createElement('button');
          buttonDel.classList.add('btn', 'btn-danger');
          buttonDel.innerHTML = '<i class="fa fa-trash-alt"></i>';

          

          // Gắn sự kiện onclick vào buttonDel
          buttonDel.addEventListener('click', function(event) {
            const clickedButton = event.target; // Truy cập button được click
            DeleteLand(event, landId); // Gọi hàm DeleteLand với land_id tương ứng
          });

          // update land
          const buttonUp = document.createElement('button');
          buttonUp.classList.add('btn', 'btn-success');
          buttonUp.innerHTML = '<i class="fa fa-pencil-alt"></i>';
          
          buttonUp.addEventListener('click', function(event){
            const clickedButton = event.target;
            
            const landname = document.getElementById(`nameLand${landId}`).value; 
            const landDoAm = document.getElementById(`landDoam${landId}`).value;
            const LandPH = document.getElementById(`landpH${landId}`).value;
            const landArea = document.getElementById(`landArea${landId}`).value;
            const landPost = document.getElementById(`landPos${landId}`).value;

            const data = {
              landname:landname,
              landDoAm:landDoAm,
              LandPH:LandPH,
              landArea:landArea,
              landPost:landPost
            }
            UpdateLand(event, landId, data);
            });



            const divBut = document.createElement('div');
            divBut.classList.add('myButton');
            divBut.appendChild(buttonDel);
            divBut.appendChild(buttonUp);

            landDiv.appendChild(divBut);

         
            const headerPlant = document.createElement('h6');
            headerPlant.textContent = 'Tổng quan về cây trồng: ';
            headerPlant.style.fontWeight = '900';
            landDiv.appendChild(headerPlant);

            const plantContainer = document.createElement('div');
            plantContainer.classList.add('formModal', 'plantContainerHehe');
            landDiv.appendChild(plantContainer);
            CreatePlant(landData[i].id, plantContainer);
          
        }
      
      });
  }
}

function CreatePlant(id, container) {
  const url = `/api/get-plant-by-land/${id}`;

  // Gửi yêu cầu GET đến API để lấy danh sách cây trồng theo mảnh đất
  fetch(url)
    .then(response => response.json())
    .then(data => {
      // Tạo form
      // Lấy số lượng mảnh đất từ landData
      const numberOfplant = data.length;

      container.innerHTML = ''; // Xóa nội dung hiện tại của landContainer
    
      for (let i = 0; i < numberOfplant; i++) {
        const plantId = data[i].id; // Định nghĩa plant_id
      const plantContainer = document.createElement('div');
      plantContainer.classList.add('plantContainer');

      const formModal = document.createElement('div');
      formModal.classList.add('formModal');

      const nameLabel = document.createElement('label');
      nameLabel.setAttribute('for', `plantName${plantId}`);
      nameLabel.textContent = 'Tên cây trồng: ';

      const nameInput = document.createElement('input');
      nameInput.setAttribute('type', 'text');
      nameInput.setAttribute('name', `plantName${plantId}`);
      nameInput.setAttribute('id', `plantName${plantId}`);//
      nameInput.value = data[i].name;

      formModal.appendChild(nameLabel);
      formModal.appendChild(nameInput);
      plantContainer.appendChild(formModal);

      const plantRow = document.createElement('div');
      plantRow.classList.add('row', 'plantRow');

      const devFormModal = document.createElement('div');
      devFormModal.classList.add('formModal', 'col-7');

      const devLabel = document.createElement('label');
      devLabel.setAttribute('for', `plantDev${plantId}`);
      devLabel.textContent = 'Thời gian phát triển: ';

      const devInput = document.createElement('input');
      devInput.setAttribute('type', 'number');
      devInput.setAttribute('name', `plantDev${plantId}`);
      devInput.setAttribute('id', `plantDev${plantId}`);
      devInput.value = data[i].timeDev;

      devFormModal.appendChild(devLabel);
      devFormModal.appendChild(devInput);
      plantRow.appendChild(devFormModal);

      const typeFormModal = document.createElement('div');
      typeFormModal.classList.add('formModal', 'col-4');

      const typeLabel = document.createElement('label');
      typeLabel.setAttribute('for', `plantType${plantId}`);
      typeLabel.textContent = 'Loại cây: ';

      const typeInput = document.createElement('input');
      typeInput.setAttribute('type', 'number');
      typeInput.setAttribute('name', `plantType${plantId}`);
      typeInput.setAttribute('id', `plantType${plantId}`);
      typeInput.value = data[i].type; 

      typeFormModal.appendChild(typeLabel);
      typeFormModal.appendChild(typeInput);
      plantRow.appendChild(typeFormModal);

      plantContainer.appendChild(plantRow);

      const ndModal = document.createElement('div');
      ndModal.classList.add('formModal');
      
      const ndLabel = document.createElement('label');
      ndLabel.setAttribute('for', `plantND${plantId}`);
      ndLabel.textContent = 'Khoáng chất: ';
      
      const ndInput = document.createElement('input');
      ndInput.setAttribute('type', 'text');
      ndInput.setAttribute('name', `plantND${plantId}`);
      ndInput.setAttribute('id', `plantND${plantId}`);
      ndInput.value = data[i].nd;
      
      ndModal.appendChild(ndLabel);
      ndModal.appendChild(ndInput);
      plantContainer.appendChild(ndModal);
      
      const bpModal = document.createElement('div');
      bpModal.classList.add('formModal');
      
      const bpLabel = document.createElement('label');
      bpLabel.setAttribute('for', `plantBP${plantId}`);
      bpLabel.textContent = 'Chu kỳ: ';
      
      const bpInput = document.createElement('input');
      bpInput.setAttribute('type', 'number');
      bpInput.setAttribute('name', `plantBP${plantId}`);
      bpInput.setAttribute('id', `plantBP${plantId}`);
      bpInput.value = data[i].bp;
      
      bpModal.appendChild(bpLabel);
      bpModal.appendChild(bpInput);
      plantContainer.appendChild(bpModal);
      
      // Tạo row và các cột
      const row = document.createElement('div');
      row.classList.add('row');
      
      const ndCol = document.createElement('div');
      ndCol.classList.add('col-7');
      ndCol.appendChild(ndModal);
      
      const bpCol = document.createElement('div');
      bpCol.classList.add('col-4');
      bpCol.appendChild(bpModal);
      
      row.appendChild(ndCol);
      row.appendChild(bpCol);
      row.style.marginBottom = '20px';
      
      plantContainer.appendChild(row);

      const buttonDel = document.createElement('button');
      buttonDel.classList.add('btn', 'btn-danger');
      buttonDel.innerHTML = '<i class="fa fa-trash-alt"></i>'

      

      // Gắn sự kiện onclick vào buttonDel
      buttonDel.addEventListener('click', function(event) {
        const clickedButton = event.target; // Truy cập button được click
        DeletePlant(event, plantId); // Gọi hàm DeletepLant với plant_id tương ứng
      });
      
      const buttonUp = document.createElement('button');
      buttonUp.classList.add('btn', 'btn-success');
      buttonUp.innerHTML = '<i class="fa fa-pencil-alt"></i>';
      
      buttonUp.addEventListener('click', function(event){
        const clickedButton = event.target;
        const plantid = document.getElementById(`plantName${plantId}`).value;
        const plantDev = document.getElementById(`plantDev${plantId}`).value;
        const plantType = document.getElementById(`plantType${plantId}`).value;
        const plantND = document.getElementById(`plantND${plantId}`).value;
        const plantBP = document.getElementById(`plantBP${plantId}`).value;
        const data = {
          plantid:plantid,
          plantDev:plantDev,
          plantType:plantType,
          plantND:plantND,
          plantBP:plantBP,
        }
        update_plant(event, plantId, data)
      });
      
      const divBut = document.createElement('div');
      divBut.classList.add('myButton');
      divBut.appendChild(buttonDel);
      divBut.appendChild(buttonUp);
      
      plantContainer.appendChild(divBut);



      // Hiển thị form trong container được chỉ định
      container.appendChild(plantContainer);
      }
    })
    .catch(error => {
      alert("Không thể lấy danh sách cây trồng:", error);
    });
}

// XOÁ
function DeleteSeason(event) {
  if (!selectedSeasonId) {
    // Nếu không có ID mùa vụ được chọn, không thực hiện xóa
    alert('Vui lòng chọn mùa vụ trước khi xóa');
    return;
  }

  // Hiển thị hộp thoại xác nhận
  const confirmation = confirm("Bạn có chắc chắn muốn xóa mùa vụ?");

  // Nếu người dùng xác nhận xóa
  if (confirmation) {
    // Gửi yêu cầu xóa mùa vụ đến API
    const url = `/api/delete-season/${selectedSeasonId}`;
    fetch(url, {
      method: 'DELETE'
    })
      .then((response) => {
        if (response.ok) {
          // Xóa thành công, thực hiện các hành động khác (nếu cần)
          alert('Mùa vụ đã được xóa thành công');

          // Load lại trang sau khi xóa thành công
          location.reload();
        } else {
          // Xử lý lỗi nếu xóa không thành công
          alert('Lỗi khi xóa mùa vụ');
        }
      })
      .catch((error) => {
        // Xử lý lỗi nếu có lỗi trong quá trình gửi yêu cầu xóa
        alert('Lỗi khi gửi yêu cầu xóa mùa vụ');
      });

    // Đặt lại giá trị của selectedSeasonId sau khi xóa
    selectedSeasonId = null;
  }
}

function DeleteLand(event, landId) {
  // Hiển thị hộp thoại xác nhận
  const confirmation = confirm("Bạn có chắc chắn muốn xóa mảnh đất?");

  // Nếu người dùng xác nhận xóa
  if (confirmation) {
    // Gửi yêu cầu xóa mảnh đất đến API
    const url = `/api/delete-land/${landId}/`;
    fetch(url, {
      method: 'DELETE'
    })
      .then((response) => {
        if (response.ok) {
          // Xóa thành công, thực hiện các hành động khác (nếu cần)
          alert('Mảnh đất đã được xóa thành công');

          // Load lại trang sau khi xóa thành công
          location.reload();
        } else {
          // Xử lý lỗi nếu xóa không thành công
          alert('Lỗi khi xóa mảnh đất');
        }
      })
      .catch((error) => {
        // Xử lý lỗi nếu có lỗi trong quá trình gửi yêu cầu xóa
        alert('Lỗi khi gửi yêu cầu xóa mảnh đất');
      });
  }
}

function UpdateLand(event, landID, data1){
  const confirmation = confirm("Bạn có chắc chắn muốn sửa thông tin mảnh đất?");
  const data = data1;
  if(confirmation){
    const url = `/api/update_land/${landID}/`;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json1'
      },
      body: JSON.stringify(data)
    })
      .then((response) => {
        if (response.ok) {
          // Xóa thành công, thực hiện các hành động khác (nếu cần)
          alert('Mảnh đất đã được sửa thành công');

          // Load lại trang sau khi xóa thành công
          location.reload();
        } else {
          // Xử lý lỗi nếu sửa không thành công
          alert('Lỗi khi sửa mảnh đất');
        }
      })
  }
}



function DeletePlant(event, plantID){
    // Hiển thị hộp thoại xác nhận
    const confirmation = confirm("Bạn có chắc chắn muốn xóa cây trồng?");

    // Nếu người dùng xác nhận xóa
    if (confirmation) {
      // Gửi yêu cầu xóa mảnh đất đến API
      const url = `/api/delete-plant/${plantID}/`;
      fetch(url, {
        method: 'DELETE'
      })
        .then((response) => {
          if (response.ok) {
            // Xóa thành công, thực hiện các hành động khác (nếu cần)
            alert('Cây trồng đã được xóa thành công');
  
            // Load lại trang sau khi xóa thành công
            location.reload();
          } else {
            // Xử lý lỗi nếu xóa không thành công
            alert('Lỗi khi xóa cây trồng');
          }
        })
        .catch((error) => {
          // Xử lý lỗi nếu có lỗi trong quá trình gửi yêu cầu xóa
          alert('Lỗi khi gửi yêu cầu xóa cây trồng');
        });
    }
}
//update plant
function update_plant(event, landID, data1){
  const confirmation = confirm("Bạn có chắc chắn muốn sửa thông tin mảnh đất?");
  const data = data1;
  if(confirmation){
    const url = `/api/update_plant/${landID}/`;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json2'
      },
      body: JSON.stringify(data)
    })
      .then((response) => {
        if (response.ok) {
          // Xóa thành công, thực hiện các hành động khác (nếu cần)
          alert('Thông tin cây đã được sửa thành công');

          // Load lại trang sau khi xóa thành công
          location.reload();
        } else {
          // Xử lý lỗi nếu sửa không thành công
          alert('Lỗi khi sửa thông tin cây');
        }
      })
  }
}
// CẬP NHẬT 


function UpdateSeason(event) {
  event.preventDefault(); // Ngăn chặn hành vi mặc định của form                                      

  if (!selectedSeasonId) {
    // Nếu không có ID mùa vụ được chọn, không thực hiện cập nhật
    alert('Vui lòng chọn mùa vụ trước khi cập nhật!');
    return;
  }

  // Lấy giá trị từ các trường input
  const seasonName = document.getElementById('name').value;
  const timeStart = document.getElementById('time_s').value;
  const timeEnd = document.getElementById('time_e').value;
  const profit = document.getElementById('num').value;


  


  // Tạo một đối tượng chứa dữ liệu cập nhật
  const data = {
    season_name: seasonName,
    time_start: timeStart,
    time_end: timeEnd,
    profit: profit,

  };




  // Xác nhận trước khi gửi yêu cầu cập nhật
  if (confirm('Bạn có chắc chắn muốn cập nhật thông tin mùa vụ không?')) {
    // Gửi yêu cầu cập nhật mùa vụ đến API
    const url = `/api/update-season/${selectedSeasonId}/`;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((response) => {
        if (response.ok) {
          // Cập nhật thành công, thực hiện các hành động khác (nếu cần)
          alert('Thay đổi thông tin thành công');

          // Load lại trang sau khi cập nhật thành công
          location.reload();
        } else {
          // Xử lý lỗi nếu cập nhật không thành công
          alert('Lỗi khi cập nhật thông tin');
        }
      })
      .catch((error) => {
        // Xử lý lỗi nếu có lỗi trong quá trình gửi yêu cầu cập nhật
        alert('Lỗi khi gửi yêu cầu cập nhật mùa vụ');
      });

    // Đặt lại giá trị của selectedSeasonId sau khi cập nhật
    selectedSeasonId = null;
  }
}








