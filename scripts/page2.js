// De data - Bron: https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share
const sharePage = {
 title: "Red Pers",
 text: "Als stagiair voor de klas: onbetaald en onder hoge druk",
 url: "https://divaninl.github.io/fix-the-flow-interactive-website/stagiair.html",
};
// De button en result dif defineren
const shareBtn = document.querySelector(".shareBtn");
const resultPara = document.querySelector(".result");


shareBtn.addEventListener("click", async () => {
 try {
   // Share
   await navigator.share(sharePage);
   // Succes melding
   resultPara.textContent = "Arikel sucessvol gedeeld";
 } catch (err) {
   // Oops i did it again...
   resultPara.textContent = `Oeps! Er is iets fout gegaan: ${err}`;
 }
});