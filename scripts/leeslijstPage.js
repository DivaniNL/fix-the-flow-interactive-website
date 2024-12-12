// TAGLINE ACTUAL DATE

const weekdays = ["Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag"]; // Array van nederlandse weeknamen
const months = ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"]; // Arrays van nederlandse maandnamen
const today = new Date(); // dagnummer
const formattedDate = `${weekdays[today.getDay()]} ${today.getDate()} ${months[today.getMonth()]}`; // Het haalt de huidige dag van de week op via today.getDay() (0 = Zondag, 1 = Maandag, enz.). Hiermee wordt uit de array weekdays de juiste dagnaam gepakt in het nederlands. Het haalt de huidige dag van de maand op via today.getDate(). Het haalt de huidige maand op via today.getMonth() (0 = januari, 1 = februari, enz.). Hiermee wordt uit de array months de juiste maandnaam gepakt in het nederlands

document.getElementById("formattedDate").textContent = formattedDate; // set text in div ecual to made current date in Dutch

// Met de mediaquery wordt ervoor gezorgd dat alleen op desktop de leeslijst tooltip functie wordt uitgevoerd.
const mediaQuery = window.matchMedia('(min-width: 860px)');

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

// Lees leeslijst uit in de header en update count
function readLocalStorage() {
    // Fetch the leeslijst from localStorage
    let leesLijstFetched = JSON.parse(localStorage.getItem('leeslijst')) || [];
    const tooltipContainer = document.querySelector('.tooltip_leeslijst');
    const tooltipBtn = document.querySelector('.tooltip_btn');
    const leeslijstPage = document.querySelector('body#leesLijst .leesLijst');

    // Haal alle huidige artikelen uit de tooltip
    const articles = tooltipContainer.querySelectorAll('.one_tooltip_article');
    articles.forEach(article => article.remove());

    // Update het aantal items
    let leeslijstCount = leesLijstFetched.length;

     // Loop door de json heen
     leesLijstFetched.forEach(leesLijstFetchedItem => {
        // Check of het artikel de benodigheden heeft (Title, Author, Link, ID)
        if (leesLijstFetchedItem.Title && leesLijstFetchedItem.Author && leesLijstFetchedItem.Link && leesLijstFetchedItem.ID) {
           // maak een div aan voor een nieuw artikel in de tooltip
            // maak een div aan voor een nieuw artikel in de tooltip
            let tooltipArticle = document.createElement('div');
            tooltipArticle.classList.add('one_tooltip_article');

            // maak een a tag en zet de href gelijk aan de link van het artikel
            let Articlelink = document.createElement('a');
            Articlelink.href = leesLijstFetchedItem.Link;

            // maak h4 aan en zet de auteur erop
            let h4 = document.createElement('h4');
            h4.textContent = leesLijstFetchedItem.Title;

            // maak een p aan en zet de titel erop
            let p = document.createElement('p');
            p.textContent = leesLijstFetchedItem.Author;

            // Maak svg voor de chevron voor de tooltip
            let svgChevron = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svgChevron.classList.add('chev_right');  // This is for the tooltip
            svgChevron.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
            svgChevron.setAttribute('viewBox', '0 0 320 512');

            let pathChevron = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            pathChevron.setAttribute('d', 'M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z');
            svgChevron.appendChild(pathChevron);

            // Maak een button voor de trash-icoon in de leeslijst
            let trashButton = document.createElement('button'); 
            trashButton.classList.add('trash'); // Voeg de class .trash toe aan de button

            // Maak de SVG voor de trash-icoon
            let svgTrash = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svgTrash.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
            svgTrash.setAttribute('viewBox', '0 0 457.503 457.503');

            // Voeg het pad toe aan de SVG
            let pathTrash = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            pathTrash.setAttribute('d', 'M381.575,57.067h-90.231C288.404,25.111,261.461,0,228.752,0C196.043,0,169.1,25.111,166.16,57.067H75.929 c-26.667,0-48.362,21.695-48.362,48.362c0,26.018,20.655,47.292,46.427,48.313v246.694c0,31.467,25.6,57.067,57.067,57.067 h195.381c31.467,0,57.067-25.6,57.067-57.067V153.741c25.772-1.02,46.427-22.294,46.427-48.313 C429.936,78.761,408.242,57.067,381.575,57.067z M165.841,376.817c0,8.013-6.496,14.509-14.508,14.509 c-8.013,0-14.508-6.496-14.508-14.509V186.113c0-8.013,6.496-14.508,14.508-14.508c8.013,0,14.508,6.496,14.508,14.508V376.817z M243.26,376.817c0,8.013-6.496,14.509-14.508,14.509c-8.013,0-14.508-6.496-14.508-14.509V186.113 c0-8.013,6.496-14.508,14.508-14.508c8.013,0,14.508,6.496,14.508,14.508V376.817z M320.679,376.817 c0,8.013-6.496,14.509-14.508,14.509c-8.013,0-14.509-6.496-14.509-14.509V186.113c0-8.013,6.496-14.508,14.509-14.508 s14.508,6.496,14.508,14.508V376.817z');
            svgTrash.appendChild(pathTrash);

            // Voeg data-attributen toe aan de SVG (voor identificatie)
            trashButton.dataset.articleId = leesLijstFetchedItem.ID;
            trashButton.dataset.articleLink = leesLijstFetchedItem.Link;
            trashButton.dataset.articleTitle = leesLijstFetchedItem.Title;
            trashButton.dataset.articleAuthor = leesLijstFetchedItem.Author;

            // Voeg de SVG toe aan de button
            trashButton.appendChild(svgTrash);

            // Voeg de h4, p en svgChevron elementen toe aan de a (tooltip)
            Articlelink.appendChild(h4);
            Articlelink.appendChild(p);
            tooltipArticle.appendChild(Articlelink);
            tooltipArticle.appendChild(svgChevron); // Voeg chevron toe aan tooltip

            // Voeg de a toe aan het artikel (tooltip)


            // Clone het artikel zodat deze ook aan de leeslijst-aside toegevoegd kan worden
            let clonedTooltipArticle = tooltipArticle.cloneNode(true);

            // Vervang de chevron met de trash-button in de leeslijst
            let leeslijstArticle = clonedTooltipArticle;
            leeslijstArticle.querySelector('.chev_right').replaceWith(trashButton); // Vervang chevron door trash-button


            // voeg het artikel voor de button toe in de tooltip
            tooltipContainer.insertBefore(tooltipArticle, tooltipBtn);
            leeslijstPage.appendChild(leeslijstArticle);  // Add the article to the leeslijst

            

        }
    });
    // Add the trash button to leeslijst and its event listener
    let trashButtons = document.querySelectorAll('.trash');
    trashButtons.forEach(function (trashButton) {
        trashButton.addEventListener('click', function () {

            
            // Parse de local storage
            let leesLijst = JSON.parse(localStorage.getItem('leeslijst')) || [];
    
            // Pak de id van de trash knop
            let currentItemID = trashButton.dataset.articleId;
    
            // pak dezelfde id uit de storage lijst
            let itemIndex = leesLijst.findIndex(item => item.ID === currentItemID);
    
            if (itemIndex !== -1) {
                // haal het item weg
                leesLijst.splice(itemIndex, 1);
    
                // Update localStorage
                localStorage.setItem('leeslijst', JSON.stringify(leesLijst));
    
                // Haal het item visueel weg
                trashButton.parentElement.remove();
                leeslijstCount = leesLijst.length 
                // check of de leeslijst nu leeg is
                if (leeslijstCount === 0) {
                    let emptyText = document.createElement('h4');
                    emptyText.textContent = "De leeslijst is leeg";
                    leeslijstPage.appendChild(emptyText);
                }
                let counterHeaders = document.querySelectorAll('.counter'); 
                counterHeaders.forEach(counterHeader => {
                    counterHeader.dataset.count = leeslijstCount; 
                    if(leeslijstCount !== 0){
                        counterHeader.classList.add('remove');
                        setTimeout(function (){ // Doe dit na 1s
            
                            counterHeader.classList.remove('remove');
                                
                        }, 500);
                        leesLijstTooltip.classList.add('slide-out');
                        setTimeout(function (){ // Doe dit na 1s
                
                            leesLijstTooltip.classList.remove('slide-out');
                                
                        }, 2000);
                    }
                });
            } else {
                console.error("Item not found in leesLijst for ID: ", currentItemID);
            }
        });
    });
    
    if(leeslijstCount == 0){
        if(leeslijstCount == 0){
            console.log("leeg");
            let emptytext = document.createElement('h4');
            emptytext.textContent = "De leeslijst is leeg";
            leeslijstPage.appendChild(emptytext);  // Add the article to the leeslijst
        }
    }
    // In de header wordt de count geupdated
    let counterHeaders = document.querySelectorAll('.counter'); 
    counterHeaders.forEach(counterHeader => {
        counterHeader.dataset.count = leeslijstCount; 
    });
}


// De masterfunctie :)
readLocalStorage();
