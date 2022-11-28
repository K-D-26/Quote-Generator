const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuote = [];

// Show Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function complete() {    
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// New Quote
function newQuote() {
    loading();
    // Pick a random quote from apiQuote array
    const quote = apiQuote[Math.floor(Math.random() * apiQuote.length)];
    // Check if author field is blank and replace it with 'Unknown'
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }
    // Check Quote length to determine styling
    if (quote.text.length > 100) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // Set quote, Hide Loader
    quoteText.textContent = quote.text;
    complete();
}

// Get Quotes from API
async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuote = await response.json();
        newQuote();
    } catch (error) {
        // alert(error);  -->  normally in many websites, we do it this way
        // Catch Error Here
    }    
}

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();





// Function for getting quote from local storage (quote.js).

// function newQuote() {
//     // Pick a random quote from localQuote array    
//     const quote = localQuote[Math.floor(Math.random() * localQuote.length)];
//     console.log(quote);
// }
// newQuote();