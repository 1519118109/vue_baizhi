<template>
    <div class="footer">
        <ul  >
            <li v-for="(footer , index) in footer_list" :key="index"><span>{{footer.title}}</span></li>
<!--            <li>联系我们</li>-->
<!--            <li>百知教育</li>-->
<!--            <li>帮助中心</li>-->
<!--            <li>意见反馈</li>-->
<!--            <li>新手指南</li>-->
        </ul>
    </div>
</template>

<script>
    export default {
        name: "Footer",
        data() {
            return {
                footer_list: [],
            }
        },
        methods: {
            // 获取所有轮播图的方法
            get_all_footer() {
                this.$axios({
                    url: this.$settings.HOST + "home/footer/",
                    method: 'get',
                }).then(res => {
                    this.footer_list = res.data;
                }).catch(error => {
                    console.log(error);
                })
            },
        },
        created() {
            // 在页面完成渲染前获取到轮播图数据并复制给data
            this.get_all_footer();
        }
    }
</script>

<style scoped>
    .footer {
        width: 100%;
        height: 128px;
        background: #25292e;
        color: #fff;
    }

    .footer ul {
        margin: 0 auto 16px;
        padding-top: 38px;
        width: 810px;
    }

    .footer ul li {
        float: left;
        width: 112px;
        margin: 0 10px;
        text-align: center;
        font-size: 14px;
    }

    .footer ul::after {
        content: "";
        display: block;
        clear: both;
    }

    .footer p {
        text-align: center;
        font-size: 12px;
    }
</style>
