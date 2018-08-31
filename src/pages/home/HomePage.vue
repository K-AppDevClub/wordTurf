<style lang='scss' scoped>
.page-title {
  text-align: center;
}
.body {
  margin-top: 50px;
}
#calendar-nav {
  text-align: center;
}

#calendar-nav span {
  display: inline-block;
  width: 200px;
}

#calendar-nav i:hover {
  cursor: pointer;
}

#card1{
  background: #FFFAFA;
}
#card2{
  background: #FFF5EE;
}
#center{
  text-align: center;
  // background: #FFFFE0;
}

#total{
  font-family: cursive;
  font-size: 40px;
}

#score{
  font-family: cursive;
  font-size: 60px;
  color: #FF0000;
}

.relative{
  text-align: center;
}

.analyze_buttom{
  text-align: right;
}
</style>


<template>
  <v-ons-page>
    <navbar></navbar>
    
    <v-ons-card id="card1">
      <div id="center">
        <span id="total">Happy score   </span>
        <span id="score">{{total_score}}</span>
      </div>
    <!-- </v-ons-card>

    <v-ons-card mdifier="material"> -->
      <div class="relative">
        <img :src="image" class="back">
      </div>
      <br>
    </v-ons-card>

    <v-ons-card id="card2">
      <v-ons-list-item>
        <textarea style="width:100%;height:90px" name="code_ireru" v-model='postdata.document.content' placeholder="文章を入力"></textarea>
      </v-ons-list-item>
      <div id = "buttom_area">
        <div class="analyze_buttom">
          <v-ons-button style="background-color:rgb(184,134,11)" @click="go()">感情分析</v-ons-button>
        </div>
        <!-- <div class="clear_buttom">
          <v-ons-button style="background-color:rgb(156, 20, 20)" @click="textClear()">クリア</v-ons-button>
        </div> -->
      </div>
      
  </v-ons-card>
  <v-ons-button style="background-color:rgb(245,222,179)" @click="resetItem()">Totalscore reset </v-ons-button>
  </v-ons-page>
</template>

<script>
import LoadingIndicator from '../../components/loading-indicator/LoadingIndicator';
import Navbar from '../../components/navbar/Navbar';
import Config from '../../config/Config';

export default {
  name: 'posts-page',
  components: {
    LoadingIndicator,
    Navbar,
  },
  methods: {
    imageset: function(score) {
      if (score >= 0 && score <= 15){
        return this.image2;
      }
      else if(score > 15 && score <= 30){
        return this.image3;
      }
      else if(score > 30 && score <= 45){
        return this.image4;
      }
      else if(score > 45 && score <= 60){
        return this.image5;
      }
      else if(score > 65 && score <= 80){
        return this.image6;
      } 
      else if(score > 80){
        return this.image7;
      }
      else if(score < 0 && score >= -10){
        return this.image8;
      }
      else if(score < -10 && score >= -30){
        return this.image9;
      }            
      else if(score < -30 && score >= -50){
        return this.image10;
      }
      else if(score < -50 && score >= -75){
        return this.image11;
      }
      else if(score < -75 && score >= -100){
        return this.image12;
      }
    },
    go(){
      if(this.postdata.document.content == ""){
        this.$ons.notification.alert('文章を入力してください');
      }else{
        this.axios.post('https://language.googleapis.com/v1/documents:analyzeSentiment?key=AIzaSyDzdTDDNFQ9STkA1bfGEcUnlxgpvFLrEL0',this.postdata)
        .then((res) => {
          console.log(res);
          this.sentiment_score = res.data.documentSentiment.score  * 100;
          this.image = this.imageset(this.total_score);
          this.points = this.total_score + this.sentiment_score
          this.setItem();
          this.page();
        })
        .catch(error => {
            this.sending = false
            throw error
        })
      }
    },
    textClear(){
      this.postdata.document.content = "" 
      this.sentiment_score = 0
    },
    page(){
      this.$router.push({ name: 'sentiment', params:  {score: this.sentiment_score, content: this.postdata.document.content} }); 
    },
    addPoints() {
      this.points.push('point_' + this.points.length);
      this.setPoints();
    },
    setItem() {
      localStorage.setItem('points', JSON.stringify(this.points));
    },
    resetItem(){
      this.points = 0;
      this.setItem();
      location.reload();
    }
  },

  data() {
    return {
      image:  0,
      image1: require('../../../images/2.png'),
      image2: require('../../../images/3.png'),
      image3: require('../../../images/4.png'),
      image4: require('../../../images/5.png'),
      image5: require('../../../images/6.png'),
      image6: require('../../../images/7.png'),
      image7: require('../../../images/8.png'),                  
      image8: require('../../../images/9.png'),
      image9: require('../../../images/ゴミ1.png'),
      image10: require('../../../images/ゴミ2.png'),
      image11: require('../../../images/ゴミ3.png'),
      image12: require('../../../images/ゴミ4.png'),
      postdata: {
        document: {  
          type:"PLAIN_TEXT",
        　content: []
        },
        encodingType: 'UTF8'
      },
      res_data:[],
      sentiment_score: 0,
      points: [],
      total_score: 0,
      json: ''

    };
  },
  mounted(){
    this.total_score = JSON.parse(localStorage.getItem('points')) || 0;
    this.image = this.imageset(this.total_score);
  }
};
</script>
