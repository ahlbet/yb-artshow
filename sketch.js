let canvasColor,
  currentFrame,
  pictureFrameWidth,
  pictureFrameHeight,
  currentY,
  frameThickness,
  lineHeight,
  rSlow;

function setup() {
  seedGlobals();
  createCanvas(windowWidth, windowHeight);
  background(canvasColor);
  drawPictureFrame();
  rectMode(CORNER);
}

function draw() {
  let r = map(noise(currentFrame / rSlow, currentY / rSlow), 0, 1, 0, 255);
  let g = map(noise(currentFrame / gSlow, currentY / gSlow), 0, 1, 0, 255);
  let b = map(noise(currentFrame / bSlow, currentY / bSlow), 0, 1, 0, 255);

  fill(r, g, b);
  noStroke();

  rect(
    width / 2 - pictureFrameWidth / 2,
    currentY,
    pictureFrameWidth,
    lineHeight
  );

  currentY += lineHeight;

  if (currentY === height / 2 + pictureFrameHeight / 2 + lineHeight) {
    currentY = windowHeight / 2 - pictureFrameHeight / 2;
  }

  currentFrame++;
}

const drawPictureFrame = () => {
  noFill();
  stroke(30);
  strokeWeight(frameThickness);
  rectMode(CENTER, CENTER);
  rect(width / 2, height / 2, pictureFrameWidth + 20, pictureFrameHeight + 20);
};

const seedGlobals = () => {
  rSlow = 300;
  gSlow = 400;
  bSlow = 500;
  lineHeight = 3;
  frameThickness = 20;
  canvasColor = 240;
  currentFrame = 0;
  pictureFrameWidth = windowWidth / 2;
  pictureFrameHeight = windowHeight / 2;
  currentY = windowHeight / 2 - pictureFrameHeight / 2;
};
