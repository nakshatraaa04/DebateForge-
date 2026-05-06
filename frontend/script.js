function formatPoints(text){
return text
.split(/[\n•.-]+/)
.filter(item => item.trim() !== "")
.map(item => "<li>" + item.trim() + "</li>")
.join("");
}

async function startDebate(){

const topic = document.getElementById("topic").value.trim();

if(!topic){
alert("Enter a debate topic");
return;
}

// loading text
document.getElementById("proOutput").innerHTML="Generating arguments...";
document.getElementById("conOutput").innerHTML="Preparing rebuttal...";
document.getElementById("judgeOutput").innerHTML="Judge analyzing...";

try{

const response=await fetch(
"http://127.0.0.1:8000/debate?topic="+encodeURIComponent(topic),
{ method:"POST" }
);

if(!response.ok){
throw new Error("Server returned "+response.status);
}

const data=await response.json();

const proText = data.pro || data.pro_argument;
const conText = data.con || data.con_argument;
const judgeText = data.judge || data.judge_verdict;

// ===============================
// ✅ FIXED WINNER EXTRACTION
// ===============================
const match = judgeText.match(/Winner:\s*(Pro|Con)/i);

let winner = "Unknown";

if(match){
winner = match[1]; // "Pro" or "Con"
}

// ===============================
// UI OUTPUT
// ===============================

// bullet points
document.getElementById("proOutput").innerHTML =
"<ul>"+formatPoints(proText)+"</ul>";

document.getElementById("conOutput").innerHTML =
"<ul>"+formatPoints(conText)+"</ul>";

// winner styling class
const winnerClass = winner.toLowerCase();

// remove "Winner:" line from reason
const cleanReason = judgeText.replace(/Winner:\s*(Pro|Con)/i, "").trim();

document.getElementById("judgeOutput").innerHTML =
`
<div class="winner-box">
    <h2>🏆 Debate Winner</h2>

    <div class="winner-name ${winnerClass}">
        ${winner} Agent
    </div>

    <div class="judge-reason">
        ${cleanReason}
    </div>
</div>
`;

}

catch(error){
console.error(error);

document.getElementById("judgeOutput").innerHTML =
"Connection error. Check backend.";
}

}