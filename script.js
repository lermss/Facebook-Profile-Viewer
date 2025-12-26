const fetchBtn = document.getElementById("fetchBtn");
const accessTokenInput = document.getElementById("accessToken");

const resultDiv = document.getElementById("result");
const nameEl = document.getElementById("name");
const fbIdEl = document.getElementById("fbId");
const profilePicEl = document.getElementById("profilePic");
const errorEl = document.getElementById("error");

fetchBtn.addEventListener("click", async () => {
  const accessToken = accessTokenInput.value.trim();

  errorEl.textContent = "";
  resultDiv.classList.add("hidden");

  if (!accessToken) {
    errorEl.textContent = "Access Token is required!";
    return;
  }

  try {
    const response = await fetch(
      `https://graph.facebook.com/me?fields=id,name,picture&access_token=${accessToken}`
    );

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

    nameEl.textContent = data.name;
    fbIdEl.textContent = `Facebook ID: ${data.id}`;
    profilePicEl.src = data.picture.data.url;

    resultDiv.classList.remove("hidden");

  } catch (error) {
    errorEl.textContent = error.message;
  }
});
