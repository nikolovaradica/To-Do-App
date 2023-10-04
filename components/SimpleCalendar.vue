<template>
  <div id="cal">
    <calendar-view
        :show-date="showDate" :startingDayOfWeek="1" :items="events" :enable-drag-drop="true" @drop-on-date="onDrop"
        class="theme-default holiday-us-traditional holiday-us-official">
      <template #header="{ headerProps }">
        <calendar-view-header
            :header-props="headerProps"
            @input="setShowDate" />
      </template>
    </calendar-view>
  </div>
</template>

<script>
import { CalendarView, CalendarViewHeader } from "vue-simple-calendar"
import "../../node_modules/vue-simple-calendar/dist/style.css"
import "../../node_modules/vue-simple-calendar/static/css/default.css"
import { collection, onSnapshot, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/main";
import { getAuth } from "firebase/auth";
import differenceInDays from 'date-fns/differenceInDays'
import addDays from 'date-fns/addDays'
import formatISO from 'date-fns/formatISO'

export default {
  name: 'SimpleCalendar',
  data: function () {
    return {
      showDate: new Date(),
      events: [],
      newStartDate: '',
      newEndDate: '',
    }
  },
  components: {
    CalendarView,
    CalendarViewHeader,
  },
  mounted() {
    this.addEvent()
  },
  methods: {
    setShowDate(d) {
      this.showDate = d;
    },
    addEvent() {
      onSnapshot(collection(db, "users/" + getAuth().currentUser.uid + "/todos"), (querySnapshot) => {
        const myEvents = []
        querySnapshot.forEach((doc) => {
          const event = {
            id: doc.id,
            title: doc.data().content,
            startDate: doc.data().date,
            endDate: doc.data().date,
          }
          myEvents.push(event)
        });
        this.events = structuredClone(myEvents)
      });
    },
    onDrop(event, date) {
      const docRef = doc(db, "users/" + getAuth().currentUser.uid + "/todos/" + event.id)
      getDoc(docRef).then( (docSnap) => {
        const dt = docSnap.data().date
        const dropDate = formatISO(date, {representation: 'date'})
        if(dt !== dropDate){
          let diffInDays = differenceInDays(date, new Date(dt))
          if(diffInDays >= 0){
            diffInDays = diffInDays+1
          }
          const newDate = addDays(new Date(dt), diffInDays)
          updateDoc(doc(db, "users/" + getAuth().currentUser.uid + "/todos/" + event.id), {
            date: formatISO(newDate, {representation: 'date'})
          });
        }
      });
    }
  },
}
</script>

<style>
#cal {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: #2c3e50;
  height: 67vh;
  width: 90vw;
  margin-left: .5em;
  margin-right: 1em;
}

.theme-default .cv-day{
  background-color: white;
}

.theme-default .cv-day.today{
  background-color: #89d2eb;
}

.cv-item{
  background: linear-gradient(to left, #e55d87, rgba(229,93,135,0.62));
  color: white;
  border: none;
}

.cv-header-nav{
  width: 80%;
}

.cv-header .periodLabel{
  margin-left: 0;
  margin-right: .2em;
}

@media screen and (max-width: 1200px){
  #cal{
    margin-left: 24.5vw;
    margin-top: 0;
    width: 72.5vw;
    margin-bottom: 1em;
    height: 55vh;
  }
}

@media screen and (max-width: 1000px){
  #cal {
    height: 40vh;
    width: 98vw;
    margin-left: 1vw;
    margin-right: 1vw;
  }
}

</style>