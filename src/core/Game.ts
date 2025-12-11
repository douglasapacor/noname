import { SceneManager } from "./SceneManager";
import { Time } from "./Time";

export class Game {
  private canvas: HTMLCanvasElement;
  private lastTime = 0;
  private ctx!: CanvasRenderingContext2D;

  constructor() {
    this.canvas = document.createElement("canvas");
    this.canvas.style.width = "100vw";
    this.canvas.style.height = "100vh";
    this.canvas.style.position = "absolute";

    const context = this.canvas.getContext("2d");

    if (!context) throw new Error("No Context");

    this.ctx = context;

    document.body.appendChild(this.canvas);
  }

  start() {
    requestAnimationFrame(this.loop);
  }

  private loop = (time: number) => {
    const dt = (time - this.lastTime) / 1000;
    this.lastTime = time;

    Time.update(dt);
    SceneManager.currentScene?.update(dt);
    this.Draw();

    requestAnimationFrame(this.loop);
  };

  private Draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
