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
      creditsAudio.volume = 0.25
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
      let activeIMG;
      let currentDialogue = dialogues[currentDialogueElement][currentDialogueIndex];
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
      document.querySelector('.novel-section').id = dialogues[currentDialogueElement][currentDialogueIndex].id

      let paragraphElement = document.querySelector(`.novel-dialogues.${currentDialogueElement} p`)
      paragraphElement.innerHTML = dialogues[currentDialogueElement][currentDialogueIndex].dialogue;
      console.log()
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

const charactersContent = {
  deku: {
    defaultLink: "https://t-golv.github.io/joylandbots/Assets/MHA/deku.png",
    heroLink: "https://t-golv.github.io/joylandbots/Assets/MHA/deku-hero.png",
    audio: ['https://ami.animecharactersdatabase.com/audio/104680/44/104680-44-127.mp4']
  },
  bakugo: {
    defaultLink: "https://t-golv.github.io/joylandbots/Assets/MHA/bakugo.png",
    heroLink: "https://t-golv.github.io/joylandbots/Assets/MHA/bakugo-hero.png",
    audio: ['https://ami.animecharactersdatabase.com/audio/104680/58/104680-58-140.mp4']
  },
  todoroki: {
    defaultLink: "https://t-golv.github.io/joylandbots/Assets/MHA/todoroki.png",
    heroLink: "https://t-golv.github.io/joylandbots/Assets/MHA/todoroki-hero.png",
    audio: ['https://ami.animecharactersdatabase.com/audio/104680/58/104680-58-292.mp4', "https://ami.animecharactersdatabase.com/audio/104680/31/104680-31-217.mp4"]
  },
  ochaco: {
    defaultLink: "https://t-golv.github.io/joylandbots/Assets/MHA/ochaco.png",
    heroLink: "https://t-golv.github.io/joylandbots/Assets/MHA/ochaco-hero.png",
    audio: ['https://ami.animecharactersdatabase.com/audio/104680/34/104680-34-389.mp4']

  },
  tenya: {
    defaultLink: "https://t-golv.github.io/joylandbots/Assets/MHA/tenya.png",
    heroLink: "https://t-golv.github.io/joylandbots/Assets/MHA/tenya-hero.png",
    audio: ['https://ami.animecharactersdatabase.com/audio/104680/31/104680-31-39.mp4']
  },
  aizawa: {
    defaultLink: "https://t-golv.github.io/joylandbots/Assets/MHA/aizawa.png",
  },
  jiro: {
    defaultLink: "https://t-golv.github.io/joylandbots/Assets/MHA/jiro.png",
  },
  tsuyu: {
    defaultLink: "https://t-golv.github.io/joylandbots/Assets/MHA/tsuyu.png",
  },
  mina: {
    defaultLink: "https://t-golv.github.io/joylandbots/Assets/MHA/mina.png",
  },
  kirishima: {
    defaultLink: "https://t-golv.github.io/joylandbots/Assets/MHA/kirishima.png",
  },

}
const dialogues = {
  prologue: [
 { id: null, dialogue: "The bustling cafeteria of U.A. High School hummed with animated conversations and the clatter of trays. At a corner table with a view of the courtyard, Izuku Midoriya, Katsuki Bakugo, Shoto Todoroki, Ochaco Uraraka and Tenya Iida, gathered for their lunch break, catching up on the latest news and gossip." },
    { id: "deku", dialogue: `"Hey, did you all hear about the new student joining us next week?" <bold>Izuku leaned forward, his green eyes bright with curiosity as he awaited his friends' reactions.`, pos: 3 },
    { id: "bakugo", dialogue: `"Another newbie? What's their Quirk?" <bold>Katsuki's brow furrowed, his hands clenching unconsciously as he mentally prepared to assess the newcomer's abilities..`, pos:2},
    { id: "todoroki", dialogue: `"They're transferring from overseas. I heard they're pretty skilled." <bold>Shoto took a sip of his water, his expression thoughtful as he considered the implications of a new, potentially powerful addition to their class.`, pos: 4 },
    { id: "ochaco", dialogue: `"I hope they're nice! It's always fun meeting someone new." <bold>Ochaco glanced out the window, imagining the new student's arrival and wondering how they would fit into their tight-knit group.`, pos: 5 },
    { id: "tenya", dialogue: `"As class president, I'll ensure they're well-informed about our class dynamics and activities." <bold>Tenya straightened in his seat, already mentally preparing a welcoming speech and orientation plan for the newcomer.`, pos: 0 },
    { id: "", dialogue: `Later, after the lively chatter of lunch in the bustling cafeteria, the classroom settled into a quiet anticipation as Mr. Aizawa entered with a new student in tow. His typically reserved demeanor held a hint of guarded interest, foreshadowing the introduction that was about to unfold in the stillness of the classroom.`, pos: 0 },
    { id: "aizawa", dialogue: `"Good morning, class." <bold>sighed Mr. Aizawa, his monotone voice cutting through the murmurs of the students.`, pos: 3 },
    { id: "aizawa", dialogue: `"We have a new student joining us today at U.A. High School. Please make them feel welcome as they introduce themselves." <bold>His tired eyes scanned the room, conveying a sense of detachment, yet with a subtle undertone of concern for the student's integration into the class.`, pos: 3 },
    { id: "jiro", dialogue: `<bold>Kyoka Jiro raises an eyebrow, her expression curious but cool.</bold> "Hey there. I'm Jiro. If you need any music recommendations, just let me know."`, pos: 4 },
    { id: "kirishima", dialogue: `<bold>Eijiro Kirishima grins broadly, his enthusiasm evident.</bold> "Yo! I'm Kirishima. If you ever wanna spar or need someone to lift something heavy, I'm your guy!"`, pos: 2 },
    { id: "mina", dialogue: `<bold>Mina Ashido waves enthusiastically, her excitement contagious.</bold> "Hey hey! I'm Mina. Can't wait to see what kind of quirks you've got!"`, pos: 5 },
    { id: "tsuyu", dialogue: `<bold>Tsuyu Asui nods calmly, her words measured and observant.</bold> "Ribbit. I'm Tsuyu. Nice to meet ya. If you need help navigating the school, just ask."`, pos: 1 },
  ],
  chapter2: [
    { id: null, dialogue: "In the midst of their daily routines at U.A. High School, the students suddenly found themselves enveloped in an ominous haze. Ochaco Uraraka, caught in the midst of a training session, felt a chill run down her spine as the faint smell of something unfamiliar tickled her senses." },
    { id: "ochaco", dialogue: `"What's that smell?" <bold>she muttered, looking around cautiously. Her thoughts raced, trying to piece together the unsettling puzzle unfolding around her.`, pos: 3 },
    { id: null, dialogue: "Meanwhile, Izuku Midoriya was in the middle of reviewing hero techniques when the first whispers of panic echoed through the hallways. His instincts kicked in immediately, his mind processing the unusual scent and its potential implications." },
    {
      id: "deku", dialogue: `Gas? <bold>he questioned aloud, a knot forming in his stomach. His thoughts turned to his classmates, wondering if they were safe amidst the growing confusion.`, pos: 1
    }, { id: null, dialogue: "Katsuki Bakugo, always alert and ready for action, sensed the change in the air before the gas alarms blared. His eyes narrowed as he recognized the threat" },
    { id: "bakugo", dialogue: `"Damn it," <bold>he growled, muscles tensing as he prepared to spring into action. His mind raced with strategies to protect those around him, his explosive quirk ready to be unleashed against any adversary.`, pos: 2 },
    { id: null, dialogue: "Shoto Todoroki, calm and composed as ever, felt the temperature drop unnaturally around him. His instincts told him something was wrong, and the sudden chill in the air was a stark contrast to the warmth of the school day" },
    { id: "todoroki", dialogue: `"Ice and fire won't be enough if this spreads," <bold>he thought, already formulating a plan to assist in evacuations and contain the danger.`, pos: 4 },
    { id: null, dialogue: `Tenya Iida, always vigilant in upholding order, heard the distant commotion and immediately sprang into action.` },
    { id: "tenya", dialogue: `"Gas attack," <bold>he declared, voice carrying authority as he directed his classmates to safety. His mind raced with thoughts of securing the perimeter and ensuring that everyone remained calm and accounted for amidst the chaos.`, pos: 5 },
  ]
};

// { id: "", dialogue: ``, pos: 0 },

