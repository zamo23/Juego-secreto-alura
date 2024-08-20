// Variables globales
let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
const numeroMaximo = 10;

// Asigna texto a un elemento en el DOM
function asignarTextoElemento(selector, texto) {
    document.querySelector(selector).textContent = texto;
}

// Verifica el intento del usuario
function verificarIntento() {
    const numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value, 10);

    if (isNaN(numeroDeUsuario) || numeroDeUsuario < 1 || numeroDeUsuario > numeroMaximo) {
        asignarTextoElemento('p', `Por favor, ingresa un número válido entre 1 y ${numeroMaximo}.`);
        return;
    }

    intentos++;

    if (numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento('p', `¡Acertaste el número en ${intentos} ${intentos === 1 ? 'intento' : 'intentos'}!`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        const mensaje = numeroDeUsuario > numeroSecreto ? 'El número secreto es menor' : 'El número secreto es mayor';
        asignarTextoElemento('p', mensaje);
        limpiarCaja();
    }
}

// Limpia la caja de entrada del usuario
function limpiarCaja() {
    document.getElementById('valorUsuario').value = '';
}

// Genera un número secreto único
function generarNumeroSecreto() {
    if (listaNumerosSorteados.length >= numeroMaximo) {
        asignarTextoElemento('p', 'Ya se han sorteado todos los números posibles.');
        return null;
    }

    let numeroGenerado;
    do {
        numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;
    } while (listaNumerosSorteados.includes(numeroGenerado));

    listaNumerosSorteados.push(numeroGenerado);
    return numeroGenerado;
}

// Establece las condiciones iniciales del juego
function condicionesIniciales() {
    asignarTextoElemento('h1', '¡Juego del número secreto!');
    asignarTextoElemento('p', `Indica un número del 1 al ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 0;
    listaNumerosSorteados = [];
    document.getElementById('reiniciar').setAttribute('disabled', 'true');
    limpiarCaja();
}

// Inicializa el juego
condicionesIniciales();
