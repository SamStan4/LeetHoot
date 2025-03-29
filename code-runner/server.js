const express = require("express");
const fs = require("fs/promises");
const { exec } = require("child_process");
const { promisify } = require("util");
const { performance } = require('perf_hooks');

const PORT = process.env.PORT || 7321;

const app = express();

app.use(express.json());

const asyncExec = promisify(exec);

const cleanup = (requestNumber) => {
    try {
        fs.rm(
            `${requestNumber}`,
            { recursive: true, force: true },
            err => console.error(err)
        );
    } catch (err) { console.error(err) }
}

let requestNumber = 0;

app.post("/api/v1/run", async (req, res) => {
    try {
        requestNumber = (requestNumber + 1) % 100000;
        const reqNum = requestNumber;

        const {
            testCaseIndexes,
            clientCode,
            problem,
            stopOnFail,
            language,
        } = req.body;

        if (language !== 'python3')
            throw new Error(`Unsupported language ${language}`);

        const testCases = await JSON.parse(
            await fs.readFile(`../problem-bank/${problem}/test-cases.json`,
                { encoding: 'utf-8' })
        ).test_cases;

        const problemCode = await fs.readFile(
            `../problem-bank/${problem}/problem.py`,
            { encoding: 'utf-8' }
        );

        const runnerCode = await fs.readFile(
            `../problem-bank/runner.py`,
            { encoding: 'utf-8' }
        );

        try {
            await fs.mkdir(`${reqNum}`, {}, err => console.error(err));
        } catch { };
        await fs.writeFile(`${reqNum}/problem.py`, problemCode);
        await fs.writeFile(`${reqNum}/client.py`, clientCode);
        await fs.writeFile(`${reqNum}/runner.py`, runnerCode)

        const results = [];
        let pass = true;
        let killed = false;

        for (let i = 0; i < testCaseIndexes.length; i++) {
            const index = testCaseIndexes[i];
            if (index >= testCases.length) throw new Error('Invalid index');
            try {

                const testCase = { test_case: testCases[index] };

                await fs.writeFile(
                    `${reqNum}/test-case.json`,
                    JSON.stringify(testCase)
                );

                args = [
                    'python3',
                    `${reqNum}/runner.py`,
                ].join(' ');

                const startTime = performance.now();
                const { stdout: _stdout, stderr: _stderr } = await asyncExec(args, { timeout: 10000 });
                const endTime = performance.now();

                const time = Number((endTime - startTime).toFixed(2));
                const out = await fs.readFile(`${reqNum}/out`, { encoding: 'utf-8' });
                const stdout = _stdout ? _stdout.toString().trim() : '';
                const stderr = _stderr ? _stderr.toString().trim() : '';

                const passedCase = out === 'Pass';

                const result = {
                    pass: passedCase,
                    killed: false,
                    time: time,
                    stdout: stdout,
                    stderr: stderr,
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

        const time = pass ? results.reduce((sum, testCase) => sum + Number(testCase.time), 0) : undefined;

        cleanup(reqNum);

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
