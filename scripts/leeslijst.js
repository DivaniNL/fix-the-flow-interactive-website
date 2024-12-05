const mediaQuery = window.matchMedia('(min-width: 860px)');
// Als je op de leeslijst button klikt, krijgt deze een andere kleur.
// Als dit item al in de leeslijst zit, maak de kleur dan weer normaal
let leesLijstBtns = document.querySelectorAll('.utility_btn.bookmark'); // Select all buttons
function updateButtonState() {
    let leesLijst = JSON.parse(localStorage.getItem('leeslijst')) || []; // Get the leeslijst from localStorage

    // loop door de leeslijst.
    leesLijstBtns.forEach(function(leesLijstBtn, index) {
        let currentItemID = leesLijstBtn.dataset.articleId;
        let textPart = leesLijstBtn.querySelector('.textPart'); // Textgedeelte van de button dat gewijzigd kan worden.
        
        // Check of het item in de leelsijst staat.
        let itemInLeesLijst = leesLijst.find(item => item.ID === currentItemID);
        
        // Pas class en tekst aan aan de hand van de status.
        if (itemInLeesLijst) {
            leesLijstBtn.classList.add('article_added');
            textPart.innerHTML = 'Toegevoegd';
        } else {
            leesLijstBtn.classList.remove('article_added');
            textPart.innerHTML = 'Voeg toe aan leeslijst';
        }
    });
}

// Update buttons na het laden van de pagina.
updateButtonState();

// Loop door alle article add buttons heen
leesLijstBtns.forEach(function(leesLijstBtn) {
    leesLijstBtn.addEventListener('click', function(e) {
        leesLijstBtn.classList.toggle('article_added');
        let textPart = leesLijstBtn.querySelector('.textPart');
        console.log(textPart);
        
        // toggle added class
        if (leesLijstBtn.classList.contains('article_added')) {
            textPart.innerHTML = 'Toegevoegd';
        } else {
            textPart.innerHTML = 'Voeg toe aan leeslijst';
        }

        // Haal de lijst op uit de localstorage
        let leesLijst = JSON.parse(localStorage.getItem('leeslijst')) || [];
        

        // haal de dataset op voor de aangeklikte button
        // Deze bestaat uit een ID, link, titel, en introtekst
        let currentItemID = leesLijstBtn.dataset.articleId;
        let currentItemLink = leesLijstBtn.dataset.articleLink;
        let currentItemTitle = leesLijstBtn.dataset.articleTitle;
        let currentItemAuthor = leesLijstBtn.dataset.articleAuthor;

        let leesLijstItem = {
            "ID": currentItemID,
            "Link": currentItemLink,
            "Title": currentItemTitle,
            "Author": currentItemAuthor
        };

        console.log(leesLijstItem);

        // Check of item al in storage zit
        let existingItemIndex = leesLijst.findIndex(item => item.ID === currentItemID);

        if (existingItemIndex === -1) {
            // Zo niet voeg hem toe ana de leeslijst array
            leesLijst.push(leesLijstItem);
        } else {
            // Als dit item al in de local storage staat, verwijder hem dan
            leesLijst.splice(existingItemIndex, 1);
        }
        // zet de geupdatete array terug in localstorage
        localStorage.setItem('leeslijst', JSON.stringify(leesLijst));
        console.log('voor update' + JSON.stringify(leesLijst));
        readLocalStorage();
        console.log(localStorage.getItem('leeslijst')); // Log de leeslisjt
    });
});


// In de header wordt de count geupdated
// Als er nog geen counter bolletje is, voeg de class toe aan dit menu item.
//////////////////////

// Als je op desktop op de leeslijst item in de navigatie klikt, wordt het standard event genegeerd (preventdefault)
// Hierna wordt een class gegeven aan de leeslijst tooltip waardoor deze zichtbaar wordt.
let leesLijstNavItemLink = document.querySelector(".link_leeslijst.mobile_hidden");
let leesLijstTooltip = document.querySelector(".tooltip_leeslijst")

