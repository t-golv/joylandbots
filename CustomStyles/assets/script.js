async function main_script() {
  // Get the URL of the currently executing script
  const scriptUrl = document.currentScript.src;
  // Parse the URL to get parameters
  const url = new URL(scriptUrl);
  const dataParam = url.searchParams.get("path");
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

  // const greeting = greetingElements[greetingElements.length - 1];
  greeting.style.width = "100%";
  greeting.style.padding = "0";
  const markdownBody = greeting.querySelector(".markdown-body");
  if (markdownBody) {
    markdownBody.querySelector("link").remove();
    markdownBody.querySelector("button").remove();
    let response;
    try {
      response = await fetch(
        `https://t-golv.github.io/joylandbots/CustomStyles/${dataParam}/index.html`
      );
      if (response.ok) return;
      else throw new Error("Not found");
    } catch (e) {
      response = await fetch(
        `https://t-golv.github.io/joylandbots/CustomStyles/assets/greeting.html`
      );
      if (response.ok) return;
    } finally {
      const html = await response.text();

      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      doc.body.querySelector(".msg-content").innerHTML +=
        markdownBody.innerHTML;

      markdownBody.innerHTML = doc.documentElement.innerHTML; // Append the fetched HTML
    }
  }
  // Fetch the HTML content

  const cssLink = greeting.querySelector('link[rel="stylesheet"]');

  async function checkAndSetCSSLink() {
    const response = await fetch(
      `https://t-golv.github.io/joylandbots/CustomStyles/${dataParam}/index.css`
    );
    if (response.ok) {
      cssLink.href = `https://t-golv.github.io/joylandbots/CustomStyles/${dataParam}/greetings.css`; // Set the href to the dynamically generated URL
    } else {
      cssLink.href = `https://t-golv.github.io/joylandbots/CustomStyles/assets/greetings.css`; // Fallback URL
    }
  }
  checkAndSetCSSLink();
}

// Execute the script
main_script();
