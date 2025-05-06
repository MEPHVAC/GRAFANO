const FRECUENCIA_MIN = 30;
const FRECUENCIA_MAX = 60;

const toggleBtn = document.getElementById("toggleValores");
const containers = document.querySelectorAll(".ventilador-container");

let valoresVisibles = false;

// Genera el contenido HTML de cada ventilador
function crearVentilador(container) {
    const id = container.dataset.id;

    container.innerHTML = `
        <img src="media/ventilador.svg" class="ventilador" data-id="${id}">
        <button class="btn-pausa" data-id="${id}">Pausar</button>

        <div class="slider-container">
            Frecuencia: <span class="freq-text" data-id="${id}">${FRECUENCIA_MIN.toFixed(1)}</span> Hz
            <input type="range" 
                   class="freq-slider" 
                   data-id="${id}" 
                   min="${FRECUENCIA_MIN}" 
                   max="${FRECUENCIA_MAX}" 
                   step="0.1" 
                   value="${FRECUENCIA_MIN}">
        </div>

        <div class="valores">
            <p><span class="etiqueta">Potencia:</span> <span class="valor-num pot"></span><span class="unidades">%</span></p>
            <p><span class="etiqueta">Frecuencia:</span> <span class="valor-num freq"></span><span class="unidades">Hz</span></p>
            <p><span class="etiqueta">Corriente:</span> <span class="valor-num corr"></span><span class="unidades">A</span></p>
            <p><span class="etiqueta">Potencia activa:</span> <span class="valor-num kw"></span><span class="unidades">kW</span></p>
            <p><span class="etiqueta">Energía:</span> <span class="valor-num kwh"></span><span class="unidades">kWh</span></p>
            <p><span class="etiqueta">Horas:</span> <span class="valor-num h">0.00</span><span class="unidades">h</span></p>
        </div>
    `;
}

// Maneja la pausa/reanudación de animación
function toggleAnimacion(fan, button) {
    const isPaused = fan.style.animationPlayState === "paused";
    fan.style.animationPlayState = isPaused ? "running" : "paused";
    button.textContent = isPaused ? "Pausar" : "Reanudar";
}

// Actualiza los valores al mover el slider
function actualizarValores(container, frecuencia) {
    const fan = container.querySelector(".ventilador");
    const freqText = container.querySelector(".freq-text");
    const valores = container.querySelector(".valores");

    const actualFreq = frecuencia - 15;
    const duracion = (6 / actualFreq).toFixed(2);
    fan.style.animationDuration = `${duracion}s`;

    // Mostrar valores
    freqText.textContent = frecuencia.toFixed(1);
    valores.querySelector(".freq").textContent = frecuencia.toFixed(1);
    valores.querySelector(".pot").textContent = Math.round((frecuencia - FRECUENCIA_MIN) / (FRECUENCIA_MAX - FRECUENCIA_MIN) * 100);
    valores.querySelector(".corr").textContent = actualFreq.toFixed(2);
    valores.querySelector(".kw").textContent = (actualFreq * 0.15).toFixed(1);
    valores.querySelector(".kwh").textContent = (actualFreq * 0.0005).toFixed(3);
}

// Inicializa cada ventilador
containers.forEach(container => {
    crearVentilador(container);

    const id = container.dataset.id;
    const fan = container.querySelector(".ventilador");
    const pauseBtn = container.querySelector(".btn-pausa");
    const slider = container.querySelector(".freq-slider");

    pauseBtn.addEventListener("click", () => toggleAnimacion(fan, pauseBtn));
    slider.addEventListener("input", () => actualizarValores(container, parseFloat(slider.value)));

    // Inicializa valores al cargar
    slider.dispatchEvent(new Event("input"));
});

// Mostrar / ocultar valores con classList.toggle()
toggleBtn.addEventListener("click", () => {
    valoresVisibles = !valoresVisibles;
    document.querySelectorAll(".valores").forEach(val => {
        val.classList.toggle("visible", valoresVisibles);
    });
    toggleBtn.textContent = valoresVisibles ? "Ocultar" : "Mostrar";
});
