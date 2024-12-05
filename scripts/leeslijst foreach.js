const mediaQuery = window.matchMedia('(min-width: 860px)');
// Als je op de leeslijst button klikt, krijgt deze een andere kleur.
// Als dit item al in de leeslijst zit, maak de kleur dan weer normaal
let leesLijstBtns = document.querySelectorAll('.utility_btn.bookmark'); // Use querySelectorAll to select all buttons
let leesLijstSVGS = document.querySelectorAll('.utility_btn.bookmark > svg'); // Select all SVGs within the buttons

leesLijstBtns.forEach(function(leesLijstBtn, index) {
    let leesLijstSVG = leesLijstSVGS[index]; // Get corresponding SVG for each button
    
    leesLijstBtn.addEventListener('click', function(e){
        e.target.classList.toggle('article_added');
        
        if(e.target.classList.contains('article_added')){
            e.target.textContent = 'Toegevoegd';
        } else {
            e.target.textContent = 'Voeg toe aan leeslijst';
        }
        
        e.target.appendChild(leesLijstSVG); // Voeg de SVG weer toe, nadat hij weggehaald is met textContent

        // Retrieve the current leeslijst from LocalStorage
        let leesLijst = JSON.parse(localStorage.getItem('leeslijst')) || []; // Get existing leeslijst or initialize an empty array

        let currentItemID = e.target.dataset.articleId;
        let currentItemLink = e.target.dataset.articleLink;
        let currentItemTitle = e.target.dataset.articleTitle;
        let currentItemAuthor = e.target.dataset.articleAuthor;

        let leesLijstItem = {
            "ID": currentItemID,
            "Link": currentItemLink,
            "Title": currentItemTitle,
            "Author": currentItemAuthor
        };

        console.log(leesLijstItem);
        // Check if the item already exists in the list
        let existingItemIndex = leesLijst.findIndex(item => item.ID === currentItemID);
        
        if (existingItemIndex === -1) {
            leesLijst.push(leesLijstItem); // Add item to list if not already present
        } else {
            leesLijst.splice(existingItemIndex, 1); // Remove item if already in the list
        }

        console.log(leesLijst);
        // Store the updated list in localStorage (convert to string)
        localStorage.setItem('leeslijst', JSON.stringify(leesLijst)); // Store as a string in localStorage
        console.log(localStorage.getItem('leeslijst'));
    });
});

// (check of er al een localstorage item is, zo niet maak er dan een aan)
// Deze bestaat uit een link, titel, en introtekst
// Als dit item al in de local storage staat, verwijder hem dan

// In de header wordt de count geupdated
// Als er nog geen counter bolletje is, voeg de class toe aan dit menu item.
//////////////////////

// Als je op desktop op de leeslijst item in de navigatie klikt, wordt het standard event genegeerd (preventdefault)
// Hierna wordt een class gegeven aan de leeslijst tooltip waardoor deze zichtbaar wordt.
let leesLijstNavItemLink = document.querySelector(".link_leeslijst.mobile_hidden");
let leesLijstTooltip = document.querySelector(".tooltip_leeslijst");

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
