makeExample_stockflow();

/*** EXAMPLE MIXTURE MODEL STARTS ***/
function makeMixtureModelExample(){
  var system_1 = new System(),
      timeline = system_1.timeline,
      tripTime = 0.02 * timeline, // 30min
      morningPeakTime = 0.333 * timeline, 
      peak_1_duration = 0.25 * timeline,
      peak_1_start_time = morningPeakTime - 0.5 * peak_1_duration,
      eveningPeakTime = 0.7 * timeline, peak_2_duration = 0.3 * timeline,
      peak_2_start_time = eveningPeakTime - 0.5 *  peak_2_duration,
      peak_3_start_time = 0, peak_3_duration = timeline,
      pk1_pk2_ratio = 0.5,
      pk1pk2_pk3_ratio = 0.5,
      population = 100;

  var inFlow1 = system_1.makeFlow({
    color: flowColor.brighter(1),
    expression: function (tStep) { 
      return pk1pk2_pk3_ratio * pk1_pk2_ratio * population * system_1.utilities.pulseSin(peak_1_start_time, peak_1_duration, tStep);  
    }
  });
  var inFlow2 = system_1.makeFlow({
    color: flowColor.darker(1),
    expression: function (tStep) { 
      return pk1pk2_pk3_ratio * (1-pk1_pk2_ratio) * population * system_1.utilities.pulseSin(peak_2_start_time, peak_2_duration, tStep);
    }
  });
  var inFlow3 = system_1.makeFlow({
    expression: function (tStep) { 
      return (1-pk1pk2_pk3_ratio) * population * system_1.utilities.pulseSin(peak_3_start_time, peak_3_duration, tStep);
    }
  });
  var inFlow123 = system_1.makeFlow({
    expression: function (tStep) { 
      return inFlow1.expression(tStep) + inFlow2.expression(tStep) + inFlow3.expression(tStep);
    }
  });


  d3.select("#peak_1_start_time").on("input", function() {
    peak_1_start_time =  Math.round((+this.value/100) * timeline);
    peak_1_duration = (+document.getElementById('peak_1_duration').value/100) * timeline;
    system_1.update();
  });
  d3.select("#peak_1_duration").on("input", function() {
    peak_1_duration = (+this.value/100) * timeline;
    system_1.update();
  });
  d3.select("#peak_2_start_time").on("input", function() {
    peak_2_start_time =  Math.round((+this.value/100) * timeline);
    peak_2_duration = (+document.getElementById('peak_2_duration').value/100) * timeline;
    system_1.update();
  });
  d3.select("#peak_2_duration").on("input", function() {
    peak_2_duration = (+this.value/100) * timeline;
    system_1.update();
  });
  d3.select("#peak_3_start_time").on("input", function() {
    peak_3_start_time =  Math.round((+this.value/100) * timeline);
    peak_3_duration = (+document.getElementById('peak_3_duration').value/100) * timeline;
    system_1.update();
  });
  d3.select("#peak_3_duration").on("input", function() {
    peak_3_duration = (+this.value/100) * timeline;
    system_1.update();
  });
  d3.select("#pk1_pk2_ratio").on("input", function() {
    pk1_pk2_ratio = +this.value/100;
    system_1.update();
  });
  d3.select("#pk1pk2_pk3_ratio").on("input", function() {
    pk1pk2_pk3_ratio = +this.value/100;
    system_1.update();
    // d3.select("#graph1_label").text("Peak_1 = " + Math.round(pk1pk2_pk3_ratio * pk1_pk2_ratio * population));
  });

  system_1.update();

  var graph1 = system_1.addGraph({
    containerDivClass: 'graph1',
    data: [ inFlow1 ],
    height: 120, 
    yDomain: [0, population/50],
    styleClass: "flow dark"
  });
  var graph2 = system_1.addGraph({
    containerDivClass: 'graph2',
    data: [ inFlow2 ],
    height: 120, 
    yDomain: [0, population/50],
    styleClass: "flow dark"
  });
  var graph3 = system_1.addGraph({
    containerDivClass: 'graph3',
    data: [ inFlow3 ],
    height: 120, 
    yDomain: [0, population/50],
    styleClass: "flow dark"
  });
  var graph123 = system_1.addGraph({
    containerDivClass: 'graph123',
    data: [ inFlow3, inFlow1,inFlow2 ],
    height: 200,
    stackData: true, 
    yDomain: [0, population/50],
    styleClass: "flow dark"
  });
  var graph4 = system_1.addGraph({
    containerDivClass: 'graph4',
    data: [ inFlow123 ],
    height: 200, 
    yDomain: [0, population/50],
    styleClass: "flow dark"
  });  
}
/*** EXAMPLE MIXTURE MODEL ENDS ***/








