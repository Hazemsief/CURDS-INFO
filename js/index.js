var Name = document.getElementById('Name');
var Address = document.getElementById('Address');
var Age = document.getElementById('Age');
var Email = document.getElementById('Email');
var AddBtn = document.getElementById('AddBtn');
var ResetBtn = document.getElementById('ResetBtn');
var search = document.getElementById('search');
var info_list = document.getElementById('info_list');

allInformation = [];
var CurrentIndex = -1;

ResetBtn.onclick = clearInputs;


if (localStorage.getItem('allInformation') !== null) {
    allInformation = JSON.parse(localStorage.getItem('allInformation'));
    Display();
}

AddBtn.addEventListener('click', handleSubmit);

function handleSubmit(e) {
    e.preventDefault();
    if (Validationform()) {
        if (AddBtn.innerHTML.trim() === 'Add') {
            addClient();
        } else {
            updateClient();
        }
    }
}

// Add new client
function addClient() {
    var client = {
        Name: Name.value,
        Age: Age.value,
        Address: Address.value,
        Email: Email.value,
    };

    allInformation.push(client);
    localStorage.setItem('allInformation', JSON.stringify(allInformation));
    Display();
    clearInputs();
}

// Update existing client
function updateClient() {
    var client = allInformation[CurrentIndex];
    client.Name = Name.value;
    client.Age = Age.value;
    client.Address = Address.value;
    client.Email = Email.value;

    localStorage.setItem('allInformation', JSON.stringify(allInformation));
    Display();
    clearInputs();

    AddBtn.innerHTML = 'Add';
    CurrentIndex = -1;
}

function clearInputs() {
    Name.value = "";
    Age.value = "";
    Email.value = "";
    Address.value = "";
}

function Display() {
    var box = ``;
    for (var i = 0; i < allInformation.length; i++) {
        box +=
        `<tr>
            <td class="border border-white p-2">${allInformation[i].Name}</td>
            <td class="border border-white p-2">${allInformation[i].Age}</td>
            <td class="border border-white p-2">${allInformation[i].Address}</td>
            <td class="border border-white p-2">${allInformation[i].Email}</td>
            <td class="border border-white p-2">
                <a href="#" class="btn btn-warning btn-sm edit" onclick="editItem(${i})">
                <i class="fa-regular fa-pen-to-square"></i>
                Edit
                </a>
                <a href="#" class="btn btn-danger btn-sm delete" onclick="deleteItem(${i})">
                <i class="fa-solid fa-trash"></i>
                Delete
                </a>
            </td>
        </tr>`;
    }
    info_list.innerHTML = box;
}

function deleteItem(index) {
    allInformation.splice(index, 1);
    localStorage.setItem('allInformation', JSON.stringify(allInformation));
    Display();
    clearInputs();
}

function editItem(index) {
    var client = allInformation[index];
    Name.value = client.Name;
    Age.value = client.Age;
    Address.value = client.Address;
    Email.value = client.Email;
    AddBtn.innerHTML = 'Update';
    CurrentIndex = index;
}

// Validation
function Validationform(){
    var nameValue = Name.value.trim();
    var ageValue = Age.value.trim();
    var addressValue = Address.value.trim();
    var emailValue = Email.value.trim();
    var isValid = true;

    if(nameValue === ""){
        alert('Name is required');
        isValid = false;
    }else if(!validateName(nameValue)){
        alert('Name must start by capital letter');
        isValid = false;
    }
    if(ageValue === ""){
        alert('Age is required');
        isValid = false;
    } else if(Number(ageValue) < 1){
        alert('Age must be a positive number');
        isValid = false;
    }
    if(addressValue === ""){
        alert('Address is required');
        isValid = false;
    }
    if (emailValue === "") {
        alert('Email is required');
        isValid = false;
    } else if (!validateEmail(emailValue)) {
        alert('Invalid email format');
        isValid = false;
    }
    
    return isValid;
}

function validateName(name){
    var regex = /^[A-Z][a-zA-Z]*$/;
    return regex.test(name);
}

function validateEmail(email) {
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

search.addEventListener('input', searchProduct);

function searchProduct() {
    var searchValue = search.value.toLowerCase();
    var box = ``;
    for(var i = 0; i < allInformation.length; i++){
        if(allInformation[i].Name.toLowerCase().includes(searchValue)){
            box +=
            `<tr>
                <td class="border border-white p-2">${allInformation[i].Name}</td>
                <td class="border border-white p-2">${allInformation[i].Age}</td>
                <td class="border border-white p-2">${allInformation[i].Address}</td>
                <td class="border border-white p-2">${allInformation[i].Email}</td>
                <td class="border border-white p-2">
                    <a href="#" class="btn btn-warning btn-sm edit" onclick="editItem(${i})">
                    <i class="fa-regular fa-pen-to-square"></i>
                    Edit
                    </a>
                    <a href="#" class="btn btn-danger btn-sm delete" onclick="deleteItem(${i})">
                    <i class="fa-solid fa-trash"></i>
                    Delete
                    </a>
                </td>
            </tr>`;
        }
    }
    info_list.innerHTML = box;
}