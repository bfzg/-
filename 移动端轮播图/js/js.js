window.addEventListener('load',function(){
    //获取元素
    var focus = this.document.querySelector('.focus');
    var ul = focus.children[0];
    var ol = this.document.querySelector('ol');
    //获得focus的宽度
    var w = focus.offsetWidth;
    //利用定时器自动轮播图图片
    var index = 0;
    var timer = setInterval(function(){
        index++;
        var translatex = -index * w;
        ul.style.transition = 'all .4s'
        ul.style.transform = 'translateX('+ translatex + 'px)';
    },2000);
    //等着我们过渡完成之后，再去判断 监听过渡完成事件transitionend
    ul.addEventListener('transitionend',function(){
        //无缝滚动
        if (index >= 3){
            index = 0;
            ul.style.transition = 'none';
            //利用最新的索引号乘以宽度 去滚动图片
            var translatex = -index * w;
            ul.style.transform = 'translateX('+ translatex + 'px)';
        }
        else if(index < 0){
            index = 2;
            ul.style.transition = 'none';
            //利用最新的索引号乘以宽度 去滚动图片
            var translatex = -index * w;
            ul.style.transform = 'translateX('+ translatex + 'px)';
        }
        //小圆点跟随变化效果
        //把ol里面li带有current类名选出来去掉类名remove
        ol.querySelector('.current').classList.remove('current');
        //让当前索引号 的小li 加上 current add
        ol.children[index].classList.add('current');
    });

    //手指滑动轮播图
    //触摸元素  touchstart:   获取手指初始坐标
    var startX = 0;
    var moveX = 0;
    var flag = false;
    ul.addEventListener('touchstart',function(e){
        startX = e.targetTouches[0].pageX;
        //触摸时停止定时器
        clearInterval(timer);
    });
    //移动手指touchmove:      计算手指的滑动距离，并且移动盒子
    ul.addEventListener('touchmove',function(e) {
        //计算移动距离
        moveX = e.targetTouches[0].pageX - startX;
        //移动盒子：盒子原来的位置 + 手指移动的距离
        var translatex = -index * w + moveX;
        //手指拖动的时候，不需要动画效果所以要取消过渡效果
        ul.style.transition = 'none';
        ul.style.transform = 'translateX('+ translatex + 'px)';
        flag = true;    //如果用户手指移动过才进行滚动
        e.preventDefault();         //阻止屏幕滚动
    });
    //手指离开根据移动距离去判断是会弹还是播放上一张
    ul.addEventListener('touchend',function(e){
        //如果大于50像素就播放上一张
       if(flag)
       {
        if (Math.abs(moveX) > 50) {         //Math.abs()是取绝对值的意思
            if (moveX > 0){
                index--;
            }
            else if(moveX < 0)
            {
                index++;
            }
            var translatex = -index * w;
            ul.style.transition = 'all .3s';
            ul.style.transform = 'translateX(' + translatex + 'px)';
        }
       }
        else{
            //回弹
            var translatex = -index * w;
            ul.style.transform = 'translateX(' + translatex + 'px)';
            ul.style.transition = 'all .2s';
        }
        //手指离开开启定时器
        clearInterval(timer);   //清除定时器
        timer = setInterval(function(){
            index++;
            var translatex = -index * w;
            ul.style.transition = 'all .4s'
            ul.style.transform = 'translateX('+ translatex + 'px)';
        },2000);
    })
})