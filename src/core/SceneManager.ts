import { Scene } from "./Scene";
import { Transition } from "./Transition";

export class SceneManager {
  private static scenes = new Map<string, Scene>();
  private static _current: Scene | null = null;
  private static _pending: Scene | null = null;
  private static _isTransitioning = false;

  static get current() {
    return this._current;
  }

  static register(name: string, scene: Scene) {
    this.scenes.set(name, scene);
  }

  static request(name: string) {
    const scene = this.scenes.get(name);
    if (!scene) throw new Error(`Cena '${name}' não registrada`);

    this._pending = scene;
  }

  static async applyChanges() {
    if (!this._pending || this._isTransitioning) return;
    this._isTransitioning = true;

    await Transition.fadeOut();

    if (this._current) this._current.onExit();

    this._current = this._pending;
    this._pending = null;

    this._current.onEnter();
    this._current.start();

    await Transition.fadeIn();

    this._isTransitioning = false;
  }

  static update(dt: number) {
    if (this._current && !this._isTransitioning) {
      this._current.update(dt);
    }
  }

  static draw(ctx: CanvasRenderingContext2D) {
    if (this._current) {
      this._current.draw(ctx);
    }

    Transition.draw();
  }
}
