let fail =document.getElementById("fail")
let success =document.getElementById("success")
let timefinsh =document.getElementById("timeout")



document.querySelector(".contols-button span").onclick=function(){
    timeout()
    let username =prompt("enter your name")
    this.parentElement.remove() 
    if(username == null || username == ""){
        document.querySelector(".info-container .name span").innerHTML="Unknown"
    }else{
        document.querySelector(".info-container .name span").innerHTML=username
    }
}

// function timer 1.30s 

function timeout(){
    let endtime =Date.now()+92000
let timer =setInterval(function(){
    let now =Date.now()
    let ramainingTime = endtime-now
    let scounds =Math.floor(ramainingTime / 1000)
    let munites =Math.floor(scounds / 60)
    document.querySelector(".time").innerHTML=`${munites % 60}:${scounds % 60}`

    if(scounds%60<10){
        document.querySelector(".time").innerHTML=`${munites % 60}:0${scounds % 60}`
    }

    if(ramainingTime<=1000){
        clearInterval(timer)
        timefinsh.play()
        fin("Game over") 
    }

  

},1000)

}


let parentallblocks =document.querySelector(".memory-game-blocks")
let blocks =Array.from(document.querySelectorAll(".memory-game-blocks .game-block"))
let arr =[...Array(blocks.length).keys()]
shuffle(arr)

// set order on element 

blocks.forEach((block,index) => {
    block.style.order=arr[index]

    block.addEventListener("click",(e)=>{
        flip(block)
    })
});



// function onclick set class is-flipped 

function flip(selectedblock){
    selectedblock.classList.add("is-flipped")

    let allflippedblock = blocks.filter(flippedblock => flippedblock.classList.contains("is-flipped"));
    if(allflippedblock.length == 2){

        noclicking()
        checkmatching(allflippedblock[0],allflippedblock[1])
    }

}

// function set class no-click 

function noclicking(){
    parentallblocks.classList.add("no-click")
    setTimeout(function(){
    parentallblocks.classList.remove("no-click")
    },700)

}


// function check if blocks matching 

function checkmatching(firstblock,soucndblock){
   let tries =document.querySelector(".tries span")
    if(firstblock.dataset.img === soucndblock.dataset.img ){
            success.play()
            firstblock.classList.remove("is-flipped")
            soucndblock.classList.remove("is-flipped") 
            firstblock.classList.add("has-match")
            soucndblock.classList.add("has-match")  
            soucndblock.children[1].children[0].classList.add("scale") 
            firstblock.children[1].children[0].classList.add("scale") 
            checkwin()
    }else{
        tries.innerHTML=Number(tries.innerHTML)+1
        fail.play()
        setTimeout(function(){
            firstblock.classList.add("move") 
        soucndblock.classList.add("move") 
            firstblock.classList.remove("is-flipped")
            soucndblock.classList.remove("is-flipped") 
            },700)
            firstblock.classList.remove("move") 
            soucndblock.classList.remove("move") 
    }

}

// function make array random 

function shuffle(array){
    let temp ;
    let random;
    for(let i=array.length-1;i>0;i--){
        random=Math.floor(Math.random()*array.length)

        temp =array[i]
        array[i]=array[random]
        array[random]=temp

    }
    return array
}


// function win in game 

function checkwin(){
    let x = true
for(let i of blocks){
    if(!i.classList.contains("has-match")){
        x=false;
        return false
        break;
    }
}

if(x==true){
    
    fin ("you win")
    document.querySelector(".time").remove()
}
}


function fin (text){
    let overlay =document.createElement("div")
    document.body.append(overlay)
    overlay.classList.add("overlay")
    let cong =document.createElement("div")
    document.body.append(cong)
    cong.classList.add("cong")
    let p =document.createElement("p")
    cong.append(p)
    p.innerHTML=text
    let but =document.createElement("button")
    cong.append(but)  
    but.innerHTML="Replay" 
    but.onclick=function(){
        location.reload()
    }
}