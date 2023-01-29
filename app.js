const fileButton = document.querySelector("#fileBtn");
const UpladBTN = document.querySelector("#ULPbtn");
const preView = document.querySelector("#preView");
const width = document.querySelector("#width");
const height = document.querySelector("#height");
const aspect = document.querySelector("#aspect");
const download = document.querySelector("#download");
const quality = document.querySelector("#quality");
let orgResoluton;

UpladBTN.addEventListener("click", () => fileButton.click());
fileButton.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;
  preView.src = URL.createObjectURL(file);
  preView.addEventListener("load", () => {
    width.value = preView.naturalWidth;
    height.value = preView.naturalHeight;
    orgResoluton = preView.naturalWidth / preView.naturalHeight;
    UpladBTN.classList.add("active");
  });
});
width.addEventListener("keyup", () => {
  const Imgheight = aspect.checked ? width.value / orgResoluton : height.value;
  height.value = Math.floor(Imgheight);
});
height.addEventListener("keyup", () => {
  const ImgWidth = aspect.checked ? height.value * orgResoluton : width.value;
  width.value = Math.floor(ImgWidth);
});
download.addEventListener("click", () => {
  const canvs = document.createElement("canvas");
  const a = document.createElement("a");
  const ctx = canvs.getContext("2d");
  const imgQuality = quality.checked ? 0.7 : 1.0;

  canvs.width = width.value;
  canvs.height = height.value;

  ctx.drawImage(preView, 0, 0, canvs.width, canvs.height);
//   document.body.appendChild(canvs);
a.href = canvs.toDataURL('image/jpg',imgQuality)
a.download = new Date().getTime()
a.click()
});
