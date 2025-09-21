let user = null;
let communities = []; // Start with an empty array

function showSignup() {
  document.getElementById("login-section").classList.add("hidden");
  document.getElementById("signup-section").classList.remove("hidden");
}

function showLogin() {
  document.getElementById("signup-section").classList.add("hidden");
  document.getElementById("login-section").classList.remove("hidden");
}

function signup() {
  const role = document.getElementById("signup-role").value;
  const name = document.getElementById("name").value;
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  localStorage.setItem("user", JSON.stringify({ role, name, email, password }));
  alert("Signup successful! Please login.");
  showLogin();
}

function login() {
  const role = document.getElementById("role").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (storedUser && storedUser.email === email && storedUser.password === password && storedUser.role === role) {
    user = storedUser;
    document.getElementById("studentName").innerText = `${user.name} (${user.role})`;
    document.getElementById("login-section").classList.add("hidden");
    document.getElementById("dashboard").classList.remove("hidden");

    // Show "Add Community" only if Teacher
    if (user.role === "teacher") {
      document.getElementById("addCommunityCard").classList.remove("hidden");
    }

    loadCommunities();
  } else {
    alert("Invalid credentials!");
  }
}

function loadCommunities() {
  const list = document.getElementById("community-list");
  list.innerHTML = "";

  if (communities.length === 0) {
    list.innerHTML = "<li>No communities yet. Teachers can create one!</li>";
    return;
  }

  communities.forEach(c => {
    const li = document.createElement("li");
    li.innerHTML = `${c.name} <span style="font-size:12px; color:#666;">(Founder: ${c.founder})</span> 
      <button class="btn-primary" onclick="joinCommunity('${c.name}')">Join</button>`;
    list.appendChild(li);
  });
}

function joinCommunity(name) {
  alert(`🎉 You have joined ${name}!`);
}

function addCommunity() {
  if (user.role !== "teacher") {
    alert("❌ Only teachers can create communities.");
    return;
  }

  const newCommunity = document.getElementById("newCommunity").value;
  if (newCommunity.trim() !== "") {
    const id = communities.length + 1;
    communities.push({ id, name: newCommunity, founder: user.name });
    document.getElementById("newCommunity").value = "";
    loadCommunities();
    alert(`✅ Community '${newCommunity}' created by ${user.name}!`);
  } else {
    alert("Please enter a community name.");
  }
}

