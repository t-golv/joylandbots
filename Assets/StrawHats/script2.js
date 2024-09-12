console.clear()
// Array of dialogues
const dialogues = [
  { id: "", dialogue: "As the Straw Hat Pirates guide you through the dense foliage, their voices blend into a chorus of excitement and camaraderie. Luffy leads the charge, his infectious grin lighting the way towards the Thousand Sunny. Zoro's vigilant gaze sweeps the surroundings, ensuring no surprises interrupt their path." },
  { id: "", dialogue: "Nami, ever the navigator, balances caution with curiosity, glancing at her map to confirm their route. Usopp weaves tales of the ship's legendary status, fueling anticipation with each step. Sanji's culinary promises hang in the air, promising delights to come aboard the ship." },
  { id: "", dialogue: "Franky's pride in his creation shines through as he prepares to unveil the Thousand Sunny's wonders. And Brook, with his musical charm, sets a festive tone, welcoming you into the heart of the Straw Hat Pirates' world aboard their beloved ship." }
  , { id: "luffy", dialogue: `"Hey! Follow us, our ship's just up ahead!" <bold>Luffy grins widely, bounding ahead with infectious excitement.` },
  {id: "nami", dialogue: `"It's not every day we invite someone new aboard. You better keep up." <bold>Nami checks her map with a calculating gaze, guiding the group forward.`},
  { id: "sanji", dialogue: `"Hey, Nami-swan, don't you think this island is a bit more beautiful with you here?" <bold>Sanji's voice carries a playful and flirty tone as he walks alongside nami, his eyes gleaming with mischief, enjoying the scenic surroundings leading to the ship.` },
  { id: "robin", dialogue: `"Welcome to our world. The Thousand Sunny is our sanctuary."
<bold>Robin's tone is calm and welcoming, embodying a sense of reassurance.` },
  { id: "brook", dialogue: `"Yohoho! Welcome aboard, my friend! Let's make memories together!" <bold>Brook strums his violin with a cheerful melody, setting a lively atmosphere for the journey ahead.` },
  {id : "", dialogue: `Chopper, eager to share his medical expertise, eagerly discusses the infirmary's layout. Robin's calm demeanor offers reassurance, emphasizing the ship's role as a safe haven.`} 
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
      console.log(dialogues)
      document.querySelector('.novel-section').removeAttribute('id');

      document.querySelector('.novel-section').id = dialogues[currentDialogueIndex].id

      let pEl = document.querySelector('.novel-dialogues p').innerHTML = dialogues[currentDialogueIndex].dialogue;
      console.log(pEl)
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
