import {Comunicacion} from "./modules/comunicacion.js";
console.log('funciono');
// Esta variable la estraeremos en otra clase
let ui = {
    listo : () => {
      document.getElementById('estado').innerHTML = 'Conectado';
    },
    empieza : () => {
        document.getElementById('botonEmpezar').style.display = 'block';
        document.getElementById('botonEmpezar').onclick = function() {
          Comunicacion.comenzar();
        }
    },
    prepararJuego : () => {
      document.getElementById('botonEmpezar').style.display = 'none';
      document.getElementById('juego').style.display = 'block';
      document.getElementById('enviar').onclick = () => {
        Comunicacion.enviarNumero(document.getElementById('numero').value);
      };
    }
}
document.getElementById('estado').innerHTML = 'Esperando...';
let comunicacion = new Comunicacion('localhost',8080,ui);

  