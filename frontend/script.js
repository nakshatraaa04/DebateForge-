function formatPoints(text){

return text
.split(/[\n•.-]+/)
.filter(item => item.trim() !== "")
.map(item => "<li>"+item.trim()+"</li>")
.join("");

}


async function startDebate(){

const topic=
document.getElementById("topic")
.value
.trim();


if(!topic){

alert("Enter a debate topic");

return;

}


// loading state

document.getElementById(
"proOutput"
).innerHTML="Generating arguments...";


document.getElementById(
"conOutput"
).innerHTML="Preparing rebuttal...";


document.getElementById(
"judgeOutput"
).innerHTML=" ";


document.getElementById(
"winnerName"
).innerText="Thinking...";


document.getElementById(
"reason"
).innerText="Analyzing debate...";


document.getElementById(
"proScore"
).innerText="--";


document.getElementById(
"conScore"
).innerText="--";



try{


const response=
await fetch(

"http://127.0.0.1:8000/debate?topic="+
encodeURIComponent(topic),

{
method:"POST"
}

);


if(!response.ok){

throw new Error(
"Server returned "+
response.status
);

}


const data=
await response.json();



const proText=

data.pro ||
data.pro_argument ||
"No arguments";



const conText=

data.con ||
data.con_argument ||
"No arguments";



const judgeText=

data.judge ||
data.judge_verdict ||
"No verdict";




// winner extraction

const winnerMatch=

judgeText.match(
/Winner:\s*(Pro|Con)/i
);


let winner="Unknown";


if(winnerMatch){

winner=
winnerMatch[1]+" ";

}



// score extraction

const proScoreMatch =
judgeText.match(
/Pro Score:\s*([\d.]+\/10)/i
);

const conScoreMatch =
judgeText.match(
/Con Score:\s*([\d.]+\/10)/i
);


let proScore="--";

let conScore="--";


if(proScoreMatch){

proScore=
proScoreMatch[1];

}


if(conScoreMatch){

conScore=
conScoreMatch[1];

}



// clean reason text
let cleanReason =

judgeText

.replace(/Winner:.*$/im,"")

.replace(/Pro Score:.*$/im,"")

.replace(/Con Score:.*$/im,"")

.replace(/Reason:/i,"")

.trim();






// update cards

document.getElementById(
"proOutput"
).innerHTML=

"<ul>"+
formatPoints(proText)+
"</ul>";



document.getElementById(
"conOutput"
).innerHTML=

"<ul>"+
formatPoints(conText)+
"</ul>";









// winner section

document.getElementById(
"winnerName"
).innerText=
winner;


document.getElementById(
"reason"
).innerText=
cleanReason;


document.getElementById(
"proScore"
).innerText=
proScore;


document.getElementById(
"conScore"
).innerText=
conScore;




// dynamic color

const winnerCard=

document.getElementById(
"winnerCard"
);


winnerCard.classList.remove(
"pro-win",
"con-win"
);


if(
winner.toLowerCase()
.includes("pro")
){

winnerCard.classList.add(
"pro-win"
);

}


else if(

winner.toLowerCase()
.includes("con")

){

winnerCard.classList.add(
"con-win"
);

}


}

catch(error){

console.error(error);


document.getElementById(
"judgeOutput"
).innerHTML=

"Backend connection error";


document.getElementById(
"winnerName"
).innerText=

"Error";


document.getElementById(
"reason"
).innerText=

"Backend not responding";

}

}