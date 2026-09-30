const pdfInput = document.getElementById("pdfInput");
const fileName = document.getElementById("fileName");
const documentList = document.getElementById("documentList");


// PDF Upload
pdfInput.addEventListener("change", function () {

    const file = this.files[0];

    if (!file) {
        return;
    }

    if (file.type !== "application/pdf") {
        alert("Please upload a PDF file.");
        return;
    }

    fileName.innerText = "Selected: " + file.name;

    // Remove empty message
    const empty = document.querySelector(".empty");

    if (empty) {
        empty.remove();
    }

    // Create document card
    const documentCard = document.createElement("div");

    documentCard.className = "document";

    documentCard.innerHTML = `
        <div class="document-left">
            <div class="pdf-icon">📕</div>
            <div>
                <strong>${file.name}</strong>
                <p>PDF document</p>
            </div>
        </div>

        <button onclick="removeDocument(this)">
            Remove
        </button>
    `;

    documentList.appendChild(documentCard);

    addAIMessage(
        "PDF uploaded successfully! You can now ask questions about this document."
    );
});


// Remove document
function removeDocument(button) {

    button.parentElement.parentElement.remove();

    fileName.innerText = "No file selected";
}


// Ask AI
function askAI() {

    const questionInput = document.getElementById("question");

    const question = questionInput.value.trim();

    if (question === "") {
        alert("Please enter a question.");
        return;
    }

    // Display user question
    const chatMessages = document.getElementById("chatMessages");

    const userMessage = document.createElement("div");

    userMessage.className = "message user";

    userMessage.innerHTML = `
        <b>You:</b> ${question}
    `;

    chatMessages.appendChild(userMessage);

    questionInput.value = "";

    // Demo AI response
    setTimeout(() => {

        const aiMessage = document.createElement("div");

        aiMessage.className = "message ai";

        aiMessage.innerHTML = `
            <b>AI:</b>
            This is a demo response. In the complete project,
            the question will be sent to the Python/FastAPI backend,
            which searches the uploaded PDF and generates an answer.
        `;

        chatMessages.appendChild(aiMessage);

        chatMessages.scrollTop = chatMessages.scrollHeight;

    }, 700);
}


// Add AI message
function addAIMessage(message) {

    const chatMessages = document.getElementById("chatMessages");

    const aiMessage = document.createElement("div");

    aiMessage.className = "message ai";

    aiMessage.innerHTML = `
        <b>AI:</b> ${message}
    `;

    chatMessages.appendChild(aiMessage);
}\