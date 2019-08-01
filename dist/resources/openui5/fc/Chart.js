sap.ui.define(["sap/ui/core/Control","sap/ui/core/ResizeHandler","openui5/fc/TimeAxis","openui5/fc/ValueAxis","openui5/fc/library","openui5/fc/thirdparty/d3","openui5/fc/thirdparty/moment-with-locales"],function(t,e,i,n){"use strict";return t.extend("openui5.fc.Chart",{metadata:{library:"openui5.fc",properties:{height:{type:"string",defaultValue:"100%"},width:{type:"string",defaultValue:"100%"},padding:{type:"string",defaultValue:"0"},start:"string",end:"string",timeframe:"string",max:"string",min:"string"},aggregations:{_timeAxis:{type:"openui5.fc.TimeAxis",multiple:false},_valueAxis:{type:"openui5.fc.ValueAxis",multiple:false},series:{type:"openui5.fc.Series",multiple:true}},defaultAggregation:"series"},init:function(){var t=this;t.setAggregation("_timeAxis",new i);t.setAggregation("_valueAxis",new n);e.register(t,function(){t._draw()})},setStart:function(t){this.getAggregation("_timeAxis").setStart(t);this.setProperty("start",t)},setEnd:function(t){this.getAggregation("_timeAxis").setEnd(t);this.setProperty("end",t)},setTimeframe:function(t){this.getAggregation("_timeAxis").setTimeframe(t);this.setProperty("timeframe",t)},setMin:function(t){this.getAggregation("_valueAxis").setMin(t);this.setProperty("min",t)},setMax:function(t){this.getAggregation("_valueAxis").setMax(t);this.setProperty("max",t)},bindAggregation:function(t,e){if(!e.length)e.length=1e6;return sap.ui.core.Control.prototype.bindAggregation.apply(this,arguments)},setPadding:function(t){var e=t.split(" ");var i=e.length;this._fPaddingTop=+e[0];this._fPaddingRight=+e[i===1?0:1];this._fPaddingBottom=+e[i<3?0:2];this._fPaddingLeft=+e[i===1?0:i===4?3:1];this.setProperty("padding",t)},onAfterRendering:function(){this._draw()},_draw:function(){var t=this;var e=d3.select("#"+t.getId());var i=e.node().offsetWidth;var n=e.node().offsetHeight;var r=e.select("svg").attr("width",i).attr("height",n);t.getAggregation("_timeAxis")._draw();t.getAggregation("_valueAxis")._draw();var s=t.getSeries();for(var a=0;a<s.length;a++){s[a]._draw()}}})});