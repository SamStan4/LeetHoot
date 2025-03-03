from client import f

def correct_output():
    return 7

if __name__ == "__main__":
    counter = 0
    for i in range(10):
        client_output = f(i, i -1)
        if client_output != correct_output():

            # Should write to a file instead because the client could
            # print polluting stdout

            print(f'Fail on testcase {counter}')

        counter += 1
        
