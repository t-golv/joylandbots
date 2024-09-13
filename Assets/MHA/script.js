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
      creditsAudio.volume = 0.15
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
    if (currentDialogueIndex < dialogues.length) {
      // console.log(dialogues)
      let activeIMG;
      let currentDialogue = dialogues[currentDialogueIndex];
      document.querySelectorAll('.novel-img').forEach(novelImg => novelImg.classList.remove('active'))
      if (currentDialogue.id) {
      let audioEl = document.querySelector('#voice')
        let characterActive = charactersContent[currentDialogue.id]
        activeIMG = document.querySelector(`#img${currentDialogue.pos || 1}`)
        activeIMG.src = characterActive[currentDialogue.type || 'defaultLink']
        activeIMG.classList.add('active')
        console.log(characterActive)
        if (characterActive?.audio?.length > 0) {
          audioEl.src = characterActive.audio[0]
          audioEl.volume = 0.4
          audioEl.play()
        }
      }
      document.querySelector('.novel-section').removeAttribute('id');
      document.querySelector('.novel-section').id = dialogues[currentDialogueIndex].id

      let paragraphElement = document.querySelector('.novel-dialogues p').innerHTML = dialogues[currentDialogueIndex].dialogue;

      currentDialogueIndex++;
    } else {
      handleNext()
    }
  }
  const novelDialogues = document.querySelector('.novel-dialogues .dialogues-arrow')

  novelDialogues.addEventListener('click', nextDialogue)
}

const carousels = document.querySelectorAll('[data-carousel]');
carousels.forEach(setUpCarousel);

function playsong() {

}

const charactersContent = {
  deku: {
    defaultLink: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F5d%2F29%2Fd1%2F5d29d149af309c9522c7db7d19f2f7df.png&f=1&nofb=1&ipt=7c11702bba14c7ae633de74c080dc39d1bb771ae44bc52d3804477c7d56b9dd4&ipo=images",
    casualLink: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Ff1%2F42%2F2f%2Ff1422f396e5567efbc52ff8f1090cd31.png&f=1&nofb=1&ipt=3e8dda4ce32d6ebd729203741a65e2e0b7d297405ed3e881ad0c76417a0afeb8&ipo=images",
    audio: ['https://ami.animecharactersdatabase.com/audio/104680/44/104680-44-127.mp4']
  },
  bakugo: {
defaultLink: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.nicepng.com%2Fpng%2Ffull%2F267-2670042_full-body-png.png&f=1&nofb=1&ipt=0f190d1d625a9a1bda7e8313e2ecdc51149aa85c47d2be2dbab2cc9c36bd85cf&ipo=images",
    audio: ['https://ami.animecharactersdatabase.com/audio/104680/58/104680-58-140.mp4']
  },
  todoroki: {
    defaultLink:"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.nicepng.com%2Fpng%2Ffull%2F316-3163836_shoto-todoroki-hero-profile-2-my-hero-academia.png&f=1&nofb=1&ipt=6228023b81d977f17253c1e0888ce8431e9097bce414b1768575469e0aadb93d&ipo=images",
    audio: ['https://ami.animecharactersdatabase.com/audio/104680/58/104680-58-292.mp4',"https://ami.animecharactersdatabase.com/audio/104680/31/104680-31-217.mp4"]
  },
  ochaco: {
    defaultLink:"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.nicepng.com%2Fpng%2Ffull%2F89-891997_ochaco-costume-full-body-ochako-uraraka-hero-costume.png&f=1&nofb=1&ipt=e63b80887e76a0148237e7cea1cfcd29490889a0d7e9d720e152e1f91f1a6bf7&ipo=images",
    audio: ['https://ami.animecharactersdatabase.com/audio/104680/34/104680-34-389.mp4']

  },
  tenya: {
    defaultLink:"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fvignette.wikia.nocookie.net%2Fhero-academia%2Fimages%2Fe%2Fe6%2FTenya_Iida.png%2Frevision%2Flatest%3Fcb%3D20180528154437%26path-prefix%3Dpl&f=1&nofb=1&ipt=d3f969e306b3f9db7daf4542a5e7ea95c239f536b9d7ad052d7cc4b3cd1b4f58&ipo=images",
    audio: ['https://ami.animecharactersdatabase.com/audio/104680/31/104680-31-39.mp4']

  }

}
const dialogues = [
  {id: null, dialogue: "In the midst of their daily routines at U.A. High School, the students suddenly found themselves enveloped in an ominous haze. Ochaco Uraraka, caught in the midst of a training session, felt a chill run down her spine as the faint smell of something unfamiliar tickled her senses."},
  { id: "ochaco", dialogue: `"What's that smell?" <bold>she muttered, looking around cautiously. Her thoughts raced, trying to piece together the unsettling puzzle unfolding around her.`, pos: 3 },
    {id: null, dialogue: "Meanwhile, Izuku Midoriya was in the middle of reviewing hero techniques when the first whispers of panic echoed through the hallways. His instincts kicked in immediately, his mind processing the unusual scent and its potential implications."},
  {
    id: "deku", dialogue: `Gas? <bold>he questioned aloud, a knot forming in his stomach. His thoughts turned to his classmates, wondering if they were safe amidst the growing confusion.`, pos: 1
  },    {id: null, dialogue: "Katsuki Bakugo, always alert and ready for action, sensed the change in the air before the gas alarms blared. His eyes narrowed as he recognized the threat"},
  { id: "bakugo", dialogue: `"Damn it," <bold>he growled, muscles tensing as he prepared to spring into action. His mind raced with strategies to protect those around him, his explosive quirk ready to be unleashed against any adversary.`, pos: 2},
   {id: null, dialogue: "Shoto Todoroki, calm and composed as ever, felt the temperature drop unnaturally around him. His instincts told him something was wrong, and the sudden chill in the air was a stark contrast to the warmth of the school day"},
  { id: "todoroki", dialogue: `"Ice and fire won't be enough if this spreads," <bold>he thought, already formulating a plan to assist in evacuations and contain the danger.`, pos: 4 },
   {id: null, dialogue: `Tenya Iida, always vigilant in upholding order, heard the distant commotion and immediately sprang into action.`},
  { id: "tenya", dialogue: `"Gas attack," <bold>he declared, voice carrying authority as he directed his classmates to safety. His mind raced with thoughts of securing the perimeter and ensuring that everyone remained calm and accounted for amidst the chaos.`, pos: 5 },
  
];
