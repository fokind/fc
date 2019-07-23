sap.ui.define(["ui5lab/fc/Chart","ui5lab/fc/library","ui5lab/fc/thirdparty/d3","ui5lab/fc/thirdparty/moment-with-locales"],function(e){"use strict";return e.extend("ui5lab.fc.CandlestickChart",{metadata:{aggregations:{items:{type:"ui5lab.fc.Candle",multiple:true}}},renderer:{},onAfterRendering:function(){var t=this;e.prototype.onAfterRendering.apply(t);var a=t.getItems();if(!a||a.length<2)return;var r=d3.min(a,e=>e.getLow());var l=d3.max(a,e=>e.getHigh());var i=.8;var n=d3.select("#"+t.getId());var s=n.select("svg");var c=s.select(".fcPlotArea");var g=+c.attr("height");var m=moment(a[0].getTime()).toDate();var o=moment(a[1].getTime()).diff(m,"m");var d=t.getTimeScale();s.select(".fcAxisBottom").attr("transform",`translate(0, ${g})`).call(d3.axisBottom(d));var f=d(moment(m).add(o,"m").toDate());var h=t.getYScale(r,l);s.select(".fcAxisLeft").call(d3.axisLeft(h));var p=c.select(".fcSeries");var u=p.selectAll().data(a).enter().append("g").classed("fcBullish",e=>e.getClose()>=e.getOpen()).classed("fcBearish",e=>e.getClose()<e.getOpen());u.append("line").classed("fcCandleShadow",true).attr("x1",e=>d(moment(e.getTime()).toDate())+f/2).attr("x2",e=>d(moment(e.getTime()).toDate())+f/2).attr("y1",e=>h(e.getHigh())).attr("y2",e=>h(e.getLow()));u.append("rect").classed("fcCandleBody",true).attr("x",e=>d(moment(e.getTime()).toDate())+(1-i)*f/2).attr("y",e=>h(Math.max(e.getOpen(),e.getClose()))).attr("height",e=>Math.max(1,h(Math.min(e.getOpen(),e.getClose()))-h(Math.max(e.getOpen(),e.getClose())))).attr("width",i*f)}})});