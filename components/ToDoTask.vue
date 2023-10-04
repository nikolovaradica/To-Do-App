<template>
  <div class="task" :class="{ 'finished' : this.task.completed === true}" >
    <div class="left">
      <div class="checkboxText">
        <input @click="$emit('change-status', task.id)" type="checkbox" :checked="this.task.completed">
        <h3>{{ task.content }}</h3>
      </div>
      <p id="date">{{ task.date }}</p>
      <p id="category">{{ task.category }}</p>
    </div>
    <div class="right">
      <i @click="$emit('delete-task', task.id)" class="fa fa-trash" aria-hidden="true"></i>
      <p>{{ status }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ToDoTask',
  props: {
    task: Object,
  },
  emits: ['delete-task', 'change-status'],
  computed: {
    status: function() {
      if(this.task.completed) {
        return 'Completed'
      }
      else return 'In progress'
    },
  },
}
</script>

<style scoped>
  .task {
    background-color: white !important;
    border-radius: 5px;
    padding: .5em .8em;
    display: flex;
    justify-content: space-between;
    width: 23vw;
    align-items: center;
    box-shadow: rgba(0, 0, 0, 0.3) 0 4px 12px;
  }

  .checkboxText{
    display: flex;
    justify-content: flex-start;
  }

  input:checked{
    accent-color: grey;
  }

  #date {
    float: left;
  }

  #category {
    float: right;
  }

  #date, #category{
    margin: auto;
    min-width: 8em;
    font-size: 15px;
    padding-bottom: 1em;
  }

  .right {
    padding-top: 1.5em;
    display: flex;
    align-items: flex-end;
    flex-direction: column;
  }

  .finished>div{
    opacity: 50%;
  }

  .finished>div>div>h3{
    text-decoration: line-through;
  }

  @media screen and (max-width: 1200px){
    .task{
      width: 33.5vw;
    }
  }

  @media screen and (max-width: 1000px){
    .task{
      width: 44vw;
    }
    #date, #category, p{
      font-size: .9em;
    }
  }

  @media screen and (max-width: 600px){
    h3{
      font-size: 1em;
    }
    #date, #category, p{
      font-size: .8em;
    }
    .task{
      align-items: flex-start;
      width: 94.5vw;
    }
  }
</style>