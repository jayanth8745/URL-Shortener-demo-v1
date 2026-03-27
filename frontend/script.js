console.log("JS WORKING");

const API = "https://url-shortener-backend.onrender.com";

app.get("/", (req, res) => {
  res.send("Backend working ✅");
});
async function shortenUrl() {
  alert("CLICK WORKING");

  const url = document.getElementById("urlInput").value;

  if (!url) {
    alert("Enter URL");
    return;
  }

  const res = await fetch(`${API}/api/shorten`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ originalUrl: url })
  });

  const data = await res.json();

  const shortLink = `${API}/api/${data.shortUrl}`;

  document.getElementById("result").innerHTML =
    `Short URL: <a href="${shortLink}" target="_blank">${shortLink}</a>`;

  document.getElementById("copyBtn").style.display = "inline-block";

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