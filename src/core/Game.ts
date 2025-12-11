import { FPSCounter } from "./FPSCounter";
import Input from "./Input";
import { SceneManager } from "./SceneManager";
import { Time } from "./Time";
import { Transition } from "./Transition";

export class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private lastTime = 0;
  private fps = new FPSCounter();
  public debug = { fps: true };

  constructor() {
    this.canvas = document.createElement("canvas");
    this.canvas.style.width = "100vw";
    this.canvas.style.height = "100vh";
    this.canvas.style.position = "absolute";
    document.body.appendChild(this.canvas);

    const ctx = this.canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas 2D não suportado");

    this.ctx = ctx;

    Transition.init(this.ctx);

    this.resize();

    window.addEventListener("resize", () => this.resize());
  }

  start(initialSceneName?: string) {
    this.lastTime = performance.now();
    requestAnimationFrame(this.loop);
  }

  private resize() {
    const ratio = window.devicePixelRatio || 1;
    const cssW = Math.max(
      1,
      this.canvas.clientWidth || parseInt(this.canvas.style.width || "800")
    );
    const cssH = Math.max(
      1,
      this.canvas.clientHeight || parseInt(this.canvas.style.height || "600")
    );

    this.canvas.width = Math.floor(cssW * ratio);
    this.canvas.height = Math.floor(cssH * ratio);

    this.ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  private loop = (time: number) => {
    const dt = (time - this.lastTime) / 1000;
    this.lastTime = time;

    Time.update(dt);
    SceneManager.update(dt);
    void SceneManager.applyChanges();

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    SceneManager.draw(this.ctx);

    if (this.debug.fps) {
      this.fps.update();
      this.fps.draw(this.ctx);
    }

    Transition.draw();

    Input.update();

    if (Input.justPressed("F3")) {
      this.debug.fps = !this.debug.fps;
    }

    Input.draw(this.ctx);

    requestAnimationFrame(this.loop);
  };
}
