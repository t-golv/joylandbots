async function main_script() {
  let greeting = document
    .querySelectorAll(".chat-list-item")[1]
    .querySelector(".body-text.robot-text.last-text");
  greeting.style.width = "100%";
  greeting.style.padding = "0";
  let textBlack = greeting.querySelector(".text-black");
  textBlack.remove();
  const response = await fetch("http://127.0.0.1:5502/Assets/test/index.html");
  const html = await response.text();
  greeting.innerHTML += html;
}

main_script();
