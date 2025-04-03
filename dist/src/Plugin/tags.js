// tags.ts
/**
 * Function that adds default tags (<!DOCTYPE html> and <html>) to the HTML content.
 * @param html The HTML content to modify.
 * @returns The modified HTML content with the default tags.
 */
export function tags(html) {
    // Check if the necessary tags are already present.
    if (html.includes('<!DOCTYPE html>') && html.includes('<html')) {
        return html; // Do not modify if already present.
    }
    // Otherwise, add the default tags.
    return '<!DOCTYPE html>\n<html>\n' + html + '\n</html>';
}
