$('.navLeft li').has('i').click(function () {

    if ($(this).children('ul').is(":hidden")) {
        $(this).children('ul').slideDown().siblings().css('background', 'url(../img/首页图标.png) -212px -98px')
    } else {
        $(this).children('ul').slideUp().siblings().css('background', 'url(../img/首页图标.png) -212px -124px')
    }


})


var uid = localStorage.getItem('uid')

addPro()
proList()
//添加商品
function addPro() {
    var ipt = document.querySelectorAll('input')
    
   
    ipt[4].onclick = function () {
        console.log(1)
        axios.get("http://jx.xuzhixiang.top/ap/api/goods/goods-add.php", {
            params: {
                pimg: ipt[1].value,
                pprice: ipt[2].value,
                pdesc: ipt[3].value,
                uid,
            }
        }).then(res => {
            console.log(res.data)
            //alert(res.data.msg)
            window.location.reload();
        })

    }
}

//全部商品列表


function proList() {
    axios.get("http://jx.xuzhixiang.top/ap/api/allproductlist.php", {
        params: {
            pagesize:20,
            pagenum:0,
            uid,
        }
    }).then(v => {
        console.log(uid)
        console.log(v.data.data)
        //alert(v.data.data.msg)
        let Vv =v.data.data
       let oUl= document.querySelector('.mainRight ul')
       Vv.forEach(Vper=>{
           
        oUl.innerHTML+=`
        <li class="ProListPro">
        <div class="ProListU">
            <a href="../html/detail.html?pid=${Vper.pid}">
                <img src="${Vper.pimg}" alt="">
            </a>
        </div>
        <p>
            ${Vper.pdesc}
        </p>
        <p>
            <span>￥${Vper.pprice}</span>
            <span>￥${Vper.pprice}</span>
            <a href="#" style="display:inline-block">
                <icon class="iconfont icon-xin"></icon>
            </a>
        </p>
        <button style="display:block" class="delButton" data-pid="${Vper.pid}">删除</button>
    </li>
        `    
       })  
       
       delProduct() 
    })
    
}


//删除商品
function delProduct(){
    
    let delBtnsa = document.querySelectorAll(".delButton");
    console.log(delBtnsa),
 
    delBtnsa.forEach(btn=>{
        console.log(1)
        btn.onclick=function(){
            this.parentNode.remove()
            axios.get('http://jx.xuzhixiang.top/ap/api/goods/goods-delete.php',{
                params:{
                    uid,
                    token:localStorage.getItem('token'),
                    pid:btn.getAttribute('data-pid')
            }
        }).then(res=>{
            console.log(res.data)
            btn.parentNode.remove() //移除父节点
            window.location.reload();
        })
        }
    })


}