const app = new Vue ({
    el: "#app", //elemento donde tiene que trabajar vue
    data: {
        init: {headers: {"X-API-Key": "qvOhMRQOEXwjZaojLscnjlBbupH8x7HkJJYhh4nh"}},
        members: [],
        checkedParties: ["D", "R", "ID"],
        states: [],
        selectedState: 'all'
    },

    methods: {
        getApi: function(){
            if(document.getElementById('senate')){
                return 'https://api.propublica.org/congress/v1/113/senate/members.json'
            }else if(document.getElementById('house')){
                return 'https://api.propublica.org/congress/v1/113/house/members.json'
            }
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
            for(let i=0; i<this.members.length;i++){
                if(!this.states.includes(this.members[i].state)){
                    this.states.push(this.members[i].state);
                }
            }
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
