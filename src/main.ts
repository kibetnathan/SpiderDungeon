// DOM & Context init

const canvas = document.querySelector("canvas") as HTMLCanvasElement;
canvas.width = 1024;
canvas.height = 576;

canvas.style.background = "#dfdfca";

const context = canvas.getContext("2d") as CanvasRenderingContext2D;
context.imageSmoothingEnabled = false;
// Helper Functions
const handleInput = () => {
  if (input.isPressed("w")) {
    playerSprite.move(0, -playerSprite.speed);
  }
  if (input.isPressed("a")) {
    playerSprite.move(-playerSprite.speed, 0);
  }
  if (input.isPressed("s")) {
    playerSprite.move(0, playerSprite.speed);
  }
  if (input.isPressed("d")) {
    playerSprite.move(playerSprite.speed, 0);
  }
};

// Classes
// Keystroke Event Controller

class InputController {
  keys: Record<string, boolean>;
  constructor() {
    // Object holding the keys
    this.keys = {};

    // Keydown listener
    window.addEventListener("keydown", (e) => {
      if (" " === e.key) {
        e.preventDefault();
        // Keep space for the game inputs
      }
      this.keys[e.key.toLowerCase()] = true;
    });

    // Keyup listener
    window.addEventListener("keyup", (e) => {
      this.keys[e.key.toLowerCase()] = false;
    });
  }

  isPressed(key: string) {
    return !!this.keys[key.toLowerCase()];
  }
}
// Player Class
class Sprite {
  height: number;
  width: number;
  image_src: string;
  sprite: HTMLImageElement;
  xpos: number;
  ypos: number;
  speed: number;
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
    this.speed = 3;
  }
  move(dx: number, dy: number) {
    // move the sprite by incrementing the xpos/ypos by the params passed then redrawing the sprite
    this.xpos = this.xpos + dx;
    this.ypos = this.ypos + dy;
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
  moveMap() {
    // increment the map pos based on dx and dy
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
const input = new InputController();
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
  handleInput();
};
mapImage.image.onload = () => animate();
