//获取传过来的pid

var pid = location.search.split('=')[1]
console.log(pid)
proListFn()
function proListFn() {
    //console.log(location.search)
    //console.log(location.search.split('='))
   
    if (!pid) {
        alert('商品不存在')
        return
    }

    axios.get('http://jx.xuzhixiang.top/ap/api/detail.php', {
        params: {
            id: pid
        }
    }).then(v => {
        //console.log(v.data)
        let Vper = v.data.data
        html = `
        <div class="detailPic">
        <img src="${Vper.pimg}" alt="">
    </div>
    <div class="detailDesc">
        <a href="#">
            <img src="../img/轮播鞋T1.png" alt="">
        </a>
        <p>${Vper.pdesc}</p>
        <p>￥${Vper.pprice}</p>
        <input type="number" value="1"><br>
        <button class="addBtn"><a href="javascript:;">加入购物车</a></button>
        <p>
            <i></i><span>收藏</span><i></i>
            <span>分享</span>    
        </p>
    </div>
        `
        let dtl = document.querySelector('.detailMain')
        dtl.innerHTML = html
        addCarFn()
    })
   
}
//添加商品到购物车
function addCarFn() {
    let pnumB = document.querySelector('input[type=number]')
    console.log(pnumB)
    let addBtnn = document.querySelector('.addBtn')
    pnumB.onchange=function(){
        if(this.value<1){
            this.value=1
        }
    }
    console.log(addBtnn)
    addBtnn.onclick =function () {
        
        let uid = localStorage.getItem('uid')
        console.log(uid)
        let pnum = pnumB.value
        console.log(pnum)
        axios.get('http://jx.xuzhixiang.top/ap/api/add-product.php', {
            params: {
                uid,
                pid,
                pnum
            }
        }).then(v=> {
            console.log(v.data)
            alert(v.data.msg)
            location.href="../html/car.html"
        })
    }
}