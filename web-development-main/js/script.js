localStorage.removeItem("playerID");
localStorage.removeItem("studentRole");

let playerLinks = document.getElementsByClassName("player-link");

for (let playerLink of playerLinks) {
  playerLink.addEventListener("click", (e) => {
    let playerID = e.target.dataset.player;

    localStorage.setItem("playerID", playerID);

    window.location.href = "../pages/player.html";
  });
}

let pageEditorLink = document.getElementById("page_editor");

pageEditorLink.addEventListener("click", (e) => {
  localStorage.setItem("studentRole", e.target.dataset.student);
  window.location.href = "../pages/page_editor.html";
});
