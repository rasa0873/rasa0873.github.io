async function submitEvaluation() {
    const name = document.getElementById("name").value.trim();
    const about = document.getElementById("about").value.trim();
    const dreamJob = document.getElementById("dreamJob").value.trim();

    const responseBox = document.getElementById("response");
    responseBox.innerHTML = "Processing..."; // Show loading state

    if (!name || !about || !dreamJob) {
        responseBox.innerHTML = "⚠ Please fill in all fields!";
        return;
    }

    const userMessage = `
    Candidate Details:
    Name, Profession & Experience: ${name}
    About: ${about}
    Dream Job: ${dreamJob}

    Please analyze this information and provide a structured candidate evaluation.
    `;

    const backendURL = "https://us-central1-rasa-agent-3-badg.cloudfunctions.net/evaluate";

    try {
        const response = await fetch(backendURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userMessage })
        });

        const gptReply = await response.json();
        console.log("Full response from backend:", gptReply);
        responseBox.innerHTML = `<strong>AI Analysis:</strong> ${gptReply.openaiResponse || "No valid response received."}`;
    } catch (error) {
        console.error("❌ API Call Failed:", error);
        responseBox.innerHTML = "Error processing your request.";
    }
}
