let statistics = {
    democrats: [],
    republicans: [],
    independents: [],
    avg_party_votes_dem:0,
}

let members = data.results[0].members;

for(let i=0; i<members.length; i++){
    if(members[i].party == "R"){statistics.republicans.push(member[i])}
    if(members[i].party == "D"){statistics.republicans.push(member[i])}
    if(members[i].party == "ID"){statistics.republicans.push(member[i])}
}

function averagePartyVotes(array){
    let avg = 0;
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
        sum += array[i].votes_with_party_pct;
    }

    avg = Math.ceil(sum / array.length);


    return avg + "%";
}