leesLijstNavItemLink.addEventListener('click', function(e){
    if (mediaQuery.matches) {
        let leesLijstTooltip = e.currentTarget.nextElementSibling;
        leesLijstTooltip.classList.toggle('active_tooltip');
        e.preventDefault();
    }
});

// Sluit de tooltip als je buiten de tooltip of op de sluitknop klikt
document.addEventListener('click', function closeTooltip(e) {
    // Controleer of de geklikte plek niet de tooltip, de link, of de sluitknop is
    if (
        !leesLijstTooltip.contains(e.target) &&
        !leesLijstNavItemLink.contains(e.target)
    ) {
        leesLijstTooltip.classList.remove('active_tooltip');
    }
});
// Als je op het kruisje in de leeslijst klikt gaat de leeslijst weer weg
let tooltipCloseButton = document.querySelector('.tooltip_close');
if (tooltipCloseButton) {
    tooltipCloseButton.addEventListener('click', function() {
        let leesLijstTooltip = document.querySelector('.tooltip_leeslijst')
        leesLijstTooltip.classList.remove('active_tooltip');
    });
}
// ////////////////
// Als je op de leeslijst pagina bent wordt de localstorage uitgelezen.
// Als er nog niks in de leeslijst zit, laat dan een bericht zien wat dit duidelijk maakt.(empty state) 
// Als er iets in de leeslijst zit, haal de leeslijst op met LocalStorage.GetItem en plaats voor elk item in de array een article element.



// Lees leeslijst uit in de header
function readLocalStorage() {
    // Fetch the leeslijst from localStorage
    let leesLijstFetched = JSON.parse(localStorage.getItem('leeslijst')) || [];
    const tooltipContainer = document.querySelector('.tooltip_leeslijst');
    const tooltipBtn = document.querySelector('.tooltip_btn');

    // Clear the current contents of the tooltip container (except for the tooltip button)
    const articles = tooltipContainer.querySelectorAll('.one_tooltip_article');
    articles.forEach(article => article.remove());

    // Update the count of items
    let leeslijstCount = leesLijstFetched.length;

    // Loop through each item in the leeslijst
    leesLijstFetched.forEach(leesLijstFetchedItem => {
        // Check if the item contains the required properties (Title, Author, Link, ID)
        if (leesLijstFetchedItem.Title && leesLijstFetchedItem.Author && leesLijstFetchedItem.Link && leesLijstFetchedItem.ID) {
            // Create a new div with class 'one_tooltip_article'
            let tooltipArticle = document.createElement('div');
            tooltipArticle.classList.add('one_tooltip_article');

            // Create the anchor tag <a> and set the href to the article's link
            let Articlelink = document.createElement('a');
            Articlelink.href = leesLijstFetchedItem.Link;

            // Create the h4 element for the title and set its text
            let h4 = document.createElement('h4');
            h4.textContent = leesLijstFetchedItem.Title;

            // Create the p element for the description and set its text
            let p = document.createElement('p');
            p.textContent = leesLijstFetchedItem.Title; // You can use a different property if needed for description

            // Create the svg for the right chevron icon
            let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.classList.add('chev_right');
            svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
            svg.setAttribute('viewBox', '0 0 320 512');

            let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', 'M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z');
            svg.appendChild(path);

            // Append the h4, p, and svg to the anchor
            Articlelink.appendChild(h4);
            Articlelink.appendChild(p);
            Articlelink.appendChild(svg);

            // Append the anchor to the div
            tooltipArticle.appendChild(Articlelink);

            // Insert the new article before the tooltip_btn
            tooltipContainer.insertBefore(tooltipArticle, tooltipBtn);
        }
    });

    // Update the counter element(s)
    let counterHeaders = document.querySelectorAll('.counter'); // Select all elements with the class 'counter'
    counterHeaders.forEach(counterHeader => {
        counterHeader.dataset.count = leeslijstCount; // Update the data-count attribute
    });
}

// Call the function to read and display the leeslijst
readLocalStorage();
