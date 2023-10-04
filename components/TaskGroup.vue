<template>
  <div class="fullContainer">
    <div class="inProgressContainer">
      <h2>Tasks in progress</h2>
      <div :key="task.id" v-for="task in tasks">
        <div v-if="task.completed===false" class="inProgressTask">
          <ToDoTask @delete-task="$emit('delete-task', task.id)" @change-status="$emit('change-status', task.id)" :task="task"/>
        </div>
      </div>
    </div>
    <div class="doneContainer">
      <h2>Finished tasks</h2>
      <div :key="task.id" v-for="task in tasks">
        <div v-if="task.completed===true" class="doneTask">
          <ToDoTask @delete-task="$emit('delete-task', task.id)" @change-status="$emit('change-status', task.id)" :task="task"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ToDoTask from "@/components/ToDoTask";

export default {
  name: 'TaskGroup',
  props: {
    tasks: Array,
  },
  components: {
    ToDoTask,
  },
  emits: ['delete-task', 'change-status'],
}
</script>

<style scoped>
  .fullContainer{
    display: flex;
    justify-content: space-around;
    gap: .5vw;
  }

  .inProgressContainer, .doneContainer{
    background-color: #f0f0f0;
    padding: .4em .7em;
    border-radius: 8px;
    width: 26vw;
    height: fit-content;
    min-height: 82vh;
    max-height: fit-content;
    margin-bottom: .5em;
    box-shadow: rgba(0, 0, 0, 0.3) 0 4px 12px;
  }

  .doneTask, .inProgressTask {
    padding: .4em .7em;
  }

  @media screen and (max-width: 1200px){
    .doneContainer, .inProgressContainer{
      width: 36vw;
      min-height: 38vh;
    }
    .doneTask, .inProgressTask{
      padding: .2em .2vw;
    }
  }

  @media screen and (max-width: 1000px){
    .doneContainer, .inProgressContainer{
      width: 49vw;
    }

    h2{
      font-size: 1.3em;
    }
  }

  @media screen and (max-width: 600px){
    h2{
      font-size: 1.2em;
    }
    .doneContainer, .inProgressContainer{
      min-height: 40vh;
      width: 98vw;
      min-width: 98vw;
      max-width: fit-content;
      margin-left: .3vw;
      padding-left: 1.5vw;
      padding-right: 1.5vw;
    }
    .doneContainer{
      margin-bottom: 1em;
    }
    .fullContainer{
      flex-direction: column;
      justify-content: flex-start;
    }
  }
</style>