import { Plugin } from 'vite';

function Web(): Plugin {
  return {
    name: 'vite-plugin-webbed',  // Plugin name

    transformIndexHtml(html: string) {
      // Check if the necessary tags are already present
      if (html.includes('<!DOCTYPE html>') && html.includes('<html')) {
        return html; // Don't modify if already present
      }

      let result = '<!DOCTYPE html>\n<html>\n' + html + '\n</html>';
      return result;
    },
  };
 }

export default Web;
