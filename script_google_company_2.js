const { response } = require("express");

async function seekingForm() { // Former submitEvaluation
    const q1 = document.getElementById("q1").value.trim();
    const q2 = document.getElementById("q2").value.trim();
    const q3 = document.getElementById("q3").value.trim();
    const q4 = document.getElementById("q4").value.trim();
    const q5 = document.getElementById("q5").value.trim();
    const q6 = document.getElementById("q6").value.trim();
    const q7 = document.getElementById("q7").value.trim();
    const q8 = document.getElementById("q8").value.trim();
    const q9 = document.getElementById("q9").value.trim();
    const q10 = document.getElementById("q10").value.trim();
    const q11 = document.getElementById("q11").value.trim();
    const q12 = document.getElementById("q12").value.trim();
    const q13 = document.getElementById("q13").value.trim();
    const q14 = document.getElementById("q14").value.trim();
    const q15 = document.getElementById("q15").value.trim();
    const q16 = document.getElementById("q16").value.trim();
    const q17 = document.getElementById("q17").value.trim();
    const q18 = document.getElementById("q18").value.trim();
    const q19 = document.getElementById("q19").value.trim();
    const q20 = document.getElementById("q20").value.trim();
    const q21 = document.getElementById("q21").value.trim();
    const q22 = document.getElementById("q22").value.trim();
    const q23 = document.getElementById("q23").value.trim();
    const q24 = document.getElementById("q24").value.trim();
    const q25 = document.getElementById("q25").value.trim();
    const q26 = document.getElementById("q26").value.trim();
    const q27 = document.getElementById("q27").value.trim();
    const q28 = document.getElementById("q28").value.trim();
    const q29 = document.getElementById("q29").value.trim();
    const q30 = document.getElementById("q30").value.trim();
    const q31 = document.getElementById("q31").value.trim();
    

    const questions = Array.from({ length: 31 }, (_, i) => `q${i + 1}`);
    const responses = questions.map(q => document.getElementById(q).value.trim());
    
    const responseBox = document.getElementById("response");
    responseBox.innerHTML = "Processing..."; // Show loading state

    if (responses.some(res => !res)) {
    responseBox.innerHTML = "⚠ Por favor, completa todos los campos.";
    return; 
    }

    const userMessage = `
    Requerimientos de la empresa para la búsqueda de talento:

    Nombre de la posición: ${responses[0]}
    A qué departamento o área pertenece: ${responses[1]}
    Nivel jerárquico: ${responses[2]}
    Cargo del superior inmediato: ${responses[3]}
    Cuántos homólogos tiene: ${responses[4]}
    Número de puestos en el departamento o área: ${responses[5]}
    Impacto de este cargo dentro del equipo o la empresa: ${responses[6]}
    Propósito principal del rol dentro de la empresa: ${responses[7]}
    Responsabilidades clave del puesto: ${responses[8]}
    Indicadores para medir sus metas: ${responses[9]}
    Herramientas o Software que debe manejar: ${responses[10]}
    Disponibilidad para viajar o trabajar en horarios especiales: ${responses[11]}
    Desafíos comunes que enfrenta este puesto: ${responses[12]}
    Género recomendado para el cargo: ${responses[13]}
    Rango de edad deseado: ${responses[14]}
    Deseable si vive en alguna ciudad o municipio en específico: ${responses[15]}
    Nivel de educación mínima requerida: ${responses[16]}
    Experiencia requerida y en qué empresas o funciones: ${responses[17]}
    Competencias técnicas y habilidades blandas necesarias: ${responses[18]}
    Certificaciones necesarias: ${responses[19]}
    Competencias diferenciadoras que serían un plus para este rol: ${responses[20]}
    Rango de salario ofrecido: ${responses[21]}
    Contrato fijo, temporal o por proyecto: ${responses[22]}
    Beneficios tales como seguro, bonos, capacitación, entre otros: ${responses[23]}
    Fecha estimada de incorporación: ${responses[24]}
    Inducción que recibirá el empleado: ${responses[25]}
    Posibilidad de crecimiento dentro de la empresa para ese rol: ${responses[26]}
    Prueba de habilidades será requerida: ${responses[27]}
    Prueba psicológica será requerida: ${responses[28]}
    Fecha límite para recibir postulaciones: ${responses[29]}
    Criterios clave para tomar la decisión final de contratación: ${responses[30]}
    
    Por favor analiza estos criterios de búsqueda de talento por parte del empleador,
    crea una reporte con la lista de requerimientos del empleador, con una breve recomendación 
    para cada requerimiento. 
    Al final del reporte incluye un analisis del rol vacante y recomendaciones generales para el empleador.

    Por favor responde en el mismo idioma empleado en el input por el empleador.
    `;

    const backendURL = "https://us-central1-rasa-agent-3-badg.cloudfunctions.net/evaluate_google";

    try {
        const response = await fetch(backendURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userMessage })
        });

        const gptReply = await response.json();
        console.log("Full response from backend:", gptReply);
        responseBox.innerHTML = `<strong>AI Analysis:</strong><br>
<div style="white-space: pre-wrap; font-family: Arial, sans-serif; line-height: 1.6; padding: 12px; border-radius: 8px; background: #f8f9fa; border: 1px solid #ddd;">
${gptReply.googleAiResponse || "No valid response received."}
</div>`;
    } catch (error) {
        console.error("❌ API Call Failed:", error);
        responseBox.innerHTML = "Error processing your request.";
    }
}
