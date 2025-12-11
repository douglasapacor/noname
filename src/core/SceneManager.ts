import { Scene } from "./Scene";

export class SceneManager {
  static currentScene: Scene | null = null;
  private static scenes = new Map<string, Scene>();

  static register(name: string, scene: Scene) {
    SceneManager.scenes.set(name, scene);
  }

  static loadScene(name: string) {
    if (this.currentScene) this.currentScene.onExit();

    const scene = SceneManager.get(name);

    this.currentScene = scene;
    this.currentScene.onEnter();
  }

  static get(name: string): Scene {
    const scene = SceneManager.scenes.get(name);

    if (!scene) throw new Error(`Cena '${name}' não registrada`);

    return scene;
  }
}
