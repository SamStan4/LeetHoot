const fs = require("fs");

const testRunnerCode = fs.readFileSync("main-test.py").toString();
const clientCode = fs.readFileSync("client-test.py").toString();

fetch("http://localhost:7321/api/v1/run",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            testRunnerCode: testRunnerCode,
            clientCode: clientCode,
        })
    }
).then(response => {
    console.log(response.status);
    response.json().then(j => console.log(j));
})
