// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt for details.
//>>built
require({cache:{"url:esri/dijit/metadata/form/templates/Tabs.html":'\x3cdiv class\x3d"gxeTabs gxeIndent" style\x3d"display:none;"\x3e\r\n  \x3cdiv class\x3d"gxeHeader" data-dojo-attach-point\x3d"tabsNode"\x3e\x3c/div\x3e\r\n  \x3cdiv class\x3d"gxeContainer" data-dojo-attach-point\x3d"containerNode"\x3e\x3c/div\x3e\r\n\x3c/div\x3e\r\n'}});
define("esri/dijit/metadata/form/Tabs","dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/topic dojo/dom-class dojo/dom-construct dojo/dom-style dojo/has ../base/Templated dojo/text!./templates/Tabs.html ../base/TabButton ../base/TabRadio ../../../kernel".split(" "),function(f,h,g,m,k,l,e,n,p,q,r,s,t){f=f([p],{_activeTabButton:null,_isGxeTabs:!0,_tabButtons:null,templateString:q,useRadios:!1,showPromptIfRadios:!0,promptLabel:null,postCreate:function(){this.inherited(arguments);this._tabButtons=
[]},startup:function(){this._started||(this.noIndent&&k.remove(this.domNode,"gxeIndent"),this.inherited(arguments),this._buildTabs())},_activateTab:function(a){var b=this.useRadios;g.forEach(this._tabButtons,function(d){d===a?(k.add(d.domNode,"current"),e.set(d.tabWgt.domNode,"display","block"),b&&(d.tabWgt._isOptionallyOff=!1)):(k.remove(d.domNode,"current"),e.set(d.tabWgt.domNode,"display","none"),b&&(d.tabWgt._isOptionallyOff=!0))});try{m.publish("gxe/tab-activated",{tabs:this,button:a})}catch(c){console.error(c)}},
_addTab:function(a){var b=this._getLabel(a);e.set(a.domNode,"display","none");var c=null,c=this.id+"_radios",c=this.useRadios?new s({label:b,tabWgt:a,radioName:c,onClick:h.hitch(this,function(a){this._activateTab(a)})}):new r({label:b,tabWgt:a,onClick:h.hitch(this,function(a){this._activateTab(a)})});a.tabButton=c;(a.hide||a.notApplicable)&&e.set(c.domNode,"display","none");l.place(c.domNode,this.tabsNode,"last");this._tabButtons.push(c);return c},_addPrompt:function(){var a=this.promptLabel;null===
a&&(a=this.i18nBase.general.choose);var b=l.create("span",{"class":"gxeEditOnly gxeTabsPrompt"},this.tabsNode,"last");this.setNodeText(b,a)},_buildTabs:function(){var a=null;this.useRadios&&this.showPromptIfRadios&&this._addPrompt();g.forEach(this.getChildren(),function(a){this._addTab(a)},this);g.some(this._tabButtons,function(b){if(b.tabWgt&&!b.tabWgt.notApplicable)return a=b,!0});a&&(a.radioName&&a.setChecked(!0),this._activateTab(a),e.set(this.domNode,"display","block"))},ensureActiveTab:function(a){g.some(this._tabButtons,
function(b){if(b.tabWgt===a)return this._activateTab(b),this.useRadios&&b.setChecked&&b.setChecked(!0),!0},this)},_getLabel:function(a){return"function"===typeof a.getLabelString?a.getLabelString():"string"===typeof a.label?a.label:"Untitled"}});n("extend-esri")&&h.setObject("dijit.metadata.form.Tabs",f,t);return f});