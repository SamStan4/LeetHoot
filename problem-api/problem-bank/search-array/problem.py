from client import search_array

def test(test_case):
    client_output = search_array(test_case["nums"], test_case["target"])

    return client_output == test_case["correct_output"]