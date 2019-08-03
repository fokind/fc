sap.ui.define(["sap/ui/core/Control","sap/ui/core/ResizeHandler","./TimeAxis","./ValueAxis","./library","./thirdparty/d3","./thirdparty/moment-with-locales"],function(t,e,i,r){"use strict";return t.extend("openui5.fc.Chart",{metadata:{library:"openui5.fc",properties:{height:{type:"string",defaultValue:"100%"},width:{type:"string",defaultValue:"100%"},padding:{type:"string",defaultValue:"0"},start:"string",end:"string",timeframe:"string"},aggregations:{_timeAxis:{type:"openui5.fc.TimeAxis",multiple:false},_valueAxis:{type:"openui5.fc.ValueAxis",multiple:false},series:{type:"openui5.fc.Series",multiple:true}},defaultAggregation:"series"},init:function(){var t=this;t.setAggregation("_timeAxis",new i);t.setAggregation("_valueAxis",new r);e.register(t,function(){t._draw()})},setStart:function(t){this.getAggregation("_timeAxis").setStart(t);this.setProperty("start",t)},setEnd:function(t){this.getAggregation("_timeAxis").setEnd(t);this.setProperty("end",t)},setTimeframe:function(t){this.getAggregation("_timeAxis").setTimeframe(t);this.setProperty("timeframe",t)},bindAggregation:function(t,e){if(!e.length)e.length=1e6;return sap.ui.core.Control.prototype.bindAggregation.apply(this,arguments)},setPadding:function(t){var e=t.split(" ");var i=e.length;this._fPaddingTop=+e[0];this._fPaddingRight=+e[i===1?0:1];this._fPaddingBottom=+e[i<3?0:2];this._fPaddingLeft=+e[i===1?0:i===4?3:1];this.setProperty("padding",t)},onAfterRendering:function(){this._draw()},refresh:function(){var t=this;var e=t.getSeries();var i=this.getAggregation("_valueAxis");var r=d3.min(e,function(t){return t._getMin()});i.setMin(r);var n=d3.max(e,function(t){return t._getMax()});i.setMax(n);this._draw()},_draw:function(){var t=this;var e=d3.select("#"+t.getId());if(!e.node())return;var i=e.node().offsetWidth;var r=e.node().offsetHeight;var n=e.select("svg").attr("width",i).attr("height",r);t.getAggregation("_timeAxis")._draw();t.getAggregation("_valueAxis")._draw();var a=t.getSeries();for(var s=0;s<a.length;s++){a[s]._draw()}}})});