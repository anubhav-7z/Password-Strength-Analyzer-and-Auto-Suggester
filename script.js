const passwordInput = document.getElementById("password");
const feedback = document.getElementById("feedback");
const entropyDisplay = document.getElementById("entropy");
const breachDisplay = document.getElementById("breach");

passwordInput.addEventListener("input", async () => {
  const password = passwordInput.value;
  const { strength, entropy, suggestions } = analyzeStrength(password);

  feedback.className = strength;
  feedback.innerHTML = `Strength: ${strength.toUpperCase()}`;

  if (strength !== "strong" && suggestions.length > 0) {
    const suggestionText = suggestions.map(s => `<div class="suggestion">⚠️ ${s}</div>`).join("");
    feedback.innerHTML += suggestionText;
  }

  entropyDisplay.textContent = `Entropy: ${entropy.toFixed(2)} bits`;

  if (password.length > 0) {
    const breached = await checkPwned(password);
    breachDisplay.textContent = breached
      ? "☠️ This password has been leaked!"
      : "👌 Password not found in breaches.";
  } else {
    breachDisplay.textContent = "";
  }
});

function analyzeStrength(password) {
  let charsetSize = 0;
  const suggestions = [];

  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[^a-zA-Z0-9]/.test(password);

  if (hasLower) charsetSize += 26;
  else suggestions.push("Add lowercase letters.");

  if (hasUpper) charsetSize += 26;
  else suggestions.push("Add uppercase letters.");

  if (hasNumber) charsetSize += 10;
  else suggestions.push("Add numbers.");

  if (hasSymbol) charsetSize += 32;
  else suggestions.push("Add symbols (e.g., !@#$%).");

  const entropy = password.length * Math.log2(charsetSize || 1);
  let strength = "weak";
  if (entropy > 60) strength = "strong";
  else if (entropy > 40) strength = "medium";

  return { strength, entropy, suggestions };
}

async function checkPwned(password) {
  const hashBuffer = await crypto.subtle.digest("SHA-1", new TextEncoder().encode(password));
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const fullHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
  const prefix = fullHash.slice(0, 5);
  const suffix = fullHash.slice(5);

  const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
  const data = await response.text();

  return data.split("\n").some(line => line.startsWith(suffix));
}