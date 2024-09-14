console.clear()
// Array of dialogues


function animate(element, parent) {
  parent.forEach(el => el.style.animation = '')
  element.style.opacity = '0'
  return element.style.animation = "fade-in 2s 0s ease-in forwards"
}
const slides = document.querySelectorAll('.slide')

function modulo(number, mod) {
  let result = number % mod;
  if (result < 0) {
    result += mod;
  }
  return result;
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
    currentDialogueIndex = 0
    if (currentSlide + 1 == slides.length) {
      let creditsAudio = document.querySelector("#credits-audio")
      creditsAudio.volume = 0.3
      creditsAudio.play()
    }
    nextDialogue()
    animate(slides[slideNumber], slides)
    carousel.style.setProperty('--current-slide', slideNumber);
  }
  // animate(slides[0],slides)
  // get elements
  const buttonsPrevious = carousel.querySelectorAll('[data-carousel-button-previous]');
  const buttonsNext = carousel.querySelectorAll('[data-carousel-button-next]');
  const slidesContainer = carousel.querySelector('[data-carousel-slides-container]');
  animate(slides[0], slides)

  // carousel state we need to remember
  let currentSlide = 0;
  const numSlides = slidesContainer.children.length;

  // set up events
  buttonsPrevious.forEach(buttonPrevious => buttonPrevious.addEventListener('click', handlePrevious))

  buttonsNext.forEach(buttonNext => buttonNext.addEventListener('click', handleNext))
  console.log(buttonsNext)


  // Function to change dialogue
  let currentDialogueIndex = 0;
  function nextDialogue() {
    let currentDialogueElement = document.querySelector('.novel-dialogues').classList[1]
    if (currentDialogueIndex < dialogues[currentDialogueElement].length) {
      // console.log(dialogues)
      if(currentSlide == 2) {
      let activeIMG;
      let currentDialogue = dialogues[currentDialogueElement][currentDialogueIndex];
      let characterActive = charactersContent[currentDialogue.id]
      document.querySelectorAll('.novel-img').forEach(novelImg => novelImg.classList.remove('active'))
      if (currentDialogue.id) {
        let audioEl = document.querySelector('#voice')
        activeIMG = document.querySelector(`#img${currentDialogue.pos || 1}`)
        activeIMG.src = ""
        activeIMG.src = characterActive[currentDialogue.type || 'defaultLink']
        console.log(characterActive)
        if (characterActive?.audio?.length > 0) {
          
          audioEl.src = characterActive.audio[Math.floor(Math.random() * characterActive.audio.length)];

          audioEl.volume = 0.2
          audioEl.play()
        }
   
        activeIMG.classList.add('active')
      }
      console.log()
        if (currentDialogue?.bg) {
      console.log(slides[currentSlide].style)
      slides[currentSlide].style.backgroundImage = `url(${currentDialogue.bg})`;
    }
      document.querySelector('.novel-section').removeAttribute('id');
      document.querySelector('.novel-section').id = dialogues[currentDialogueElement][currentDialogueIndex].id

      let paragraphElement = document.querySelector(`.novel-dialogues.${currentDialogueElement} p`)
      paragraphElement.innerHTML = dialogues[currentDialogueElement][currentDialogueIndex].dialogue;
      currentDialogueIndex++;
      }
    } else {
      handleNext()
    }
  }
  const novelDialogues = document.querySelector('.novel-dialogues .dialogues-arrow')

  novelDialogues.addEventListener('click', nextDialogue)
}

const carousels = document.querySelectorAll('[data-carousel]');
carousels.forEach(setUpCarousel);

