const API_URL = "https://jtutor.app/1000/users";
const reloadBtn = document.getElementById("reload");
const quizDataTable = document.getElementById("quizDataTable");
const tbody = quizDataTable.getElementsByTagName("tbody")[0];

function loadData() {
    fetch(API_URL)
        .then((response) => response.json())
        .then((data) => {
            renderTable(data);
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
}

function renderTable(data) {
    tbody.innerHTML = "";
    data.forEach((item) => {
        const row = tbody.insertRow();
        row.insertCell().innerHTML = item.name;
        row.insertCell().innerHTML = item.score;
        row.insertCell().innerHTML = item.nodesOrdered;
        row.insertCell().innerHTML = item.attempts;
        row.insertCell().innerHTML = item.progress+"%";
    });
}

reloadBtn.addEventListener("click", loadData);
loadData();
setInterval(loadData, 10000);
