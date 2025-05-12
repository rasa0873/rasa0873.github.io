async function submitEvaluation() {
    const name = document.getElementById("name").value;
    const about = document.getElementById("about").value;
    const dreamJob = document.getElementById("dreamJob").value;

    const userMessage = `
    Candidate Details:
    Name, Profession & Experience: ${name}
    About: ${about}
    Dream Job: ${dreamJob}

    Please analyze this information and provide a structured candidate evaluation.
    `;

    const responseBox = document.getElementById("response");
    responseBox.innerHTML = "Processing..."; // Show loading state

    try {
        const response = await fetch("https://your-backend-url/evaluate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userMessage })
        });

        const gptReply = await response.json();
        responseBox.innerHTML = `<strong>AI Analysis:</strong> ${gptReply.response}`;
    } catch (error) {
        console.error("❌ API Call Failed:", error);
        responseBox.innerHTML = "Error processing your request.";
    }
}