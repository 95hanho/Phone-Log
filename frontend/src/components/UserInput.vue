<template>
    <div id="userInput">
        <div class="container">
            <div id="accordion">
                <div class="card card-default">
                    <div class="card-header" style="background:#ddddd6">
                        <h4 class="card-title">
                            <div>
                                <b>추가할 유저 정보를 입력 해주세요.</b>
                            </div>
                        </h4>
                    </div>
                    <div id="collapse1" class="collapse show">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-3 col-lg-4">
                                    <div class="form-group">
                                        <label class="control-label">아이디</label>
                                        <input v-model="Params.id" ref="refId" @keyup.enter="userInput" type="text" class="form-control" placeholder="ID">
                                    </div>
                                </div>
                                <div class="col-md-3 col-lg-4">
                                    <div class="form-group">
                                        <label class="control-label">비밀 번호</label>
                                        <input v-model="Params.password" ref="refPassword" @keyup.enter="userInput" type="password" class="form-control" placeholder="PASSWORD"/>
                                    </div>
                                </div>
                                <div class="col-md-3 col-lg-4">
                                    <div class="form-group">
                                        <label class="control-label">접속IP</label>
                                        <input v-model="Params.ip" ref="refIp" @keyup.enter="userInput" class="form-control" type="text" placeholder="IP"/>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-3 col-lg-4">
                                    <div class="form-group">
                                        <label class="control-label">업체 코드</label>
                                        <input v-model="Params.logis_code" ref="refCode" @keyup.enter="userInput" type="text" class="form-control" placeholder="LOGIS_CODE"/>
                                    </div>
                                </div>
                                <div class="col-md-3 col-lg-4">
                                    <div class="form-group">
                                        <label class="control-label">업체 암호</label>
                                        <input v-model="Params.logis_pwd" ref="refPwd" @keyup.enter="userInput" type="text" class="form-control" placeholder="LOGIS_PWD"/>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="pull-right col-12">
                                    <button @click="reset" class="btn btn-danger float-right btn-lg active" style="margin-left:5px">
                                    리셋
                                    </button>
                                    <button @click="userInput" class="btn btn-primary float-right btn-lg active">
                                    추가
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            Params:{
                id:'',
                password:'',
                ip:'',
                logis_code:'',
                logis_pwd:'',
            }
        }
    },
    methods:{
        reset(){
            this.Params.id = ''
            this.Params.password = ''
            this.Params.ip = ''
            this.Params.logis_code = ''
            this.Params.logis_pwd = ''
        },
        userInput(){
            const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/; // 한글체크
            const special = /[~!@#$%^&*()_+|<>?:{}]/; // 특수문자 체크
            if(this.Params.id.length <= 3 || korean.test(this.Params.id) || special.test(this.Params.id)){
                alert('아이디를 4자리 이상 영어숫자로 입력해주세요.');
                this.$refs.refId.focus();
            } else if(this.Params.password.length <= 9){
                alert('비밀번호를 10지리 이상 입력해주세요.');
                this.$refs.refPassword.focus();
            } else if(this.Params.ip.length <= 13){
                alert('접속 가능한 IP를 입력해주세요.');
                this.$refs.refIp.focus();
            } else if(this.Params.logis_code.length <= 2){
                alert('업체 코드를 입력해주세요.');
                this.$refs.refCode.focus();
            } else if(this.Params.logis_pwd.length == 0){
                alert('업체 암호를 입력해주세요.');
                this.$refs.refPwd.focus();
            } else {
                this.$http.post('cdrapi/userInput', this.Params
                ).then((res) => {
                    alert(res.data);
                }).catch((err) => {
                    console.log(err.message);
                    alert('서버 오류');
                });
            }
        },
    }
}
</script>