function Nexu_Core() {
    return {
        name: 'vite-plugin-nexu', // Plugin name
        transformIndexHtml(html) {
            // Check if the necessary tags are already present
            if (html.includes('<!DOCTYPE html>') && html.includes('<html')) {
                return html; // Don't modify if already present
            }
            let result = '<!DOCTYPE html>\n<html>\n' + html + '\n</html>';
            return result;
        },
    };
}
export default Nexu_Core;
