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
            newLine.innerHTML = message === '' ? '&nbsp;' : message;
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
        promptSpan.textContent = 'C:\\Users\\Aaron>';
        inputLine.appendChild(promptSpan);

        const inputElement = document.createElement('input');
        inputElement.type = 'text';
        inputElement.className = 'command-input';
        inputElement.autofocus = true;
        inputLine.appendChild(inputElement);

        outputElement.appendChild(inputLine);
        inputElement.focus();

        inputElement.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                const command = inputElement.value.trim();
                inputElement.disabled = true;
                inputElement.removeAttribute('autofocus');

                // MODIFICATION START: Display the entered command directly within the input line
                const commandTextSpan = document.createElement('span');
                commandTextSpan.textContent = command;
                commandTextSpan.className = 'command-display-text'; // Add a class for styling if needed
                inputElement.parentNode.replaceChild(commandTextSpan, inputElement); // Replace input with span

                if (command !== '') {
                    executeCommand(command);
                }
                addNewInputLine();
            }
        });

        outputElement.scrollTop = outputElement.scrollHeight;
    }


    // Initialer Begrüßungsbildschirm
    printToShell('Terminal [Version 1.0.0]');
    printToShell('(c) Aaron Corporation. All rights reserved.');
    printToShell('');
    printToShell("Type 'help' for commands.");
    printToShell('');


    // Funktion zur Verarbeitung der eingegebenen Befehle
    function executeCommand(command) {
        const parts = command.toLowerCase().split(' ');
        const mainCommand = parts[0];

        if (mainCommand === 'hello') {
            printToShell('Hello World!');
        } else if (mainCommand === 'clear') {
            outputElement.innerHTML = '';
            printToShell('');
        } else if (mainCommand === 'help') {
            printToShell('');
            printToShell('Available commands:');
            printToShell('');
            printToShell('hello         Prints "Hello World!"');
            printToShell('clear         Clears the console output.');
            printToShell('dir           Displays the "Menu".');
            printToShell('help          Displays this help message.');
            printToShell('');
            printToShell('aboutme.html  opens AboutMe Site');
            printToShell('projects.html opens Projects Site');
            printToShell('skills.html   opens Skills Site');
            printToShell('');
            printToShell('conact        put in ur email to get in Contact.');
            printToShell('');

        } else if (mainCommand === 'dir') {
            printToShell('');
            printToShell('      Directory of C:\\Users\\Aaron\\Website');
            printToShell('C:');
            printToShell('├──AboutMe.html');
            printToShell('├──Projects.html');
            printToShell('└──Skills.html');
            printToShell('');

        } else if (mainCommand === 'aboutme.html') {
            window.open('aboutme.html', '_blank');
        
        } else if (mainCommand === 'projects.html') {
            window.open('aboutme.html', '_blank');
        
        } else if (mainCommand === 'skills.html') {
            window.open('aboutme.html', '_blank');
            
        } else {
            printToShell('Command not recognized: ' + command);
            printToShell("Type 'help' to see available commands.");
            printToShell('');
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