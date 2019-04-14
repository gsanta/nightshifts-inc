
export interface ToolActivationPlugin {
    toolName: string;
    activate(): void;
    deactivate(): void;
}
