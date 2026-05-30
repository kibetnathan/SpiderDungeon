// DOM & Context init

const canvas = document.querySelector("canvas") as HTMLCanvasElement;
canvas.width = 1024;
canvas.height = 576;

canvas.style.background = "#dfdfca";

const context = canvas.getContext("2d") as CanvasRenderingContext2D;
context.imageSmoothingEnabled = false;
// Functions
// Keystroke Event Listening Function
const keystrokeListener = () => {
  window.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "w":
        break;
      case "a":
        break;
      case "s":
        break;
      case "d":
        break;
      case " ": // Space Bar
        break;
      default:
        console.log(e);
    }
  });
};

// Player Class
class Sprite {
  height: number;
  width: number;
  image_src: string;
  sprite: HTMLImageElement;
  xpos: number;
  ypos: number;
  // image takes in the image path
  public constructor(
    height: number,
    width: number,
    image_src: string,
    xpos: number,
    ypos: number,
  ) {
    this.height = height;
    this.width = width;
    this.image_src = image_src;
    this.sprite = new Image();
    this.sprite.src = image_src;
    this.xpos = xpos;
    this.ypos = ypos;
  }
}
// Map Class
class map {
  private xpos: number;
  private ypos: number;
  image_src: string;
  image: HTMLImageElement;

  public constructor(xpos: number, ypos: number, image_src: string) {
    this.xpos = xpos;
    this.ypos = ypos;
    this.image_src = image_src;
    this.image = new Image();
    this.image.src = image_src;
  }
  draw(context: CanvasRenderingContext2D) {
    context.drawImage(this.image, this.xpos, this.ypos);
  }
}

// Loading player
const playerSprite = new Sprite(
  0,
  0,
  "../assets/public/blue_haired_woman.png",
  0,
  0,
);
playerSprite.sprite.onload = () => {
  playerSprite.height = playerSprite.sprite.height / 8;
  playerSprite.width = playerSprite.sprite.width / 4;
  playerSprite.xpos = canvas.width / 2 - playerSprite.width / 2;
  playerSprite.ypos = canvas.height / 2 - playerSprite.height / 2;
};
// Loading map
// Initialise window event listener
keystrokeListener();
const mapImage = new map(-120, -80, "../assets/public/untitled.png");

// Animation loop
const animate = () => {
  window.requestAnimationFrame(animate);

  context.clearRect(0, 0, canvas.width, canvas.height);

  mapImage.draw(context);
  context.drawImage(
    playerSprite.sprite,
    0,
    0,
    playerSprite.width,
    playerSprite.height,
    playerSprite.xpos,
    playerSprite.ypos,
    playerSprite.width * 1.5,
    playerSprite.height * 1.5,
  );
};
mapImage.image.onload = () => animate();
