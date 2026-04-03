// Firebase questionnaire handling
// 1) Replace config with your Firebase project settings
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// 2) Include Firebase SDKs in default layout before this script:
// https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js
// https://www.gstatic.com/firebasejs/10.12.2/firebase-auth-compat.js
// https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore-compat.js

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

async function signInAnonymouslyIfNeeded() {
  if (!auth.currentUser) {
    await auth.signInAnonymously();
  }
  return auth.currentUser;
}

async function savePrivateAnswer(btn) {
  const form = btn.closest('form');
  const textarea = form.querySelector('textarea');
  const textId = form.dataset.textId;
  const answer = textarea.value.trim();
  if (!answer) return alert("Please write an answer first.");

  const user = await signInAnonymouslyIfNeeded();

  await db.collection("responses").doc(user.uid).collection("answers").doc(textId).set({
    textId,
    answer,
    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
  }, { merge: true });

  alert("Saved privately to your secure cloud account.");
}

async function loadPrivateAnswer(textId, textarea) {
  const user = await signInAnonymouslyIfNeeded();
  const doc = await db.collection("responses").doc(user.uid).collection("answers").doc(textId).get();
  if (doc.exists) {
    textarea.value = doc.data().answer || "";
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const form = document.querySelector(".questionnaire");
  if (!form) return;
  const textarea = form.querySelector("textarea");
  await loadPrivateAnswer(form.dataset.textId, textarea);
});
