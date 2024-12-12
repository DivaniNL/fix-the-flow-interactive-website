// De data - Bron: https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share
const sharePage = {
 title: "Red Pers",
 text: "Verbindend, fris en vol energie: een duik in de opkomst van maté",
 url: "https://divaninl.github.io/fix-the-flow-interactive-website/index.html",
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