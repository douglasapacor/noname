import { Entity } from "./Entity";

export abstract class Scene {
  protected entities: Entity[] = [];
  requestSceneChange?: (sceneName: string) => void;

  set entity(entity: Entity) {
    this.entities.push(entity);
  }

  update(dt: number) {
    for (const e of this.entities) e.update(dt);
  }

  draw(ctx: CanvasRenderingContext2D) {
    for (const e of this.entities) e.draw(ctx);
  }

  abstract onEnter(): void;

  abstract start(): void;

  abstract onExit(): void;
}
