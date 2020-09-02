let statistics = {
    democrats: [],
    republicans: [],
    independents: [],
    leastLoyal: [],
    mostLoyal: [],
    leastEngaged: [],
    mostEngaged: []
}

let members = data.results[0].members

statistics.democrats = members.filter(m=>m.party == "D")
statistics.republicans = members.filter(m=>m.party == "R")
statistics.independents = members.filter(m=>m.party == "ID")

function average(party, key){
    let avg = 0
    let sum = 0
    for (let i = 0; i < party.length; i++) {
        sum += party[i][key]
    }
    avg = Math.round(sum / party.length || "0")
    return avg + "%"
}

let atAGlanceLoyal = document.getElementById("atAGlanceLoyal")
let atAGlanceAttendance = document.getElementById("atAGlanceAttendance")

function createRow(tbody, party, noRep, avgValue){
    let info = [party, noRep, avgValue]
    let tr = document.createElement("tr")
    for(let i=0; i<3; i++){
        let td = document.createElement("td")
        td.innerText = info[i]
        tr.appendChild(td)
    }
    tbody.appendChild(tr)
}

function createAtAGlance(table, key){
    if(table != null){
        let tbody = document.createElement("tbody")
        
        createRow(tbody, "Democrat", statistics.democrats.length, average(statistics.democrats, key))
        createRow(tbody, "Republican", statistics.republicans.length, average(statistics.republicans, key))
        createRow(tbody, "Independent", statistics.independents.length, average(statistics.independents, key))    
        createRow(tbody, "Total", members.length, average(members, key))

        table.appendChild(tbody)
    }
}

createAtAGlance(atAGlanceLoyal, "votes_with_party_pct")
createAtAGlance(atAGlanceAttendance, "missed_votes_pct")

function findLoyalOrEngaged (key, least, most){
    let tenPercent = Math.round(members.length/10)
    let sorted = [...members]
    sorted.sort((m1,m2) => {return m1[key] - m2[key]})

    let votesAtLowestTenPct = sorted[tenPercent][key]
    let votesAtHighestTenPct = sorted[sorted.length - tenPercent][key]
    statistics[least] = sorted.filter(m => m[key] <= votesAtLowestTenPct).reverse()
    statistics[most] = sorted.filter(m => m[key] >= votesAtHighestTenPct).reverse()
}

findLoyalOrEngaged ("missed_votes_pct", "mostEngaged", "leastEngaged")
findLoyalOrEngaged ("votes_with_party_pct", "leastLoyal", "mostLoyal")


let leastLoyalTable = document.getElementById("leastLoyalTable")
let mostLoyalTable = document.getElementById("mostLoyalTable")
let leastEngagedTable = document.getElementById("leastEngagedTable")
let mostEngagedTable = document.getElementById("mostEngagedTable")

function createTableMostLeast (array, key, table){
    if(table != null){
        let tbody = document.createElement("tbody")
        let leastOrMost = statistics[array]
            
        for (let i = 0; i < leastOrMost.length; i++) {
            let tr = document.createElement("tr")
            let memberName = leastOrMost[i].first_name + ' ' + (leastOrMost[i].middle_name || '' ) + ' ' + leastOrMost[i].last_name
            let numVotes = Math.round(leastOrMost[i].total_votes * leastOrMost[i][key] / 100)
            let memberKey = leastOrMost[i][key] + "%"
            let info = [memberName, numVotes, memberKey]
    
            for (let j = 0; j < 3; j++){
                let td = document.createElement("td")  
                td.innerText = info[j]
                tr.appendChild(td)
            }
        tbody.appendChild(tr)
        }
        table.appendChild(tbody)
    }
}

createTableMostLeast("leastLoyal", "votes_with_party_pct", leastLoyalTable)
createTableMostLeast("mostLoyal", "votes_with_party_pct", mostLoyalTable)
createTableMostLeast("leastEngaged", "missed_votes_pct", leastEngagedTable)
createTableMostLeast("mostEngaged", "missed_votes_pct", mostEngagedTable)