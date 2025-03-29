const fs = require("fs");

const problemCode = fs.readFileSync("../problem-bank/two-sum/two-sum.py").toString();
const testCases = fs.readFileSync("../problem-bank/two-sum/test-cases.json").toString();
const clientCode = fs.readFileSync("two_sum_solution.py").toString();
const runnderCode = fs.readFileSync("../problem-bank/runner.py").toString();

fetch("http://localhost:7321/api/v1/run",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            problemCode: problemCode,
            clientCode: clientCode,
            runnerCode: runnderCode,
            testCases: testCases,
            stopOnFail: false,
            language: 'python3',
        })
    }
).then(response => {
    console.log(response.status);
    response.json().then(j => console.log(j));
})
