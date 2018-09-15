"use strict"

const hobby = [
    "JavaScript and Coding",
    "Reading",
    "Travelling",
    "Singing and dancing"
]
const age = [
    "20 years old",
    "21 years old",
    "22 years old",
    "23 years old",
    "24 years old",
    "25 years old",
    "26 years old",
    "27 years old",
    "28 years old",
    "29 years old",
    "30 years old"

]
const food = [
    "Pizza",
    "Pasta",
    "Salad",
    "Chocolate",
    "Candies",
    "Hamburger"
]
const firstButton = document.querySelector("#first");
const lastButton = document.querySelector("#last");

const hobbyButton = document.querySelector("#hobby");
const infoContainer = document.querySelector(".info");
const tableBody = document.querySelector('.table-body');



let students = [];

document.addEventListener("DOMContentLoaded", init);

//Fetch data from student.json
function init() {
    fetch("student.json")
        .then(result => result.json())
        .then(json => createList(json));

    document.querySelectorAll("#filters a").forEach(element => element.addEventListener("click", clickedFilter));
}


//Use fetched data to add each student as an object to the array
function createList(data) {
    data.forEach(student => {
        const studentNames = student.split(" ");

        const firstName = studentNames[0];
        const lastNames = studentNames.slice(1);
        const lastNameString = lastNames.join(' ');
        const newStudent = new Student(firstName, lastNameString);



        // console.log(student);
        students.push(newStudent);
    });
    displayStudents(students);
    console.log(students);

};

function Student(first, last) {
    this.firstName = first;
    this.lastName = last;

}

Student.prototype.toString = function () {
    return this.firstName + " " + this.lastName;
};


//clone sth!!!!!!!

// function displayList(listOfStudents) {
//     console.log("Display list");
//     // clear the table
//     document.querySelector("table#tablebox tbody").innerHTML = "";

//     // foreach student in listOfStudents
//     listOfStudents.forEach(function (student) {
//         // clone a table-row for student
//         const clone = document.querySelector("#student_template").content.cloneNode(true);
//         const randomHobby = Math.floor(Math.random() * (hobby.length - 1));

//         // fill in the clone with data
//         clone.querySelector("[data-firstname]").textContent = student.firstName;
//         clone.querySelector("[data-lastname]").textContent = student.lastName;
//         clone.querySelector("[data-hobby]").textContent = hobby[randomHobby];

//         // append clone to table
//         document.querySelector("table#tablebox tbody").appendChild(clone);
//     })

// }

function displayStudents(toDisplay) {



    tableBody.innerHTML = "";
    toDisplay.forEach((elem, index) => {

        const randomHobby = Math.floor(Math.random() * (hobby.length - 1));


        tableBody.innerHTML += `
            <tr>
               
                <td>${elem.toString()}</td>
             
              
               
                <td>
                <span>${hobby[randomHobby]}</span>
                </td>
            <td>
                <button class='info-btn' type='button' data-target='${index}'>More info...</button>
    </td>
                <td>
                <button class='delete-btn' type='button' data-target='${index}'>X</button>
            </td>
            </tr>
        `;
    });

    addDeleteHandlers();
    AddInfo();
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

// filtering!!!!!

// document.querySelector("#js").addEventListener("click", function () {
//     clickedFilter();

// })

// function filterByHobby(hobby) {
//     const filteredStudents = students.filter(byHobby);

//     function byHobby(student) {
//         if (student.hobby === hobby) {
//             return true;
//         } else {
//             return false;
//         }
//     }

//     return filteredStudents;
// }

// function clickedFilter() {

//     console.log("clickedFilter");
//     const filter = this.data.filter; // references data-filter="____"


//     //create a list of filtered students by house 


//     //if filter is all let the list be all students
//     if (filter === "all") {
//         displayStudents(students);
//     } else {
//         const fileredList = filterByHobby(filter);
//         displayStudents(fileredList);
//     }
// }



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


function AddInfo() {
    const buttonElements = document.querySelectorAll('button.info-btn');
    // get a random age between 20 and 29

    buttonElements.forEach((btnElement) => {

        btnElement.addEventListener('click', function () {

            if (document.querySelector(".info").style.display === "none") {
                // x.style.display = "block";
                document.querySelector(".info").style.display = "block";

                const index = btnElement.getAttribute('data-target');
                const studentName = students[index].toString();
                const randomAge = Math.floor(Math.random() * (age.length - 1));
                const randomFood = Math.floor(Math.random() * (food.length - 1));

                // display student info
                infoContainer.innerHTML = `
                    <p>Info about the student:</p>
                    <p> Name: ${studentName} , ${age[randomAge]} and favourite food is: ${food[randomFood]}</p>
                 
                `;
            } else {
                document.querySelector(".info").style.display = "none";
            }

        });
        // x.style.display = "block";
        //document.querySelector(".info").style.display = "none";

    });
}