var uid = localStorage.getItem('uid')
carListFn()
//获取购物车列表

function carListFn() {
    axios.get('http://jx.xuzhixiang.top/ap/api/cart-list.php', {
        params: {
            id: uid
        }
    }).then(v => {
        //console.log(v.data.data)
        let vv = v.data.data
        vv.forEach(res => {
            //console.log(res)
            let liPer = document.querySelector('.carMainD')
            let html = `
        <li data-id=${res.pid}>
        <ul class="carDataPer">
            <li class="li1"><input type="checkbox" class="checkPer"></li>
            <li class="li2">
             <img src="${res.pimg}" alt=""></li>
            <li class="li3">${res.pdesc}</li>
            <li class="li4 hPrice">${parseInt(res.pprice)}</li>
            <li class="li5">
            <a class="numres" data-id='${res.pid}' href="javascript:;">-</a>
            <input class="numbtn" readonly type="text" value="${res.pnum}">
            <a class="numadd" data-id='${res.pid}' href="javascript:;">+</a>
            </li>
            <li class="li6">${res.pprice*res.pnum}</li>
            <li class="li7">
                <button class="btn-del" data-id='${res.pid}'><a href="javascript:;">删除</a></button>
            </li>
        </ul>
        </li>
        `
        liPer.innerHTML += html
        })
        delProFn()
        numAddFn()
        checkAllPerFn()
        updateCountPrice()
        carclearFn()
        carBabyFn()
        carclearFn()
        
    })

}

//删除按钮

function delProFn() {



    $(".btn-del").each(function (i, n) {
        //console.log(n)
        let pid = n.getAttribute('data-id')
        //console.log(pid)
        n.onclick = function () {
            axios.get('http://jx.xuzhixiang.top/ap/api/cart-delete.php', {
                params: {
                    pid,
                    uid
                }
            }).then(v => {
                alert(v.data.msg)
                n.parentNode.parentNode.remove()
                updateCountPrice()
                location.reload()
            })
        }
    })
}

//清空购物车

// let carDelBtn= document.querySelector('.cartclear')
// console.log(carDelBtn)
// carDelBtn.onclick=function(){
//     console.log(1)
// }
function carclearFn() {
    $('.cartclear').click(function () {
        let carList = $(this).parent().parent().siblings('ul').children()
        console.log(carList)
        carList.each(function (i, n) {
            console.log(n)
            let pid = n.getAttribute('data-id')
            console.log(pid)

            axios.get('http://jx.xuzhixiang.top/ap/api/cart-delete.php', {
                params: {
                    uid,
                    pid
                }
            }).then(
                n.remove()
                
            )
            
        })
        location.reload()
    })

}

//加减功能 每点一次  input.value+1

function numAddFn() {
    //加
    let addBtns = document.querySelectorAll('.numadd')
    //console.log(numadds)

    for (let i = 0; i < addBtns.length; i++) {

        addBtns[i].onclick = async function () {
            let pnumi = addBtns[i].parentNode.querySelector('.numbtn')
            console.log(pnumi)
            let perprice = addBtns[i].parentNode.parentNode.querySelector('.hPrice')
            let xiaoji = addBtns[i].parentNode.parentNode.querySelector('.li6')
            console.log(perprice)
            let pnum = parseInt(pnumi.value) + 1
            let perpriceAll = parseInt(perprice.innerText) * (parseInt(pnumi.value) + 1)
            console.log(perpriceAll)
            pnumi.value = pnum
            xiaoji.innerText = perpriceAll
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

                updateCountPrice()

            })
        }
    }
    //减
    let resBtns = document.querySelectorAll('.numres')
    //console.log(numadds)

    for (let i = 0; i < addBtns.length; i++) {

        resBtns[i].onclick = async function () {
            let pnumi = resBtns[i].parentNode.querySelector('.numbtn')


            let perprice = addBtns[i].parentNode.parentNode.querySelector('.hPrice')
            let xiaoji = addBtns[i].parentNode.parentNode.querySelector('.li6')
            let perpriceAll = parseInt(perprice.innerText) * (parseInt(pnumi.value) - 1)
            xiaoji.innerText = perpriceAll
            let xiaojiVal = parseInt(xiaoji.innerText)
            let priceVal = parseInt(perprice.innerText)
            //console.log(xiaojiVal)
            // if(xiaojiVal<priceVal){
            //     xiaoji.innerText=priceVal
            // }

            let pnum = parseInt(pnumi.value) - 1
            pnumi.value = pnum
            if (pnum < 1) {
                pnumi.value = 1
                xiaoji.innerText = priceVal
            }

            //console.log(pnum)
            let pid = resBtns[i].getAttribute('data-id')

            await axios('http://jx.xuzhixiang.top/ap/api/cart-update-num.php', {
                params: {
                    uid,
                    pid,
                    pnum
                }
            }).then(res => {
                //console.log(res.data)
                updateCountPrice()
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
            updateCountPrice()
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
            updateCountPrice()
        }

    }


}


//计算总价



function updateCountPrice() {
    //计算每一行的小计 获取所有的框



    //获取选中的框
    let checkPer = document.querySelectorAll('.checkPer')
    let checkPerArr = [...checkPer] //创建一个伪数组
    let checkPersonArr = checkPerArr.filter(v => v.checked == true)
    //console.log(checkPersonArr)

    //遍历所有的框 找到父元素里面的框值
    //计算框值和（商品个数） 再计算总价
    let sum = 0;
    let price = 0;
    checkPersonArr.forEach((v, i) => {
        //console.log(v,i)
        //sum += parseInt(v.parentNode.parentNode.querySelector('.numbtn').value);

        price += parseInt(v.parentNode.parentNode.querySelector('.numbtn').value) * parseInt(v.parentNode.parentNode.querySelector('.hPrice').innerText);
        PerpriceSum = parseInt(v.parentNode.parentNode.querySelector('.numbtn').value) * parseInt(v.parentNode.parentNode.querySelector('.hPrice').innerText);


    })
    //console.log(sum)
    //console.log(price)

    let priceSum = document.querySelector('.priceSum');
    // console.log(productSum)


    priceSum.innerText = price

}

function carBabyFn() {

    
    //console.log($('.carMainD').children())
    if ($('.carMainD').children().length ==0 ) {
        console.log(1)
        $('.carMainD').siblings('.carMainF').css('display', 'none')
        $('.carMainD').siblings('.carMainB').css('display', 'block')
    } else {
        $('.carMainD').siblings('.carMainF').css('display', 'block')
        $('.carMainD').siblings('.carMainB').css('display', 'none')
    }

}