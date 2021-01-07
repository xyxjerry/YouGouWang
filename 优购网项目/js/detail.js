
  
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
        <div id="zoomBox">
        <div id="midArea">
            <img src="${Vper.pimg}">
            <div id="zoom"></div>
        </div>
        <div id="bigArea">
            <img src="${Vper.pimg}">
        </div>
        <div id="smallArea">
            <!-- <img src="img/m01.jpg">
            <img src="img/m02.jpg"> -->
        </div>
        </div>

    <div class="detailDesc">
        <a href="../html/detail.html">
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
        new Zoom();
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

//放大镜


    class Zoom {
        constructor() {
            this.zoomBox = document.getElementById("zoomBox");
            this.midArea = document.getElementById("midArea");
            this.midImg = this.midArea.children[0];
            this.zoom = document.getElementById("zoom");
            this.bigArea = document.getElementById("bigArea");
            this.bigImg = this.bigArea.children[0];
            this.smallArea = document.getElementById("smallArea");
            this.smallImg = this.smallArea.children;
            this.init();
        }
        init() {
            this.midArea.onmouseover = () => {
                this.zoom.style.display = "block";
                this.bigArea.style.display = "block";
            }
            this.midArea.onmouseout = () => {
                this.zoom.style.display = "none";
                this.bigArea.style.display = "none";
            }
            this.midArea.onmousemove = (e) => {
                let evt = e || window.event;
                let x = evt.pageX - this.zoomBox.offsetLeft - this.zoom.offsetWidth / 2;
                let y = evt.pageY - this.zoomBox.offsetTop - this.zoom.offsetHeight / 2;
    
                let mx = this.midArea.offsetWidth - this.zoom.offsetWidth;
                let my = this.midArea.offsetHeight - this.zoom.offsetHeight;
    
                x = x <= 0 ? 0 : x >= mx ? mx : x;
                y = y <= 0 ? 0 : y >= my ? my : y;
    
    
    
                this.zoom.style.left = x + "px";
                this.zoom.style.top = y + "px";
    
                //大图移动
                this.bigImg.style.left = -this.zoom.offsetLeft * (this.bigImg.offsetWidth / this.midArea.offsetWidth) + "px";
                this.bigImg.style.top = -this.zoom.offsetTop * (this.bigImg.offsetHeight / this.midArea.offsetHeight) + "px";
    
            }
    
            for (let i = 0; i < this.smallImg.length; i++) {
                this.smallImg[i].onclick = () => {
                    this.midImg.src = this.smallImg[i].src;
                    this.bigImg.src = this.smallImg[i].src;
                }
            }
    
        }
    }

