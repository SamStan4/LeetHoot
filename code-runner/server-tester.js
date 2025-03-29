const fs = require("fs");

const clientCode = fs.readFileSync("two_sum_solution.py").toString();

fetch("http://localhost:7321/api/v1/run",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            problem: 'two-sum',
            clientCode: clientCode,
            stopOnFail: false,
            language: 'python3',
            testCaseIndexes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
        })
    }
).then(response => {
    console.log(response.status);
    response.json().then(j => console.log(j));
})
