let members = data.results[0].members;
let table = document.getElementById("member-table");

document.querySelectorAll("input[name=party]").forEach(e => e.addEventListener("change",createTable))

let states = [];

for(let i=0; i<members.length;i++){
    if(!states.includes(members[i].state)){
        states.push(members[i].state);
    }
}

let select = document.getElementById("state");

for (let i = 0; i < states.length; i++) {
    let option = document.createElement("option");
    option.value = states[i];
    option.innerText = states[i];
    select.appendChild(option);
}

document.querySelector("#state").addEventListener("change", createTable);


createTable();

function createTable(){
    table.innerHTML = "";

    let thead = document.createElement("thead");
    let tr = document.createElement("tr");

    let th1 = document.createElement("th");
    th1.innerText = "Full Name";
    let th2 = document.createElement("th");
    th2.innerText = "Party";
    let th3 = document.createElement("th");
    th3.innerText = "State";
    let th4 = document.createElement("th");
    th4.innerText = "Seniority";
    let th5 = document.createElement("th");
    th5.innerText = "Votes with Party";

    tr.appendChild(th1);
    tr.appendChild(th2);
    tr.appendChild(th3);
    tr.appendChild(th4);
    tr.appendChild(th5);
    thead.appendChild(tr);
    table.appendChild(thead);

    let tbody = document.createElement("tbody");
    let checkedParties = Array.from(document.querySelectorAll("input[name=party]:checked")).map(e => e.value);

    let selectedState = document.querySelector("#state").value;

    for (let i = 0; i < members.length; i++) {

        if(checkedParties.includes(members[i].party) && (selectedState == members[i].state || selectedState == "all")){
            let tr = document.createElement("tr");

            let a = document.createElement("a");
            a.href = members[i].url;
            a.innerText = members[i].first_name + ' ' + (members[i].middle_name || '') + ' ' + members[i].last_name;

            let td1 = document.createElement("td");
            td1.appendChild(a);

            let td2 = document.createElement("td");
            td2.innerText = members[i].party;

            let td3 = document.createElement("td");
            td3.innerText = members[i].state;

            let td4 = document.createElement("td");
            td4.innerText = members[i].seniority;

            let td5 = document.createElement("td");
            td5.innerText = members[i].votes_with_party_pct + '%';

            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tr.appendChild(td5);

            tbody.appendChild(tr);
        }
    }

    table.appendChild(tbody);
}