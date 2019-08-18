

export class RenderController {
    private readonly rerender: () => void;

    constructor(rerender: () => void) {
        this.rerender = rerender;
    }

    reRender(): void {
        this.rerender();
    }
}