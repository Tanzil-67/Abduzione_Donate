// Your Firebase config (use your actual config here)
const firebaseConfig = {
  apiKey: "AIzaSyBDnlua7-Oe-ezzRK32iv_bvvtHikYDztw",
  authDomain: "abduzione-olly.firebaseapp.com",
  projectId: "abduzione-olly",
  storageBucket: "abduzione-olly.firebasestorage.app",
  messagingSenderId: "1049404807757",
  appId: "1:1049404807757:web:4640be6a6779f0c4c9da04",
  measurementId: "G-3RTFF02C1C"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function showForm() {
  const form = document.querySelector('.coolinput');
  form.classList.add('show');
}

function submitForm() {
  const nameInput = document.querySelector('.coolinput .input');
  if (!nameInput) return alert("Input field not found.");

  const name = nameInput.value.trim();
  if (name === "") return alert("Please enter your full name.");

  // Save the donor's name to Firestore
  db.collection('donors').add({
    fullName: name,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  }).catch((error) => {
    console.error("Error saving donor: ", error);
  });


  const form = document.querySelector('.coolinput');
  const centerDiv = document.querySelector('.center');
  const btnDiv = document.querySelector('button.btn')?.parentElement;
  const footdiv = document.querySelector('footer');


  [form, centerDiv, btnDiv, footdiv].forEach(el => {
    if (el) {
      el.style.transition = 'opacity 1s ease';
      el.style.opacity = 0;
      el.style.pointerEvents = 'none';
    }
  });

  setTimeout(() => {
    [form, centerDiv, btnDiv].forEach(el => {
      if (el) el.style.display = 'none';
    });

    document.querySelector('.thankyou-message')?.classList.add('show');
  }, 1000);

  nameInput.value = "";
}
