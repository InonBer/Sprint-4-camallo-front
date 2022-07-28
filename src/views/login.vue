<template>
    <section class="login-signup-container flex column align-center">
        <div class="login-logo">
        </div>
        <el-card class="box-card flex column align-center">
            <h4>Sign up for your account</h4>
            <div>
                <el-input placeholder="Enter fullname" v-model="credentials.fullname"></el-input>
                <el-input placeholder="Enter password" v-model="credentials.password"></el-input>
            </div>
            <small>By signing up, you confirm that you've read and accepted our <a>Terms of Service</a> and <a>Privacy
                    Policy.</a></small>
            <el-button @click="login">Log in</el-button>
            <span>OR</span>
            <div class="login-btn-container flex column align-center">
                <button class="continue-btn flex align-center justify-center">
                    <img src="" alt="">
                    Continue with Google
                </button>
                <button class="continue-btn flex align-center justify-center">
                    <img src="" alt="">
                    Continue with Microsoft
                </button>
                <button class="continue-btn flex align-center justify-center">
                    <img src="" alt="">
                    Continue with Apple
                </button>
            </div>
            <hr>
            <div>
                <router-link to="/signup">Can't log in?</router-link>
                <small> &#8226; </small>
                <router-link to="/signup">Sign up for an account</router-link>
            </div>
        </el-card>
        <div class="login-background">
            <div class="img-left">
                <img src="" alt="">
            </div>
            <div class="img-right">
                <img src="" alt="">
            </div>
        </div>
    </section>
</template>

<script>
import { userService } from '../services/user.service'
export default {
    data() {
        return {
            credentials: {
                fullname: null,
                password: null
            },
        }
    },
    methods: {
        async login() {
            let copy = JSON.parse(JSON.stringify(this.credentials))
            try {
                const user = userService.login(copy)
                await this.$store.dispatch('loginUser', { user })
                this.$router.push('/board-page')
            } catch (error) {
                console.log(error);
            }

        }
    },
    computed: {},
    created() {
    }
}
</script>


