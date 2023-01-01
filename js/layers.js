addLayer("p",{
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: n(0),
    }},
    color: "#4BDC13",
    requires: n(10), // Can be a function that takes requirement increases into account
    resource: "potatos", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
    //now we can use n(x) as new Decimal(x)
    //see someUsefulFunctions.js for more
        let mult = n(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let mult = n(1)
        return mult
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades:{
      11:{
         title:"",
         description:"",
         cost:n(1),
         effect(){
           return n(1)
         },
       }//打起来打起来
      //what should the upgrade do
    },
   /* tabformat:{//你等会 为啥整subtab啊
      "Main":{
        content:[
          "main-display",
          "prestige-button",
          "resource-display",
          "blank",
          "upgrades"
        ]
      }
    }*/
  
  tabformat:[
    "main-display",
    "prestige-button",
    "resource-display",
    "blank",
    "upgrades",
  ]
})