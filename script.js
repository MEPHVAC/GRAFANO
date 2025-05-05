const toggleBtn = document.getElementById("toggleValores");
const containers = document.querySelectorAll(".ventilador-container");
let valoresVisibles = false;

// Crear cada ventilador dinámicamente
containers.forEach(container => {
    const id = container.dataset.id;

    container.innerHTML = `
        <img src="media/ventilador.svg" class="ventilador" id="fan${id}">
        <button id="pause${id}">Pausar</button>

        <div class="slider-container">
            Frecuencia: <span id="freqText${id}">30.0</span> Hz
            <input type="range" id="freqSlider${id}" min="30" max="60" step="0.1" value="30">
        </div>

        <div class="valores">
            <p><span class="etiqueta">Potencia:</span> <span class="valor-num" id="pot${id}">25</span><span class="unidades">%</span></p>
            <p><span class="etiqueta">Frecuencia:</span> <span class="valor-num" id="freq${id}">30.0</span><span class="unidades">Hz</span></p>
            <p><span class="etiqueta">Corriente:</span> <span class="valor-num" id="corr${id}">2.40</span><span class="unidades">A</span></p>
            <p><span class="etiqueta">Potencia activa:</span> <span class="valor-num" id="kw${id}">0.30</span><span class="unidades">kW</span></p>
            <p><span class="etiqueta">Energía:</span> <span class="valor-num" id="kwh${id}">0.001</span><span class="unidades">kWh</span></p>
            <p><span class="etiqueta">Horas:</span> <span class="valor-num" id="h${id}">0.00</span><span class="unidades">h</span></p>
        </div>
    `;

    const fan = document.getElementById(`fan${id}`);
    const pauseBtn = document.getElementById(`pause${id}`);
    const slider = document.getElementById(`freqSlider${id}`);
    const freqText = document.getElementById(`freqText${id}`);

    pauseBtn.addEventListener("click", () => {
        const isPaused = fan.style.animationPlayState === "paused";
        fan.style.animationPlayState = isPaused ? "running" : "paused";
        pauseBtn.textContent = isPaused ? "Pausar" : "Reanudar";
    });

    slider.addEventListener("input", () => {
        const freqVisible = parseFloat(slider.value); // 30–60 Hz
        const actualFreq = (freqVisible - 15); // mapea 30–60 a 1–4

        const duracion = (6 / actualFreq).toFixed(2);
        fan.style.animationDuration = `${duracion}s`;

        freqText.textContent = freqVisible.toFixed(1);
        document.getElementById(`freq${id}`).textContent = freqVisible.toFixed(1);

        const potencia = Math.round((freqVisible - 30) / 30 * 100);
        document.getElementById(`pot${id}`).textContent = potencia;

        document.getElementById(`corr${id}`).textContent = (actualFreq).toFixed(2);
        document.getElementById(`kw${id}`).textContent = (actualFreq * 0.15).toFixed(1);
        document.getElementById(`kwh${id}`).textContent = (actualFreq * 0.0005).toFixed(3);
        document.getElementById(`h${id}`).textContent = "0.00";
    });


    // Inicializar valores con valor por defecto
    slider.dispatchEvent(new Event("input"));
});

// Mostrar / Ocultar valores
toggleBtn.addEventListener("click", () => {
    valoresVisibles = !valoresVisibles;
    document.querySelectorAll(".valores").forEach(val => {
        val.style.display = valoresVisibles ? "block" : "none";
    });
    toggleBtn.textContent = valoresVisibles ? "Ocultar" : "Mostrar";
});
