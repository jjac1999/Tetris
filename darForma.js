function darForma(q, col) {
  var form = [];
  switch (q) {

    case 0: //linea
      for (var i = 0; i < 4; i++) {
        form.push(new Bloque(4, i, col));
      }
      break;


    case 1: //cubo
      for (var i = 0; i < 2; i++) {
        form.push(new Bloque(i + 3, 0, col));
      }
      for (var j = 0; j < 2; j++) {
        form.push(new Bloque(j + 3, 1, col));
      }
      break;


    case 2: //L
      for (var i = 0; i < 3; i++) {
        form.push(new Bloque(i + 3, 0, col));
      }
      form.push(new Bloque(3, 1, col));
      break;

    case 3: //L invertida
      for (var i = 0; i < 3; i++) {
        form.push(new Bloque(i + 3, 0, col));
      }
      form.push(new Bloque(i + 2, 1, col));
      break;

    case 4: //T
      for (var i = 0; i < 3; i++) {
        form.push(new Bloque(i + 3, 0, col));
      }
      form.push(new Bloque(i + 2, 1, col));
      break;


    case 5: //lineas seguidas
      for (var i = 1; i >=0; i--) {
        form.push(new Bloque(i + 3, 0, col));
      }
      for (var j = 0; j < 2; j++) {
        form.push(new Bloque(j + 4, 1, col));
      }
      break;

    case 6: //lineas seguidas
      for (var i = 1; i >=0; i--) {
        form.push(new Bloque(i + 4, 0, col));
      }
      for (var j = 0; j < 2; j++) {
        form.push(new Bloque(j + 3, 1, col));
      }
      break;
  }
  return form;
  console.log("cuando sale de darforma",form);
}
