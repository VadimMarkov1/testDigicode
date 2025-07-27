import { ShapeManager } from '../model/ShapeManager';
import { CanvasView } from '../view/CanvasView';
import { UIElements } from '../view/UIElements';
import {Ticker} from "pixi.js";

export class AppController {
    private shapeManager = new ShapeManager();
    private view = new CanvasView('canvas-container', this.shapeManager);
    private ui = new UIElements();

    private gravity = 0.2;
    private spawnRate = 1;
    private spawnTimer = 0;

    constructor() {
        this.ui.updateGravity(this.gravity);
        this.ui.updateSpawnRate(this.spawnRate);

        this.ui.onIncGravity(() => {
            this.gravity += 0.05;
            this.gravity = Number(this.gravity.toFixed(2));
            this.ui.updateGravity(this.gravity);
        });

        this.ui.onDecGravity(() => {
            this.gravity -= 0.05;
            this.gravity = Number(this.gravity.toFixed(2));
            this.gravity = Math.max(0, this.gravity);
            this.ui.updateGravity(this.gravity);
        });

        this.ui.onIncSpawn(() => {
            this.spawnRate++;
            this.ui.updateSpawnRate(this.spawnRate);
        });

        this.ui.onDecSpawn(() => {
            this.spawnRate = Math.max(0, this.spawnRate - 1);
            this.ui.updateSpawnRate(this.spawnRate);
        });

    }

    public async init() {
        await this.view.initApp();
        Ticker.shared.add(this.tick.bind(this));
    }


    private tick(ticker: Ticker) {
        const delta = ticker.deltaTime;
        const fps = ticker.FPS || 30;

        this.spawnTimer += delta / fps;

        if (this.spawnTimer >= 1 / this.spawnRate) {
            this.spawnTimer = 0;
            for (let i = 0; i < this.spawnRate; i++) {
                this.view.addRandomShapeFromTop();
            }
        }

        this.view.update(this.gravity);

        this.ui.updateShapeCount(this.shapeManager.count());
        this.ui.updateArea(this.shapeManager.getTotalArea());
    }
}
