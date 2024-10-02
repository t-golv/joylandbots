let user;
const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json, text/plain, */*",
    "Accept-Language": "en",
    DNT: "1",
    // Fingerprint: "840cf1fc79e3d7bb243aeb93ed5757f3",
    Origin: "https://www.joyland.ai",
    Referer: "https://www.joyland.ai/",
  },
};
let creditsLoaded = false;
// "creators": [{ "userId": "8Ad2r", "link": "" }] in json
async function loadJson(path) {
  try {
    const response = await fetch(path);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to load dialogues:", error);
    return {}; // Return an empty object or handle the error as needed
  }
}
async function main() {
  const RPG = await loadJson("./dialogues.json");
  const CREDITS = await loadJson("../assets/credits.json");
  let creators = {};
  if (RPG.creators) {
    creators = CREDITS.creators.filter((creator) => {
      return RPG.creators.some(
        (creatorRPG) => creatorRPG.userId === creator.userId
      );
    });
  } else {
    creators = CREDITS.creators.filter((creator) => creator.userId == "8Ad2r");
  }
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
    let image = slides[currentSlide].querySelector(".aside-image");

    if (title) {
      title.innerHTML = RPG.story[chapter].title;
    }
    if (subtitle) {
      subtitle.setAttribute("data-text", RPG.story[chapter].subtitle);
      subtitle.innerHTML = RPG.story[chapter].subtitle;
    }
    if (titleAbout) titleAbout.innerHTML = RPG.story[chapter].about.title;
    if (about) about.innerHTML = RPG.story[chapter].about.paragraph;
    if (image) {
      image.src = RPG.story[chapter].about.image;
    }
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

      if (currentSlide == slides.length - 1 && !creditsLoaded) {
        creators.forEach((creator, idx) => addcredits({ ...creator }, idx));
      }
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

    document.getElementById("bg-sound").volume = 0.3;
    document.getElementById("bg-sound").play();
    let currentDialogueIndex = 0;
    let typing = false;
    let index = 0;
    let paragraphElement = document.querySelector(`.novel-dialogues p`);
    function nextDialogue() {
      // pega o elemento dialogo
      let currentDialogue = RPG.story[chapter].dialogues[currentDialogueIndex];

      if (currentDialogueIndex < RPG.story[chapter].dialogues.length) {
        paragraphElement.textContent = "";
        playDialogueSound();
        let activeIMG;
        document
          .querySelectorAll(".novel-img")
          .forEach((novelImg) => novelImg.classList.remove("active"));

        if (currentDialogue.bg) {
          slides[currentSlide].style.backgroundImage = `linear-gradient(
          to top,
          var(--color-3) -100%,
          transparent 100%
        ), url(${currentDialogue.bg})`;
        }
        let overlayElement = document.querySelector(".novel-overlay");
        let itemElement = document.querySelector(".novel-item");
        let audioEl = document.querySelector("#voice");
        if (currentDialogue.id) {
          let characterActive = RPG.characters[currentDialogue.id];
          activeIMG = document.querySelector(`#img1`);
          activeIMG.src = "";
          document.querySelector(".novel-dialogues-name").style.display =
            "block";
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
          } else {
            activeIMG.src = characterActive.defaultLink;
          }
          if (characterActive?.audio?.length > 0) {
            audioEl.src =
              characterActive.audio[
                Math.floor(Math.random() * characterActive.audio.length)
              ];
            audioEl.volume = 0.3;
            audioEl.play();
          }
          activeIMG.style.display = "block";
          if (characterActive?.name) {
            document.querySelector(".novel-dialogues-name").innerText =
              characterActive.name;
            document.querySelector(".novel-dialogues-name").style.display =
              "block";
          } else {
            document.querySelector(".novel-dialogues-name").style.display =
              "none";
          }
          activeIMG.classList.add("active");
        } else {
          document.querySelector(".novel-dialogues-name").style.display =
            "none";
        }
        if (currentDialogue?.overlay && currentDialogue.overlay !== "#") {
          overlayElement.src = currentDialogue.overlay;
          overlayElement.onload = () => {
            overlayElement.style.display = "block"; // Show only when loaded
          };
          overlayElement.onerror = () => {
            overlayElement.style.display = "none"; // Hide if there's an error loading
          };
          // Initially hide the image
          overlayElement.style.display = "none";
        } else if (
          currentDialogue?.overlay &&
          currentDialogue.overlay === "#"
        ) {
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
        if (currentDialogue?.action) {
          paragraphElement.classList.add("action");
        } else {
          paragraphElement.classList.remove("action");
        }
        if (currentDialogue?.audio) {
          audioEl.src = currentDialogue.audio;
          if (typeof currentDialogue.volume == "number") {
            audioEl.volume = currentDialogue.volume;
          } else {
            audioEl.volume = 0.7;
          }
          audioEl.play();
        }
        document.querySelector(".novel-section").removeAttribute("id");
        document.querySelector(".novel-section").id = currentDialogue.id;
        function showPhrase() {
          let typeAudio = document.querySelector("#audio-click");
          typeAudio.volume = 0.5;
          if (index < currentDialogue.dialogue.length && !typing) {
            typing = true;
            paragraphElement.textContent += currentDialogue.dialogue[index];
            index++;
            typeAudio.play();
            setTimeout(() => {
              typing = false; // Allow next character to be typed
              typeAudio.playbackRate = randomPlaybackSpeed();
              showPhrase(); // Call showPhrase again
            }, 30); // Adjust typing speed here
          } else {
            index = 0; // Reset index for the next dialogue
            currentDialogueIndex++;
            typeAudio.currentTime = 0;
            typeAudio.pause();
            paragraphElement.textContent = currentDialogue.dialogue;
          }
        }

        showPhrase();
        // paragraphElement.innerHTML = currentDialogue.dialogue;
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
    novelDialogues.addEventListener("click", () => {
      if (!typing) {
        nextDialogue();
      } else {
        typing = false;
        index = 9999;
      }
    });
    document.addEventListener("keydown", (e) => {
      if (e.code === "Space" && currentSlide == 2) {
        if (!typing) {
          nextDialogue();
        } else {
          typing = false;
          index = 9999;
        }
      } else if (e.code === "Space" && currentSlide < 2) {
        handleNext();
      }
    });
  }
  function randomPlaybackSpeed() {
    // Generate a random number between 0 and 1
    let randomNumber = Math.random();

    // Scale the random number to be between 0.5 and 1.5
    let speed = randomNumber * (1 - 0.1) + 0.5;

    return speed;
  }
  // add credits
  async function addcredits(
    { userId, badge, color, position, placeholder },
    idx
  ) {
    const creditsMain = document.querySelector(".credits-main");
    const responseHTML = await fetch("../assets/credits.html");
    const htmlText = await responseHTML.text();
    const parser = new DOMParser();
    let dataUser;
    let dataBots;
    const doc = parser.parseFromString(htmlText, "text/html");
    function dataOrPlaceholder() {
      if (RPG.creators && RPG.creators[idx].color) {
        doc
          .querySelector(".credits-section")
          .style.setProperty("--accent-color", RPG.creators[idx].color);
      } else {
        doc
          .querySelector(".credits-section")
          .style.setProperty("--accent-color", color);
      }
      doc.querySelector(
        ".credits-section-link"
      ).href = `https://www.joyland.ai/profile?userId=${userId}`;
      doc.querySelector(".credits-section-top-name").innerText = dataUser
        ? dataUser.result.name
        : placeholder.name;
      doc.querySelector(".credits-section-top-bio").innerText = dataUser
        ? dataUser.result.bio
        : placeholder.bio;
      doc.querySelector(".credits-section-top-avatar").src = dataUser
        ? dataUser.result.avatar
        : placeholder.avatar;
      doc.querySelector(".credits-section-top-cover").src = dataUser
        ? dataUser.result.headImg
        : placeholder.headImg;
      // doc.querySelector(".credits-section-bottom-badge").innerText =
      if (RPG.creators && RPG.creators[idx].link) {
        let link = doc.querySelector(".credits-section-link-2");
        link.href =
          RPG.creators[idx].link ||
          `https://www.joyland.ai/profile?userId=${userId}`;
        link.style.display = "block";
      }
    }
    dataOrPlaceholder(dataUser);

    options.headers.Fingerprint = generateRandomHex(32);
    try {
      creditsMain.innerHTML += doc.body.innerHTML;
      const responseUser = await fetch(
        `https://api.joyland.ai/profile/info?userId=${userId}`,
        options
      );
      dataUser = await responseUser.json();
    } catch (err) {}
    try {
      const responseBots = await fetch(
        `https://api.joyland.ai/profile/public-bots?userId=${userId}`,
        options
      );
      dataBots = await responseBots.json();
    } catch (err) {}

    // DATA OR PLACEHOLDER
    dataOrPlaceholder(dataUser);
    if (dataBots && dataBots.result) {
      dataBots.result.forEach((item) => {
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
    const badgeElements = doc.querySelectorAll(".credits-section-badge");
    badgeElements.forEach((badgeEl) => {
      badgeEl.innerText =
        RPG.creators && RPG.creators[idx].badge
          ? RPG.creators[idx].badge
          : badge;
      if (position == "left") {
        badgeEl.style.left = "0%";
        badgeEl.style.right = "auto";
        badgeEl.style.borderRadius = "0px 0px 1rem 0px";
      }
    });
    if (dataBots) {
      const sectionTop = doc.querySelector(".credits-section-top");
      const button = `
      <button class="credits-section-top-button credits-button-toggle">
      SEE ALL ${dataBots.result.length} BOTS
    </button>`;
      sectionTop.innerHTML += button;
      doc
        .querySelectorAll(".credits-button-toggle")
        .forEach((button) => button.classList.add(`user-${userId}`));
      sectionTop.classList.add(`user-${userId}`);
      doc
        .querySelector(".credits-section-bottom")
        .classList.add(`user-${userId}`);
    }
    if (creditsMain.children.length < (creators ? creators.length : 1)) {
      creditsMain.innerHTML += doc.body.innerHTML;
    } else {
      document.querySelectorAll(`.credits-section`)[idx].innerHTML =
        doc.querySelector(".credits-section").innerHTML;

      document
        .querySelectorAll(`.credits-button-toggle.user-${userId}`)
        .forEach((button) => {
          button.addEventListener("click", (e) => {
            document
              .querySelector(`.credits-section-top.user-${userId}`)
              .classList.toggle("credits-section-hidden");
            document
              .querySelector(`.credits-section-bottom.user-${userId}`)
              .classList.toggle("credits-section-hidden");
          });
        });
    }
    creditsLoaded = true;
  }
  const carousels = document.querySelectorAll("[data-carousel]");
  carousels.forEach(setUpCarousel);
  const musicButton = document.querySelector(
    ".carousel-button.carousel-btn-music"
  );
  musicButton.addEventListener("click", bgOst);
  function bgOst() {
    let audio = document.getElementById("bg-sound");
    if (audio.currentTime == 0 || audio.paused) {
      console.log(audio);
      audio.volume = 0.3;
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
  if (event.code === "Tab" || event.code == "Space") {
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
function generateRandomHex(length) {
  const characters = "0123456789abcdef";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  return result;
}
