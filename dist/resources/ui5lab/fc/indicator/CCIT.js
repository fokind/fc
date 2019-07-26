sap.ui.define(["ui5lab/fc/Chart","ui5lab/fc/library","ui5lab/fc/thirdparty/d3","ui5lab/fc/thirdparty/moment-with-locales"],function(e){"use strict";return e.extend("ui5lab.fc.indicator.CCIT",{metadata:{properties:{overboughtZone:"float",oversoldZone:"float"},aggregations:{items:{type:"ui5lab.fc.indicator.CCITItem",multiple:true}}},renderer:{},_onResize:function(t){var a=this;e.prototype._onResize.apply(a,[t]);var r=a.getItems();if(!r||r.length<2)return;var i=d3.min(r,e=>e.getY());var l=d3.max(r,e=>e.getY());var o=.8;var s=d3.select("#"+a.getId());var c=s.select("svg");var n=c.select(".fcPlotArea");var m=+n.attr("height");var d=a.getStart();var g=a.getEnd();var v=moment(d).toDate();var f=+a.getTimeframe();var h=a.getTimeScale();c.select(".fcAxisBottom").attr("transform",`translate(0, ${m})`).call(d3.axisBottom(h));var u=h(moment(v).add(f,"m").toDate());var p=a.getYScale(i,l);c.select(".fcAxisLeft").call(d3.axisLeft(p));var x=n.select(".fcSeries");x.selectAll("*").remove();var Y=a.getOverboughtZone();var b=a.getOversoldZone();var y=x.selectAll().data(r).enter().filter(e=>moment(e.getTime()).isBetween(d,g,"m","[]")).append("g").classed("fcBullish",e=>e.getY()>Y).classed("fcBearish",e=>e.getY()<b).classed("fcNone",e=>e.getY()>=b&&e.getY()<=Y);y.append("rect").classed("fcCandleBody",true).attr("x",e=>h(moment(e.getTime()).toDate())+(1-o)*u/2).attr("y",e=>p(Math.max(e.getY(),0))).attr("height",e=>Math.max(1,p(Math.min(e.getY(),0))-p(Math.max(e.getY(),0)))).attr("width",o*u)}})});