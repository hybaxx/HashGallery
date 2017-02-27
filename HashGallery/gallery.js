//翻面控制
function turn(ele) {
    var cln=ele.className;
    if (/photo-front/.test(cln)){ cln=cln.replace(/photo-front/,'photo-back')}
    else {cln=cln.replace(/photo-back/,'photo-front')}
    return ele.className=cln;
}
//通用函数，有点模拟jQ的意思，get('.wrap')、get('#wrap')，把$换成了get;
function get(selector) {
    var method=selector.substr(0,1)=='.'?'getElementsByClassName':'getElementById';
    return document[method](selector.substr(1));//这个方括号是什么姿势？obj[method]();
}
//通用函数，随机数，range=[min,max]
function random(range) {
    var max=Math.max(range[0],range[1]);
    var min=Math.min(range[0],range[1]);
    var diff=max-min;
    var number=Math.random()*diff;
    return parseInt(number);
}
//输出所有海报
function addPhotos() {
    var template=get('#wrap').innerHTML;
    var html=[];
    for(var i in data){
        var _html=template
            .replace('{{index}}',i)
            .replace('{{caption}}',data[i].caption)
            .replace('{{img}}',data[i].img)
            .replace('{{desc}}',data[i].desc)
        html.push(_html)
    }
    get('#wrap').innerHTML=html.join('');
    resort(random([0,data.length]));
}
addPhotos();
//排序所有海报
function resort(n){
    var _photos=get('.photo');//_photos不是标准数组，不支持sort()、splice()等函数
    var photos=[];//需要把_photos转化成有序的photos数组；
    for(var s=0;s<_photos.length;s++){//不是标准数组，不能用s in _photos写法
        // _photo[s].className=_photo[s].className.replace(/\s*photo-center\s*/,' '); //多余的功能：去掉所有photo-center类名
        photos.push(_photos[s]);
    }
    // var photo_center=get('#photo_'+n);//被覆盖的重复定义
    var photo_center=photos.splice(n,1)[0];//从photos里取出一个
    photo_center.className+='photo-center';
    var photos_left=photos.splice(0,Math.ceil(photos.length/2));//此时的photos就是剩下的在右边的
    // var photos_right=photos;
    // console.log(photos_left.length,photos.length);
    for(var s in photos_left){
        photos_left[s].style.left='10px';
        photos_left[s].style.top='10px';
    }
    for (var s in photos){
        photos[s].style.left='400px';
        photos[s].style.top='100px';
    }
}