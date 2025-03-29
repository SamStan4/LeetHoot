const express = require("express");
const fs = require("fs");
const { exec } = require("child_process");
const { promisify } = require("util");

const PORT = process.env.PORT || 7321;

const app = express();

app.use(express.json());

const asyncExec = promisify(exec);

const cleanup = () => {
    try {
        fs.unlink('client.py', _ => { });
        fs.unlink('problem.py', _ => { });
        fs.unlink('out', _ => { });
    } catch (err) { console.error(err) }
}

const parseTime = (timeStr) => {
    const match = timeStr.match(/(\d+)m([\d.]+)s/);
    if (!match) return null;

    const minutes = parseInt(match[1], 10);
    const seconds = parseFloat(match[2]);

    return minutes * 60000 + seconds * 1000; // Convert to milliseconds
}

const sumTimes = (timeStrs) => {
    const totalMs = timeStrs.reduce((sum, time) => sum + parseTime(time), 0);

    const minutes = Math.floor(totalMs / 60000);
    const seconds = ((totalMs % 60000) / 1000).toFixed(3);

    return `${minutes}m${seconds}s`;
}

app.post("/api/v1/run", async (req, res) => {
    try {
        const {
            testRunnerCode,
            clientCode,
            testCases: tests,
            stopOnFail,
            language,
        } = req.body;

        if (language !== 'python3')
            throw new Error(`Unsupported language ${language}`);

        fs.writeFileSync("problem.py", testRunnerCode);
        fs.writeFileSync("client.py", clientCode);

        const testCases = JSON.parse(tests).test_cases;

        const results = [];
        let pass = true;
        let killed = false;

        let runnerPath = '';
        switch (language) {
            case 'python3':
                runnerPath = 'main.py';
                break;
        }

        for (let i = 0; i < testCases.length; i++) {
            try {
                const testCase = testCases[i];

                args = [
                    'time',
                    'python3',
                    runnerPath,
                    '--test-case',
                    `'${JSON.stringify({ test_case: testCase })}'`,
                ].join(' ');

                const { stdout: _stdout, stderr: _stderr } = await asyncExec(args, { timeout: 5000 });

                const out = fs.readFileSync("out", { encoding: 'utf-8' });
                stderrSplit = _stderr.split("\n")
                const time = stderrSplit[stderrSplit.length - 2].split(/\t/)[1];
                const stdout = _stdout ? _stdout.toString().trim() : '';

                const passedCase = out === 'Pass';

                const result = {
                    pass: passedCase,
                    killed: false,
                    time: time,
                    stdout: stdout,
                    stderr: '',
                }

                results.push(result);


                if (!passedCase) {
                    pass = false;
                    if (stopOnFail) break;
                }
            } catch (err) {
                console.error(err);
                const result = {
                    pass: false,
                    killed: err.killed || err.code === 'ERR_CHILD_PROCESS_STDIO_MAXBUFFER',
                    stdout: err.stdout,
                    stderr: err.stderr,
                }

                pass = false;

                results.push(result);

                if (err.killed || err.code === 'ERR_CHILD_PROCESS_STDIO_MAXBUFFER') {
                    killed = true;
                    break;
                }

                if (stopOnFail) {
                    break;
                }
            }
        }

        const time = pass ? sumTimes(results.map(testCase => testCase.time)) : undefined;

        cleanup();

        res.json({
            pass: pass,
            time: time,
            killed: killed,
            results: results,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Something went wrong" });
    }
});

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
