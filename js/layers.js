// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return n(0)

	let gain = new Decimal(1)
  if(hasUpgrade('p',11))gain=gain.times(upgradeEffect('p',11))
  if(hasUpgrade('p',12))gain=gain.times(upgradeEffect('p',12))
  if(hasUpgrade('p',13))gain=gain.times(upgradeEffect('p',13))
	return gain
}


addLayer("p",{
    symbol: "P",
    position: 0, 
    startData() { return {
        unlocked: true,
		points: n(0),
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
    gainMult() {
    //now we can use n(x) as new Decimal(x)
    //see someUsefulFunctions.js for more
        let mult = n(1)
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
         description(){return `Boost Points gain based on ${layers.p.resource()} Upgrades.`},
          effect(){
           return n(1.3**player.p.upgrades.length)
         },
          cost:n(6),
        effectDisplay(){return format(upgradeEffect('p',13))+"x"},
        unlocked(){return hasUpgrade('p',12)}
      },
      14:{
         title:"Wait, the themes was about potatos!",
         description:`okey lemme fix that`,
          cost:n(15),
        unlocked(){return hasUpgrade('p',13)}
      },
    },
  clickables:{
    11:{
      display:"Blank"
    }
  },
  grid: {
    rows: 2, // If these are dynamic make sure to have a max value as well!
    cols: 2,
    getStartData(id) {
        return 0
    },
    getUnlocked(id) { // Default
        return true
    },
    getCanClick(data, id) {
        return true
    },
    onClick(data, id) { 
       
    },
    getDisplay(data, id) {
        return numToFarm(data)
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
        unlocked(){return extend()>1},
        content:[
          "main-display",
          "prestige-button",
          "resource-display",
          "blank",
          "grid",
        ]
      },
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
  buyables:{
    11:{
      display(){return "Unlock New Stuff." },
      canAfford(){
       switch(extend()){
         case 1:return player.p.upgrades.length>=4;break;
           case 2:return false;break;
       }  
      },
      buy(){
        addBuyables("ex", 11, n(1))
      },
      reqText(){
        switch(extend()){
           case 1:return "Get Four Upgrades.";break; 
            case 2:return "???";break; 
        }
      }
    }
  }
})

function numToFarm(x){
  switch(x){
    case 0:return "Empty";break;
    case 1:return "Normal Potato";break;
  }
}
function extend(){
  return getBuyableAmount("ex", 11)
}