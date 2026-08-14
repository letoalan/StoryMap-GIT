import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

function serveTilesPlugin(): Plugin {
  return {
    name: 'serve-tiles-plugin',
    configureServer(server) {
      server.middlewares.use('/tiles', (req, res, next) => {
        const reqPath = (req.url || '').split('?')[0];
        const filePath = path.join(process.cwd(), 'tiles', reqPath);
        if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
          res.setHeader('Access-Control-Allow-Headers', '*');
          res.setHeader('Content-Type', 'application/octet-stream');
          fs.createReadStream(filePath).pipe(res);
        } else {
          next();
        }
      });
    },
  };
}

// Copie le dossier /tiles vers /dist/tiles lors du build, pour que
// GitHub Pages serve les fichiers PMTiles au même chemin qu'en dev
function copyTilesPlugin(): Plugin {
  return {
    name: 'copy-tiles-plugin',
    apply: 'build',
    closeBundle() {
      const srcDir = path.join(process.cwd(), 'tiles');
      const outDir = path.join(process.cwd(), 'dist', 'tiles');
      if (!fs.existsSync(srcDir)) return;
      fs.mkdirSync(outDir, { recursive: true });
      for (const file of fs.readdirSync(srcDir)) {
        fs.copyFileSync(path.join(srcDir, file), path.join(outDir, file));
      }
    },
  };
}

function inlineCssPlugin(): Plugin {
  return {
    name: 'inline-css-plugin',
    apply: 'build',
    enforce: 'post',
    generateBundle(_, bundle) {
      let cssCode = '';
      const cssKeys: string[] = [];

      for (const [fileName, chunk] of Object.entries(bundle)) {
        if (fileName.endsWith('.css') && chunk.type === 'asset') {
          cssCode += String(chunk.source);
          cssKeys.push(fileName);
        }
      }

      for (const key of cssKeys) {
        delete bundle[key];
      }

      if (cssCode) {
        for (const chunk of Object.values(bundle)) {
          if (chunk.type === 'chunk' && chunk.isEntry) {
            const injection = `(function(){if(typeof document!=='undefined'){var s=document.createElement('style');s.setAttribute('data-storymap-git-css','');s.textContent=${JSON.stringify(cssCode)};document.head.appendChild(s);}})();\n`;
            chunk.code = injection + chunk.code;
          }
        }
      }
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  base: '/StoryMap-GIT/',
  plugins: [react(), serveTilesPlugin(), copyTilesPlugin(), inlineCssPlugin()],
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  build: {
    lib: {
      entry: 'src/main.tsx',
      name: 'StoryMapGIT',
      fileName: () => 'storymap-git.js',
      formats: ['iife'],
    },
    cssCodeSplit: false,
    emptyOutDir: true,
  },
});
