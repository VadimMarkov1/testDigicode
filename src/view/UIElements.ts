export class UIElements {
    shapeCountInput = document.getElementById('shape-count') as HTMLInputElement;
    areaInput = document.getElementById('shape-area') as HTMLInputElement;
    spawnRateInput = document.getElementById('spawn-rate') as HTMLInputElement;
    gravityInput = document.getElementById('gravity-value') as HTMLInputElement;

    incSpawn = document.getElementById('spawn-inc')!;
    decSpawn = document.getElementById('spawn-dec')!;
    incGravity = document.getElementById('gravity-inc')!;
    decGravity = document.getElementById('gravity-dec')!;

    updateShapeCount(count: number) {
        this.shapeCountInput.value = count.toString();
    }

    updateArea(area: number) {
        this.areaInput.value = area.toFixed(0);
    }

    updateSpawnRate(rate: number) {
        this.spawnRateInput.value = rate.toString();
    }

    updateGravity(gravity: number) {
        this.gravityInput.value = gravity.toFixed(2);
    }

    onIncSpawn(cb: () => void) {
        this.incSpawn.addEventListener('click', cb);
    }

    onDecSpawn(cb: () => void) {
        this.decSpawn.addEventListener('click', cb);
    }

    onIncGravity(cb: () => void) {
        this.incGravity.addEventListener('click', cb);
    }

    onDecGravity(cb: () => void) {
        this.decGravity.addEventListener('click', cb);
    }
}
