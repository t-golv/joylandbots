async function main_script() {
  let greeting = document
    .querySelectorAll(".chat-list-item")[1]
    .querySelector(".body-text.robot-text.last-text");
  greeting.style.width = "100%";
  let markdown = greeting.querySelector(".markdown-body");
  let btnScript = document.getElementById("markdown-btn");
  const response = await fetch("http://127.0.0.1:5502/Assets/test/index.html");
  const html = await response.text();
  markdown.innerHTML = html;
  // markdown.appendChild();
  btnScript.remove();
}

main_script();
