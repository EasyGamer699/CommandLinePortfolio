document.addEventListener('DOMContentLoaded', () => {
    const outputElement = document.getElementById('shell-output');
    const TYPING_SPEED = 10; // Milliseconds per step

    // Funktion zum Drucken von Nachrichten in die Shell-Ausgabe mit Tipp-Effekt
    function printToShell(message, isCommand = false, callback = () => {}) {
        const newLine = document.createElement('div');
        outputElement.appendChild(newLine);

        let targetElement;
        let cursorElement = document.createElement('span'); // Erstelle das Cursor-Element
        cursorElement.className = 'typing-cursor'; // Weise die Cursor-Klasse zu

        if (isCommand) {
            const promptSpan = document.createElement('span');
            promptSpan.id = 'prompt';
            promptSpan.textContent = '>';
            newLine.appendChild(promptSpan);
            
            targetElement = document.createElement('span');
            newLine.appendChild(targetElement);
            // Cursor wird initial an targetElement gehängt
            targetElement.appendChild(cursorElement); 
            message = ' ' + message;
        } else {
            targetElement = newLine;
            if (message === '') {
                targetElement.innerHTML = '&nbsp;';
                outputElement.scrollTop = outputElement.scrollHeight;
                callback();
                return;
            }
            // Cursor wird initial an targetElement gehängt
            targetElement.appendChild(cursorElement);
        }

        let i = 0;
        function typeWriter() {
            if (i <= message.length) {
                // Den Cursor vor dem Aktualisieren des Textes entfernen,
                // damit er immer am Ende des aktuellen Textes hinzugefügt werden kann.
                if (cursorElement.parentNode) {
                    cursorElement.parentNode.removeChild(cursorElement);
                }

                targetElement.textContent = message.substring(0, i);
                
                // Füge den Cursor wieder am Ende des aktualisierten Textes hinzu
                targetElement.appendChild(cursorElement);

                i++;
                outputElement.scrollTop = outputElement.scrollHeight;
                setTimeout(typeWriter, TYPING_SPEED);
            } else {
                // Animation beendet: Cursor entfernen und Callback aufrufen
                if (cursorElement.parentNode) {
                    cursorElement.parentNode.removeChild(cursorElement);
                }
                callback(); 
            }
        }
        typeWriter();
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

                const commandTextSpan = document.createElement('span');
                commandTextSpan.textContent = command;
                commandTextSpan.className = 'command-display-text';
                inputElement.parentNode.replaceChild(commandTextSpan, inputElement);

                executeCommand(command, () => {
                    addNewInputLine();
                });
            }
        });

        outputElement.scrollTop = outputElement.scrollHeight;
    }


    // Initialer Begrüßungsbildschirm - Jetzt mit sequentiellen Aufrufen
    printToShell('Terminal [Version 1.0.0]', false, () => {
        printToShell('(c) Aaron Corporation. All rights reserved.', false, () => {
            printToShell('', false, () => { // Leerzeile
                printToShell("Type 'help' for commands.", false, () => {
                    printToShell('', false, () => { // Eine weitere Leerzeile
                        addNewInputLine(); // Erste Eingabezeile hinzufügen, nachdem alles getippt wurde
                    });
                });
            });
        });
    });


    // Funktion zur Verarbeitung der eingegebenen Befehle
    function executeCommand(command, onCompleteCallback = () => {}) {
        const parts = command.toLowerCase().split(' ');
        const mainCommand = parts[0];

        const respond = (messages, index = 0, callback = () => {}) => {
            if (index < messages.length) {
                printToShell(messages[index], false, () => {
                    respond(messages, index + 1, callback);
                });
            } else {
                callback();
            }
        };

        if (mainCommand === 'hello') {
            respond(['Hello World!'], 0, onCompleteCallback);
        } else if (mainCommand === 'clear') {
            outputElement.innerHTML = '';
            onCompleteCallback(); 
        } else if (mainCommand === 'help') {
            respond([
                '',
                'Available commands:',
                '',
                'hello         Prints "Hello World!"',
                'clear         Clears the console output.',
                'dir           Displays the "Menu".',
                'help          Displays this help message.',
                '',
                'aboutme.html  opens AboutMe Site',
                'projects.html opens Projects Site',
                'skills.html   opens Skills Site',
                '',
                'Conact        put in ur email to get in Contact.',
                ''
            ], 0, onCompleteCallback);
        } else if (mainCommand === 'dir') {
            respond([
                '',
                '      Directory of C:\\Users\\Aaron\\Website',
                'C:',
                '├──AboutMe.html',
                '├──Projects.html',
                '└──Skills.html',
                ''
            ], 0, onCompleteCallback);
        } else if (mainCommand === 'aboutme.html') {
            open('aboutme.html', '_blank');
            respond(['Opend AboutMe'], 0, onCompleteCallback);
        } else if (mainCommand === 'projects.html') {
            window.open('aboutme.html', '_blank');
            respond(['Opend projects'], 0, onCompleteCallback);
        } else if (mainCommand === 'skills.html') {
            window.open('aboutme.html');
            respond(['Opend Skills'], 0, onCompleteCallback);
        } else {
            respond([
                'Command not recognized: ' + command,
                "Type 'help' to see available commands.",
                ''
            ], 0, onCompleteCallback);
        }
    }

    // Fokus auf das letzte Eingabefeld setzen, wenn auf den Ausgabebereich geklickt wird
    outputElement.addEventListener('click', () => {
        const lastInput = outputElement.querySelector('.command-input:not([disabled])');
        if (lastInput) {
            lastInput.focus();
        }
    });
});a