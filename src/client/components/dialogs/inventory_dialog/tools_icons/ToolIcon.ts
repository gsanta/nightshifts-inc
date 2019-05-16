

export interface ToolIconRenderer {
    clone(): ToolIcon;
}

export interface ToolIcon {
    readonly name: string;
    readonly isCarrying: boolean;
    readonly isActive: boolean;
    readonly storageIndex: number;
    getIcon(iconSize: number): JSX.Element;
}
