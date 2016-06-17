/**
 * Created by Administrator on 2016/6/12 0012.
 */
/*页面左上角的btn，鼠标移入移出的功能，点击弹出content*/
function showMes(btnId){
    /*修改当前的样式*/
    var currentBtn= document.getElementById(btnId);
    currentBtn.className="mouseOverClass";
    /*显示提示文字*/
    document.getElementById("h"+btnId).style.display="block";
    /*修改指向函数*/
    document.getElementById("h"+btnId).href="javascript:hideMes()";

}
function hideMes(btnId){
    var currentBtn= document.getElementById(btnId);

    var btnContent=document.getElementById(btnId+"Content");
    if (btnContent!=null){
        var mouseStatus=btnContent.style.display;
        /*      判断是否是点击*/
        if(mouseStatus=="none"){
            currentBtn.className="mouseOutClass";
        }else{
            currentBtn.className="mouseOverClass";
        }
    }else{
        currentBtn.className="mouseOutClass";
    }

    /*提示信息关闭*/
    document.getElementById("h"+btnId).style.display="none";
    document.getElementById("h"+btnId).href="javascript:showMes()";
}
function clickPopCon(btnId){
    var currentBtn= document.getElementById(btnId);
    var btnContentStatus=document.getElementById(btnId+"Content").style.display;
    if(btnContentStatus=="none"){
        document.getElementById(btnId+"Content").style.display="block";
        currentBtn.className="mouseOverClass";
    }else{
        document.getElementById(btnId+"Content").style.display="none";
        currentBtn.className="mouseOutClass";
    }
}