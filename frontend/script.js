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

// bullet points
document.getElementById("proOutput").innerHTML =
"<ul>"+formatPoints(proText)+"</ul>";

document.getElementById("conOutput").innerHTML =
"<ul>"+formatPoints(conText)+"</ul>";

let winner="Tie";

if(judgeText.toLowerCase().includes("pro")){
winner="Pro Agent 🟢";
}
else if(judgeText.toLowerCase().includes("con")){
winner="Con Agent 🔴";
}

document.getElementById("judgeOutput").innerHTML =
`
<div class="winner-box">
<h2>🏆 Debate Winner</h2>

<div class="winner-name">
${winner}
</div>

<div class="judge-reason">
${judgeText}
</div>

</div>
`;}

catch(error){
console.error(error);
document.getElementById("judgeOutput").innerHTML=
"Connection error.";
}

}