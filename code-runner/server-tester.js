const fs = require("fs");

const testRunnerCode = fs.readFileSync("../problems/two-sum/two-sum.py").toString();
const testCases = fs.readFileSync("../problems/two-sum/test-cases.json").toString();
const clientCode = fs.readFileSync("two_sum_solution.py").toString();

fetch("http://localhost:7321/api/v1/run",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            testRunnerCode: testRunnerCode,
            clientCode: clientCode,
            testCases: testCases,
            isPartialSubmission: true,
        })
    }
).then(response => {
    console.log(response.status);
    response.json().then(j => console.log(j));
})
