const app = new Vue ({
    el: "#app", //elemento donde tiene que trabajar vue
    data: {
        init: {headers: {"X-API-Key": "qvOhMRQOEXwjZaojLscnjlBbupH8x7HkJJYhh4nh"}},
        members: [],
        checkedParties: ["D", "R", "ID"],
        states: [],
        selectedState: 'all',
        democrats: [],
        republicans: [],
        independents: [],
        leastEngaged: [],
        mostEngaged: [],
        leastLoyal: [],
        mostLoyal: []
    },

    methods: {
        getApi: function(){
            if(document.getElementById('senate')){
                return 'https://api.propublica.org/congress/v1/113/senate/members.json'
            }else if(document.getElementById('house')){
                return 'https://api.propublica.org/congress/v1/113/house/members.json'
            }
        },
        getStates: function(){
            for(let i=0; i<this.members.length;i++){
                if(!this.states.includes(this.members[i].state)){
                    this.states.push(this.members[i].state);
                }
            }
        },
        average: function(party, key){
            let avg = 0
            let sum = 0
            for (let i = 0; i < party.length; i++) {
                sum += party[i][key]
            }
            avg = Math.round(sum / party.length || "0")
            return avg + "%"
        },
        findLoyalOrEngaged: function(key, least, most){
            let tenPercent = Math.round(this.members.length/10)
            let sorted = [...this.members]
            sorted.sort((m1,m2) => {return m1[key] - m2[key]})
        
            let votesAtLowestTenPct = sorted[tenPercent][key]
            let votesAtHighestTenPct = sorted[sorted.length - tenPercent][key]
            this[most] = sorted.filter(m => m[key] <= votesAtLowestTenPct)
            this[least] = sorted.filter(m => m[key] >= votesAtHighestTenPct).reverse()
        },
        numberOfVotes: function(member,key){
            return Math.round(member.total_votes * member[key] / 100)
        }
    },

    created: function(){
        fetch(this.getApi(),this.init)
        .then(function(resp){
            if(resp.ok){
                return resp.json()
            }else{
                throw new Error(resp.status)
            }
        })
        .then(data => {
            this.members = data.results[0].members
            this.getStates()
            this.democrats = this.members.filter(m=>m.party == "D")
            this.republicans = this.members.filter(m=>m.party == "R")
            this.independents = this.members.filter(m=>m.party == "ID")
            this.findLoyalOrEngaged("missed_votes_pct", "leastEngaged", "mostEngaged")
            this.findLoyalOrEngaged("votes_with_party_pct", "mostLoyal", "leastLoyal")
        })
        .catch(function(error){
            alert(error)
        })
    },
    
    computed: {
        filtered: function (){
            return this.members.filter(m => 
                this.checkedParties.includes(m.party) && (this.selectedState == m.state || this.selectedState == "all")
            )
        },
    }
})
