// Tüm seçim butonlarını seçiyoruz
const choices = document.querySelectorAll(".choice");

// Sonuçları göstereceğimiz alanları seçiyoruz
const userChoiceDisplay = document.getElementById("user-choice");
const computerChoiceDisplay = document.getElementById("computer-choice");
const winnerDisplay = document.getElementById("winner");

// Seçenekler ve kazanma kuralları
const options = ["taş", "kağıt", "makas"];

// Kullanıcı seçimi için event listener ekliyoruz 
choices.forEach(choice => {
    choice.addEventListener("click", () => {
        const userChoice = choice.dataset.choice; // Kullanıcı seçimi
        const computerChoice = getComputerChoice(); // Bilgisayar seçimi
        const winner = determineWinner(userChoice, computerChoice); // Sonuç

        // Seçimleri ve sonucu ekrana yazdırıyoruz user friendly yaptım
        userChoiceDisplay.textContent = `Seçiminiz: ${emojiForChoice(userChoice)} ${capitalize(userChoice)}`;
        computerChoiceDisplay.textContent = `Bilgisayarın Seçimi: ${emojiForChoice(computerChoice)} ${capitalize(computerChoice)}`;
        winnerDisplay.textContent = `Sonuç: ${winner}`;
        setTimeout(terk,3000);
    });
});

// Bilgisayarın rastgele seçim yapmasını sağlayan fonksiyon
function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
}

// Sonucu belirleyen fonksiyon
function determineWinner(userChoice, computerChoice) {
    if (userChoice === computerChoice) {
        return "Berabere!";
    }

    if (
        (userChoice === options[0] && computerChoice === options[2]) ||
        (userChoice === options[1] && computerChoice === options[0]) ||
        (userChoice === options[2] && computerChoice === options[1])
    ) {
        return "Kazandınız!";
    }

    return "Kaybettiniz!";
}

// Kullanıcı dostu bir şekilde ilk harfi büyük yapar
function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

// Seçimlere uygun emojiyi döner
function emojiForChoice(choice) {
    if (choice === options[0]) return "🪨";
    if (choice === options[1]) return "📄";
    if (choice === options[2]) return "✂️";
    return "";
}
function terk()
{
    userChoiceDisplay.textContent=""
    computerChoiceDisplay.textContent=""
    winnerDisplay.textContent=""
    

};


 
 