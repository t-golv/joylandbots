async function loadDialogues() {
    try {
      const response = await fetch('./dialogues.json');
      if (!response.ok) throw new Error('Network response was not ok');
      const dialogues = await response.json();
      return dialogues;
    } catch (error) {
      console.error('Failed to load dialogues:', error);
      return {}; // Return an empty object or handle the error as needed
    }
  }
  
  async function main() {
    const RPG = await loadDialogues();
    const chapter = document.body.classList[0]
  
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
  
    function modulo(number, mod) {
      let result = number % mod;
      if (result < 0) {
        result += mod;
      }
      return result;
    }
    function activeSlide() {
      slides.forEach(slide => slide.classList.remove('active'))
      slides[currentSlide].classList.add('active')
      let title = slides[currentSlide].querySelector('.title-main')
      let subtitle = slides[currentSlide].querySelector('.subtitle-main')
      let titleAbout = slides[currentSlide].querySelector('.title-about')
      let about = slides[currentSlide].querySelector('.about')
  
      
      if(title) title.innerHTML = RPG.story[chapter].title
      if(subtitle) subtitle.innerHTML = RPG.story[chapter].subtitle
      if(titleAbout) titleAbout.innerHTML = RPG.story[chapter].about.title
      if(about) about.innerHTML = RPG.story[chapter].about.paragraph
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
        if (currentSlide + 1 == slides.length) {
          let creditsAudio = document.querySelector("#credits-audio");
          creditsAudio.volume = 0.3;
          creditsAudio.play();
        }
        activeSlide()
        nextDialogue()
        carousel.style.setProperty('--current-slide', slideNumber);
      }
  
      const buttonsPrevious = carousel.querySelectorAll('[data-carousel-button-previous]');
      const buttonsNext = carousel.querySelectorAll('[data-carousel-button-next]');
      const slidesContainer = carousel.querySelector('[data-carousel-slides-container]');
      const numSlides = slidesContainer.children.length;
      buttonsPrevious.forEach(buttonPrevious => buttonPrevious.addEventListener('click', handlePrevious));
      buttonsNext.forEach(buttonNext => buttonNext.addEventListener('click', handleNext));
      // adding active class to active slide
      activeSlide()
      // Função próximo dialogo
  
      let currentDialogueIndex = 0;
      function nextDialogue() {
        // pega o elemento dialogo
        if (currentDialogueIndex < RPG.story[chapter].dialogues.length) {
          if(currentSlide == 2) {
            let activeIMG;
            let currentDialogue = RPG.story[chapter].dialogues[currentDialogueIndex];
            let characterActive = RPG.characters[currentDialogue.id];
            document.querySelectorAll('.novel-img').forEach(novelImg => novelImg.classList.remove('active'));
            if (currentDialogue.id) {
              let audioEl = document.querySelector('#voice');
              activeIMG = document.querySelector(`#img${currentDialogue.pos || 1}`);
              activeIMG.src = "";
              activeIMG.style.display = 'block'
              if (currentDialogue.type === '#') {
                console.log('#')
                document.querySelectorAll('.novel-img').forEach(img => img.style.display = 'none')
              }  else if (typeof currentDialogue.type === 'string' && currentDialogue.type !== '#' && currentDialogue.type !== undefined ) {
                activeIMG.src = characterActive[currentDialogue.type]
                console.log('The string is not "#" but is a valid string.');
              } else { 
                activeIMG.src = characterActive['defaultLink']
                console.log('defat.');
              }
              if (characterActive?.audio?.length > 0) {
                audioEl.src = characterActive.audio[Math.floor(Math.random() * characterActive.audio.length)];
                audioEl.volume = 0.3;
                audioEl.play();
              }
              activeIMG.classList.add('active');
            }
            // se tiver bg
            if (currentDialogue?.bg) {
              slides[currentSlide].style.backgroundImage = `url(${currentDialogue.bg})`;
            }
            if (currentDialogue?.title) {
              document.querySelector('.title-header').innerHTML = currentDialogue.title
            }
            if (currentDialogue?.subtitle) {
              document.querySelector('.subtitle-header').innerHTML = currentDialogue.subtitle
            }
            const overlayElement = document.querySelector('.novel-overlay');
            if (currentDialogue?.overlay) {
              overlayElement.src = currentDialogue.overlay;
              overlayElement.onload = () => {
                overlayElement.style.display = 'block'; // Show only when loaded
              };
              overlayElement.onerror = () => {
                overlayElement.style.display = 'none'; // Hide if there's an error loading
              };
              // Initially hide the image
              overlayElement.style.display = 'none';
            } else {
              overlayElement.style.display = 'none';
            }     
            document.querySelector('.novel-section').removeAttribute('id');
            document.querySelector('.novel-section').id = RPG.story[chapter].dialogues[currentDialogueIndex].id;
            let paragraphElement = document.querySelector(`.novel-dialogues p`);
            paragraphElement.innerHTML = RPG.story[chapter].dialogues[currentDialogueIndex].dialogue;
            currentDialogueIndex++;
          }
        } else {
          // quando os dialogos chegarem no maximo vai para proximo slide
          let imgs = document.querySelectorAll(".novel-img");
          imgs.forEach(img => img.style.display ='none')
          handleNext();
        }
      }
      const novelDialogues = document.querySelector('.novel-dialogues .dialogues-arrow');
      novelDialogues.addEventListener('click', nextDialogue);
    }
  
    const carousels = document.querySelectorAll('[data-carousel]');
    carousels.forEach(setUpCarousel);
    const musicButton = document.querySelector('.carousel-btn-music')
    musicButton.addEventListener("click",bgOst)
    function bgOst() {
      let audio = document.getElementById("bg-ost-sound");
      if(audio.currentTime == 0 || audio.paused) {
        audio.volume=0.1;
        audio.play();
        document.querySelector('.carousel-btn-music .material-symbols-outlined').innerHTML = "pause";
      } else {
        document.querySelector('.carousel-btn-music .material-symbols-outlined').innerHTML = "play_arrow";
        audio.pause();
      }
    }
  }
  
  main();
  