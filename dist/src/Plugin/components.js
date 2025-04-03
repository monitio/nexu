// components.ts
import fs from 'fs';
import path from 'path';
/**
 * Render components by replacing the component placeholder with its content.
 * It searches for `{[componentName]}` in the HTML and replaces it with the content of the corresponding component file.
 * @param html The HTML content to modify.
 * @returns The modified HTML content with components rendered.
 */
export function renderComponents(html) {
    const componentsDir = path.resolve(process.cwd(), 'src', 'components');
    // Regular expression to match the component placeholder: {[componentName]}
    const componentRegex = /\{\[([a-zA-Z0-9_-]+)\]\}/g;
    // Replace all placeholders with their corresponding component content
    return html.replace(componentRegex, (match, componentName) => {
        const componentPath = path.join(componentsDir, `${componentName}.html`);
        // Check if the component file exists
        if (fs.existsSync(componentPath)) {
            // Read the component content and return it
            return fs.readFileSync(componentPath, 'utf-8');
        }
        else {
            // If the component doesn't exist, log a warning and leave the placeholder as-is
            console.warn(`Component "${componentName}" not found at "${componentPath}".`);
            return match; // Return the placeholder if the component is not found
        }
    });
}
