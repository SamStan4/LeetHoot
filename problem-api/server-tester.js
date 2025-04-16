const fs = require("fs");
require("dotenv").config();

const clientCode = fs.readFileSync("two_sum_solution.py").toString();

fetch(`http://localhost:${process.env.PORT}/api/v1/problems/two-sum/run`,
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            clientCode: clientCode,
            stopOnFail: true,
            language: 'python3',
            testCaseIndexes: '0'
        })
    }
).then(response => {
    console.log(response.status);
    console.log(response)
    response.json().then(j => console.log(j));
})
