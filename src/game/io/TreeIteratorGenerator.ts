
export interface TreeNode {
    children?: any[];
}

export function* TreeIteratorGenerator<T extends TreeNode>(treeNode: T) {

    yield treeNode;

    for (let child of treeNode.children || []) {
        yield * TreeIteratorGenerator(child);
    }
}
