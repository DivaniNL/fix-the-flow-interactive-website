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
    const leeslijstPage = document.querySelector('body#leesLijst .leesLijst')

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
            let tooltipArticle = document.createElement('div');
            tooltipArticle.classList.add('one_tooltip_article');

            // maak een a tag en zet de href gelijk aan de link van het artikel
            let Articlelink = document.createElement('a');
            Articlelink.href = leesLijstFetchedItem.Link;

            // maak h4 aan en zet de auteur erop
            let h4 = document.createElement('h4');
            h4.textContent = leesLijstFetchedItem.Author;

            // maak een p aan en zet de titel erop
            let p = document.createElement('p');
            p.textContent = leesLijstFetchedItem.Title; // You can use a different property if needed for description

            // Maak svg aan voor de pijltjes
            let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.classList.add('chev_right');
            svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
            svg.setAttribute('viewBox', '0 0 320 512');

            let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', 'M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z');
            svg.appendChild(path);

            // voeg de h4, p en svg elementen toe aan de a
            Articlelink.appendChild(h4);
            Articlelink.appendChild(p);
            Articlelink.appendChild(svg);

            // voeg de a toe aan de article
            tooltipArticle.appendChild(Articlelink);
            //clone de artikel zodat hij ook aan de leeslijst aside toegevoegd kan worden
            let clonedTooltipArticle = tooltipArticle.cloneNode(true);

            // voeg het artikel voor de button toe in de tooltip
            tooltipContainer.insertBefore(tooltipArticle, tooltipBtn);
            leeslijstPage.appendChild(clonedTooltipArticle);
        }
    });

    // In de header wordt de count geupdated
    let counterHeaders = document.querySelectorAll('.counter'); // Select all elements with the class 'counter'
    counterHeaders.forEach(counterHeader => {
        counterHeader.dataset.count = leeslijstCount; // Update the data-count attribute
    });
}

// De masterfunctie :)
readLocalStorage();
