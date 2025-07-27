import * as PIXI from 'pixi.js';

export type ShapeType = 'triangle' | 'square' | 'pentagon' | 'hexagon' | 'circle' | 'ellipse' | 'cloud';

export class ShapeModel {
    public gfx: PIXI.Graphics;
    public vx: number = 0;
    public vy: number = 0;
    public shapeType: ShapeType;
    public size: number = 50;
    public color: number;

    constructor(shapeType: ShapeType, color: number) {
        this.shapeType = shapeType;
        this.color = color;
        this.gfx = new PIXI.Graphics();
        this.draw();
        this.gfx.interactive = true;
        this.gfx.cursor = "pointer";
    }

    public draw(): void {
        const g = this.gfx;
        g.clear();

        switch (this.shapeType) {
            case 'circle':
                g.circle(0, 0, this.size);
                break;
            case 'ellipse':
                g.ellipse(0, 0, this.size, this.size * 0.6);
                break;
            case 'cloud':
                this.drawCloud();
                break;
            default:
                this.drawPolygon(this.sidesFromType());
        }

        g.fill(this.color);
    }

    private sidesFromType(): number {
        switch (this.shapeType) {
            case 'triangle': return 3;
            case 'square': return 4;
            case 'pentagon': return 5;
            case 'hexagon': return 6;
            default: return 3;
        }
    }

    private drawPolygon(sides: number): void {
        this.gfx.fill({ color: this.color });
        this.gfx.regularPoly(
            0,
            0,
            this.size,
            sides
        );
    }

    private drawCloud(): void {
        const g = this.gfx;
        const s = this.size * 1.5;

        g.moveTo(-s * 0.6, 0);

        g.arc(-s * 0.5, 0, s * 0.25, Math.PI / 2, -Math.PI / 2);
        g.arc(-s * 0.4, -s * 0.4, s * 0.2, Math.PI, 0);
        g.arc(0, -s * 0.5, s * 0.25, Math.PI, 0);
        g.arc(s * 0.4, -s * 0.4, s * 0.2, Math.PI, 0);

        g.arc(s * 0.5, 0, s * 0.25, -Math.PI / 2, Math.PI / 2);
        g.arc(s * 0.4, s * 0.4, s * 0.2, 0, Math.PI);
        g.arc(0, s * 0.5, s * 0.25, 0, Math.PI);
        g.arc(-s * 0.4, s * 0.4, s * 0.2, 0, Math.PI);

        g.closePath();
    }

    public update(gravity: number): void {
        if (gravity !== 0) {
            this.vy += gravity/2;
            this.gfx.y += this.vy/2;
            this.gfx.x += this.vx/2;
        }
    }

    public isOutOfBounds(height: number): boolean {
        return this.gfx.y - this.size - 20 > height;
    }

    public area(): number {
        switch (this.shapeType) {
            case 'circle':
                return Math.PI * this.size * this.size;
            case 'ellipse':
                return Math.PI * this.size * (this.size * 0.6);
            case 'cloud':
                return this.getCloudArea();
            default:
                const s = this.size;
                const n = this.sidesFromType();
                return 0.25 * n * s * s / Math.tan(Math.PI / n);
        }
    }

    public setColor(color: number): void {
        this.color = color;
        this.draw();
    }

    public destroy(): void {
        if (this.gfx.parent) {
            this.gfx.parent.removeChild(this.gfx);
        }
        this.gfx.destroy();
    }

    private getCloudArea(): number {
        const s = this.size * 1.5;

        const r25 = 0.25 * s;
        const r20 = 0.2 * s;

        const a25 = 0.5 * Math.PI * r25 * r25;
        const a20 = 0.5 * Math.PI * r20 * r20;

        const totalArea = 4 * a25 + 4 * a20;

        return totalArea;
    }
}
