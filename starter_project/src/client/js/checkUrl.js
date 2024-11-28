function vUrl(urlString) {
    const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[a-zA-Z0-9-._~:%@&=+!*'(),]*)?(\?[a-zA-Z0-9-._~:%@&=+!*'(),]*)?(#[a-zA-Z0-9-._~:%@&=+!*'(),]*)?$/;
    return urlPattern.test(urlString);
}

function checkUrl(inputText) {
    if (typeof inputText !== 'string' || inputText.trim() === '') {
        return false;
    }
    return vUrl(inputText);
}

export { checkUrl };
