async function main_script() {
  // Get the URL of the currently executing script
  const scriptUrl = document.currentScript.src;

  // Parse the URL to get parameters
  const url = new URL(scriptUrl);
  const dataParam = url.searchParams.get("file");
  const dataParamHtml = url.searchParams.get("html");

  // Use the parameter as needed
  const greetingElements = document.querySelectorAll(
    `.body-text.robot-text.last-text:has(#markdown-btn)`
  );

  const filteredGreeting = Array.from(greetingElements).filter((greeting) => {
    const markdownBtn = greeting.querySelector("#markdown-btn");
    return markdownBtn && markdownBtn.classList.contains(dataParamHtml); // Checking if it has the class from dataParamHtml
  });

  // Check if filteredGreeting has any elements
  if (filteredGreeting.length > 0) {
    greeting = filteredGreeting[0]; // If there's a match, use the first one
  } else {
    greeting = greetingElements[0]; // Fallback to the first greetingElement if no match
  }

  console.log(greeting); // This will log the result

  // const greeting = greetingElements[greetingElements.length - 1];
  greeting.style.width = "100%";
  greeting.style.padding = "0";
  const textBlack = greeting.querySelector(".text-black");
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
  const iframe = greeting.querySelectorAll(".iframe-greeting"); // Adjust selector as needed

  if (iframe && dataParam) {
    iframe[
      iframe.length - 1
    ].src = `https://t-golv.github.io/joylandbots/storymode/${dataParam}/${
      dataParamHtml ? dataParamHtml : "index"
    }.html`;
  } else {
    console.error("Iframe not found or no file parameter provided.");
  } // Change the CSS link
  const cssLink = greeting.querySelector('link[rel="stylesheet"]');

  async function checkAndSetCSSLink() {
    const response = await fetch(
      `https://t-golv.github.io/joylandbots/storymode/${dataParam}/greetings.css`
    );
    if (response.ok) {
      cssLink.href = `https://t-golv.github.io/joylandbots/storymode/${dataParam}/greetings.css`; // Set the href to the dynamically generated URL
    } else {
      // cssLink.href = `https://t-golv.github.io/joylandbots/storymode/assets/greetings.css`; // Fallback URL
    }
  }
  checkAndSetCSSLink();
}

// Execute the script
main_script();
