var movimientos = [];

/* Creé este grupo de variables para poder modificar
   las propiedades del juego de manera más sencilla */
var vecesAmezclar = 60;
var limiteDeMovimientos = 50;
var movimientosRealizados = 0;
var movimientosSobrantes = 0;

var instrucciones = [
    "Utiliza las flechas del teclado para mover las piezas.",
    "Debes resolverlo en menos de " + limiteDeMovimientos + " movimientos."
];

var grilla = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

var grillaGanadora = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

var filaVacia = 2;
var columnaVacia = 2;

function mostrarInstrucciones(arreglo) {
    for (var i = 0; i < arreglo.length; i++){
      mostrarInstruccionEnLista(arreglo[i], "lista-instrucciones");
    }
}

function almacenarMovimientos(direccionDeFlecha){
    actualizarUltimoMovimiento(direccionDeFlecha);
    movimientos.push(direccionDeFlecha);
}

function chequearSiGano() {
    for (var i = 0; i < grilla.length; i++) {
      for (var j = 0; j < grilla[i].length; j++) {
        if (grilla[i][j] !== grillaGanadora[i][j]) return false;
        }
    } return true;
}

function intercambiarPosicionesGrilla(filaPos1, columnaPos1, filaPos2, columnaPos2) {
    var piezaAnterior = grilla[filaPos1][columnaPos1];
    var piezaNueva = grilla[filaPos2][columnaPos2];
    grilla[filaPos2][columnaPos2] = piezaAnterior;
    grilla[filaPos1][columnaPos1] = piezaNueva;
}

function posicionValida(fila, columna){
	  if ((fila>2||fila<0)||(columna>2||columna<0)){
	    return false;
  } else { return true; }
}

function actualizarPosicionVacia(nuevaFila, nuevaColumna) {
    filaVacia = nuevaFila;
    columnaVacia = nuevaColumna;
}

function contadorDeMovimientos(){
    var mostrar = document.getElementById("contador");
    movimientosRealizados += 1;
    mostrar.textContent = "Movimientos realizados: " + movimientosRealizados;
    movimientosSobrantes = limiteDeMovimientos - movimientosRealizados
}

function mostrarCartelGanador() {
     swal({
        title: "Has ganado!",
        text: "Y te han sobrado " + movimientosSobrantes + " movimientos! :D",
        icon: "success",
        buttons: ["Tengo que ir a ver si llueve", "Jugar denuevo"],
        dangerMode: false,
        })
    .then((confirmacion) => {
        if (confirmacion) {
          swal("Intenta superar tu record y gana en menos de " + movimientosRealizados + " movimientos. ;)", {
          icon: "success",
        });
          mezclarPiezas(vecesAmezclar);
          movimientosRealizados = 0;
          var contador = document.getElementById("contador");
          contador.textContent = "Movimientos realizados: " + movimientosRealizados;
      } else {
          swal("No te olvides del paraguas!");
      }
  });
}

function chequearLimiteDeMovimientos(){
  if (movimientosRealizados == limiteDeMovimientos){
     swal({
        title: "Lo sentimos, has perdido :( ",
        text: "No has podido resolver el rompecabezas en menos de " + limiteDeMovimientos +
              " movimientos pero no te preocupes, puedes seguir intentando las veces que desees.",
        icon: "warning",
        buttons: ["Me vale madre", "Segir intentando!"],
        dangerMode: false,
        })
    .then((confirmacion) => {
        if (confirmacion) {
          swal("A darle átomos!", {
          icon: "success",
        });
          mezclarPiezas(vecesAmezclar);
          movimientosRealizados = 0;
          var contador = document.getElementById("contador");
          contador.textContent = "Movimientos realizados: " + movimientosRealizados;
      } else {
          swal("Bueno, nos vemos al rato.");
      }
    });
  }
}