const charactersContent = {
  hana: {
    defaultLink: "./assets/hana.png",
    audio: ['./assets/hana1.mp4','./assets/hana2.mp4','./assets/hana3.mp4']
  }

}
const dialogues = {
  chapter1: [
 { id: null, bg: "./assets/library.png", dialogue: `In the library, a sunlit haven filled with the scent of old books and polished wood, you see Hana. She’s standing in front of a towering bookshelf, absorbed in her search. The warm light filtering through the arched windows casts a soft glow on her, giving her an almost ethereal presence.` },
    { id: "hana", dialogue: `“Uhm. Hello. Can you help me with something?” <bold>Noticing you approaching, she looks up with a gentle, yet slightly hesitant smile.</bold>`, pos: 3 },
    { id: "", dialogue: `She turns to face you fully, holding her bag close to her chest as if it’s a small shield in this unfamiliar setting.`, pos: 3 },
    { id: "hana", dialogue: `“I’m searching for a specific book, but I haven’t been able to find it yet. This library is quite enormous.” <bold>Her eyes flicker between you and the shelves.</bold>`, pos: 3 },
    { id: "", dialogue: `She takes a step closer to you, her expression reflecting a mix of relief and frustration.`, pos: 3 },
    { id: "hana", dialogue: `“The book I’m looking for is on medieval history. It’s crucial for a project I’m working on.” <bold>She glances around the library, her gaze showing a hint of apprehension.`, pos: 3 },
    { id: "hana", dialogue: `“I hope I’m not being too much of a bother. It’s just that everything seems so new and overwhelming.” <bold>With a small, hopeful smile, she tucks a stray lock of hair behind her ear, waiting for your response.`, pos: 3 },
    {id:"", dialogue: "<bold>Continue the story below to see how this encounter unfolds and what new developments arise from this unexpected meeting. You can type Chapter 1 2 and 3 to change them."}
  ],  chapter2: [
    { id: null, bg: "./assets/school.jpg", dialogue: `While decorating a stall with you, Hana accidentally gets a splash of paint on her cheek, and she laughs, her laughter ringing clear and genuine.` },
       { id: "hana", dialogue: `“Well, this is turning into quite the artistic mess, isn’t it?” <bold>Her laughter is infectious, and as you both continue to work together, the interaction reveals a more playful and relaxed side of her.`, pos: 3 },
       { id: "", dialogue: `Later, as the festival kicks off, Hana stands by a food stall, handing out snacks and chatting with you.`, pos: 3 },
       { id: "hana", dialogue: `“I have to admit, this is more fun than I expected. It’s nice to see everyone so lively and engaged.” <bold>She adjusts her apron with a satisfied grin and hands you a snack, her posture relaxed and her smile more genuine than before. She takes a moment to enjoy the festivities around her, her earlier reserve giving way to a more carefree demeanor.`, pos: 3 },
       { id: "", dialogue: `Throughout the festival, Hana’s interactions become increasingly relaxed. She enjoys the event with a newfound enthusiasm, her usual aloofness giving way to a more approachable demeanor. At one point, you both find yourselves taking a break, sitting on a nearby bench.`, pos: 3 },
       { id: "hana", dialogue: `“I’m really glad we got to do this together. It’s been a while since I felt this comfortable with someone.” <bold>Hana leans back on the bench, her shoulders relaxed and her gaze soft as she looks at you.`, pos: 3 },
       { id: "", dialogue: `Her words are sincere, and she looks at you with a soft smile, her eyes reflecting the joy of the day. As the festival begins to wind down and the lights start to dim, you and Hana share a quiet moment, reflecting on the fun and chaos of the day. The connection between you deepens, marking the beginning of a meaningful bond.`, pos: 3 },
       {id:"", dialogue: "<bold>Continue the story below to see how this encounter unfolds and what new developments arise from this unexpected meeting. You can type Chapter 1 2 and 3 to change them."}
     ], chapter3: [
      { id: null, bg: "./assets/library.png", dialogue: `One afternoon, while working on the project, you’re in a quiet corner of the library, surrounded by scattered notes and textbooks. Hana, normally reserved, begins to show a more vulnerable side as the pressure mounts.` },
         { id: "hana", dialogue: `<bold>Rubbing her eyes tiredly and glancing at the stacks of books and papers around her.</bold> “I didn’t realize how much work this project would involve. It’s starting to feel a bit overwhelming.”`, pos: 3 },
         { id: "", dialogue: `She leans back in her chair, her posture slumped slightly as she looks at you with a mix of frustration and concern.`, pos: 3 },
         { id: "hana", dialogue: `“I’m sorry if I’m not being very helpful. I guess I’m just feeling the pressure more than I thought I would.”  <bold>Hana shifts uncomfortably in her chair, her shoulders slumping slightly as she looks down at the cluttered table.`, pos: 3 },
         { id: "", dialogue: `You offer taking a short break to clear your minds. Hana agrees, and you both decide to step outside for a walk. The crisp air and quiet surroundings provide a refreshing change from the intense focus of your work.`, bg: "./assets/park.jpg", pos: 3 },
         {id:"",dialogue: "As you walk, she takes a deep breath and looks around at the peaceful scenery."},
         { id: "hana", dialogue: `"This is exactly what I needed. Sometimes it’s hard to remember that there’s more to life than just deadlines and grades.” <bold>She seems to relax and becomes more open, sharing thoughts about her life outside of school, her family, and her hopes for the future. You listen attentively, appreciating the trust she places in you.`, pos: 3 },
         { id: "", dialogue: `By the time you return to the library, Hana appears rejuvenated and more focused. The conversation and the break have clearly made a difference, and she approaches the project with renewed energy.`, pos: 3 },
         {id:"", dialogue: "<bold>Continue the story below to see how this encounter unfolds and what new developments arise from this unexpected meeting. You can type Chapter 1 2 and 3 to change them."}
       ]
};
function bgOst() {
  let audio = document.getElementById("bg-ost-sound");
  if(audio.currentTime == 0 || audio.paused) {
  audio.volume=0.1;
  audio.play();
     document.querySelector('.carousel-btn-music .material-symbols-outlined').innerHTML = "pause"
  } else {
    // .innerText = "pause"
    document.querySelector('.carousel-btn-music .material-symbols-outlined').innerHTML = "play_arrow"
    audio.pause()
  }
}
// { id: "", dialogue: ``, pos: 0 },
