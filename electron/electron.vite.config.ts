import path from "path";
import { defineConfig } from "vite";
import { builtinModules } from "module";

export default defineConfig({
  build: {
    outDir: "dist/electron",
    emptyOutDir: true,
    minify: false,
    target: "node16",
    lib: {
      entry: {
        main: path.resolve(__dirname, "main.ts"),
        preload: path.resolve(__dirname, "preload.ts"),
      },
      formats: ["cjs"],
    },
    rollupOptions: {
      external: ["electron", ...builtinModules],
      output: {
        entryFileNames: "[name].js",
        chunkFileNames: "[name].js",
        format: "cjs",
      },
    },
  },
});