//Esta función es la que se dedica mover las piezas sólo capturando los movimientos del usuario.
function moverEnDireccion(direccion) {
  var nuevaFilaPiezaVacia;
  var nuevaColumnaPiezaVacia;

  if (direccion === codigosDireccion.ABAJO) {
    nuevaFilaPiezaVacia = filaVacia - 1;
    nuevaColumnaPiezaVacia = columnaVacia;
  }

  else if (direccion === codigosDireccion.ARRIBA) {
    nuevaFilaPiezaVacia = filaVacia + 1;
    nuevaColumnaPiezaVacia = columnaVacia;
  }

  else if (direccion === codigosDireccion.DERECHA) {
    nuevaFilaPiezaVacia = filaVacia;
    nuevaColumnaPiezaVacia = columnaVacia - 1;
  }

  else if (direccion === codigosDireccion.IZQUIERDA) {
    nuevaFilaPiezaVacia = filaVacia;
    nuevaColumnaPiezaVacia = columnaVacia + 1;
  }

  if (posicionValida(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia)) {
    intercambiarPosiciones(filaVacia, columnaVacia, nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
    actualizarPosicionVacia(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
    almacenarMovimientos(direccion);
    contadorDeMovimientos();
    chequearLimiteDeMovimientos();
    }
}

//Esta función sólo se ejecuta al mezclar las piezas.
function mezcladorDePiezas(direccion) {
  var nuevaFilaPiezaVacia;
  var nuevaColumnaPiezaVacia;

  if (direccion === codigosDireccion.ABAJO) {
    nuevaFilaPiezaVacia = filaVacia - 1;
    nuevaColumnaPiezaVacia = columnaVacia;
  }

  else if (direccion === codigosDireccion.ARRIBA) {
    nuevaFilaPiezaVacia = filaVacia + 1;
    nuevaColumnaPiezaVacia = columnaVacia;
  }

  else if (direccion === codigosDireccion.DERECHA) {
    nuevaFilaPiezaVacia = filaVacia;
    nuevaColumnaPiezaVacia = columnaVacia - 1;
  }

  else if (direccion === codigosDireccion.IZQUIERDA) {
    nuevaFilaPiezaVacia = filaVacia;
    nuevaColumnaPiezaVacia = columnaVacia + 1;
  }

  if (posicionValida(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia)) {
    intercambiarPosiciones(filaVacia, columnaVacia, nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
    actualizarPosicionVacia(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
  }
}

var codigosDireccion = {
    IZQUIERDA: 37,
    ARRIBA: 38,
    DERECHA: 39,
    ABAJO: 40
}

function intercambiarPosiciones(fila1, columna1, fila2, columna2) {
  var pieza1 = grilla[fila1][columna1];
  var pieza2 = grilla[fila2][columna2];

  intercambiarPosicionesGrilla(fila1, columna1, fila2, columna2);
  intercambiarPosicionesDOM('pieza' + pieza1, 'pieza' + pieza2);
}

function intercambiarPosicionesDOM(idPieza1, idPieza2) {
  var elementoPieza1 = document.getElementById(idPieza1);
  var elementoPieza2 = document.getElementById(idPieza2);

  var padre = elementoPieza1.parentNode;

  var clonElemento1 = elementoPieza1.cloneNode(true);
  var clonElemento2 = elementoPieza2.cloneNode(true);

  padre.replaceChild(clonElemento1, elementoPieza2);
  padre.replaceChild(clonElemento2, elementoPieza1);
}

function actualizarUltimoMovimiento(direccion) {
  ultimoMov = document.getElementById('flecha');
  switch (direccion) {
    case codigosDireccion.ARRIBA:
      ultimoMov.textContent = '↑';
      break;
    case codigosDireccion.ABAJO:
      ultimoMov.textContent = '↓';
      break;
    case codigosDireccion.DERECHA:
      ultimoMov.textContent = '→';
      break;
    case codigosDireccion.IZQUIERDA:
      ultimoMov.textContent = '←';
      break;
  }
}

function mostrarInstruccionEnLista(instruccion, idLista) {
  var ul = document.getElementById(idLista);
  var li = document.createElement("li");
  li.textContent = instruccion;
  ul.appendChild(li);
}

function mezclarPiezas(veces) {
  if (veces <= 0) {
    return;
  }

  var direcciones = [codigosDireccion.ABAJO, codigosDireccion.ARRIBA,
      codigosDireccion.DERECHA, codigosDireccion.IZQUIERDA
    ];

  var direccion = direcciones[Math.floor(Math.random() * direcciones.length)];
  mezcladorDePiezas(direccion);

  setTimeout(function() {
      mezclarPiezas(veces - 1);
    }, 100);
}

function capturarTeclas() {
  document.body.onkeydown = (function(evento) {
    if (evento.which === codigosDireccion.ABAJO ||
      evento.which === codigosDireccion.ARRIBA ||
      evento.which === codigosDireccion.DERECHA ||
      evento.which === codigosDireccion.IZQUIERDA) {

      moverEnDireccion(evento.which);


        var gano = chequearSiGano();
        if (gano) {
          setTimeout(function() {
              mostrarCartelGanador();
              }, 500);
            }
            evento.preventDefault();
        }
    })
}

function iniciar() {
    mostrarInstrucciones(instrucciones);
    mezclarPiezas(vecesAmezclar);
    capturarTeclas();
}

iniciar();
