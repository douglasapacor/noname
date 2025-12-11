export class Time {
  static deltaTime: number = 0;
  static time: number = 0;
  static fps: number = 0;

  static update(dt: number) {
    Time.deltaTime = dt;
    Time.time += dt;
    Time.fps = 1 / dt;
  }
}
