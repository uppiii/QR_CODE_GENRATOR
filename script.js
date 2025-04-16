let btn = document.querySelector(".button");
let qr_code_element = document.querySelector(".qr-code");
let user_input = document.querySelector("#input_text");

// Create a feedback message element
const message = document.createElement("p");
message.style.color = "#eee5e9";
message.style.fontSize = "1.4rem";
message.style.margin = "1rem 0";
message.style.fontFamily = "Poppins, sans-serif";
document.querySelector(".user-input").appendChild(message);

btn.addEventListener("click", () => {
  if (user_input.value.trim() !== "") {
    qr_code_element.innerHTML = "";

    showLoading(); // Add loading animation
    setTimeout(() => {
      generate(user_input);
    }, 500);
  } else {
    message.textContent = "⚠️ Please enter a valid URL or text!";
    qr_code_element.style.display = "none";
  }
});

function generate(user_input) {
  qr_code_element.style.display = "flex";
  message.textContent = "✅ QR Code Generated!";

  let qrcode = new QRCode(qr_code_element, {
    text: `${user_input.value}`,
    width: 180,
    height: 180,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
  });

  // Add download button
  let download = document.createElement("button");
  download.classList.add("download-btn");
  download.style.marginTop = "1.5rem";
  qr_code_element.appendChild(download);

  let download_link = document.createElement("a");
  download_link.setAttribute("download", "qr_code.png");
  download_link.innerHTML = `📥 Download`;
  download.appendChild(download_link);

  // Add copy to clipboard button
  let copyBtn = document.createElement("button");
  copyBtn.textContent = "📋 Copy Text";
  copyBtn.style.marginTop = "1rem";
  copyBtn.style.background = "#444";
  copyBtn.style.color = "#fff";
  copyBtn.style.border = "none";
  copyBtn.style.padding = "0.8rem";
  copyBtn.style.borderRadius = "0.5rem";
  copyBtn.style.cursor = "pointer";
  qr_code_element.appendChild(copyBtn);

  copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(user_input.value).then(() => {
      copyBtn.textContent = "✅ Copied!";
      setTimeout(() => (copyBtn.textContent = "📋 Copy Text"), 1500);
    });
  });

  // Generate QR code image link
  let qr_code_img = document.querySelector(".qr-code img");
  let qr_code_canvas = document.querySelector("canvas");

  setTimeout(() => {
    if (qr_code_img?.getAttribute("src") == null && qr_code_canvas) {
      download_link.setAttribute("href", `${qr_code_canvas.toDataURL()}`);
    } else {
      download_link.setAttribute("href", `${qr_code_img?.getAttribute("src")}`);
    }
  }, 300);
}

// Optional: Show loading while QR code is being created
function showLoading() {
  qr_code_element.innerHTML = `<div class="loader"></div>`;
  qr_code_element.style.display = "flex";
}

// Clear on page load
user_input.value = "";

// You can also call generate() with a default value for demo purposes if you want
// generate({ value: "https://codepen.io/coding_dev_" });
