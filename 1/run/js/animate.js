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

/*
    弹性运动
    暂时是改变高度
 */
function tMove(obj,iTarget) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        iSpeed += (iTarget - obj.offsetHeight) / 6;
        iSpeed *= 0.75;
        if (Math.abs(iSpeed) <= 1 && Math.abs(iTarget - obj.offsetHeight) <= 1) {
            clearInterval(timer);
            iSpeed = 0;
            obj.style.height = iTarget + 'px';
        } else {
            var H = obj.offsetHeight + iSpeed;
            if (H < 0) {
                H = 0;
            }
            obj.style.height = H + 'px';
        }
    }, 30)
}

        //碰撞运动:首先找到碰撞的临界点，在确定运动的方向，然后去改变对应的速度
        //自由落体:y周一直改变速度的方法，却在变小
        //抛物运动: x,y周方向速度都在变化
        window.onload=function() {
            var oDiv = document.getElementById('div1');

            var iSpeedX = 10;
            var iSpeedY = 10;
            startMove();
            function startMove() {
                setInterval(function(){
                    var L = oDiv.offsetLeft + iSpeedX;
                    var T = oDiv.offsetTop + iSpeedY;
                    if(T>document.documentElement.clientHeight - oDiv.offsetHeight) {
                        T = document.documentElement.clientHeight - oDiv.offsetHeight;
                        iSpeedY *= -1;
                    }else if(T<0){
                        T = 0;
                        iSpeedY *= -1;
                    }
                    if(L>document.documentElement.clientWidth - oDiv.offsetWidth) {
                        L = document.documentElement.clientWidth - oDiv.offsetWidth;
                        iSpeedX *= -1;
                    }else if(L<0){
                        L = 0;
                        iSpeedX *= -1;
                    }

                    oDiv.style.left = L + 'px';
                    oDiv.style.top = T + 'px';

                },30)
            }
            var oDiv2 = document.getElementById('div2');
            var timer2 = null;
            var iSpeed2 = 0;

            oDiv2.onclick=function() {
                startMove2();
            }

            function startMove2(){
                clearInterval(timer2);
                timer2 = setInterval(function(){
                    iSpeed2 += 3;
                    var T = oDiv2.offsetTop + iSpeed2;

                    if(T > document.documentElement.clientHeight - oDiv2.offsetHeight){
                        T = document.documentElement.clientHeight - oDiv2.offsetHeight;
                        iSpeed2 *= -1;
                        iSpeed2 *= 0.75;
                    }
                    oDiv2.style.top = T + 'px';
                }, 30);
            }

            var oDiv3 = document.getElementById('div3');
            var timer3 = null;
            var iSpeed3 = -40;
            var iSpeedX3 = 10;

            oDiv3.onclick=function(){
                startMove3();
            }
            function startMove3(){
                clearInterval(timer3);
                timer3  = setInterval(function(){
                    iSpeed3 += 3;
                    var T3 = oDiv3.offsetTop + iSpeed3;
                    if(T3 > document.documentElement.clientHeight - oDiv3.offsetHeight){
                        T3 = document.documentElement.clientHeight - oDiv3.offsetHeight;
                        iSpeed3 *= -1;
                        iSpeed3 *= 0.75;
                        iSpeedX3 *= 0.75;
                    }
                    oDiv3.style.top = T3 + 'px';
                    oDiv3.style.left = oDiv3.offsetLeft + iSpeedX3 + 'px';

                }, 30)
            }
        }