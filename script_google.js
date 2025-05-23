async function submitEvaluation() {
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

    const questions = Array.from({ length: 24 }, (_, i) => `q${i + 1}`);
    const responses = questions.map(q => document.getElementById(q).value.trim());
    
    const responseBox = document.getElementById("response");
    responseBox.innerHTML = "Processing..."; // Show loading state

    if (responses.some(res => !res)) {
    responseBox.innerHTML = "⚠ Por favor, completa todos los campos.";
    return; 
    }

    const userMessage = `
    Candidate Details:
    Datos personales y sociodemográficos: ${responses[0]}
    Contexto personal: ${responses[1]}
    Educación formal e informal: ${responses[2]}
    Experiencia laboral: ${responses[3]}
    Habilidades y competencias:  ${responses[4]}
    Disposición y expectativas laborales:  ${responses[5]}
    Disponibilidad y flexibilidad:  ${responses[6]}
    Sueños y aspiraciones profesionales:  ${responses[7]}
    Factores de decisión:  ${responses[8]}
    Evolución profesional:  ${responses[9]}
    Adaptabilidad y toma de decisiones:  ${responses[10]}
    Gestión de desafíos:  ${responses[11]}
    Trabajo en equipo: ${responses[12]}
    Resolución de conflictos: ${responses[13]}
    Toma de decisiones bajo presión: ${responses[14]}
    Gestión de crisis: ${responses[15]}
    Liderazgo en momentos difíciles: ${responses[16]}
    Innovación y resolución de problemas: ${responses[17]}
    Conflictos interpersonales: ${responses[18]}
    Adaptabilidad al cambio: ${responses[19]}
    Negociación y persuasión: ${responses[20]}
    Gestión del tiempo y prioridades: ${responses[21]}
    Aprendizaje de errores: ${responses[22]}
    Trabajo en equipo en situaciones críticas: ${responses[23]}

    Please analyze this information and provide a structured candidate evaluation.
    Provide a report in the same language used by the candidate.
    `;

    const backendURL = "https://us-central1-rasa-agent-3-badg.cloudfunctions.net/evaluate_google";
    console.log("url for evaluate_google function built", backendURL);
    try {
        const response = await fetch(backendURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userMessage })
        });

        const gptReply = await response.json();
        console.log("🔹 Google AI Studio Response:", gptReply);
        responseBox.innerHTML = `<strong>AI Analysis:</strong><br>
<div style="white-space: pre-wrap; font-family: Arial, sans-serif; line-height: 1.6; padding: 12px; border-radius: 8px; background: #f8f9fa; border: 1px solid #ddd;">
${gptReply.googleAiResponse || "No valid response received."}
</div>`;
    } catch (error) {
        console.error("❌ API Call Failed:", error);
        responseBox.innerHTML = "Error processing your request.";
    }
}
