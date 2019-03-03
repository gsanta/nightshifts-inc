import { TreeIteratorGenerator, TreeNode } from './TreeIteratorGenerator';
import { expect } from 'chai';

describe('TreeIteratorGenerator', () => {
    it ('creates an iterator which yields every node in the tree structure', () => {
        const level2Nodes: TreeNode[] = [
            <TreeNode> {
                name: 'node1',
            },
            <TreeNode> {
                name: 'node2'
            },
            <TreeNode> {
                name: 'node3'
            }
        ];

        const level1Nodes: TreeNode[] = [
            <TreeNode> {
                name: 'node4',
                children: level2Nodes
            },
            <TreeNode> {
                name: 'node5'
            }
        ];


        const rootNode = <TreeNode>  {
            name: 'node6',
            children: level1Nodes
        };

        const iterator: Iterator<any> = TreeIteratorGenerator(rootNode);

        expect(iterator.next().value).to.eql(rootNode, 'should be the root node');
        expect(iterator.next().value).to.eql(level1Nodes[0], 'should be level1Nodes[0]');
        expect(iterator.next().value).to.eql(level2Nodes[0], 'should be level2Nodes[0]');
        expect(iterator.next().value).to.eql(level2Nodes[1], 'should be level2Nodes[1]');
        expect(iterator.next().value).to.eql(level2Nodes[2], 'should be level2Nodes[2]');
        expect(iterator.next().value).to.eql(level1Nodes[1], 'should be level1Nodes[1]');
        expect(iterator.next()).to.eql(
            {
                value: undefined,
                done: true
            },
            'should be done'
        );
    });
});
