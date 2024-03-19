let students = [];

let studentCard = document.getElementById("student_card");

const loadStudents = async () => {
  students = await fetch("../data/students.json").then(
    async (response) => await response.json().then(({ students }) => students)
  );

  for (const student of students) {
    studentCard.innerHTML += `
      <div class="student-card">
        <div class="top-line"></div>
        <img
          src="../images/students/${student.image}"
          alt=""
          class="student-image"
        >
        <div class="student-detail">
          <p class="student-name">${student.name}</p>
          <p class="student-content">Role: ${student.role}</p>
          <p class="student-content">Uow ID: ${student.uow_id}</p>
        </div>
      </div>
    `;
  }
};

loadStudents();
