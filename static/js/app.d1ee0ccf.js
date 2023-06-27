(function(){"use strict";var t={8216:function(t,e,o){o.d(e,{Z:function(){return c}});var r=function(){var t=this,e=t._self._c;return e("div",{staticClass:"container"},[e("div",{staticClass:"row"},[e("div",{staticClass:"col-sm-10"},[e("h1",[t._v("清单")]),e("hr"),e("br"),e("br"),e("div",[e("b-form-select",{attrs:{options:t.options},on:{change:t.getItemsPurchasedToday},model:{value:t.addItemForm.item_for,callback:function(e){t.$set(t.addItemForm,"item_for",e)},expression:"addItemForm.item_for"}})],1),e("button",{directives:[{name:"b-modal",rawName:"v-b-modal.item-modal",modifiers:{"item-modal":!0}}],staticClass:"btn btn-success btn-sm",attrs:{type:"button"}},[t._v("添加商品")]),e("br"),e("br"),t._v(" 总计： "),e("b",[t._v(t._s(t.total/1e4))]),t._v("元 "),e("table",{staticClass:"table table-hover"},[t._m(0),e("tbody",t._l(t.items,(function(o,r){return e("tr",{key:r},[e("td",[t._v(t._s(o.id))]),e("td",[t._v(t._s(o.name))]),e("td",[t._v(t._s(o.unit))]),e("td",[t._v(t._s(o.count/100))]),e("td",[t._v(t._s(o.price/100))]),e("td",[t._v(t._s(o.count*o.price/1e4))]),e("td",[e("div",{staticClass:"btn-group",attrs:{role:"group"}},[e("button",{staticClass:"btn btn-warning btn-sm",attrs:{type:"button"}},[t._v("修改")]),e("button",{staticClass:"btn btn-danger btn-sm",attrs:{type:"button"},on:{click:function(e){return t.onDeleteItem(o.id)}}},[t._v(" 删除 ")])])])])})),0)])]),e("b-modal",{ref:"addItemsPurchasedModal",attrs:{id:"item-modal",title:"添加一个商品","hide-footer":""}},[e("b-form",{staticClass:"w-100",on:{submit:t.onSubmit,reset:t.onReset}},[e("b-form-group",{attrs:{id:"form-name-group",label:"商品名称:","label-for":"form-name-input"}},[e("b-form-input",{attrs:{id:"form-name-input",type:"text",required:"",placeholder:"输入商品名称"},model:{value:t.addItemForm.name,callback:function(e){t.$set(t.addItemForm,"name",e)},expression:"addItemForm.name"}})],1),e("b-form-group",{attrs:{id:"form-unit-group",label:"单位:","label-for":"form-unit-input"}},[e("b-form-input",{attrs:{id:"form-unit-input",type:"text",required:"",placeholder:"输入商品单位"},model:{value:t.addItemForm.unit,callback:function(e){t.$set(t.addItemForm,"unit",e)},expression:"addItemForm.unit"}})],1),e("b-form-group",{attrs:{id:"form-count-group",label:"数量:","label-for":"form-count-input"}},[e("b-form-input",{attrs:{id:"form-count-input",type:"text",required:"",placeholder:"输入商品数量"},model:{value:t.addItemForm.count,callback:function(e){t.$set(t.addItemForm,"count",e)},expression:"addItemForm.count"}})],1),e("b-form-group",{attrs:{id:"form-price-group",label:"单价:","label-for":"form-price-input"}},[e("b-form-input",{attrs:{id:"form-price-input",type:"text",required:"",placeholder:"输入商品单价"},model:{value:t.addItemForm.price,callback:function(e){t.$set(t.addItemForm,"price",e)},expression:"addItemForm.price"}})],1),e("b-form-group",{attrs:{id:"form-item-for-group",label:"用于:","label-for":"form-item-for-input"}},[e("b-form-select",{attrs:{options:t.options,required:""},model:{value:t.addItemForm.item_for,callback:function(e){t.$set(t.addItemForm,"item_for",e)},expression:"addItemForm.item_for"}})],1),e("b-button",{attrs:{type:"submit",variant:"primary"}},[t._v("确定添加")]),e("b-button",{attrs:{type:"reset",variant:"danger"}},[t._v("重置")])],1)],1)],1)])},n=[function(){var t=this,e=t._self._c;return e("thead",[e("tr",[e("th",{attrs:{scope:"col"}},[t._v("id")]),e("th",{attrs:{scope:"col"}},[t._v("名称")]),e("th",{attrs:{scope:"col"}},[t._v("单位")]),e("th",{attrs:{scope:"col"}},[t._v("数量")]),e("th",{attrs:{scope:"col"}},[t._v("单价(元)")]),e("th",{attrs:{scope:"col"}},[t._v("总价(元)")]),e("th")])])}],a=o(8428),i=o.n(a),s={name:"ItemsComponent",data(){return{items:[],total:0,addItemForm:{item_for:1,name:"",unit:"",count:0,price:0},options:[{value:1,text:"月子餐"},{value:2,text:"员工餐"}]}},methods:{getItemsPurchasedToday(){console.log("hello");const t="http://54.251.25.117:5000/items-today";i().get(t,{data:{},params:{items_for:this.addItemForm.item_for}}).then((t=>{this.items=t.data.items,this.total=t.data.total})).catch((t=>{console.error(t)}))},addItemPurchased(t){const e="http://54.251.25.117:5000/add-items-purchased";i().post(e,t).then((()=>{this.getItemsPurchasedToday()})).catch((t=>{console.log(t),this.getItemsPurchasedToday()}))},initForm(){this.addItemForm.name="",this.addItemForm.unit="",this.addItemForm.count=0,this.addItemForm.price=0},onDeleteItem(t){const e=`http://54.251.25.117:5000/delete-item/${t}`;i()["delete"](e).then((()=>{this.getItemsPurchasedToday()})).catch((t=>{console.error(t),this.getItemsPurchasedToday()}))},onSubmit(t){t.preventDefault(),this.$refs.addItemsPurchasedModal.hide();const e={name:this.addItemForm.name,unit:this.addItemForm.unit,count:this.addItemForm.count,price:this.addItemForm.price,item_for:this.addItemForm.item_for};this.addItemPurchased(e),this.initForm()},onReset(t){t.preventDefault(),this.$refs.addItemsPurchasedModal.hide(),this.initForm()}},created(){this.getItemsPurchasedToday()}},d=s,m=o(1001),u=(0,m.Z)(d,r,n,!1,null,null,null),c=u.exports},6009:function(t,e,o){var r=o(9332),n=o(7195),a=function(){var t=this,e=t._self._c;return e("div",{attrs:{id:"app"}},[e("items-component")],1)},i=[],s={name:"App"},d=s,m=o(1001),u=(0,m.Z)(d,a,i,!1,null,null,null),c=u.exports,l=o(2241),f=o(8216);n["default"].use(l.ZP);var p=new l.ZP({mode:"history",base:"../static/",routes:[{path:"/ItemsComponent",name:"ItemsComponent",component:f.Z}]});n["default"].use(r.Z),n["default"].config.productionTip=!1,n["default"].component("ItemsComponent",o(8216).Z),new n["default"]({router:p,render:t=>t(c)}).$mount("#app")}},e={};function o(r){var n=e[r];if(void 0!==n)return n.exports;var a=e[r]={exports:{}};return t[r].call(a.exports,a,a.exports,o),a.exports}o.m=t,function(){var t=[];o.O=function(e,r,n,a){if(!r){var i=1/0;for(u=0;u<t.length;u++){r=t[u][0],n=t[u][1],a=t[u][2];for(var s=!0,d=0;d<r.length;d++)(!1&a||i>=a)&&Object.keys(o.O).every((function(t){return o.O[t](r[d])}))?r.splice(d--,1):(s=!1,a<i&&(i=a));if(s){t.splice(u--,1);var m=n();void 0!==m&&(e=m)}}return e}a=a||0;for(var u=t.length;u>0&&t[u-1][2]>a;u--)t[u]=t[u-1];t[u]=[r,n,a]}}(),function(){o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,{a:e}),e}}(),function(){o.d=function(t,e){for(var r in e)o.o(e,r)&&!o.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})}}(),function(){o.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}}(),function(){var t={143:0};o.O.j=function(e){return 0===t[e]};var e=function(e,r){var n,a,i=r[0],s=r[1],d=r[2],m=0;if(i.some((function(e){return 0!==t[e]}))){for(n in s)o.o(s,n)&&(o.m[n]=s[n]);if(d)var u=d(o)}for(e&&e(r);m<i.length;m++)a=i[m],o.o(t,a)&&t[a]&&t[a][0](),t[a]=0;return o.O(u)},r=self["webpackChunkclient"]=self["webpackChunkclient"]||[];r.forEach(e.bind(null,0)),r.push=e.bind(null,r.push.bind(r))}();var r=o.O(void 0,[998],(function(){return o(6009)}));r=o.O(r)})();
//# sourceMappingURL=app.d1ee0ccf.js.map