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