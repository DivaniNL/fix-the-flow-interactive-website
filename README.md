# Fix The Flow
Wireflow:
https://www.figma.com/proto/iRa6q0esew1KVaDUgnzQdA/Fix-The-Flow-Sprint-5?page-id=4006%3A2688&node-id=4006-2768&node-type=frame&viewport=-4293%2C-1523%2C0.46&t=AjG4aKWqvB4922jo-1&scaling=min-zoom&content-scaling=fixed

We hebben voor Red Pers een artikel detailpagina nagebouwt.

## Inhoudsopgave Readme

  * [Beschrijving](#beschrijving)
  * [Kenmerken](#kenmerken)
  * [Bronnen](#bronnen)
  * [Licentie](#licentie)

### Ontwerpprobleem

Artikellezers wil ik een leeslijst kunnen maken zodat ik artikels kan bewaren voor later, of later uit te kunnen lezen.
Ook wil ik andere artikels kunnen aanklikken om deze ook toe te kunnen voegen, en de leeslijst zelf te kunnen bewerklen op de leeslijstpagina




-----------------




Interactie presenteren in de Readme
Na de lijst met de feedback die je hebt verwerkt ga je je interactie(s) presenteren. Dit doe je aan de hand van je Readme. Omdat je deze sprint een of meerdere interacties hebt gemaakt, kan je deze mooi tonen in de Readme en dit gebruiken om te presenteren. In de Readme schrijf je in principe niets over het proces dat je hebt doorlopen, maar focus je op het eindresultaat.

Readme

Titel
Begin de Readme met een goede titel en een korte uitleg over de opdracht en wat je hebt gemaakt. Dit is het "ontwerpprobleem" en de "oplossing".

Beschrijving
Bij 'Beschrijving' komt te staan hoe je project er uit ziet, hoe het werkt en wat je er mee kan.

___ HIERONDER AL GEDAANNNNN

## Leeslijst button
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

## Leeslijst tooltip + menu item counter

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

## User Test

Deze interacties zijn getest met de User Test. Hier kwamen een aantal zaken uit, waarop ik verbeteringen heb toegepast.

Allereerst verdween de tooltip te snel na het toevoegen van een artikel. Het verdwijnen van de tooltip na x seconden heb ik uitgezet.
Daarnaast was het voor menige tester niet duidelijk waar de artikels zich bevinden. Hiervoor heb ik de links in de navigatie tijdelijk aangepast om de interactie beter te kunnen testen.

___
 NOG VERWERKEN
Kenmerken
Bij 'Kenmerken' staat welke technieken zijn gebruikt en hoe. Wat is de HTML structuur? Wat zijn de belangrijkste dingen in CSS? Wat is er met JS gedaan en hoe?

Leg hier in grote lijnen uit hoe de interacties werken met HTML, CSS en JS en verwijs naar code in je repo.
2. Ik heb ervoor gezorgd dat bij het openen van een popup enkel de elementen in de popup tab-baar zijn, en bij het sluiten ervan dit weer ongedaan wordt.
3. Ik heb ervoor gezorgd dat linksboven automatisch de juiste datum in de header wordt getoond (Nederlands format)

## Licentie

This project is licensed under the terms of the [MIT license](./LICENSE).
