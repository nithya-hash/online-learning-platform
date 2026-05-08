const BASE_URL = "https://online-learning-platform-1-9suf.onrender.com";
console.log("JS WORKING");

// REGISTER
async function register() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password })
  });

  const data = await res.json();
  alert(data.message);

  window.location.href = "login.html";
}

// LOGIN
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  console.log("LOGIN:", data);

  if (data.message === "Login success") {
    localStorage.setItem("user", JSON.stringify(data.user));  // ✅ IMPORTANT
    const userCheck = localStorage.getItem("user");

if (!userCheck) {
  window.location.href = "/login.html";
}
    window.location.href = "/dashboard.html";
  } else {
    alert("Login failed");
  }
}

// LOAD COURSES
async function loadCourses() {
  const res = await fetch(`${BASE_URL}/api/courses`);
  const courses = await res.json();

  let html = "";

  courses.forEach(c => {
    html += `
      <div class="course-card">
        <h3>${c.title}</h3>
        <p>${c.description}</p>
        <button onclick="enroll('${c.title}')">Enroll</button>
      </div>
    `;
  });

  document.getElementById("courses").innerHTML = html;
}
async function enroll(courseId) {

  const userData = localStorage.getItem("user");

  if (!userData || userData === "undefined") {
    alert("Please login first");
    window.location.href = "/login.html";
    return;
  }

  const user = JSON.parse(userData);

  const res = await fetch(`${BASE_URL}/api/users/enroll`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: user.email,
      course: courseId
    })
  });

  const data = await res.json();
  console.log(data);

  alert("Enrolled successfully!");
}

function generateCertificate() {
  const name = document.getElementById("name").value;

  if (!name) {
    alert("Enter your name");
    return;
  }

  document.getElementById("certName").innerText = name;
  document.getElementById("certificateBox").style.display = "block";
}

async function downloadPDF() {
  const { jsPDF } = window.jspdf;

  const element = document.getElementById("certificateBox");

  const canvas = await html2canvas(element);
  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF();
  pdf.addImage(imgData, "PNG", 10, 10, 180, 100);
  pdf.save("certificate.pdf");
}
function showCertificate() {
  document.getElementById("courses").style.display = "none";
  document.getElementById("certificateSection").style.display = "block";
}

function logout() {
  localStorage.clear();
  window.location.href = "/login.html";
}

// DOWNLOAD
function downloadCertificate() {
  const name = document.getElementById("username").value;

  const blob = new Blob([`Certificate for ${name}`], { type: "text/plain" });

  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "certificate.txt";
  a.click();
}

// LOGOUT
function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}
if (window.location.pathname.includes("dashboard.html")) {
  loadCourses();
}
function safeParse(data) {
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}
if (user && document.getElementById("welcome")) {
  document.getElementById("welcome").innerText = "Welcome " + user.name;
}