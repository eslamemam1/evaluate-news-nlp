const meaningUrl = "https://api.meaningcloud.com/sentiment-2.1";

const menaCloud = async (url, key) => {
    // Construct the full URL for the MeaningCloud API
    const fullUrl = `${meaningUrl}?key=${key}&url=${url}&lang=en`;

    try {
        // Fetch data from the MeaningCloud API
        const response = await fetch(fullUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        // Check if response was successful
        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.status}`);
        }

        const data = await response.json();
        const { code, msg } = data.status;

        console.log(code); // Log the status code for debugging

        // Handle different status codes from the API response
        if (code === 100 || code === 212) {
            return handleError(code, msg);
        }

        // On success, process and return the result
        return handleSuccess(data);

    } catch (error) {
        console.error('Error in menaCloud function:', error);
        return handleError(500, 'Internal Server Error');
    }
};

// Handle error response from the API
const handleError = (code, msg) => {
    return {
        object: null,
        msg: msg || "An error occurred",
        code: code
    };
};

// Handle success response from the API
const handleSuccess = (data) => {
    const { agreement, confidence, score_tag, subjectivity, irony } = data;

    const result = {
        object: {
            score_tag: score_tag,
            agreement: agreement,
            subjectivity: subjectivity,
            confidence: confidence,
            irony: irony
        },
        msg: 'Success',
        code: 200
    };

    return result;
};

module.exports = {
    menaCloud
};
