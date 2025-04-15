def valid_parenthesis(str):
	stack = []
	hash = {')': '(', ']': '[', '}': '{'}
	for char in str:
		if char in hash:
			if stack and stack[-1] == hash[char]:
				stack.pop()
			else:
				return False
		else:
			stack.append(char)
	return not stack