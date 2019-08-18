

export interface ToolIcon {
    readonly name: string;
    isCarrying: boolean;
    isActive: boolean;
    storageIndex: number;
    getIcon(iconSize: number): JSX.Element;
}
