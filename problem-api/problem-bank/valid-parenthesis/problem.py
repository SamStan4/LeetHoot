from client import valid_parenthesis

def test(test_case):
    client_output = valid_parenthesis(test_case['str'])
    return client_output == test_case['correct_output']