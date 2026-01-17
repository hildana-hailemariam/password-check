
let currentPassword = "";
let attemptsLeft = 3;
let gameActive = false;
const strengthTab = document.getElementById('strengthTab');
const gameTab = document.getElementById('gameTab');
const strengthContent = document.getElementById('strengthContent');
const gameContent = document.getElementById('gameContent');
const passwordInput = document.getElementById('passwordInput');
const toggleButton = document.getElementById('togglePassword');
const eyeIcon = document.getElementById('eyeIcon');
const meterFill = document.getElementById('meterFill');
const strengthText = document.getElementById('strengthText');
const lengthReq = document.getElementById('lengthReq');
const uppercaseReq = document.getElementById('uppercaseReq');
const lowercaseReq = document.getElementById('lowercaseReq');
const numberReq = document.getElementById('numberReq');
const specialReq = document.getElementById('specialReq');
const guessInput = document.getElementById('guessInput');
const guessBtn = document.getElementById('guessBtn');
const newPasswordBtn = document.getElementById('newPasswordBtn');
const attemptsLeftDisplay = document.getElementById('attemptsLeft');
const hintText = document.getElementById('hintText');
const messageBox = document.getElementById('messageBox');
strengthTab.addEventListener('click', function() {
    switchTab('strength');
});
gameTab.addEventListener('click', function() {
    switchTab('game');
    if (!gameActive) {
        startNewGame();
    }
});
function switchTab(tabName) {
    strengthTab.classList.remove('active');
    gameTab.classList.remove('active');
    strengthContent.classList.remove('active');
    gameContent.classList.remove('active');
    
    if (tabName === 'strength') {
        strengthTab.classList.add('active');
        strengthContent.classList.add('active');
    } else {
        gameTab.classList.add('active');
        gameContent.classList.add('active');
    }
}
function togglePasswordVisibility() {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        eyeIcon.className = "fas fa-eye-slash";
    } else {
        passwordInput.type = "password";
        eyeIcon.className = "fas fa-eye";
    }
}

