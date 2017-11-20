let col = 10;
let row = 16;
let grid = [];
let tam = 40;
var blocks = [];
let bloque;
let prev;
let increx = 0;
let increy = 0;
let coli = true;
let score = 0;




function setup() {
  createCanvas(700, 600);

  for (var i = 0; i < row; i++) { //GRID 2D
    grid.push([]);
    for (var p = 0; p < col; p++) {
      grid[i][p] = 0;
    }
  }
  for (var t = 0; t < col; t++) { //piso lleno de 2
    grid[15][t] = 2;
  }
  frameRate(60);
  //declaracion de el bloque y el preview
  bloque = darForma(floor(random(0, 4)));
  prev = darForma(floor(random(0, 4)));
}



function layout(prev, score) {
  background(51, 51, 51);
  fill(100, 150, 200)
  rect(400, 0, 300, 600);
  fill(200, 200, 200, 100);
  textSize(50);
  text("Score", 450, 70);
  text(str(score), 500, 170);
  rect(450, 100, 200, 100);
  text("Siguiente", 450, 300);
  fill(200, 200, 200, 150);
  rect(430, 330, 240, 240);
  fill(255, 0, 0);
  //posicion y mostrar el preview
  for (var i = 0; i < prev.length; i++) {
    prev[i].x += 9;
    prev[i].y += 10;
    prev[i].show();
    prev[i].x -= 9;
    prev[i].y -= 10;
  }
}


function filallena() {
  let co = 0;
  let i = 14;
  let j = 0;
  let e = 0;
  while (i >= 0) {
    while (j < grid[1].length) { //revisa la fila
      if (grid[i][j] == 1) { //si hay un 1 co++
        co += 1;
      }
      j += 1;
    }
    if (co >= 10) {
      console.log("llena");
      e = i;
      while (e > 0) {
        grid[e] = grid[e - 1];
        e -= 1;
        score += 10;
      }
      co = 0;
    } else {
      i -= 1;
      co = 0;
    }
    j = 0;



  }
  return score

}




let contadores = [0, 0, 0, 0];
//[0]=abajo en y;[1] tecla abajo ; [2]=teclas dere izq ; [3]=rotacion
let left = true;
let right = true;

function draw() {
  layout(prev, score);
  coli = false;
  contadores[0] += 1;
  contadores[1] += 1;
  contadores[2] += 1;
  contadores[3] += 1;
  for (var i = 0; i < bloque.length; i++) {
    if (bloque[i].colision() == true) { //revisa colision
      coli = true;
    }
    //colision bordes a los lados y otros bloques previene mov en x
    if (bloque[i].x <= 0 || grid[bloque[i].y][bloque[i].x - 1] == 1) {
      left = false;
    }
    if (bloque[i].x >= 9 || grid[bloque[i].y][bloque[i].x + 1] == 1) {
      right = false;
    }
  }
  if (contadores[0] > 40) { //timeout de el movimiento hacia abajo
    increy = 1;
    contadores[0] = 0;
  }
  //Presionado de teclas
  if (left == true && keyIsDown(LEFT_ARROW) && contadores[2] > 5) {
    increx -= 1;
    increy = 0;
    contadores[2] = 0;
  }
  left = true;
  if (right == true && keyIsDown(RIGHT_ARROW) && contadores[2] > 5) {
    increx += 1;
    increy = 0;
    contadores[2] = 0;
  }
  right = true;
  //rotacion
  if (keyIsDown(68) && contadores[3] > 15) {
    for (var i = bloque.length - 1; i >= 0; i--) {
      bloque[i].rotacion(bloque[1].x, bloque[1].y);
    }
    console.log("asd");
    contadores[3] = 0;
  }
  //tecla hacia abajo
  if (keyIsDown(DOWN_ARROW) && contadores[1] > 5) {
    increy += 1;
    contadores[1] = 0;
  }



  if (coli == false) { //si no hay colision mueve y muestra
    for (var u = bloque.length - 1; u >= 0; u--) {
      bloque[u].show();
      bloque[u].move(increx, increy);

    }
    increy = 0;
  } else { //si hay cambia el grid de 0 a 1
    for (var u = bloque.length - 1; u >= 0; u--) {
      grid[bloque[u].y][bloque[u].x] = 1;
    }
    bloque = prev
    prev = darForma(floor(random(0, 4))); //reinicia el bloque
  }
  increx = 0;
  filallena();

  //Relleno at grid =1
  for (var i = 0; i < grid.length; i++) {
    for (var j = 0; j < grid[i].length; j++) {
      if (grid[i][j] == 1) {
        rect(j * tam, i * tam, tam, tam);
      }
    }
  }
}
