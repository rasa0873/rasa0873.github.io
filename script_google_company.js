async function seekingForm() { // Former submitEvaluation
    const q1 = document.getElementById("q1").value.trim();
    const q2 = document.getElementById("q2").value.trim();
    const q3 = document.getElementById("q3").value.trim();
    const q4 = document.getElementById("q4").value.trim();
    

    const questions = Array.from({ length: 4 }, (_, i) => `q${i + 1}`);
    const responses = questions.map(q => document.getElementById(q).value.trim());
    
    const responseBox = document.getElementById("response");
    responseBox.innerHTML = "Processing..."; // Show loading state

    if (responses.some(res => !res)) {
    responseBox.innerHTML = "⚠ Por favor, completa todos los campos.";
    return; 
    }

    const userMessage = `
    Job description and Details:
    Descripción del cargo y sus responsabilidades: ${responses[0]}
    Conocimientos y destrezas requeridas: ${responses[1]}
    Nivel requerido de experiencia: ${responses[2]}
    Trabajo remoto, presencial, híbrido: ${responses[3]}
    

    Please analyze this job description and its desired requirements and provide advice to the job seeker.
    Please use in the response report the same language used by the input.
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
