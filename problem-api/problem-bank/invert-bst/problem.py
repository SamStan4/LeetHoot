from client import invert_bst



class BSTNode:
    def __init__(self, value):
        self.value = value  # Value of the node
        self.left = None    # Left child
        self.right = None   # Right child


class BST:
    def __init__(self):
        self.root = None  # Root of the tree
    
    # Function to insert a new value into the BST
    def insert(self, value):
        if not self.root:
            self.root = BSTNode(value)
        else:
            self._insert(self.root, value)
    
    # Helper function to recursively insert a value into the BST
    def _insert(self, node, value):
        if node is None:
            node = BSTNode(value)
        if value < node.value:  # Value is smaller, go to the left subtree
            if node.left is None:
                node.left = BSTNode(value)
            else:
                self._insert(node.left, value)
        else:  # Value is larger or equal, go to the right subtree
            if node.right is None:
                node.right = BSTNode(value)
            else:
                self._insert(node.right, value)

    def bfs(self):
        if not self.root:
            return []
        
        queue = [self.root]  # Initialize the queue with the root node
        result = []
        
        while queue:
            node = queue.pop(0)  # Dequeue the first node
            result.append(node.value)
            
            if node.left:
                queue.append(node.left)  # Enqueue left child
            if node.right:
                queue.append(node.right)  # Enqueue right child
        
        return result
    
    def to_array(self):
        if not self.root:
            return []
        
        result = []
        queue = [self.root]
        
        while queue:
            node = queue.pop(0)
            if node:
                result.append(node.value)
                queue.append(node.left)
                queue.append(node.right)
            else:
                result.append(None)
        
        # Remove trailing None values that aren't part of the complete tree
        while result and result[-1] is None:
            result.pop()
        
        return result
        

# Example Usage:
# Construct a BST
#root = None
#values = [10, 5, 15, 3, 7, 13, 18]


def test(test_case):
    print(test_case)
    treeArray = test_case['node']

    testTree = BST()
    for item in treeArray:
        if item is not None:
            testTree.insert(item)

    testTree.root = invert_bst(testTree.root)
    
    clientOutput = testTree.to_array()
    #clientOutput = clientOutput[:-1]
    print(clientOutput)
    
    return clientOutput == test_case["correct_output"]