console.clear()
// Array of dialogues
const dialogues = [
  { id: "", dialogue: "As the Straw Hat Pirates guide you through the dense foliage, their voices blend into a chorus of excitement and camaraderie. Luffy leads the charge, his infectious grin lighting the way towards the Thousand Sunny. Zoro's vigilant gaze sweeps the surroundings, ensuring no surprises interrupt their path." },
{ id: "luffy", dialogue: `"Hey! Follow us, our ship's just up ahead!" <bold>Luffy grins widely, bounding ahead with infectious excitement.`,pos:1 },
  { id: "nami", dialogue: `"It's not every day we invite someone new aboard. You better keep up." <bold>Nami checks her map with a calculating gaze, guiding the group forward.`, pos:2, feeling:'mad'},
  { id: "sanji", dialogue: `"Hey, Nami-swan, don't you think this island is a bit more beautiful with you here?" <bold>Sanji's voice carries a playful and flirty tone as he walks alongside nami, his eyes gleaming with mischief, enjoying the scenic surroundings leading to the ship.`,pos:3 },
  {
    id: "robin", dialogue: `"Welcome to our world. The Thousand Sunny is our sanctuary."
<bold>Robin's tone is calm and welcoming, embodying a sense of reassurance.`, pos:4 },
  { id: "brook", dialogue: `"Yohoho! Welcome aboard, my friend! Let's make memories together!" <bold>Brook strums his violin with a cheerful melody, setting a lively atmosphere for the journey ahead.`, pos:5 },
  { id: "", dialogue: `Chopper, eager to share his medical expertise, eagerly discusses the infirmary's layout. Robin's calm demeanor offers reassurance, emphasizing the ship's role as a safe haven.` }
];

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
    console.log(slideNumber, slides)
    currentDialogueIndex = 0
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
      let audioEl = document.querySelector('#voice')
      document.querySelectorAll('.novel-img').forEach(novelImg => novelImg.classList.remove('active'))
      if(currentDialogue.id) {
        let characterActive = charactersContent[currentDialogue.id]
        activeIMG = document.querySelector(`#img${currentDialogue.pos || 1}`)
        activeIMG.src = characterActive[currentDialogue.feeling || 'defaultLink']
        activeIMG.classList.add('active')
        console.log(characterActive)
        if(characterActive?.audio?.length > 0) {
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
  luffy: {

    defaultLink: "https://imgur.com/ZJWxuqb.png",
    audio: ['https://ami.animecharactersdatabase.com/audio/1447/1088/1447-1088-239.mp4']
  },
  nami: {
    defaultLink: "https://imgur.com/CBY4FjF.png",
    mad: "https://imgur.com/cydSboX.png",
    audio: ['https://ami.animecharactersdatabase.com/audio/1447/1088/1447-1088-130.mp4']
  },
  sanji: {
    defaultLink: "https://imgur.com/KcgJnpU.png"
  },
  zoro: {
    defaultLink: "https://imgur.com/2BF03i1.png"
  },
  robin: {
    defaultLink: "https://imgur.com/cydSboX.png"
  },
  brook: {
    defaultLink: "https://imgur.com/2BF03i1.png"
  }

}
// Prevent default Tab behavior
document.addEventListener('keydown', (event) => {
  if (event.key === 'Tab') {  
      event.preventDefault(); // Prevent the default tab action
  }
});