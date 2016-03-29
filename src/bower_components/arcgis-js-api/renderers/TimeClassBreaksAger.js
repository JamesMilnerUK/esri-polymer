// COPYRIGHT © 2016 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/3.16/esri/copyright.txt for details.

define(["dojo/_base/declare","dojo/_base/array","dojo/_base/lang","dojo/has","dojo/date","../kernel","../lang","../symbols/jsonUtils","../Color","./SymbolAger"],function(e,s,i,r,t,n,o,a,l,m){var U={UNIT_DAYS:"day",UNIT_HOURS:"hour",UNIT_MILLISECONDS:"millisecond",UNIT_MINUTES:"minute",UNIT_MONTHS:"month",UNIT_SECONDS:"second",UNIT_WEEKS:"week",UNIT_YEARS:"year"},c=e(m,{declaredClass:"esri.renderer.TimeClassBreaksAger",constructor:function(e,s){this.infos=e,this.timeUnits=s||"day",e.sort(function(e,s){return e.minAge<s.minAge?-1:e.minAge>s.minAge?1:0})},getAgedSymbol:function(e,i){var r=i.getLayer(),n=i.attributes,l=o.isDefined;e=a.fromJson(e.toJson());var m=r._map.timeExtent,U=m.endTime;if(!U)return e;var c=new Date(n[r._startTimeField]),T=t.difference(c,U,this.timeUnits);return s.some(this.infos,function(s){if(T>=s.minAge&&T<=s.maxAge){var i=s.color,r=s.size,t=s.alpha;return i&&e.setColor(i),l(r)&&this._setSymbolSize(e,r),l(t)&&e.color&&(e.color.a=t),!0}},this),e},toJson:function(){var e,s,i,r={agerClassBreakInfos:[]};for(r.timeUnits=this._getRestUnits(this.timeUnits),e=0;e<this.infos.length;e+=1)s=this.infos[e],i={},i.oldestAge=1/0===s.maxAge?null:s.maxAge,i.size=s.size,s.color&&(i.color=l.toJsonColor(s.color)),s.alpha&&(i.alpha=Math.round(255*s.alpha)),r.agerClassBreakInfos[e]=i;return r},_getRestUnits:function(e){var s="esriTimeUnitsDays";switch(e){case c.UNIT_SECONDS:s="esriTimeUnitsSeconds";break;case c.UNIT_MILLISECONDS:s="esriTimeUnitsMilliseconds";break;case c.UNIT_HOURS:s="esriTimeUnitsHours";break;case c.UNIT_MINUTES:s="esriTimeUnitsMinutes";break;case c.UNIT_MONTHS:s="esriTimeUnitsMonths";break;case c.UNIT_WEEKS:s="esriTimeUnitsWeeks";break;case c.UNIT_YEARS:s="esriTimeUnitsYears"}return s}});return i.mixin(c,U),r("extend-esri")&&i.setObject("renderer.TimeClassBreaksAger",c,n),c});