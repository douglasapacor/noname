import { Vector2 } from "./Vector2";

export abstract class Entity {
  position: Vector2;

  constructor(pos: Vector2 = new Vector2(0, 0)) {
    this.position = pos;
  }

  abstract update(dt: number): void;

  abstract draw(ctx: CanvasRenderingContext2D): void;

  abstract onEnter(): void;

  abstract onExit(): void;
}
