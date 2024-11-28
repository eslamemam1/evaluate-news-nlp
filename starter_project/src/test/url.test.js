const { checkUrl } = require("../client/js/checkUrl")

describe('URL Validation Tests', () => {
    it('should return false for non-URL text', () => {
        expect(checkUrl("read")).toBe(false);
    });

    it('should return false for email links', () => {
        expect(checkUrl("mailto:eslam@gmail.com")).toBe(false);
    });

    it('should return true for a valid web URL', () => {
        expect(checkUrl("https://www.google.com")).toBe(true);
    });

    it('should return false for an invalid URL format', () => {
        expect(checkUrl("http:/google.com")).toBe(false);
    });

})