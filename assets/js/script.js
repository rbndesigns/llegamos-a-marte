// =========================
// Configuración Particles.js
// =========================

var config = {
  particles: {
    number: {
      value: 150,
      density: {
        enable: true,
        value_area: 786,
      },
    },
    color: {
      value: ["#ffffff", "#FF6F91", "#F9F871", "#D65DB1"],
    },
    shape: {
      type: "circle",
      stroke: {
        width: 0,
        color: "#000000",
      },
      polygon: {
        nb_sides: 12,
      },
      image: {
        src: "",
        width: 100,
        height: 100,
      },
    },
    opacity: {
      value: 1,
      random: true,
      anim: {
        enable: true,
        speed: 1,
        opacity_min: 0,
        sync: false,
      },
    },
    size: {
      value: 2.5,
      random: true,
      anim: {
        enable: true,
        speed: 3,
        size_min: 0.3,
        sync: false,
      },
    },
    line_linked: {
      enable: false,
      distance: 100,
      color: "#fff",
      opacity: 0.023674428,
      width: 1,
    },
    move: {
      enable: true,
      speed: 1.3,
      direction: "top",
      random: true,
      straight: true,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: true,
        rotateX: 2082.2488,
        rotateY: 3363.6328,
      },
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "grab",
      },
      onclick: {
        enable: true,
        mode: "repulse",
      },
      resize: true,
    },
    modes: {
      grab: {
        distance: 70,
        line_linked: {
          opacity: 0.25,
        },
      },
      bubble: {
        distance: 100,
        size: 5,
        duration: 8.598243,
        opacity: 0,
        speed: 3,
      },
      repulse: {
        distance: 150,
        duration: 0.8,
      },
      push: {
        particles_nb: 4,
      },
      remove: {
        particles_nb: 2,
      },
    },
  },
  retina_detect: true,
};

window.onload = function () {
  let clause = window.innerWidth < 768;
  config.particles.number.value = clause ? 80 : 150;
  particlesJS("particle", config);
  initGame();
};

// =========================
// Lógica del minijuego
// =========================

function initGame() {
  const gameSection = document.getElementById("game-section");
  const gameArea = document.getElementById("game");
  const scoreSpan = document.getElementById("score");
  const marsEnd = document.getElementById("mars-end");
  const restartBtn = document.getElementById("restart-btn");

  let score = 0;
  const maxScore = 10;
  let gameStarted = false;
  let spawnIntervalId = null;

  // ===============================
  // FOTOS REALES DE MINIONS AQUÍ ↓
  // ===============================
  const minionPhotos = [
    "https://ik.imagekit.io/gemagarrido/404%20marte/minion1.png",
    "https://ik.imagekit.io/gemagarrido/404%20marte/minion2.png",
  ];
  // Puedes añadir todas las que quieras:
  // "assets/img/minions/minion4.webp", ...

  function updateScore() {
    scoreSpan.textContent = score;
  }

  function clearMinions() {
    const minions = gameArea.querySelectorAll(".minion-sprite");
    minions.forEach((m) => m.remove());
  }

  function spawnMinion() {
    if (score >= maxScore) return;

    const minion = document.createElement("img");

    // FOTO REAL DE MINION ALEATORIA
    minion.src = minionPhotos[Math.floor(Math.random() * minionPhotos.length)];
    minion.alt = "Minion";
    minion.classList.add("minion-sprite");

    // Rotación aleatoria ligera entre -15deg y 15deg — se usa la variable CSS --rot
    const rot = (Math.random() * 30 - 15).toFixed(1); // string con 1 decimal
    minion.style.setProperty("--rot", rot + "deg");

    const topPercent = 10 + Math.random() * 70;
    const leftPercent = 5 + Math.random() * 90;

    minion.style.top = topPercent + "%";
    minion.style.left = leftPercent + "%";

    minion.addEventListener("click", function () {
      if (!minion.classList.contains("clicked")) {
        // activamos clase que aplica transform: rotate(var(--rot)) scale(0.7) y opacity:0
        minion.classList.add("clicked");
        score++;
        updateScore();

        // eliminamos tras la animación
        setTimeout(() => minion.remove(), 150);

        if (score >= maxScore) endGame();
      }
    });

    setTimeout(() => {
      if (!minion.classList.contains("clicked")) {
        // aplicamos clase que hace fade-out manteniendo rotación
        minion.classList.add("missed");
        setTimeout(() => minion.remove(), 150);
      }
    }, 2500);

    gameArea.appendChild(minion);
  }

  function startGame() {
    if (gameStarted) return;
    gameStarted = true;
    score = 0;
    updateScore();
    marsEnd.classList.add("hidden");
    clearMinions();
    spawnIntervalId = setInterval(spawnMinion, 800);
  }

  function endGame() {
    clearInterval(spawnIntervalId);
    spawnIntervalId = null;
    clearMinions();
    marsEnd.classList.remove("hidden");
  }

  function restartGame() {
    location.reload(); // 🔁 Recargar página
  }

  function handleScroll() {
    const rect = gameSection.getBoundingClientRect();
    const viewportHeight =
      window.innerHeight || document.documentElement.clientHeight;

    if (rect.top < viewportHeight - 100) {
      startGame();
      window.removeEventListener("scroll", handleScroll);
    }
  }

  window.addEventListener("scroll", handleScroll);

  if (restartBtn) {
    restartBtn.addEventListener("click", restartGame);
  }
}
