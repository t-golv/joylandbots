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
          audioEl.src = characterActive.audio[0]
          audioEl.volume = 0.4
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
  deku: {
    defaultLink: "./assets/deku.png",
    heroLink: "./assets/deku-hero.png",
    audio: ['https://ami.animecharactersdatabase.com/audio/104680/44/104680-44-127.mp4']
  },
  bakugo: {
    defaultLink: "./assets/bakugo.png",
    heroLink: "./assets/bakugo-hero.png",
    audio: ['https://ami.animecharactersdatabase.com/audio/104680/58/104680-58-140.mp4']
  },
  todoroki: {
    defaultLink: "./assets/todoroki.png",
    heroLink: "./assets/todoroki-hero.png",
    audio: ['https://ami.animecharactersdatabase.com/audio/104680/58/104680-58-292.mp4', "https://ami.animecharactersdatabase.com/audio/104680/31/104680-31-217.mp4"]
  },
  ochaco: {
    defaultLink: "./assets/ochaco.png",
    heroLink: "./assets/ochaco-hero.png",
    audio: ['https://ami.animecharactersdatabase.com/audio/104680/34/104680-34-389.mp4']

  },
  tenya: {
    defaultLink: "./assets/tenya.png",
    heroLink: "./assets/tenya-hero.png",
    audio: ['https://ami.animecharactersdatabase.com/audio/104680/31/104680-31-39.mp4']
  },

  aizawa: {
    defaultLink: "./assets/aizawa.png",   audio: ['https://ami.animecharactersdatabase.com/audio/104680/38/104680-38-86.mp4']
  },

  jiro: {
    defaultLink: "./assets/jiro.png",
    audio: ['https://ami.animecharactersdatabase.com/audio/104680/39/104680-39-139.mp4']
  },
  tsuyu: {
    defaultLink: "./assets/tsuyu.png",
    audio: ['https://ami.animecharactersdatabase.com/audio/104680/32/104680-32-137.mp4']
  },
  mina: {
    defaultLink: "./assets/mina.png",
    audio: ['https://ami.animecharactersdatabase.com/audio/104680/34/104680-34-186.mp4']
  },
  kirishima: {
    defaultLink: "./assets/kirishima.png",
    audio: ['https://ami.animecharactersdatabase.com/audio/104680/47/104680-47-389.mp4'] 
  },

}
const dialogues = {
  prologue: [
 { id: null, bg: "./assets/bg-4.jpg", dialogue: `The vibrant corridors of U.A. High School resounded with spirited chatter and the shuffle of footsteps. At a corner alcove overlooking the courtyard, Izuku Midoriya, Katsuki Bakugo, Shoto Todoroki, Ochaco Uraraka, and Tenya Iida gathered for their lunch break, exchanging the latest news and gossip.` },
    { id: "deku", dialogue: `"Hey, did you all hear about the new student joining us next week?" <bold>Izuku leaned forward, his green eyes bright with curiosity as he awaited his friends' reactions.`, pos: 3 },
    { id: "bakugo", dialogue: `"Another loser rookie? What's up with them, huh?" <bold>Katsuki's brow furrowed, his hands clenching unconsciously as he mentally prepared to assess the newcomer's abilities..`, pos:2},
    { id: "todoroki", dialogue: `"They're transferring from overseas. I heard they're pretty skilled." <bold>Shoto took a sip of his water, his expression thoughtful as he considered the implications of a new, potentially powerful addition to their class.`, pos: 4 },
    { id: "ochaco", dialogue: `"I hope they're nice! It's always fun meeting someone new." <bold>Ochaco glanced out the window, imagining the new student's arrival and wondering how they would fit into their tight-knit group.`, pos: 5 },
    { id: "tenya", dialogue: `"As class president, I'll ensure they're well-informed about our class dynamics and activities." <bold>Tenya straightened in his seat, already mentally preparing a welcoming speech and orientation plan for the newcomer.`, pos: 0 },
    { id: "", bg:"./assets/classroom.png", dialogue: `Later, after the lively chatter in the bustling halls, the classroom settled into a quiet anticipation as Mr. Aizawa entered with a new student in tow. His typically reserved demeanor held a hint of guarded interest, foreshadowing the introduction that was about to unfold in the stillness of the classroom.`, pos: 0 },
    { id: "aizawa", dialogue: `"Good morning, class." <bold>sighed Mr. Aizawa, his monotone voice cutting through the murmurs of the students.`, pos: 3 },
    { id: "aizawa", dialogue: `"We have a new student joining us today at U.A. High School. Please make them feel welcome as they introduce themselves." <bold>His tired eyes scanned the room, conveying a sense of detachment, yet with a subtle undertone of concern for the student's integration into the class.`, pos: 3 },
    { id: "jiro", dialogue: `<bold>Kyoka Jiro raises an eyebrow, her expression curious but cool.</bold> "Hey there. I'm Jiro. If you need any music recommendations, just let me know."`, pos: 4 },
    { id: "kirishima", dialogue: `<bold>Eijiro Kirishima grins broadly, his enthusiasm evident.</bold> "Yo! I'm Kirishima. If you ever wanna spar or need someone to lift something heavy, I'm your guy!"`, pos: 2 },
    { id: "mina", dialogue: `<bold>Mina Ashido waves enthusiastically, her excitement contagious.</bold> "Hey hey! I'm Mina. Can't wait to see what kind of quirks you've got!"`, pos: 5 },
    { id: "tsuyu", dialogue: `<bold>Tsuyu Asui nods calmly, her words measured and observant.</bold> "Ribbit. I'm Tsuyu. Nice to meet ya. If you need help navigating the school, just ask."`, pos: 1 },
        {id:"", dialogue: "<bold>Continue the story by introducing yourself to your classmates below, sharing your name and quirk. Once you've settled in with your new friends, type 'Chapter 1' to begin your next adventure at U.A. High School. Get ready for what lies ahead!"}
  ],
  chapter1: [
    {id: null, bg: "./assets/bg-1.png" ,dialogue: "After class, the students of U.A. High School eagerly took their new classmate on a tour of the expansive campus. Led by Izuku Midoriya, they strolled through the bustling halls, pointing out the training rooms and the impressive library."},
    {id:"deku",dialogue: `<bold>Izuku gestured excitedly towards the training rooms as they passed by, explaining.</bold> "And over here is the training room where we practice our quirks. It's pretty cool, right?"`,pos:1},
    {id:"todoroki",dialogue:`<bold>Shoto nodded, adding calmly</bold> "Yeah, you'll get used to the schedule. We have morning and afternoon sessions. Helps keep us sharp."`,pos:3},
    {id:"ochaco",dialogue:`<bold>Ochaco chimed in cheerfully</bold> "Oh, and don't forget about lunchtime! The cafeteria's over there."`,pos:2},
    {id:"ochaco",dialogue:`<bold>She pointed towards a set of double doors.</bold> "It can get pretty busy, but the food's not bad!"`,pos:2},
    {id:"bakugo",dialogue:`<bold>Katsuki crossed his arms with a confident smirk, scoffing</bold> "Hmph, food's not the point. The training grounds are where it's at. You'll see when we spar."`,pos:4},
    {id:"tenya",dialogue:`<bold>Tenya, ever the responsible guide, led the group towards the administrative offices, briskly walking ahead to point out</bold> "Of course, we also have the administrative offices this way. It's important to know where to go for information or if you need assistance."`,pos:5},
    {id:"deku",dialogue:`<bold>Izuku nodded enthusiastically, adding:</bold> "And the hero costume preparation rooms! You'll get your own locker soon enough." <bold>He gestured towards a row of lockers filled with colorful costumes.`,pos:1},
    {id: null, dialogue: "Ochaco Uraraka twirled in front of the mirror, her new hero costume sparkling under the bright lights of the preparation room..."},
    {id:"ochaco",dialogue:`<bold>She grinned at her friends, adjusting the utility belt around her waist.</bold> "What do you think? I feel like I could float through anything in this!"`,pos:2, type: 'heroLink' },
    {id:"deku",dialogue:`<bold>Izuku nodded enthusiastically, admiring the sleek design.</bold> "It suits you perfectly, Ochaco! The colors are vibrant, just like your spirit."`,pos:1},
    {id: null, dialogue: "Throughout the tour, they answered questions and shared stories, making sure their new friend felt welcomed and informed about life at U.A. High School."},
    {id:"", dialogue: "<bold>Continue the story by responding below. When you're ready to proceed, simply type 'Chapter 2' to embark on your next journey through U.A. High School."}
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
    {id:"", dialogue: "Continue the story by responding below, introducing your  classmates. When you're ready to proceed, simply type 'Chapter 1' to embark on your journey at U.A. High School."}
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
