function darForma(q) {
  var form = [];
  switch (q) {

    case 0: //linea
      for (var i = 0; i < 4; i++) {
        form.push(new Bloque(i + 3, 0));
      }
      break;


    case 1: //cubo
      for (var i = 0; i < 2; i++) {
        form.push(new Bloque(i + 3, 0));
      }
      for (var j = 0; j < 2; j++) {
        form.push(new Bloque(j + 3, 1));
      }
      break;


    case 2: //L
      for (var i = 0; i < 3; i++) {
        form.push(new Bloque(i + 3, 0));
      }
      form.push(new Bloque(3, 1));
      break;


    case 3: //T
      for (var i = 0; i < 3; i++) {
        form.push(new Bloque(i + 3, 0));
      }
      form.push(new Bloque(i + 2, 1));
      break;


    case 4: //lineas seguidas
      for (var i = 0; i < 2; i++) {
        form.push(new Bloque(i + 3, 0));
      }
      for (var j = 0; j < 2; j++) {
        form.push(new Bloque(j + 4, 1));
      }
      break;
  }
  return form;
}
