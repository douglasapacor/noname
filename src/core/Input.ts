class InputClass {
  private keys = new Set<string>();
  private keys_pressed = new Set<string>();
  private keys_released = new Set<string>();
  private mouse = new Set<number>();
  private mouse_pressed = new Set<number>();
  private mouse_released = new Set<number>();

  public mouseX = 0;
  public mouseY = 0;
  public keyboar_enabled = true;
  public mouse_enabled = true;

  constructor() {
    window.addEventListener("keydown", (e) => {
      if (!this.keyboar_enabled) return;

      if (!this.keys.has(e.key)) {
        this.keys.add(e.key);
        this.keys_pressed.add(e.key);
      }
    });

    window.addEventListener("keyup", (e) => {
      if (!this.keyboar_enabled) return;

      if (this.keys.has(e.key)) {
        this.keys.delete(e.key);
        this.keys_released.add(e.key);
      }
    });

    window.addEventListener("mousedown", (e) => {
      if (!this.mouse_enabled) return;

      if (!this.mouse.has(e.button)) {
        this.mouse.add(e.button);
        this.mouse_pressed.add(e.button);
      }
    });

    window.addEventListener("mouseup", (e) => {
      if (!this.mouse_enabled) return;

      if (this.mouse.has(e.button)) {
        this.mouse.delete(e.button);
        this.mouse_released.add(e.button);
      }
    });

    window.addEventListener("mousemove", (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    });
  }

  update() {
    this.keys_pressed.clear();
    this.keys_released.clear();
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.font = "14px monospace";
    ctx.fillStyle = "rgba(0,0,0,0.6)";
    ctx.fillRect(100 - 6, 100 - 14, 100, 40);
    ctx.fillStyle = "#00FF00";
    ctx.fillText(
      `command: ${Array.from(this.keys).map((k) => k[0])}`,
      100,
      100
    );
    ctx.restore();
  }

  isDown(key: string) {
    return this.keys.get(key)?.down ?? false;
  }

  justPressed(key: string) {
    return this.keys.get(key)?.justPressed ?? false;
  }

  justReleased(key: string) {
    return this.keys.get(key)?.justReleased ?? false;
  }

  mouseDown(button = 0) {
    return this.mouse.get(button)?.down ?? false;
  }

  mouseJustPressed(button = 0) {
    return this.mouse.get(button)?.justPressed ?? false;
  }

  mouseJustReleased(button = 0) {
    return this.mouse.get(button)?.justReleased ?? false;
  }
}

const Input = new InputClass();

export default Input;
