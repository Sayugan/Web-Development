document.getElementById("btn_back").addEventListener("click", (e) => {
  e.preventDefault();
  window.history.back();
});

const loadStudentDetails = async () => {
  let name = document.getElementById("full_name");
  let uowID = document.getElementById("uow_id");
  let iitID = document.getElementById("iit_id");
  let role = document.getElementById("role");
  let tasks = document.getElementById("tasks");

  let studentRole = localStorage.getItem("studentRole");

  if (studentRole === null) {
    window.location.href = "../index.html";

  }

  let student = await fetch("../data/students.json").then(
    async (response) =>
      await response
        .json()
        .then(({ students }) =>
          students.find(({ role }) => role == studentRole)
        )
  );

  name.innerHTML = `${student.name} ${student.surname}`;
  uowID.innerHTML = student.uow_id;
  iitID.innerHTML = student.iit_id;
  role.innerHTML = `Student ${student.role}`;

  for (let [i, task] of student.tasks.entries()) {
    tasks.innerHTML += `
        <p class="task-link">
            <a href="${studentRole ? task.link : "../index.html"}">
                <span>${task.title}</span>
            </a>
        </p>
        <ul id="description_${i}" class="task-list"></ul>        
        <hr>
    `;

    let ul = document.getElementById(`description_${i}`);
    
    for (let description of task.descriptions) {
      ul.innerHTML += `<li class="task-list-item">${description}</li>`;
    }
  }
};

loadStudentDetails();
