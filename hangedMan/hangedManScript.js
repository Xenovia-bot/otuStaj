const cLives=6;                              
const alphabet='ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ';  

const wordCategories={
    meyve:["elma","armut","portakal","muz","kiraz","şeftali","kayısı","kavun","karpuz","çilek"],
    hayvan:["kedi","köpek","aslan","kaplan", "zürafa", "penguen"],
    eşya:["masa","sandalye","kalem","kitap","telefon","bilgisayar"],
    renk:["kırmızı","mavi","yeşil","sarı","beyaz","siyah"]
};

let selectedWord="";        
let displayedWord=[];       
let lives=cLives;
let gameActive=true;        
let selectedCategory="";

function createAlphabet() 
{
    const alphabetContainer=document.getElementById('alphabet');
    let buttonsHTML='';
    
    for(let i=0; i<alphabet.length; i++) 
    {
        buttonsHTML+='<div class="button"><button>'+alphabet[i]+'</button></div>';
    }
    alphabetContainer.innerHTML=buttonsHTML;
}

function createHearts() 
{
    const heartsContainer=document.getElementById('hearts');
    let heartsHTML='';
    
    for(i=cLives; i>=1; i--) 
    {
        heartsHTML+='<img src="heart.svg" id="heart-'+i+'" class="heart-icon">';
    }
    
    heartsContainer.innerHTML=heartsHTML;
}

function selectRandomCategory() 
{
    const categories=Object.keys(wordCategories);
    return categories[Math.floor(Math.random()*categories.length)];
}

function selectRandomWord(category) 
{
    const words=wordCategories[category];
    return words[Math.floor(Math.random()*words.length)];
}

function initializeDisplayWord(word) 
{
    return Array(word.length).fill("_");
}

function updateHangmanImage() 
{
    const hangmanImg=document.getElementById('hangman-img');
    const stage=cLives-lives;
    hangmanImg.src='hangman-'+stage+'.svg';
}

function updateHearts() 
{
    for(i=1; i<=cLives; i++) 
    {
        const heart=document.getElementById('heart-'+i);
        if(i<=lives) 
        {
            heart.style.display="block";
        } 
        else 
        {
            heart.style.display="none";
        }
    }
}

function checkLetterInWord(letter) 
{
    let isCorrect=false;
    for(i=0; i<selectedWord.length; i++) 
    {
        if(selectedWord[i]==letter) 
        {
            displayedWord[i]=letter;
            isCorrect=true;
        }
    }
    return isCorrect;
}

function decrementLives() 
{
    lives--;
    updateHangmanImage();
    updateHearts();
    return lives==0;
}

function checkWinCondition() 
{
    return !displayedWord.includes("_");
}

function handleLetterGuess(button) 
{
    if(!gameActive) return;

    const letter=button.textContent.toLowerCase();
    const isCorrect=checkLetterInWord(letter);

    if(isCorrect) 
    {
        document.getElementById("word").textContent=displayedWord.join(" ");
        if(checkWinCondition()) 
        {
            endGame(true);
        }
    } 
    else 
    {
        if(decrementLives()) 
        {
            endGame(false);
        }
    }

    button.disabled=true;
}

function endGame(isWin) 
{
    gameActive=false;
    showResult(isWin);
}

function resetButtons() 
{
    const buttons=document.querySelectorAll(".alphabet button");
    for(let i=0; i<buttons.length; i++)
    {
        buttons[i].disabled=false;
    }
}

function showHint() 
{
    document.getElementById("hint").textContent='İpucu: Bu bir '+selectedCategory;
}

function showResult(isWin) 
{
    const resultArea=document.getElementById('game-result');
    const resultText=document.getElementById('result-text');
    const correctWord=document.getElementById('correct-word');
    
    resultArea.style.display='flex';
    
    if(isWin)
    {
        resultText.textContent='Tebrikler! Kazandınız!';
    }
    else
    {
        resultText.textContent='Oyun Bitti!';
    }
    
    correctWord.textContent='Doğru kelime: '+selectedWord;
}

function hideResult() 
{
    document.getElementById('game-result').style.display='none';
}

function handleWordGuess() 
{
    if(!gameActive) return;
    
    const guess=prompt('Kelimeyi tahmin et:').toLowerCase();
    
    if(guess==selectedWord) 
    {
        displayedWord=selectedWord.split('');
        document.getElementById('word').textContent=displayedWord.join(' ');
        endGame(true);
    } 
    else 
    {
        if(decrementLives()) 
        {
            endGame(false);
        }
    }
}

function startGame() 
{
    selectedCategory=selectRandomCategory();
    selectedWord=selectRandomWord(selectedCategory);
    displayedWord=initializeDisplayWord(selectedWord);
    
    lives=cLives;
    gameActive=true;

    document.getElementById("word").textContent=displayedWord.join(" ");
    updateHangmanImage();
    resetButtons();
    updateHearts();
    showHint();
    hideResult();
}

document.addEventListener('DOMContentLoaded', function() 
{
    createAlphabet();
    createHearts();
    
    document.getElementById('alphabet').addEventListener('click', function(e) 
    {
        if(e.target.tagName=='BUTTON') 
        {
            handleLetterGuess(e.target);
        }
    });
    
    document.getElementById('guess-button').addEventListener('click', function() 
    {
        handleWordGuess();
    });
    
    document.getElementById('play-again').addEventListener('click', function() 
    {
        startGame();
    });
    
    startGame();
});
