console.clear()
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
    console.log(slideNumber,  slides)
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
  animate(slides[0],slides)

  // carousel state we need to remember
  let currentSlide = 0;
  const numSlides = slidesContainer.children.length;

  // set up events
  buttonsPrevious.forEach(buttonPrevious => buttonPrevious.addEventListener('click', handlePrevious))
  
  buttonsNext.forEach( buttonNext => buttonNext.addEventListener('click', handleNext))
  console.log(buttonsNext)
  
 // Array of dialogues
const dialogues = [
    {name:"Hinata Hyuga", id: "hinata", dialogue: "aaaaaaaaaaaaaaaaaa"},

    {name:"Hinata Hyuga", id: "hinata", dialogue: "aaaaaaBBBa"},
];

// Function to change dialogue
let currentDialogueIndex = 0;
function nextDialogue() {
    if (currentDialogueIndex < dialogues.length) {
        console.log(dialogues)
        document.querySelector('.novel-section').removeAttribute('id');

        document.querySelector('.novel-section').id = dialogues[currentDialogueIndex].id

        let pEl = document.querySelector('.novel-dialogues p').innerText = dialogues[currentDialogueIndex].dialogue;
        console.log(pEl)
        currentDialogueIndex++;
    } else {
        handleNext()
    }
}
const novelDialogues = document.querySelector('.novel-dialogues')

novelDialogues.addEventListener('click', nextDialogue)
}

const carousels = document.querySelectorAll('[data-carousel]');
carousels.forEach(setUpCarousel);
 
