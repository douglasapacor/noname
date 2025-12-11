import "./assets/global.css";
import { Game } from "./core/Game";
import { SceneManager } from "./core/SceneManager";
import { BilboardScene } from "./scenes/BilboardScene";

SceneManager.register("bilbordScene", new BilboardScene());
SceneManager.request("bilbordScene");

const game = new Game();
game.debug.fps = true;
game.start();
