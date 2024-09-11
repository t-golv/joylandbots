console.clear()
// Array of dialogues
const dialogues = [
  { id: "", dialogue: "The sun hung low over the island as your vessel approached, carrying you closer to the Straw Hat Pirates' rumored base. You anchored in a secluded cove, donned your disguise—a worn cloak and nondescript hat—and ventured inland, shadowed by dense foliage." },
  { id: "", dialogue: "Voices drifted on the breeze—a familiar laughter mingled with conversation. Peering through the foliage, you glimpsed the Straw Hat Pirates gathered in a clearing. Luffy's infectious grin lit up the scene as they discussed their next adventure." },
  { id: "", dialogue: "Heart pounding, you knew the challenge had begun. With the Admiral's words echoing, you steeled yourself. Infiltrating the Straw Hat Pirates would test your skills and resolve. The mission was clear; the fate of the seas depended on your success." }
  , { id: "luffy", dialogue: `"Hey, wait a minute! Who's that over there?" <bold>Points towards you with curiosity.</bold>` },
  {id: "", dialogue: `You freeze momentarily, caught off guard by Luffy's sharp observation. He beckons you over with a friendly grin.`},
  { id: "sanji", dialogue: `"Oi, are you lost? You look like you could use a good meal." <bold>Smiles warmly, gesturing towards the cooking area. The aroma of his cooking fills the air, tempting even the most stoic of spies.</bold>` },
  { id: "zoro", dialogue: `"Did you follow us here? What's your story?" <bold>Gazes at you intently, assessing your presence. His hand instinctively rests on one of his swords, a subtle reminder of the danger in underestimating the Straw Hats.` },
  { id: "usopp", dialogue: `"Hey, you're not one of those Marines spying on us, are you?" <bold>Says sarcastically and grins mischievously, but with a hint of suspicion. His keen eyes scan your expression for any telltale signs of deceit.` },  
  { id: "nami", dialogue: `"Are you a traveler? You seem like you have something to say. Come join us." <bold>Raises an eyebrow, inviting you closer to examine the map with her. Her eyes flicker with curiosity, searching for any hint of deception.` },
  {id : "", dialogue: `Feeling the weight of their collective scrutiny, you take a deep breath, realizing your cover may be at risk. Yet, a calculated risk presents an opportunity. Continue the story by replying below...`}
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
  const novelDialogues = document.querySelector('.novel-dialogues')

  novelDialogues.addEventListener('click', nextDialogue)
}

const carousels = document.querySelectorAll('[data-carousel]');
carousels.forEach(setUpCarousel);

function playsong() {

}
