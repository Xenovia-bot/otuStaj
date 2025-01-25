let flipedCard = false ;
let sumProcess = 0 ;
let matchedCard=0;
let firstCard , secondCard ;
let cards;
const newbutton = document.getElementById('button-id');

const cardData =
[
    {framework:'bear' , img:'Resimler/bear.jpg'},
    {framework:'bear' , img:'Resimler/bear.jpg'},
    {framework:'deer' , img:'Resimler/deer.jpg'},
    {framework:'deer' , img:'Resimler/deer.jpg'},
    {framework:'elephant' , img:'Resimler/elephant.jpg'},
    {framework:'elephant' , img:'Resimler/elephant.jpg'},
    {framework:'goat' , img:'Resimler/goat.jpg'},
    {framework:'goat' , img:'Resimler/goat.jpg'},
    {framework:'rabbit' , img:'Resimler/rabbit.jpg'},
    {framework:'rabbit' , img:'Resimler/rabbit.jpg'},
    {framework:'wolf' , img:'Resimler/wolf.jpg'},
    {framework:'wolf' , img:'Resimler/wolf.jpg'},
];

function newCard()
{
    const keepContainer = document.getElementById('game-container');
    // containerin idsini tutan bir değişken tanımladım..
    for(let i= 0 ; i<cardData.length ; i++)
    {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        // bellekten div elementi oluşturdum ve onun classını card clası yaptım.
        
        cardElement.setAttribute('framework',cardData[i].framework);
        // cardElementin framework özelliğini ekledim. CardData dizisinden
        
        const rearImg = document.createElement('img');
        rearImg.classList.add('rear');
        rearImg.src = "Resimler/soruişareti.jpg";


        const frontImg = document.createElement('img');
        frontImg.classList.add('front');
        frontImg.src=cardData[i].img ;
        
        cardElement.appendChild(rearImg);
        cardElement.appendChild(frontImg);
        keepContainer.appendChild(cardElement);


    }
  cards = document.querySelectorAll('.card');
}

newCard();
clickEvent(); // kartlara tıklandığında flipcard fonksiyonu çalışsın..
shuffle(); //sayfa yüklendiğinde kartlar random gelsin..

function flipCard()
{
   
    if(!flipedCard) // card açılmamış ise
    {
        flipedCard = true ; // card açıldı
        firstCard=this; // ilk kartımız clicklediğimiz oldu
    }
    else
    {
        secondCard=this;
        matchCard();//kartların aynı olma durumunu kontrol ediyoruz..
        flipedCard = false ;
        
    }
     this.classList.add('flipped');
     // tıkladığım kartta flipped classı özellikleri eklendi..
     
}

function displayMessage()
{
    if(sumProcess>0 && sumProcess<=10)
    {
        alert("Oyun Bitti..Tebrikler!.\nDahisin:)");
    }
    else if(sumProcess>10 && sumProcess<=20)
    {
        alert("Oyun Bitti.Tebrikler!.\nZekisin:/");
    }
    else if(sumProcess>20)
    {
        alert("Oyun Bitti.\nVasatsin:(");
    }
 
}

function matchCard()
{
    if(firstCard.getAttribute('framework') === secondCard.getAttribute('framework'))
    {
        
        sameCard();
        matchedCard++;
        checkGame();

    }
    else
    {
        
        unflipedCard();
    }
    sumProcess+=1;
    displayParagraph();

}

function sameCard()
{
        firstCard.removeEventListener('click',flipCard);
        secondCard.removeEventListener('click',flipCard);
        // artık click yapıldığında flipCard fonksiyonumuz çalışmıyacak...
         
         firstCard = null;
         secondCard = null;
         // iki kartın da değerini sıfırladık..

}

function unflipedCard()
{
    setTimeout(()=>
        {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard = null;
            secondCard = null;
        },1000);
        // 1000 milisaniye sonra kartlar flipped classından silindi..
//setInterval

        
}


function shuffle()
{
    for(let i=0 ; i<cards.length ; i++)
    {
        cards[i].classList.remove('flipped'); // Tüm Kartları kapattık.
        let randomValue = Math.floor(Math.random()*cards.length); //ceil
        cards[i].style.order=randomValue; // cards[i] nin sırası randomValue oldu.
        clickEvent(); // kartlara tıklandığında flipCard fonksiyonu çalıştırılacak..
    } 
    //clean code
    matchedCard=0;
    sumProcess = 0 ;
}

function checkGame()
{
    if(matchedCard==cards.length/2)
    {
        displayMessage();
    }
}

function buttonClick()
{
    newbutton.addEventListener('click',shuffle); // buttona click yapıldığında shuffle fonksiyonu çalışacak...
    
}



function displayParagraph()
{
    const message = document.getElementById('demo');
    message.innerHTML=`Toplam Işlem Sayisi: ${sumProcess}`;
}

    
function clickEvent()
{
    for(let i = 0 ; i<cards.length ;i++)
    {
        cards[i].addEventListener('click' , flipCard);
    }
}


