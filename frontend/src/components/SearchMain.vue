<template>
    <div id="searchMain">
        <div class="container">
            <div id="accordion">
                <div class="card card-default">
                    <div class="card-header" style="background:#ddddd6">
                        <h4 class="card-title" style="margin-top:10px;">
                            <div style="margin-left:10px;font-size:20px;">
                                CDR을 조회할 기간 또는 번호를 입력해주세요.
                            </div>
                        </h4>
                    </div>
                    <div id="collapse1" class="collapse show">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-3 col-lg-2">
                                    <div class="form-group">
                                        <label class="control-label">조회 조건</label>
                                        <select class="form-control" v-model="searchTerm" disabled>
                                            <option value="1">기간</option>
                                            <option value="2">기간 + 번호</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-3 col-lg-2">
                                    <div class="form-group">
                                        <label class="control-label">업체 코드</label>
                                        <input v-model="Params.LOGIS_CODE" type="text" class="form-control" disabled/>
                                    </div>
                                </div>
                                <div class="col-md-3 col-lg-4">
                                    <div class="form-group">
                                        <label class="control-label">시작 시간(YYYYMMDDhhmm)</label>
                                        <input @keyup.enter="cdrSearch" v-model="Params.S_DATE" ref="sDateRef" @keyup="letterTest" type="text" class="form-control" placeholder="YYYYMMDDhhmm"/>
                                    </div>
                                </div>
                                <div class="col-md-3 col-lg-4">
                                    <div class="form-group">
                                        <label class="control-label">종료 시간(YYYYMMDDhhmm)</label>
                                        <input @keyup.enter="cdrSearch" v-model="Params.E_DATE" ref="eDateRef" @keyup="letterTest" class="form-control" type="text" placeholder="YYYYMMDDhhmm"/>
                                    </div>
                                </div>
                            </div>
                            <div class="row" v-if="searchTerm == 2">
                                <div class="col-md-3 col-lg-4">
                                    <div class="form-group">
                                        <label class="control-label">접속 번호</label>
                                        <input @keyup.enter="cdrSearch" v-model="Params.ACCESS_NUM" ref="acNumRef" @keyup="letterTest" type="text" class="form-control" />
                                    </div>
                                </div>
                                <div class="col-md-3 col-lg-4">
                                    <div class="form-group">
                                        <label class="control-label">발신 번호</label>
                                        <input @keyup.enter="cdrSearch" v-model="Params.CALLING_NUM" ref="cNumRef" @keyup="letterTest" type="text" class="form-control"/>
                                    </div>
                                </div>
                                <div class="col-md-3 col-lg-4">
                                    <div class="form-group">
                                        <label class="control-label">착신 번호</label>
                                        <input @keyup.enter="cdrSearch" v-model="Params.CALLED_NUM" ref="cdNumRef" @keyup="letterTest" class="form-control" type="text"/>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="pull-right col-12">
                                    <button @click="reset" class="btn btn-danger float-right btn-lg active" style="margin-left:5px">
                                    리셋
                                    </button>
                                    <button @click="cdrSearch" class="btn btn-primary float-right btn-lg active">
                                    검색
                                    </button>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-8 col-lg-8">
                                    ※ 조회조건 <br/>
                                    1. S_DATE 는 E_DATE 보다 이후 일 수 없다. <br/>
                                    2. S_DATE 와 E_DATE 조회 기간은 최대 7일 <br/>
                                    3. S_DATE 는 현재일 기준으로 전월 1일 이전 일 수 없다. <br/>
                                    3. S_DATE 는 이상 이며, E_DATE 는 미만 으로 조회한다.  <br/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="container">
                <h5>Count: {{ count }}</h5>
                <table class="table table-bordered">
                    <thead>
                        <tr bgcolor="lightslategrey">
                            <th scope="col">No.</th>
                            <th scope="col">CDR번호</th>
                            <th scope="col">호 시작시각</th>
                            <th scope="col">착신시각</th>
                            <th scope="col">호 종료시각</th>
                            <th scope="col">실통화시간</th>
                            <th scope="col">접속번호</th>
                            <th scope="col">발신번호</th>
                            <th scope="col">착신번호</th>
                            <th scope="col">결과</th>
                            <th scope="col">호 종료사유</th>
                        </tr>
                    </thead>
                    <tbody v-for="(value, index) in searchValue" :key="index">
                        <SearchList :value="value" :index="index"/>
                        <!--
                        <tr>
                            <td>100100000</td>
                            <td>21.08.01<br>15:39:22</td>
                            <td>21.08.01<br>15:39:02</td>
                            <td>21.08.01<br>15:39:22</td>
                            <td>0(초)</td>
                            <td>050-3572-80009</td>
                            <td>010-1234-5678</td>
                            <td>010-5678-4321</td>
                            <td>실패</td>
                            <td>성공</td>
                        </tr>
                        -->
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import SearchList from '@/components/SearchList'
import EventBus from '@/eventBus/event-bus'

