document.getElementById('monoValidationForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const clientName = document.getElementById('monoNameField').value.trim();
    const clientEmail = document.getElementById('monoEmailField').value.trim();
    const clientPhone = document.getElementById('monoPhoneField').value.trim();
    const clientMsg = document.getElementById('monoMessageField').value.trim();
    const errorLayer = document.getElementById('monoErrorDisplay');

    errorLayer.classList.add('hide-element');
    errorLayer.innerHTML = "";

    let verificationLogs = [];

    if (!clientName || !clientEmail || !clientPhone || !clientMsg) {
        verificationLogs.push("Data incomplete: Empty field containers discovered.");
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (clientEmail && !emailPattern.test(clientEmail)) {
        verificationLogs.push("Invalid Type: Structured mail template formatting broken.");
    }

    const digitsPattern = /^\d+$/;
    if (clientPhone && !digitsPattern.test(clientPhone)) {
        verificationLogs.push("Constraints Error: Phone value accepts numerical characters strictly.");
    }

    if (verificationLogs.length > 0) {
        errorLayer.innerHTML = verificationLogs.join('<br>');
        errorLayer.classList.remove('hide-element');
        return;
    }

    alert("Process Completed: Encrypted parameters verified. Submitting operational frame.");
    document.getElementById('monoValidationForm').reset();
});