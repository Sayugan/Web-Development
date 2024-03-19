let presented = localStorage.getItem("presented") ?? false;

if (!presented) {
  window.location.href = "../presentation.html";
}
