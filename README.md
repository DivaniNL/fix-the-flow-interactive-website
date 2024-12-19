# Fix The Flow

Voor Red Pers heb ik een intreractie toegevoegd die bestaat uit meerdere interacties. Dit betreft een leeslijst waar bezoekers hun artikelen in kunnen opslaan en verwijderen.
[https://divaninl.github.io/fix-the-flow-interactive-website/](https://divaninl.github.io/fix-the-flow-interactive-website/)

## Inhoudsopgave Readme

  * [Ontwerpprobleem](#Ontwerpprobleem)
  * [Beschrijving](#Beschrijving)
  * [Kenmerken](#kenmerken)
  * [Bronnen](#bronnen)
  * [Licentie](#licentie)

## Ontwerpprobleem

Artikellezers wil ik een leeslijst kunnen maken zodat ik artikels kan bewaren voor later, of later uit te kunnen lezen.
Ook wil ik andere artikels kunnen aanklikken om deze ook toe te kunnen voegen, en de leeslijst zelf te kunnen bewerklen op de leeslijstpagina

## Beschrijving

Hieronder licht ik per onderdeel van de interactie toe wat er gebeurt:

### Leeslijst button
Als je een artikel wilt toevoegen aan de leeslijst klik je op de knop die hiervoor bestemd is.  

<img width="198" alt="Scherm­afbeelding 2024-12-18 om 12 00 36" src="https://github.com/user-attachments/assets/e33e798c-c1a2-45ff-b5af-e43054c9d22a" />  

Deze knop is aangepast ten opzichte van de vorige sprint. Hieronder is de oude versie van deze button te zien:  

<img width="49" alt="Scherm­afbeelding 2024-12-18 om 12 01 20" src="https://github.com/user-attachments/assets/9d09265a-c700-4f3d-844a-710dc14a6631" />  

Ik heb hier een ontwerpwijziging in doorgevoerd om ervoor te zoergen dat er meer feedforward aanwezig is op de knop. Hierdoor is het voor de bezoekers duidelijker waar deze button voor bedoeld is.   

Als je op deze button klikt, veranderd de state naar een tijdelijke state waarin te zien is dat dit artikel is toegevoegd:  

<img width="140" alt="Scherm­afbeelding 2024-12-18 om 12 03 26" src="https://github.com/user-attachments/assets/c0faa45b-41b9-42a0-ba85-d797fa07dc2b" />

Na twee seconden veranderd de button naar de active state (nu kan de gebruiker weer het artikel uit de leeslijst verwijderen:  
<img width="197" alt="Scherm­afbeelding 2024-12-18 om 12 06 05" src="https://github.com/user-attachments/assets/d9874687-014c-4016-8c37-50522f088ed3" />

Ik heb feedback toegepast op de tijdelijk en de active state door de tekst aan te passen die in de button te zien is.

### Leeslijst tooltip + menu item counter

Als er een artikel wordt toegevoegd aan de leeslijst wordt de leeslijst-tooltip getoond.
In de navigatie wordt ook het aantal geupdatet in het rondje boven het linkje "Leeslijst".

Hieronder een video waarin ik het eerste item toevoeg aan de leeslijst:




https://github.com/user-attachments/assets/8f07a361-c6a3-491d-9716-c83d1ca2a22f




Hieronder een video waarin ik nog een item toevoeg aan de leeslijst:



https://github.com/user-attachments/assets/32a3211f-656f-4534-b7be-58d81b2fbb08



Hieronder een video waarin ik een item verwijder aan de leeslijst:  

https://github.com/user-attachments/assets/f0edbc82-2c12-4c4b-91f1-ad7c62c4484a

Hieronder een video waarin ik het laatste item verwijder aan de leeslijst:


https://github.com/user-attachments/assets/15f9a26b-289c-4dda-af2a-5892f1506410


## Leeslijstpagina

Ik heb ook een leeslijstpagina ontworpen en gebouwd. Op deze pagina is het de bedoeling dat de gebruiker alle artikelen die toegevoegd zijn aan de leeslijst kan zien. Ook kan een gebruiker hier naar dit artikel toe door op de link van het artikel te klikken. Tenslotte kan je op deze pagina ook artikels verwijderen uit de leeslijst.


Hier is te zien dat ik een artikel verwijder uit de leeslijst

https://github.com/user-attachments/assets/02c17245-ec3d-430e-bcb6-2f600a6f8fcb


Hier is te zien dat ik het laatste artikel verwijder uit de leeslijst. Hierna wordt het bericht getoond dat de lijst nu leeg is.


https://github.com/user-attachments/assets/48433e23-6332-462c-b24b-54ae998fa79b


## User Test

Deze interacties zijn getest met de User Test. Hier kwamen een aantal zaken uit, waarop ik verbeteringen heb toegepast.

Allereerst verdween de tooltip te snel na het toevoegen van een artikel. Het verdwijnen van de tooltip na x seconden heb ik uitgezet.
Daarnaast was het voor menige tester niet duidelijk waar de artikels zich bevinden. Hiervoor heb ik de links in de navigatie tijdelijk aangepast om de interactie beter te kunnen testen.

## Kenmerken

### Manage Leeslijst
Ik heb de leeslijst beheerd met een techniek genaamd localStorage. Met localStorage kan je waardes opslaan in je lokale bestander, per browser. Deze wordt gewist als je de browser afsluit.

Als er item wordt toegevoegd aan de leeslijst verwerk ik dat op de volgende manier:
1. Ik haal de leeslisjt op en maak een object aan waar alle informatie van het artikel in zit. Deze informatie staat op elke toevoeg button van het artikel
```js
let leesLijst = JSON.parse(localStorage.getItem('leeslijst')) || [];
let currentItemID = leesLijstBtn.dataset.articleId;
let currentItemLink = leesLijstBtn.dataset.articleLink;
let currentItemTitle = leesLijstBtn.dataset.articleTitle;
let currentItemAuthor = leesLijstBtn.dataset.articleAuthor;

let leesLijstItem = 
{
     "ID": currentItemID,
     "Link": currentItemLink,
     "Title": currentItemTitle,
     "Author": currentItemAuthor
};
```
Hier is te zien dat deze informatie op de buttons staat:
```html
<button class="utility_btn bookmark" data-article-id="0" data-article-link="./index.html" data-article-title="Verbindend, fris en vol energie: een duik in de opkomst van maté" data-article-author="Madelief Wapenaar">
        <span class="textPart">Voeg toe aan leeslijst</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="20" viewBox="0 0 15 20" fill="none">
             <path fill-rule="evenodd" clip-rule="evenodd" d="M1 1H13.8333V18.958L7.41667 15.0278L1 18.958V1Z" stroke="#7B7B7A"/>
        </svg>
</button>
```

2. Ik kijk of het atikel al in de leeslijst staat. Zo nee, voeg hem toe (array.push):
+ Ook wordt de counter in de header geupdated en een klasse toegevoegd in css Waardoor er een animatie plaatsvind in het bolletje in het Leeslijst navigatie item met behulp van de klasse "added"
```js

let existingItemIndex = leesLijst.findIndex(item => item.ID === currentItemID);

if (existingItemIndex === -1) {
    // Zo niet voeg hem toe ana de leeslijst array
    leesLijst.push(leesLijstItem);
    let counterHeaders = document.querySelectorAll('.counter'); // Select all elements with the class 'counter'
    counterHeaders.forEach(counterHeader => {
        counterHeader.classList.add('added');
        setTimeout(function (){ // Doe dit na 1s

            counterHeader.classList.remove('added');
                
        }, 500);
    });
    leesLijstTooltip.classList.add('active_tooltip');
    leesLijstTooltip.classList.add('slide-out');
    
}
```
Hier is de animatie te zien in de code:
```css
&.added{
    animation-name:updated;
    animation-duration:.2s;
    animation-iteration-count:2;
}
@keyframes updated {
  0% {
    transform:scale(1);
  }
  50% {
    transform:scale(1.5);
  }
  100% {
    transform:scale(1);
  }
}
```
zo ja, verwijder hem dan (array.splice):
+ook hier wordt dezelfde animatie in de header gedaan, alleen met een andere kleur (.remove)
```js
else {
    // Als dit item al in de local storage staat, verwijder hem dan
    leesLijst.splice(existingItemIndex, 1);
    let counterHeaders = document.querySelectorAll('.counter'); // Select all elements with the class 'counter'
    counterHeaders.forEach(counterHeader => {
        counterHeader.classList.add('remove');
        setTimeout(function (){ // Doe dit na 1s

            counterHeader.classList.remove('remove');
                
        }, 500);
    });
    
}
```
3. Update daarna de leeslijst in localStorage.

```js
localStorage.setItem('leeslijst', JSON.stringify(leesLijst));
```
4. Update daarna de leeslijst in de header tooltip:
5. 
[https://github.com/DivaniNL/fix-the-flow-interactive-website/blob/main/scripts/leeslijst.js#L149-L216](https://github.com/DivaniNL/fix-the-flow-interactive-website/blob/main/scripts/leeslijst.js#L149-L216)


### Leeslijst pagima

Op de leeslijstpagina wordt op een soortgelijke manier als bij de header tooltip de leeslijst opgebouwd, alleen met andere elementen.  
[https://github.com/DivaniNL/fix-the-flow-interactive-website/blob/main/scripts/leeslijstPage.js#L61-L142](https://github.com/DivaniNL/fix-the-flow-interactive-website/blob/main/scripts/leeslijstPage.js#L61-L142)

Hieronder is de functie te zien die uitgevoerd wordt als er op het vuilnisbakje naast een artikel op de leeslijstpagina wordt geklikt:  

[https://github.com/DivaniNL/fix-the-flow-interactive-website/blob/main/scripts/leeslijstPage.js#L144-L213](https://github.com/DivaniNL/fix-the-flow-interactive-website/blob/main/scripts/leeslijstPage.js#L144-L213)

## Bronnen

[Meer informatie over localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

## Licentie

This project is licensed under the terms of the [MIT license](./LICENSE).
