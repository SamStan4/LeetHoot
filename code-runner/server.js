const express = require("express");
const fs = require("fs");
const { exec } = require("child_process");
const { promisify } = require("util");

const PORT = process.env.PORT || 7321;

const app = express();

app.use(express.json());

const asyncExec = promisify(exec);

app.post("/api/v1/run", async (req, res) => {
    try {
        const { testRunnerCode, clientCode, testCases, isPartialSubmission } = req.body;

        fs.writeFileSync("main.py", testRunnerCode);
        fs.writeFileSync("client.py", clientCode);
        try {
            const { stdout, stderr } = await asyncExec(
                `time python3 main.py ${isPartialSubmission ? '--partial-submission' : ''} --test-cases '${testCases}'`,
                { timeout: 5000 }
            );

            const out = stdout.toString().trim().split('\n');
            console.log(out);

            stderrSplit = stderr.split("\n")
            const time = stderrSplit[stderrSplit.length - 2].split(/\t/)[1];

            let failIndex = null;
            for (let i = 0; i < out.length; i++) {
                const elem = out[i];
                if (elem.split(' ')[0] === 'Fail') {
                    failIndex = i;
                    break;
                }
            }

            if (failIndex !== null) return res.json({
                pass: false, failedTestCaseIndex: failIndex
            });
            res.json({ executionTime: time, pass: true });
        } catch (err) {
            console.error(err);
            return res.json({ executionTime: null, error: err, pass: false });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Something went wrong" });
    }
});

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
