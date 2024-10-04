async function main_script() {
  // Get the URL of the currently executing script
  const scriptUrl = document.currentScript.src;

  // Parse the URL to get parameters
  const url = new URL(scriptUrl);
  const dataParam = url.searchParams.get("file");

  // Use the parameter as needed
  let greeting = document
    .querySelectorAll(".chat-list-item")[1]
    .querySelector(".body-text.robot-text.last-text");
  greeting.style.width = "100%";
  greeting.style.padding = "0";

  let textBlack = greeting.querySelector(".text-black");
  if (textBlack) {
    textBlack.remove();
  }

  // Fetch the HTML content
  const response = await fetch(
    `https://t-golv.github.io/joylandbots/storymode/assets/greeting.html?file=${dataParam}`
  );
  const html = await response.text();
  greeting.innerHTML += html; // Append the fetched HTML

  // Now, change the iframe src if it exists in the fetched content
  const iframe = greeting.querySelector(".iframe-greeting"); // Adjust selector as needed
  if (iframe && dataParam) {
    iframe.src = `https://t-golv.github.io/joylandbots/storymode/${dataParam}/index.html`;
  } else {
    console.error("Iframe not found or no file parameter provided.");
  } // Change the CSS link
  const cssLink = greeting.querySelector('link[rel="stylesheet"]'); // Adjust selector if necessary
  if (iframe && dataParam) {
    cssLink.href = `https://t-golv.github.io/joylandbots/storymode/${dataParam}/greetings.css`; // Adjust URL as needed
  } else {
    cssLink.href = `https://t-golv.github.io/joylandbots/storymode/assets/greetings.css`; // Adjust URL as needed
  }
}

// Execute the script
main_script();