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

#calendar th:first-child {
    background-color: #FEEEFF;
}
#calendar td:first-child {
    background-color: #FEEEFF;
}
#calendar th:nth-child(7) {
    background-color: #DFFFFF
}
#calendar td:nth-child(7) {
    background-color: #DFFFFF
}

#calendar td:hover {
    opacity: 0.6;
}
</style>

<template>
  <v-ons-page>
    <navbar></navbar>
    <div id="calendar-nav">
      <i class="zmdi zmdi-comment-outline" tappable @click="moveLastMonth"></i>
      <span>{{calData.year}} - {{getMonthName(calData.month)}}</span>
      <i class="zmdi zmdi-comment-outline" tappable @click="moveNextMonth"></i>
    </div>

    <table id="calendar" class="table table-bordered">
      <thead>
        <tr>
          <th v-for="week in weeks">{{week}}</th>
          <!-- <th v-repeat="week in weeks">{{week}}</th> -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="week in calendar">
          <td v-for="day in week">{{day.day}}</td>
        </tr>
        <!-- <tr v-repeat="week: calendar">
          <td v-repeat="day: week">{{day.day}}</td>
        </tr> -->
      </tbody>
    </table>
    <v-ons-button @click="go()">押せ</v-ons-button>
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
        //this.experiences = res.data
      })
      .catch(error => {
          this.sending = false
          throw error
      })

    },
    page(){
      this.$router.push({ name: 'sentiment'}); 
    }
  },

  data() {
    return {
      weeks: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      calData: {year: 0, month: 0},
      users: [
        { name: 'Foo Bar', email: 'foo@bar.com' },
        { name: 'John Doh', email: 'john@doh.com' }
      ],
      postdata: {
        document: {  
          type:"PLAIN_TEXT",
        　content:"あなたのこと大好き" 
        },
        encodingType: 'UTF8'
      },
    };
  },
  created() {
    var date = new Date();
    this.calData.year = date.getFullYear();
    this.calData.month = date.getMonth() + 1;
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
