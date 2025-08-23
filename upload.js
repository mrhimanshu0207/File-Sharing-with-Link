const fileInput = document.getElementById("fileInput");
const browseBtn = document.getElementById("browseBtn");
const dropArea = document.getElementById("drop-area");
const linkBox = document.getElementById("linkBox");
const fileLink = document.getElementById("fileLink");
const downloadBtn = document.getElementById("downloadBtn");
const copyBtn = document.getElementById("copyBtn");

let fileURL = "";

// Browse
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

// Handle File
function handleFile(file) {
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    fileURL = e.target.result;

    fileLink.value = fileURL;
    downloadBtn.href = fileURL;
    downloadBtn.download = file.name;

    linkBox.classList.remove("hidden");
  };
  reader.readAsDataURL(file);
}

// Copy Link
copyBtn.addEventListener("click", () => {
  fileLink.select();
  document.execCommand("copy");
  alert("Link copied!");
});
