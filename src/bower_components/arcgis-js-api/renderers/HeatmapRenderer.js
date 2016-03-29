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

define(["dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/dom-construct","../sniff","../kernel","../lang","../symbols/PictureMarkerSymbol","../Color","./Renderer"],function(t,e,r,n,i,o,s,a,l,u){var c=t([u],{declaredClass:"esri.renderer.HeatmapRenderer",colors:null,blurRadius:10,maxPixelIntensity:100,minPixelIntensity:0,field:null,fieldOffset:null,colorStops:null,constructor:function(t){return this._supportsCanvas=window.CanvasRenderingContext2D?!0:!1,this._supportsCanvas?("string"==typeof t&&(t=JSON.parse(t)),e.mixin(this,t),this._canvas=null,this.colors||this.colorStops||(this.colorStops=[{ratio:0,color:"rgba(255, 140, 0, 0)"},{ratio:.75,color:"rgba(255, 140, 0, 1)"},{ratio:.9,color:"rgba(255, 0,   0, 1)"}]),void(this.gradient=this._generateGradient(this.colorStops||this.colors))):void console.log("The HeatmapRenderer requires a Canvas enabled Browser.  IE8 and less does not support Canvas.")},getSymbol:function(t){if(!this._supportsCanvas)return!1;var e=t.attributes.imageData,r=t.attributes.size;if(!r)return null;var n=this._getContext(r[0],r[1]),i=n.getImageData(0,0,r[0],r[1]);if(window.ArrayBuffer&&e instanceof ArrayBuffer?e=window.Uint8ClampedArray?new Uint8ClampedArray(e):new Uint8Array(e):e.BYTES_PER_ELEMENT&&1!==e.BYTES_PER_ELEMENT&&(e=window.Uint8ClampedArray?new Uint8ClampedArray(e.buffer):new Uint8Array(e.buffer)),window.CanvasPixelArray&&i.data instanceof window.CanvasPixelArray)for(var o=i.data,s=o.length;s--;)o[s]=e[s];else i.data.set(e);n.putImageData(i,0,0);var l=new a(n.canvas.toDataURL(),r[0],r[1]);return l},setColors:function(t){return t&&(t instanceof Array||t.colors)&&(this.gradient=this._generateGradient(t.colors||t),this.colors=t),this},setColorStops:function(t){return t&&(t instanceof Array||t.colorStops)&&(this.gradient=this._generateGradient(t.colorStops||t),this.colorStops=t),this},setMaxPixelIntensity:function(t){return this.maxPixelIntensity=t,this},setMinPixelIntensity:function(t){return this.minPixelIntensity=t,this},setField:function(t){return this.field=t,this},setFieldOffset:function(t){return this.fieldOffset=t,this},setBlurRadius:function(t){return this.blurRadius=t,this},getStats:function(){},getHistogramData:function(){},toJson:function(){var t=e.mixin(this.inherited(arguments),{type:"heatmap",blurRadius:this.blurRadius,colorStops:this._colorsToStops(this.colorStops||this.colors),maxPixelIntensity:this.maxPixelIntensity,minPixelIntensity:this.minPixelIntensity,field:this.field});return null!=this.fieldOffset&&(t.fieldOffset=this.fieldOffset),r.forEach(t.colorStops,function(t){t.color=l.toJsonColor(t.color)}),s.fixJson(t)},_getContext:function(t,e){this._canvas?(this._canvas.width=t,this._canvas.height=e):this._canvas=this._initCanvas(t,e);var r=this._canvas.getContext("2d");return r},_initCanvas:function(t,e){var r=n.create("canvas",{id:"hm_canvas-"+Math.floor(1e3*Math.random()),style:"position: absolute; left: -10000px; top: 0px;"},null);return r.width=t,r.height=e,document.body.appendChild(r),r},_generateGradient:function(t,e){e||(e=512);for(var r,n=this._colorsToStops(t),i=this._getContext(1,e||512),o=i.createLinearGradient(0,0,0,e),s=0;s<n.length;s++)r=n[s],o.addColorStop(r.ratio,r.color.toCss(!0));i.fillStyle=o,i.fillRect(0,0,1,e);var a=i.getImageData(0,0,1,e).data;return a},_colorsToStops:function(t){var e=[];if(!t[0])return e;if(null!=t[0].ratio)e=r.map(t,function(t){return{ratio:t.ratio,color:this._toColor(t.color)}},this);else if(null!=t[0].value){var n,i=1/0,o=-1/0,s=0;for(n=0;n<t.length;n++){var a=t[n].value;i>a&&(i=a),a>o&&(o=a)}s=o-i,this.maxPixelIntensity=o,this.minPixelIntensity=i,e=r.map(t,function(t){var e=t.value,r=this._toColor(t.color);return{value:e,ratio:(e-i)/s,color:r}},this)}else{var l=t.length-1;e=r.map(t,function(t,e){return{color:this._toColor(t),ratio:e/l}},this)}return e},_toColor:function(t){return t.toRgba||t.declaredClass||(t=new l(t)),t}});return i("extend-esri")&&e.setObject("renderer.HeatmapRenderer",c,o),c});