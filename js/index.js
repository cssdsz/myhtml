
// 打开页面就执行的函数
$(function(){
    $('#audio').get(0).volume=0.1;
})
// 音乐盘暂停旋转函数
var flag=false;
$("#musicON").click(function(){
    if(!flag){
        //$(this).css({"-webkit-animation-iteration-count":"0"});
        $(this).css({"animation-play-state":"paused"});
        //音乐停止
        $("#audio").get(0).pause();
        flag=true;
    }else{
        //$(this).css({"-webkit-animation-iteration-count":"infinite"});
        $(this).css({"animation-play-state":"running"});
        //音乐播放
        $("#audio").get(0).play();
        flag=false;
    }
})
// 获取一个menu列表
let menus=document.getElementsByClassName('menu')
let texts=document.getElementsByClassName('text')
// 切换页面函数
// 参数e用来获取当前点击的元素对象
function changeMenu(e){
    for(menu of menus){
        menu.classList.remove('menu_active')// 逐个移除menu_active类名
    }
    for(text of texts){
        text.classList.remove('active_text')
    }
    e.classList.add('menu_active')// 把类名添加至当前元素对象上
    let i=Array.from(menus).indexOf(e)// 获取当前元素索引号，再按索引号对text进行添加类名
    texts[i].classList.add('active_text')
    console.log(i)
}
// 获取留言
$('.commit').click(function(){
    textVal=$("#issue").val();
    if(textVal!=''){
        console.log(textVal);
        $('#issue').val('');//清空输入框
        saveStorage(textVal)// 执行内容保存到本地函数
        alert('提交成功！');
    }else{
        alert("不要提交空的愿望或烦恼哦");
    }
})
// 开始先把留言遍历出来
loadStorage('msg');
// 内容保存到本地函数
function saveStorage(val) {
    //获取textarea的value值
    var data = val;
    //获取当前时间戳
    var time = new Date().getTime();
    //将时间戳作为键值，textarea的value值作为键值的内容保存在本地数据库
    localStorage.setItem(time,data);
    //保存成功后提示成功
    console.log("数据已保存");
    loadStorage('msg');
}
// 遍历打印留言函数
function loadStorage(id) {
    var result = '<table border="1">';
    //遍历本地数据所有内容
    for(var i = 0; i < localStorage.length; i++) {
        //获取每一条新增的键值(即时间戳)
        var kes = localStorage.key(i);
        //获取新增键值的内容
        var value = localStorage.getItem(kes);
        //获取时间对象
        var d=new Date();
        // 时间戳是从1970年开始计算的，所以这里setTime加上1970年的时间才是正常时间戳
        d=d.setTime(kes)
        console.log(d)
        // 再创建一个含参时间对象，会自动转换为正常时间格式，之后获取年月日等就行了
        var date= new Date(d)
        console.log(date)
        //将时间戳转化为正常时间 年月日时分秒 格式
        Y = date.getFullYear() + '-';
        M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        D = date.getDate() + ' ';
        h = date.getHours() + ':';
        m = date.getMinutes();
        datestr=Y+M+D+h+m;
        //将所有新增内容添加到result变量中
        result += '<tr><td>' +datestr+ '</td><td>' +value+ '</td></tr>'
    }
    result += '</table>';
    var target = document.getElementById(id);
    //将所有内容添加到元素中显示
    target.innerHTML = result;
}
// clearStorage();
function clearStorage() {
    //清除本地储存所有内容
    localStorage.clear();  
    console.log("清除完毕");
}