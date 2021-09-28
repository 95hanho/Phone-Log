<template>
    <div id="loginMain" style="background:linear-gradient(45deg, black, transparent);">
        <div class="loginTitle">LOGIN</div>
        <div class="loginForm">
            <div>
                <input @keyup.enter="login" v-model="User.id" ref="codeRef" type="text" placeholder="ID">
                <input @keyup.enter="login" v-model="User.password" ref="pwdRef" type="password" placeholder="PASSWORD">
            </div>
            <div>
                <button @click="login" class="loginBtn">로그인</button>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data(){
        return{
            User:{
                id:'kauser01',
                password:'tleldkfzkzkdh!@1',
                //id:'admin',
                //password:'adminsejong123',
                authority:'',
            }
        }
    },
    methods:{
        login(){
            if(this.User.id.length == 0){
                alert('아이디를 입력해주세요.');
                this.$refs.codeRef.focus();
            } else if(this.User.password.length == 0) {
                alert('비밀 번호를 입력해주세요.');
                this.$refs.pwdRef.focus();
            } else {
                this.$store.commit('setRefreshToken');
                this.User.authority = this.$cookies.get('refreshToken');
                this.$http.post('cdrapi/login', this.User
                ).then((res) => {
                    const result = res.data;
                    if(result == 'fail'){
                        alert('로그인 실패 관리자에게 문의하세요');
                        this.$cookies.remove('refreshToken');
                    } else if(result == 'noUser'){
                        alert('일치하는 아이디가 없음');
                        this.$cookies.remove('refreshToken');
                    } else if(result == 'noPassword') {
                        alert('패스워드 일치하지 않음');
                        this.$cookies.remove('refreshToken');
                    } else if(result == 'noIP') {
                        alert('로컬IP 일치하지 않음');
                        this.$cookies.remove('refreshToken');
                    } else {
                        const userReg = /id=(?<id>.*), password(?:.)*logis_code=(?<logis_code>.*), logis_pwd=(?<logis_pwd>.*)/g;
                        const userData = userReg.exec(res.data);
                        this.$store.commit('setAccessToken', userData.groups);
                        if(userData.groups.id == 'admin'){
                            this.$emit('adminLogin');
                        }
                        this.$router.push({name: 'Search'});
                    }
                }).catch((err) => {
                    console.log(err.message);
                    alert('서버 오류');
                });
            }
        }
    }
}
</script>

<style scoped>
#loginMain{
    width: 300px;
    height: 200px;
    border: 1px solid gray;
    margin: auto;
    background: #efefef;
    border-radius: 10px;
}
.loginForm{
    width: 100%;
    height: 100px;
    margin: 16px;
}
.loginForm>div:nth-child(1){
    float:left;
    width: 180px;
}
.loginForm>div:nth-child(2){
    float: left;
    width: 80px;
    padding-top: 2px;
}
.loginForm input{
    border-radius: 1px;
    width: 170px;
    height:40px;
    margin-top:5px;
    padding:0 10px;
    font-size:15px;
}
.loginTitle{
    width: 100%;
    font-size: 30px;
    margin-top: 20px;
    text-align: center;
    font-weight: bold;
    margin-bottom: 16.6px;
}
.loginBtn {
    width: 80px;
    height: 90px;
	box-shadow: 0px 1px 0px 0px #9fb4f2;
	background:linear-gradient(to bottom, #7892c2 5%, #476e9e 100%);
	background-color:#7892c2;
	border-radius:6px;
	border:1px solid #4e6096;
	display:inline-block;
	cursor:pointer;
	color:#ffffff;
	font-family:Arial;
	font-size:18px;
	font-weight:bold;
	text-decoration:none;
	text-shadow:0px -1px 0px #283966;
}
.loginBtn:hover {
	background:linear-gradient(to bottom, #476e9e 5%, #7892c2 100%);
	background-color:#476e9e;
}
.loginBtn:active {
	position:relative;
	top:1px;
}
</style>