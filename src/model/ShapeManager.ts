import { ShapeModel, ShapeType } from './ShapeModel';

export class ShapeManager {
    private shapes: ShapeModel[] = [];

    add(shape: ShapeModel) {
        this.shapes.push(shape);
    }

    remove(shape: ShapeModel) {
        const idx = this.shapes.indexOf(shape);
        if (idx !== -1) this.shapes.splice(idx, 1);
    }

    getAll(): ShapeModel[] {
        return this.shapes;
    }

    updateAll(gravity: number, screenHeight: number) {
        this.shapes = this.shapes.filter(shape => {
            if (shape.isOutOfBounds(screenHeight)) {
                shape.destroy();
                return false;
            }
            return true;
        });

        this.shapes.forEach(shape => shape.update(gravity));
    }

    getTotalArea(): number {
        return this.shapes.reduce((sum, s) => sum + s.area(), 0);
    }

    getShapesByType(type: ShapeType): ShapeModel[] {
        return this.shapes.filter(s => s.shapeType === type);
    }

    count(): number {
        return this.shapes.length;
    }
}
