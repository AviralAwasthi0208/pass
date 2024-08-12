const inputSlider = document.querySelector("[data-lengthslider]"); 
const lengthDisplay= document.querySelector("[data-length]");
const indicator = document.querySelector("[data-indicator]");
const generateButton = document.querySelector(".generate-button");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copybtn]") ;
const copyMsg = document.querySelector("[data-copymsg]") ;
const uppercasecheck = document.querySelector("#Uppercase") ;
const lowercasecheck = document.querySelector("#Lowercase") ;
const numbercheck = document.querySelector("#Numbers") ;
const symbolcheck = document.querySelector("#Symbols") ;
const checkBoxes = document.querySelector("input[type=checkbox]") ;
const symbols = '~`!@#$%^&*()-_+=[]{}\|;:"<>?,./';
let password="";
let passwordlength=3;
let checkcount=0;


// set strength circle to grey
setindicator("#ccc");

// functions :
// copycontent
// handleslider
// generate password
// set indicator
// random integer
// random symbols
// random lowercase
// random uppercase
// calculate strength 


handleslider();


// set password length
function handleslider(){

    inputSlider.value = passwordlength;
    lengthDisplay.innerText = passwordlength;
    const min = inputSlider.min;
  const max = inputSlider.max;
  inputSlider.style.backgroundSize =
    ((passwordlength - min) * 100) / (max - min) + "% 100%";

    // console.log("fu");



}

function setindicator(color){
    indicator.style.backgroundColor= color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;

    //shadow
}

function getRandInteger(min,max){
   return Math.floor(Math.random() * (max-min)) + min;

}
function generateRandomNumber (){
    return getRandInteger(0,9);
    
}

function generateLowercase(){
    return String.fromCharCode(getRandInteger(97,123));
} 


function generateUppercase(){
    return String.fromCharCode(getRandInteger(65,90));
}

function generateSymbols(){
//    console.log(String.length.symbols);
   const randNum = getRandInteger(0, symbols.length);
    return symbols.charAt(randNum);
}
 function calcStrength(){
     let hasupper=false;
     let haslower=false;

     let hasnum=false;

     let hassymbol=false;

     if(uppercasecheck.checked) hasupper=true ;
     if(lowercasecheck.checked) haslower=true ;
     if(numbercheck.checked) hasnum=true ;
     if(symbolcheck.checked) hassymbol=true ;

     if (hasupper&& haslower&& (hasnum||hassymbol)&& passwordlength>=8){
        setindicator("#0f0");
     }else if(
        (haslower||hasupper)&&
     (hasnum||hassymbol)&&
     passwordlength>=6
     ) {
        setindicator("#ff8");
     }else{
        setindicator("#f00");
     }


 }

 async function copycontent(){
   try{
    await navigator.clipboard.writeText(passwordDisplay.value);
    copyMsg.innerText = "copied";
     
   }
   catch(e){
       copyMsg.innerText = "failed";
   }

   copyMsg.classList.add("active");

   setTimeout( ()=>{
    copyMsg.classList.remove("active");
   },2000);
 }


 
inputSlider.addEventListener('input',(e)=>{
    passwordlength = e.target.value;
    // console.log(passwordlength);
    handleslider();
});

copyBtn.addEventListener('click',()=>{
    if(passwordDisplay.value)
        copycontent();
})

function handleCheckBoxChange() {
    checkcount = 0;
    checkBoxes.forEach((checkbox) => {
        if (checkbox.checked)
            checkcount++;
    });

    //special condition
    if (passwordlength < checkcount) {
        passwordlength = checkcount;
        handleslider();
    }
}

Array.from(checkBoxes).forEach((checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
})


function shufflepassword(array){
    // console.log(array);
    // fisher yates method 
    // console.log(array.length);
     for (let i=array.length - 1 ; i>0 ;i--){
        let j =Math.floor(Math.random()*(i+1));
        let temp=array[i];
        array[i]=array[j];
        array[j]=temp;
     }

     let str="";
     array.forEach((el)=>(str=str+el));
    //  console.log(str);
     return str;
}

generateButton.addEventListener('click',()=>{

    // console.log("click ho rha hai ");
    //    checkbox is ticked
        // if(checkcount == 0) return;
        
        
        // console.log("click ho rha hai2 ");

        // special case

        // if (passwordlength < checkcount){
        //     // console.log("inside special case");
        //     passwordlength = checkcount;
        //     // console.log(checkcount);
        //     handleslider();



        // }
        
        // console.log("starting the journey");
        // remove old password
        password="";

       

        // if(uppercasecheck.checked){
        //     password+=generateUppercase();
        // }

        // if(numbercheck.checked){
        //     password+=generateRandomNumber();
        // }

        // if(lowercasecheck.checked){
        //     password+=generateLowercase();
        // }

        // if(symbolcheck.checked){
        //     password+=generateSymbols();
        // }
        let funcarr=[];

        if(uppercasecheck.checked)
            funcarr.push(generateUppercase);

        // funcarr.push(generateLowercase);



        if(lowercasecheck.checked)
            funcarr.push(generateLowercase);

        if(numbercheck.checked)
            funcarr.push(generateRandomNumber);

        if(symbolcheck.checked)
            funcarr.push(generateSymbols);


        // compulsor additon
        for( let i=0;i<funcarr.length;i++){
            password+=funcarr[i]();
        }
        // console.log("compuslory addition done");
        // console.log(password);

        // remaining addition

        for(let i=0;i<passwordlength -funcarr.length;i++){
            let randindex=getRandInteger(0,funcarr.length);
            password+= funcarr[randindex]();
        }

        // console.log("remaining addition done");


        // shuffle the password
        // console.log("passwrod befire shuffling");
        // console.log(password);
        password = shufflepassword(Array.from(password));
        // console.log("shuffi=ling done");

        passwordDisplay.value = password;
        // console.log("ui addition done");
     
        // console.log(passwordDisplay);

        calcStrength();


     
});