import { checkUrl } from './checkUrl'; // If you want to use your custom checkUrl function

// If working on Udacity workspace, update this with the Server API URL e.g. `https://wfkdhyvtzx.prod.udacity-student-workspaces.com/api`
// const serverURL = 'https://wfkdhyvtzx.prod.udacity-student-workspaces.com/api'
const serverURL = 'https://localhost:8000/api';

const form = document.getElementById('urlForm');
const errorMessage = document.getElementById('errorMessage');
const submitButton = document.getElementById('submitButton');
const url = document.getElementById('url');

form.addEventListener('submit', handleSubmit);

async function handleSubmit(event) {
    event.preventDefault();

    // Disable the submit button to prevent multiple clicks
    setButtonState(false, "Processing...");

    // Get the URL from the input field
    const urlText = url.value.trim(); // Use trim() to remove any leading/trailing whitespace

    // Check if the URL input is empty
    if (urlText === '') {
        showErrors('The URL field cannot be empty!');
        setButtonState(true, "Submit");
        return;
    }

    // Validate the URL format using isValidUrl or your custom checkUrl function
    const vUrl = isValidUrl(urlText); // Use isValidUrl instead of checkUrl if desired

    if (!vUrl) {
        showErrors('Please insert a valid URL!');
        setButtonState(true, "Submit");
        return;
    } else {
        // If the URL is valid, send it to the server using the serverURL constant above
        hideErrors();

        const body = { url: urlText };
        try {
            // Function to send data to the server
            const response = await fetch('http://localhost:8000/getData', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch recent entry: ${response.status}`);
            }

            const { object, msg, code } = await response.json();
            if (code === 200) {
                hideErrors();

                let textToShow = `Agreement: ${object.agreement}<br> <br>`;
                textToShow += `Subjectivity: ${object.subjectivity}<br> <br>`;
                textToShow += `Confidence: ${object.confidence}<br> <br>`;
                textToShow += `Irony: ${object.irony}<br> <br>`;
                textToShow += `Score Tag: ${object.score_tag}`;

                document.getElementById('results').innerHTML = textToShow;
            } else if (code !== 200) {
                showErrors(msg);
            }

        } catch (error) {
            console.error("Error updating UI:", error);
        } finally {
            // Re-enable the button after the process is complete
            setButtonState(true, "Submit");
        }
    }
}

function showErrors(errorText = '') {
    if (errorText !== '') {
        errorMessage.innerHTML = errorText;
    }
    errorMessage.classList.remove('hidden');
}

function hideErrors() {
    errorMessage.classList.add('hidden');
    errorMessage.innerHTML = ''; // Clear any previous error message
}

function setButtonState(enabled, text) {
    submitButton.disabled = !enabled; // Disable or enable the button
    submitButton.innerText = text;   // Update the button text
}

function isValidUrl(string) {
    try {
        new URL(string); // Attempt to create a URL object
        return true; // If successful, it's a valid URL
    } catch (_) {
        return false; // If it throws, it's not a valid URL
    }
}

// Export the handleSubmit function
export { handleSubmit };
