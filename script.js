document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
});

// Variables para almacenar datos
let embarques = [];
let logs = [];

// Manejar el inicio de sesión
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    document.getElementById('loginContainer').style.display = 'none';
    document.getElementById('appContainer').style.display = 'block';
    document.getElementById('viewLogsButton').style.display = 'block';
});

// Agregar embarque
document.getElementById('costForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const unitCost = parseFloat(document.getElementById('unitCost').value);
    const transportCost = parseFloat(document.getElementById('transportCost').value);
    const numUnits = parseInt(document.getElementById('numUnits').value);
    const timestamp = new Date().toLocaleString();

    const embarque = {
        id: embarques.length + 1,
        unitCost,
        transportCost,
        numUnits,
        date: timestamp,
        suggestedPrice: (unitCost + transportCost / numUnits).toFixed(2)
    };

    embarques.push(embarque);
    logs.push({ timestamp, user: 'admin', change: 'Agregó un embarque' });
    updateTable();
});

// Actualizar la tabla de embarques
function updateTable() {
    const tbody = document.getElementById('embarcTableBody');
    tbody.innerHTML = '';
    embarques.forEach(embarque => {
        const row = `<tr>
            <td>${embarque.id}</td>
            <td>${embarque.unitCost}</td>
            <td>${embarque.transportCost}</td>
            <td>${embarque.numUnits}</td>
            <td>${embarque.date}</td>
            <td>${embarque.suggestedPrice}</td>
            <td><button class="btn waves-effect waves-light" onclick="editEmbarque(${embarque.id})">Editar</button></td>
        </tr>`;
        tbody.innerHTML += row;
    });
}

// Editar embarque
function editEmbarque(id) {
    const embarque = embarques.find(e => e.id === id);
    document.getElementById('unitCost').value = embarque.unitCost;
    document.getElementById('transportCost').value = embarque.transportCost;
    document.getElementById('numUnits').value = embarque.numUnits;
    logs.push({ timestamp: new Date().toLocaleString(), user: 'admin', change: `Editó el embarque ID: ${id}` });
    updateTable();
}

// Ver logs
document.getElementById('viewLogsButton').addEventListener('click', function() {
    const logsTable = document.getElementById('logsTableBody');
    logsTable.innerHTML = '';
    logs.forEach(log => {
        const row = `<tr>
            <td>${log.timestamp}</td>
            <td>${log.user}</td>
            <td>${log.change}</td>
        </tr>`;
        logsTable.innerHTML += row;
    });
    document.getElementById('logsTable').style.display = 'block';
});
