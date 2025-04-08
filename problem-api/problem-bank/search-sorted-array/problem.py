from client import search_sorted_array

def test(test_case):
    client_output = search_sorted_array(test_case['arr'], test_case['target'])
    return client_output in test_case['correct_output']