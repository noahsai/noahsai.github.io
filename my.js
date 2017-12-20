var blogsdata;
var curpage=0;
var endpage=0;



//---------------------------------------------------
function clickheight(){
if($(document).height() > $(window).height())
{
$("#bottom").css("position","relative");
}
else $("#bottom").css("position","fixed");
}
//---------------------------------------------------
function loaddata(type){
var bloglistlen=0;
var worklistlen=0;

if(type=="home"||type=="blogs")
{
var datafile="blogsdata.json";

$.getJSON(datafile,function(data){
blogsdata = data;
if(data.length==0) return;
if(type=="home") bloglistlen=data.length-10;
else {
endpage=data.length/25-1;
if(data.length%25!=0) endpage++;

for(var i=0;i<endpage;i++)
{
var option="<option value="+(i+1)+">"+(i+1)+"</option>";
$("#pagebar").append(option);
}
//$("option[value='1']").attr("selected",true);
bloglistlen=data.length-25;
}

for(var i=data.length-1;i>=bloglistlen && i>=0;i--)
{
var li="<li class='blog_list'  ><a class='blog_name' href='"+data[i].url+"'>"+data[i].title+"</a>"+"<span class='writen_time'>"+data[i].update+"</span></li>";
$("#blogs_ul").append(li);
}
})
}

if(type=="home"||type=="works")
{
datafile="worksdata.json";
$.getJSON(datafile,function(data){
if(data.length==0) return;
if(type=="home") worklistlen=data.length-12;
for(var i=data.length-1;i>=worklistlen && i>=0;i--)
{
var li="<li class='work_list'><a class='work_item' href='"+data[i].url+"'><img src='"+data[i].icon+"'><p class='work_name'>"+data[i].title+"</p><span class='version'>"+data[i].update+"</span></a></li>";
$("#works_ul").append(li);
}
})
}
}
//---------------------------------------------
function blogs_jump(page)
{
$("#blogs_ul>li").remove();
if(page==curpage||page < 0||page>endpage) return false;

var begin = blogsdata.length-1-(25*page);
for(var i=begin;i>=begin-25 && i>=0;i--)
{
var li="<li class='blog_list'  ><a class='blog_name' href='"+blogsdata[i].url+"'>"+blogsdata[i].title+"</a>"+"<span class='writen_time'>"+blogsdata[i].update+"</span></li>";
$("#blogs_ul").append(li);
}
clickheight();
return true;
}
function nextpage()
{
    var page=curpage+1;
    if(page>endpage) return;
    if(blogs_jump(page)) {
        $("#pagebar").get(0).selectedIndex=page;   
        curpage++;
     }
}

function prepage()
{
    var page=curpage-1;
    if(page <0) return;
    if(blogs_jump(page)) {
        $("#pagebar").get(0).selectedIndex=page;   
        curpage--;
     }
}

function topage(select)
{
    var page = select.selectedIndex;
    if(curpage == page) return;
    if(blogs_jump(page))   curpage = page;

}

function nextblog(type)
{
var datafile;
var path=window.location.pathname;
if(type=="blogs")  datafile="../blogsdata.json";
else  datafile="../worksdata.json";
$.getJSON(datafile,function(data){
if(data.length==0) return;

for(var i=data.length-1;i>=0;i--)
{
    if(path.indexOf(data[i].url)!=-1)
    {
        if((i-1)<0) {
        alert("已经是最后一篇了！");
        return;
        }
        var url= data[i-1].url;
        if(type=='blogs') url = url.replace(/blogs\//,'')
        else url = url.replace(/works\//,'')
        window.location.href=url;
    }
}
})
}


function preblog(type)
{
var path=window.location.pathname;
var datafile;
if(type=="blogs")   datafile="../blogsdata.json";
else  datafile="../worksdata.json";

$.getJSON(datafile,function(data){
if(data.length==0) return;

for(var i=data.length-1;i>=0;i--)
{
    if(path.indexOf(data[i].url)!=-1)
    {
        if((i+1)>data.length-1)
        {
        alert("已经是第一篇了！");
        return;
        }
        var url= data[i+1].url;
        if(type=='blogs') url = url.replace(/blogs\//,'')
        else url = url.replace(/works\//,'')
        window.location.href=url;
    }
}
})
}

