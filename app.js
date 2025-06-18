const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns= document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button")
const forcurr = document.querySelector(".from select")
const torcurr = document.querySelector(".to select")
const msg = document.querySelector(".msg")

for(let select of dropdowns){
for (code in countryList){
    let newOption = document.createElement("option");
    newOption.innerHTML=code;
    newOption.value=code;
    if(select.name=="from" && code=="USD"){
      newOption.selected="selected";
    }
    if(select.name=="to" && code=="INR"){
      newOption.selected="selected";
    }
    select.append(newOption);
}
select.addEventListener("change",(evt)=>{
  updateFlag(evt.target)
})
}

const updateFlag =(element)=>{
let curr = element.value 
console.log(curr);
let countryCo= countryList[curr]
let newsr = `https://flagsapi.com/${countryCo}/flat/64.png`
let im = element.parentElement.querySelector("img")
im.src = newsr
}

btn.addEventListener("click",async (evt)=>{
evt.preventDefault()
let amount= document.querySelector(".amount input")
let amtval = amount.value
if(amtval=="" || amtval<1){
  amtval=1
  amount.value="1"
}
let for_val = forcurr.value.toLowerCase()
let to_val = torcurr.value.toLowerCase()
console.log(to_val)
let myUrl = `${BASE_URL}/${for_val}.json`
let response= await fetch(myUrl);
let data = await response.json();
rate = data[for_val][to_val]
let final = amtval*rate
msg.innerHTML=`${amtval} ${forcurr.value} = ${final} ${torcurr.value}`
})



