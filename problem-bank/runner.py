import argparse
import json
from problem import test

if __name__ == '__main__':
    import os

    abspath = os.path.abspath(__file__)
    dname = os.path.dirname(abspath)
    os.chdir(dname)

    parser = argparse.ArgumentParser()
    parser.add_argument('--test-case', required=True, type=str)
    args = parser.parse_args()
    test_case = json.loads(args.test_case)['test_case']

    with open('out', 'w') as f:
        import sys
        for module in ["os", "subprocess", "shutil", "ctypes", "sys"]:
            sys.modules.pop(module, None)

        if test(test_case):
            f.write(f'Pass')
        else:
            f.write(f'Fail')
