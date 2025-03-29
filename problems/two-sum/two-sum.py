from client import two_sum
import argparse
import json

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('--partial-submission', action='store_true')
    parser.add_argument('--test-cases', required=True, type=str)
    args = parser.parse_args()

    test_cases = json.loads(args.test_cases)['test_cases']

    import sys
    for module in ["os", "subprocess", "shutil", "ctypes", "sys"]:
        sys.modules.pop(module, None)

    for i, test_case in enumerate(test_cases):
        client_output = two_sum(test_case['nums'], test_case['target'])
        if client_output not in test_case['correct_output']:
            print(f'Fail {i}')
        else:
            print(f'Pass {i}')
        if args.partial_submission and i == 2:
            break
