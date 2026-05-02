const BASE_URL = "https://online-learning-platform-1-9suf.onrender.com";

// REGISTER
document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    name: name.value,
    email: email.value,
    password: password.value
  };

  const res = await fetch(`${BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  const result = await res.json();
  alert(result.message);
});

// LOGIN
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: loginEmail.value,
      password: loginPassword.value
    })
  });

  const data = await res.json();

  if (data.token) {
    localStorage.setItem("token", data.token);
    alert("Login success");
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
      <div>
        <h3>${c.title}</h3>
        <p>${c.description}</p>
        <button onclick="enroll('${c._id}')">Enroll</button>
      </div>
    `;
  });
}

// ENROLL
async function enroll(courseId) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/api/courses/enroll/${courseId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    }
  });

  const data = await res.json();
  alert(data.message);
}