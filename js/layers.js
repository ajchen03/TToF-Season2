// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return n(0)

	let gain = new Decimal(1)
  if(hasUpgrade('p',11))gain=gain.times(upgradeEffect('p',11))
  if(hasUpgrade('p',12))gain=gain.times(upgradeEffect('p',12))
  if(hasUpgrade('p',13))gain=gain.times(upgradeEffect('p',13))
  gain=gain.times(n(1.2).pow(plantAmt2(3)))
  gain=gain.times(n(1.5).pow(plantAmt2(4)))
	return gain
}


addLayer("p",{
    symbol: "P",
    position: 0, 
    startData() { return {
        unlocked: true,
		points: n(0),
      farmMode:2,
    }},
    color() {
      if (hasUpgrade('p',14)) return "#ffdb83";
      return "#4BDC13";
    },
    requires: n(10), 
    resource() {
      if (hasUpgrade('p',14)) return "potatos";
      return "prestige points";
    },
    baseResource: "points",
    baseAmount(){return player.points},
    type: "normal", 
    exponent: 0.5, 
    gainMult(){
      let mult = n(1) 
      mult=mult.times(n(1.1).pow(tmp.p.plantAmt2))
      alert(tmp.p.plantAmt2)
      return mult
    },
    gainExp() { 
        let mult = n(1)
        return mult
    },
    row: 0,
    hotkeys: [
        {key: "p", description: `P: Reset for potatos`, onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades:{
      11:{
         title:"Basic Upgrade",
         description() {
      return `${layers.p.resource()} boost Points gain.`
    },
         cost:n(1),
         effect(){
           return player.p.points.add(3).max(1).log(2)
         },
        effectDisplay(){return format(upgradeEffect('p',11))+"x"},
      },
      12:{
         title:"Basic Upgrade 2",
         description:"Points boost themselves.",
         cost:n(3),
        effect(){
           return player.points.add(2).max(1).log(10).add(1)
         },
        effectDisplay(){return format(upgradeEffect('p',12))+"x"},
        unlocked(){return hasUpgrade('p',11)}
      },
      13:{
         title:"Basic Upgrade 3",
         description(){return `Boost Points gain based on total ${layers.p.resource()} Upgrades.`},
          effect(){
           return n(1.3**player.p.upgrades.length)
         },
          cost:n(6),
        effectDisplay(){return format(upgradeEffect('p',13))+"x"},
        unlocked(){return hasUpgrade('p',12)}
      },
      14:{
         title:"Wait, the themes was about potatos!",
         description(){if (hasUpgrade('p',14)) return 'fixed :)'
           return `okey lemme fix that`},
          cost:n(15),
        unlocked(){return hasUpgrade('p',13)}
      },
      21:{
         title:"Growing potatos",
         description:'Fasten potato growth.',
          cost:n(30),
        unlocked(){return extend()>=1}
      }
    },
  clickables:{
    11:{
      display(){return "Mode: "+this.text()},
      onClick(){player.p.farmMode=(player.p.farmMode+1)%2},
      canClick:true,
      text(){
        switch(player.p.farmMode){
          case 0:return "Plant";break;
          case 1:return "Destroy";break;
          //case 2:return "Watch";break;
          //case 3:return "Time";break;
        }
      }
    }
  },
  grid: {
    rows: 2, // If these are dynamic make sure to have a max value as well!
    cols: 2,
    getStartData(id) {
        return {
          plant:0,
          time:0,
        }
    },
    getUnlocked(id) { // Default
        return true
    },
    getCanClick(data, id) {
        if(player.p.farmMode==0)return data.plant==0&&player.p.points.gte(n(8).times(n(1.5).pow(plantAmt()**1.1)).round())
      else if(player.p.farmMode==1)return data.plant!=0
      else return false
    },
    onClick(data, id) { 
       if(player.p.farmMode==1) player.p.grid[id].plant=0
      else {
        player.p.points=player.p.points.sub(n(8).times(n(1.5).pow(plantAmt()**1.1)))
        player.p.grid[id].plant=1
        if (hasUpgrade('p',21)) player.p.grid[id].time=20
        else player.p.grid[id].time=30
      }
    },
    getDisplay(data, id) {
        if(player.p.farmMode==0){if (player.p.grid[id].plant!=0) return `${numToFarm(data.plant)}\n${format(player.p.grid[id].time)}s`
          return `Req ${formatWhole(n(8).times(n(1.5).pow(plantAmt()**1.1)).round())} potatoes.`}
        return `${numToFarm(data.plant)}\n${format(player.p.grid[id].time)}s`
        //return numToFarm(data.plant)
    },
},
    tabFormat:{
      "Main":{
        content:[
          "main-display",
          "prestige-button",
          "resource-display",
          "blank",
          "upgrades"
        ]
      },
      "Farm":{
        unlocked(){return extend()>=1},
        content:[
          "main-display",
          "prestige-button",
          "resource-display",
          "blank",
          "grid",
          "blank",
          "clickables",
        ]
      },
    },
update(diff){
    for (item in player.p.grid){

    player.p.grid[item].time=Math.max(player.p.grid[item].time-diff,0)

    if(player.p.grid[item].plant==1&&player.p.grid[item].time==0){if (hasUpgrade('p',21)) player.p.grid[item].time=25
                                                                  else player.p.grid[item].time=30
                                                                  player.p.grid[item].plant=2}
    if(player.p.grid[item].plant==2&&player.p.grid[item].time==0){
    let c=Math.random()
    if(c>0.9)player.p.grid[item].plant=4
    else player.p.grid[item].plant=3}

} 
},
  plantAmt2(){
  let a=0
  for (item in player.p.grid){
if(player.p.grid[item].plant==2)a++
  } 
    
  return a
}
  
})
addLayer("ex",{
    symbol: "Ex", 
    position: 0,
    startData() { return {
        unlocked: true,
		    points: n(0),
    }},
    color: "#694dff",
    requires: n(0), 
    resource: "Extension",
    type: "none", 
    row: 'side',
    /*hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],*/
    layerShown(){return true},
  tabformat:[
    "upgrades",
  ],
    shouldNotify(){
      return layers.ex.buyables[11].canAfford()
    },
  buyables:{
    11:{
      display(){return "Unlock New Stuff.<br><br>Req: "+this.reqText() },
      canAfford(){
        switch(extend()){
          case 0:return player.p.upgrades.length>=4;break;
          case 1:return false;break;
       }  
      },
      buy(){
        addBuyables("ex", 11, n(1))
      },
      reqText(){
        switch(extend()){
          case 0:return "Get Four Upgrades.";break; 
          case 1:return "???";break; 
        }
      },
      style(){return{
        "font-size":"13px"
      }}
    }
  },
  
})

function numToFarm(x){
  switch(x){
    case 0:return "Empty";break;
    case 1:return "Baby Potato";break;
    case 2:return "Teen Potato";break;
    case 3:return "Normal Potato";break; 
    case 4:return "Giant Potato"
  }
}
function extend(){
  return getBuyableAmount("ex", 11).toNumber()
}
function plantAmt(){
  let a=0
  for (item in player.p.grid){
if(player.p.grid[item].plant!=0)a++
} 
  return a
}
function plantAmt2(x){
  let a=0
  for (item in player.p.grid){
if(player.p.grid[item].plant==x)a++
} 
  return a
}