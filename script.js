const btnEN = document.getElementById('btn-en');
const btnAR = document.getElementById('btn-ar');

btnEN.onclick = () => {
  document.body.dir = 'ltr';
  btnEN.classList.add('active');
  btnAR.classList.remove('active');
};

btnAR.onclick = () => {
  document.body.dir = 'rtl';
  btnAR.classList.add('active');
  btnEN.classList.remove('active');
};
function randomCaptcha() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

function refreshCaptcha() {
  document.getElementById('captcha-box').textContent = randomCaptcha();
  document.getElementById('captcha-input').value = '';
}

document.getElementById('refresh-captcha').addEventListener('click', refreshCaptcha);

// Initial load
refreshCaptcha();
// Simple helpers
const $ = (sel) => document.querySelector(sel);

const captchaBox = $("#captcha-box");
const captchaInput = $("#captcha-input");
const refreshBtn = $("#refresh-captcha");
const form = $("#regForm");
const pass = $("#pass");
const pass2 = $("#pass2");

// Generate a new CAPTCHA (6 chars A–Z a–z 0–9)
function newCaptcha(){
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";
  let out = "";
  for(let i=0;i<6;i++) out += chars[Math.floor(Math.random()*chars.length)];
  captchaBox.textContent = out;
}
refreshBtn.addEventListener("click", newCaptcha);

// Validate password match + captcha
form.addEventListener("submit", (e) => {
  // built-in validity first
  if(!form.checkValidity()){
    // Let browser show native messages
    return;
  }
  // Passwords match?
  if(pass.value !== pass2.value){
    e.preventDefault();
    pass2.focus();
    alert("Passwords do not match.");
    return;
  }
  // CAPTCHA exact match (case-sensitive)
  if(captchaInput.value.trim() !== captchaBox.textContent.trim()){
    e.preventDefault();
    captchaInput.focus();
    alert("CAPTCHA is incorrect. Please try again.");
    newCaptcha();
    captchaInput.value = "";
    return;
  }
  // If you’ll send to backend, do it here with fetch()
  // e.g., e.preventDefault(); fetch('/api/register', {method:'POST', body: new FormData(form)})...
});

// Init on load
document.addEventListener("DOMContentLoaded", () => {
  newCaptcha();
});
