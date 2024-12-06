# Fix The Flow
Wireflow:
https://www.figma.com/proto/iRa6q0esew1KVaDUgnzQdA/Fix-The-Flow-Sprint-5?page-id=4006%3A2688&node-id=4006-2768&node-type=frame&viewport=-4293%2C-1523%2C0.46&t=AjG4aKWqvB4922jo-1&scaling=min-zoom&content-scaling=fixed

We hebben voor Red Pers een artikel detailpagina nagebouwt.

## Inhoudsopgave Readme

  * [Beschrijving](#beschrijving)
  * [Kenmerken](#kenmerken)
  * [Bronnen](#bronnen)
  * [Licentie](#licentie)

## Beschrijving

Deze sprint heb ik op basis van test-resultaten, feedbacxk van docenten en feedback uit de vorige sprint review mijn code herschreven en de nodige zaken aangepast.
de URL is: [https://divaninl.github.io/i-love-web/](https://divaninl.github.io/i-love-web/)
## Kenmerken

De website is gebouwd met [HTML](#html), [CSS](#CSS) en [JS](#JS).

### HTML

Hieronder staan de zaken die ik heb aangepast in de [HEAD](#HEAD) en in de [BODY](#BODY):

#### HEAD

In de head heb ik, om de SEO score te verbeteren, de metabeschrijving [toegevoegd](https://github.com/DivaniNL/all-human-accessible-website/blob/main/index.html#L9).

#### BODY

  De structuur van de body is [HEADER](#HEADER), [MAIN](#MAIN) en [FOOTER](#FOOTER): 
  
  ##### HEADER
  De header heb ik volledig anders opgebouwd. Ik heb ervoor gezorgd dat er geen dubbele code meer in de HTML staat, door sommige elementen met absolute te positioneren. Nu staan alle menu's samen in een nav element.
  Verder heb ik het mobiele menu nu compleet gemaakt met het werkende hamburgermenu. Zie afbeelding hieronder:
  ![Schermopname (824)](https://github.com/user-attachments/assets/d22b5235-8275-43f8-93ef-f6dac61bd9dc)

  Ook heb ik, om de toegangkelijkheid voor screenreaders te verbeteren, een skip to the content button geplaatst die alleen ziochtbaar is tijdens het tabben en het gebruik van een screenreader:
  Hieronder een abfeelding:
  ![Schermopname (826)](https://github.com/user-attachments/assets/010760a9-d05e-4a70-b35c-fa4624e5e60c)

  ##### MAIN
  
  In de main heb ik minder veranderd als in de header. Hier heb ik bijvoorbeeld alt-attributen teogevoegd aan afbeeldingen, die ik overigens ook verkleind heb. Daarnaast heb ik buttons aria-labels gegeven om de toegankelijkheid te verbeteren voor screenreaders. Verder heb ik ook van wat kopjes het heading level gewijzigd zodat de heading structuur klopt.
  
  ##### FOOTER
  
  In de `<footer>` staan alle links naar andere pagina's. In de footer heb ik de h4's (navigatiekoppen) veranderd naar h2 om de heading semantiek te verbeteren.
  
  
### CSS


#### Skip to Content Knop

Hieronder de CSS code die ik gebruikt heb voor de skip to content knop:
```css
.skip-to-content-link {
    background: rebeccapurple;
    height: 30px;
    left: 50%;
    padding: 8px;
    position: absolute;
    transform: translate(-50%, -100%);
    transition: transform 0.3s;
    color: white;
    z-index: 999999;
}

.skip-to-content-link:focus {
    transform: translate(-50%, 0%);
}
```

#### Hamburger menu

Het hamburgermenu + de mobile menu werkt volledig zonder het gebruik van JavaScript. Ik heb dit gedaan door van de hamburgerbutton een checkbox te maken en in de css te checken of deze "checked" is.
```css
        .hamburger{
            height: 0;
            width: 0;
            grid-row: 2;
            @media (min-width :860px){
                display: none;
            }
        }
        .hamburger + label{
            z-index: 9999999;
            position: relative;
            display: inline-block;
            width: 3rem !important;
            height: 3rem !important;
            cursor: pointer;
            svg{
                width: 3rem !important;
                height: 3rem !important;
            }
            @media (min-width: 860px){
                display: none;
            }
        }
        .hamburger:focus + label{
            outline: 5px auto -webkit-focus-ring-color;
        }
        .hamburger:hover + label,
        .hamburger:focus + label {
                svg > path {
                    stroke: var(--red);
                }
            }
        .hamburger:checked + label #menu-closed {
            display: none;
        }
        
        .hamburger:checked + label #menu-opened {
            display: block;
        }
        .hamburger ~ nav{
            display: flex;
            flex-direction: column;
            left: -100%;
            @media (max-width: 859px){
                ul{
                    li{
                        display: none;
                    }
                }
            }
            @media (min-width: 860px){
                display: block;
            }
        }
        .hamburger:checked ~ nav{

            left: 0%;
            @media (max-width: 859px){
                ul{
                    li{
                        display: initial;
                    }
                }
            }
        }
```

### JS

In JavaScript heb ik een aantal dingen gedaan:
1. Ik heb ervoor gezorgd dat na verticaal gescrollt te hebben, de minder-relevante headerbalken ingeklapt worden en weer ingeklapt worden bij het naar boven scrollen.
2. Ik heb ervoor gezorgd dat bij het openen van een popup enkel de elementen in de popup tab-baar zijn, en bij het sluiten ervan dit weer ongedaan wordt.
3. Ik heb ervoor gezorgd dat linksboven automatisch de juiste datum in de header wordt getoond (Nederlands format)

## Licentie

This project is licensed under the terms of the [MIT license](./LICENSE).
