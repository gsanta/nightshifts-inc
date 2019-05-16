

export interface ToolIconRenderer {
    clone(): ToolIcon;
}

export interface ToolIcon {
    readonly name: string;
    readonly isCarrying: boolean;
    readonly isActive: boolean;
    getIcon(iconSize: number): JSX.Element;
}
