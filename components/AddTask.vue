<template>
  <h3>Add a task</h3>
  <form @submit="onSubmit" class="first-form">
    <input type="text" v-model="content" name="content" placeholder="Enter task name here">
    <input type="submit" value="Save Task">
  </form>
  <button @click="toggleAddTask" >Add task with details</button>
  <form v-if="showAddTask" @submit="onSubmit">
    <div class="form-control">
      <label>Task</label>
      <input type="text" v-model="content" name="content" placeholder="Add Task Name" />
    </div>
    <div class="form-control">
      <label>Date</label>
      <input type="date" v-model="date" name="date" placeholder="Add Date"/>
    </div>
    <div class="form-control">
      <label>Category</label>
      <select v-model="category" name="category">
        <option value="Main">Main</option>
        <option value="Work">Work</option>
        <option value="School">School</option>
        <option value="Groceries">Groceries</option>
      </select>
    </div>
    <input type="submit" value="Add Task"/>
  </form>
</template>

<script>
import formatISO from 'date-fns/formatISO'

export default {
  name: "AddTask",
  data() {
    return {
      content: '',
      date: formatISO(new Date(), {representation: 'date'}),
      category: 'Main',
      completed: false,
      showAddTask: false,
    }
  },
  methods: {
    onSubmit(e){
      e.preventDefault()
      if(!this.content){
        alert('Please add a task!')
        return
       }
      const newTask = {
        content: this.content,
        category: this.category,
        completed: this.completed,
        date: this.date,
      }

      this.$emit('add-task', newTask)

      this.content = ''
      this.category = 'Main'
      this.completed = false
      this.date = formatISO(new Date(), {representation: 'date'})
    },
    toggleAddTask() {
      this.showAddTask = !this.showAddTask
    },
  },
  emits: ['add-task']
}
</script>

<style scoped>
  .form-control, .first-form {
    margin: 20px 0;
  }

  .form-control label {
    display: block;
  }

  .form-control input, .first-form input[type='text'] {
    width: 90%;
    color: darkgray;
    font-weight: 600;
    font-size: 14px;
    letter-spacing: 1px;
    background: rgba(136, 126, 126, 0.15);
    padding: 0.6em 1.2em;
    border-radius: 20px;
    outline: none;
    box-sizing: border-box;
    border: 2px solid rgba(0, 0, 0, 0.02);
    text-align: center;
    margin: .3em;
  }

  .form-control input:focus, .first-form input[type='text']:focus, select:focus{
    border: 2px solid rgba(0, 0, 0, 0.18);
    color: black;
  }

  input[type='date']{
    color: rgba(49,49,49,0.65);
  }

  select{
    margin: .3em;
    background: rgba(136, 126, 126, 0.15);
    border-radius: 20px;
    width: 90%;
    color: rgba(49,49,49,0.65);
    font-weight: 600;
    font-size: 14px;
    letter-spacing: 1px;
    padding: 0.6em 1.2em;
    outline: none;
    box-sizing: border-box;
    border: 2px solid rgba(0, 0, 0, 0.02);
    text-align: center;
  }

  option{
    color: black;
  }

  button {
    background: linear-gradient(to left, #e55d87, rgba(229,93,135,0.62));
    border: 0;
    border-radius: .5rem;
    box-sizing: border-box;
    color: white;
    font-size: .875rem;
    font-weight: 600;
    line-height: 1.25rem;
    padding: .75rem 1rem;
    text-align: center;
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.3) 0 4px 12px;
    transition: 0.6s;
  }

  button:hover {
    background: white !important;
    color: #e55d87;
  }

  button:active{
    transform: scale(0.95);
  }

  input[type='submit']{
    width: 90%;
    min-height: 2.5em;
    color: white;
    background: linear-gradient(to left, #5fc3e4, rgba(95,195,228,0.7));
    box-shadow: rgba(0, 0, 0, 0.3) 0 4px 12px;
    border: 0;
    border-radius: 5em;
    padding: .3em 1.2em;
    cursor: pointer;
    margin: .3em;
    transition: 0.6s;
  }

  input[type='submit']:hover{
    background:white;
    color: #5fc3e4;
  }

  input[type='submit']:active {
    transform: scale(0.95);
  }

</style>