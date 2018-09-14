"use strict"

const hobby = [
    "JavaScript",
    "Reading",
    "Coding",
    "Travelling",
    "Cooking",
    "Painting",
    "Singing and dancing"
]
const firstButton = document.querySelector("#first");
const lastButton = document.querySelector("#last");
const infoContainer = document.querySelector(".info");
const tableBody = document.querySelector('.table-body');



let students = [];

document.addEventListener("DOMContentLoaded", init);

//Fetch data from student.json
function init() {
    fetch("student.json")
        .then(result => result.json())
        .then(json => createList(json));
}


//Use fetched data to add each student as an object to the array
function createList(data) {
    data.forEach(student => {
        const studentNames = student.split(" ");

        const firstName = studentNames[0];
        const lastNames = studentNames.slice(1);
        const lastNameString = lastNames.join(' ');
        const newStudent = new Student(firstName, lastNameString);

        //  !!!!!!

        // const randomAge = Object.keys(age)[Math.floor(Math.random()) * Object.keys(age).length];
        // student.age = randomAge;





        // console.log(student);
        students.push(newStudent);
    });
    displayStudents(students);
    console.log(students);

};

function Student(first, last) {
    this.firstName = first;
    this.lastName = last;
    //this.age = randomAge;
}

Student.prototype.toString = function () {
    return this.firstName + " " + this.lastName;
};



//clone sth!!!!!!!
function displayStudents(toDisplay) {



    tableBody.innerHTML = "";
    toDisplay.forEach((elem, index) => {
        const random = parseInt(Math.random() * 10 + 19);

        const randomHobby = Math.floor(Math.random() * (hobby.length - 1));


        tableBody.innerHTML += `
            <tr>
               
                <td>${elem.toString()}</td>
             
                <td>
                    <button class='delete-btn' type='button' data-target='${index}'>X</button>
                </td>
                <td>
                <span>${random}</span>
                </td>
                <td>
                <span>${hobby[randomHobby]}</span>
                </td>
            </tr>
        `;
    });

    addDeleteHandlers();
    addInfoHandlers();
}

//Eventlistener First Name/Last Name sorting button

firstButton.addEventListener("click", function () {
    orderByName("firstName");
});

lastButton.addEventListener("click", function () {
    orderByName("lastName");
});

function orderByName(nameChoice) {
    const sortedStudent = students.sort(sortName(nameChoice));
    displayStudents(sortedStudent);
    console.log(students);
}

function sortName(nameChoice) {
    return function (a, b) {
        return a[nameChoice] > b[nameChoice] ? 1 : -1;
    }
}

function addDeleteHandlers() {
    const buttonElements = document.querySelectorAll('button.delete-btn');

    buttonElements.forEach((btnElement) => {
        btnElement.addEventListener('click', function () {
            const index = btnElement.getAttribute('data-target');

            // remove the student
            students.splice(index, 1);
            displayStudents(students);
        });
    });
}

function addInfoHandlers() {
    const buttonElements = document.querySelectorAll('button.info-btn');

    buttonElements.forEach((btnElement) => {
        btnElement.addEventListener('click', function () {
            const index = btnElement.getAttribute('data-target');
            const studentName = students[index].toString();



        });
    });
}