

export interface ToolIcon {
    getName(): string;
    isCarrying(): boolean;
    setCarrying(carrying: boolean): ToolIcon;
    getIcon(iconSize: number): JSX.Element;
}
