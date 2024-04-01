export function copyToClipboard(text) {
  const temp = document.createElement("input");
  const body = document.querySelector("body");
  body.appendChild(temp);
  temp.value = text;
  temp.select();
  document.execCommand("copy");
  body.removeChild(temp);
}

export function copyToClipboardModern(text) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      console.info("Text copied to clipboard successfully.", text);
    })
    .catch((e) => {
      console.error(`Could not copy "${text}" to clipboard due to`, e);
      copyToClipboard(text);
    });
}
