// DOM & Context init

const canvas = document.querySelector("canvas") as HTMLCanvasElement;
canvas.width = 1024;
canvas.height = 576;

canvas.style.background = "#dfdfca";

const context = canvas.getContext("2d") as CanvasRenderingContext2D;

// Loading map

const mapImage = new Image();
mapImage.src = "../assets/src/untitled.png";

mapImage.onload = () => {
  context.drawImage(mapImage, -120, -80);
};
