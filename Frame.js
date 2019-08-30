class Frame {
  constructor(c) {
    this.c = c;
    this.currentY = c.y - pictureFrameHeight / 2;
    this.paintSpeed = 1;
    this.lineHeight = 2;
    this.r = 0;
    this.g = 0;
    this.b = 0;
    this.rSlow = floor(random(400, 1200));
    this.gSlow = floor(random(400, 1200));
    this.bSlow = floor(random(400, 1200));
    this.currentHoldTime = 0;
    this.holdTime = 300;
    this.isHolding = false;
    this.currentFrame = 0;
  }

  testIfHolding() {
    this.currentFrame += this.paintSpeed;

    if (this.currentY < this.c.y + pictureFrameHeight / 2) {
      this.isHolding = false;
    }

    if (this.currentY > this.c.y + pictureFrameHeight / 2) {
      this.isHolding = true;
    }

    if (this.isHolding) {
      this.currentHoldTime++;

      if (this.currentHoldTime > this.holdTime) {
        this.clearPictureFrame();
        this.isHolding = false;
        this.currentY = this.c.y - pictureFrameHeight / 2;
        // this.currentY = 0;
        this.currentHoldTime = 0;
      }
    }
  }

  jump() {
    this.currentY += this.lineHeight;
  }

  clearPictureFrame() {
    noStroke();
    fill(canvasColor);
    rectMode(CENTER, CENTER);
    rect(this.c.x, this.c.y, pictureFrameWidth, pictureFrameHeight);
  }

  drawBorder() {
    noFill();
    stroke(30);
    strokeWeight(frameThickness);
    rectMode(CENTER, CENTER);
    rect(
      this.c.x,
      this.c.y,
      pictureFrameWidth + frameThickness,
      pictureFrameHeight + frameThickness
    );
  }

  paint() {
    this.r = map(
      noise(
        this.currentFrame / this.rSlow,
        (this.currentFrame + this.currentY) / this.gSlow,
        this.currentY / this.rSlow
      ),
      0,
      1,
      0,
      255
    );

    this.g = map(
      noise(
        (this.currentFrame + this.currentY) / this.bSlow,
        this.currentFrame / this.gSlow,
        this.currentY / this.gSlow
      ),
      0,
      1,
      0,
      255
    );

    this.b = map(
      noise(
        this.currentFrame / this.bSlow,
        this.currentY / this.bSlow,
        (this.currentFrame + this.currentY) / this.rSlow
      ),
      0,
      1,
      0,
      255
    );

    rectMode(CORNER);
    noStroke();
    fill(this.r, this.g, this.b);
    rect(
      this.c.x - pictureFrameWidth / 2,
      this.currentY,
      pictureFrameWidth,
      this.lineHeight
    );
  }
}
