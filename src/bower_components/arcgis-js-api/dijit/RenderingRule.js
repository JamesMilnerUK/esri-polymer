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

define(["dojo/_base/declare","dojo/_base/lang","dojo/_base/connect","dojo/_base/array","dojo/i18n!../nls/jsapi","dojo/text!./templates/RenderingRule.html","dojo/store/Memory","dojo/has","../kernel","../layers/RasterFunction","../geometry/Extent","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","dijit/Tooltip","dijit/form/HorizontalSlider","dijit/form/HorizontalRuleLabels","dijit/form/FilteringSelect"],function(e,t,n,i,s,a,r,d,l,o,h,c,u,m,g){var _=e([c,u,m],{declaredClass:"esri.dijit.RenderingRule",templateString:a,widgetsInTemplate:!0,layer:null,map:null,hideApplyButton:!1,_renderingRuleObject:null,_rasterFunctionData:[],_rasterFunctionStore:null,_cachedFunctionList:[],_cachedkeyProperties:{},_pendingDfds:{},_redBandIdStore:null,_greenBandIdStore:null,_blueBandIdStore:null,_donotSaveChanges:!1,_resetBandCombination:!1,_serviceBandCount:3,_defaultBandCombinationFncName:"User Defined Renderer",_firstFncInRenderingRuleList:null,_gammaSliderTooltip:null,constructor:function(t){e.safeMixin(this,t),this._i18n=s,this._defaultBandCombinationFncName=this._i18n.widgets.renderingRule.userDefinedRendererTitle,this._renderingRuleObject=new o},startup:function(){this.inherited(arguments),n.connect(this.rasterFunctionList,"onChange",t.hitch(this,"_onRasterFunctionChange")),n.connect(this.stretchMethodList,"onChange",t.hitch(this,"_onStretchMethodChange")),n.connect(this.gammaSlider,"onChange",t.hitch(this,"_onGammaChange")),n.connect(this.gammaSlider,"onMouseLeave",t.hitch(this,"_onGammaMouseLeave")),n.connect(this._apply,"onclick",t.hitch(this,"_onClickApplyRenderingRule")),n.subscribe("onRenderingRuleApply",t.hitch(this,"_onClickApplyRenderingRule")),n.subscribe("onRenderingRuleReset",t.hitch(this,"_onClickResetRenderingRule")),this.hideApplyButton&&(this._apply.style.display="none")},destroy:function(){this._pendingDfds=null,this._gammaSliderTooltip&&(this._gammaSliderTooltip.destroy(),this._gammaSliderTooltip=null),this.inherited(arguments)},_setLayerAttr:function(e){if(e){this.inherited(arguments),this.layer=e,this._donotSaveChanges=!0,this._firstFncInRenderingRuleList=null,this._fillStretchMehodList(),this._hideStretch();var i=t.hitch(this,"_setupDefaults");this.layer.loaded?this._setupDefaults():n.connect(this.layer,"onLoad",i),this._donotSaveChanges=!1}},_setupDefaults:function(){this._setupBandIdDefaults(),this._setupStretchDefaults(),this._setupRenderingRuleDefaults()},_setupRenderingRuleDefaults:function(){if(this.layer){this._rasterFunctionData=[];var e;for(e=0;e<this._cachedFunctionList.length;e++){var t=this._cachedFunctionList[e];if(t&&this.layer===t.layer)return this._rasterFunctionData=t.data,void this._setupFunctionStore()}this._fillRasterFunctionList(this.layer)}},_setupFunctionStore:function(){if(!this.layer)return void console.log("Could not populate renderers as the layer does not exists");this._rasterFunctionStore=new r({data:this._rasterFunctionData,idProperty:"name"}),this.rasterFunctionList.set("store",this._rasterFunctionStore),this.rasterFunctionList.set("labelAttr","label"),this.rasterFunctionList.set("labelType","html");var e=this.layer.renderingRule,t="";t=e&&e.functionName?"stretch"!==e.functionName.toLowerCase()?e.functionName:this._getRenderingRuleNameFromStretchFunction(e)||this._defaultBandCombinationFncName:this._firstFncInRenderingRuleList&&"none"!==this._firstFncInRenderingRuleList.toLowerCase()?this._firstFncInRenderingRuleList:this._defaultBandCombinationFncName,t&&this._rasterFunctionStore.get(t)&&(this.rasterFunctionList.set("value",t),this._onRasterFunctionChange())},_fillRasterFunctionList:function(e){if(this.layer&&(this._rasterFunctionData=[],null!==e&&null!==e.extent)){var n=new h(e.extent.xmin,e.extent.ymin,e.extent.xmax,e.extent.ymax,e.extent.spatialReference),s=n.getWidth(),a=n.getHeight();if(s/a>=2||a/s>=2){var r=Math.min(s,a)/2,d=n.getCenter();n.update(d.x-r,d.y-r,d.x+r,d.y+r,e.extent.spatialReference)}var l=n.xmin+","+n.ymin+","+n.xmax+","+n.ymax,o=e._getToken(),c="";o&&(c="&token="+o);var u=this.layer.url+"/exportImage?bbox="+l+c+"&imageSize=400,400&f=image&renderingRule=",m=this.layer.bandIds,g=u;m&&m.length>=3&&(g=u+"&bandIds="+m[0]+","+m[1]+","+m[2]),this._addFunctionItemToList(this._defaultBandCombinationFncName,this._defaultBandCombinationFncName,this._i18n.widgets.renderingRule.userDefinedRendererDesc,g,""),e.rasterFunctionInfos&&e.rasterFunctionInfos.length>0&&i.forEach(e.rasterFunctionInfos,t.hitch(this,function(e){if(null===this._firstFncInRenderingRuleList&&(this._firstFncInRenderingRuleList=e.name),"none"!==e.name.toLowerCase()){var t='{"rasterFunction":"'+e.name+'"}';this._addFunctionItemToList(e.name,e.name,e.description,u,t)}}));var _={};_.layer=this.layer,_.data=this._rasterFunctionData,this._cachedFunctionList.push(_),this._setupFunctionStore()}},_addFunctionItemToList:function(e,t,n,i,s){var a={};a.name=e,a.id=t;var r=n;r.length>200&&(r=r.substring(0,200)+"..."),a.description=r,a.label="<html><body><section><h4>"+e+":</h4><table cellspacing='5'><tr><td><img src='"+i+s+"' height='100' width='100'></td><td><p style='white-space:pre-wrap;width:40ex'><i>"+r+"</i></p></td></tr></table></section></body></html>",this._rasterFunctionData.push(a)},_setupBandIdDefaults:function(){if(this.layer){var e=3;e=this.layer.bandCount;var n=this.layer.id,i=this._cachedkeyProperties[n];if(!i&&e>1){this.msgLabel.style.display="",this.msgLabel.innerHTML="<i>"+this._i18n.widgets.renderingRule.bandNamesRequestMsg+"</i>";var s=this.layer.getKeyProperties();this._pendingDfds[n]=1,s.addBoth(t.partial(this._fillBandIdList,this,this.layer))}else this._fillBandIdList(this,this.layer,i);3>e?this._hideBandIds():this._showBandIds()}},_fillBandIdList:function(e,t,n){if(e.layer&&e.layer===t){var i=e._pendingDfds,s=e.layer.id;i&&i[s]&&delete i[s],e.msgLabel.style.display="none",e.msgLabel.innerHTML="";var a=3;a=e.layer.bandCount;var d;n&&n.BandProperties&&n.BandProperties.length>0&&(d=n.BandProperties);var l=e._getBandIdList(a,d,"");e._redBandIdStore=new r({data:l,idProperty:"name"}),e.bandIdsRedList.set("store",e._redBandIdStore),e.bandIdsRedList.set("labelAttr","label"),e.bandIdsRedList.set("labelType","html");var o=e._getBandIdList(a,d,"");e._greenBandIdStore=new r({data:o,idProperty:"name"}),e.bandIdsGreenList.set("store",e._greenBandIdStore),e.bandIdsGreenList.set("labelAttr","label"),e.bandIdsGreenList.set("labelType","html");var h=e._getBandIdList(a,d,"");e._blueBandIdStore=new r({data:h,idProperty:"name"}),e.bandIdsBlueList.set("store",e._blueBandIdStore),e.bandIdsBlueList.set("labelAttr","label"),e.bandIdsBlueList.set("labelType","html");var c=e.layer.bandIds;if(c&&c.length>2)e.bandIdsRedList.set("value",e._getBandName(e._redBandIdStore,c[0])),e.bandIdsGreenList.set("value",e._getBandName(e._greenBandIdStore,c[1])),e.bandIdsBlueList.set("value",e._getBandName(e._blueBandIdStore,c[2]));else if(e._redBandIdStore.data.length>0&&e._greenBandIdStore.data.length>1&&e._blueBandIdStore.data.length>2){var u=e._getRedBandIndex(d),m=e._getGreenBandIndex(d),g=e._getBlueBandIndex(d);e.bandIdsRedList.set("value",e._redBandIdStore.data[u].name),e.bandIdsGreenList.set("value",e._greenBandIdStore.data[m].name),e.bandIdsBlueList.set("value",e._blueBandIdStore.data[g].name)}e._cachedkeyProperties[s]=n;var _=e.rasterFunctionList.get("value");_===e._defaultBandCombinationFncName&&e._enableBandIds()}},_getRedBandIndex:function(e){if(!this.layer||!e)return 0;var t;for(t=0;t<e.length;t++)if(e[t]&&e[t].hasOwnProperty("BandName")&&"red"===e[t].BandName.toLowerCase())return t;return 0},_getGreenBandIndex:function(e){if(!this.layer||!e)return 1;var t;for(t=0;t<e.length;t++)if(e[t]&&e[t].hasOwnProperty("BandName")&&"green"===e[t].BandName.toLowerCase())return t;return 1},_getBlueBandIndex:function(e){if(!this.layer||!e)return 2;var t;for(t=0;t<e.length;t++)if(e[t]&&e[t].hasOwnProperty("BandName")&&"blue"===e[t].BandName.toLowerCase())return t;return 2},_getBandIdList:function(e,t,n){if(this.layer){var i=[];n||(n="Black");var s=!1;t&&e===t.length&&(s=!0);var a;for(a=0;e>a;a++){var r=a,d=a;s&&t[a]&&t[a].BandName?r=t[a].BandName:r++;var l={};l.name=r,l.index=d,l.label="<html><body><span value="+d+"><font color="+n+">"+r+"</font></span></body></html>",i.push(l)}return i}},_getBandName:function(e,t){if(e&&e.data){var n;for(n=0;n<e.data.length;n++){var i=e.data[n];if(i.index===t)return i.name}return""}},_setupStretchDefaults:function(){if(this.layer){var e=this.layer.renderingRule;e&&e.functionName&&"stretch"===e.functionName.toLowerCase()?this._loadStretchFunction():(this.stretchMethodList.set("value","0"),this._onStretchMethodChange(),this.numStdDevText.value=2,this.minPercentText.value=2,this.maxPercentText.value=2,this.gammaSlider.setValue(0),e&&e.functionName?(this.draCheckbox.checked=!0,this.draCheckbox.disabled=!1,this.draLabel.style.color="Black"):this.layer.minValues&&this.layer.minValues.length>0&&this.layer.maxValues&&this.layer.maxValues.length>0?(this.draCheckbox.checked=!1,this.draCheckbox.disabled=!1,this.draLabel.style.color="Black"):(this.draCheckbox.checked=!0,this.draCheckbox.disabled=!0,this.draLabel.style.color="Gray")),this._gammaSliderTooltip||(this._gammaSliderTooltip=new g({connectId:["gammaSliderID"],position:["below","above"],id:"gammaSliderTooltipID"}))}},_loadStretchFunction:function(){var e=this.layer.renderingRule;if(e&&e.functionName&&"stretch"===e.functionName.toLowerCase()){var t=e.functionArguments,n=t.StretchType;if(this.stretchMethodList.set("value",n.toString()),this._onStretchMethodChange(),t.NumberOfStandardDeviations&&(this.numStdDevText.value=t.NumberOfStandardDeviations),this.draCheckbox.checked=t.DRA?!0:!1,t.UseGamma){var i=t.Gamma;t.Gamma.length>0&&(i=t.Gamma[0]);var s=Math.log(i)/Math.log(10);s&&this.gammaSlider.setValue(s)}t.MinPercent&&(this.minPercentText.value=t.MinPercent),t.MaxPercent&&(this.maxPercentText.value=t.MaxPercent)}},_getRenderingRuleNameFromStretchFunction:function(e){if(e&&e.functionName&&"stretch"===e.functionName.toLowerCase()){var t=e.functionArguments,n=t.Raster;return n&&n.functionName||null}},_fillStretchMehodList:function(){this.stretchMethodList.removeOption(this.stretchMethodList.getOptions()),this.stretchMethodList.addOption([{value:"0",label:this._i18n.widgets.renderingRule.noneStretchAlias},{value:"5",label:this._i18n.widgets.renderingRule.minMaxStretchAlias},{value:"3",label:this._i18n.widgets.renderingRule.stdDevStretchAlias},{value:"6",label:this._i18n.widgets.renderingRule.percentClipStretchAlias}]),this.stretchMethodList.set("value","0"),this._onStretchMethodChange()},_onRasterFunctionChange:function(){var e=this.rasterFunctionList.get("value");if(e){var t=this._rasterFunctionStore.get(e).description;this.rasterFunctionList.set("title",t);var n=this.layer.id;e===this._defaultBandCombinationFncName?(this.rasterFunctionRow.width="",this.layer.bandCount>1?(this._showBandIds(),this._pendingDfds[n]?this._disableBandIds():this._enableBandIds()):this._hideBandIds()):(this.domNode.clientWidth>0&&(this.rasterFunctionRow.width=this.domNode.clientWidth),this._hideBandIds()),e===this._defaultBandCombinationFncName||this.layer.version>=10.3?(this.imageEnhancementLabel.style.display="",this.stretchMethodLabel.style.display="",this.stretchDescLabel.style.display="",this.stretchMethodList.domNode.style.display="",this._onStretchMethodChange()):this._hideStretch()}},_onStretchMethodChange:function(){if(!(this.stretchMethodList.getOptions.length<1)){var e=this.stretchMethodList.get("value");switch(this._hideStretchOptions("0"===e?!0:!1),e){case"0":this.stretchMethodNoneDescBlock.style.display="";break;case"3":this.numStdDevBlock.style.display="";break;case"5":this.stretchMethodMinMaxDescBlock.style.display="";break;case"6":this.minMaxPercentDescBlock.style.display="",this.minPercentBlock.style.display="",this.maxPercentBlock.style.display=""}}},_onClickApplyRenderingRule:function(){var e=this.rasterFunctionList.get("value");e!==this._defaultBandCombinationFncName?this._onRasterFunctionApply():this._onBandIdsApply()},_onClickResetRenderingRule:function(){this.layer&&(this.layer.renderingRule=null,this.layer.bandIds=null,this._setupDefaults(),this._onClickApplyRenderingRule())},_onRasterFunctionApply:function(){if(!this._donotSaveChanges&&this.layer){var e=[];this.layer.setBandIds(e,!0);var t=new o;t.functionName=this.rasterFunctionList.get("value");var n=this._getStretchFunction();this.layer.version>=10.3&&n?(n.functionArguments.Raster=t,this.layer.setRenderingRule(n)):this.layer.setRenderingRule(t)}},_onBandIdsApply:function(){if(!this._donotSaveChanges&&this.layer){if(!this._redBandIdStore||!this.bandIdsGreenList||!this.bandIdsBlueList)return void this._onStretchApply(!1);var e=[],t=this._redBandIdStore.get(this.bandIdsRedList.value),n=this._greenBandIdStore.get(this.bandIdsGreenList.value),i=this._blueBandIdStore.get(this.bandIdsBlueList.value);t&&n&&i&&(e.push(t.index),e.push(n.index),e.push(i.index)),this._onStretchApply(!0),this.layer.setBandIds(e)}},_onStretchApply:function(e){if(!this._donotSaveChanges&&this.layer){var t=this._getStretchFunction();this.layer.setRenderingRule(t,e)}},_getStretchFunction:function(){var e=this.stretchMethodList.get("value"),t=null;return"0"!==e&&(t=new o,t.functionName="Stretch",this._buildStretchFunction(t)),t},_buildStretchFunction:function(e){e.functionName="Stretch";var t=this.stretchMethodList.get("value"),n={};n.StretchType=parseInt(t,10),n.DRA=this.draCheckbox.checked?!0:!1;var i=Math.exp(this.gammaSlider.value*Math.log(10));i=parseFloat(parseFloat(i).toFixed(2));var s=[];s.push(i),this.layer.bandCount>1&&(s.push(i),s.push(i)),n.Gamma=s,n.UseGamma=!0,"3"===t?(n.NumberOfStandardDeviations=this.numStdDevText.value,e.outputPixelType="U8"):"6"===t?(n.MinPercent=parseFloat(this.minPercentText.value),n.MaxPercent=parseFloat(this.maxPercentText.value),e.outputPixelType="U8"):"5"===t&&(e.outputPixelType="U8"),e.functionArguments=n},_onGammaChange:function(e){var t=this._gammaSliderTooltip;if(t){var n=Math.exp(e*Math.log(10));t.label=n?parseFloat(n).toFixed(2):e,t.open("gammaSliderID")}},_onGammaMouseLeave:function(){this.gammaTooltipClose()},_disableBandIds:function(){this.bandIdsRedList.set("disabled",!0),this.bandIdsGreenList.set("disabled",!0),this.bandIdsBlueList.set("disabled",!0),this.bandIdsLabel.style.color="Gray"},_enableBandIds:function(){this.bandIdsRedList.set("disabled",!1),this.bandIdsGreenList.set("disabled",!1),this.bandIdsBlueList.set("disabled",!1),""===this.bandIdsRedList.value&&this.bandIdsRedList.set("value","1"),""===this.bandIdsGreenList.value&&this.bandIdsGreenList.set("value","2"),""===this.bandIdsBlueList.value&&this.bandIdsBlueList.set("value","3"),this.bandIdsLabel.style.color="Black"},_showBandIds:function(){this.bandIdsLabelBlock.style.display="",this.bandIdsBlock.style.display="",this.bandIdsMsgBlock.style.display=""},_hideBandIds:function(){this.bandIdsLabelBlock.style.display="none",this.bandIdsBlock.style.display="none",this.bandIdsMsgBlock.style.display="none"},_hideStretch:function(){this.imageEnhancementLabel.style.display="none",this.stretchDescLabel.style.display="none",this.stretchMethodLabel.style.display="none",this.stretchMethodList.domNode.style.display="none",this._hideStretchOptions(!0)},_hideStretchOptions:function(e){var t="";e&&(t="none"),this.gammaBlock.style.display=t,this.draBlock.style.display=t,this.stretchMethodNoneDescBlock.style.display="none",this.stretchMethodMinMaxDescBlock.style.display="none",this.numStdDevBlock.style.display="none",this.minMaxPercentDescBlock.style.display="none",this.minPercentBlock.style.display="none",this.maxPercentBlock.style.display="none"},_getDefaultRedBandIndex:function(){var e;return this._redBandIdStore&&(e=this._redBandIdStore.get("Red")),e||(e=1),e},gammaTooltipClose:function(){this._gammaSliderTooltip&&this._gammaSliderTooltip.close()}});return d("extend-esri")&&t.setObject("dijit.RenderingRule",_,l),_});