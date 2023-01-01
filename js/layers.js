// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return n(0)

	let gain = new Decimal(1)
  if(hasUpgrade('p',11))gain=gain.times(upgradeEffect('p',11))
	return gain
}


addLayer("p",{
    symbol: "P",
    position: 0, 
    startData() { return {
        unlocked: true,
		points: n(0),
    }},
    color: "#4BDC13",
    requires: n(10), 
    resource: "potatos", 
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
        {key: "p", description: "P: Reset for potatoes", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades:{
      11:{
         title:"Basic Upgrade",
         description:"Potatoes boost Points gain.",
         cost:n(1),
         effect(){
           return player.p.points.add(3).log(2)
         },
        effectDisplay(){return format(upgradeEffect('p',11))+"x"}
      },
      12:{
         title:"Farm",
         description:"Unlock Farm.",
         cost:n(3),
        unlocked(){return hasUpgrade('p',11)}
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
        player[this.layer].grid[id]++
    },
    getDisplay(data, id) {
        return data 
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
        unlocked(){return hasUpgrade('p',12)},
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
    //"main-display",
    //"resource-display",
    "blank",
    //"upgrades",
  ]
})

