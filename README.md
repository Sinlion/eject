# EJECT弹出层按钮插件（jQuery）

## **概述**

> 造个轮子，实现网页内弹出带按钮的遮罩层。
>  
> **Chrome 应用/扩展** 开发请联系  *s . . s @ v i p. 1 6 3 . c o m*

## **信息**

+ *扩展*：eject
+ *简介*：弹出层按钮插件
+ *版本*：0.1
+ *作者*：sinlion
+ *时间*：2019-9-20 14:05:21
+ *jquery*：1.7+

## **摘要**

### *类型*
**`eject对象`**  通过插件创建的弹出层对象

### *属性*
**`jq`**  弹出层的jquery对象

### *方法*
**`domAdd`**  添加触发弹出层的元素

**`domRemove`**  移除触发弹出层的元素

**`domClear`**  移除所有触发弹出层的元素

**`domEvent`**  触发弹出层的元素事件

**`domPrevent`**  触发弹出层时阻止默认响应

**`iniBt`**  配置弹出层的按钮

**`iniBg`**  配置弹出层的背景

**`iniUl`**  配置弹出层的样式

**`showFn`**  绑定展示弹出层时的回调函数

**`closeFn`**  绑定隐藏弹出层时的回调函数

**`closeBt`**  是否弹出层的显示关闭按钮

## **类型**

### *eject对象*
通过`$.eject()`方法创建一个弹出层相关的对象，这是标准的object对象，包含一个属性和多个方法。
```
var eject = $.eject();
```
**注意：** 在html页面头部区域引用相关文件
+ `eject.css`  插件基本样式
+ `jquery.js`  支持1.7及以上版本
+ `eject.js`  插件
```
<link rel="stylesheet" href="eject.css">
<script src="jquery.js"></script>
<script src="eject.js"></script>
```
请在页面加载完成之后再调用`$.eject()`，该方法会在页面内创建元素。
```
$(function () {
    var eject = $.eject();
});
```
在使用`$.eject()`方法创建eject对象的同时可以传入参数用来绑定触发弹出层的元素，参数类型请参考`domAdd()`方法。
```
var eject = $.eject(["#id",".class","span"]);
```
一个页面可以存在多个弹出层，但是一个元素只能触发最后绑定它的eject对象,并且该元素之前绑定的事件方法会被覆盖。
```
var eject0 = $.eject("#id");
var eject1 = $.eject(".class");
var eject2 = $.eject("#id");
```
*上面代码`#id`元素只能触发`eject2`弹出层*

## **属性**

### *jq*
eject对象的jq属性指向页面中弹出层元素，是一个标准的jQuery对象，支持所有jquery方法。
```
eject.jq;
```
通过jq属性可以实现完全对弹出层文档对象的任意改变，包括附加自定义的样式，更改绑定的事件等等。

## **方法**

### *domAdd*
使用`domAdd()`方法添加绑定用来触发弹出层的元素，参数可以为符合jquery选择器的字符串或者字符串数组，调用此方法不会覆盖之前的设定。

```
eject.domAdd("#id");
eject.domAdd(".class");
eject.domAdd("span");
```
或
```
eject.domAdd(["#id",".class","span"]);
```

### *domRemove*
使用`domRemove()`方法移除一个或多个已经绑定的触发元素，参数类型请参考`domAdd()`方法。
```
eject.domRemove(["#id",".class","span"]);
```

### *domClear*
使用`domClear()`方法移除所有绑定触发元素，无参数。
```
eject.domClear();
```

### *domEvent*
使用`domEvent()`方法设定触发弹出层的事件方法，参数类型为字符串或数组，调用此方法会覆盖之前的设定。
```
eject.domEvent(["click", "contextmenu"]);
```
或
```
eject.domEvent("click");
eject.domEvent("contextmenu");
```
*上面代码对于绑定元素只有`contextmenu`方法可以触发`eject2`弹出层*

### *domPrevent*
使用`domPrevent()`方法阻止某些事件作出系统响应,可同时配置多个事件，此操作会覆盖之前的设置。
```
eject.domPrevent({"contextmenu": false});
```
*上面代码对于右键单击元素触发`eject2`弹出层不显示默认的浏览器菜单*

### *iniBt*
使用`iniBt()`方法设置弹出层的按钮，参数为对象，对象内键值为按钮名，属性必须为方法，此操作会覆盖之前的设置。
```
eject.iniBt({
        "按钮一": testFunction1,
        "按钮二": testFunction2,
        "按钮三": testFunction3
    });
```
对应的按钮被单击将回调属性方法，方法可接受一个参数，为按钮元素的Event事件对象。
```
function testFunction1(e) {
        console.log('Function1:',`来自“${$(e.target).text()}”的“${e.type}”事件。`);
        //return false;
    }
```
*上面被调用方法如果返回`false`,弹出层不会关闭*

### *iniBg*
使用`iniBg()`方法设置弹出层的背景效果，参数为对象，此操作会覆盖之前的设置。
```
eject.iniBg({
        show: true, 
        color: "black", 
        opacity: 0.5, 
        close: true
    });
```
+ **show**  *设置为true将不显示背景，默认false*
+ **color**  *可以为颜色常量或色值，如 #00f000 或 rgb(125,200,125)*
+ **opacity** *背景透明度 0~1 设置为0可以实现点击空白处关闭弹出层的效果*
+ **close**  *是否点击背景关闭弹出层，默认true*

### *iniUl*
使用`iniUl()`方法设置弹出层的按钮列表，参数为对象，对象内键值为按钮名，属性必须为方法，此操作会覆盖之前的设置。
```
eject.iniUl({
        postion: "top",
        height: "30px",
        scale:1
    });
```
+ **postion**  *设置按钮定位，支持top、center、bottom，默认top*
+ **height**  *postion为top或bottom时与边界的距离*
+ **scale**  *缩放按钮，默认1*

### *showFn*
使用`showFn()`方法设置弹出层显示时的回调函数。
```
eject.showFn(showFunction);
```
回调函数可接受一个参数，为触发显示的元素Event事件对象。
```
function showFunction(e) {
        console.log(`由“${$(e.target).text()}”的“${e.type}”事件触发显示。`);
        //return false;
    }
```
*上面被调用方法如果返回`false`,弹出层不会继续显示*

### *closeFn*
使用`closeFn()`方法设置弹出层关闭时的回调函数。
```
eject.closeFn(closeFunction);
```
回调函数可接受一个参数，为触发关闭的元素Event事件对象。
```
function closeFunction(e) {
        console.log(`由“${$(e.target).text()}”的“${e.type}”事件触发关闭。`);
        //return false;
    }
```
*上面被调用方法如果返回`false`,弹出层不会继续关闭*

### *closeBt*
使用`closeBt()`方法设置是否显示关闭按钮。
```
eject.closeBt(true);
```

## **其他**

`eject对象`所有方法都会返回其自身，进而支持链式调用。
```
$(function () {
    var eject = $.eject();
    eject.domAdd(["#id",".class","span"])
    .iniBt({
        "按钮一": testFunction1,
        "按钮二": testFunction2,
        "按钮三": testFunction3
    })
    .iniBg({
        show: true, 
        color: "black", 
        opacity: 0.5, 
        close: true
    })
    .iniUl({
        postion: "top",
        height: "30px",
        scale:1
    })
    .showFn(showFunction)
    .closeFn(closeFunction)
    .closeBt(true);
});
```

## **许可**
**GNU General Public License v3.0**