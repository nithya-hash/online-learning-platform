const BASE_URL = "https://online-learning-platform-1-9suf.onrender.com";

// LOGIN
document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (data.token) {
    localStorage.setItem("token", data.token);
    window.location.href = "dashboard.html";
  } else {
    alert(data.message);
  }
});

// LOAD COURSES
async function loadCourses() {
  const res = await fetch(`${BASE_URL}/api/courses`);
  const courses = await res.json();

  const div = document.getElementById("courseList");
  div.innerHTML = "";

  courses.forEach(c => {
    div.innerHTML += `
      <div class="card p-3 m-2 shadow text-white">
        <h4>${c.title}</h4>
        <p>${c.description}</p>

        <button class="btn btn-success m-1" onclick="enroll('${c._id}')">
          Enroll
        </button>

        <button class="btn btn-info m-1" onclick="generateCertificate('${c.title}')">
          Certificate
        </button>
      </div>
    `;
  });
}

// ENROLL
async function enroll(courseId) {
  const res = await fetch(`${BASE_URL}/api/courses/enroll/${courseId}`, {
    method: "POST"
  });

  const data = await res.json();
  alert(data.message);
}

// LOGOUT
function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}

// PDF CERTIFICATE
function generateCertificate(courseName) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.text("Certificate of Completion", 20, 30);

  doc.setFontSize(14);
  doc.text("This certifies that", 20, 50);

  doc.setFontSize(18);
  doc.text("Sandhya", 20, 70);

  doc.setFontSize(14);
  doc.text("has completed", 20, 90);

  doc.setFontSize(16);
  doc.text(courseName, 20, 110);

  doc.save("certificate.pdf");
}