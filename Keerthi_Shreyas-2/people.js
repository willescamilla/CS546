const axios = require("axios");

const strchk = function (str) {
  if (
    str == null ||
    !str ||
    typeof str != "string" ||
    !str.replace(/\s/g, "").length
  ) {
    throw new Error("Invalid string id");
  }
};

const retchk = function (ret) {
  if (ret == null || !ret) {
    throw new error();
  }
};

const strsort = (str) =>
  str
    .split("")
    .sort((a, b) => a.localeCompare(b))
    .join("");

function comp(a, b) {
  return a - b;
}

function isLetter(str) {
  return str.length === 1 && str.match(/[a-z]/i);
}

async function getPeople() {
  const { data } = await axios.get(
    "https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json"
  );
  return data; // this will be the array of people objects
}

async function getPersonById(id) {
  strchk(id);
  let ppl = await getPeople();
  let person = null;
  for (let i = 0; i < ppl.length; i++) {
    if (ppl[i].id === id) {
      person = ppl[i];
    }
  }
  retchk;

  if (person == null) {
    throw new Error("person not found");
  }

  return person;
}

async function sameEmail(emailDomain) {
  strchk(emailDomain);
  let ppl = await getPeople();
  let smpl = [];
  if (emailDomain.indexOf(".") === -1) {
    throw new Error("needs dot");
  }
  if (emailDomain.indexOf(".") === 0) {
    throw new Error("naw brah");
  }
  if (
    !isLetter(emailDomain.charAt(emailDomain.indexOf(".") + 1)) &&
    !isLetter(emailDomain.charAt(emailDomain.indexOf(".") + 2))
  ) {
    throw new Error(". must be followed w 2 letters");
  }
  if (emailDomain.indexOf(".") + 3 < emailDomain.length) {
    if (emailDomain.charAt(emailDomain.indexOf(".") + 3) === ".") {
      if (
        !isLetter(emailDomain.charAt(emailDomain.indexOf(".") + 4)) &&
        !isLetter(emailDomain.charAt(emailDomain.indexOf(".") + 5))
      ) {
        throw new Error(". must be followed w 2 letters");
      }
    }
  }
  for (let i = 0; i < ppl.length; i++) {
    if (ppl[i].email.toLowerCase().indexOf(emailDomain.toLowerCase()) !== -1) {
      smpl[smpl.length] = ppl[i];
    }
  }
  if (smpl.length < 2) {
    throw new Error("Dam, all alone");
  }
  return smpl;
}

async function manipulateIp() {
  let ppl = await getPeople();
  let ipa = [];
  for (let i = 0; i < ppl.length; i++) {
    ipa[ipa.length] = parseInt(strsort(ppl[i].ip_address.replace(/\./g, "")));
  }
  const maxip = ipa.reduce((a, b) => Math.max(a, b));
  const minip = ipa.reduce((a, b) => Math.min(a, b));
  const avg = Math.floor(
    ipa.reduce((a, b) => {
      return a + b;
    }) / ipa.length
  );
  let aux = {};
  for (let i = 0; i < ipa.length; i++) {
    if (ipa[i] === maxip) {
      aux[maxip] = i;
    }
    if (ipa[i] === minip) {
      aux[minip] = i;
    }
  }
  ret = {
    highest: {
      firstName: ppl[aux[maxip]].first_name,
      lastName: ppl[aux[maxip]].last_name,
    },
    lowest: {
      firstName: ppl[aux[minip]].first_name,
      lastName: ppl[aux[minip]].last_name,
    },
    average: avg,
  };
  return ret;
}

async function sameBirthday(month, day) {
  let ppl = await getPeople();
  const marr = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  const smallMonths = [2, 4, 6, 9, 11];
  const twins = [];
  if (month == null || !month) {
    throw new Error("month must b popd");
  }
  if (day == null || !day) {
    throw new Error("day must be popd");
  }
  if (typeof month == "string") {
    if (!(parseInt(month) >= 1 && parseInt(month) <= 12)) {
      throw new Error("must be valid str");
    } else {
      month = parseInt(month);
    }
  }

  if (typeof day == "string") {
    if (!(parseInt(day) >= 1 && parseInt(day) <= 31)) {
      throw "must be valid str";
    } else {
      day = parseInt(day);
    }
  }

  if (month < 1) {
    throw new Error("Error: Month < 1");
  }
  if (month > 12) {
    throw new Error("Error: Month > 12");
  }
  if (smallMonths.includes(month) && day >= 29) {
    if (month == 2) {
      throw new Error("Error: There are not " + day + " days in Feb");
    }
    if (month !== 2) {
      if (day > 30) {
        throw new Error(
          "Error: There are not " + day + " days in " + marr[month - 1]
        );
      }
    }
  }

  for (let i = 0; i < ppl.length; i++) {
    if (
      parseInt(ppl[i].date_of_birth.substring(0, 2)) == parseInt(month) &&
      parseInt(ppl[i].date_of_birth.substring(3, 5)) == parseInt(day)
    )
      twins[twins.length] = `${ppl[i].first_name} ${ppl[i].last_name}`;
  }

  return twins;
}

module.exports = {
  getPersonById,
  sameEmail,
  manipulateIp,
  sameBirthday,
};
