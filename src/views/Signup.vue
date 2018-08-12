<template>
    <div id="signup" class="signup-bg">
        <h4>注册会员领荷石币，专属好礼惊喜连连</h4>
        <h2>注册会员</h2>
        <span class="tips">(零售户专区)</span>
        <form name="form">
            <div class="form-item">
                <input v-model="user.userName" maxlength="5" class="border-box" type="text" placeholder="姓名：" required>
            </div>
            <div class="form-item">
                <input v-model="user.phoneNo" class="border-box" minlength="11" maxlength="11" type="tel" placeholder="手机号：" required>
            </div>
            <div class="form-item vcode-wrap">
                <input v-model="user.verifyCode" class="border-box vcode" minlength="4" maxlength="4" type="tel" placeholder="验证码：" required>
                <input @click="send" class="vcode-btn" type="button" v-model="vcodeBtnMsg" :disabled="vcodeBtnDisable" readonly>
            </div>
            <div class="form-item">
                <input v-model="user.cardNo" class="border-box" type="tel" placeholder="烟草证号：" required>
            </div>
            <div class="form-item">
                <input v-model="user.shopName" maxlength="5" class="border-box" type="text" placeholder="店铺名称：" required>
            </div>
        </form>
        <button type="submit" class="submit" @click="submit">注册</button>
        <div class="qrcode"></div>
        <pop-tip v-if="poptipflag"></pop-tip>
    </div>
</template>
<script>
    export default {
        name: 'Signup',
        data () {
            return {
                poptipflag: false,
                vcodeBtnMsg: '获取验证码',
                vcodeBtnDisable: false,
                user: {
                    phoneNo: '',
                    userName: '',
                    verifyCode: '',
                    cardNo: '',
                    shopName: ''
                }
            }
        },
        methods: {
            send () {
                if (this.user.phoneNo !== '' && /^1[0-9]{10}$/.test(this.user.phoneNo)) {
                    if (!this.vcodeBtnDisable) {
                        this.vcodeBtnDisable = true;
                        this.verify();
                    }
                };
            },
            verify() {
                let me = this;
                let count = 60;
                var interval = window.setInterval(function() {
                    if ((count--) == 0) {
                        count = 60;
                        me.vcodeBtnDisable = false;
                        me.vcodeBtnMsg = '获取验证码';
                        window.clearInterval(interval);
                    } else {
                        me.vcodeBtnMsg = count + '秒';
                    }
                }, 1000);
                axios({
                    method: 'post',
                    url: '/act_v2/sendMessage',
                    params: {
                        mobile: this.user.phoneNo,
                        orgCode: sessionStorage.getItem("orgCode"),
                        scaleType: "retailer_reg"
                    },
                    headers: {
                        token: sessionStorage.getItem("token"),
                        tokenId: sessionStorage.getItem("tokenId")
                    }
                })
            },
            submit () {
                if (form.checkValidity()) {
                    if (this.user.cardNo.length != 12) {
                        alert('您填写的许可证号不正确，请重新输入！')
                        return
                    }
                    axios({
                        method: 'post',
                        url: '/retailer/register',
                        params: {
                            phoneNo: this.user.phoneNo,
                            userName: this.user.userName,
                            verifyCode: this.user.verifyCode,
                            cardNo: this.user.cardNo,
                            shopName: this.user.shopName
                        },
                        headers: {
                            token: sessionStorage.getItem("token"),
                            tokenId: sessionStorage.getItem("tokenId")
                        }
                    }).then(res => {
                        if (res.data) {
                            if (res.data.success) {
                                this.poptipflag = true;
                            } else {
                                alert(res.data.message)
                            }
                        } else {
                            alert('注册出错')
                        }
                    })
                } else {
                    alert('请确保所有项已填写')
                }
            }
        }
    }
</script>
<style lang="scss">
    .signup-bg {
        padding-top: 170px;
        width: 100%;
        height: 1209px;
        text-align: center;
        h4 {
            font-size: 32px;
        }
        h2 {
            margin-top: 18px;
            margin-bottom: 21px;
            font-size: 72px;
            font-weight: bold;
        }
        .tips {
            font-size: 38px;
        } 
        form {
            margin: 46px auto 0;
            display: block;
            width: 508px;
            .vcode-wrap {
                position: relative;
            }
            .form-item {
                overflow: hidden;
                margin-bottom: 33px;
                border: 1px solid #ddd;
                border-radius: 3px;
                width: 508px;
                height: 63px;
                background: #fff;
                input {
                    display: block;
                    width: 100%;
                    height: 100%;
                    font-size: 32px;
                }
                input:not(.vcode-btn) {
                    padding: 0 10px;
                    background: transparent;
                }
                .vcode-btn {
                    position: absolute;
                    top: 0;
                    right: 0;
                    padding: 0;
                    border-radius: 4px;
                    width: 153px;
                    height: 100%;
                    line-height: 100%;
                    font-size: 26px;
                    text-align: center;
                }
            }
        }
        .submit {
            display: block;
            margin: 0 auto 31px;
            border-radius: 4px;
            width: 303px;
            height: 63px;
            line-height: 63px;
            text-align: center;
            font-size: 36px;
        }
        .qrcode {
            margin: 0 auto;
            width: 118px;
            height: 124px;
        }
    }
</style>