<template>
    <div id="pop_tips" class="pop-tip-wrap">
        <div class="pop-tips border-box">
            <h4>注册成功</h4>
            <p>恭喜您获得<em>{{points}}</em>荷石币,<br>赶紧到积分商城兑换好礼吧!</p>
        </div>
        <div class="get"@click="gotostore">确定</div>
    </div>
</template>
<script>
    export default {
        name: 'pop-tip',
        data () {
            return {
                points: sessionStorage.getItem('points')
            }
        },
        methods: {
            gotostore() {
                axios({
                    url: '/hehua/get/point20',
                    method: 'post',
                    params: {
                        code: sessionStorage.getItem('code'),
                        sn: sessionStorage.getItem('sn'),
                        points: sessionStorage.getItem('points')
                    },
                    headers: {
                        token: sessionStorage.getItem("token"),
                        tokenId: sessionStorage.getItem("tokenId")
                    }
                }).then(res => {
                    if (res.data) {
                        location.href = "/app-hebei/views/hmenus/shop.html?v=" + (+new Date);
                    } else {
                        alert('出错')
                    }
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    .pop-tip-wrap {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: rgba(0,0,0,.5);
    }
    .pop-tips {
        margin: 411px auto 0;
        padding-top: 46px;
        border-radius: 4px;
        width: 555px;
        height: 251px;
        background: #fff;
        text-align: center;
        h4 {
            margin-bottom: 20px;
            font-size: 40px;
            font-weight: 500;
        }
        p {
            line-height: 1.5;
            font-size: 34px;
            em {
                color: red;
            }
        }
    }
    .get {
        margin: 55px auto 0;
        border-radius: 4px;
        border: 1px solid #fff;
        width: 178px;
        height: 77px;
        line-height: 77px;
        text-align: center;
        font-size: 34px;
        color: #fff;
        background: #5F5D5D;
    }
</style>