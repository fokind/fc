sap.ui.define(["sap/ui/core/Control","./library","ui5lab/fc/thirdparty/d3","ui5lab/fc/thirdparty/moment-with-locales"],function(t){"use strict";return t.extend("ui5lab.fc.CandlestickChart",{metadata:{library:"ui5lab.fc",properties:{width:"float",height:"float",padding:"string",colorPositive:"string",colorNegative:"string"},aggregations:{candles:{type:"ui5lab.fc.Candle",multiple:true}},defaultAggregation:"candles"},init:function(){var t=this;$(window).on("resize",function(){t.rerender()})},bindAggregation:function(t,e){if(!e.length)e.length=1e5;return sap.ui.core.Control.prototype.bindAggregation.apply(this,arguments)},onAfterRendering:function(){var t=this;var e=t.getCandles();if(!e||e.length<2)return;var a=this.getId();var r=this.getParent().getId();var i=t.getPadding().split(" ");var n=i.length;var o=+i[0];var g=+i[n===1?0:1];var l=+i[n<3?0:2];var s=+i[n===1?0:n===4?3:1];var d=t.getWidth();if(!d){d=$("#"+r).width()}var h=d-s-g;var c=t.getHeight();if(!c){c=$("#"+r).height()}var m=c-l-o;var v=d3.min(e,t=>t.getLow());var f=d3.max(e,t=>t.getHigh());var p=.8;var u=t.getColorPositive();var C=t.getColorNegative();var x=d3.select("#"+a).attr("width",d).attr("height",c);var w=x.select(".fcChart");w.attr("transform",`translate(${s}, ${o})`);var y=moment(e[0].getX()).toDate();var b=moment(e[1].getX()).diff(y,"m");var A=moment(e[e.length-1].getX()).add(b,"m").toDate();var D=d3.scaleTime().range([0,h]).domain([y,A]);w.select(".fcAxisBottom").attr("transform",`translate(0, ${m})`).call(d3.axisBottom(D));var O=D(moment(y).add(b,"m").toDate());var X=d3.scaleLinear().range([m,0]).domain([v,f]);w.select(".fcAxisLeft").call(d3.axisLeft(X));var L=w.select(".fcPlotArea");var P=L.selectAll().data(e).enter().append("g");P.append("line").attr("x1",t=>D(moment(t.getX()).toDate())+O/2).attr("x2",t=>D(moment(t.getX()).toDate())+O/2).attr("y1",t=>X(t.getHigh())).attr("y2",t=>X(t.getLow())).attr("fill",t=>t.getClose()>=t.getOpen()?u:C).attr("stroke-width",1).attr("stroke",t=>t.getClose()>=t.getOpen()?u:C);P.append("rect").attr("x",t=>D(moment(t.getX()).toDate())+(1-p)*O/2).attr("y",t=>X(Math.max(t.getOpen(),t.getClose()))).attr("height",t=>Math.max(1,X(Math.min(t.getOpen(),t.getClose()))-X(Math.max(t.getOpen(),t.getClose())))).attr("width",p*O).attr("fill",t=>t.getClose()>=t.getOpen()?u:C).attr("stroke-width",0)}})});