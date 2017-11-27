class Bloque {
  constructor(tempX, tempY, tempcol) {
    this.x = tempX;
    this.y = tempY;
    this.color = tempcol;
    this.r;
    this.u;
  }

  colision() {
    if (this.y > 13 || grid[this.y + 1][this.x] != 0) {
      return true;
    }
  }

  move(increx, increy) {
    this.y += increy;
    this.x += increx;
  }


  rotacion(ejex, ejey) {
    this.r = (this.y - ejey) + ejex;
    this.u = (-1) * (this.x - ejex) + ejey;
    this.x = this.r;
    this.y = this.u;
  }

  show() {;
    //fill(this.color[0],this.color[1],this.color[2]);
    fill(this.color);
    rect(this.x * tam, this.y * tam, tam, tam);
  }
}
