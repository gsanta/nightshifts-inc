

export class RenderController {
    private render: () => void;

    setRender(render: () => void) {
        this.render = render;
    }

    reRender(): void {
        if (this.render) {
            this.render();
        }
    }
}