// Imports
import { collisions } from "../assets/public/collisions.ts";
// DOM & Context init

const canvas = document.querySelector("canvas") as HTMLCanvasElement;
canvas.width = 1024;
canvas.height = 576;

const context = canvas.getContext("2d") as CanvasRenderingContext2D;
context.imageSmoothingEnabled = false;
const offset: { x: number; y: number } = {
  x: -120,
  y: -80,
};

// types
type Hitbox = {
  top: number;
  bottom: number;
  left: number;
  right: number;
};

// Helper Functions

// Collision checker

const rectangularCollision = ({
  hitbox1,
  hitbox2,
}: {
  hitbox1: Hitbox;
  hitbox2: Hitbox;
}) => {
  return (
    hitbox1.right >= hitbox2.left &&
    hitbox1.left <= hitbox2.right &&
    hitbox1.bottom >= hitbox2.top &&
    hitbox1.top <= hitbox2.bottom
  );
};

// Input checker
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

// Collisions Function
const collisionsMap: number[][] = [];
const collider = () => {
  for (let i = 0; i < collisions.length; i += 70) {
    collisionsMap.push(collisions.slice(i, 70 + i));
  }
};
collider();
type position = {
  x: number;
  y: number;
};
class Boundary {
  position: position;
  width: number;
  height: number;
  right: number;
  bottom: number;
  constructor(position: position) {
    this.position = position;
    this.width = 16 * 1.13;
    this.height = 16 * 1.13;
    this.right = this.position.x + this.width;
    this.bottom = this.position.y + this.height;
  }

  draw(context: CanvasRenderingContext2D) {
    context.fillStyle = "red";
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

const boundaries: Boundary[] = [];

collisionsMap.forEach((row, ri) => {
  row.forEach((symb, ci) => {
    if (symb === 1025) {
      boundaries.push(
        new Boundary({
          x: ci * 16 * 1.13 + offset.x,
          y: ri * 16 * 1.13 + offset.y,
        }),
      );
    }
  });
});

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
  right: number;
  bottom: number;
  frames: number;
  hitbox: Hitbox;
  // image takes in the image path
  public constructor(
    height: number,
    width: number,
    image_src: string,
    xpos: number,
    ypos: number,
    frames: number,
  ) {
    this.height = height;
    this.width = width;
    this.image_src = image_src;
    this.sprite = new Image();
    this.sprite.src = image_src;
    this.xpos = xpos;
    this.ypos = ypos;
    this.speed = 3;
    this.right = this.xpos + this.width;
    this.bottom = this.ypos + this.height;
    this.frames = frames;
    this.hitbox = { top: 0, bottom: 0, left: 0, right: 0 };
    this.sprite.onload = () => {
      this.hitbox = {
        top: this.ypos,
        bottom: this.bottom,
        left: this.xpos,
        right: this.right,
      };
    };
  }
  move(dx: number, dy: number) {
    // move the sprite by incrementing the xpos/ypos by the params passed then redrawing the sprite
    this.xpos = this.xpos + dx;
    this.ypos = this.ypos + dy;
    this.right = this.xpos + this.width;
    this.bottom = this.ypos + this.height;
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
  0,
);
playerSprite.sprite.onload = () => {
  playerSprite.height = playerSprite.sprite.height / 8;
  playerSprite.width = playerSprite.sprite.width / 4;
  playerSprite.xpos = canvas.width / 2 - playerSprite.width / 2;
  playerSprite.ypos = canvas.height / 2 - playerSprite.height / 2;
  playerSprite.frames =
    (playerSprite.sprite.height * playerSprite.sprite.width) /
    (playerSprite.height * playerSprite.width);
  playerSprite.right = playerSprite.xpos + playerSprite.width;
  playerSprite.bottom = playerSprite.ypos + playerSprite.height;
};

// Loading map
// Initialise window event listener
const input = new InputController();
const mapImage = new map(offset.x, offset.y, "../assets/public/untitled.png");
const testBoundary = new Boundary({ x: 120, y: 80 });
// Animation loop
const animate = () => {
  window.requestAnimationFrame(animate);

  context.clearRect(0, 0, canvas.width, canvas.height);

  mapImage.draw(context);
  // boundaries.forEach((boundary) => boundary.draw(context));
  testBoundary.draw(context);
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

  if (
    playerSprite.right >= testBoundary.position.x &&
    playerSprite.xpos <= testBoundary.right &&
    playerSprite.bottom >= testBoundary.position.y &&
    playerSprite.ypos <= testBoundary.bottom
  ) {
    console.log("colliding");
  }
};
mapImage.image.onload = () => animate();
