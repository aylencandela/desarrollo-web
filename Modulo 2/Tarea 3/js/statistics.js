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

function createAtAGlance() {
    let tbody = document.createElement("tbody");

    function createAndFillTr(tbody, party, noRep, votesPct){
        let info = [party, noRep, votesPct]
        let tr = document.createElement("tr")
        for(let i=0; i<3; i++){
            let td = document.createElement("td")
            td.innerText = info[i]
            tr.appendChild(td)
        }
        tbody.appendChild(tr);
    }
    
    createAndFillTr(tbody, "Democrat", statistics.democrats.length, statistics.avgPartyVotesDem)
    createAndFillTr(tbody, "Republican", statistics.republicans.length, statistics.avgPartyVotesRep)
    createAndFillTr(tbody, "Independent", statistics.independents.length, statistics.avgPartyVotesInd)    

    tableAtAGlance.appendChild(tbody);
}

createAtAGlance()

function findLoyalOrEngaged (key, least, most){
    let tenPercent = Math.round(members.length/10);
    let sorted = [...members];
    sorted.sort((m1,m2) => {return m1[key] - m2[key]});

    let votesAtLowestTenPct = sorted[tenPercent][key];
    let votesAtHighestTenPct = sorted[sorted.length - tenPercent][key];
    statistics[least] = sorted.filter(m => m[key] <= votesAtLowestTenPct).reverse();
    statistics[most] = sorted.filter(m => m[key] >= votesAtHighestTenPct).reverse();
}

findLoyalOrEngaged ("missed_votes", "mostEngaged", "leastEngaged");
findLoyalOrEngaged ("votes_with_party_pct", "leastLoyal", "mostLoyal");


let leastLoyalTable = document.getElementById("leastLoyalTable");
let mostLoyalTable = document.getElementById("mostLoyalTable");
let leastEngagedTable = document.getElementById("leastEngagedTable");
let mostEngagedTable = document.getElementById("mostEngagedTable");

function createTableMostLeast (array, key, table){
    if(table != null){
        let tbody = document.createElement("tbody")
        let leastOrMost = statistics[array]
            
        for (let i = 0; i < leastOrMost.length; i++) {
            let tr = document.createElement("tr")
            let memberName = leastOrMost[i].first_name + ' ' + (leastOrMost[i].middle_name || '' ) + ' ' + leastOrMost[i].last_name
            let numPartyVotes = (leastOrMost[i].total_votes * leastOrMost[i][key] / 100).toFixed(2)
            let memberKey = leastOrMost[i][key] + "%"
            let info = [memberName, numPartyVotes, memberKey]
    
            for (let j = 0; j < 3; j++) {
                let td = document.createElement("td")  
                td.innerText = info[j]
                tr.appendChild(td)
            }
        tbody.appendChild(tr);
        }
        table.appendChild(tbody);
    }
}

createTableMostLeast("leastLoyal", "votes_with_party_pct", leastLoyalTable);
createTableMostLeast("mostLoyal", "votes_with_party_pct", mostLoyalTable);
createTableMostLeast("leastEngaged", "missed_votes", leastEngagedTable); 
createTableMostLeast("mostEngaged", "missed_votes", mostEngagedTable);