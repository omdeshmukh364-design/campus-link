let student = null;

function showSignup() {
  document.getElementById("login-section").classList.add("hidden");
  document.getElementById("signup-section").classList.remove("hidden");
}

function showLogin() {
  document.getElementById("signup-section").classList.add("hidden");
  document.getElementById("login-section").classList.remove("hidden");
}

function signup() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  localStorage.setItem("student", JSON.stringify({ name, email, password }));
  alert("Signup successful! Please login.");
  showLogin();
}

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const storedStudent = JSON.parse(localStorage.getItem("student"));

  if (storedStudent && storedStudent.email === email && storedStudent.password === password) {
    student = storedStudent;
    document.getElementById("studentName").innerText = student.name;
    document.getElementById("login-section").classList.add("hidden");
    document.getElementById("dashboard").classList.remove("hidden");
    loadCommunities();
    loadNotifications();
  } else {
    alert("Invalid credentials!");
  }
}

// Dummy Communities
function loadCommunities() {
  const communities = [
    { id: 1, name: "AI & ML Club" },
    { id: 2, name: "Cultural Committee" },
    { id: 3, name: "Sports Club" },
    { id: 4, name: "Entrepreneurship Cell" }
  ];

  const list = document.getElementById("community-list");
  list.innerHTML = "";

  communities.forEach(c => {
    const li = document.createElement("li");
    li.innerHTML = `${c.name} <button class="btn-primary" onclick="joinCommunity('${c.name}')">Join</button>`;
    list.appendChild(li);
  });
}

function joinCommunity(name) {
  alert(`🎉 You have joined ${name}!`);
}

// Dummy Notifications
function loadNotifications() {
  const notifications = [
    { date: "2025-09-14", title: "📢 Mid-Semester Exams announced" },
    { date: "2025-09-10", title: "🎭 Cultural Fest registrations open" },
    { date: "2025-09-05", title: "📚 Library extended hours for exam prep" }
  ];

  const notifList = document.getElementById("notifications-list");
  notifList.innerHTML = "";

  notifications.forEach(n => {
    const p = document.createElement("p");
    p.innerText = `${n.date} - ${n.title}`;
    notifList.appendChild(p);
  });
}
