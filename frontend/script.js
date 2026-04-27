async function startDebate(){

const topic=document.getElementById("topic").value;

document.getElementById("proOutput").innerText =
"Generating arguments...";

document.getElementById("conOutput").innerText =
"Preparing rebuttal...";

document.getElementById("judgeOutput").innerText =
"Judge analyzing...";

try{

const response=await fetch(
"http://127.0.0.1:8000/debate?topic="+encodeURIComponent(topic),
{
method:"POST"
}
);

if(!response.ok){
throw new Error("Server returned "+response.status);
}

const data=await response.json();

document.getElementById("proOutput").innerText=data.pro;
document.getElementById("conOutput").innerText=data.con;
document.getElementById("judgeOutput").innerText=data.judge;

}

catch(error){
console.error(error);

document.getElementById("judgeOutput").innerText =
"Connection error. Check backend server.";
}

}