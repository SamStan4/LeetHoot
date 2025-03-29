from client import two_sum

test_cases = [
    {
        'nums': [2, 7, 11, 15],
        'target': 9,
        'correct_output': [0, 1],
    },
    {
        'nums': [3, 2, 4],
        'target': 6,
        'correct_output': [1,2],
    },
    {
        'nums': [3, 3],
        'target': 6,
        'correct_output': [0, 1]
    }
]

if __name__ == "__main__":
    counter = 0
    for i, test_case in enumerate(test_cases):
        client_output = two_sum(test_case['nums'], test_case['target'])
        if client_output != test_case['correct_output']:
            print(f'Fail {i}')
        else:
            print(f'Pass {i}')
