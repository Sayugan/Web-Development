let player = {};

let selectedPlayer = localStorage.getItem("playerID");
let primaryBackground = document.getElementById("primary-background");
let secondaryBackground = document.getElementById("secondary-background");

let playerTitle = document.getElementById("player");
let playerTrophies = document.getElementById("trophies");
let playerGoals = document.getElementById("goals");
let playerExtras = document.getElementById("extra");

const getPlayer = async () => {

  if (selectedPlayer === null) {
    selectedPlayer = Math.floor(Math.random() * 4) + 1;    
  }

  await fetch("../data/players.json").then(async (response) => {
    await response.json().then(({ players }) => {
      player = players.find((p) => p.id == selectedPlayer);
    });
  });

  setPlayer();
};

const setPlayer = () => {
  playerTitle.innerHTML = player.name;

  primaryBackground.style.background = `linear-gradient(
      190deg,
      rgba(107, 107, 107, 0.5),
      rgba(0, 0, 0, 0.5)
    ), url(../images/players/${player.primary})`;
  primaryBackground.style.backgroundSize = "cover";
  primaryBackground.style.backgroundPosition = "center";
  primaryBackground.style.backgroundAttachment = "fixed";

  secondaryBackground.style.background = `linear-gradient(
      190deg,
      rgba(107, 107, 107, 0.5),
      rgba(0, 0, 0, 0.5)
      ), url(../images/players/${player.secondary})`;
  secondaryBackground.style.backgroundSize = "cover";
  secondaryBackground.style.backgroundPosition = "center";
  secondaryBackground.style.backgroundAttachment = "fixed";

  playerTrophies.innerHTML = player.trophies;
  playerGoals.innerHTML = player.goals;
  playerExtras.innerHTML = player.extra;
};

getPlayer();
