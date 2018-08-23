<template>
  <ons-page>
    <navbar navType="back"></navbar>
    <el-card class="box-card">
        <div class="result">
          result
        <p>{{$route.params.score}}点</p>
        <p>{{$route.params.content}}</p>
        </div>
     </el-card>
     <v-ons-button  @click="gohome()">戻る</v-ons-button>
  </ons-page>
</template>

<script>
import Navbar from '../../components/navbar/Navbar';

export default {
  name: 'sentiment',
  components: {
    Navbar,
  },
  props: {
    plan_id: {
      default: 1,
    },
  },
  data() {
    return {
      post: [],
      courses: [],
      value1: '',
    };
  },
  methods: {
    editTime(time){
      if(time){
        let a = new Date(time);
        let hours = (a.getHours() < 10) ? '0' + a.getHours() : a.getHours();
        let minutes = (a.getMinutes() < 10) ? '0' + a.getMinutes() : a.getMinutes();      
        let str = hours + ':' + minutes;
        return str;
      }else{
        return '';
      }
    },
    gohome() {
      this.$router.push({ name: 'home' });
    }
  }

  // data() {
  //   return {
  //     items: {
  //       title: '稲佐山の夜景と君とforever',
  //       overview: '1000万ドルの夜景とも揶揄される長崎市稲佐山の夜景は、意中の相手とのデートを一層盛り上げてくれるはず！！',
  //       spots: ['レストランなんとか', '稲佐山', 'ラブホ'],
  //       course: [
  //         { time: '20:00', move: '夜景を見る' },
  //         { time: '21:45', move: '飯食べる' },
  //         { time: '23:00', move: 'xxx' }],
  //     },
  //   };
  // },
};

</script>
<style>
  
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  /* .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  } */
  .img {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  }
  .result{
    font-weight:bold;
    font-size: 24px;
    text-align: center;
  }
  .bold{
    font-weight:bold;
    font-size: 18px;
  }

</style>


