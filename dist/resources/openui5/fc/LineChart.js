sap.ui.define(["./Series","./library","./thirdparty/d3","./thirdparty/moment-with-locales"],function(e){"use strict";return e.extend("openui5.fc.LineChart",{metadata:{aggregations:{items:{type:"openui5.fc.LineChartItem",multiple:true}}},renderer:{},_draw:function(){var t=this;e.prototype._draw.apply(t);var a=t.getParent();var r=a.getAggregation("_timeAxis");var i=r.getStart();var n=r.getEnd();var g=t.getItems().filter(e=>moment(e.getTime()).isBetween(i,n,"m","[]"));var s=r._scale;var d=a.getAggregation("_valueAxis")._scale;var l=d3.select("#"+t.getId());l.append("path").datum(g).attr("fill","none").attr("stroke","steelblue").attr("stroke-width",2).attr("d",d3.line().x(e=>s(moment(e.getTime()).toDate())).y(e=>d(e.getValue())))}})});