// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt for details.
//>>built
require({cache:{"url:esri/dijit/metadata/types/fgdc/base/templates/Root.html":'\x3cdiv data-dojo-attach-point\x3d"containerNode"\x3e\r\n  \x3c!--\r\n    FGDC root metadata element.\r\n    From:\r\n    http://www.fgdc.gov/schemas/metadata/fgdc-std-001-1998.xsd\r\n    http://www.fgdc.gov/metadata/csdgm/00.html\r\n  --\x3e\r\n  \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Element"\r\n    data-dojo-props\x3d"target:\'metadata\',label:\'${i18nFgdc.documentTypes.fgdc.caption}\'"\x3e\r\n    \r\n    \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Tabs"\x3e\r\n    \r\n      \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/types/fgdc/idinfo/idinfo"\r\n        data-dojo-props\x3d"label:\'${i18nFgdc.metadata.idinfo}\'"\x3e\x3c/div\x3e\r\n        \r\n      \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/types/fgdc/dataqual/dataqual"\r\n        data-dojo-props\x3d"label:\'${i18nFgdc.metadata.dataqual}\'"\x3e\x3c/div\x3e\r\n        \r\n      \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/types/fgdc/spref/spref"\r\n        data-dojo-props\x3d"label:\'${i18nFgdc.metadata.spref}\'"\x3e\x3c/div\x3e\r\n\r\n      \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/types/fgdc/eainfo/eainfo"\r\n        data-dojo-props\x3d"label:\'${i18nFgdc.metadata.eainfo}\'"\x3e\x3c/div\x3e\r\n\r\n      \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/types/fgdc/distinfo/distinfo"\r\n        data-dojo-props\x3d"label:\'${i18nFgdc.metadata.distinfo}\'"\x3e\x3c/div\x3e\r\n                \r\n      \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/types/fgdc/metainfo/metainfo"\r\n        data-dojo-props\x3d"label:\'${i18nFgdc.metadata.metainfo}\'"\x3e\x3c/div\x3e\r\n              \r\n    \x3c/div\x3e\r\n    \r\n  \x3c/div\x3e\r\n\x3c/div\x3e'}});
define("esri/dijit/metadata/types/fgdc/base/Root","dojo/_base/declare dojo/_base/lang dojo/has ../../../base/Descriptor ../../../form/Element ../../../form/Tabs ../idinfo/idinfo ../dataqual/dataqual ../spref/spref ../eainfo/eainfo ../distinfo/distinfo ../metainfo/metainfo dojo/text!./templates/Root.html ../../../../../kernel".split(" "),function(a,b,c,d,g,h,k,l,m,n,p,q,e,f){a=a(d,{templateString:e});c("extend-esri")&&b.setObject("dijit.metadata.types.fgdc.base.Root",a,f);return a});