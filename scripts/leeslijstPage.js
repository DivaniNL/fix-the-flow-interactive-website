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

            // Maak svg voor de trash voor de leeslijst
            let svgTrash = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svgTrash.classList.add('trash');  // This is for the leeslijst
            svgTrash.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
            svgTrash.setAttribute('viewBox', '0 0 457.503 457.503');

            let pathTrash = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            pathTrash.setAttribute('d', 'M381.575,57.067h-90.231C288.404,25.111,261.461,0,228.752,0C196.043,0,169.1,25.111,166.16,57.067H75.929 c-26.667,0-48.362,21.695-48.362,48.362c0,26.018,20.655,47.292,46.427,48.313v246.694c0,31.467,25.6,57.067,57.067,57.067 h195.381c31.467,0,57.067-25.6,57.067-57.067V153.741c25.772-1.02,46.427-22.294,46.427-48.313 C429.936,78.761,408.242,57.067,381.575,57.067z M165.841,376.817c0,8.013-6.496,14.509-14.508,14.509 c-8.013,0-14.508-6.496-14.508-14.509V186.113c0-8.013,6.496-14.508,14.508-14.508c8.013,0,14.508,6.496,14.508,14.508V376.817z M243.26,376.817c0,8.013-6.496,14.509-14.508,14.509c-8.013,0-14.508-6.496-14.508-14.509V186.113 c0-8.013,6.496-14.508,14.508-14.508c8.013,0,14.508,6.496,14.508,14.508V376.817z M320.679,376.817 c0,8.013-6.496,14.509-14.508,14.509c-8.013,0-14.509-6.496-14.509-14.509V186.113c0-8.013,6.496-14.508,14.509-14.508 s14.508,6.496,14.508,14.508V376.817z');
            svgTrash.appendChild(pathTrash);

            // voeg de h4, p en svgChevron elementen toe aan de a (tooltip)
            Articlelink.appendChild(h4);
            Articlelink.appendChild(p);
            tooltipArticle.appendChild(svgChevron); // Add chevron to tooltip

            // voeg de a toe aan de article (tooltip)
            tooltipArticle.appendChild(Articlelink);

            // clone de artikel zodat hij ook aan de leeslijst aside toegevoegd kan worden
            let clonedTooltipArticle = tooltipArticle.cloneNode(true);

            // Change the SVG for leeslijst to the trash icon
            let leeslijstArticle = clonedTooltipArticle;
            leeslijstArticle.querySelector('.chev_right').replaceWith(svgTrash); // Replace chevron with trash in leeslijst

            // voeg het artikel voor de button toe in de tooltip
            tooltipContainer.insertBefore(tooltipArticle, tooltipBtn);
            leeslijstPage.appendChild(leeslijstArticle);  // Add the article to the leeslijst

            // Add the trash button to leeslijst and its event listener
            let trashButtons = document.querySelectorAll('.trash');
            trashButtons.forEach(function (trashButton) {
                trashButton.addEventListener('click', function (e) {
                    // console.log("test");
                    // let leesLijst = JSON.parse(localStorage.getItem('leeslijst')) || [];
                    // let currentItemID = trashButton.dataset.articleId;

                    // leesLijst.splice(currentItemID, 1);
                    // let counterHeaders = document.querySelectorAll('.counter');
                    // counterHeaders.forEach(counterHeader => {
                    //     counterHeader.classList.add('remove');
                    //     setTimeout(function () {
                    //         counterHeader.classList.remove('remove');
                    //     }, 500);
                    // });

                    // localStorage.setItem('leeslijst', JSON.stringify(leesLijst));
                    // console.log('voor update' + JSON.stringify(leesLijst));
                    // readLocalStorage();
                    // console.log(localStorage.getItem('leeslijst'));
                });
            });

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
