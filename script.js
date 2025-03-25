document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('miCanvas');
    const ctx = canvas.getContext('2d');
    const puntuacionElement = document.getElementById('puntuacion');
    let puntuacion = 0;

    // Cargar recursos
    const fondoAudio = new Audio('assets/audio/bu.mp3');
    const hitSound = new Audio("assets/audio/hit.mp3");
    fondoAudio.loop = true;
    fondoAudio.volume = 0.5;
    fondoAudio.play();

    const imagenAsteroide = new Image();
    imagenAsteroide.src = 'assets/images/fantasma.png';

    const imagenFondoCanvas = new Image();
    imagenFondoCanvas.src = 'assets/images/fondo.jpg';

    

    
    

    

    const elementos = [];
    const numElementosIniciales = 5;

    class Elemento {
        constructor(x, y, velocidadX, velocidadY, imagen) {
            this.x = x;
            this.y = y;
            this.velocidadX = velocidadX;
            this.velocidadY = velocidadY;
            this.imagen = imagen;
            this.ancho = imagen.width;
            this.alto = imagen.height;
        }

        dibujar() {
            ctx.drawImage(this.imagen, this.x, this.y);
        }

        actualizar() {
            this.x += this.velocidadX;
            this.y += this.velocidadY;

            if (this.x + this.ancho < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = -this.ancho;
            if (this.y + this.alto < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = -this.alto;
        }

        colision(mouseX, mouseY) {
            return mouseX >= this.x && mouseX <= this.x + this.ancho &&
                   mouseY >= this.y && mouseY <= this.y + this.alto;
        }
    }

    function crearElementoAleatorio() {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const velocidadX = (Math.random() - 0.5) * 2;
        const velocidadY = (Math.random() - 0.5) * 2;
        return new Elemento(x, y, velocidadX, velocidadY, imagenAsteroide);
    }

    for (let i = 0; i < numElementosIniciales; i++) {
        elementos.push(crearElementoAleatorio());
    }

    canvas.addEventListener('click', (event) => {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        for (let i = elementos.length - 1; i >= 0; i--) {
            if (elementos[i].colision(mouseX, mouseY)) {
                elementos.splice(i, 1);
                puntuacion++;
                puntuacionElement.textContent = puntuacion;
                elementos.push(crearElementoAleatorio());
                hitSound.play();
                break;
                
            }
        }
    });

    function dibujarFondo() {
        ctx.drawImage(imagenFondoCanvas, 0, 0, canvas.width, canvas.height);
    }

    function animar() {
        dibujarFondo();
        elementos.forEach(elemento => {
            elemento.actualizar();
            elemento.dibujar();
        });
        requestAnimationFrame(animar);
    }

    imagenAsteroide.onload = () => {
        imagenFondoCanvas.onload = () => {
            animar();
        };
    };

    const styleSheet = document.createElement("style");
styleSheet.innerHTML = "body {cursor: url('assets/images/a1.png'), auto;}";
document.head.appendChild(styleSheet);
});