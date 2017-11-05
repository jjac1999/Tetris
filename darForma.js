function darForma(q) {
  var form = [];
  switch (q) {

    case 0://linea
      for (var i = 0; i < 4; i++) {
        form.push(new Bloque(3+i, 0));
      }
      break;


    case 1://cubo
      for (var i=0;i<2;i++){
        form.push(new Bloque(3+i,0));
      }
      for (var j=0;j<2;j++){
        form.push(new Bloque(3+j,1));
      }
      break;


    case 2://L
    for (var i=0;i<3;i++){
      form.push(new Bloque(3+i,0));
    }
    form.push(new Bloque(2+i,1));
    break;


    case 3://T
    for (var i=0;i<3;i++){
      form.push(new Bloque(3+i,0));
    }
    form.push(new Bloque(1+i,1));
    break;


    case 4://lineas seguidas
    for (var i=0;i<2;i++){
      form.push(new Bloque(3+i,0));
    }
    for (var j=1;j<3;j++){
      form.push(new Bloque(3+j,1));
    }
    break;
  }
  return form;
}
