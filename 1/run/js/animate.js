/*
缓冲运动函数
@param obj  运动函数对象
@param json 需要运动的属性 {name: iTarget} 名字|结束条件
@param  fn  运动结束后执行的函数

*/

function vMove(obj, json, fn) {
    clearInterval(obj.iTimer);
    var iCur = 0;
    var iSpeed = 0;
    var iTarget = null;
    obj.iTimer = setInterval(function() {
        var iBtn = true; //用于判断全部运动是否全部结束

        for (var attr in json) {
            if (attr == 'opacity') {
                iTarget = Math.round(json[attr] * 100);
                iCur = Math.round(css(obj, 'opacity') * 100);
            } else {
                iTarget = json[attr];
                iCur = parseInt(css(obj, attr));
            }
            iSpeed = (iTarget - iCur) / 8;
            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

            if (iCur != iTarget) {
                iBtn = false;
                if (attr == 'opacity') {
                    obj.style.opacity = (iCur + iSpeed) / 100;
                    obj.style.filter = 'alpah(opacity=' + (iCur + iSpeed) + ')';
                } else {
                    obj.style[attr] = iCur + iSpeed + 'px';
                }
            }
        }
        if (iBtn) {
            clearInterval(obj.iTimer);
            fn && fn.call(obj);
        }

    }, 30)
}

/*
获取css样式的值，只能获取
@param obj   对象
@param attr css名
@return 对应css的值
 */
function css(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    } else {
        return getComputedStyle(obj, false)[attr];
    }
}

/*
匀速运动函数
@param obj  运动函数对象
@param json 需要运动的属性 {name: iTarget} 名字|结束条件
@param iSpeed  速度
@param  fn  运动结束后执行的函数

*/

function cMove(obj, json, iSpeed, fn) {
    clearInterval(obj.iTimer);
    var iCur = 0;
    var iTarget = null;
    obj.iTimer = setInterval(function() {
        var iBtn = true;
        //什么时候停止，所有属性都运动到了目标点后
        for (var attr in json) {
           
            if (attr == 'opacity') {
            	iTarget = Math.round(json[attr] * 100);
                iCur = Math.round(css(obj, 'opacity') * 100);
            } else {
            	iTarget = json[attr];
                iCur = parseInt(css(obj, attr));
            }


            if (iCur != iTarget) {
                iBtn = false
                if (attr == 'opacity') {
                    obj.style.opacity = (iCur + iSpeed) / 100;
                    obj.style.filter = 'alpha(opacity=' + (iCur + iSpeed) + ')';
                } else {
                    obj.style[attr] = iCur + iSpeed + 'px';
                }
            }
        }
        //判读是否所有属性都到了目标点
        if (iBtn) {
            clearInterval(obj.iTimer);
            fn && fn.call(obj); //将this指向obj
        }
    }, 30)
}