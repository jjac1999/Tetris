let col = 10;
let row = 16;
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
  // colo0 = []
  // colo1 = []
  // for (var i = 0; i < 3; i++) {
  //   colo0.push(floor(random(0, 255)))
  //   colo1.push(floor(random(0, 255)))
  // }
  colo0 = floor(random(100, 255));
  colo1 = floor(random(100, 255));
  frameRate(60);
  //declaracion de el bloque y el preview
  bloque = darForma(floor(random(0, 7)), colo0);
  prev = darForma(floor(random(0, 7)), colo1);
}

// function altsetup() {
//   colo0 = floor(random(100, 255));
//   colo1 = floor(random(100, 255));
//   bloque = darForma(floor(random(0, 7)), colo0);
//   prev = darForma(floor(random(0, 7)), colo1);
// }

function layout(prev, score) {
  background(51, 51, 51);
  fill(100, 150, 200)
  rect(400, 0, 300, 600);
  fill(255, 100);
  textSize(50);
  text("Score", 450, 70);
  text(str(score), 500, 170);
  rect(450, 100, 200, 100);
  text("Siguiente", 450, 340);
  fill(255, 150);
  rect(450, 360, 200, 200);
  fill(255, 0, 0);
  //posicion y mostrar el preview
  for (var i = 0; i < prev.length; i++) {
    prev[i].x += 9;
    prev[i].y += 10;
    prev[i].show();
    prev[i].x -= 9;
    prev[i].y -= 10;
  }
  //Relleno at grid ==bloque
  for (var i = 0; i < grid.length; i++) {
    for (var j = 0; j < grid[i].length; j++) {
      if (grid[i][j] != 0 && grid[i][j] != 2) {
        grid[i][j].show();
      }
    }
  }
}


function filallena() {
  let fco = 0;
  let fi = 14;
  let fj = 0;
  let fe = 0;
  while (fi >= 0) {
    while (fj < grid[1].length) { //revisa la fila
      if (grid[fi][fj] !=0 && grid[fi][fj] !=2) { //si hay un 1 co++
        fco += 1;
      }
      fj += 1;
    }
    if (fco >= 10) {
      console.log("llena");
      fe = fi;
      while (fe > 0) {//cambio del grid// lineas que bajan
        grid[fe] = grid[fe - 1];
        bloque[fe][fi].y-=1;
        fe -= 1;
        score += 10;
      }

    } else {
      fi -= 1;
    }
    fco = 0;
    fj = 0;




  }
  return score

}



let contadores = [0, 0, 0, 0];
//[0]=abajo en y;[1] tecla abajo ; [2]=teclas dere izq ; [3]=rotacion
let left = true;
let right = true;
let permrot = 0;
let permcrear = true;
let abaleft = true;

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
    if (bloque[i].x <= 0 || grid[bloque[i].y][bloque[i].x - 1] != 0) {
      left = false;
      permrot += 1;
    }
    if (bloque[i].x >= 9 || grid[bloque[i].y][bloque[i].x + 1] != 0) {
      right = false;
      permrot += 1;
    }
    if(bloque[i].y-1 <0){
      permrot += 1;
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
    abaleft = false;
  }
  left = true;
  if (right == true && keyIsDown(RIGHT_ARROW) && contadores[2] > 5) {
    increx += 1;
    increy = 0;
    contadores[2] = 0;
    abaleft = false;
  }
  right = true;
  //rotacion
  if (keyIsDown(68) && contadores[3] > 15 && permrot < 2) {
    for (var i = bloque.length - 1; i >= 0; i--) {
      bloque[i].rotacion(bloque[1].x, bloque[1].y);
    }
    contadores[3] = 0;
  }
  permrot = 0;
  //tecla hacia abajo
  if (keyIsDown(DOWN_ARROW) && contadores[1] > 10 && abaleft == true) {
    increy += 1;
    contadores[1] = 0;
  }
  abaleft = true;



  if (coli == false) { //si no hay colision mueve y muestra
    for (var u = bloque.length - 1; u >= 0; u--) {
      bloque[u].show();
      bloque[u].move(increx, increy);

    }
    increy = 0;
  } else { //si hay cambia el grid de 0 a 1
    for (var u = bloque.length - 1; u >= 0; u--) {
      grid[bloque[u].y][bloque[u].x] = new estatico(bloque[u].x, bloque[u].y, bloque[u].color);
    }
    if (permcrear == true) { //deja de crear bloque cuando gameover
      //se declara otra vez el color
      colo0 = colo1;
      colo1 = floor(random(100, 255));
      // for (var qw = 0; qw < colo1.length; qw++) {
      //   colo1[qw] = floor(random(100, 255));
      // }
      bloque = prev;
      prev = darForma(floor(random(0, 4)), colo1); //reinicia el bloque
    }
  }



  for (var i = 0; i < bloque.length; i++) {
    if (grid[bloque[i].y][bloque[i].x] != 0) {
      if (keyIsPressed === false) { //si gameover, hasta presiona tecla
        textSize(50)
        text("GAME OVER", 400, 250);
        textSize(18);
        text("Presiona una tecla para continuar", 415, 300);
        console.log("game o");
        permcrear = false;
      } else { // se llama todo otra vez
        setup();
        draw();
        permcrear = true;
      }

    }
  }
  increx = 0;
  filallena();

}
