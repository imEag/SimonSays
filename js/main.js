const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const bombillo = document.getElementById('bombillo')
const btnEmpezar = document.getElementById('btnEmpezar')
const ULTIMO_NIVEL = 12

class Juego {
    constructor() {
        this.inicializar()
        this.generarSecuencia()
        setTimeout(this.siguienteNivel, 500)
    }

    inicializar() {
        this.siguienteNivel = this.siguienteNivel.bind(this)
        this.elegirColor = this.elegirColor.bind(this)
        this.toggleBtnEmpezar()
        this.bVerdeRojo()
        this.nivel = 1
        this.colores = {
            celeste,
            violeta,
            naranja,
            verde
        }
    }

    toggleBtnEmpezar() {
        if (btnEmpezar.classList.contains('hide')) {
            btnEmpezar.classList.remove('hide')
        } else {
            btnEmpezar.classList.add('hide')
        }
    }

    generarSecuencia() {
        this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4))
    }

    siguienteNivel() {
        this.subnivel = 0
        this.iluminarSecuencia()
        this.agregarEventosClick()
    }

    numeroColor(numero) {
        switch (numero) {
            case 0:
                return 'celeste'
            case 1:
                return 'violeta'
            case 2:
                return 'naranja'
            case 3:
                return 'verde'
        }
    }

    colorNumero(color) {
        switch (color) {
            case 'celeste':
                return 0
            case 'violeta':
                return 1
            case 'naranja':
                return 2
            case 'verde':
                return 3
        }
    }

    iluminarSecuencia() {
        this.bVerdeRojo()
        for (let i = 0; i < this.nivel; i++) {
            const color = this.numeroColor(this.secuencia[i])
            setTimeout(() => this.iluminarColor(color), this.aumentarFrecuencia(this.nivel) * i)
            if (this.nivel - 1 === i) {
                setTimeout(() => this.bRojoVerde(), this.aumentarFrecuencia(this.nivel) * i + 500)
            }
        }
    }

    iluminarColor(color) {
        this.colores[color].classList.add('light')
        setTimeout(() => this.apagarColor(color), this.disminuirIluminacion(this.nivel))
    }

    bRojoVerde() {
        bombillo.classList.remove('bombilloRojo')
        bombillo.classList.add('bombilloVerde')
    }

    bVerdeRojo() {
        bombillo.classList.remove('bombilloVerde')
        bombillo.classList.add('bombilloRojo')
    }

    aumentarFrecuencia(nivDif) {
        return 1500 - nivDif * 110
    }

    disminuirIluminacion(nivDif) {
        return 500 - nivDif * 40
    }

    apagarColor(color) {
        this.colores[color].classList.remove('light')
    }

    agregarEventosClick() {
        this.colores.celeste.addEventListener('click', this.elegirColor)
        this.colores.verde.addEventListener('click', this.elegirColor)
        this.colores.violeta.addEventListener('click', this.elegirColor)
        this.colores.naranja.addEventListener('click', this.elegirColor)
    }

    eliminarEventosClick() {
        this.colores.celeste.removeEventListener('click', this.elegirColor)
        this.colores.verde.removeEventListener('click', this.elegirColor)
        this.colores.violeta.removeEventListener('click', this.elegirColor)
        this.colores.naranja.removeEventListener('click', this.elegirColor)
    }

    elegirColor(ev) {
        const nombreColor = ev.target.dataset.color
        const numeroAColor = this.colorNumero(nombreColor)
        this.iluminarColor(nombreColor)
        if (numeroAColor === this.secuencia[this.subnivel]) {
            this.subnivel++
            if (this.subnivel === this.nivel) {
                this.nivel++
                this.eliminarEventosClick()
                if (this.nivel === (ULTIMO_NIVEL + 1)) {
                    this.ganoElJuego()
                } else {
                    setTimeout(this.siguienteNivel, 1500)
                }
            }
        } else {
            this.perdioElJuego()
        }
    }

    ganoElJuego() {
        swal('Ganaste', '¡Felicitaciones!', 'success')
            .then(() => {
                this.inicializar()
            })
    }

    perdioElJuego() {
        swal('Perdiste', 'Vuelvelo a intentar', 'error')
            .then(() => {
                this.eliminarEventosClick()
                this.inicializar()
            })
    }
}

function empezarJuego() {
    window.juego = new Juego()
}