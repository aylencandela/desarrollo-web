
async function getData(){
    // if(){ //que condicion deberia poner?? como reconozco que pagina es para senate o house?
    //     let senateOrHouse = 'senate'
    // }else{
    //     let senateOrHouse = 'house'
    // }

    let senateOrHouse = 'senate'

    let api = 'https://api.propublica.org/congress/v1/113/' + senateOrHouse + '/members.json'
    
    let init = {
        method: 'GET',
        headers: {
            "X-API-Key": "qvOhMRQOEXwjZaojLscnjlBbupH8x7HkJJYhh4nh"
        }
    }
    
    let members

    await fetch(api,init)
    .then(function(response){
        if(response.ok){
            return response.json()
        }else{
            throw new Error(response.status)
        }
    })
    .then(function(data){
        members = data.results[0].members
    })
    .catch(function(error){
        alert(error)
    })

    return members
}

let members = getData()
console.log(members) //que es una promise?
