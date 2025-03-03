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
        const { testRunnerCode, clientCode } = req.body;

        fs.writeFileSync("main.py", testRunnerCode);
        fs.writeFileSync("client.py", clientCode);

        const { stdout, stderr } = await asyncExec("time python3 main.py");

        const out = stdout.toString().trim();
        console.log(out);

        stderrSplit = stderr.split("\n")
        const time = stderrSplit[stderrSplit.length - 2].split(/\t/)[1];

        res.json({ executionTime: time });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Something went wrong" });
    }
});

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
