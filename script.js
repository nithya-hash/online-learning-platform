// REGISTER
function register() {

  const name = document.getElementById("name").value;

  const email = document.getElementById("email").value;

  const password = document.getElementById("password").value;

  const user = {
    name,
    email,
    password
  };

  localStorage.setItem("user", JSON.stringify(user));

  alert("Registration Successful");

  window.location.href = "login.html";

}



// LOGIN
function login() {

  const email = document.getElementById("email").value;

  const password = document.getElementById("password").value;

  const user = JSON.parse(localStorage.getItem("user"));

  if (
    user &&
    user.email === email &&
    user.password === password
  ) {

    alert("Login Successful");

    window.location.href = "dashboard.html";

  } else {

    alert("Invalid Email or Password");

  }

}



// LOAD COURSES
function loadCourses() {

  const coursesDiv = document.getElementById("courses");

  if (!coursesDiv) return;

  const courses = [

    {
      title: "Python Full Stack",
      description: "Learn Python from basics"
    },

    {
      title: "MERN Stack",
      description: "MongoDB Express React Node"
    },

    {
      title: "UI UX Design",
      description: "Master Figma Design"
    }

  ];

  coursesDiv.innerHTML = "";

  courses.forEach(course => {

    coursesDiv.innerHTML += `

      <div class="course-card">

        <h3>${course.title}</h3>

        <p>${course.description}</p>

        <button onclick="enroll('${course.title}')">
          Enroll
        </button>

        <button onclick="downloadCertificate('${course.title}')">
          Certificate
        </button>

      </div>

    `;

  });

}



// ENROLL
function enroll(course) {

  alert("Enrolled in " + course);

}



// CERTIFICATE
function downloadCertificate(course) {

  const user = JSON.parse(localStorage.getItem("user"));

  const studentName = user?.name || "Student";

  const element = document.createElement("a");

  const file = new Blob(
    [
      "CERTIFICATE OF COMPLETION\n\n" +
      "This certifies that\n\n" +
      studentName +
      "\n\nhas successfully completed\n\n" +
      course
    ],
    { type: "text/plain" }
  );

  element.href = URL.createObjectURL(file);

  element.download = "certificate.txt";

  document.body.appendChild(element);

  element.click();

}



// LOGOUT
function logout() {

  window.location.href = "login.html";

}



// AUTO LOAD
loadCourses();