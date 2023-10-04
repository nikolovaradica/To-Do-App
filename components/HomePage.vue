<template>
  <div class="container">
    <NavBar @add-task="addTask" />
    <div class="main">
      <Header title="TO DO LIST"/>
      <TaskGroup @delete-task="deleteTask" @change-status="changeStatus" :tasks="tasks"/>
    </div>
    <SimpleCalendar class="cal"/>
  </div>
</template>

<script>
import Header from './Header';
import TaskGroup from "./TaskGroup";
import NavBar from "./NavBar";
import SimpleCalendar from "./SimpleCalendar";
import { collection, onSnapshot, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/main";
import { getAuth } from "firebase/auth";

export default {
  name: 'HomePage',
  components: {
    Header,
    TaskGroup,
    NavBar,
    SimpleCalendar,
  },
  data() {
    return {
      tasks: [],
    }
  },
  methods: {
    addTask(newTask){
      addDoc(collection(db, "users/" + getAuth().currentUser.uid + "/todos"), {
        content: newTask.content,
        completed: newTask.completed,
        category: newTask.category,
        date: newTask.date,
      });
    },
    getTodos(){
      onSnapshot(collection(db, "users/" + getAuth().currentUser.uid + "/todos"), (querySnapshot) => {
        const todos = []
        querySnapshot.forEach((doc) => {
          const todo = {
            id: doc.id,
            content: doc.data().content,
            completed: doc.data().completed,
            category: doc.data().category,
            date: doc.data().date,
          }
          todos.push(todo)
        });
        this.tasks = structuredClone(todos)
      });
    },
    deleteTask(id) {
      deleteDoc(doc(collection(db, "users/" + getAuth().currentUser.uid + "/todos"), id))
    },
    changeStatus(id) {
      let tmp = false
      this.tasks.forEach((task) => {
        if (task.id === id) {
          tmp = task.completed
        }
      })
      updateDoc(doc(collection(db, "users/" + getAuth().currentUser.uid + "/todos"), id), {
        completed: !tmp
      });
    },
  },
  created() {
    this.getTodos()
  }
}
</script>

<style>
  body{
    margin: 0;
    background: linear-gradient(to right, #5fc3e4, #e55d87) no-repeat;
  }

  .container{
    display: flex;
    justify-content: flex-start;
    min-height: 100vh;
    min-width: 100vw;
  }

  .main {
    margin-left: 17.5vw;
  }

  .cal{
    margin-top: 10em;
    box-shadow: rgba(0, 0, 0, 0.3) 0 4px 12px;
  }

  @media screen and (max-width: 1200px){
    .main{
      margin-left: 24.5vw;
    }
    .container{
      flex-wrap: wrap;
    }
  }

  @media screen and (max-width: 1000px){
    .main{
      margin-left: .2em;
    }
  }

  @media screen and (max-width: 600px){
    .container{
      flex-direction: column;
      flex-wrap: nowrap;
    }
  }
</style>