import { Time } from "./Time";

export class FPSCounter {
  private history: number[] = [];
  private maxSamples = 30;
  public enabled = true;
  public x = 10;
  public y = 20;

  update() {
    const fps = Time.fps || (Time.deltaTime > 0 ? 1 / Time.deltaTime : 0);
    this.history.push(fps);
    if (this.history.length > this.maxSamples) this.history.shift();
  }

  getAverage(): number {
    if (this.history.length === 0) return 0;
    const sum = this.history.reduce((a, b) => a + b, 0);
    return sum / this.history.length;
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (!this.enabled) return;
    const avg = Math.round(this.getAverage());
    ctx.save();
    ctx.font = "14px monospace";
    ctx.fillStyle = "rgba(0,0,0,0.6)";
    ctx.fillRect(this.x - 6, this.y - 14, 90, 22);
    ctx.fillStyle = "#00FF00";
    ctx.fillText(`FPS: ${avg}`, this.x, this.y);
    ctx.restore();
  }
}
