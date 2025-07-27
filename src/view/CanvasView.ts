import * as PIXI from 'pixi.js';
import { ShapeModel, ShapeType } from '../model/ShapeModel';
import { ShapeManager } from '../model/ShapeManager';

export class CanvasView {
    private readonly app: PIXI.Application;
    private shapeManager: ShapeManager;
    private container: HTMLElement;
    private shapeTypes: ShapeType[] = ['triangle', 'square', 'pentagon', 'hexagon', 'circle', 'ellipse', 'cloud'];

    constructor(containerId: string, shapeManager: ShapeManager) {
        this.container = document.getElementById(containerId)!;
        this.shapeManager = shapeManager;

        this.app = new PIXI.Application();

    }

    public async initApp() {
        await this.app.init({
            autoStart: true,
            sharedTicker: true,
            width: this.container.clientWidth,
            height: this.container.clientHeight,
            backgroundAlpha: 0,
        });


        this.container.appendChild(this.app.canvas);

        this.app.canvas.addEventListener('contextmenu', (e) => e.preventDefault());
        this.app.canvas.addEventListener('pointerdown', this.handleClick.bind(this));
    }


    private handleClick(e: PointerEvent) {
        const rect = this.app.canvas.getBoundingClientRect();
        const pos = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };

        for (let shape of this.shapeManager.getAll()) {
            const bounds = shape.gfx.getBounds();

            const point = new PIXI.Point(pos.x, pos.y);
            if (bounds.containsPoint(point.x, point.y)) {
                if (e.button === 0) {
                    this.app.stage.removeChild(shape.gfx);
                    this.shapeManager.remove(shape);
                } else if (e.button === 2) {
                    const same = this.shapeManager.getShapesByType(shape.shapeType);
                    for (let s of same) {
                        const newColor = this.randomColor();
                        s.setColor(newColor);
                    }
                }
                return;
            }
        }

        if (e.button === 0) {
            const newShape = this.createRandomShape();
            newShape.gfx.x = pos.x;
            newShape.gfx.y = pos.y;
            this.app.stage.addChild(newShape.gfx);
            this.shapeManager.add(newShape);
        }
    }

    public update(gravity: number) {
        this.shapeManager.updateAll(gravity, this.app.renderer.height);
    }

    public addRandomShapeFromTop() {
        const shape = this.createRandomShape();
        shape.gfx.x = shape.size / 2 +Math.random() * (this.app.renderer.width - shape.size);
        shape.gfx.y = -shape.size;
        this.app.stage.addChild(shape.gfx);
        this.shapeManager.add(shape);
    }

    private createRandomShape(): ShapeModel {
        const type = this.shapeTypes[Math.floor(Math.random() * this.shapeTypes.length)];
        const color = this.randomColor();
        return new ShapeModel(type, color);
    }

    private randomColor(): number {
        return Math.random() * 0xffffff;
    }

    public getApp(): PIXI.Application {
        return this.app;
    }
}
