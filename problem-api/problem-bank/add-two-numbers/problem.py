from client import add_two_numbers

class ListNode:

    def __init__(self, val):
        self.val = val
        self.next = None

class LinkedList:

    def __init__(self):
        self.head = None
    
    def insert(self, data):
        newNode = ListNode(data)
        if not self.head:
            self.head = newNode
            return
        lastNode = self.head
        while lastNode.next:
            lastNode = lastNode.next
        lastNode.next = newNode
    
    def convertToArray(self):
        newList = []
        node = self.head

        while node:
            newList.append(node.val)

        return newList
    
def ConvertToList(arr):
    newList = LinkedList()

    for i in arr:
        newList.insert(i)

    return newList

def test(test_case):
    l1 = ConvertToList(test_case["l1"])
    l2 = ConvertToList(test_case["l2"])

    clientOutput = add_two_numbers(l1, l2)

    clientSolution = clientOutput.convertToArray()

    return clientSolution == test_case["correct_output"]