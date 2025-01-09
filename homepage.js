import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {
  getAuth,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import {
  getFirestore,
  getDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// initialized firebase
const firebaseConfig = {
  apiKey: "AIzaSyBTTBB3HC3e-L6NxWCbpOlvawbVWPUFFo8",
  authDomain: "login-sign-52492.firebaseapp.com",
  projectId: "login-sign-52492",
  storageBucket: "login-sign-52492.firebasestorage.app",
  messagingSenderId: "817304093278",
  appId: "1:817304093278:web:a818490dbdab8128752acf",
};
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();

onAuthStateChanged(auth, (user) => {
  const loggedInUserId = localStorage.getItem("loggedInUserId");
  if (loggedInUserId) {
    const docRef = doc(db, "users", loggedInUserId);

    getDoc(docRef)
      .then((doc) => {
        if (doc.exists()) {
          const user = doc.data();
          document.getElementById("user-container").style.display = "block";
          document.getElementById("error-container").style.display = "none";
          document.getElementById("firstName").innerText = user?.firstName;
          document.getElementById("lastName").innerText = user?.lastName;
          document.getElementById("email").innerText = user?.email;
        }
      })
      .catch((error) => {
        console.log("there some issue while fetching data", error);
      });
  }
});

const logoutbtn = document.getElementById("logout");

logoutbtn.addEventListener("click", () => {
  localStorage.removeItem("loggedInUserId");
  signOut(auth)
    .then(() => {
      window.location.href = "./index.html";
    })
    .catch((error) => {
      console.log("getting error while logging out", error);
    });
});
