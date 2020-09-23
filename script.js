const quotesContainer=document.getElementById("quote-cointainer");
const quoteText=document.getElementById("quote");
const authorText=document.getElementById("author");
const twitterBtn=document.getElementById("twitter");
const newQuoteBtn=document.getElementById("new-quote");
const loader=document.getElementById('loader');

//show loading

function loading(){
    loader.hidden=false;
    quotesContainer.hidden=true;

}
// hide loading
function complete(){
    if (!loader.hidden){
        quotesContainer.hidden=false;
        loader.hidden=true;
    }
}


// Get Qutoes from Api
async function getQuote() {
    // loading();

    const proxyUrl="https://cors-anywhere.herokuapp.com/"
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try{
        const response= await fetch(proxyUrl+apiUrl);
        const data=await response.json();
        // console.log(data);

        // for blank author
        if(data.quoteAuthor===''){
            authorText.innerHTML='Unknown';
        }else{
            authorText.innerText=data.quoteAuthor;
        }
        //redude font size
        if(data.quoteText.length>120){
            quoteText.classList.add('long-quote');
        }else{
            quoteText.classList.remove('long-quote');
            
        }
        quoteText.innerText=data.quoteText;
        console.log(quoteText);
        console.log(authorText);

        // stop loader and shoe 
        // complete();

    }catch(error){
        getQuote();
        // console.log("oops ","no quotes",error);
    }
}
// tweet
function tweetQuote() {
    const quote=quoteText.innerText;
    const author=authorText.innerText;
    const twitterUrl=`https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl,'_blank');
  }
//event listeners

newQuoteBtn.addEventListener('click',getQuote);
twitterBtn.addEventListener('click',tweetQuote)

// on load 
// getQuote();
