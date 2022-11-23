const axios = require('axios')


const strchk = function(str){
    if(str==null||!str||typeof str != "string"||!str.replace(/\s/g, '').length){
        throw new Error("Invalid string id")
    } 
}

const retchk = function(ret){
    if(ret==null||!ret){
        throw new error
    }
}

async function getPeople(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json')
    return data // this will be the array of people objects
}

async function getStocks(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json')
    return data // this will be the array of people objects
}

function isObject(objValue) {
    return objValue && typeof objValue === 'object' && objValue.constructor === Object;
}

async function getPersonById(id) {
    strchk(id)
    let ppl = await getPeople()
    let person = []
    for(let i = 0; i<ppl.length;i++){
        if (ppl[i].id === id){
            person = ppl[i]
        }
    }
    retchk(person)
    if(typeof person != "object"){
        throw new Error("person not found")
    }
    
    return [person.first_name,person.last_name]
}

async function gibn(firstName,lastName) {
    strchk(firstName)
    strchk(lastName)
    let ppl = await getPeople()
    let pid = null
    for(let i = 0; i<ppl.length;i++){
        if ((ppl[i].first_name === firstName) && (ppl[i].first_name === firstName)){
            pid = ppl[i].id
        }
    }
    
    retchk(pid)
    
    return pid
}



async function listShareholders(stockName) {
    strchk(stockName)
    let ret = {}
    const stonks = await getStocks()
    let shid = null
    let sholders = []
    let stockid=null
    for(let i = 0; i<stonks.length;i++){
        if (stonks[i].stock_name === stockName){
            stockid=stonks[i].id
            for(let j = 0; j<stonks[i].shareholders.length;j++){
                shid = await getPersonById(stonks[i].shareholders[j].userId)
                sholders[sholders.length]={first_name:shid[0],last_name:shid[1],number_of_shares:stonks[i].shareholders[j].number_of_shares}
            }
        }
    }

    ret.id = stockid
    ret.stock_name = stockName
    ret.shareholders = sholders
    if(stockid==null||!stockid){
        
        throw new Error("stock not found")
    }
    return ret
    

}



async function totalShares(stockName) {
    strchk(stockName)
    let ret = stockName
    let sum = 0
    const shld = await listShareholders(stockName)
    if(shld.shareholders.length===0){
        ret+=" currently has no shareholders."
        return ret
    }
    for(let i = 0; i<shld.shareholders.length;i++){
        sum+=shld.shareholders[i].number_of_shares
    } 
    if(shld.shareholders.length===1){
        ret+=", has 1 shareholder that owns a total of "+sum+" shares."
        return ret
    }
     
    ret+=", has "+shld.shareholders.length+" shareholders that own a total of "+sum+" shares."


    if(ret==null||!ret||typeof ret != "string"){
        throw new Error("No stock with that name")
    }
    return ret
    

}

async function listStocks(firstName,lastName){
    strchk(firstName)
    strchk(lastName)
    const stonks = await getStocks()
    const ret_id = await gibn(firstName,lastName)
    let ret = []
    for(let i = 0; i<stonks.length;i++){
        for(let j = 0; j<stonks[i].shareholders.length;j++){
            if(stonks[i].shareholders[j].userId==ret_id){
                ret[ret.length] = {stock_name:stonks[i].stock_name,number_of_shares:stonks[i].shareholders[j].number_of_shares}
            }
        }
    }
    if(ret==[]||!ret){
        throw new Error("No stock with that name")
    }
    return ret

}

async function getStockById(id){
    strchk(id)
    const stonks = await getStocks()
    let ret = null
    for(let i = 0; i<stonks.length;i++){
        if(stonks[i].id===id){
            ret =  stonks[i]
        }
    }
    
    if(ret==null||!ret||typeof ret != "object"){
        throw new Error("No stock with that id")
    }
    return ret
}






module.exports = {
    listShareholders,
    totalShares,
    listStocks,
    getStockById
    
}