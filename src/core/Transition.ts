export class Transition {
  private static _alpha = 0;
  private static _duration = 300; // ms
  private static _running = false;
  private static ctx: CanvasRenderingContext2D;

  static init(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  static draw() {
    if (!this._running) return;

    const c = this.ctx.canvas;

    this.ctx.save();
    this.ctx.globalAlpha = this._alpha;
    this.ctx.fillStyle = "#000";
    this.ctx.fillRect(0, 0, c.width, c.height);
    this.ctx.restore();
  }

  static fadeOut(duration: number = this._duration): Promise<void> {
    return new Promise((resolve) => {
      this._running = true;

      const start = performance.now();

      const animate = () => {
        const t = (performance.now() - start) / duration;

        this._alpha = Math.min(t, 1);

        if (t < 1) {
          requestAnimationFrame(animate);
        } else {
          resolve();
        }
      };

      animate();
    });
  }

  static fadeIn(duration: number = this._duration): Promise<void> {
    return new Promise((resolve) => {
      this._running = true;

      const start = performance.now();

      const animate = () => {
        const t = (performance.now() - start) / duration;

        this._alpha = 1 - Math.min(t, 1);

        if (t < 1) {
          requestAnimationFrame(animate);
        } else {
          this._running = false;
          resolve();
        }
      };

      animate();
    });
  }
}
