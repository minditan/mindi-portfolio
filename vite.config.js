import fs from "node:fs";
import path from "node:path";
import { defineConfig } from "vite";

const PUBLIC_STATIC = /\.(avif|jpe?g|png|webp|gif|mp3|ogg|wav|m4a|pdf)$/i;

export default defineConfig({
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      const urlPath = req.url?.split("?")[0];
      if (!urlPath || !PUBLIC_STATIC.test(urlPath)) return next();

      const filePath = path.join(process.cwd(), "public", urlPath.replace(/^\//, ""));
      if (!fs.existsSync(filePath)) return next();

      const ext = path.extname(filePath).toLowerCase();
      const types = {
        ".avif": "image/avif",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".png": "image/png",
        ".webp": "image/webp",
        ".gif": "image/gif",
        ".mp3": "audio/mpeg",
        ".ogg": "audio/ogg",
        ".wav": "audio/wav",
        ".m4a": "audio/mp4",
        ".pdf": "application/pdf",
      };

      res.statusCode = 200;
      res.setHeader("Content-Type", types[ext] || "application/octet-stream");
      fs.createReadStream(filePath).pipe(res);
    });
  },
});
