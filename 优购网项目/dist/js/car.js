
var uid =localStorage.getItem('uid')
carListFn()
console.log(location.search)
//获取购物车列表

function carListFn(){
    axios.get('http://jx.xuzhixiang.top/ap/api/cart-list.php',{
        params:{
            id:uid
    }
}).then(v=>{
    console.log(v.data.data)
    let vv =v.data.data
    vv.forEach(res=>{
        console.log(res)
        let liPer=document.querySelector('.carMainD')
        let html=`
        <li>
        <ul class="carDataPer">
            <li class="li1"><input type="checkbox" class="checkPer"></li>
            <li class="li2">
             <img src="${res.pimg}" alt=""></li>
            <li class="li3">${res.pdesc}</li>
            <li class="li4">${res.pprice}</li>
            <li class="li5">
            <a class="numres" data-id='${res.pid}' href="javascript:;">-</a>
            <input class="numbtn"  type="text" value="${res.pnum}">
            <a class="numadd" data-id='${res.pid}' href="javascript:;">+</a>
            </li>
            <li class="li6">小计</li>
            <li class="li7">
                <button class="btn-del" data-id='${res.pid}'><a href="javascript:;">删除</a></button>
            </li>
        </ul>
        </li>
        `
        liPer.innerHTML+=html
        delProFn()
        numAddFn()
        checkAllPerFn()
    })
})

}

//删除按钮

function delProFn(){
   
   
   
    $(".btn-del").each(function(i,n){
        //console.log(n)
        let pid = n.getAttribute('data-id')
        console.log(pid)
        n.onclick=function(){
            axios.get('http://jx.xuzhixiang.top/ap/api/cart-delete.php',{
                params:{
                    pid,
                    uid
            }
        }).then(v=>{
            n.parentNode.remove() 
        })
        }
    }
    )
}

//加减功能 每点一次  input.value+1

function numAddFn(){
//加
    let addBtns=document.querySelectorAll('.numadd')
    //console.log(numadds)

    for (let i = 0; i < addBtns.length; i++) {

        addBtns[i].onclick = async function () {
            let pnumi = addBtns[i].parentNode.querySelector('.numbtn')
            let pnum = parseInt(pnumi.value) + 1
            pnumi.value = pnum
            console.log(pnum)
            let pid = addBtns[i].getAttribute('data-id')

            await axios('http://jx.xuzhixiang.top/ap/api/cart-update-num.php', {
                params: {
                    uid,
                    pid,
                    pnum
                }
            }).then(res => {
                console.log(res.data)
               
            })
        }
    }
//减
let resBtns=document.querySelectorAll('.numres')
//console.log(numadds)

for (let i = 0; i < addBtns.length; i++) {

    resBtns[i].onclick = async function () {
        let pnumi = resBtns[i].parentNode.querySelector('.numbtn')
        let pnum = parseInt(pnumi.value) - 1
        pnumi.value = pnum
        if(pnum<1){
            pnumi.value=1
        }
        console.log(pnum)
        let pid = resBtns[i].getAttribute('data-id')

        await axios('http://jx.xuzhixiang.top/ap/api/cart-update-num.php', {
            params: {
                uid,
                pid,
                pnum
            }
        }).then(res => {
            console.log(res.data)
           
        })
    }
}
  
    
}

//全选 单选
let checkAll = document.querySelector('.checkAll')
let checkPer = document.getElementsByClassName('checkPer')

function checkAllPerFn() {
    checkAll.onclick = function () {

        for (var i = 0; i < checkPer.length; i++) {

            if (checkAll.checked == true) {
                checkPer[i].checked = true;
            } else {
                checkPer[i].checked = false;
            }
            
        }


    }
    for (var i = 0; i < checkPer.length; i++) {
        checkPer[i].index = i;
        checkPer[i].onclick = function () {
            var count = 0;
            if (checkPer[this.index].checked == false) {
                checkAll.checked = false;
            }

            for (var j = 0; j < checkPer.length; j++) {
                if (checkPer[j].checked == true) {
                    count += 1;
                }
            }
            if (count == checkPer.length) {
                checkAll.checked = true;
            }
            
        }
    }
   
  
}



