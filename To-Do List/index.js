// declerition
let missionInp = document.getElementById("mission-inp");
let addBtn = document.getElementById("add-btn");
let missions = document.getElementById("missions");
let delDoneOnly = document.getElementById("del-done");
let delAll = document.getElementById("del-all");
let confirmBtn = document.getElementById("confirm");
let isLocked = false;

onload = function () {
  let savedData = localStorage.getItem("myMissionsHTML");
  if (savedData) {
    missions.innerHTML = savedData;
  }
};

function updateLocalStorage() {
  localStorage.setItem("myMissionsHTML", missions.innerHTML);
}

// toDoFunction
function toDo() {
  let p = document.createElement("p");
  let mission = document.createElement("div");
  let doneBtn = document.createElement("button");
  let delBtn = document.createElement("button");
  let btns = document.createElement("div");

  mission.classList.add("mission");
  doneBtn.classList.add("btn");
  doneBtn.classList.add("done-btn");
  delBtn.classList.add("btn");
  delBtn.classList.add("del-btn");

  doneBtn.innerHTML = "Done";
  delBtn.innerHTML = "Delete";
  p.classList.add("the-mission-p");
  missions.appendChild(mission);
  btns.append(doneBtn, delBtn);
  mission.append(p, btns);

  p.innerHTML = missionInp.value;
  missionInp.value = "";

  updateLocalStorage();
}

// showErrorFunction
function showError() {
  let errorMesssage = document.getElementById("error-message");
  if (errorMesssage.classList.contains("hide")) {
    errorMesssage.classList.remove("hide");
  }
  errorMesssage.classList.add("show");
  setTimeout(function () {
    errorMesssage.classList.remove("show");
    errorMesssage.classList.add("hide");
  }, 3000);
}

// addBtnEventAndkeyboard
addBtn.addEventListener("click", () => {
  if (missionInp.value.trim() == "") showError();
  else {
    toDo();
  }
});

missionInp.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    if (missionInp.value.trim() == "") showError();
    else {
      toDo();
    }
  }
});

// deleteBtn
missions.addEventListener("click", function (e) {
  let delBtn = e.target.closest(".del-btn");
  if (!delBtn) return;

  let mission = delBtn.closest(".mission");
  mission.classList.add("delete");

  setTimeout(function () {
    mission.remove();
    updateLocalStorage();
  }, 300);
});

// doneBtn
missions.addEventListener("click", function (e) {
  let doneBtn = e.target.closest(".done-btn");
  if (!doneBtn) return;
  if (isLocked === true) showError();

  let mission = doneBtn.closest(".mission");
  let p = mission.querySelector(".the-mission-p");
  let originalText = p.textContent;

  if (mission.classList.contains("done") === false) {
    p.textContent = "Done ✔️";
    setTimeout(() => {
      p.textContent = originalText;
      mission.classList.toggle("done");
      updateLocalStorage();
    }, 450);
  } else {
    mission.classList.remove("done");
    updateLocalStorage();
  }

  isLocked = true;
  setTimeout(() => {
    isLocked = false;
  }, 700);
});

// deleteAll
confirmBtn.addEventListener("click", function () {
  if (delAll.checked === false && delDoneOnly.checked === false)
    return showError();

  if (delAll.checked === true && delDoneOnly.checked === true) {
    delAll.checked = false;
    delDoneOnly.checked = false;
    return showError();
  }

  if (delAll.checked === true) {
    let allMissions = document.querySelectorAll(".mission");
    allMissions.forEach((mission) => {
      mission.classList.add("delete");
      setTimeout(() => {
        mission.remove();
        updateLocalStorage();
      }, 500);
    });
    delAll.checked = false;
  }

  if (delDoneOnly.checked === true) {
    let doneMissions = document.querySelectorAll(".done");
    doneMissions.forEach((mission) => {
      mission.classList.add("delete");
      setTimeout(() => {
        mission.remove();
        updateLocalStorage();
      }, 500);
    });
    delDoneOnly.checked = false;
  }
});
