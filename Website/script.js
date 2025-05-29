document.addEventListener('DOMContentLoaded', () => {
    const outputElement = document.getElementById('shell-output');

    // Funktion zum Drucken von Nachrichten in die Shell-Ausgabe
    function printToShell(message, isCommand = false) {
        const newLine = document.createElement('div');
        if (isCommand) {
            // For commands, we'll recreate the prompt and input structure
            const promptSpan = document.createElement('span');
            promptSpan.id = 'prompt';
            promptSpan.textContent = '>'; // Or your desired prompt
            newLine.appendChild(promptSpan);

            const commandSpan = document.createElement('span');
            commandSpan.textContent = ' ' + message;
            newLine.appendChild(commandSpan);
        } else {
            // Use &nbsp; for empty lines to ensure they render with height
            newLine.innerHTML = message === '' ? '&nbsp;' : message; // <-- Geänderte Zeile hier
        }
        outputElement.appendChild(newLine);
        outputElement.scrollTop = outputElement.scrollHeight; // Scroll to end
    }

    // Funktion zum Hinzufügen einer neuen Eingabezeile (bleibt unverändert)
    function addNewInputLine() {
        const inputLine = document.createElement('div');
        inputLine.id = 'input-line';

        const promptSpan = document.createElement('span');
        promptSpan.id = 'prompt';
        promptSpan.textContent = 'C:\\Users\\Aaron>'; // <--- This line is corrected
        inputLine.appendChild(promptSpan);

        const inputElement = document.createElement('input');
        inputElement.type = 'text';
        inputElement.className = 'command-input'; // Use a class as there will be multiple
        inputElement.autofocus = true;
        inputLine.appendChild(inputElement);

        outputElement.appendChild(inputLine);
        inputElement.focus(); // Set focus to the new input field

        inputElement.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                const command = inputElement.value.trim();
                inputElement.disabled = true; // Disable the input after entering command
                inputElement.removeAttribute('autofocus'); // Remove autofocus from processed input

                // Display the entered command as static text
                const commandDisplayLine = document.createElement('div');
                commandDisplayLine.innerHTML = `<span id="prompt">></span> ${command}`;
                outputElement.insertBefore(commandDisplayLine, inputLine); // Insert before the current input line

                if (command !== '') {
                    executeCommand(command);
                }
                addNewInputLine(); // Add a new input line for the next command
            }
        });

        outputElement.scrollTop = outputElement.scrollHeight; // Scroll to the bottom
    }


    // Initialer Begrüßungsbildschirm
    printToShell('Terminal [Version 1.0.0]');
    printToShell('(c) Aaron Corporation. All rights reserved.');
    printToShell(''); // Diese Zeile funktioniert jetzt als Leerzeile
    printToShell("Type 'help' for commands.");
    printToShell(''); // Diese Zeile funktioniert jetzt als Leerzeile


    // Funktion zur Verarbeitung der eingegebenen Befehle
    function executeCommand(command) {
        const parts = command.toLowerCase().split(' ');
        const mainCommand = parts[0];  

        if (mainCommand === 'hello') {
            printToShell('Hello World!');
        } else if (mainCommand === 'clear') {
            outputElement.innerHTML = ''; // Clears all content
            printToShell('Terminal [Version 1.0.0]');
            printToShell('(c) Aaron Corporation. All rights reserved.');
            printToShell(''); // Fügt auch hier eine Leerzeile nach dem Leeren hinzu
        } else if (mainCommand === 'help') {
            printToShell('Available commands:');
            printToShell('- hello: Prints "Hello World!"');
            printToShell('- clear: Clears the console output.');
            printToShell('- help: Displays this help message.');
        } else {
            printToShell('Command not recognized: ' + command);
            printToShell("Type 'help' to see available commands.");
        }
    }

    // Beim Laden der Seite die erste Eingabezeile hinzufügen
    addNewInputLine();

    // Fokus auf das letzte Eingabefeld setzen, wenn auf den Ausgabebereich geklickt wird
    outputElement.addEventListener('click', () => {
        const lastInput = outputElement.querySelector('.command-input:not([disabled])');
        if (lastInput) {
            lastInput.focus();
        }
    });
}); 