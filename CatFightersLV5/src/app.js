class FightPicker {
    constructor(){
        this.fighterLeft = null
        this.fighterRight = null
        this.winner = null
        this.loser = null
        this.fightersMonitor = document.querySelectorAll(".featured-cat-fighter-image")

        this.btnRandomFighters = document.querySelector("#randomFight")
        this.btnStartFight = document.querySelector("#generateFight")
        this.btnAddNewFighter = document.querySelector("#newFighter")
        this.btnsEdit = document.querySelectorAll("#edit")
        
        this.fightersLeft = document.querySelector("#firstSide").querySelectorAll(".fighter-box")
        this.fightersRight = document.querySelector("#secondSide").querySelectorAll(".fighter-box")
    }

    init() {
        this._disableBtn(this.btnStartFight)
        this._clickHandler();
    }
  
    _clickHandler() {
        this._setFighterMenuListener(this.fightersLeft)
        this._setFighterMenuListener(this.fightersRight)
        this._setRandomPickListener()
        this._setFightListener()
    }
    _setFightListener(){
        this.btnStartFight.addEventListener("click", (e)=> {
            if(!this.btnStartFight.classList.contains("disabled")){
                this._disableFunctions()
                let counter = 3
                let timer = setInterval(function(args){
                    if(counter>=0){
                        document.querySelector(".clock").textContent = counter
                        counter-- 
                    }
                    if(counter<0){
                        clearInterval(timer);
                        args._enableFunctions()
                        args._simulateFight()
                        args._refreshStatistic(args.winner,args.loser)
                    }
                }, 1000,this);
            }
        })
    }
    //refresing dataset from fighters, changing their statistic in main monitors and finally updating fighters in database
    _refreshStatistic(winner,loser){
        let fighters = document.querySelectorAll(".fighter-box")
        Array.from(fighters).forEach(fighter => {
            let tempObj = JSON.parse(fighter.dataset.info)
            if(tempObj.name == this._getFighterData(winner).name){
                tempObj.record.wins = (parseInt(tempObj.record.wins) + 1).toString()
                fighter.dataset.info = JSON.stringify(tempObj)
            }
            if(tempObj.name == this._getFighterData(loser).name){
                tempObj.record.loss =(parseInt(tempObj.record.loss) + 1).toString()
                fighter.dataset.info = JSON.stringify(tempObj)
            }
        });
        this._refreshInfo(this._getFighterSideElement(winner.querySelector("img")),JSON.parse(winner.dataset.info))
        this._refreshInfo(this._getFighterSideElement(loser.querySelector("img")),JSON.parse(loser.dataset.info))
        this._refreshDB(JSON.parse(winner.dataset.info).id,JSON.parse(loser.dataset.info).id)
    }
    //statistic on main monitors update
    _refreshInfo(fighterSide,fighterData){
        fighterSide.querySelector(".wins").textContent = fighterData.record.wins
        fighterSide.querySelector(".loss").textContent = fighterData.record.loss
    }
    //POST request in which we send ID from loser and winner to updateFighter.php script
    _refreshDB(winnerID,loserID){
        $.ajax({
            type: 'POST',
            url: './backend/updateFighter.php',
            data: {winnerID:winnerID,loserID:loserID},
            success: function(response){                       
                console.log(response)
            }
        }) 
    }
    //called when FIGHT button is pressed
    _simulateFight(){
        let fighterLeftJSON = this._getFighterData(this.fighterLeft)
        let fighterRightJSON = this._getFighterData(this.fighterRight)
        this._calculate(fighterLeftJSON,fighterRightJSON)
    }
    _calculate(fighterData1, fighterData2){
        let winRate1 = ((fighterData1.record.wins/(fighterData1.record.wins+fighterData1.record.loss))*100).toFixed(2)
        let winRate2 = ((fighterData2.record.wins/(fighterData2.record.wins+fighterData2.record.loss))*100).toFixed(2)
        let razlika = (Math.abs(winRate1-winRate2)).toFixed(2)
        let randomNumber = (Math.floor(Math.random() * 100))/100
        // part of checking game logic... read below 
        /* console.log("prvi: " + winRate1+ " drugi: " + winRate2)
        console.log( "razlika "+ razlika) 
        console.log("random number "+randomNumber)*/
        if(razlika<=10) {this._announceWinner(winRate1,winRate2,0.1,randomNumber)}
        if(razlika>10) {this._announceWinner(winRate1,winRate2,0.2,randomNumber)}
    }    
    // you can delete this comments below,they are just or checking correctness of logic
    _announceWinner(winRate1,winRate2,advantage,randomNumber){     
        document.querySelector(".clock").textContent = "" 
        let fighternames = document.querySelectorAll(".name")       
        if(winRate1 > winRate2){                                    
            //console.log("1 > 2 ")
            if((0.49+advantage) > randomNumber){
                //console.log("0.69 > winner ")
                //console.log("winner: "+fighternames[0].textContent)
                document.querySelector("#message").textContent = "Winner is "+fighternames[0].textContent + " !!!"
                this._setMonitorsBorder("left")
                this.winner = this.fighterLeft
                this.loser = this.fighterRight
            }
            else {
                //console.log("0.69 < winner ")
                //console.log("winner: "+fighternames[1].textContent)   
                document.querySelector("#message").textContent = "Winner is "+fighternames[1].textContent + " !!!"
                this._setMonitorsBorder("right")
                this.winner = this.fighterRight
                this.loser = this.fighterLeft
            }
        }
        if(winRate1 < winRate2){
            //console.log("1 < 2 ")
            if((0.5-advantage) < randomNumber){
                //console.log("0.3 < winner ")
                //console.log("winner: "+fighternames[1].textContent)
                document.querySelector("#message").textContent = "Winner is "+fighternames[1].textContent + " !!!"
                this._setMonitorsBorder("right")
                this.winner = this.fighterRight
                this.loser = this.fighterLeft
            }
            else {
                //console.log("0.3 > winner ")
                //console.log("winner: "+fighternames[0].textContent)
                document.querySelector("#message").textContent = "Winner is "+fighternames[0].textContent+ " !!!"
                this._setMonitorsBorder("left")
                this.winner = this.fighterLeft
                this.loser = this.fighterRight
            }
        }
    }
    //seting borders on main monitors by sending winner side
    _setMonitorsBorder(side){
        if(side=="left"){
            this.fightersMonitor[0].classList.add("border","border-success")
            this.fightersMonitor[1].classList.add("border","border-danger")
        }
        else{
            this.fightersMonitor[1].classList.add("border","border-success")
            this.fightersMonitor[0].classList.add("border","border-danger")
        }
    }
    //clear fighters info on monitors
    _removeMonitorsInfo(){
        Array.from(this.fightersMonitor).forEach(monitor=>{
            monitor.classList.remove("border","border-success","border-danger")
        })
        document.querySelector("#message").textContent = ""
        document.querySelector(".clock").textContent = ""
    }
    //after fight enable buttons
    _enableFunctions(){
        this._enableBtn(this.btnStartFight)
        this._enableBtn(this.btnRandomFighters)
        this._enableBtn(this.btnAddNewFighter)
        this._enableMenu()
    }
    //on fight disable buttons
    _disableFunctions(){
        this._disableBtn(this.btnRandomFighters)
        this._disableBtn(this.btnStartFight)
        this._disableBtn(this.btnAddNewFighter)
        this._removeMonitorsInfo()
        this._disableMenu()
    }


    _enableMenu(){
        Array.from(this.fightersLeft).forEach(fighter=>{
            if(!this._sameFighter(fighter,this.fighterRight)){
                fighter.querySelector("img").classList.remove("op-02")
            } 
        })
        Array.from(this.btnsEdit).forEach(btn=>{
            this._enableBtn(btn)
        })
        Array.from(this.fightersRight).forEach(fighter=>{
            if(!this._sameFighter(fighter,this.fighterLeft)){
                fighter.querySelector("img").classList.remove("op-02")
            }
        })
    }
    _disableMenu(){
        Array.from(this.fightersLeft).forEach(fighter=>{
            fighter.querySelector("img").classList.add("op-02")
        })
        Array.from(this.btnsEdit).forEach(btn=>{
            this._disableBtn(btn)
        })
        Array.from(this.fightersRight).forEach(fighter=>{
            fighter.querySelector("img").classList.add("op-02")
        })
    }
    _setRandomPickListener(){
        this.btnRandomFighters.addEventListener("click", (e)=> {
            if(!this.btnRandomFighters.classList.contains("disabled")){
                this._removeMonitorsInfo()
                this._pickRandomFighter()
                if(this._bothFightersReady()){this._enableBtn(this.btnStartFight)}
            }
        })
    }
    //called when button Pick random fighter is pressed
    //size is number of fighters
    _pickRandomFighter(){
        let size = document.querySelector("#firstSide").querySelectorAll(".col-md-4").length
        let index1,index2
        do{
            index1 = Math.floor(Math.random()*size)
            index2 = Math.floor(Math.random()*size)
        }while(index1 == index2)
        this._visualiseFighterPick(this.fightersLeft[index1].querySelector("img"))
        this._visualiseFighterPick(this.fightersRight[index2].querySelector("img"))
    }
    _setFighterMenuListener(fighters){
        Array.from(fighters).forEach(fighter => {
            fighter.addEventListener("click", (e)=>{
                if(!e.target.classList.contains("op-02")){
                    this._removeMonitorsInfo()
                    this._visualiseFighterPick(e.target)
                    if(this._bothFightersReady()){this._enableBtn(this.btnStartFight)}
                }
            })
        });

    }
    //called when fighter from menu is picked
    //used for visualize picked fighter, block same fighter on other menu
    //and filling info on monitor
    _visualiseFighterPick(pickedFighterImg){
        this._resetBordersAndOpacity(this._getFighterSideElement(pickedFighterImg).id)
        this._setBorderOnPicked(pickedFighterImg)
        this._blockSameFighter(this._getFighterSideElement(pickedFighterImg).id,pickedFighterImg)
        this._fillFighterInfo(pickedFighterImg)
    }
    _fillFighterInfo(pickedFighterImg){
        let fighterData = this._getFighterData(pickedFighterImg.parentNode)
        if(this._getFighterSideElement(pickedFighterImg).id=="firstSide"){
            let fighterSide = this._getFighterSideElement(pickedFighterImg)
            this._fillInfo(fighterData,fighterSide,pickedFighterImg)
            this.fighterLeft = pickedFighterImg.parentNode
        }
        if(this._getFighterSideElement(pickedFighterImg).id=="secondSide"){
            let fighterSide = this._getFighterSideElement(pickedFighterImg)
            this._fillInfo(fighterData,fighterSide,pickedFighterImg)
            this.fighterRight = pickedFighterImg.parentNode
        }

    }
    //used for getting JSON object from fighter dataset
    _getFighterData(fighter){
        let fighterJSON = JSON.parse(fighter.dataset.info)
        return fighterJSON
    }
    _fillInfo(fighterData,fighterSide,fighterImg){
        fighterSide.querySelector(".name").textContent = fighterData.name
        fighterSide.querySelector(".age").textContent = fighterData.age
        fighterSide.querySelector(".skills").textContent = fighterData.catInfo
        fighterSide.querySelector(".wins").textContent = fighterData.record.wins
        fighterSide.querySelector(".loss").textContent = fighterData.record.loss
        fighterSide.querySelector(".featured-cat-fighter-image").attributes.src.textContent = fighterImg.attributes.src.textContent 
    }
    _blockSameFighter(side,pickedFighterImg){  
        if(side=="firstSide"){
            Array.from(this.fightersRight).forEach(fighter=>{
                if(this._sameFighter(pickedFighterImg.parentNode,fighter)){
                    fighter.querySelector("img").classList.add("op-02")
                }
            })
        }
        if(side=="secondSide"){
            Array.from(this.fightersLeft).forEach(fighter=>{
                if(this._sameFighter(pickedFighterImg.parentNode,fighter)){
                    fighter.querySelector("img").classList.add("op-02")
                }
            })
        }
    }
    //if fighters are same by id it returns true
    //used in blocking fighter on other side after picking on first one
    _sameFighter(fighter1, fighter2){
        let state
        let fighterJSON1 = JSON.parse(fighter1.dataset.info)
        let fighterJSON2 = JSON.parse(fighter2.dataset.info)
        if(fighterJSON1.id == fighterJSON2.id){
            state = true
        }
        else {state = false}
        return state
    }
    // used for enabling fight button when both fighters are picked
    _bothFightersReady(){
        let state = true
        let names = document.querySelectorAll(".name")
        if(names[0].textContent == "Cat Name"){state = false}
        if(names[1].textContent == "Cat Name"){state = false}
        return state
    }
    _setBorderOnPicked(pickedFighterImg){
        pickedFighterImg.classList.add("border","border-dark")
    }
    //returns firstSide or SecondSide based on given fighter
    _getFighterSideElement(fighter){
        return fighter.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
    }
    
    _resetBordersAndOpacity(side){
        if(side=="firstSide"){
            Array.from(this.fightersLeft).forEach(fighter=>{
                fighter.querySelector("img").classList.remove("border","border-dark")
            })
            Array.from(this.fightersRight).forEach(fighter=>{
                fighter.querySelector("img").classList.remove("op-02")
            })
        }
        if(side=="secondSide"){
            Array.from(this.fightersRight).forEach(fighter=>{
                fighter.querySelector("img").classList.remove("border","border-dark")
            })
            Array.from(this.fightersLeft).forEach(fighter=>{
                fighter.querySelector("img").classList.remove("op-02")
            })
        }
    }
    _disableBtn(btn){
            btn.classList.add("disabled")
    }
    _enableBtn(btn){
        btn.classList.remove("disabled")
    }
}  

const fightPicker = new FightPicker(); 
fightPicker.init();
