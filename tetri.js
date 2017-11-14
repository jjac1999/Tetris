let col = 10;
let row = 16;
let grid = [];
let tam = 40;
let state = true;
var blocks = [];
let r = 0;
let e = 0;
let bloque;
let increx = 0;
let coli=true;
let curx=5*tam;
let cury=tam;



function setup() {
  createCanvas(400, 600);
  fill(255, 0, 0);
  for (var i = 0; i < row; i++) { //GRID 2D
    grid.push([]);
    for (var p = 0; p < col; p++) {
      grid[i][p] = 0;
    }
  }

  for (var t = 0; t < col; t++) { //base
    grid[15][t] = 1;
  }
  translate(curx,cury);
  frameRate(10);
  bloque = darForma(floor(random(0,4)));
  //bloque = darForma(0);
}



function draw() {
  background(51, 51, 51);
  coli=true;
  for (var i = bloque.length - 1; i >= 0; i--) {
    if (bloque[i].colision() == true) {//revisa colision
      coli=false;
    }
  }


  if (coli==true) {//si no hay colision mueve y muestra
    for (var u = bloque.length - 1; u >= 0; u--) {
      bloque[u].show();
      bloque[u].move(increx);
    }
  }else{//si hay cambia el grid de 0 a 1
    for (var u = bloque.length - 1; u >= 0; u--) {
      grid[bloque[u].y][bloque[u].x] = 1;
    }
    bloque = darForma(floor(random(0,4)));//reinicia el bloque
    //bloque = darForma(0);
  }
  increx = 0;




  for (var i = 0; i < grid.length; i++) { //Relleno at grid =1
    for (var j = 0; j < grid[i].length; j++) {
      if (grid[i][j] == 1) {
        rect(j * tam, i * tam, tam, tam);
      }
    }
  }
}





function keyPressed() { //Presion de teclas
  let bd=true;
  let bz=true;
  for(var i=0;i<bloque.length;i++){
    if (grid[bloque[i].y][bloque[i].x+1]==1){
      bd=false;
    }if (grid[bloque[i].y][bloque[i].x-1]==1){
      bd=false
    }
  }
  if(bd==true){
      if (keyCode === LEFT_ARROW) {
        increx =-1;
      }
  }
  if (bz==true){
    if (keyCode === RIGHT_ARROW) {
      increx =+1;
    }
  }
if (keyCode===68) {
    for(var i=bloque.length-1;i>=0;i--){
      bloque[i].rotacion(bloque[1].x,bloque[1].y);
    }
  }

}
