// 🔹 Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// ------------------- Section Navigation -------------------
function showSection(section){
  document.querySelector('.hero').classList.add('hidden');
  document.getElementById('dashboard').classList.add('hidden');
  if(section === 'home') document.querySelector('.hero').classList.remove('hidden');
  if(section === 'communities'){
    const user = auth.currentUser;
    if(!user) return alert("Please login first!");
    document.getElementById('dashboard').classList.remove('hidden');
  }
}

// ------------------- Show Login / Signup -------------------
function showSignup(){ 
  document.getElementById("login-section").classList.add("hidden"); 
  document.getElementById("signup-section").classList.remove("hidden"); 
}

function showLogin(){ 
  document.getElementById("signup-section").classList.add("hidden"); 
  document.getElementById("login-section").classList.remove("hidden"); 
}

// ------------------- Signup -------------------
function signup(){
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;
  const name = document.getElementById("name").value;
  const role = document.getElementById("signup-role").value;

  auth.createUserWithEmailAndPassword(email,password)
    .then(userCredential => {
      const user = userCredential.user;
      db.collection("users").doc(user.uid).set({ name, role, email });
      alert("Signup successful!");
      showLogin();
    }).catch(error => alert(error.message));
}

// ------------------- Login -------------------
function login(){
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email,password)
    .then(userCredential => {
      const user = userCredential.user;
      document.getElementById("logoutBtn").classList.remove("hidden");
      db.collection("users").doc(user.uid).get().then(doc=>{
        const userData = doc.data();
        document.getElementById("studentName").innerText = `${userData.name} (${userData.role})`;
        if(userData.role==="teacher") document.getElementById("addCommunityCard").classList.remove("hidden");
        document.getElementById("login-section").classList.add("hidden");
        document.getElementById("signup-section").classList.add("hidden");
        document.getElementById("dashboard").classList.remove("hidden");
        loadCommunities();
      });
    }).catch(error => alert(error.message));
}

// ------------------- Logout -------------------
function logout(){
  auth.signOut().then(()=>{
    alert("Logged out!");
    document.getElementById("dashboard").classList.add("hidden");
    document.getElementById("login-section").classList.remove("hidden");
    document.getElementById("addCommunityCard").classList.add("hidden");
    document.getElementById("logoutBtn").classList.add("hidden");
  });
}

// ------------------- Add Community (Teacher Only) -------------------
function addCommunity(){
  const newCommunity = document.getElementById("newCommunity").value;
  const user = auth.currentUser;
  if(!user) return alert("Please login");
  db.collection("users").doc(user.uid).get().then(doc=>{
    const userData = doc.data();
    if(userData.role!=="teacher") return alert("Only teachers can create communities");

    db.collection("communities").add({
      name: newCommunity,
      founder: userData.name
    }).then(()=>{
      alert("Community created!");
      document.getElementById("newCommunity").value = "";
      loadCommunities();
    });
  });
}

// ------------------- Load Communities -------------------
function loadCommunities(){
  const user = auth.currentUser;
  if(!user) return;

  const list = document.getElementById("community-list");
  const joinedList = document.getElementById("joined-community-list");
  list.innerHTML = "";
  joinedList.innerHTML = "";

  db.collection("users").doc(user.uid).get().then(doc=>{
    const userData = doc.data();
    const userRole = userData.role;

    db.collection("communities").get().then(snapshot=>{
      snapshot.forEach(docC=>{
        const c = docC.data();

        // Teachers see their created communities
        if(userRole==="teacher" && c.founder === userData.name){
          const li = document.createElement("li");
          li.textContent = c.name + " (Founder)";
          list.appendChild(li);
        }

        // Students see available and joined communities
        if(userRole==="student"){
          db.collection("community_members")
            .where("community_id","==",docC.id)
            .where("user_id","==",user.uid)
            .get().then(joinedSnap=>{
              if(joinedSnap.empty){
                // Not joined
                const li = document.createElement("li");
                li.innerHTML = `${c.name} <span style="font-size:12px; color:#666;">(Founder: ${c.founder})</span>
                  <button class="btn-primary" onclick="joinCommunity('${docC.id}')">Join</button>`;
                list.appendChild(li);
              } else {
                // Already joined
                const li = document.createElement("li");
                li.textContent = c.name + ` (Founder: ${c.founder})`;
                joinedList.appendChild(li);
              }
            });
        }
      });
    });
  });
}

// ------------------- Join Community -------------------
function joinCommunity(id){
  const user = auth.currentUser;
  if(!user) return alert("Please login");

  db.collection("community_members")
    .where("community_id","==",id)
    .where("user_id","==",user.uid)
    .get().then(snap=>{
      if(!snap.empty) return alert("You have already joined this community!");

      db.collection("community_members").add({
        community_id: id,
        user_id: user.uid
      }).then(()=>{
        alert("Joined community!");
        loadCommunities();
      });
    });
}
