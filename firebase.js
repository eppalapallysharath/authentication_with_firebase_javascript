import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import {
  getFirestore,
  setDoc,
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

// signup
const signUp = document.getElementById("submitSignUp");
signUp.addEventListener("click", (event) => {
  event.preventDefault();

  const remail = document.getElementById("rEmail").value;
  const rpassword = document.getElementById("rPassword").value;
  const rfirstName = document.getElementById("fName").value;
  const rlastName = document.getElementById("lName").value;

  const auth = getAuth();
  const db = getFirestore();

  createUserWithEmailAndPassword(auth, remail, rpassword)
    .then((userCredential) => {
      const user = userCredential.user;
      const userData = {
        email: remail,
        firstName: rfirstName,
        lastName: rlastName,
      };
      alert("account created successfully");
      const docRef = doc(db, "users", user.uid);
      setDoc(docRef, userData)
        .then(() => {
          window.location.href = "./index.html";
        })
        .catch((error) => {
          console.log("getting error writing document", error);
        });
    })
    .catch((error) => {
      const errorMsg = error.code;
      if (errorMsg == "auth/email-already-in-use") {
        alert("email already existed");
      } else {
        alert("unable to create your account please try again");
      }
    });
});

// signin
const signIn = document.getElementById("submitSignIn");
signIn.addEventListener("click", (event) => {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((user) => {
      alert("welcome back " + user?.user?.email);
      const userdata = user.user;
      localStorage.setItem("loggedInUserId", userdata.uid);
      window.location.href = "./homepage.html";
    })
    .catch((error) => {
      const errorMsg = error.code;
      if (errorMsg == "auth/invalid-credential") {
        alert("Invalid email/password");
      } else {
        alert("User not existed");
      }
    });
});
