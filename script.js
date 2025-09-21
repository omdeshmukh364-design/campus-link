import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import {
  collection,
  addDoc,
  getDocs
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

// Firebase references from index.html
const auth = window.firebaseAuth;
const db   = window.firebaseDB;

function showSignup() {
  document.getElementById("login-section").classList.add("hidden");
  document.getElementById("signup-section").classList.remove("hidden");
  document.getElementById("hero-section").classList.add("hidden");
}

function showLogin() {
  document.getElementById("signup-section").classList.add("hidden");
  document.getElementById("login-section").classList.remove("hidden");
  document.getElementById("hero-section").classList.add("hidden");
}

function signup() {
  const role     = document.getElementById("signup-role").value;
  const name     = document.getElementById("name").value;
  const email    = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(userCred => {
      return addDoc(collection(db, "users"), {
        uid: userCred.user.uid,
        role,
        name,
        email
      });
    })
    .then(() => {
      alert("Signup successful! Please login.");
      showLogin();
    })
    .catch(err => alert(err.message));
}

function login() {
  const role     = document.getElementById("role").value;
  const email    = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(userCred => {
      document.getElementById("studentName").innerText = `${email} (${role})`;
      document.getElementById("login-section").classList.add("hidden");
      document.getElementById("dashboard").classList.remove("hidden");
      document.getElementById("nav-logout").classList.remove("hidden");
      if (role === "teacher") {
        document.getElementById("addCommunityCard").classList.remove("hidden");
      }
      loadCommunities();
    })
    .catch(err => alert(err.message));
}

function logout() {
  signOut(auth)
    .then(() => {
      alert("Logged out!");
      document.getElementById("dashboard").classList.add("hidden");
      document.getElementById("hero-section").classList.remove("hidden");
      document.getElementById("nav-logout").classList.add("hidden");
    })
    .catch(err => alert(err.message));
}

function addCommunity() {
  const newCommunity = document.getElementById("newCommunity").value.trim();
  if (!newCommunity) return alert("Please enter a community name.");

  addDoc(collection(db, "communities"), {
    name: newCommunity,
    founder: auth.currentUser.email
  }).then(() => {
    document.getElementById("newCommunity").value = "";
    alert(`Community '${newCommunity}' created!`);
    loadCommunities();
  });
}

function loadCommunities() {
  const list = document.getElementById("community-list");
  list.innerHTML = "";
  getDocs(collection(db, "communities")).then(snapshot => {
    snapshot.forEach(doc => {
      const c = doc.data();
      const li = document.createElement("li");
      li.innerHTML = `${c.name} <span style="font-size:12px; color:#666;">(Founder: ${c.founder})</span>`;
      list.appendChild(li);
    });
  });
}

// Make functions global for HTML buttons
window.showLogin = showLogin;
window.showSignup = showSignup;
window.signup = signup;
window.login = login;
window.logout = logout;
window.addCommunity = addCommunity;
window.loadCommunities = loadCommunities;
