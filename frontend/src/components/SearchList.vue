<template>
    <tr id="searchList">
        <!--
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
        -->
        <td>{{ index + 1 }}</td>
        <td>{{ value.callid }}</td>
        <td>{{ cstime }}</td>
        <td>{{ datime }}</td>
        <td>{{ cetime }}</td>
        <td>{{ duration }}</td>
        <td>{{ accessNumber }}</td>
        <td>{{ callingNumber }}</td>
        <td>{{ calledNumber }}</td>
        <td>{{ result }}</td>
        <td>{{ cause }}</td>
    </tr>
</template>

<script>
export default {
    props:['index', 'value'],
    computed:{
        cstime(){
            return this.value.cstime.replace(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$2.$3.$4\n$5:$6:$7');
        },
        datime(){
            return this.value.datime.replace(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$2.$3.$4\n$5:$6:$7');
        },
        cetime(){
            return this.value.cetime.replace(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$2.$3.$4\n$5:$6:$7');
        },
        duration(){
            return this.value.duration + '(초)';
        },
        accessNumber(){
            let accessNumber = this.value.accessNumber;
            if(accessNumber == undefined){
                accessNumber = '';
            } else if(accessNumber.length >= 11){
                //this.da = value.da.replace(/\B(?=(\d{4})+(?!\d))/g, '-');
                accessNumber = accessNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
            } else if(accessNumber.length == 10){
                let city = accessNumber.substring(0, 2);
                if(city == '02'){
                    accessNumber = accessNumber.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3');
                } else {
                    accessNumber = accessNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
                }
            } else if(accessNumber.length == 9){
                accessNumber = accessNumber.replace(/(\d{2})(\d{3})(\d{4})/, '$1-$2-$3');
            } else if(accessNumber.length == 8){
                accessNumber = accessNumber.replace(/(\d{4})(\d{4})/, '$1-$2');
            }
            return accessNumber;
        },
        callingNumber(){
            let callingNumber = this.value.callingNumber;
            if(callingNumber == undefined){
                callingNumber = '';
            } else if(callingNumber.length >= 11){
                //this.da = value.da.replace(/\B(?=(\d{4})+(?!\d))/g, '-');
                callingNumber = callingNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-****-$3');
            } else if(callingNumber.length == 10){
                let city = callingNumber.substring(0, 2);
                if(city == '02'){
                    callingNumber = callingNumber.replace(/(\d{2})(\d{4})(\d{4})/, '$1-****-$3');
                } else {
                    callingNumber = callingNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-****-$3');
                }
            } else if(callingNumber.length == 9){
                callingNumber = callingNumber.replace(/(\d{2})(\d{3})(\d{4})/, '$1-****-$3');
            } else if(callingNumber.length == 8){
                callingNumber = callingNumber.replace(/(\d{4})(\d{4})/, '$1-****');
            }
            return callingNumber;
        },
        calledNumber(){
            let calledNumber = this.value.calledNumber;
            if(calledNumber == undefined){
                calledNumber = '';
            } else if(calledNumber.length >= 11){
                //this.da = value.da.replace(/\B(?=(\d{4})+(?!\d))/g, '-');
                calledNumber = calledNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
            } else if(calledNumber.length == 10){
                let city = calledNumber.substring(0, 2);
                if(city == '02'){
                    calledNumber = calledNumber.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3');
                } else {
                    calledNumber = calledNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
                }
            } else if(calledNumber.length == 9){
                calledNumber = calledNumber.replace(/(\d{2})(\d{3})(\d{4})/, '$1-$2-$3');
            } else if(calledNumber.length == 8){
                calledNumber = calledNumber.replace(/(\d{4})(\d{4})/, '$1-$2');
            }
            return calledNumber;
        },
        result(){
            if(this.value.result == '00'){
                return '성공';
            } else if(this.value.result == '11'){
                return '실패';
            } else if(this.value.result == '22'){
                return '050FAIL';
            } else {
                return '실패';
            }
        },
        cause(){
            if(this.value.cause == '0'){
                return '정상'
            } else if(this.value.cause == '1'){
                return '결번'
            } else if(this.value.cause == '16'){
                return '정상2'
            } else if(this.value.cause == '17'){
                return '통화중'
            } else if(this.value.cause == '18'){
                return '부재중'
            } else if(this.value.cause == '19'){
                return '부재중'
            } else if(this.value.cause == '20'){
                return '부재중'
            } else if(this.value.cause == '21'){
                return '연결거부'
            } else if(this.value.cause == '22'){
                return '050미등록'
            } else {
                return '기타'
            }
        }
    },
    created(){
    }
}
</script>