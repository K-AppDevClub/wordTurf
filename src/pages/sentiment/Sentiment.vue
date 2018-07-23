<template>
  <ons-page>
    <navbar navType="back"></navbar>
    <el-card class="box-card">
        <div class="title">
          
        </div>
        <div class="pull-right" mergin-top="20px" > 作成者:hoshinari</div>
    </el-card>
    <el-card class="box-card">
        <div class="bold">概要</div>
    </el-card>
    <el-card class="box-card">
        <div class="bold">コース</div>
        
    </el-card>
    <el-card class="box-card">
        <div class="bold">感想</div>
        <p></p>
    </el-card>
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
      items: [
        {
          id: 1,
          src: 'http://journey-on-map.up.n.seesaa.net/journey-on-map/image/E382B9E382ABE382A4E38384E383AAE383BC.JPG?d=a2',
        },
        {
          id: 2,
          src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Tokyo_Dome_2007-12.jpg/1920px-Tokyo_Dome_2007-12.jpg',
        }
      ]
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
  },


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
  .title{
    font-weight:bold;
    font-size: 24px;
  }
  .bold{
    font-weight:bold;
    font-size: 18px;
  }
</style>


