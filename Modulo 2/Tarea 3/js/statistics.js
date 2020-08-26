let statistics = {
    democrats: [],
    republicans: [],
    independents: [],
    avgPartyVotesDem:0,
    avgPartyVotesRep:0,
    avgPartyVotesInd:0,
    leastLoyal: [],
    mostLoyal: [],
    leastEngaged: [],
    mostEngaged: []

}

//10 porciento! no los ultimos 10! Filter consume mucho tiempo al buscar en todas las posiciones, conviene un while

let members = data.results[0].members;

statistics.democrats = members.filter(m=>m.party == "D");
statistics.republicans = members.filter(m=>m.party == "R");
statistics.independents = members.filter(m=>m.party == "ID");

function averagePartyVotes(array){
    let avg = 0;
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
        sum += array[i].votes_with_party_pct;
    }
    avg = Math.ceil(sum / array.length || "0");
    return avg + "%";
}

statistics.avgPartyVotesDem = averagePartyVotes(statistics.democrats);
statistics.avgPartyVotesRep = averagePartyVotes(statistics.republicans);
statistics.avgPartyVotesInd = averagePartyVotes(statistics.independents);

let tableAtAGlance = document.getElementById("atAGlance");

createAtAGlance()

function createAtAGlance() {
    
    let thead = document.createElement("thead");
    let tr = document.createElement("tr");

    let th1 = document.createElement("th");
    th1.innerText = "Party";
    let th2 = document.createElement("th");
    th2.innerText = "No. of Reps";
    let th3 = document.createElement("th");
    th3.innerText = "% Voted with Party";

    tr.appendChild(th1);
    tr.appendChild(th2);
    tr.appendChild(th3);
    thead.appendChild(tr);
    tableAtAGlance.appendChild(thead);

    let tbody = document.createElement("tbody");
    let tr1 = document.createElement("tr");

    let td1tr1 = document.createElement("td");
    td1tr1.innerText = "Democrat";

    let td2tr1 = document.createElement("td");
    td2tr1.innerText = statistics.democrats.length;

    let td3tr1 = document.createElement("td");
    td3tr1.innerText = statistics.avgPartyVotesDem;

    tr1.appendChild(td1tr1);
    tr1.appendChild(td2tr1);
    tr1.appendChild(td3tr1);

    tbody.appendChild(tr1);

    let tr2 = document.createElement("tr");

    let td1tr2 = document.createElement("td");
    td1tr2.innerText = "Republican";

    let td2tr2 = document.createElement("td");
    td2tr2.innerText = statistics.republicans.length;

    let td3tr2 = document.createElement("td");
    td3tr2.innerText = statistics.avgPartyVotesRep;

    tr2.appendChild(td1tr2);
    tr2.appendChild(td2tr2);
    tr2.appendChild(td3tr2);

    tbody.appendChild(tr2);

    let tr3 = document.createElement("tr");

    let td1tr3 = document.createElement("td");
    td1tr3.innerText = "Independent";

    let td2tr3 = document.createElement("td");
    td2tr3.innerText = statistics.independents.length;

    let td3tr3 = document.createElement("td");
    td3tr3.innerText = statistics.avgPartyVotesInd;

    tr3.appendChild(td1tr3);
    tr3.appendChild(td2tr3);
    tr3.appendChild(td3tr3);

    tbody.appendChild(tr3);
    tableAtAGlance.appendChild(tbody);
}

function leastLoyals(array){
    array.sort((m1,m2) => {return m1.votes_against_party_pct - m2.votes_against_party_pct;})
    let perc = Math.round((10 * array.length) / 100);
    let firstTenPerc = array.slice(-perc); 
    console.log(firstTenPerc);
    
    let i = (array.length - firstTenPerc.length) - 1;
    let votesAgainst = firstTenPerc.map(m => m.votes_against_party_pct);
    let leastLoyals = [...firstTenPerc]
    while(i>0){
        if(votesAgainst.includes(array[i].votes_against_party_pct)){
            leastLoyals.push(array[i]);
        }
        i--;
        console.log(array[i]);
    }

    return leastLoyals;
}

// let tenPercent = Math.round(members.length / 10);

// let sorted = [...members];
// sorted.sort((m1,m2) => {return m1.votes_with_party_pct - m2.votes_with_party_pct});

// let votesAtTenPct = sorted[tenPercent].votes_with_party_pct;

// statistics.leastLoyal = sorted.filter(m => m.votes_with_party_pct <= votesAtTenPct);