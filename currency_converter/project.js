
const BASE_URL = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies';
// adding the advance dropdown>>>>>>>>
const dropdowns=document.querySelectorAll(".dropdown select");
for(let select of dropdowns){
    for(currcode in countryList){
        let option=document.createElement("option");
        option.innerText=currcode;
        option.value=currcode;

// adding the condition>>>>>
        if(select.name==="from" && currcode==="USD"){
            option.selected="selected";
        }
        else if(select.name==="to" && currcode==="INR"){
            option.selected="selected";
        }
        select.append(option);
    }      

    // updating the flag>>>>>>>>
    select.addEventListener("change",(evt)=>{

        updateflag(evt.target);
    
    });      
}

const updateflag=(element)=>{
    let code=element.value;
    let countrycode=countryList[code];
    // console.log(countrycode);
    let image=element.parentElement.querySelector("img");
    let newimg=`https://flagsapi.com/${countrycode}/flat/64.png`;
    image.src=newimg;
};


let from=document.querySelector(".from select");
let to=document.querySelector(".to select");
let btn=document.querySelector(".btn");
btn.addEventListener("click",async(evt)=>{
    evt.preventDefault();
    let amount=document.querySelector("input");

    if(amount.value<0 || amount.value===0){
        amount.value=1;
    }
    console.log(from.value);
    console.log(to.value);
    
    // use of api for currency conversion values
    const URL = `${BASE_URL}/${from.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    convertTo = to.value.toLowerCase();
    convertFrom = from.value.toLowerCase();
    let rate = data[convertFrom][convertTo];
    
    // displaying the output
    let msg=document.querySelector("#msg");
    msg.innerText=rate;
})
