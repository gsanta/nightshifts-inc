

export interface Tool {
    getName(): string;
    isCarrying(): boolean;
    setCarrying(carrying: boolean): Tool;
    getIcon(iconSize: number): JSX.Element;
}
