/**
 * 扩展：eject
 * 简介：弹出层按钮插件
 * 版本：0.1
 * 作者：sinlion
 * 时间：2019-9-20 14:05:21
 * jquery：1.7+
 */

/**初始化插件 */
try {
    if (jQuery) {
        if (jQuery.hasOwnProperty("eject")) {
            console.warn("%c 插件命名冲突，无法加载Eject插件。", "color:#f00000")
        } else {
            jQuery.extend({
                "eject": function (e) { //插件名
                    return new CLASS_EJECT_MAIN(e)
                }
            });
            console.info("%c EJECT_0.1 %c Sinlion [ s..s@vip.163.com ] ", "background:#888;color:#fff", "background:#ccc;color:#75bacf");
        }
    }
} catch (e) {
    console.warn("%c jQuery没有加载成功，无法使用Eject插件。", "color:#f00000")
}
/**MAIN OF EJECT */
class CLASS_EJECT_MAIN {
    /**设置 创建并传入触发元素 ["#diva",".span2"] 或 "#input" */
    constructor(domarr) {
        this._iniset = {
            on: ["click"], //触发事件方式 默认click
            prevent: { //阻止默认事件响应
                "contextmenu": false
            },
            onlist: [ //支持的事件列表
                "blur",
                "focus",
                "focusin",
                "focusout",
                "load",
                "resize",
                "scroll",
                "unload",
                "click",
                "dblclick",
                "mousedown",
                "mouseup",
                "mousemove",
                "mouseover",
                "mouseout",
                "mouseenter",
                "mouseleave",
                "change",
                "select",
                "submit",
                "keydown",
                "keypress",
                "keyup",
                "error",
                "contextmenu"
            ],
            domlist: [], //绑定响应的元素
            UL: {
                postion: "top",//定位
                height: "30px",//距离上边界或下边界的距离
                scale:1//缩放
            },
            BG: { //背景层设置
                show: true, //显示
                color: "black", //背景色
                opacity: 0.5, //透明度
                close: true //单击关闭弹窗功能
            },
            CLOSEBT: false, //显示关闭按钮,
            CLOSEFN: function () {}, //关闭时的回调 返回false则阻止继续动作
            SHOWFN: function () {}, //显示时的回调 返回false则阻止继续动作
            _HTMLOVERFLOW: "visible"
        }
        this.domAdd(domarr);
    }
    /**设置 元素触发事件 ["click","contextmenu"]*/
    domEvent(evarr) {
        try {
            let temp_evarr = EJECT_isArray(evarr) ? evarr : [evarr];
            let temp_on = [];
            for (let oev of this._iniset.on) {
                for (let dom of this._iniset.domlist) {
                    jQuery("body").off(oev, dom);
                }
            }
            for (let nev of temp_evarr) {
                if (typeof (nev) == 'string') {
                    for (let smon of this._iniset.onlist) {
                        if (nev == smon) {
                            temp_on.push(nev);
                        }
                    }
                }
            }
            this._iniset.on = EJECT_arrUnique(temp_on);
            this._eventCLICKon();
            return this;
        } catch (e) {
            console.error(e)
        }
    }
    /**设置 触发事件后的默认响应菜单 {contextmenu:false} 不弹出系统右键菜单*/
    domPrevent(prevent) {
        try {
            this._iniset.prevent = jQuery.isPlainObject(prevent) ? prevent : {};
            return this;
        } catch (e) {
            console.error(e)
        }
    }
    /**设置 清除所有触发元素 */
    domClear() {
        return this.domRemove(this._iniset.domlist);
    }
    /**设置 添加触发元素 ["#diva",".span2"] 或 "#input" */
    domAdd(domarr) {
        try {
            let temp_domarr = EJECT_isArray(domarr) ? domarr : [domarr];
            for (let i of temp_domarr) {
                if (typeof (i) != undefined) {
                    this._iniset.domlist.push(i)
                }
            }
            this._eventCLICKon();
            return this;
        } catch (e) {
            console.error(e)
        }
    }
    /**设置 移除触发元素 */
    domRemove(domarr) {
        try {
            let temp_domarr = EJECT_isArray(domarr) ? domarr : [domarr];
            let temp_domlist = [];
            if (EJECT_isArray(temp_domarr)) {
                for (let i of temp_domarr) {
                    if (typeof (i) != undefined) {
                        temp_domlist.push(i);
                    }
                }
            }
            temp_domlist = EJECT_arrUnique(temp_domlist);
            for (let k of temp_domlist) {
                for (let i = 0; i < this._iniset.domlist.length; i++) {
                    if (this._iniset.domlist[i] == k) {
                        for (let ev of this._iniset.on) {
                            jQuery("body").off(ev, k);
                        }
                        this._iniset.domlist.splice(i, 1);
                        break;
                    }
                }
            }
            return this;
        } catch (e) {
            console.error(e)
        }
    }
    /**设置 配置按钮信息 { "按钮名":动作 } */
    iniBt(bton) {
        try {
            this._iniset.BT = jQuery.isPlainObject(bton) ? bton : {};
            this._makeDOMul();
            return this;
        } catch (e) {
            console.error(e)
        }
    }
    /**设置 背景 */
    iniBg(sty) {
        try {
            this._iniset.BG = jQuery.isPlainObject(sty) ? sty : {};
            this._makeDOMul();
            return this;
        } catch (e) {
            console.error(e)
        }
    }
    /**设置 按钮区域 */
    iniUl(sty) {
        try {
            this._iniset.UL = jQuery.isPlainObject(sty) ? sty : {};
            this._makeDOMul();
            return this;
        } catch (e) {
            console.error(e)
        }
    }
    /**设置 显示时的回调函数 */
    showFn(fn) {
        try {
            this._iniset.CLOSEFN = (typeof fn == "function") ? fn : function () {};
            return this;
        } catch (e) {
            console.error(e)
        }
    }
    /**设置 关闭时的回调函数 */
    closeFn(fn) {
        try {
            this._iniset.SHOWFN = (typeof fn == "function") ? fn : function () {};
            return this;
        } catch (e) {
            console.error(e)
        }
    }
    /**设置 追加关闭关闭按钮 */
    closeBt(show) {
        try {
            this._iniset.closeBt = show ? true : false;
            this._makeDOMul();
            return this;
        } catch (e) {
            console.error(e)
        }
    }
    /**操作 显示浮动层 */
    _show(that, dom) {
        that._iniset._HTMLOVERFLOW = jQuery("html").css("overflow");
        jQuery("html").css("overflow", "hidden");
        try {
            if (that._iniset.hasOwnProperty("workID")) {
                let fnrn = that._iniset.SHOWFN(dom);
                if (fnrn === false) {} else {
                    jQuery(that._iniset.workID).show();
                }
            }
        } catch (e) {
            console.error(e)
        }
    }
    /**操作 关闭浮动层 */
    _close(that, dom) {
        jQuery("html").css("overflow", that._iniset._HTMLOVERFLOW);
        try {
            if (that._iniset.hasOwnProperty("workID")) {
                let fnrn = that._iniset.CLOSEFN(dom);
                if (fnrn === false) {} else {
                    jQuery(that._iniset.workID).hide();
                }
            }
        } catch (e) {
            console.error(e)
        }
    }
    /**操作 取事件终止状态 */
    _prevent(that, ket) {
        let sta = {
            had: false,
            prevent: false
        }
        for (let k in that._iniset.prevent) {
            if (k == ket) {
                sta.had = true;
                sta.prevent = that._iniset.prevent[k];
                break;
            }
        }
        return sta;
    }
    /**事件 绑定触发元素 */
    _eventCLICKon() {
        try {
            let show = this._show;
            let prevent = this._prevent;
            let that = this;
            this._iniset.domlist = EJECT_arrUnique(this._iniset.domlist);
            for (let i of this._iniset.domlist) {
                for (let ev of this._iniset.on) {
                    jQuery("body").off(ev, i).on(ev, i, function (kEvent) {
                        show(that, this, ev, kEvent);
                        let sta = prevent(that, kEvent.type);
                        if (sta.had) {
                            if (!sta.prevent) {
                                kEvent.preventDefault(); //取消事件的默认动作
                            }
                        }
                    });
                }
            }
        } catch (e) {
            console.error(e)
        }
    }
    /**流程 构建浮动层元素 */
    _makeDOMul() {
        try {
            let that = this;
            let close = this._close;
            if (this._iniset.hasOwnProperty("workID")) {
                jQuery(this._iniset.workID).remove();
                delete this._iniset.workID;
            }
            if (this.hasOwnProperty("jq")) {
                jQuery(this.jq).remove();
                delete this.jq;
            }
            if (!jQuery.isEmptyObject(this._iniset.BT)) {
                let temp_workID = "EJEC";
                temp_workID += (new Date()).valueOf();
                temp_workID += "T";
                temp_workID += Math.round(Math.random() * 1000);
                jQuery("body").append(`
                <div class="EJECT_MAIN" id="${temp_workID}" style="display:none">
                    <div class="EJECT_BG"></div>
                    <ul class="EJECT_UL"></ul>
                </div>`);
                this._iniset.workID = "#" + temp_workID;
                this.jq = jQuery(this._iniset.workID);
                let eul = jQuery(this._iniset.workID + " .EJECT_UL");
                let bts = this._iniset.BT;
                for (let k in bts) {
                    let f = bts[k];
                    let fn = (typeof f == "function") ? f : function () {};
                    eul.append(`<li>${k}</li>`).find(":last-child").click(
                        function (e) {
                            let fnrn = fn(e);
                            if (fnrn === false) {} else {
                                close(that, e);
                            }
                        }
                    );
                }
                if (this._iniset.closeBt) {
                    eul.append(`<li>关闭</li>`).find(":last-child").click(
                        function (e) {
                            close(that, e);
                        }
                    );
                }
                eul.css("top", "30px");
                if (!jQuery.isEmptyObject(this._iniset.UL)) {
                    let hi = "30px";
                    if (this._iniset.UL.hasOwnProperty("height")) {
                        hi = this._iniset.UL.height;
                    }
                    eul.css("top", hi);
                    if (this._iniset.UL.hasOwnProperty("postion")) {
                        if (this._iniset.UL.postion == "bottom") {
                            eul.css("top", "");
                            eul.css("bottom", hi)
                        }
                        if (this._iniset.UL.postion == "center") {
                            eul.css("top", "50%");
                            eul.css("transform", "translateY(-50%)")
                        }
                    }
                    eul.find("li").css("transform", "scale(1)");
                    if (this._iniset.UL.hasOwnProperty("scale")) {
                        let sc = this._iniset.UL.scale;
                        eul.find("li").css("transform", `scale(${sc})`)
                    }
                }
                jQuery(this._iniset.workID).off("click", ".EJECT_BG").on("click", ".EJECT_BG", function (e) {
                    close(that, e);
                });
                jQuery(this._iniset.workID).off("contextmenu", ".EJECT_BG").on("contextmenu", ".EJECT_BG", function (kEvent) {
                    kEvent.preventDefault();
                });
                if (!jQuery.isEmptyObject(this._iniset.BG)) {
                    let bgd = jQuery(this._iniset.workID + " .EJECT_BG");
                    if (this._iniset.BG.hasOwnProperty("show")) {
                        if (!this._iniset.BG.show) {
                            bgd.hide();
                        }
                    }
                    if (this._iniset.BG.hasOwnProperty("color")) {
                        bgd.css("background-color", this._iniset.BG.color);
                    }
                    if (this._iniset.BG.hasOwnProperty("opacity")) {
                        bgd.css("opacity", this._iniset.BG.opacity);
                    }
                    if (this._iniset.BG.hasOwnProperty("close")) {
                        if (!this._iniset.BG.close) {
                            jQuery(this._iniset.workID).off("click", ".EJECT_BG");
                        }
                    }
                }
            }
        } catch (e) {
            console.error(e)
        }
    }
}

/**函数 判断是否为数组 */
function EJECT_isArray(o) {
    return Object.prototype.toString.call(o) == '[object Array]';
}

/**函数 数组去重 */
function EJECT_arrUnique(arr) {
    return [...new Set(arr)];
    //or
    //return  Array.from(new Set(arr));
}