let user;
const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json, text/plain, */*",
    "Accept-Language": "en",
    DNT: "1",
    Fingerprint: "840cf1fc79e3d7bb243aeb93ed5757f3",
    Origin: "https://www.joyland.ai",
    Referer: "https://www.joyland.ai/",
  },
};
async function loadDialogues() {
  try {
    const response = await fetch("./dialogues.json");
    if (!response.ok) throw new Error("Network response was not ok");
    const dialogues = await response.json();
    return dialogues;
  } catch (error) {
    console.error("Failed to load dialogues:", error);
    return {}; // Return an empty object or handle the error as needed
  }
}
async function main() {
  const RPG = await loadDialogues();
  const chapter = document.body.classList[0];
  user = getReceivedData();
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  function modulo(number, mod) {
    let result = number % mod;
    if (result < 0) {
      result += mod;
    }
    return result;
  }
  function activeSlide() {
    slides.forEach((slide) => slide.classList.remove("active"));
    slides[currentSlide].classList.add("active");
    let title = slides[currentSlide].querySelector(".title-main");
    let subtitle = slides[currentSlide].querySelector(".subtitle-main");
    let titleAbout = slides[currentSlide].querySelector(".title-about");
    let about = slides[currentSlide].querySelector(".about");

    if (title) title.innerHTML = RPG.story[chapter].title;
    if (subtitle) subtitle.innerHTML = RPG.story[chapter].subtitle;
    if (titleAbout) titleAbout.innerHTML = RPG.story[chapter].about.title;
    if (about) about.innerHTML = RPG.story[chapter].about.paragraph;
  }
  function setUpCarousel(carousel) {
    function handleNext() {
      currentSlide = modulo(currentSlide + 1, numSlides);
      changeSlide(currentSlide);
    }

    function handlePrevious() {
      currentSlide = modulo(currentSlide - 1, numSlides);
      changeSlide(currentSlide);
    }

    function changeSlide(slideNumber) {
      currentDialogueIndex = 0;
      playSlideSound();
      activeSlide();
      if (slideNumber == 2) {
        nextDialogue();
      }
      carousel.style.setProperty("--current-slide", slideNumber);
    }

    const buttonsPrevious = carousel.querySelectorAll(
      "[data-carousel-button-previous]"
    );
    const buttonsNext = carousel.querySelectorAll(
      "[data-carousel-button-next]"
    );
    const slidesContainer = carousel.querySelector(
      "[data-carousel-slides-container]"
    );
    const numSlides = slidesContainer.children.length;
    buttonsPrevious.forEach((buttonPrevious) =>
      buttonPrevious.addEventListener("click", handlePrevious)
    );
    buttonsNext.forEach((buttonNext) =>
      buttonNext.addEventListener("click", handleNext)
    );
    // adding active class to active slide
    activeSlide();
    // Função próximo dialogo

    let currentDialogueIndex = 0;
    function nextDialogue() {
      // pega o elemento dialogo
      if (currentDialogueIndex < RPG.story[chapter].dialogues.length) {
        playDialogueSound();
        let activeIMG;
        let currentDialogue =
          RPG.story[chapter].dialogues[currentDialogueIndex];
        let characterActive = RPG.characters[currentDialogue.id];
        document
          .querySelectorAll(".novel-img")
          .forEach((novelImg) => novelImg.classList.remove("active"));
        if (currentDialogue.id) {
          let audioEl = document.querySelector("#voice");
          activeIMG = document.querySelector(`#img${currentDialogue.pos || 1}`);
          activeIMG.src = "";
          activeIMG.style.display = "block";
          if (currentDialogue.type === "#") {
            console.log("#");
            document
              .querySelectorAll(".novel-img")
              .forEach((img) => (img.style.display = "none"));
          } else if (
            typeof currentDialogue.type === "string" &&
            currentDialogue.type !== "#" &&
            currentDialogue.type !== undefined
          ) {
            activeIMG.src = characterActive[currentDialogue.type];
            console.log('The string is not "#" but is a valid string.');
          } else {
            activeIMG.src = characterActive["defaultLink"];
            console.log("defat.");
          }
          if (characterActive?.audio?.length > 0) {
            audioEl.src =
              characterActive.audio[
                Math.floor(Math.random() * characterActive.audio.length)
              ];
            audioEl.volume = 0.3;
            audioEl.play();
          }
          activeIMG.classList.add("active");
        }
        // se tiver bg
        if (currentDialogue?.bg) {
          slides[
            currentSlide
          ].style.backgroundImage = `url(${currentDialogue.bg})`;
        }
        if (currentDialogue?.title) {
          document.querySelector(".title-header").innerHTML =
            currentDialogue.title;
        }
        if (currentDialogue?.subtitle) {
          document.querySelector(".subtitle-header").innerHTML =
            currentDialogue.subtitle;
        }
        let overlayElement = document.querySelector(".novel-overlay");
        let itemElement = document.querySelector(".novel-item");
        if (currentDialogue?.overlay) {
          overlayElement.src = currentDialogue.overlay;
          overlayElement.onload = () => {
            overlayElement.style.display = "block"; // Show only when loaded
          };
          overlayElement.onerror = () => {
            overlayElement.style.display = "none"; // Hide if there's an error loading
          };
          // Initially hide the image
          overlayElement.style.display = "none";
        } else {
          overlayElement.style.display = "none";
        }
        if (currentDialogue?.item) {
          itemElement.src = currentDialogue.item;
          itemElement.onload = () => {
            itemElement.style.display = "block"; // Show only when loaded
          };
          itemElement.onerror = () => {
            itemElement.style.display = "none"; // Hide if there's an error loading
          };
          // Initially hide the image
          itemElement.style.display = "none";
        } else {
          itemElement.style.display = "none";
        }
        document.querySelector(".novel-section").removeAttribute("id");
        document.querySelector(".novel-section").id = currentDialogue.id;
        let paragraphElement = document.querySelector(`.novel-dialogues p`);
        if (currentDialogue.user) {
          if (user) {
            paragraphElement.innerHTML = currentDialogue.dialogue.replace(
              "{user}",
              user
            );
          } else {
            paragraphElement.innerHTML = currentDialogue.dialogue.replace(
              "{user}",
              "you"
            );
          }
        } else {
          paragraphElement.innerHTML = currentDialogue.dialogue;
        }
        currentDialogueIndex++;
      } else {
        // quando os dialogos chegarem no maximo vai para proximo slide
        let imgs = document.querySelectorAll(".novel-img");
        imgs.forEach((img) => (img.style.display = "none"));
        handleNext();
      }
    }
    const novelDialogues = document.querySelector(
      ".novel-dialogues .dialogues-arrow"
    );
    novelDialogues.addEventListener("click", nextDialogue);
  }

  // add credits
  async function addcredits(userId, badge = "Creator", accentColor) {
    try {
      const responseHTML = await fetch("./credits.html");
      const responseJoylandBots = await fetch(
        `https://api.joyland.ai/profile/public-bots?userId=${userId}`,
        options
      );
      const responseJoylandUser = await fetch(
        `https://api.joyland.ai/profile/info?userId=${userId}`,
        options
      );
      // const response = await fetch()
      if (!responseHTML.ok) {
        throw new Error(
          "Network response was not ok " + responseHTML.statusText
        );
      }
      if (!responseJoylandBots.ok) {
        throw new Error(
          "Network response was not ok " + responseJoylandBots.statusText
        );
      }
      if (!responseJoylandUser.ok) {
        throw new Error(
          "Network response was not ok " + responseJoylandUser.statusText
        );
      }
      const htmlText = await responseHTML.text(); // Get HTML as text
      const dataJoylandBots = await responseJoylandBots.json();
      const dataJoylandUser = await responseJoylandUser.json();
      console.log("dataJoylandBots", dataJoylandBots);
      // Parse the HTML into a document
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlText, "text/html");
      if (dataJoylandUser && dataJoylandUser.result) {
        doc.querySelector(".credits-section-top-name").innerText =
          dataJoylandUser.result.name;
        doc.querySelector(".credits-section-top-bio").innerText =
          dataJoylandUser.result.bio;
        doc.querySelector(".credits-section-top-avatar").src =
          dataJoylandUser.result.avatar;
        doc.querySelector(".credits-section-top-cover").src =
          dataJoylandUser.result.headImg;
        doc.querySelector(".credits-section-bottom-badge").innerText = badge;
      }

      if (dataJoylandBots && dataJoylandBots.result) {
        dataJoylandBots.result.forEach((item) => {
          doc.querySelector(".credits-section-bottom-bots").innerHTML += `
          <a target="_blank" href="https://www.joyland.ai/chat?botId=${item.botId}" class="credits-section-bottom-bot"
            style="background-image: url(${item.avatar});">
            <em class="credits-section-bottom-bot-name">${item.characterName}</em>
            <div class="credits-section-bottom-bot-infos">
              <sub><span class="material-symbols-outlined">
                  chat
                </span> ${item.botChats}</sub>
              <sub><span class="material-symbols-outlined">
                  favorite
                </span> ${item.botLikes}</sub>
            </div>
          </a>
          `;
        });
      }
      document.querySelector(".credits-main").innerHTML += doc.body.innerHTML;
      document.querySelectorAll(`.credits-button-toggle`).forEach((button) => {
        button.addEventListener("click", creditsVertical);
      });
    } catch (error) {
      console.log("Error fetching credits:", error);
    }
  }

  addcredits("8Ad2r", "Creator", "#7e66e9");

  addcredits("lMjZp", "Creator", "#f33");

  const carousels = document.querySelectorAll("[data-carousel]");
  carousels.forEach(setUpCarousel);
  const musicButton = document.querySelector(".carousel-btn-music");
  musicButton.addEventListener("click", bgOst);
  function bgOst() {
    let audio = document.getElementById("bg-ost-sound");
    if (audio.currentTime == 0 || audio.paused) {
      audio.volume = 0.25;
      audio.play();
      document.querySelector(
        ".carousel-btn-music .material-symbols-outlined"
      ).innerHTML = "pause";
    } else {
      document.querySelector(
        ".carousel-btn-music .material-symbols-outlined"
      ).innerHTML = "play_arrow";
      audio.pause();
    }
  }
}

main();

// Prevent default Tab behavior
document.addEventListener("keydown", (event) => {
  if (event.key === "Tab") {
    event.preventDefault(); // Prevent the default tab action
  }
});

function playSlideSound() {
  let transitionSound = document.querySelector("#transition-slide-audio");
  transitionSound.volume = 0.2;
  transitionSound.play();
}
function playDialogueSound() {
  let transitionSound = document.querySelector("#transition-dialogue-audio");
  transitionSound.volume = 0.2;
  transitionSound.play();
}
const getQueryParams = () => {
  const params = {};
  const queryString = window.location.search.substring(1);
  const pairs = queryString.split("&");
  pairs.forEach((pair) => {
    const [key, value] = pair.split("=");
    params[decodeURIComponent(key)] = decodeURIComponent(value || "");
  });
  return params;
};
const getReceivedData = () => {
  const queryParams = getQueryParams();
  const data = queryParams["data"];
  return data;
};

function creditsVertical(event) {
  console.log("oi");
  document
    .querySelector(".credits-section-top")
    .classList.toggle("credits-section-hidden");
  document
    .querySelector(".credits-section-bottom")
    .classList.toggle("credits-section-hidden");
}
