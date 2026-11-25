
// ---------------------- PART A: PROMISE ----------------------
function partA() {
    // Q1: Write checkResult(marks) that resolves "Pass" if marks are 40 or more, else rejects "Fail".
    function checkResult(marks) {
        return new Promise((resolve, reject) => {
            if (marks >= 40) resolve("Pass");
            else reject("Fail");
        });
    }
    checkResult(75).then((res) => console.log("A-Q1:", res)).catch((err) => console.log("A-Q1:", err));
    checkResult(30).then((res) => console.log("A-Q1:", res)).catch((err) => console.log("A-Q1:", err));

    // Q2: Create a promise that resolves "Result card ready" after 2 seconds using setTimeout.
    console.log("A-Q2: Preparing result card...");
    const resultCard = new Promise((resolve) => {
        setTimeout(() => resolve("Result card ready"), 2000);
    });
    resultCard.then((m) => console.log("A-Q2:", m));

    // Q3: Use Promise.race() to find which student submitted the assignment first.
    const s1 = new Promise((resolve) => setTimeout(() => resolve("Hamza submitted first"), 800));
    const s2 = new Promise((resolve) => setTimeout(() => resolve("Fatima submitted first"), 400));
    Promise.race([s1, s2]).then((winner) => console.log("A-Q3:", winner));
}

// ---------------------- PART B: CALLBACK HELL ----------------------
function partB() {
    // Q4: Write nested callbacks: give admission test -> check result -> send offer letter.
    function giveTest(cb) { setTimeout(() => { console.log("B-Q4: Test given"); cb(); }, 300); }
    function checkTest(cb) { setTimeout(() => { console.log("B-Q4: Result checked"); cb(); }, 300); }
    function sendOffer(cb) { setTimeout(() => { console.log("B-Q4: Offer letter sent"); cb(); }, 300); }
    giveTest(() => checkTest(() => sendOffer(() => console.log("B-Q4: Done"))));

    // Q5: Write callbacks for an assignment: submit -> teacher checks -> grade given.
    function submitAssignment(cb) { setTimeout(() => { console.log("B-Q5: Assignment submitted"); cb(); }, 300); }
    function teacherChecks(cb) { setTimeout(() => { console.log("B-Q5: Teacher checked it"); cb("A grade"); }, 300); }
    setTimeout(() => {
        submitAssignment(() => {
            teacherChecks((grade) => {
                console.log("B-Q5: Grade is", grade);
            });
        });
    }, 1500);

    // Q6: Rewrite the callback hell of admission (apply -> interview -> fee) using named functions to flatten it.
    function applyForm(next) { setTimeout(() => { console.log("B-Q6: Form submitted"); next(); }, 300); }
    function interview(next) { setTimeout(() => { console.log("B-Q6: Interview done"); next(); }, 300); }
    function submitFee() { setTimeout(() => { console.log("B-Q6: Fee submitted, admission confirmed"); }, 300); }
    function afterInterview() { submitFee(); }
    function afterApply() { interview(afterInterview); }
    setTimeout(() => {
        applyForm(afterApply);
    }, 3000);
}

// ---------------------- PART C: PROMISE CHAINING ----------------------
function partC() {
    // Q7: Chain promises: total marks 450 -> calculate percentage out of 500 -> print it.
    Promise.resolve(450)
        .then((total) => (total / 500) * 100)
        .then((percent) => console.log("C-Q7: Percentage:", percent + "%"));

    // Q8: Chain promises to convert a percentage to a grade: 90+ A, 80+ B, else C.
    Promise.resolve(85)
        .then((p) => (p >= 90 ? "A" : p >= 80 ? "B" : "C"))
        .then((grade) => console.log("C-Q8: Grade:", grade));

    // Q9: Return a new promise inside then(): verify the fee, then issue the roll number slip.
    function checkFee() {
        return new Promise((resolve) => setTimeout(() => resolve("Fee verified"), 500));
    }
    function issueSlip() {
        return new Promise((resolve) => setTimeout(() => resolve("Roll number slip issued"), 500));
    }
    checkFee()
        .then((m) => { console.log("C-Q9:", m); return issueSlip(); })
        .then((m) => console.log("C-Q9:", m));
}

partA();
setTimeout(partB, 2500);
setTimeout(partC, 7500);