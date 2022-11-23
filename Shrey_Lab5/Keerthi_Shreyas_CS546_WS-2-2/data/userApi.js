const axios = require('axios')

const retchk = function(ret){
    if(ret==null||!ret){
        throw new error
    }
}

async function getPeople() {
  const { data } = await axios.get(`https://gist.githubusercontent.com/graffixnyc/31e9ef8b7d7caa742f56dc5f5649a57f/raw/43356c676c2cdc81f81ca77b2b7f7c5105b53d7f/people.json`)
  return data
}

async function getWork(){
  const { data } = await axios.get(`https://gist.githubusercontent.com/graffixnyc/febcdd2ca91ddc685c163158ee126b4f/raw/c9494f59261f655a24019d3b94dab4db9346da6e/work.json`)
  return data
}


async function getPersonById(id) {

  
  let ppl = await getPeople()
  let person = null
  for(let i = 0; i<ppl.length;i++){
      if (ppl[i].id === parseInt(id)){
          person = ppl[i]
      }
  }
  
  retchk(person)

  if(person==null){
      throw new Error("person not found")
  }
  return person
}

async function getWorkById(id)  {

  let work = await getWork()
  let job = null
  for(let i = 0; i<work.length;i++){
      if (work[i].id === parseInt(id)){
          job = work[i]
      }
  }
  
  retchk(job)
  
  if(job==null){
      throw new Error("job not found")
  }
  return job
}

module.exports = {
  getPeople,
  getWork,
  getPersonById,
  getWorkById
}