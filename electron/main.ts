import { app, BrowserWindow } from "electron";
import path from "path";

async function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // Ambiente dev: carrega Vite
  if (!app.isPackaged) {
    await win.loadURL("http://localhost:5173");
  } else {
    win.loadFile(path.join(__dirname, "../src/index.html"));
  }
}

app.whenReady().then(createWindow);
