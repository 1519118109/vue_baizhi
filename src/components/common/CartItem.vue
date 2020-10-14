<template>
    <div class="cart_item">
        <div class="cart_column column_1" >
            <el-checkbox class="my_el_checkbox" v-model="checked" @click="check_change"></el-checkbox>
        </div>
        <div class="cart_column column_2">
            <img :src="course.course_img" alt="">
            <span><router-link to="/detail//">{{course.name}}</router-link></span>
        </div>
        <div class="cart_column column_3">
            <el-select v-model="course.expire_id" size="mini" placeholder="请选择购买有效期" class="my_el_select">
                <el-option :label="item.expire_text" :value="item.id" :key="item.id"
                           v-for="item in course.expire_list"></el-option>
                <!--                <el-option label="2个月有效" value="60" key="60"></el-option>-->
                <!--                <el-option label="3个月有效" value="90" key="90"></el-option>-->
                <!--                <el-option label="永久有效" value="10000" key="10000"></el-option>-->
            </el-select>
        </div>
        <div class="cart_column column_4" >¥{{expire_price}}</div>
        <div class="cart_column column_4"><a href="javascript:void(0);" @click="delete_course">删除</a></div>
    </div>
</template>

<script>
    export default {
        name: "CartItem",
        props: ['course','test'],
        data() {
            return {
                expire: 0,
                checked: true,
                expire_price:this.course.real_price,
            }
        },
        // 监听页面中的分类id是否发生了变化
        watch: {
            test(){
                this.checked=this.test
            },
            checked() {
                // 变化之后就修改数据的勾选情况
                this.check_select(this.course.id);
            },
            // 通过监测课程id来切换有效期
            'course.expire_id': function () {
                // 后台发送请求切换状态
                this.change_expire();
            }
        },

        methods:{
            change_expire() {
                let token = sessionStorage.token || localStorage.token;
                this.$axios.put(this.$settings.HOST + "cart/option/", {
                    course_id: this.course.id,
                    expire_id: this.course.expire_id,
                }, {
                    headers: {
                        // 提交购物车时必须携带token  jwt 后必须跟空格
                        "Authorization": "jwt " + token,
                    }
                }).then(response=>{
                    console.log(response.data);
                    this.expire_price=response.data.pric
                    // 改变价格
                }).catch(error=>{
                    console.log(error);
                })
            },

            check_change(){
                this.checked=!this.checked
            },
            // 检查用户是否已经登录
            check_user_login() {
                let token = localStorage.token || sessionStorage.token;
                if (!token) {
                    let self = this;
                    this.$confirm("对不起，请登录后再添加购物车", {
                        callback() {
                            self.$router.push("/login");
                        }
                    });
                    return false
                }
                return token;
            },
            // 改变购物车状态
            check_select(course_id) {
                // alert(course_id)
                let token = this.check_user_login();
                // 发起请求修改商品
                this.$axios.post(this.$settings.HOST+"cart/option/", {
                    course_id: course_id,
                    checked:this.checked
                },{
                    headers:{
                        // 提交购物车时必须携带token  jwt 后必须跟空格
                        "Authorization": "jwt " + token,
                    }
                }).then(response=>{
                    // 向父组件提交事件 来修改购物车已勾选的课程的总价
                    this.$emit("change_select");
                }).catch(error=>{
                    console.log(error);
                })
            },
        // 删除购物车课程
        delete_course() {
            let token = localStorage.token || sessionStorage.token;
            this.$axios.delete(this.$settings.HOST + 'cart/option/', {
                params: {
                    "course_id": this.course.id,
                },
                headers: {
                    "Authorization": "jwt " + token,
                }
            }).then(response => {
                // console.log(response.data);
                this.$message.success(response.data.message)
                this.$store.commit("add_cart", response.data.cart_length)
                localStorage.setItem("cart_num", response.data.cart_length)
                // 当自组价删除商品时需要通知父组件来执行对应的方法  可以向父组件提交事件
                this.$emit("del_course");

            }).catch(error => {
                console.log(error);
                this.$message.success(error.data.message)
            })

         },

        },
        created() {
            this.checked=this.course.selected
        }
    }
</script>

<style scoped>
    .cart_item::after {
        content: "";
        display: block;
        clear: both;
    }

    .cart_column {
        float: left;
        height: 250px;
    }

    .cart_item .column_1 {
        width: 88px;
        position: relative;
    }

    .my_el_checkbox {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        margin: auto;
        width: 16px;
        height: 16px;
    }

    .cart_item .column_2 {
        padding: 67px 10px;
        width: 520px;
        height: 116px;
    }

    .cart_item .column_2 img {
        width: 175px;
        height: 115px;
        margin-right: 35px;
        vertical-align: middle;
    }

    .cart_item .column_3 {
        width: 197px;
        position: relative;
        padding-left: 10px;
    }

    .my_el_select {
        width: 117px;
        height: 28px;
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
    }

    .cart_item .column_4 {
        padding: 67px 10px;
        height: 116px;
        width: 142px;
        line-height: 116px;
    }

</style>
