let canvasColor,
  currentFrame,
  pictureFrameWidth,
  pictureFrameHeight,
  currentY,
  frameThickness,
  lineHeight,
  rSlow,
  gSlow,
  bSlow,
  frames,
  isResizing,
  resizeTimer = 0;

function setup() {
  seedGlobals();
  createCanvas(windowWidth, windowHeight);
  background(200);
  // drawPictureFrame();
  rectMode(CENTER);
  seedFrames();

  for (let frame of frames) {
    frame.clearPictureFrame();
    frame.drawBorder();
  }
}

function draw() {
  if (isResizing) {
    resizeTimer++;

    if (resizeTimer > 50) {
      isResizing = false;
      frames = [];
      pictureFrameWidth = windowWidth / 6;
      pictureFrameHeight = windowHeight / 2;
      seedFrames();
      for (let frame of frames) {
        frame.clearPictureFrame();
        frame.drawBorder();
      }
    }
  }

  if (!isResizing) {
    for (let frame of frames) {
      frame.testIfHolding();
      if (!frame.isHolding) {
        frame.paint();
        frame.jump();
      }
    }
  }
}

function windowResized() {
  isResizing = true;
  resizeTimer = 0;
  resizeCanvas(windowWidth, windowHeight);
}

function seedFrames() {
  let frame1 = new Frame({ x: width / 5, y: height / 2 });
  let frame2 = new Frame({ x: width / 2, y: height / 2 });
  let frame3 = new Frame({ x: (4 * width) / 5, y: height / 2 });
  frames.push(frame1);
  frames.push(frame2);
  frames.push(frame3);
}

function seedGlobals() {
  frames = [];
  rSlow = 300;
  gSlow = 400;
  bSlow = 500;
  lineHeight = 3;
  frameThickness = 14;
  canvasColor = 240;
  currentFrame = 0;
  pictureFrameWidth = floor(windowWidth / 6);
  pictureFrameHeight = floor(windowHeight / 2);
  isResizing = false;
  resizeTimer = 0;
}
