sap.ui.define(["sap/ui/core/Control","openui5/fc/library","openui5/fc/thirdparty/d3"],function(t){"use strict";return t.extend("openui5.fc.TimeAxis",{metadata:{library:"openui5.fc",properties:{start:"string",end:"string",timeframe:"string"}},init:function(){this._scale=d3.scaleTime()},_draw:function(){var t=this;var e=t.getParent();var a=d3.select("#"+e.getId());var r=a.node().offsetWidth;var i=a.node().offsetHeight;var n=e._fPaddingTop;var d=e._fPaddingLeft;var o=r-d-e._fPaddingRight;var s=i-e._fPaddingBottom-n;var f=t._scale.range([0,o]).domain([moment(t.getStart()).toDate(),moment(t.getEnd()).add(1,"m").toDate()]);d3.select("#"+t.getId()).attr("transform",`translate(${d}, ${n+s})`).call(d3.axisBottom(f))}})});