// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.



/*Crear una applicaacion que permita que el usuario ingresar nombre de sus amigos y luego realizar un sorteo aleatorio 
para deteminar quien es el amigo secreto

*/

// Arreglo para almacenar los nombres de los amigos
let amigos = [];
let sorteoRealizado = false;
let asignaciones = {};

// Función para agregar un amigo a la lista
function agregarAmigo() {
    const inputAmigo = document.getElementById('amigo');
    const listaAmigos = document.getElementById('listaAmigos');
    const nombreAmigo = inputAmigo.value.trim();

    // Validar entrada
    if (nombreAmigo === '') {
        alert('Por favor, ingrese un nombre');
        return;
    }

    // Verificar si el nombre ya existe
    if (amigos.includes(nombreAmigo)) {
        alert('Este amigo ya está en la lista');
        inputAmigo.value = '';
        return;
    }

    // Agregar amigo al arreglo y mostrar en la lista
    amigos.push(nombreAmigo);
    
    // Crear elemento de lista con botón de eliminar
    const li = document.createElement('li');
    li.textContent = nombreAmigo;
    
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '✖';
    deleteButton.style.marginLeft = '10px';
    deleteButton.onclick = () => {
        amigos = amigos.filter(amigo => amigo !== nombreAmigo);
        listaAmigos.removeChild(li);
        document.getElementById('resultado').innerHTML = '';
        sorteoRealizado = false;
        asignaciones = {};
    };
    
    li.appendChild(deleteButton);
    listaAmigos.appendChild(li);
    
    // Limpiar el campo de entrada
    inputAmigo.value = '';
}

// Función para mezclar el arreglo aleatoriamente
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Función para sortear amigos secretos
function sortearAmigo() {
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = '';

    // Validar número mínimo de amigos
    if (amigos.length < 3) {
        alert('Debe haber al menos 3 amigos para realizar el sorteo');
        return;
    }

    // Si el sorteo no se ha realizado aún, crear las asignaciones
    if (!sorteoRealizado) {
        let amigosSorteados = [...amigos];
        let valid = false;
        
        // Seguir mezclando hasta que nadie se quede con su propio nombre
        while (!valid) {
            shuffle(amigosSorteados);
            valid = true;
            
            for (let i = 0; i < amigos.length; i++) {
                if (amigos[i] === amigosSorteados[i]) {
                    valid = false;
                    break;
                }
            }
        }

        // Crear objeto de asignaciones
        for (let i = 0; i < amigos.length; i++) {
            asignaciones[amigos[i]] = amigosSorteados[i];
        }
        
        sorteoRealizado = true;
    }

    // Obtener una persona aleatoria que no haya sido mostrada aún
    const personasPendientes = Object.keys(asignaciones);
    if (personasPendientes.length > 0) {
        const randomIndex = Math.floor(Math.random() * personasPendientes.length);
        const persona = personasPendientes[randomIndex];
        const amigoSecreto = asignaciones[persona];
        
        // Mostrar el resultado
        const li = document.createElement('li');
        li.textContent = `${persona} → ${amigoSecreto}`;
        resultado.appendChild(li);
        
        // Eliminar esta asignación de las pendientes
        delete asignaciones[persona];
    } else {
        // Reiniciar cuando todas las asignaciones han sido mostradas
        sorteoRealizado = false;
        asignaciones = {};
        alert('Ya se mostraron todas las asignaciones. Presione nuevamente para realizar un nuevo sorteo.');
    }
}

// Agregar evento para la tecla Enter en el campo de entrada
document.getElementById('amigo').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        agregarAmigo();
    }
});