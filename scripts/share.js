// De data - Bron: https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share

const metaDescription = document.querySelector('meta[name="description"]').getAttribute('content');


if (metaDescription) {
 shareTxt = metaDescription;
} else {
 shareTxt = "Gedeeld artikel";
}

const sharePage = {
 title: document.title,
 text: shareTxt,
 url: document.location,
};
console.log(sharePage);
// De button en result dif defineren
const shareBtn = document.querySelector(".shareBtn");
const resultPara = document.querySelector(".result");

if (navigator.share) {
 shareBtn.addEventListener("click", async () => {
   try {
     // Share
     await navigator.share(sharePage);
     // Succes melding
     resultPara.textContent = "Artikel succesvol gedeeld";
   } catch (err) {
     // Oops, something went wrong
     resultPara.textContent = `Oeps! Er is iets fout gegaan: ${err}`;
   }
 });
} else {
 // Als Share API niet werkt. Sadge.
 shareBtn.addEventListener("click", () => {
   resultPara.textContent = "Deel functie wordt niet ondersteund in deze browser.";
   console.warn("De functie navigator.share wordt niet ondersteund in deze browser. Dat is jammer, ik wilde net wat cools doen 😞 Ik ga even huilen in een hoekje...");
 });
}