import json
from problem import test

if __name__ == '__main__':
    import os

    abspath = os.path.abspath(__file__)
    dname = os.path.dirname(abspath)
    os.chdir(dname)

    with open("test-case.json", "r") as file:
        test_case = json.load(file)['test_case']

    with open('out', 'w') as f:
        import sys
        for module in ["os", "subprocess", "shutil", "ctypes", "sys"]:
            sys.modules.pop(module, None)

        if test(test_case):
            f.write(f'Pass')
        else:
            f.write(f'Fail')
