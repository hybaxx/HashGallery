//翻面控制
function turn(ele) {
    var cln=ele.className;
    if (/photo-front/.test(cln)){ cln=cln.replace(/photo-front/,'photo-back')}
    else {cln=cln.replace(/photo-back/,'photo-front')}
    return ele.className=cln;
}