export default {
    data(){
        return{
            searchTerm:"2",
            Params:{
                LOGIS_CODE:'',
                LOGIS_PWD:'',
                S_DATE:'202108011439',
                E_DATE:'202108081539',
                ACCESS_NUM:"050357280009",
                CALLING_NUM:"01012345678",
                CALLED_NUM:"01056784321",
            },
            count:'조회 전',
            searchValue:[],
        }
    },
    components:{
        SearchList
    },
    created(){
        this.loginInfo();
        EventBus.$on('reLoginInfo', () => {
            console.log('reLoginInfo');
            this.loginInfo();
        });
    },
    beforeDestroy(){
        EventBus.$off('reLoginInfo');
    },
    methods:{
        reset(){
            this.Params.S_DATE = '';
            this.Params.E_DATE = '';
            this.Params.ACCESS_NUM = '';
            this.Params.CALLING_NUM = '';
            this.Params.CALLED_NUM = '';
            this.count = 0;
            this.searchValue = [];
        },
        loginInfo(){
            if(this.$cookies.get('accessToken')){
                this.$store.dispatch('loginInfo', this.$cookies.get('accessToken'))
                .then((res) => {
                    this.Params.LOGIS_CODE = res.logis_code;
                    this.Params.LOGIS_PWD = res.logis_pwd;
                }).catch((err) => {
                    alert(err);
                    this.$router.push({name: 'Login'});
                });
            }
        },
        letterTest(){
            if(!isFinite(this.Params.S_DATE)){
                alert('시작 시간에 문자를 입력할 수 없습니다.');
                this.Params.S_DATE = this.Params.S_DATE.substr(0, this.Params.S_DATE.length - 1);
            }
            if(!isFinite(this.Params.E_DATE)){
                alert('종료 시간에 문자를 입력할 수 없습니다.');
                this.Params.E_DATE = this.Params.E_DATE.substr(0, this.Params.E_DATE.length - 1);
            }
            if(!isFinite(this.Params.ACCESS_NUM)){
                alert('접속 번호에 문자를 입력할 수 없습니다.');
                this.Params.ACCESS_NUM = this.Params.ACCESS_NUM.substr(0, this.Params.ACCESS_NUM.length - 1);
            }
            if(!isFinite(this.Params.CALLING_NUM)){
                alert('발신 번호에 문자를 입력할 수 없습니다.');
                this.Params.CALLING_NUM = this.Params.CALLING_NUM.substr(0, this.Params.CALLING_NUM.length - 1);
            }
            if(!isFinite(this.Params.CALLED_NUM)){
                alert('착신 번호에 문자를 입력할 수 없습니다.');
                this.Params.CALLED_NUM = this.Params.CALLED_NUM.substr(0, this.Params.CALLED_NUM.length - 1);
            }
        },
        cdrtest(){
            let today = new Date();
            //202108011439
            console.log(this.Params.S_DATE);
            const sDate = new Date(this.Params.S_DATE.replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1-$2-$3 $4:$5:00'));
            console.log(sDate);
            sDate.setMonth(sDate.getMonth() - 1);
            sDate.setDate(1);
            sDate.setDate(sDate.getDate() - 1);
            sDate.setHours(11);
            sDate.setMinutes(59);
            sDate.setSeconds(59);
            console.log(sDate < today);
        },
        cdrSearch(){
            let limitSDate = new Date();
            const sDate = new Date(this.Params.S_DATE.replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1-$2-$3 $4:$5:00'));
            const eDate = new Date(this.Params.E_DATE.replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1-$2-$3 $4:$5:00'));
            const sDate_7 = new Date(this.Params.S_DATE.replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1-$2-$3 $4:$5:00'));
            limitSDate.setMonth(limitSDate.getMonth() - 1);
            limitSDate.setDate(1);
            limitSDate.setDate(limitSDate.getDate() - 1);
            limitSDate.setHours(23);
            limitSDate.setMinutes(59);
            limitSDate.setSeconds(59);
            sDate_7.setDate(sDate_7.getDate()+7);
            if(this.Params.S_DATE.length != 12){
                alert('시작 시간을 포맷에 맞춰 12자리를 입력해주세요.(YYYYMMDDhhmm)\n현재 글자 수 : ' + this.Params.S_DATE.length);
                this.$refs.sDateRef.focus();
                return;
            } else if(this.Params.E_DATE.length != 12) {
                alert('종료 시간을 포맷에 맞춰 12자리를 입력해주세요.(YYYYMMDDhhmm)\n현재 글자 수 : ' + this.Params.E_DATE.length);
                this.$refs.eDateRef.focus();
                return;
            } else if(this.Params.ACCESS_NUM.length == 0 && this.Params.CALLING_NUM.length == 0 && this.Params.CALLED_NUM.length == 0){
                alert('050번호, 착신번호, 발신번호 중 하나를 입력해주세요.');
                this.$refs.acNumRef.focus();
            } else if(limitSDate > sDate) {
                alert('현재 일 기준 전월 1일 이전은 검색할 수 없습니다.');
                this.$refs.sDateRef.focus();
            } else if(eDate > sDate_7){
                alert('조회 기간은 최대 7일까지만 가능합니다.');
            } else {
                let path = 'cdrapi/cdrn/'+this.Params.LOGIS_CODE+'?LOGIS_PWD='+this.Params.LOGIS_PWD+'&S_DATE='+this.Params.S_DATE+'&E_DATE='+this.Params.E_DATE
                +'&ACCESS_NUM='+this.Params.ACCESS_NUM+'&CALLING_NUM='+this.Params.CALLING_NUM+'&CALLED_NUM='+this.Params.CALLED_NUM;
                this.$http.post(path).then((res) => {
                    //console.log(this.mapping(res.data));
                    this.searchValue = this.mapping(res.data);
                });
            }
            /*
            if(!this.$store.getters.loginInfo){
                alert('로그인 세션이 만료되었습니다. 다시 로그인 해주세요.');
                this.$router.push({name: 'Login'});
            }
            */
        },
        mapping(data){
            let headReg = /<LOGIS_CODE>(?<logisCode>.*)<\/LOGIS_CODE><S_DATE>(?<sDate>.*)<\/S_DATE><E_DATE>(?<eDate>.*)<\/E_DATE><TOT_COUNT>(?<totCount>.*)<\/TOT_COUNT><RESULT_CODE>(?<resultCode>.*)<\/RESULT_CODE>/g;
            let head = headReg.exec(data);
            if(head.groups.totCount == '0'){
                this.count = '결과 없음';
                return [];
            } else {
                this.count = head.groups.totCount;
                let bodyReg = /<body>(?<datas>.*)<\/body>/g;
                let body = bodyReg.exec(data);
                let datasList = body.groups.datas.replaceAll('<data>', '').split('</data>');
                let result = [];
                //result.push(head.groups);
                for(let i = 0;i < head.groups.totCount; i++){
                    let dNum = 0;
                    let dataObject = {};
                    let dataList = datasList[i];
                    dataObject.callid = dataList.substr(dNum, 15).replaceAll('_', '');
                    dataObject.cstime = dataList.substr(dNum+=15, 14).replaceAll('_', '');
                    dataObject.datime = dataList.substr(dNum+=14, 14).replaceAll('_', '');
                    dataObject.cetime = dataList.substr(dNum+=14, 14).replaceAll('_', '');
                    dataObject.duration = dataList.substr(dNum+=14, 5).replaceAll('_', '');
                    dataObject.accessNumber = dataList.substr(dNum+=5, 15).replaceAll('_', '');
                    dataObject.callingNumber = dataList.substr(dNum+=15, 15).replaceAll('_', '');
                    dataObject.calledNumber = dataList.substr(dNum+=15, 15).replaceAll('_', '');
                    dataObject.result = dataList.substr(dNum+=15, 2).replaceAll('_', '');
                    dataObject.cause = dataList.substr(dNum+=2, 2).replaceAll('_', '');
                    result.push(dataObject);
                }
                return result;
            }
            
        },
    }
}
</script>

<style>
.card-default{
  color:#333;
  background: linear-gradient(#fff, #ebebeb) repeat scroll 0 0 transparent;
  font-weight: 600;
  border-radius: 6px;
}
</style>