// GOOD
/*** EXAMPLE STOCKFLOW STARTS ***/
function makeExample_stockflow(){
  var system_9 = new System(),
      timeline = system_9.timeline,
      pk1pk2_pk3_ratio_9 = 0.85,
      pk1_pk2_ratio_9 = 0.85,
      initial_stock_ratio_9 = 0.8,
      imbalance_percentage_9 = 0,
      imbalance_ratio_9 =imbalance_percentage_9 / (2-imbalance_percentage_9),
      population =100, 
      fleet_size_9 = population,
      delay_9_time = Math.round(0.03 * timeline),
      peak_1_mid_time_9 = 0.333 * timeline, 
      peak_1_duration_9 = 0.25 * timeline,
      peak_1_start_time_9 = peak_1_mid_time_9 - 0.5 * peak_1_duration_9,
      peak_2_mid_time_9 = 0.7 * timeline, 
      peak_2_duration_9 = 0.25 * timeline,
      peak_2_start_time_9 = peak_2_mid_time_9 - 0.5 *  peak_2_duration_9,
      peak_3_start_time_9 = 0, 
      peak_3_duration_9 = timeline;


  function pulseFromA(tStep) { 
    var peak_1 = system_9.utilities.pulseSin(peak_1_start_time_9, peak_1_duration_9, tStep);
    var peak_2 = system_9.utilities.pulseSin(peak_2_start_time_9, peak_2_duration_9, tStep);
    var peak_3 = system_9.utilities.pulseSin(peak_3_start_time_9, peak_3_duration_9, tStep);
    return ( pk1pk2_pk3_ratio_9 * (pk1_pk2_ratio_9 * peak_1 + (1-pk1_pk2_ratio_9) * peak_2) + (1-pk1pk2_pk3_ratio_9) * peak_3 );
  };
  function pulseFromB(tStep) { 
    var peak_1 = system_9.utilities.pulseSin(peak_1_start_time_9, peak_1_duration_9, tStep);
    var peak_2 = system_9.utilities.pulseSin(peak_2_start_time_9, peak_2_duration_9, tStep);
    var peak_3 = system_9.utilities.pulseSin(peak_3_start_time_9, peak_3_duration_9, tStep);
    return ( pk1pk2_pk3_ratio_9 * (pk1_pk2_ratio_9 * peak_2 + (1-pk1_pk2_ratio_9) * peak_1) + (1-pk1pk2_pk3_ratio_9) * peak_3 );
  };

   function pulseFromA_pk1(tStep) { 
    var peak_1 = system_9.utilities.pulseSin(peak_1_start_time_9, peak_1_duration_9, tStep);
    var peak_2 = 0;
    var peak_3 = 0;
    return ( pk1pk2_pk3_ratio_9 * (pk1_pk2_ratio_9 * peak_1 + (1-pk1_pk2_ratio_9) * peak_2) + (1-pk1pk2_pk3_ratio_9) * peak_3 );
  };
  function pulseFromA_pk2(tStep) { 
    var peak_1 = 0;
    var peak_2 = system_9.utilities.pulseSin(peak_2_start_time_9, peak_2_duration_9, tStep);
    var peak_3 = 0;
    return ( pk1pk2_pk3_ratio_9 * (pk1_pk2_ratio_9 * peak_1 + (1-pk1_pk2_ratio_9) * peak_2) + (1-pk1pk2_pk3_ratio_9) * peak_3 );
  };
  function pulseFromA_pk3(tStep) { 
    var peak_1 = 0;
    var peak_2 = 0;
    var peak_3 = system_9.utilities.pulseSin(peak_3_start_time_9, peak_3_duration_9, tStep);
    return ( pk1pk2_pk3_ratio_9 * (pk1_pk2_ratio_9 * peak_1 + (1-pk1_pk2_ratio_9) * peak_2) + (1-pk1pk2_pk3_ratio_9) * peak_3 );
  };


  var outFlow9_A = system_9.makeFlow({
    expression: function (tStep) { 
      return (1+imbalance_ratio_9) * population * pulseFromA(tStep);
    }
  });
  var outFlow9_A_pk1 = system_9.makeFlow({
    expression: function (tStep) { 
      return (1+imbalance_ratio_9) * population * pulseFromA_pk1(tStep);
    }
  });
  var outFlow9_A_pk2 = system_9.makeFlow({
    expression: function (tStep) { 
      return (1+imbalance_ratio_9) * population * pulseFromA_pk2(tStep);
    }
  });
  var outFlow9_A_pk3 = system_9.makeFlow({
    expression: function (tStep) { 
      return (1+imbalance_ratio_9) * population * pulseFromA_pk3(tStep);
    }
  });

  var inFlow9_B = system_9.makeFlow({
    expression: function (tStep) { 
      return  system_9.utilities.delayPipe(outFlow9_A.expression, delay_9_time, tStep);
      // return  stock9_AB.getValue(tStep)/delay_9_time;
    }
  });
  var outFlow9_B = system_9.makeFlow({
    expression: function (tStep) { 
      return (1-imbalance_ratio_9) * population * pulseFromB(tStep);
    }
  });
  var inFlow9_A = system_9.makeFlow({
    expression: function (tStep) { 
      return  system_9.utilities.delayPipe(outFlow9_B.expression, delay_9_time, tStep); 
      // return  stock9_BA.getValue(tStep)/delay_9_time;
      // it doesn't really matter which of the two delay funcitons I use, since allways Flows are evaluated AFTER stocks are evaluated. And initialize stock functions SHOULD BE INDEPENDENT FROM FLOWS.
    }
  });

  var stock9_AB = system_9.makeStock({
    inFlows: [outFlow9_A], 
    outFlows: [inFlow9_B], 
    initialize: function(){
      var avgStockInTransit = (1+imbalance_ratio_9) * population * delay_9_time/timeline; 
      var stock=0; 
      var avgStock = 0;
      for (var i = 0; i < timeline; i++) {
        this.inFlows.forEach(function(inFlow){
          stock += inFlow.expression(i);
        })
        this.outFlows.forEach(function(outFlow){
          stock -= outFlow.expression(i);
        })
        avgStock += stock/timeline;
      };
      return Math.max(avgStockInTransit-avgStock, -this.min);
    }
  });
  var stock9_BA = system_9.makeStock({
    inFlows: [outFlow9_B], 
    outFlows: [inFlow9_A], 
    initialize: function(){
      var avgStockInTransit = (1-imbalance_ratio_9) * population * delay_9_time/timeline; 
      var stock=0; 
      var avgStock = 0;
      for (var i = 0; i < timeline; i++) {
        this.inFlows.forEach(function(inFlow){
          stock += inFlow.expression(i);
        })
        this.outFlows.forEach(function(outFlow){
          stock -= outFlow.expression(i);
        })
        avgStock += stock/timeline;
      };
      return Math.max(avgStockInTransit-avgStock, -this.min);
    }
  });
  var stock9_A = system_9.makeStock({
    inFlows: [inFlow9_A], 
    outFlows: [outFlow9_A], 
    initialize: function(){
      return initial_stock_ratio_9 * (fleet_size_9 - stock9_AB.initialize() - stock9_BA.initialize());
    }
  });
  var stock9_B = system_9.makeStock({
    inFlows: [inFlow9_B], 
    outFlows: [outFlow9_B], 
    initialize: function(){
      return (1-initial_stock_ratio_9) * (fleet_size_9 - stock9_AB.initialize() - stock9_BA.initialize());
    }
  });


  d3.selectAll(".peak_1_duration_9").on("input", function() {
    var value = +this.value;
    d3.selectAll(".peak_1_duration_9").each(function(){this.value = value;});
    peak_1_duration_9 = (value/100) * timeline;
    system_9.update();
  });
  d3.selectAll(".peak_1_start_time_9").on("input", function() {
    var value = +this.value;
    d3.selectAll(".peak_1_start_time_9").each(function(){this.value = value;});
    peak_1_start_time_9 =  (value/100) * timeline;
    system_9.update();
  });
  d3.selectAll(".peak_2_duration_9").on("input", function() {
    var value = +this.value;
    d3.selectAll(".peak_2_duration_9").each(function(){this.value = value;});
    peak_2_duration_9 = (value/100) * timeline;
    system_9.update();
  });
  d3.selectAll(".peak_2_start_time_9").on("input", function() {
    var value = +this.value;
    d3.selectAll(".peak_2_start_time_9").each(function(){this.value = value;});
    peak_2_start_time_9 =  (value/100) * timeline;
    system_9.update();
  });
  d3.selectAll(".peak_3_duration_9").on("input", function() {
    var value = +this.value;
    d3.selectAll(".peak_3_duration_9").each(function(){this.value = value;});
    peak_3_duration_9 = (value/100) * timeline;
    system_9.update();
  });
  d3.selectAll(".peak_3_start_time_9").on("input", function() {
    var value = +this.value;
    d3.selectAll(".peak_3_start_time_9").each(function(){this.value = value;});
    peak_3_start_time_9 =  (value/100) * timeline;
    system_9.update();
  });
  d3.selectAll(".delay_9_time").on("input", function() {
    var value = +this.value;
    d3.selectAll(".delay_9_time").each(function(){this.value = value;});
    delay_9_time = (value/100) * timeline;
    system_9.update();
  });
  d3.selectAll(".pk1_pk2_ratio_9").on("input", function() {
    var value = +this.value;
    d3.selectAll(".pk1_pk2_ratio_9").each(function(){this.value = value;});
    pk1_pk2_ratio_9 = value/100;
    system_9.update();
  });
  d3.selectAll(".pk1pk2_pk3_ratio_9").on("input", function() {
    var value = +this.value;
    d3.selectAll(".pk1pk2_pk3_ratio_9").each(function(){this.value = value;});
    pk1pk2_pk3_ratio_9 = value/100;
    system_9.update();
  });
  d3.selectAll(".initial_stock_ratio_9").on("input", function() {
    var value = +this.value;
    d3.selectAll(".initial_stock_ratio_9").each(function(){this.value = value;});
    initial_stock_ratio_9 = value/100;
    system_9.update();
  });
  d3.selectAll(".imbalance_percentage_9").on("input", function() {
    var value = +this.value;
    imbalance_percentage_9 = value/100;
    d3.selectAll(".imbalance_percentage_9").each(function(){this.value = value;});
    imbalance_ratio_9 =imbalance_percentage_9 / (2-imbalance_percentage_9);
    system_9.update();
  });
  d3.selectAll(".fleet_size_9").on("input", function() {
    var value = +this.value;
    fleet_size_9 = value * population / 100;
    d3.selectAll(".fleet_size_9").each(function(){this.value = value;});
    system_9.update();
  });

  system_9.update();



  system_9.addGraph({
    svg: d3.selectAll(".mysvg" ),
    showAxis: 'true',
    // showAxis2: 'false',
    data: [{
       stroke: d3.rgb(0,0,0), 
       strokeWidth: 4,
       fill: d3.rgb(0,215,255),
       fillOpacity: 1,
       type: "area", 
       history: stock9_A.history 
    }],
    height: parseInt(d3.selectAll(".stock9_A").select("rect").node().getBBox().height ), 
    width: parseInt(d3.selectAll(".stock9_A").select("rect").node().getBBox().width ),
    xPos: parseInt(d3.selectAll(".stock9_A").select("rect").node().getBBox().x ),
    yPos: parseInt(d3.selectAll(".stock9_A").select("rect").node().getBBox().y ),
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    stackData: true,
    yDomain: [0,population]
});
system_9.addGraph({
    svg: d3.selectAll(".mysvg" ),
    showAxis: 'true',
    // showAxis2: 'false',
    data: [{
       stroke: d3.rgb(0,0,0), 
       strokeWidth: 4,
       fill: d3.rgb(0,215,255),
       fillOpacity: 1,
       type: "area", 
       history: stock9_AB.history 
    }],
    height: parseInt(d3.selectAll(".stock9_AB").select("rect").node().getBBox().height ), 
    width: parseInt(d3.selectAll(".stock9_AB").select("rect").node().getBBox().width ),
    xPos: parseInt(d3.selectAll(".stock9_AB").select("rect").node().getBBox().x ),
    yPos: parseInt(d3.selectAll(".stock9_AB").select("rect").node().getBBox().y ),
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    stackData: true,
    yDomain: [0,0.5*population]
});
system_9.addGraph({
    svg: d3.selectAll(".mysvg" ),
    showAxis: 'true',
    // showAxis2: 'false',
    data: [{
       stroke: d3.rgb(0,0,0), 
       strokeWidth: 4,
       fill: d3.rgb(0,215,255),
       fillOpacity: 1,
       type: "area", 
       history: stock9_B.history 
    }],
    height: parseInt(d3.selectAll(".stock9_B").select("rect").node().getBBox().height ), 
    width: parseInt(d3.selectAll(".stock9_B").select("rect").node().getBBox().width ),
    xPos: parseInt(d3.selectAll(".stock9_B").select("rect").node().getBBox().x ),
    yPos: parseInt(d3.selectAll(".stock9_B").select("rect").node().getBBox().y ),
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    stackData: true,
    yDomain: [0,population]
});
system_9.addGraph({
    svg: d3.selectAll(".mysvg" ),
    showAxis: 'true',
    // showAxis2: 'false',
    data: [{
       stroke: d3.rgb(0,0,0), 
       strokeWidth: 4,
       fill: d3.rgb(0,215,255),
       fillOpacity: 1,
       type: "area", 
       history: stock9_BA.history 
    }],
    height: parseInt(d3.selectAll(".stock9_BA").select("rect").node().getBBox().height ), 
    width: parseInt(d3.selectAll(".stock9_BA").select("rect").node().getBBox().width ),
    xPos: parseInt(d3.selectAll(".stock9_BA").select("rect").node().getBBox().x ),
    yPos: parseInt(d3.selectAll(".stock9_BA").select("rect").node().getBBox().y ),
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    stackData: true,
    yDomain: [0,0.5*population]
});



system_9.addGraph({
    svg: d3.selectAll(".mysvg" ),
    showAxis: 'true',
    // showAxis2: 'false',
    data: [{
       stroke: d3.rgb(0,0,0), 
       strokeWidth: 4,
       strokeDasharray: "6,4",
       type: "line", 
       history: outFlow9_A.history 
    }],
    height: parseInt(d3.selectAll(".outFlow9_A").select("rect").node().getBBox().height ), 
    width: parseInt(d3.selectAll(".outFlow9_A").select("rect").node().getBBox().width ),
    xPos: parseInt(d3.selectAll(".outFlow9_A").select("rect").node().getBBox().x ),
    yPos: parseInt(d3.selectAll(".outFlow9_A").select("rect").node().getBBox().y ),
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    stackData: true,
    yDomain: [0,0.1*population]
});

system_9.addGraph({
    svg: d3.selectAll(".mysvg" ),
    showAxis: 'true',
    // showAxis2: 'false',
    data: [{
       stroke: d3.rgb(0,0,0), 
       strokeWidth: 4,
       strokeDasharray: "6,4",
       type: "line", 
       history: outFlow9_B.history 
    }],
    height: parseInt(d3.selectAll(".outFlow9_B").select("rect").node().getBBox().height ), 
    width: parseInt(d3.selectAll(".outFlow9_B").select("rect").node().getBBox().width ),
    xPos: parseInt(d3.selectAll(".outFlow9_B").select("rect").node().getBBox().x ),
    yPos: parseInt(d3.selectAll(".outFlow9_B").select("rect").node().getBBox().y ),
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    stackData: true,
    yDomain: [0,0.1*population]
});
system_9.addGraph({
    svg: d3.selectAll(".mysvg" ),
    showAxis: 'true',
    // showAxis2: 'false',
    data: [{
       stroke: d3.rgb(0,0,0), 
       strokeWidth: 4,
       strokeDasharray: "6,4",
       type: "line", 
       history: inFlow9_A.history 
    }],
    height: parseInt(d3.selectAll(".inFlow9_A").select("rect").node().getBBox().height ), 
    width: parseInt(d3.selectAll(".inFlow9_A").select("rect").node().getBBox().width ),
    xPos: parseInt(d3.selectAll(".inFlow9_A").select("rect").node().getBBox().x ),
    yPos: parseInt(d3.selectAll(".inFlow9_A").select("rect").node().getBBox().y ),
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    stackData: true,
    yDomain: [0,0.1*population]
});

system_9.addGraph({
    svg: d3.selectAll(".mysvg" ),
    showAxis: 'true',
    // showAxis2: 'false',
    data: [{
       stroke: d3.rgb(0,0,0), 
       strokeWidth: 4,
       strokeDasharray: "6,4",
       type: "line", 
       history: inFlow9_B.history 
    }],
    height: parseInt(d3.selectAll(".inFlow9_B").select("rect").node().getBBox().height ), 
    width: parseInt(d3.selectAll(".inFlow9_B").select("rect").node().getBBox().width ),
    xPos: parseInt(d3.selectAll(".inFlow9_B").select("rect").node().getBBox().x ),
    yPos: parseInt(d3.selectAll(".inFlow9_B").select("rect").node().getBBox().y ),
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    stackData: true,
    yDomain: [0,0.1*population]
});


// system_9.addGraph({
//     containerDivClass: 'stack',
//     data: [ stock9_BA,stock9_AB, stock9_A, stock9_B ],
//     height: 400, 
//     fill: d3.rgb(0,215,255),
//    fillOpacity: 1,
//     stackData: true, 
//     yDomain: [0, population],
//   });



system_9.addGraph({
    containerDivClass: 'stack',
    data: [
    {
      fill: d3.rgb(0,215,255),
      fillOpacity: 1,
      stroke: d3.rgb(0,0,0), 
       strokeWidth: 2,
       history: stock9_BA.history 
    },
    {
      fill: d3.rgb(0,215,255),
      fillOpacity: 0.9,
      stroke: d3.rgb(0,0,0), 
       strokeWidth: 2,
       history: stock9_AB.history 
    },
    {
      // fill: "url(#crosshatch)",
      fill: d3.rgb(0,215,255),
      fillOpacity: 0.8,
      stroke: d3.rgb(0,0,0), 
       strokeWidth: 2,
       history: stock9_A.history 
    },
    {
      // fill: "url(#lightstripe)",
      fill: d3.rgb(0,215,255),
      fillOpacity: 0.7,
      stroke: d3.rgb(0,0,0), 
       strokeWidth: 2,
       history: stock9_B.history 
    },
    ],
    height: 500, 
    fill: d3.rgb(0,215,255),
   fillOpacity: 1,
    stackData: true, 
    yDomain: [0, population],
  });








}








