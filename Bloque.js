class Bloque {
  constructor(tempX, tempY) {
    this.x = tempX;
    this.y = tempY;
    this.state = true;
    this.f = floor(random(0, 1));
  }

  colision() {
    if (grid[this.y + 1][this.x] == 1) {
      //this.state = false;
      //blocks.push(darForma(0));
      //grid[this.y][this.x] = 1;
      return true;
    }
  }

  move(increx) {
    this.y += 1;
    this.x += increx;

  }

  show() {
    rect(this.x * tam, this.y * tam, tam, tam);
  }
}
