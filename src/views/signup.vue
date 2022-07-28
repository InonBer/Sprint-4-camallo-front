<template>
    <section class="login-signup-container flex column align-center">
        <div class="login-logo">
        </div>
        <el-card class="box-card flex column align-center">

            <h4>Sign up for your account</h4>
            <el-input class="signup-input" placeholder="Enter email" v-model="credentials.email"></el-input>
            <el-input class="signup-input" placeholder="Fullname" v-model="credentials.fullname"></el-input>
            <el-input class="signup-input" type="password" placeholder="Password" v-model="credentials.password">
            </el-input>
            <div class="signup-small">
                <small>
                    By signing up, you confirm that you've read and accepted our
                    <a>Terms of Service</a>
                    and
                    <a>Privacy Policy.</a>
                </small>
            </div>
            <el-button @click="onSignup">Continue</el-button>
            <span>OR</span>
            <div class="login-btn-container flex column align-center">
                <button class="continue-btn flex align-center justify-center">
                    Continue with Google
                </button>
                <button class="continue-btn flex align-center justify-center">
                    Continue with Microsoft
                </button>
                <button class="continue-btn flex align-center justify-center">
                    Continue with Apple
                </button>
            </div>
            <hr>

            <router-link to="/login">Already have an account? Log In</router-link>
        </el-card>
        <div class="login-background">
            <div class="img-left">
            </div>
            <div class="img-right">
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
                email: '',
                fullname: '',
                password: ''
            }
        }
    },
    computed: {

    },
    methods: {
        async onSignup() {
            if (this.credentials.email.length < 3 && this.credentials.fullname.length < 3 && this.credentials.password.length < 3) return
            console.log('logging in');
            const cred = JSON.parse(JSON.stringify(this.credentials))
            try {
                const user = await userService.signup(cred)
                this.$store.dispatch('setCurrUser', { user })
                this.$router.push('/board-page')
            } catch (e) {
                console.log(e);
            }


        }
    },
    created() {
    }
}
</script>


