class Bloque {
  constructor(tempX, tempY) {
    this.x =tempX;
    this.y=tempY;
    this.r;
    this.u;
  }

  colision() {
    if (grid[this.y + 1][this.x] == 1 || grid[this.y + 1][this.x] == 2) {
      return true;
    }
  }

  move(increx,increy) {
    this.y += increy;
    this.x += increx;
  }


  rotacion(ejex,ejey){
    this.r=(this.y-ejey)+ejex;
    this.u=(-1)*(this.x-ejex)+ejey;
    this.x=this.r;
    this.y=this.u;
  }

  show() {
    rect(this.x * tam, this.y * tam, tam, tam);
  }
}
