from client import two_sum

def test(test_case):
    client_output = two_sum(test_case['nums'], test_case['target'])
    return client_output in test_case['correct_output']
