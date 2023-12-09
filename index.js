var userInput = [];
var api =
  "https://gateway.holdstation.com/services/launchpad/api/staking/wallets?list=";

// function returnText() {
//   var input = document.getElementById("UserInput").value;
//   var inputArray = input.split(",");
//   console.log(inputArray);
//   for (let key of inputArray) {
//     var api_key = api + key;
//     console.log(key);
//     fetch(api_key)
//       .then((res) => {
//         if (res.status == 200) {
//           return (a = res.json());
//         } else {
//           return (a = 0);
//         }
//       })
//       .then((data) => {
//         if (a == 0) {
//           // False
//           return console.log(`Error to find address ${key}`);
//         } else {
//           // True
//           return console.log(data);
//         }
//       });
//     console.log(key);
//     console.log("++++++++++++++++++++++++");
//   }
// }

async function returnText() {
  var input = document.getElementById("UserInput").value;
  var inputArray = input.split(",");
  console.log(input);

  var resultTable = document.getElementById("resultTable");

  resultTable.innerHTML = "";
  // Tạo header cho bảng
  var headerRow = document.createElement("tr");

  var addressHeader = document.createElement("th");
  addressHeader.textContent = "Address";
  headerRow.appendChild(addressHeader);

  var pendingRewardHeader = document.createElement("th");
  pendingRewardHeader.textContent = "Pending Reward";
  headerRow.appendChild(pendingRewardHeader);

  var harvestedRewardHeader = document.createElement("th");
  harvestedRewardHeader.textContent = "Harvested Reward";
  headerRow.appendChild(harvestedRewardHeader);

  // Thêm header vào bảng
  resultTable.appendChild(headerRow);

  for (let key of inputArray) {
    var api_key = api + key;
    console.log(key);

    try {
      const res = await fetch(api_key);
      if (res.status == 200) {
        const data = await res.json();

        // Tạo dòng mới cho mỗi dữ liệu JSON
        var dataRow = document.createElement("tr");

        var addressCell = document.createElement("td");
        addressCell.textContent = data[0].address;
        dataRow.appendChild(addressCell);

        var pendingRewardCell = document.createElement("td");
        pendingRewardCell.textContent = data[0].pendingReward;
        dataRow.appendChild(pendingRewardCell);

        var harvestedRewardCell = document.createElement("td");
        harvestedRewardCell.textContent = data[0].harvestedReward;
        dataRow.appendChild(harvestedRewardCell);

        // Thêm dòng vào bảng
        resultTable.appendChild(dataRow);
      } else {
        alert(`Cannot to find address: ${key}`);
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  console.log("All requests completed");
}
