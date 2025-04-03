import fs from 'fs';
import path from 'path';

import { Plugin } from 'vite';
import { createRequire } from 'module';

import { tags } from './tags.js';
import { renderComponents } from './components.js';

const require = createRequire(import.meta.url);

interface NexuConfig {
  defaultTags?: boolean;
}

function Nexu(): Plugin {
  // Always use 'nexu.config.ts' for the config file
  const configPath = path.resolve(process.cwd(), 'nexu.config.ts');

  // Check if the configuration file exists
  if (!fs.existsSync(configPath)) {
    throw new Error(`Config file 'nexu.config.ts' not found.`);
  }

  // Load the configuration file using require (since we're in an ES Module, we need createRequire)
  const userConfig: NexuConfig = require(configPath).default;

  // Use defaultTags from userConfig; default to true if not provided.
  const defaultTagsEnabled = (userConfig.defaultTags !== undefined) ? userConfig.defaultTags : true;

  return {
    name: 'vite-plugin-nexu',

    transformIndexHtml(html: string) {
      // If defaultTags is disabled, skip any modifications.
      if (!defaultTagsEnabled) {
        return html;
      }

      // When defaultTags is enabled, apply the tag manipulation logic from tags.ts
      html = tags(html);

      // Replace components (like {[componentName]}) with their content
      html = renderComponents(html);

      return html;
    },

  };
}

export default Nexu;
