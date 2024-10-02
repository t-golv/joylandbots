async function main_script() {
  let greeting = document
    .querySelectorAll(".chat-list-item")[1]
    .querySelector(".body-text.robot-text.last-text");
  greeting.style.width = "100%";
  greeting.style.padding = "0";
  let textBlack = greeting.querySelector(".text-black");
  textBlack.remove();
  const response = await fetch(
    "https://t-golv.github.io/joylandbots/storymode/01ManiacClassmate/greeting.html"
  );
  const html = await response.text();
  greeting.innerHTML += html;
}

main_script();
