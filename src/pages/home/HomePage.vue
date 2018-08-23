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

/* カレンダーのスタイル */
.table th, td{
  text-align: center;
}
#buttom_area{
  text-align: center;
  margin-top: 10px;
}
.analyze_buttom{
  display: inline-block;
}
.clear_buttom{
  display: inline-block;
}
</style>

<template>
  <v-ons-page>
    <navbar></navbar>
    <v-ons-card modifier="material">
      <div class="relative">
        <img :src="image" class="back">
      </div>
      <br>
    </v-ons-card>

    <v-ons-card>
      <v-ons-list-item>
        <textarea style="width:100%;height:90px" name="code_ireru" v-model='postdata.document.content' placeholder="文章を入力"></textarea>
      </v-ons-list-item>
      <div id = "buttom_area">
        <div class="analyze_buttom">
          <v-ons-button  @click="go()">感情分析</v-ons-button>
        </div>
        <div class="clear_buttom">
          <v-ons-button style="background-color:rgb(156, 20, 20)" @click="textClear()">クリア</v-ons-button>
        </div>
      </div>
      <div>
        <p>点数！</p>
        <p>{{sentiment_score}}</p>
      </div>
      
  </v-ons-card>
  <v-ons-button @click="page()">ページ遷移 </v-ons-button>
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
    imageset() {
      var score = this.sentiment_score;
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
      else if(score > 80 && score <= 100){
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
    getMonthName: function(month) {
      var monthName = ['January','February','March','April','May','June','July','August','September','October','November','December'];
      return monthName[month - 1];
    },
    moveLastMonth: function() {
      if (this.calData.month == 1) {
          this.calData.year--;
          this.calData.month = 12;
      }
      else {
          this.calData.month--;
      }
    },
    moveNextMonth: function() {
      if (this.calData.month == 12) {
          this.calData.year++;
          this.calData.month = 1;
      }
      else {
          this.calData.month++;
      }
    },
    go(){
      this.axios.post('https://language.googleapis.com/v1/documents:analyzeSentiment?key=AIzaSyDzdTDDNFQ9STkA1bfGEcUnlxgpvFLrEL0',this.postdata)
      .then((res) => {
        console.log(res);
        this.sentiment_score = res.data.documentSentiment.score  * 100;
        //simageset(this.sentiment_score) 
        this.image = this.imageset();

      })
      .catch(error => {
          this.sending = false
          throw error
      })
    },
    textClear(){
      this.postdata.document.content = "" 
      this.sentiment_score = 0
    },
    page(){
      this.$router.push({ name: 'sentiment', params:  {score: this.sentiment_score, content: this.postdata.document.content} }); 
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
      weeks: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      calData: {year: 0, month: 0},
      users: [
        { name: 'Foo Bar', email: 'foo@bar.com' },
        { name: 'John Doh', email: 'john@doh.com' }
      ],
      postdata: {
        document: {  
          type:"PLAIN_TEXT",
        　content:"あなたのことが大好きだ" 
        },
        encodingType: 'UTF8'
      },
      res_data:[],
      sentiment_score: 0

    };
  },
  created() {
    var date = new Date();
    this.calData.year = date.getFullYear();
    this.calData.month = date.getMonth() + 1;
  },
  mounted(){
    
  },
  computed: {
    calendar () {
      // 1日の曜日
      var firstDay = new Date(this.calData.year, this.calData.month - 1, 1).getDay();
      // 晦日の日にち
      var lastDate = new Date(this.calData.year, this.calData.month, 0).getDate();
      // 日にちのカウント
      var dayIdx = 1;

      var calendar = [];
      for (var w = 0; w < 6; w++) {
        var week = [];

        // 空白行をなくすため
        if (lastDate < dayIdx) {break;}

        for (var d = 0; d < 7; d++) {
          if (w == 0 && d < firstDay) {
            week[d] = {day: ''};
          } else if (w == 6 && lastDate < dayIdx) {
            week[d] = {day: ''};
            dayIdx++;
          } else if (lastDate < dayIdx) {
            week[d] = {day: ''};
            dayIdx++;
          } else {
            week[d] = {day: dayIdx};
            dayIdx++;
          }
        }
        calendar.push(week);
      }
      return calendar;
    }
  }
};
</script>
