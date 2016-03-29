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

define(["require","dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/_base/json","dojo/has","dojo/json","dojo/Deferred","dojo/promise/all","dojo/when","dojo/data/ItemFileWriteStore","dojo/string","dojo/Evented","dojo/_base/kernel","dojo/Stateful","../../kernel","../../lang","../../request","../../tasks/Geoprocessor","dojo/i18n!../../nls/jsapi","./utils","../../IdentityManager"],function(e,t,s,i,r,a,o,n,h,l,m,c,u,d,p,f,b,g,v,_,j){var P=t([p,u],{declaredClass:"esri.dijit.analysis.AnalysisBase",isOutputLayerItemUpdated:!1,analysisGpServer:null,toolName:null,portalUrl:null,jobParams:null,itemParams:null,gp:null,resultParameter:null,signInPromise:null,getResultLyrInfos:!1,checkCreditLimits:!1,_jobInfo:null,_popupInfo:null,_toolServiceUrl:null,_counter:null,constructor:function(e){this.isOutputLayerItemUpdated=!1,this._rids=[],this._counter=0,this._popupInfo=[],e.analysisGpServer?this._signIn(e.analysisGpServer):e.portalUrl&&(this.portalUrl=e.portalUrl,this._signIn(e.portalUrl,!0)),this.i18n={},s.mixin(this.i18n,_.common),s.mixin(this.i18n,_.analysisTools),s.mixin(this.i18n,_.analysisMsgCodes)},execute:function(e){this.jobParams=e.jobParams,this.itemParams=this.jobParams.OutputName?e.itemParams:null,this.signInPromise.then(s.hitch(this,this._checkUser))},_checkUser:function(){var e,t,i;i=f.id.findCredential(this.portalUrl),e=i.userId,e&&(t=this.portalUrl+"/sharing/rest/community/users/"+e,g({url:t,content:{f:"json"}}).then(s.hitch(this,this._handleUserProfileResponse),s.hitch(this,function(e){this.emit("job-fail",{message:e.message+(e.details?e.details.toString():""),jobParams:this.jobParams})})))},_handleUserProfileResponse:function(e){if(b.isDefined(e)&&b.isDefined(e.orgId))if(-1===i.indexOf(["account_admin","account_publisher","org_admin","org_publisher"],e.role))this.emit("job-fail",{message:this.i18n.pubRoleMsg,messageCode:"AB_0001",jobParams:this.jobParams});else if(b.isDefined(e.availableCredits)&&this.get("checkCreditLimits")){var t,a,o={};for(t in this.jobParams)this.jobParams.hasOwnProperty(t)&&("object"==typeof this.jobParams[t]?o[t]=r.toJson(this.jobParams[t]):-1!==i.indexOf(["measurementtype"],t.toLowerCase())&&"StraightLine"!==this.jobParams[t]?(a=r.fromJson(this.jobParams[t]),o[t]=a?a.name.replace(/[\s~`!#$%\^&*+=\-\[\]\\';,\/{}|\\":<>\?]/g,""):"DrivingTime"):o[t]=this.jobParams[t]);this.getCreditsEstimate(this.toolName,o).then(s.hitch(this,function(t){var s=t&&t.cost||t.maximumCost;s&&e.availableCredits>s?b.isDefined(this.itemParams)?this._checkServiceName(e.orgId):(this._submitGpJob(),this.emit("start",this.jobParams)):this.emit("job-fail",{message:this.i18n.insufficientCreditsMsg,messageCode:"AB_0001",jobParams:this.jobParams})}))}else b.isDefined(this.itemParams)?this._checkServiceName(e.orgId):(this._submitGpJob(),this.emit("start",this.jobParams));else this.emit("job-fail",{message:this.i18n.orgUsrMsg,jobParams:this.jobParams})},_checkServiceName:function(e){var t,i,a,o;t=f.id.findCredential(this.portalUrl),i=this.portalUrl+"/sharing/rest/portals/"+e+"/isServiceNameAvailable",a=r.fromJson(this.jobParams.OutputName),this.isSingleTenant&&b.isDefined(a.serviceProperties)&&b.isDefined(a.serviceProperties.name)&&(a.serviceProperties.name=a.serviceProperties.name.replace(/[\s~`!#$%\^&*+=\-\[\]\\';,\/{}|\\":<>\?]/g,"_"),this.jobParams.OutputName=r.toJson(a)),o={name:a.serviceProperties.name,type:"Feature Service",f:"json"},g({url:i,content:o}).then(s.hitch(this,function(e){e.available?(this._createService(),this.emit("start",this.jobParams)):this.emit("job-fail",{message:this.i18n.servNameExists,type:"warning",messageCode:"AB_0002",jobParams:this.jobParams})}),s.hitch(this,function(e){this.emit("job-fail",{message:e.message+(e.details?e.details.toString():""),jobParams:this.jobParams})}))},_createService:function(){var e,t,i,a,o,n;n=f.id.findCredential(this.portalUrl),e=n.userId,t=r.fromJson(this.jobParams.OutputName),e&&(o=this.itemParams.folder,a=this.portalUrl+"/sharing/rest/content/users/"+e+(o&&"/"!==o?"/"+o:"")+"/createService",i={createParameters:r.toJson({currentVersion:10.2,serviceDescription:"",hasVersionedData:!1,supportsDisconnectedEditing:!1,hasStaticData:!0,maxRecordCount:2e3,supportedQueryFormats:"JSON",capabilities:"Query",description:"",copyrightText:"",allowGeometryUpdates:!1,syncEnabled:!1,editorTrackingInfo:{enableEditorTracking:!1,enableOwnershipAccessControl:!1,allowOthersToUpdate:!0,allowOthersToDelete:!0},xssPreventionInfo:{xssPreventionEnabled:!0,xssPreventionRule:"InputOnly",xssInputRule:"rejectInvalid"},tables:[],name:t.serviceProperties.name}),outputType:"featureService",f:"json"},g({url:a,content:i},{usePost:!0}).then(s.hitch(this,this._submitGpJob),s.hitch(this,this._handleCreateServiceError)))},_handleCreateServiceError:function(e){this.emit("job-fail",{message:e.message+(e.details?e.details.toString():""),jobParams:this.jobParams})},_getSelf:function(e){var t=e+"/sharing/rest/portals/self";return g({url:t,content:{culture:d.locale,f:"json"},callbackParamName:"callback",timeout:0},{})},_submitGpJob:function(e){var t;this.itemParams&&(this.currentGpItemId=e.itemId,t=r.fromJson(this.jobParams.OutputName),t.serviceProperties&&(t.serviceProperties.serviceUrl=e.serviceurl),t.itemProperties={itemId:e.itemId},this.itemParams.folder&&(t.itemProperties.folderId=this.itemParams.folder),this.jobParams.OutputName=r.toJson(t)),this.analysisGpServer?(this._toolServiceUrl&&this.gp||this.set("toolServiceUrl",this.analysisGpServer+"/"+this.toolName),this.gp.setUpdateDelay(3e3),this.gp.submitJob(this.jobParams,s.hitch(this,this._gpJobComplete),s.hitch(this,this._gpJobStatus),s.hitch(this,this._gpJobFailed)),this.emit("job-submit",this.jobParams)):this._getSelf(this.portalUrl).then(s.hitch(this,function(e){this.analysisGpServer=e.helperServices.analysis&&e.helperServices.analysis.url?e.helperServices.analysis.url:null,this.set("toolServiceUrl",this.analysisGpServer+"/"+this.toolName),this.gp.setUpdateDelay(3e3),this.gp.submitJob(this.jobParams,s.hitch(this,this._gpJobComplete),s.hitch(this,this._gpJobStatus),s.hitch(this,this._gpJobFailed)),this.emit("job-submit",this.jobParams)}))},_updateItem:function(e){var t,i,a,o,n,h,l,m,c;return t=f.id.findCredential(this.portalUrl),i=t.userId,i?(a=this.itemParams.folder,o=this.portalUrl+"/sharing/rest/content/users/"+i+(a&&"/"!==a?"/"+a:"")+"/items/"+this.currentGpItemId+"/update",e&&(c=e.item.properties),b.isDefined(c)||(c={}),b.isDefined(c.jobUrl)||(c.jobUrl=this._toolServiceUrl+"/jobs/"+this._jobInfo.jobId,c.jobType="GPServer",c.jobId=this._jobInfo.jobId,c.jobStatus="processing",this.itemParams.properties=c),n=s.mixin({f:"json"},this.itemParams),n.properties&&(n.properties=r.toJson(n.properties)),h={},l={},m=g({url:o,content:n},{usePost:!0}),m.then(s.hitch(this,this._handleItemUpdate),s.hitch(this,this._handleUpdateItemError)),m):void 0},_handleItemUpdate:function(){this.isOutputLayerItemUpdated=!0},_handleItemDataUpdate:function(){},_handleUpdateItemError:function(e){this.isOutputLayerItemUpdated=!0,this.emit("job-fail",{message:e.message+(e.details?e.details.toString():""),jobParams:this.jobParams})},_handleErrorResponse:function(e){this.emit("job-fail",e)},_refreshItem:function(){var e,t,s,i;return i=f.id.findCredential(this.portalUrl),e=i.userId,e?(t=this.itemParams.folder,s=this.portalUrl+"/sharing/rest/content/users/"+e+(t&&"/"!==t?"/"+t:"")+"/items/"+this.currentGpItemId+"/refresh",g({url:s,content:{f:"json"}},{usePost:!0})):void 0},_handleItemRefresh:function(){},_readItem:function(){var e,t,i,r,a;return r=f.id.findCredential(this.portalUrl),e=r.userId,e?(t=this.itemParams.folder,i=this.portalUrl+"/sharing/rest/content/users/"+e+(t&&"/"!==t?"/"+t:"")+"/items/"+this.currentGpItemId,a=g({url:i,content:{f:"json"}}),a.then(s.hitch(this,this._updateItem))):void 0},_gpJobStatus:function(e){e.jobParams=this.jobParams,e.resultParameter=this.resultParameter,e.returnProcessInfo=this.jobParams.returnProcessInfo,e.getResultLyrInfos=this.getResultLyrInfos,e.currentGpItemId=this.currentGpItemId,e.itemParams=this.itemParams,"esriJobFailed"===e.jobStatus||"esriJobSucceeded"===e.jobStatus?(e.messages&&(e.message=this._buildErrorMsg(e)),this._checkTimer&&(clearInterval(this._checkTimer),this._checkTimer=null,this._gpJobComplete(e)),"esriJobFailed"===e.jobStatus&&this._deleteItem(!1)):"esriJobCancelled"===e.jobStatus&&(this.itemParams?this._deleteItem(!0):this.emit("job-cancel",e)),this.emit("job-status",e),this._jobInfo=e,this.itemParams&&!this.isOutputLayerItemUpdated&&this._readItem()},_updateRefreshItem:function(e){var t,i=[],a=e[0];i.push(this._refreshItem()),i.push(this._readItem()),t="sync",h(i).then(s.hitch(this,function(){a.outputLayerName=r.fromJson(this.jobParams.OutputName).serviceProperties.name,a.value.itemId=this.currentGpItemId,a.analysisInfo={toolName:this.toolName,jobParams:this.jobParams},this.emit("job-result",a)}),s.hitch(this,this._handleDeleteItemError))},_gpJobComplete:function(e){var t;"esriJobSucceeded"===e.jobStatus&&(e.jobParams=this.jobParams,this.emit("job-success",e),h(this._getGpResultData(e)).then(s.hitch(this,function(a){return a=i.filter(a,function(e){return e.value&&!e.value.empty?e:void 0}),0===a.length?(this.currentGpItemId&&this._deleteItem(!1),void this.emit("job-fail",{message:this.i18n.emptyResultInfoMsg,type:"warning",jobParams:this.jobParams})):(b.isDefined(this.itemParams)&&this.itemParams.properties&&this.itemParams.properties.jobStatus&&"processing"===this.itemParams.properties.jobStatus&&(this.itemParams.properties.jobStatus="completed"),i.forEach(a,function(e){if(e.value.featureSet&&!e.value.url)e.value.featureSet.spatialReference=e.value.layerDefinition.spatialReference;else if(e.value.url&&-1!==e.value.url.indexOf("/FeatureServer/")&&e.value.layerInfo&&e.value.layerInfo.popupInfo){var t=e.value.url.match(/[0-9]+$/g)[0];this._popupInfo[t]=e.value.layerInfo.popupInfo}},this),t=a[0],void(this.jobParams.returnProcessInfo?this.gp.getResultData(e.jobId,"ProcessInfo").then(s.hitch(this,function(e){var s=[];i.forEach(e.value,function(e){s.push(r.fromJson(e))},this),this.currentGpItemId?(this.itemParams.description=j.buildReport(s),this._updateRefreshItem(a)):(t.analysisReport=j.buildReport(s),this.emit("job-result",t))})):this.currentGpItemId?this._updateRefreshItem(a):this.emit("job-result",t)))})))},_gpJobFailed:function(e){var t=s.clone(e);t.jobParams=this.jobParams,this._checkTimer&&(clearInterval(this._checkTimer),this._checkTimer=null),e.messages&&(e.message=this._buildErrorMsg(e)),this.emit("job-fail",e)},_getGpResultData:function(e){var t=[],s=[];return"string"==typeof this.resultParameter?s.push(this.resultParameter):this.resultParameter instanceof Array&&(s=this.resultParameter),i.forEach(s,function(s){t.push(this.gp.getResultData(e.jobId,s))},this),t},cancel:function(e){this.gp.cancelJob(e.jobId).then(s.hitch(this,function(e){"esriJobCancelled"===e.jobStatus&&(this.itemParams?this._deleteItem(!0):this.emit("job-cancel",e))}),function(){})},checkJobStatus:function(e){this.signInPromise.then(s.hitch(this,function(){this.gp.setUpdateDelay(3e3),this._checkTimer=setInterval(s.hitch(this,this._checkStatus,e,s.hitch(this,this._gpJobStatus),s.hitch(this,this._gpJobFailed)),3e3)}))},_checkStatus:function(e,t,s){this.gp.checkJobStatus(e,t,s)},_deleteItem:function(e){var t,i,r,a;a=f.id.findCredential(this.portalUrl),t=a.userId,t&&this.itemParams&&(i=b.isDefined(this.itemParams.folder)?this.itemParams.folder:"",r=this.portalUrl+"/sharing/rest/content/users/"+t+(i&&"/"!==i?"/"+i:"")+"/items/"+this.currentGpItemId+"/delete",g({url:r,content:{f:"json"}},{usePost:!0}).then(s.hitch(this,this._handleItemDelete,e),s.hitch(this,this._handleDeleteItemError)))},_handleItemDelete:function(e,t){e&&this.emit("job-cancel",t)},_handleDeleteItemError:function(e){this.emit("job-fail",{message:e.message+(e.details?e.details.toString():""),jobParams:this.jobParams})},_initFolderStore:function(e,t){this._fportal=new e.Portal(this.portalSelf?{url:this.portalUrl,self:this.portalSelf}:this.portalUrl),this._fportal.signIn().then(s.hitch(this,function(e){this.portalUser=e,this.portalUser.getFolders().then(s.hitch(this,function(e){var s=j.createFolderStore(e,this.portalUser.username);t.resolve(s)}))}))},getFolderStore:function(){var t,r,a,o,h=new n;return this.folderStore?h.resolve(this.folderStore):this.signInPromise.then(s.hitch(this,function(){t=["../../arcgis/Portal"],r=this._counter++,a=this,this._rids&&this._rids.push(r),e(t,function(e){o=a._rids?i.indexOf(a._rids,r):-1,-1!==o&&(a._rids.splice(o,1),a._initFolderStore(e,h))})})),h},_checkToolUrl:function(){var e=new n;return this.analysisGpServer?(this._toolServiceUrl&&this.gp||this.set("toolServiceUrl",this.analysisGpServer+"/"+this.toolName),e.resolve({success:!0})):this._getSelf(this.portalUrl).then(s.hitch(this,function(t){this.analysisGpServer=t.helperServices.analysis&&t.helperServices.analysis.url?t.helperServices.analysis.url:null,this.analysisGpServer&&this.set("toolServiceUrl",this.analysisGpServer+"/"+this.toolName),e.resolve({success:!0})})),e},getCreditsEstimate:function(e,t){var i,r,a,o,h;return r=new n,this._checkToolUrl().then(s.hitch(this,function(){this._toolServiceUrl?h=this._toolServiceUrl:(o=this.portalUrl&&-1!==this.portalUrl.indexOf("dev")?"dev":this.portalUrl&&-1!==this.portalUrl.indexOf("qa")?"qa":"",h="http://analysis"+o+".arcgis.com/arcgis/rest/services/tasks/GPServer/"+this.toolName),i=h.replace("/"+e,"/exts/Estimate/"+e),a=s.mixin({f:"json"},t),g({url:i,content:a},{usePost:!0}).then(function(e){r.resolve(e)},function(e){r.resolve(e)})})),r},_signIn:function(t,r){var a,o,h,l,m;return this.signInPromise=new n,r?(a=["../../arcgis/Portal"],o=this._counter++,h=this,this._rids&&this._rids.push(o),e(a,s.hitch(this,function(e){l=h._rids?i.indexOf(h._rids,o):-1,-1!==l&&(h._rids.splice(l,1),this._portal=new e.Portal(this.portalSelf?{url:t,self:this.portalSelf}:t),this._portal.signIn().then(s.hitch(this,function(e){this.portalUser=e,this._portal.helperServices&&this._portal.helperServices.analysis&&this._portal.helperServices.analysis.url?(this.analysisGpServer=this._portal.helperServices.analysis.url,g({url:this.analysisGpServer,content:{f:"json"},callbackParamName:"callback"}).then(s.hitch(this,function(){m=f.id.findCredential(this.analysisGpServer),this.signInPromise.resolve(m)}),s.hitch(this,function(e){this.signInPromise.reject(e)}))):this.signInPromise.resolve(e)}),s.hitch(this,this._handleSignInError)))}))):g({url:t,content:{f:"json"},callbackParamName:"callback"}).then(s.hitch(this,function(){var e,i;e=f.id.findCredential(t),b.isDefined(e)?(i=f.id.findServerInfo(this._toolServiceUrl),b.isDefined(i)&&b.isDefined(i.owningSystemUrl)&&(this.portalUrl=i.owningSystemUrl),this.signInPromise.resolve(e)):f.id.getCredential(t).then(s.hitch(this,function(e){e=f.id.findCredential(t),i=f.id.findServerInfo(this._toolServiceUrl),b.isDefined(i)&&b.isDefined(i.owningSystemUrl)&&(this.portalUrl=i.owningSystemUrl),this.signInPromise.resolve(e)}),s.hitch(this,this._handleSignInError))}),s.hitch(this,this._handleSignInError)),this.signInPromise},_handleSignInError:function(e){this.emit("job-fail",{message:this.i18n.analysisSignInErrorMsg,messageCode:"AB_0003"}),this.signInPromise.reject(e)},_buildErrorMsg:function(e){var t,s,a="",o=[];return o=i.filter(e.messages,function(e){return"esriJobMessageTypeError"!==e.type&&"esriJobMessageTypeWarning"!==e.type||!e.description||-1===e.description.indexOf("messageCode")?void 0:e.description}),o.length>0&&i.forEach(o,function(i){t=r.fromJson(i.description),s="","esriJobMessageTypeWarning"===i.type&&(e.type="warning"),t.messageCode?(s=b.isDefined(this.i18n[t.messageCode])?this.i18n[t.messageCode]:t.message,s=b.isDefined(t.params)?c.substitute(s,t.params):s,a+=s+"&nbsp;"):t.error&&t.error.messageCode&&(s=b.isDefined(this.i18n[t.error.messageCode])?this.i18n[t.error.messageCode]:t.error.message,s=b.isDefined(t.error.params)?c.substitute(s,t.error.params):s,a+=s+"&nbsp;")},this),a},_toolServiceUrlSetter:function(e){this._toolServiceUrl=e,this.gp=new v(e)},_setToolServiceUrlAttr:function(e){this._toolServiceUrl=e,this.gp=new v(e)},checkCreditLimitsAttr:function(e){this.checkCreditLimits=e}});return a("extend-esri")&&s.setObject("dijit.analysis.AnalysisBase",P,f),P});