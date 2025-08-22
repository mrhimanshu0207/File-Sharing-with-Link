// Firebase Config (replace with your Firebase project config)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

const fileInput = document.getElementById("fileInput");
const browseBtn = document.getElementById("browseBtn");
const dropArea = document.getElementById("drop-area");
const progressDiv = document.getElementById("progress");
const progressValue = document.getElementById("progressValue");
const progressFill = document.getElementById("progressFill");
const linkBox = document.getElementById("linkBox");
const fileLink = document.getElementById("fileLink");
const copyBtn = document.getElementById("copyBtn");
const deleteBtn = document.getElementById("deleteBtn");

let currentFileRef = null;

// Browse button
browseBtn.addEventListener("click", () => fileInput.click());
fileInput.addEventListener("change", (e) => handleFile(e.target.files[0]));

// Drag & Drop
dropArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropArea.style.background = "#e3f2fd";
});
dropArea.addEventListener("dragleave", () => {
  dropArea.style.background = "#fff";
});
dropArea.addEventListener("drop", (e) => {
  e.preventDefault();
  dropArea.style.background = "#fff";
  handleFile(e.dataTransfer.files[0]);
});

// Handle file upload
function handleFile(file) {
  if (!file) return;
  const fileName = Date.now() + "_" + file.name;
  currentFileRef = storage.ref("uploads/" + fileName);

  const uploadTask = currentFileRef.put(file);

  progressDiv.classList.remove("hidden");

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      let percent = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      progressValue.innerText = percent + "%";
      progressFill.style.width = percent + "%";
    },
    (error) => {
      alert("Upload failed: " + error.message);
    },
    () => {
      uploadTask.snapshot.ref.getDownloadURL().then((url) => {
        fileLink.value = url;
        linkBox.classList.remove("hidden");
      });
    }
  );
}

// Copy link
copyBtn.addEventListener("click", () => {
  fileLink.select();
  document.execCommand("copy");
  alert("Link copied!");
});

// Delete file
deleteBtn.addEventListener("click", () => {
  if (currentFileRef) {
    currentFileRef.delete().then(() => {
      alert("File deleted.");
      linkBox.classList.add("hidden");
      progressDiv.classList.add("hidden");
    });
  }
});
