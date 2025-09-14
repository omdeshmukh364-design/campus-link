// Dummy student data
let student = null;

// Show signup form
function showSignup() {
  document.getElementById("login-section").classList.add("hidden");
  document.getElementById("signup-section").classList.remove("hidden");
}

// Show login form
function showLogin() {
  document.getElementById("signup-section").classList.add("hidden");
  document.getElementById("login-section").classList.remove("hidden");
}

// Signup function (stores data in localStorage)
function signup() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  localStorage.setItem("student", JSON.stringify({ name, email, password }));
  alert("Signup successful! Please login.");
  showLogin();
}

// Login function
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

// Load communities (dummy data)
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
    li.innerHTML = `${c.name} <button onclick="joinCommunity('${c.name}')">Join</button>`;
    list.appendChild(li);
  });
}

// Join community
function joinCommunity(name) {
  alert(`You have joined ${name}!`);
}

// Load notifications (dummy API simulation)
function loadNotifications() {
  const notifications = [
    { date: "2025-09-14", title: "Mid-Semester Exams announced" },
    { date: "2025-09-10", title: "Cultural Fest registrations open" },
    { date: "2025-09-05", title: "Library extended hours for exam prep" }
  ];

  const notifList = document.getElementById("notifications-list");
  notifList.innerHTML = "";

  notifications.forEach(n => {
    const p = document.createElement("p");
    p.innerText = `${n.date} - ${n.title}`;
    notifList.appendChild(p);
  });
}
