"use strict";

window.addEventListener("DOMContentLoaded", start);

const allStudents = [];
const Student = {
  first_name: "",
  nick_name: "",
  middle_name: "",
  last_name: "",
  gender: "unknown",
  house: "",
  image: ""
};

function start() {
  // console.log("ready");

  loadJSON();
}

const link = "https://petlatkea.dk/2021/hogwarts/students.json";

function loadJSON() {
  fetch(link)
    .then((response) => response.json())
    .then((jsonData) => {
      // when loaded, prepare objects
      // console.log(jsonData);
      prepareObjects(jsonData);
      displayList();
    });
}

//function showMiddleName(str) {
//if (middleName.includes(‘“‘) ) {
function capitalize(str) {
  const result = str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
  return result;
}

function capitalizeName(name) {
  if (name.includes("-")) {
    let names = name.split("-");
    return capitalize(names[0]) + "-" + capitalize(names[1]);
  } else {
    return capitalize(name);
  }
}

function findMiddleName(names) {
  if (names.length > 2) {
    return names[1];
  } else {
    return "";
  }
}

function prepareObjects(jsonData) {
  jsonData.forEach((jsonObject) => {
    //Create new object with cleaned data - and store that in the allStudents array
    const student = parseStudent(jsonObject);
    allStudents.push(student);
  });
}

function parseStudent(jsonObject) {
  const student = Object.create(Student);

  let removeWhiteSpace = jsonObject.fullname.trim();
  let house = jsonObject.house.trimStart();
  let gender = jsonObject.gender;

  let names = removeWhiteSpace.split(" "); // array

  student.first_name = capitalize(names[0]);
  student.last_name = capitalizeName(names[names.length - 1]);

  if (names.length > 2) {
    let secondname = names[1];
    if (secondname.includes('"')) {
      student.nick_name = secondname.replaceAll('"', "");
    } else {
      student.middle_name = capitalize(secondname);
    }
  }
  //student.middle_name = capialize
  //if (str.includes("-")) {capataize} else {}
  student.gender = capitalize(gender);
  student.house = capitalize(house);

  return student;
}

function parseStudent(jsonObject) {
  const student = Object.create(Student);

  let removeWhiteSpace = jsonObject.fullname.trim();
  let house = jsonObject.house.trimStart();
  let gender = jsonObject.gender;

  let names = removeWhiteSpace.split(" "); // array

  student.first_name = capitalize(names[0]);
  student.last_name = capitalizeName(names[names.length - 1]);

  if (names.length > 2) {
    let secondname = names[1];
    if (secondname.includes('"')) {
      student.nick_name = secondname.replaceAll('"', "");
    } else {
      student.middle_name = capitalize(secondname);
    }
  }
  //student.middle_name = capialize
  //if (str.includes("-")) {capataize} else {}
  student.gender = capitalize(gender);
  student.house = capitalize(house);

  return student;
}

function displayList() {
  // clear the list
  document.querySelector("#list tbody").innerHTML = "";

  // build a new list
  allStudents.forEach(displayStudent);
}

function displayStudent(student) {
  // create clone
  const clone = document.querySelector("template#student").content.cloneNode(true);

  // set clone data
  clone.querySelector("[data-field=first_name]").textContent = student.first_name;
  clone.querySelector("[data-field=nick_name]").textContent = student.nick_name;
  clone.querySelector("[data-field=middle_name]").textContent = student.middle_name;
  clone.querySelector("[data-field=last_name]").textContent = student.last_name;
  clone.querySelector("[data-field=gender]").textContent = student.gender;
  clone.querySelector("[data-field=house]").textContent = student.house;
  clone.querySelector("[data-field=image]").src = student.image;

  // append clone to list
  document.querySelector("#list tbody").appendChild(clone);
}
