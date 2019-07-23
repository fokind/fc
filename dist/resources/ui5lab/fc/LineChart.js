sap.ui.define(["ui5lab/fc/Chart","ui5lab/fc/library","ui5lab/fc/thirdparty/d3","ui5lab/fc/thirdparty/moment-with-locales"],function(t){"use strict";return t.extend("ui5lab.fc.LineChart",{metadata:{aggregations:{items:{type:"ui5lab.fc.LineChartItem",multiple:true}}},renderer:{},onAfterRendering:function(){var e=this;t.prototype.onAfterRendering.apply(e);var a=e.getItems();if(!a||a.length<2)return;var r=d3.min(a,t=>t.getY());var i=d3.max(a,t=>t.getY());var n=d3.select("#"+e.getId());var l=n.select("svg");var c=l.select(".fcPlotArea");var s=+c.attr("height");var f=e.getTimeScale();l.select(".fcAxisBottom").attr("transform",`translate(0, ${s})`).call(d3.axisBottom(f));var o=e.getYScale(r,i);l.select(".fcAxisLeft").call(d3.axisLeft(o));var d=c.select(".fcSeries");d.append("path").datum(a).attr("fill","none").attr("stroke","steelblue").attr("stroke-width",2).attr("d",d3.line().x(function(t){return f(moment(t.getTime()).toDate())}).y(function(t){return o(t.getY())}))}})});