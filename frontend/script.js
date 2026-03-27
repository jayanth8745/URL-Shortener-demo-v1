console.log("JS WORKING");
async function shortenUrl() {
    alert("CLICK WORKING");

  const url = document.getElementById("urlInput").value;

  if (!url) {
    alert("Enter URL");
    return;
  }

  const res = await fetch("http://localhost:5000/api/shorten", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ originalUrl: url })
  });

  const data = await res.json();

  const shortLink = `http://localhost:5000/api/${data.shortUrl}`;

  // Show clickable link
  document.getElementById("result").innerHTML =
    `Short URL: <a href="${shortLink}" target="_blank">${shortLink}</a>`;

  // Show copy button
  document.getElementById("copyBtn").style.display = "inline-block";

  // Save for copy
  window.shortLink = shortLink;
}


// COPY FUNCTION
function copyLink() {
  if (!window.shortLink) return;

  navigator.clipboard.writeText(window.shortLink)
    .then(() => {
      const btn = document.getElementById("copyBtn");
      btn.innerText = "COPIED ✅";

      setTimeout(() => {
        btn.innerText = "COPY LINK";
      }, 1500);
    })
    .catch(() => {
      alert("Copy failed");
    });
}