function checkPasswordStrength() {
    const password = passwordInput.value;
    
    resetRequirements();
    
    let score = 0;
    
    if (password.length >= 8) {
        score += 1;
        markRequirementMet(lengthReq);
    }
    
    if (/[A-Z]/.test(password)) {
        score += 1;
        markRequirementMet(uppercaseReq);
    }
    
    if (/[a-z]/.test(password)) {
        score += 1;
        markRequirementMet(lowercaseReq);
    }
    
    if (/[0-9]/.test(password)) {
        score += 1;
        markRequirementMet(numberReq);
    }
    
    if (/[!@#$%^&*]/.test(password)) {
        score += 1;
        markRequirementMet(specialReq);
    }
    
    updateStrengthDisplay(score);
}
function markRequirementMet(requirementElement) {
    requirementElement.classList.add("met");
    requirementElement.innerHTML = '<i class="fas fa-check"></i>' + requirementElement.innerHTML.substring(requirementElement.innerHTML.indexOf(" ") + 1);
}

function resetRequirements() {
    const requirements = [lengthReq, uppercaseReq, lowercaseReq, numberReq, specialReq];
    const texts = [
        "At least 8 characters",
        "Contains uppercase letter",
        "Contains lowercase letter",
        "Contains a number",
        "Contains special character (!@#$%^&*)"
    ];
    
    for (let i = 0; i < requirements.length; i++) {
        requirements[i].classList.remove("met");
        requirements[i].innerHTML = '<i class="fas fa-times"></i> ' + texts[i];
    }
}
function updateStrengthDisplay(score) {
 if (score <= 1) {
        meterFill.style.width = "20%";
        meterFill.style.backgroundColor = "#ff4757";
        strengthText.textContent = "Very Weak";
        strengthText.style.color = "#ff4757";
    }
    else if (score === 2) {
        meterFill.style.width = "40%";
        meterFill.style.backgroundColor = "#ff7f50";
        strengthText.textContent = "Weak";
        strengthText.style.color = "#ff7f50";
    }
    else if (score === 3) {
        meterFill.style.width = "60%";
        meterFill.style.backgroundColor = "#ffa502";
        strengthText.textContent = "Fair";
        strengthText.style.color = "#ffa502";
    }
    else if (score === 4) {
        meterFill.style.width = "80%";
        meterFill.style.backgroundColor = "#2ed573";
        strengthText.textContent = "Good";
        strengthText.style.color = "#2ed573";
    }
    else if (score === 5) {
        meterFill.style.width = "100%";
        meterFill.style.backgroundColor = "#1e90ff";
        strengthText.textContent = "Strong!";
        strengthText.style.color = "#1e90ff";
    }
    else {
        meterFill.style.width = "5%";
        meterFill.style.backgroundColor = "#ff4757";
        strengthText.textContent = "Very Weak";
        strengthText.style.color = "#ff4757";
    }
}

function generateRandomPassword() {
    const passwords = [
        "summer", "winter", "spring", "autumn",
        "purple", "orange", "yellow", "silver",
        "dragon", "tiger", "eagle", "shark",
        "coffee", "cookie", "banana", "cherry",
        "planet", "rocket", "comet", "galaxy",
        "secret", "hidden", "mystic", "magic"
    ];
    
    const randomIndex = Math.floor(Math.random() * passwords.length);
    return passwords[randomIndex];
}

function startNewGame() {
    currentPassword = generateRandomPassword();
    attemptsLeft = 3;
    gameActive = true;
    
    attemptsLeftDisplay.textContent = attemptsLeft;
    guessInput.value = "";
    guessInput.disabled = false;
    guessBtn.disabled = false;
    
    generateHint();
    messageBox.innerHTML = "<p>Start guessing! You have 3 attempts.</p>";
    addMessageToBox(`Hint: The password has ${currentPassword.length} letters.`, "hint");
}
function generateHint() {
    const length = currentPassword.length;
    const firstLetter = currentPassword[0].toUpperCase();
    const lastLetter = currentPassword[length - 1].toUpperCase();
    
    const hints = [
        `The password has ${length} letters and starts with '${firstLetter}'.`,
        `It's a common word with ${length} letters. Last letter is '${lastLetter}'.`,
        `Think of something related to nature or seasons. ${length} letters long.`,
        `The password is a color or an animal. It has ${length} letters.`
    ];
    
    const randomHint = hints[Math.floor(Math.random() * hints.length)];
    hintText.textContent = randomHint;
}
function checkGuess() {
    const guess = guessInput.value.toLowerCase().trim();
    
    if (guess === "") {
        addMessageToBox("Please enter a guess!", "error");
        return;
    }
    attemptsLeft--;
    attemptsLeftDisplay.textContent = attemptsLeft;
    
    if (guess === currentPassword) {
        
        addMessageToBox(`🎉 CORRECT! The password was "${currentPassword}". You win!`, "success");
        guessInput.disabled = true;
        guessBtn.disabled = true;
        gameActive = false;
        return;
    }
    
    let feedback = "";
    
    if (guess.length < currentPassword.length) {
        feedback = "Too short! ";
    } else if (guess.length > currentPassword.length) {
        feedback = "Too long! ";
    }
    
    let correctLetters = 0;
    for (let i = 0; i < Math.min(guess.length, currentPassword.length); i++) {
        if (guess[i] === currentPassword[i]) {
            correctLetters++;
        }
    }
    
    feedback += `You got ${correctLetters} letter(s) in the right position.`;
    addMessageToBox(`❌ "${guess}" is wrong. ${feedback}`, "guess");
    
    if (attemptsLeft <= 0) {
        addMessageToBox(`😞 Game Over! The password was "${currentPassword}".`, "gameover");
        guessInput.disabled = true;
        guessBtn.disabled = true;
        gameActive = false;
    } else {
        guessInput.value = "";
        guessInput.focus();
    }
}

function addMessageToBox(message, type) {
    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    
    if (type === "success") {
        messageElement.style.backgroundColor = "#d4edda";
        messageElement.style.color = "#155724";
        messageElement.style.borderLeft = "4px solid #28a745";
    } else if (type === "error") {
        messageElement.style.backgroundColor = "#f8d7da";
        messageElement.style.color = "#721c24";
        messageElement.style.borderLeft = "4px solid #dc3545";
    } else if (type === "hint") {
        messageElement.style.backgroundColor = "#cce5ff";
        messageElement.style.color = "#004085";
        messageElement.style.borderLeft = "4px solid #007bff";
    } else if (type === "gameover") {
        messageElement.style.backgroundColor = "#fff3cd";
        messageElement.style.color = "#856404";
        messageElement.style.borderLeft = "4px solid #ffc107";
    } else {
        messageElement.style.backgroundColor = "#f1f1f1";
        messageElement.style.color = "#333";
        messageElement.style.borderLeft = "4px solid #6c757d";
    }
    
    messageBox.appendChild(messageElement);
    
    messageBox.scrollTop = messageBox.scrollHeight;
}

passwordInput.addEventListener("input", checkPasswordStrength);
toggleButton.addEventListener("click", togglePasswordVisibility);


guessBtn.addEventListener("click", checkGuess);
newPasswordBtn.addEventListener("click", startNewGame);

guessInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        checkGuess();
    }
});

checkPasswordStrength(); 
