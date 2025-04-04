def invert_bst(node):
    if not node:
        return node
    node.left, node.right = node.right, node.left
    invert_bst(node.left)
    invert_bst(node.right)
    return node