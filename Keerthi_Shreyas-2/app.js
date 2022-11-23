const {getPersonById,sameEmail,manipulateIp,sameBirthday} = require("./people")
const {listShareholders,totalShares,listStocks,getStockById} = require("./stocks")
async function main(){
    try {
        //people.js
        const gpbid = await getPersonById("7989fa5e-8f3f-458d-ad58-23c8d9ef5a10")
        //console.log(gpbid)
        const smeail = await sameEmail("harvard.edu")
        //console.log(smeail)
        const manip = await manipulateIp()
        //console.log(manip)
        const sambar = await sameBirthday("09", "25")
        //console.log(sambar)
        

        //stocks.js
        const shareHolders = await listShareholders("Aeglea BioTherapeutics, Inc.")
        //console.log(shareHolders)
        const tts = await totalShares('Aeglea BioTherapeutics, Inc.')
        //console.log(tts)
        const listox = await listStocks("Grenville", "Pawelke" )
        //console.log(listox)
        const gsbid = await getStockById("f652f797-7ca0-4382-befb-2ab8be914ff0")
        //console.log(gsbid)
    } catch(e) {
        console.log(e)
    }
}

//call main
main();