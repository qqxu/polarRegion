// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt for details.
//>>built
define("esri/plugins/FeatureLayerStatistics","dojo/_base/lang dojo/_base/array dojo/_base/declare dojo/has dojo/Deferred dojo/on dojo/promise/all dojo/when ../kernel ../config ../SpatialReference ../tasks/query ../tasks/StatisticDefinition ../tasks/GenerateRendererTask ../tasks/UniqueValueDefinition ../tasks/ClassBreaksDefinition ../tasks/GenerateRendererParameters ../tasks/generateRenderer ../tasks/GeometryService ../tasks/ProjectParameters ../layers/TileInfo ../layers/HeatmapManager ../workers/heatmapCalculator ../geometry/mathUtils ../geometry/webMercatorUtils ../geometry/scaleUtils ../geometry/Point ../geometry/Extent".split(" "),
function(t,p,H,I,q,D,J,y,K,z,x,u,E,L,M,N,A,O,P,Q,R,S,F,B,G,T,U,V){z=z.defaults;var W=F.prototype._calculateIntensityMatrix,X=F.calculateStats,Y=S.prototype._getScreenPoints,w=H(null,{declaredClass:"esri.plugins.FeatureLayerStatistics",sampleSize:500,worldScale:1E8,generalizeForScale:4E5,generalizeForResolution:105,mapWidth:1280,mapHeight:800,mapPaddingRatioForFE:0.25,minDistance:12,minLength:30,minSize:15,minScaleRelaxationRatio:0.25,samplingThreshold:2E4,numBins:10,numClasses:5,classificationMethod:"equal-interval",
standardDeviationInterval:1,geometryServiceUrl:window.location.protocol+"//utility.arcgisonline.com/arcgis/rest/services/Geometry/GeometryServer",tileInfo:new R({rows:256,cols:256,dpi:96,format:"JPEG",compressionQuality:90,origin:{x:-2.0037508342787E7,y:2.0037508342787E7},spatialReference:{wkid:102100,latestWkid:3857},lods:[{level:0,resolution:156543.03392800014,scale:5.91657527591555E8},{level:1,resolution:78271.51696399994,scale:2.95828763795777E8},{level:2,resolution:39135.75848200009,scale:1.47914381897889E8},
{level:3,resolution:19567.87924099992,scale:7.3957190948944E7},{level:4,resolution:9783.93962049996,scale:3.6978595474472E7},{level:5,resolution:4891.96981024998,scale:1.8489297737236E7},{level:6,resolution:2445.98490512499,scale:9244648.868618},{level:7,resolution:1222.992452562495,scale:4622324.434309},{level:8,resolution:611.4962262813797,scale:2311162.217155},{level:9,resolution:305.74811314055756,scale:1155581.108577},{level:10,resolution:152.87405657041106,scale:577790.554289},{level:11,resolution:76.43702828507324,
scale:288895.277144},{level:12,resolution:38.21851414253662,scale:144447.638572},{level:13,resolution:19.10925707126831,scale:72223.819286},{level:14,resolution:9.554628535634155,scale:36111.909643},{level:15,resolution:4.77731426794937,scale:18055.954822},{level:16,resolution:2.388657133974685,scale:9027.977411},{level:17,resolution:1.1943285668550503,scale:4513.988705},{level:18,resolution:0.5971642835598172,scale:2256.994353},{level:19,resolution:0.29858214164761665,scale:1128.497176}]}),_outlineInfo:[{size:5,
width:0},{size:10,width:1},{size:40,width:1},{size:250,width:2}],constructor:function(a){t.mixin(this,a);this._scaleCache=this._sampleCache=null;this._gsTask=z.geometryService||new P(this.geometryServiceUrl);if(this.layer.loaded)this._createGRTask();else D.once(this.layer,"load",t.hitch(this,this._createGRTask))},destroy:function(){this.layer=this._grTask=this._scaleCache=this._sampleCache=null},getUniqueValues:function(a){var b=new q;!a||!a.field?this._rejectDfd(b,"FeatureLayerStatistics.getUniqueValues: 'field' parameter is missing."):
this._callAfterLoad(this._findUniqueValues,{dfd:b,params:a});return b.promise},getFieldStatistics:function(a){var b=new q;!a||!a.field?this._rejectDfd(b,"FeatureLayerStatistics.getFieldStatistics: 'field' parameter is missing."):this._callAfterLoad(this._getFieldStats,{dfd:b,params:a});return b.promise},getSpatialStatistics:function(a){var b=new q;!a||!a.features||!a.features.length?this._rejectDfd(b,"FeatureLayerStatistics.getSpatialStatistics: 'features' parameter is missing or it has no features."):
this._callAfterLoad(this._spatialStats,{dfd:b,params:a});return b.promise},getSuggestedSizeRange:function(a){var b=new q;this._callAfterLoad(this._getSizeRange,{dfd:b,params:a});return b.promise},getSuggestedOutline:function(a){var b=new q;this._callAfterLoad(this._getOutline,{dfd:b,params:a});return b.promise},getHeatmapStatistics:function(a){var b=new q;this._callAfterLoad(this._getHeatmapStats,{dfd:b,params:a});return b.promise},getHistogram:function(a){var b=new q;!a||!a.field?this._rejectDfd(b,
"FeatureLayerStatistics.getHistogram: 'field' parameter is missing."):this._callAfterLoad(this._getHistogram,{dfd:b,params:a});return b.promise},getSampleFeatures:function(a){var b=new q;this._callAfterLoad(this._sampleFeatures,{dfd:b,params:a});return b.promise},getSuggestedScaleRange:function(a){var b=new q;this._callAfterLoad(this._scaleRange,{dfd:b,params:a});return b.promise},getClassBreaks:function(a){var b=new q;!a||!a.field?this._rejectDfd(b,"FeatureLayerStatistics.getClassBreaks: 'field' parameter is missing."):
this._callAfterLoad(this._findClassBreaks,{dfd:b,params:a});return b.promise},_srcQuery:"service-query",_srcGenRend:"service-generate-renderer",_srcMemory:"features-in-memory",_srcFeatures:"features",_log10e:Math.LOG10E,_reNumber:/\s*(\+|-)?((\d+(\.\d+)?)|(\.\d+))\s*/gi,_isCollection:function(){return!this.layer.url},_getFieldStats:function(a){var b=this,c=a.params,d=t.isFunction(c.field),e=d?null:this.layer.getField(c.field);if(!e||!this._rejectNonNumeric(a.dfd,e,"getFieldStatistics"))!this._isCollection()&&
!c.features&&!d?(c.normalizationType?this._statsFromGenRend(c):this._statsFromQuery(c)).then(function(b){a.dfd.resolve(b)}).otherwise(function(d){b._statsFromMemory(c).then(function(b){a.dfd.resolve(b)}).otherwise(function(c){b._rejectDfd(a.dfd,"FeatureLayerStatistics.getFieldStatistics: unable to calculate field statistics.")})}):this._statsFromMemory(c).then(function(b){a.dfd.resolve(b)}).otherwise(function(c){b._rejectDfd(a.dfd,"FeatureLayerStatistics.getFieldStatistics: unable to calculate field statistics.")})},
_statsFromQuery:function(a){var b=this.layer,c=new q;if(b.url&&b.supportsStatistics){var d=new u,e=this,f=this._getRangeExpr(a.field,a.minValue,a.maxValue);f&&(d.where=f);d.outStatistics=p.map("min max avg stddev count sum var".split(" "),function(b){var c=new E;c.statisticType=b;c.onStatisticField=a.field;c.outStatisticFieldName="var"===b?"variance":b;return c});b.queryFeatures(d).then(function(a){a=(a=a&&a.features)&&a[0]&&a[0].attributes;var b,d={source:e._srcQuery};for(b in a)d[b.toLowerCase()]=
a[b];d.min===d.max&&(null!=d.min&&null==d.stddev)&&(d.stddev=d.variance=0);c.resolve(d)}).otherwise(function(a){e._rejectDfd(c,"FeatureLayerStatistics: Statistics query operation failed.")})}else this._rejectDfd(c,"FeatureLayerStatistics: Statistics query requires a layer that supports statistics.");return c.promise},_statsFromMemory:function(a){var b=new q,c;if("percent-of-total"===a.normalizationType){c=this._calcStatsFromMemory({field:a.field}).sum;if(null==c){this._rejectDfd(b,"getFieldStatistics: invalid normalizationTotal.");
return}a=t.mixin({normalizationTotal:c},a)}b.resolve(this._calcStatsFromMemory(a));return b.promise},_calcStatsFromMemory:function(a){var b=!(!a.features||!a.features.length),c=this._getDataValues(b?a.features:this.layer.graphics,a);a=this._calcStatistics(c,!a.normalizationType);a.source=b?this._srcFeatures:this._srcMemory;return a},_getDataValues:function(a,b){var c=b.field,d=t.isFunction(c),e=b.normalizationType,f=b.normalizationField,g=b.normalizationTotal,h=null==b.minValue?-Infinity:b.minValue,
l=null==b.maxValue?Infinity:b.maxValue,k,m,n,s=[];p.forEach(a,function(a){k=a.attributes;d?n=c.call(null,a):k&&(n=k[c]);e&&null!=n&&(m=k&&parseFloat(k[f]),"log"===e&&0!=n?n=Math.log(n)*this._log10e:"percent-of-total"===e&&!isNaN(g)&&0!=g?n=100*(n/g):"field"===e&&(!isNaN(m)&&0!=m)&&(n/=m));null!=n&&(!isNaN(n)&&n>=h&&n<=l)&&s.push(n)},this);return s},_calcStatistics:function(a,b){var c=Infinity,d=-Infinity,e=0,f=null,g=null,h=null,l=null;p.forEach(a,function(a){e++;f+=a;a<c&&(c=a);a>d&&(d=a)});if(e){var g=
f/e,k=0;p.forEach(a,function(a){k+=Math.pow(a-g,2)});l=b?1<e?k/(e-1):0:0<e?k/e:0;h=Math.sqrt(l)}return{min:e?c:null,max:e?d:null,count:e,sum:f,avg:g,stddev:h,variance:l}},_statsFromGenRend:function(a){var b=new q,c=this,d=a.normalizationType,e=a.normalizationField;this.getClassBreaks({field:a.field,classificationMethod:"standard-deviation",standardDeviationInterval:0.25,normalizationType:d,normalizationField:"field"===d?e:void 0,minValue:a.minValue,maxValue:a.maxValue}).then(function(a){var d,e,l;
p.some(a.classBreakInfos,function(a,b){a.hasAvg&&(d=a);return!!d});d&&(l=d.maxValue-d.minValue,e=d.minValue+l/2,l*=4);b.resolve({min:a.minValue,max:a.maxValue,avg:e,stddev:l,source:c._srcGenRend})}).otherwise(function(a){c._rejectDfd(b,"FeatureLayerStatistics.getFieldStatistics: unable to calculate class breaks.")});return b.promise},_spatialStats:function(a){var b=a.params.features,c=this.layer.geometryType,d={},c={point:"esriGeometryPoint"===c,mPoint:"esriGeometryMultipoint"===c,line:"esriGeometryPolyline"===
c,polygon:"esriGeometryPolygon"===c};c.point?d=this._getPointStats(b):c.mPoint?d=this._getPointStats(b,!0):c.line?d=this._getLineStats(b):c.polygon&&(d=this._getPolygonStats(b));d.avgXY=this._getAvgXY(b,c);a.dfd.resolve(d)},_getPointStats:function(a,b){var c,d,e=a.length,f,g,h={},l={},k=0,m=0,n=Infinity,s=-Infinity,r=0,C=0,p,q,v=[];if(b)for(c=0;c<e;c++)a[c].geometry&&v.push.apply(v,a[c].geometry.points);else v=a;e=v.length;for(c=0;c<e;c++)if(b?(h.x=v[c][0],h.y=v[c][1],f=h):f=v[c].geometry,f){p=Infinity;
q=-Infinity;for(d=0;d<e;d++)d!==c&&(b?(l.x=v[d][0],l.y=v[d][1],g=l):g=v[d].geometry,g&&(g=B.getLength(f,g),0<g&&(g<p&&(p=g),g<n&&(n=g),g>q&&(q=g),g>s&&(s=g))));Infinity!==p&&(++r,k+=p);-Infinity!==q&&(++C,m+=q)}return{minDistance:Infinity!==n?n:null,maxDistance:-Infinity!==s?s:null,avgMinDistance:r?k/r:null,avgMaxDistance:C?m/C:null}},_getLineStats:function(a){var b,c=a.length,d,e={},f={},g=Infinity,h=-Infinity,l=0,k=0;for(b=0;b<c;b++)if(d=a[b].geometry)d=this._getLineLength(d,e,f),0<d&&(++k,l+=d,
d<g&&(g=d),d>h&&(h=d));return{minLength:Infinity!==g?g:null,maxLength:-Infinity!==h?h:null,avgLength:k?l/k:null}},_getLineLength:function(a,b,c){a=a.paths;var d,e=a.length,f,g=0;for(d=0;d<e;d++)f=a[d],f=this._getActualLineLength(f,b,c),0<f&&(g+=f);return g},_getApproxLineLength:function(a,b,c){var d=a[0],e=a[a.length-1],f=0;d&&(e&&d[0]===e[0]&&d[1]===e[1])&&(e=a[a.length-2]);d&&(e&&d!==e)&&(b.x=d[0],b.y=d[1],c.x=e[0],c.y=e[1],f=B.getLength(b,c));return f},_getActualLineLength:function(a,b,c){var d,
e=a.length,f,g,h=0;for(d=0;d<e-1;d++)f=a[d],g=a[d+1],f&&g&&(b.x=f[0],b.y=f[1],c.x=g[0],c.y=g[1],h+=B.getLength(b,c));return h},_getPolygonStats:function(a){var b,c=a.length,d,e=Infinity,f=-Infinity,g=0,h=0;for(b=0;b<c;b++)if(a[b].geometry&&(d=a[b].geometry.getExtent()))d=(d.getWidth()+d.getHeight())/2,0<d&&(++h,g+=d,d<e&&(e=d),d>f&&(f=d));return{minSize:Infinity!==e?e:null,maxSize:-Infinity!==f?f:null,avgSize:h?g/h:null}},_getAvgXY:function(a,b){var c,d,e,f=a.length,g,h,l,k,m=null,n=null,s=0,r;for(c=
0;c<f;c++)if(d=a[c].geometry)if(b.point)++s,m+=d.x,n+=d.y;else if(b.mPoint){l=d.points;h=l.length;for(d=0;d<h;d++)++s,m+=l[d][0],n+=l[d][1]}else if(b.line){k=d.paths;g=k.length;for(d=0;d<g;d++){l=k[d];h=l.length;for(e=0;e<h;e++)++s,m+=l[e][0],n+=l[e][1]}}else if(b.polygon){k=d.rings;g=k.length;for(d=0;d<g;d++){l=k[d];h=l.length;for(e=0;e<h;e++)++s,m+=l[e][0],n+=l[e][1]}}null!=m&&null!=n&&(r={x:m/s,y:n/s});return r},_getSizeRange:function(a){var b=this,c=a.params,d=this.layer,e=d.getMap();if("esriGeometryPolygon"!==
d.geometryType)this._rejectDfd(a.dfd,"FeatureLayerStatistics.getSuggestedSizeRange: not supported for points and lines.");else if(e)if(c&&"visible-scale-range"===c.optimizeForScale){var f=this._projectExtent(d.fullExtent,this.tileInfo.spatialReference);this.getSuggestedScaleRange({map:!1}).then(function(c){b._processSizeRange(c.spatialStatistics,e,a.dfd,f,c)}).otherwise(function(c){b._rejectDfd(a.dfd,"FeatureLayerStatistics.getSuggestedSizeRange: unable to calculate suggested scale range.")})}else this._getFeatures(e,
c).then(function(c){b.getSpatialStatistics({features:c}).then(function(c){b._processSizeRange(c,e,a.dfd)}).otherwise(function(c){b._rejectDfd(a.dfd,"FeatureLayerStatistics.getSuggestedSizeRange: unable to calculate spatial statistics.")})}).otherwise(function(c){b._rejectDfd(a.dfd,c.message)});else this._rejectDfd(a.dfd,"FeatureLayerStatistics.getSuggestedSizeRange: layer has to be added to the map.")},_processSizeRange:function(a,b,c,d,e){var f=this;y(d).always(function(d){d=d&&d.hasOwnProperty("xmin")?
d:null;f._calcSizeRange(a,b,c,d,e)})},_getFeatures:function(a,b){var c=new q,d=this,e;b&&b.useMapExtent?(e=new u,e.geometry=a.extent,e=this.layer.queryFeatures(e)):e={features:this.layer.graphics.slice(0)};y(e).then(function(a){(a=a&&a.features)&&a.length?c.resolve(a):d._rejectDfd(c,"FeatureLayerStatistics: layer has 0 features.")}).otherwise(function(a){d._rejectDfd(c,"FeatureLayerStatistics: unable to query features.")});return c.promise},_calcSizeRange:function(a,b,c,d,e){var f=a&&a.avgSize,g=
b.getResolution();b=b.getScale();if(null==f||isNaN(f))this._rejectDfd(c,"FeatureLayerStatistics.getSuggestedSizeRange: invalid average feature size.");else if(!g||!b)this._rejectDfd(c,"FeatureLayerStatistics.getSuggestedSizeRange: invalid map scale/resolution.");else{var h;if(e){var l=g/b;d=this._getScaleValues(d,e);var k=d.feScaleIndex,m=[],n=[];h=d.scales[k];p.forEach(d.scales,function(a,b){var c=this._calcSizeValues(f,l*a),d=-1<k&&b>k?2:1;m.push({value:a,size:c.min/d});n.push({value:a,size:c.max/
d})},this);d={type:"sizeInfo",expression:"view.scale",stops:m};g={type:"sizeInfo",expression:"view.scale",stops:n}}else g=this._calcSizeValues(f,g),d=g.min,g=g.max;c.resolve({minSize:d,maxSize:g,spatialStatistics:a,avgFeatureSize:f,scaleAtFullExtent:h,suggestedScaleRange:e})}},_getScaleValues:function(a,b){var c=this.tileInfo.lods,d=this.layer.minScale||c[0].scale,c=this.layer.maxScale||c[c.length-1].scale,e=b&&b.minScale||0,f=b&&b.maxScale||0,g=a&&this._findLODForFE(this.tileInfo.lods,a,this.mapWidth,
this.mapHeight),g=g&&g.scale<d&&g.scale>c?Math.round(g.scale):0,h=p.map([d,c,e,f,g],Math.round);h.sort(this._numberSorter);h=p.filter(h,function(a,b){return!!a&&p.indexOf(h,a)===b});h=p.filter(h,function(a,b,c){return b?5<Math.abs(a-c[b-1]):!0});return{scales:h,feScaleIndex:p.indexOf(h,g)}},_numberSorter:function(a,b){return a-b},_findLODForFE:function(a,b,c,d){var e=a.length,f=b.getWidth(),g=b.getHeight(),h,l;for(b=0;b<e;b++)if(h=a[b],c*h.resolution<f||d*h.resolution<g){l=0===b?a[b]:a[b-1];break}else if(b===
e-1){l=a[b];break}return l},_calcSizeValues:function(a,b){a=Math.ceil(a/b);var c=Math.ceil(a/4);4>c?c=4:16<c&&(c=16);var d=5*c;return{min:c,max:50>d?50:d}},_getOutline:function(a){var b=this;"esriGeometryPolygon"!==this.layer.geometryType?this._rejectDfd(a.dfd,"FeatureLayerStatistics.getSuggestedOutline: not supported for points and lines."):this._getFeatures().then(function(c){b.getSpatialStatistics({features:c}).then(function(d){if(d.avgSize){var e;p.some(c,function(a){a.geometry&&(e=a.geometry.spatialReference);
return!!e});b._calcOutline(d,e,a.params,a.dfd)}else b._rejectDfd(a.dfd,"FeatureLayerStatistics.getSuggestedOutline: average feature size is 0 or null.")}).otherwise(function(c){b._rejectDfd(a.dfd,"FeatureLayerStatistics.getSuggestedOutline: unable to calculate spatial statistics.")})}).otherwise(function(c){b._rejectDfd(a.dfd,c.message)})},_calcOutline:function(a,b,c,d){var e=a.avgSize,f=c&&null!=c.allowZeroWidth?c.allowZeroWidth:!0,g=39.37*96*T.getUnitValueForSR(b);b=p.map(p.filter(this._outlineInfo,
function(a,b){return f||1<b}),function(a){return{size:a.width,value:Math.round(e/a.size*g)}});b.sort(function(a,b){return a.value-b.value});d.resolve({widthInfo:{type:"sizeInfo",target:"outline",expression:"view.scale",stops:b},spatialStatistics:a})},_getHeatmapStats:function(a){var b=this,c=this.layer,d=a.params,e=a.dfd,f=d.fieldOffset;a=d.field&&this.layer.getField(d.field);if(!d.field||!this._rejectNonNumeric(e,a,"getHeatmapStatistics"))d.field&&null==f?c.statisticsPlugin.getFieldStatistics({field:d.field}).then(function(a){b._calcHeatmapStats(a,
f,d,e)}).otherwise(function(a){b._rejectDfd(e,"FeatureLayerStatistics.getHeatmapStatistics: unable to calculate field statistics.")}):this._calcHeatmapStats(null,f,d,e)},_calcHeatmapStats:function(a,b,c,d){var e=this;if(a){var f=a.min,g=a.max;a.count?f===g&&0===f?b=1:0>=g?b="abs":0>f&&(b=-1.01*f):b=1}this._heatStatsFromMemory(c,b).then(function(c){c.fieldStatistics=a;c.fieldOffset=b;d.resolve(c)}).otherwise(function(a){e._rejectDfd(d,"FeatureLayerStatistics.getHeatmapStatistics: unable to calculate heatmap statistics.")})},
_heatStatsFromMemory:function(a,b){var c=new q,d=this.layer,e=d.graphics,f=e.length,g=d.getMap();if(!f)return c.resolve({count:0,min:null,max:null,avg:null,stddev:null,source:this._srcMemory}),c.promise;(d=(d=g&&W(Y(e,g,d),g.width,g.height,a.blurRadius||10,a.field,b))&&d.matrix&&X(d.matrix))?c.resolve({count:f,min:d.min,max:d.max,avg:d.mean,stddev:d.stdDev,source:this._srcMemory}):this._rejectDfd(c,"FeatureLayerStatistics.getHeatmapStatistics: unable to calculate heatmap statistics.");return c.promise},
_getHistogram:function(a){var b=this,c=a.params,d=c.minValue,e=c.maxValue,f=null!=d&&null!=e,g=this.layer.getField(c.field),h=!c.classificationMethod||"equal-interval"===c.classificationMethod;this._rejectNonNumeric(a.dfd,g,"getHistogram")||(c.normalizationType||!h?this._binParamsFromGenRend(c).then(function(g){if(f)if(d>g.max||e<g.min)b._rejectDfd(a.dfd,"FeatureLayerStatistics.getHistogram: custom value range is beyond field value range.");else{var k=b._getFieldExpr(c,g.normTotal),k=b._getRangeExpr(k,
d,e);h?b._getBins(a,g.sqlExpr,d,e,null,"parameters",null,g.excludeZerosExpr):b._binParamsFromGenRend(c,k).then(function(c){b._getBins(a,c.sqlExpr,c.min,c.max,c.intervals,c.source,c.normTotal,c.excludeZerosExpr)}).otherwise(function(c){b._rejectDfd(a.dfd,"FeatureLayerStatistics.getHistogram: unable to calculate histogram parameters using custom min/max values.")})}else b._getBins(a,g.sqlExpr,g.min,g.max,g.intervals,g.source,g.normTotal,g.excludeZerosExpr)}).otherwise(function(c){b._rejectDfd(a.dfd,
"FeatureLayerStatistics.getHistogram: unable to calculate min/max from generate renderer operation.")}):f?this._getBins(a,null,d,e,null,"parameters"):this.getFieldStatistics(c).then(function(c){c.count?b._getBins(a,null,c.min,c.max,null,c.source):b._rejectDfd(a.dfd,"FeatureLayerStatistics.getHistogram: cannot calculate histogram for 0 features (statistics.count \x3d 0).")}).otherwise(function(c){b._rejectDfd(a.dfd,"FeatureLayerStatistics.getHistogram: unable to calculate min/max.")}))},_getBins:function(a,
b,c,d,e,f,g,h){var l=this,k=a.params.field,m=a.params.numBins||this.numBins,n=(d-c)/m,s,r=c,q;if(!e){e=[];for(s=1;s<=m;s++)q=r+n,e.push([r,q]),r=q}b=b||k;this._isCollection()?this._countBinsInMemory(a,c,d,e,g,f):this._queryBins(b,e,h).then(function(b){b=p.map(b,function(a,b){return{minValue:e[b][0],maxValue:e[b][1],count:a}});a.dfd.resolve({bins:b,minValue:c,maxValue:d,normalizationTotal:g,source:l._srcQuery,statisticsSource:f})}).otherwise(function(b){l._countBinsInMemory(a,c,d,e,g,f)})},_countBinsInMemory:function(a,
b,c,d,e,f){var g=this;this._binsFromMemory(a.params,b,c,d,e).then(function(d){a.dfd.resolve({bins:d,minValue:b,maxValue:c,normalizationTotal:e,source:g._srcMemory,statisticsSource:f})}).otherwise(function(b){g._rejectDfd(a.dfd,"FeatureLayerStatistics: unable to calculate histogram.")})},_queryBins:function(a,b,c){var d=this.layer,e,f,g=[],h=b.length;for(e=0;e<h;e++)f=new u,f.where=(c?c+" AND ":"")+a+" \x3e\x3d "+b[e][0]+(null!==b[e][1]?" AND "+a+(e===h-1?" \x3c\x3d ":" \x3c ")+b[e][1]:""),g.push(f);
return J(p.map(g,function(a){return d.queryCount(a)}))},_binsFromMemory:function(a,b,c,d,e){var f=new q,g=a.field,h=a.normalizationType;a=a.normalizationField;var l=this.layer.graphics,k,m,n,s,r,p=[];if(!l.length)return this._rejectDfd(f,"Layer has 0 features in memory."),f.promise;s=d.length;for(n=0;n<s;n++)p.push({minValue:d[n][0],maxValue:d[n][1],count:0});s=l.length;for(n=0;n<s;n++)k=(m=(k=l[n])&&k.attributes)&&m[g],null!=k&&(h?(r=null,m=m&&parseFloat(m[a]),"log"===h&&0!=k?r=Math.log(k)*this._log10e:
"percent-of-total"===h&&!isNaN(e)&&0!=e?r=100*(k/e):"field"===h&&(!isNaN(m)&&0!=m)&&(r=k/m)):r=k,null!=r&&(!isNaN(r)&&r>=b&&r<=c)&&(k=this._binIndex(d,r),-1<k&&p[k].count++));f.resolve(p);return f.promise},_binIndex:function(a,b){var c,d,e=-1;for(c=a.length-1;0<=c;c--)if(d=a[c][0],b>=d){e=c;break}return e},_binParamsFromGenRend:function(a,b){var c=this.layer,d=new q,e=this,f=this._getGRWhereInfo(c,a),g=f.where,h=a.numBins||this.numBins,l=this._createCBDefn(a,h),k=new A;k.classificationDefinition=
l;k.where=g?g+(b?" AND "+b:""):b;!this._isCollection()&&10.1<=c.version?this._grTask.execute(k).then(function(b){e._resolveBinParams(b,f,e._srcGenRend,a,d)}).otherwise(function(b){e._binParamsFromMemory(h,f,e._srcMemory,a,d)}):e._binParamsFromMemory(h,f,e._srcMemory,a,d);return d.promise},_binParamsFromMemory:function(a,b,c,d,e){var f=this;this._cbFromMemory(d,a).then(function(a){f._resolveBinParams(a,b,c,d,e)}).otherwise(function(a){f._rejectDfd(e,"FeatureLayerStatistics.getHistogram: unable to calculate class breaks.")})},
_resolveBinParams:function(a,b,c,d,e){var f,g,h=[],l=a.infos;g=l.length;f=l[0].minValue;g=l[g-1].maxValue;p.forEach(l,function(a,b){h.push([a.minValue,a.maxValue])});e.resolve({min:f,max:g,intervals:h,sqlExpr:this._getFieldExpr(d,a.normalizationTotal),excludeZerosExpr:b.excludeZerosExpr,normTotal:a.normalizationTotal,source:c})},_getGRWhereInfo:function(a,b){var c=b.field,d=b.normalizationType,e=b.normalizationField,f=a.getDefinitionExpression(),g;"log"===d?g="(NOT "+c+" \x3d 0)":"field"===d&&(g=
"(NOT "+e+" \x3d 0)");return{where:g?g+(f?" AND "+f:""):f,excludeZerosExpr:g}},_getFieldExpr:function(a,b){var c=a.field,d=a.normalizationType,e=a.normalizationField,f=c;"percent-of-total"===d?f="(("+c+" / "+b+") * 100)":"log"===d?f="(log("+c+") * "+this._log10e+")":"field"===d&&(f="("+c+" / "+e+")");return f},_getRangeExpr:function(a,b,c){b=null!=b?a+" \x3e\x3d "+b:"";a=null!=c?a+" \x3c\x3d "+c:"";c="";return(c=b&&a?b+" AND "+a:b||a)?"("+c+")":""},_sampleFeatures:function(a){var b=this,c=a.params,
d=a.dfd,e=this.layer,f=e.graphics;a=this._sampleCache;var g=c&&c.resample,h=c&&c.sampleSize||this.sampleSize;a&&!g?d.resolve(this._cloneSample(a)):(d._time={start:this._getTime()},f.length&&h<=f.length?this._resolveSample(d,this._pickItems(f,h),this._srcMemory):(a=new u,a.where="1\x3d1",d._time.countStart=this._getTime(),e.queryCount(a).then(function(a){d._time.countEnd=b._getTime();d._totalFeatures=a;h>e.maxRecordCount&&(h=e.maxRecordCount);var g;if(a)if(a<=f.length)b._resolveSample(d,b._pickItems(f,
f.length),b._srcMemory);else if(a<=h)g=new u,g.where="1\x3d1",b._queryFeatures(g,c,e,f,d);else if(a<=b.samplingThreshold)a=new u,a.where="1\x3d1",d._time.idStart=b._getTime(),e.queryIds(a).then(function(a){d._time.idEnd=b._getTime();var g=new u;g.objectIds=b._pickItems(a,h);b._queryFeatures(g,c,e,f,d)}).otherwise(function(a){g=new u;g.where="1\x3d1";b._queryFeatures(g,c,e,f,d)});else{g=new u;g.where="1\x3d1";if((a=e.advancedQueryCapabilities)&&a.supportsPagination)g.num=h;b._queryFeatures(g,c,e,f,
d)}else b._resolveSample(d,[],b._srcQuery)}).otherwise(function(a){b._resolveSample(d,b._pickItems(f,f.length),b._srcMemory)})))},_queryFeatures:function(a,b,c,d,e){var f=this;a.outSpatialReference=b&&b.spatialReference;a.maxAllowableOffset=b&&b.maxAllowableOffset;a.outFields=b&&b.outFields;b&&null!=b.returnGeometry&&(a.returnGeometry=b.returnGeometry);e._time.featStart=this._getTime();c.queryFeatures(a).then(function(a){e._time.featEnd=f._getTime();f._resolveSample(e,a&&a.features||[],f._srcQuery)}).otherwise(function(a){f._resolveSample(e,
f._pickItems(d,d.length),f._srcMemory)})},_pickItems:function(a,b){var c=a.length,d=[],e,f=[];if(b>=c)f=a.slice(0);else for(;f.length<b;)e=this._getRandomInt(0,c),-1===p.indexOf(d,e)&&(d.push(e),f.push(a[e]));return f},_getRandomInt:function(a,b){return Math.floor(Math.random()*(b-a))+a},_resolveSample:function(a,b,c){b=b||[];var d,e=b.length,f;for(d=0;d<e&&!(f=(f=b[d].geometry)&&f.spatialReference);d++);a._time.end=(new Date).getTime();d=a._time;a._time=null;this._sampleCache={features:b,spatialReference:f&&
new x(f.toJson()),source:c,time:this._getTimeStats(d),totalFeatures:a._totalFeatures};a.resolve(this._cloneSample(this._sampleCache))},_cloneSample:function(a){return{features:p.map(a.features,function(a){return new a.constructor(a.toJson())}),spatialReference:a.spatialReference&&new x(a.spatialReference.toJson()),source:a.source,time:t.clone(a.time),totalFeatures:a.totalFeatures}},_getTimeStats:function(a){var b=this._getTimeDiff;return{total:b(a.start,a.end),features:b(a.featStart,a.featEnd),featureIds:b(a.idStart,
a.idEnd),featureCount:b(a.countStart,a.countEnd)}},_getTimeDiff:function(a,b){var c,d;null!=a&&null!=b&&(c=b-a,d="millisecond",1E3<=c&&(c/=1E3,d="second",60<=c&&(c/=60,d="minute")),c={value:Number(c.toFixed(2)),unit:d});return c},_getTime:function(){return(new Date).getTime()},_scaleRange:function(a){var b=this,c=a.params,d=this.layer,e=c&&c.sampleSize||this.sampleSize,f=c&&c.map||d.getMap(),g=c&&c.mapWidth||this.mapWidth,h=c&&c.mapHeight||this.mapHeight,l=c&&c.generalizeForScale||this.generalizeForScale,
k,m;c&&!1===c.map&&(f=null);f&&f.__tileInfo?(k=f.__tileInfo,m=f.spatialReference,f=f.extent.getWidth()/f.width/f.getScale()*l):(k=this.tileInfo,m=k.spatialReference,f=this.generalizeForResolution/this.generalizeForScale*l);this.getSampleFeatures({sampleSize:e,spatialReference:m,maxAllowableOffset:f,outFields:[]}).then(function(e){var f=b._projectExtent(d.fullExtent,m),l=e.features;l&&l.length?b.getSpatialStatistics({features:l}).then(function(d){y(f).always(function(f){f=f&&f.hasOwnProperty("xmin")?
f:null;b._processScaleRange(a.dfd,c,k,g,h,f,e,d)})}).otherwise(function(c){b._rejectDfd(a.dfd,"FeatureLayerStatistics.getSuggestedScaleRange: unable to calculate spatial statistics.")}):b._rejectDfd(a.dfd,"FeatureLayerStatistics.getSuggestedScaleRange: sampling returned 0 features.")}).otherwise(function(c){b._rejectDfd(a.dfd,"FeatureLayerStatistics.getSuggestedScaleRange: unable to sample features.")})},_processScaleRange:function(a,b,c,d,e,f,g,h){var l=this.layer.geometryType,k={point:"esriGeometryPoint"===
l,mPoint:"esriGeometryMultipoint"===l,line:"esriGeometryPolyline"===l,polygon:"esriGeometryPolygon"===l},l=c.lods,m=this._getLODForMinScale(b,h,k,c),n=k.polygon?this._getLODForMaxScale(b,h,k,c):null,s=1-this.mapPaddingRatioForFE,r=(s=f&&this._findLODForFE(l,f,d*s,e*s))?s.scale:null,p=(b=this._getLODForMinScale(b,h,k,c,this.minScaleRelaxationRatio))?b.scale:null,q=(b=h.avgXY)&&new U(b.x,b.y,g.spatialReference&&new x(g.spatialReference.toJson())),t=this,v,u=k.polygon?n?Math.floor(n.scale):null:0,w;
m&&(f&&q)&&(w=this._findClosestLOD(l,m,f,q,d,e));v=(m=w||m)?Math.ceil(m.scale):null;p=p&&r?Math.max(p,2*r):p||2*r;r=r&&Math.ceil(r);p=p&&Math.ceil(p);m||n?m&&q?this._countAtView(q,m,d,e).then(function(b){var c;b||(b=g.features[0],c=k.point?b.geometry:(b=b.geometry&&b.geometry.getExtent())&&b.getCenter());t._resolveScaleRange(a,v,u,r,p,c||q,g,h)}).otherwise(function(b){t._resolveScaleRange(a,v,u,r,p,q,g,h)}):this._resolveScaleRange(a,v,u,r,p,q,g,h):this._rejectDfd(a,"FeatureLayerStatistics.getSuggestedScaleRange: unable to find optimal scale range.")},
_resolveScaleRange:function(a,b,c,d,e,f,g,h){b<c?this._rejectDfd(a,"FeatureLayerStatistics.getSuggestedScaleRange: invalid scale range - calculated minScale is less than maxScale."):a.resolve({minScale:b&&(b>this.worldScale?0:b),maxScale:c,scaleAtFullExtent:d,relaxedMinScale:e&&(e>this.worldScale?0:e),center:f,sampleInfo:g,spatialStatistics:h})},_countAtView:function(a,b,c,d){a=this._getExtentFromCenter(a,b,c,d);b=new u;b.geometry=a;return this.layer.queryCount(b).promise},_projectExtent:function(a,
b){if(a.spatialReference.equals(b))return new a.constructor(a.toJson());if(G.canProject(a.spatialReference,b))return G.project(a,b);var c=new Q;c.geometries=[a];c.outSR=b;return this._gsTask.project(c).then(function(a){return a&&a[0]})},_getLODForMinScale:function(a,b,c,d,e){var f=a&&a.minDistance||this.minDistance,g=a&&a.minLength||this.minLength;a=a&&a.minSize||this.minSize;var h,l,k;c.point?(h=b.avgMinDistance,k=f):c.mPoint?(h=b.avgMinDistance,k=f):c.line?(h=b.avgLength,k=g):c.polygon&&(h=b.avgSize,
k=a);0<h&&(l=this._findLOD(d,h,k*(e||1)));return l},_getLODForMaxScale:function(a,b,c,d){var e=this.mapWidth,f=a&&a.maxDistance||e/4,g=a&&a.maxLength||e/4;a=a&&a.maxSize||e/2;var h,l,k;c.point?(h=b.minDistance,k=f):c.mPoint?(h=b.minDistance,k=f):c.line?(h=b.minLength,k=g):c.polygon&&(h=b.minSize,k=a);0<h&&(l=this._findLOD(d,h,null,k));return l},_findLOD:function(a,b,c,d){a=a&&a.lods;var e,f,g,h;if(a&&a.length){var l=null!=d,k=l?0:a.length-1,m=l?-1:1;for(g=l?a.length-1:0;l?g>=k:g<=k;g+=m)if(f=a[g],
h=Math.round(b/f.resolution),l){if(h<=d){e=f;break}}else if(h>=c){e=f;break}}return e},_getExtentFromCenter:function(a,b,c,d){c=c/2*b.resolution;b=d/2*b.resolution;return new V(a.x-c,a.y-b,a.x+c,a.y+b,new x(a.spatialReference.toJson()))},_findClosestLOD:function(a,b,c,d,e,f){var g,h=a.length,l,k;for(g=0;g<h;g++)if(!(a[g].level<b.level))if(l=this._getExtentFromCenter(d,a[g],e,f),l.contains(c)){if(g===h-1){k=a[g];break}}else{k=a[g-1];break}return k=k&&k.level>b.level?k:null},_findUniqueValues:function(a){var b=
this,c=a.params,d=this.layer.getField(c.field);d?this._isCollection()?this._uvFromMemory(c).then(function(c){b._resolveUVDfd(c,a,d,b._srcMemory)}).otherwise(function(c){b._rejectDfd(a.dfd,"FeatureLayerStatistics: unable to calculate unique values.")}):this._uvFromStatisticsQuery(c).then(function(c){b._resolveUVDfd(c,a,d,b._srcQuery)}).otherwise(function(e){b._uvFromGenRenderer(c,d).then(function(c){b._resolveUVDfd(c,a,d,b._srcGenRend)}).otherwise(function(e){b._uvFromMemory(c).then(function(c){b._resolveUVDfd(c,
a,d,b._srcMemory)}).otherwise(function(c){b._rejectDfd(a.dfd,"FeatureLayerStatistics: unable to calculate unique values.")})})}):this._rejectDfd(a.dfd,"FeatureLayerStatistics.getUniqueValues: unknown 'field'.")},_uvFromStatisticsQuery:function(a){var b=this.layer,c=new q;if(b.supportsStatistics){var d="countOF"+a.field,e=this,f=new E;f.statisticType="count";f.onStatisticField=a.field;f.outStatisticFieldName=d;var g=new u;g.outStatistics=[f];g.groupByFieldsForStatistics=[a.field];b.queryFeatures(g).then(function(f){var l,
k,m={},n,q;p.forEach(f.features,function(b){l=b.attributes;k=this._getAttributeVal(l,a.field);n=this._getAttributeVal(l,d);null===k&&0===n&&(q=!0);if(null==k||""===k||"string"===typeof k&&""===t.trim(k))k=null;null==m[k]?m[k]={count:n,data:k}:m[k].count+=n},e);q?(g=new u,g.where=a.field+" is NULL",b.queryCount(g).then(function(a){m["null"].count+=a||0;c.resolve({count:m})}).otherwise(function(a){c.resolve({count:m})})):c.resolve({count:m})}).otherwise(function(a){e._rejectDfd(c,"FeatureLayerStatistics: Statistics query operation failed.")})}else this._rejectDfd(c,
"FeatureLayerStatistics: Statistics query requires a layer that supports statistics.");return c.promise},_uvFromGenRenderer:function(a,b){var c=this.layer,d=new q,e=this;if(10.1<=c.version){var f=new M;f.attributeField=a.field;var g=new A;g.classificationDefinition=f;g.where=c.getDefinitionExpression();this._grTask.execute(g).then(function(a){var c={},f,g=-1<p.indexOf(e._numericTypes,b.type);p.forEach(a.infos,function(a){f=a.value;if(null==f||""===f||"string"===typeof f&&(""===t.trim(f)||"\x3cnull\x3e"===
f.toLowerCase()))f=null;null==c[f]?c[f]={count:a.count,data:g&&f?Number(f):f}:c[f].count+=a.count});d.resolve({count:c})}).otherwise(function(a){e._rejectDfd(d,"FeatureLayerStatistics: Generate renderer operation failed.")})}else this._rejectDfd(d,"FeatureLayerStatistics: Generate renderer operation requires server version 10.1 or later.");return d.promise},_uvFromMemory:function(a){var b=this.layer,c=new q,d=a.field,e,f,g={};p.forEach(b.graphics,function(a){f=(e=a.attributes)&&e[d];if(null==f||""===
f||"string"===typeof f&&""===t.trim(f))f=null;null==g[f]?g[f]={count:1,data:f}:g[f].count++});c.resolve({count:g});return c.promise},_resolveUVDfd:function(a,b,c,d){var e=a.count;c=this.layer.getDomain(c.name);var f;a=[];b.params.includeAllCodedValues&&(c&&"codedValue"===c.type)&&p.forEach(c.codedValues,function(a){a=a.code;e.hasOwnProperty(a)||(e[a]={data:a,count:0})});for(f in e)c=e[f],a.push({value:c.data,count:c.count});b.dfd.resolve({source:d,uniqueValueInfos:a})},_findClassBreaks:function(a){var b=
this,c=a.params,d=c.minValue,e=c.maxValue,f=null!=d||null!=e,g=c.classificationMethod,h="percent-of-total"===c.normalizationType,l=c.numClasses||this.numClasses,k=!1!==c.analyzeData,m=this.layer.getField(c.field);if(!this._rejectNonNumeric(a.dfd,m,"getClassBreaks")){if(f)if(k){if(h&&null==c.normalizationTotal){this._rejectDfd(a.dfd,"FeatureLayerStatistics.getClassBreaks: normalizationTotal is required when minValue/maxValue are specified.");return}}else{if(null==d||null==e){this._rejectDfd(a.dfd,
"FeatureLayerStatistics.getClassBreaks: both minValue AND maxValue are required when data analysis is disabled.");return}if(g&&"equal-interval"!==g){this._rejectDfd(a.dfd,"FeatureLayerStatistics.getClassBreaks: data analysis can be disabled only for equal-interval classification.");return}if(h&&null==c.normalizationTotal){this._rejectDfd(a.dfd,"FeatureLayerStatistics.getClassBreaks: normalizationTotal is required when data analysis is disabled.");return}}else if(!k){this._rejectDfd(a.dfd,"FeatureLayerStatistics.getClassBreaks: both minValue AND maxValue are required when data analysis is disabled.");
return}k?this._cbFromGenRend(c,l).then(function(d){b._resolveCBDfd(a.dfd,c,d,b._srcGenRend)}).otherwise(function(d){f?b._rejectDfd(a.dfd,"FeatureLayerStatistics.getClassBreaks: cannot calculate class breaks in-memory when minValue/maxValue are specified."):b._cbFromMemory(c,l).then(function(d){b._resolveCBDfd(a.dfd,c,d,b._srcMemory)}).otherwise(function(c){b._rejectDfd(a.dfd,"FeatureLayerStatistics: unable to calculate class breaks.")})}):this._cbFromInterpolation(c,l).then(function(d){b._resolveCBDfd(a.dfd,
c,d,b._srcMemory)}).otherwise(function(c){b._rejectDfd(a.dfd,"FeatureLayerStatistics: unable to calculate class breaks.")})}},_cbFromGenRend:function(a,b){var c=this.layer,d=new q,e=this;if(c.url&&10.1<=c.version){var f=this._createCBDefn(a,b),c=this._getGRWhereInfo(c,a).where,g=this._getFieldExpr(a,a.normalizationTotal),g=this._getRangeExpr(g,a.minValue,a.maxValue),h=new A;h.classificationDefinition=f;h.where=c?c+(g?" AND "+g:""):g;this._grTask.execute(h).then(function(a){d.resolve(a)}).otherwise(function(a){e._rejectDfd(d,
"FeatureLayerStatistics: Generate renderer operation failed.")})}else this._rejectDfd(d,"FeatureLayerStatistics: Generate renderer operation requires server version 10.1 or later.");return d.promise},_cbFromMemory:function(a,b){var c=new q,d=this.layer.graphics;if(d.length){var e=this._createCBDefn(a,b),f;if("percent-of-total"===a.normalizationType){f=this._calcStatsFromMemory({field:a.field}).sum;if(null==f)return this._rejectDfd(c,"FeatureLayerStatistics: Invalid normalizationTotal."),c.promise;
a=t.mixin({normalizationTotal:f},a)}c.resolve(O.createClassBreaksRenderer({features:d,definition:e,values:this._getDataValues(d,a)}))}else this._rejectDfd(c,"Layer has 0 features in memory.");return c.promise},_cbFromInterpolation:function(a,b){var c=new q,d=a.minValue,e=a.maxValue;if(d>=e||!b||1>b)this._rejectDfd(c,"FeatureLayerStatistics.getClassBreaks: invalid input parameters: minValue, maxValue or numClasses.");else{var f=[],g,h,l=(e-d)/b;for(g=0;g<b;g++)h=d+g*l,f.push({minValue:h,maxValue:h+
l});f[b-1].maxValue=e;c.resolve({infos:f,normalizationTotal:a.normalizationTotal})}return c.promise},_createCBDefn:function(a,b){var c=a.field,d=a.classificationMethod||this.classificationMethod,e=a.normalizationType,f=a.normalizationField,g=new N;g.classificationField=c;g.breakCount=b;g.classificationMethod=d;g.standardDeviationInterval="standard-deviation"===d?a.standardDeviationInterval||this.standardDeviationInterval:void 0;g.normalizationType=e;g.normalizationField="field"===e?f:void 0;return g},
_resolveCBDfd:function(a,b,c,d){var e=c.infos,f=e[0].minValue,g=e[e.length-1].maxValue,h="standard-deviation"===b.classificationMethod,l=this._reNumber,k,m,n,e=p.map(e,function(a){n=a.label;m={minValue:a.minValue,maxValue:a.maxValue,label:n};h&&n&&(k=n.match(l),k=p.map(k,function(a){return+t.trim(a)}),2===k.length?(m.minStdDev=k[0],m.maxStdDev=k[1],0>k[0]&&0<k[1]&&(m.hasAvg=!0)):1===k.length&&(-1<n.indexOf("\x3c")?(m.minStdDev=null,m.maxStdDev=k[0]):-1<n.indexOf("\x3e")&&(m.minStdDev=k[0],m.maxStdDev=
null)));return m});a.resolve({minValue:f,maxValue:g,classBreakInfos:e,normalizationTotal:c.normalizationTotal,source:d})},_rejectDfd:function(a,b){a.reject(Error(b))},_rejectNonNumeric:function(a,b,c){var d;if(b){if(b.name===this.layer.objectIdField||-1===p.indexOf(this._numericTypes,b.type))this._rejectDfd(a,"FeatureLayerStatistics."+c+": 'field' should be numeric."),d=!0}else this._rejectDfd(a,"FeatureLayerStatistics."+c+": unknown 'field'."),d=!0;return d},_getAttributeVal:function(a,b){var c,
d;b=b.toLowerCase();if(a)for(d in a)if(d.toLowerCase()===b){c=a[d];break}return c},_callAfterLoad:function(a,b){if(this.layer.loaded)a.call(this,b);else D.once(this.layer,"load",t.hitch(this,a,b))},_numericTypes:["esriFieldTypeInteger","esriFieldTypeSmallInteger","esriFieldTypeSingle","esriFieldTypeDouble"],_createGRTask:function(){this._grTask=new L(this.layer,{source:this.layer.source,gdbVersion:this.layer.gdbVersion})}});t.mixin(w,{add:function(a,b){if(!a.statisticsPlugin){var c=b||{};c.layer=
a;a.statisticsPlugin=new w(c)}},remove:function(a){a.statisticsPlugin&&(a.statisticsPlugin.destroy(),delete a.statisticsPlugin)}});I("extend-esri")&&t.setObject("plugins.FeatureLayerStatistics",w,K);return w});