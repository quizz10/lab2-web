
Vue.component('tasks', {
    template: `
      <div>
      <div class="navbar">
        <div class="navcontainer flex">
          <h1>Todo List</h1>
          <nav>
            <ul>
              <li><a class="underline" href="index.html">Home</a></li>
              <li><a class="underline" href="index.html">Features</a></li>
              <li><a class="underline" href="index.html">About</a></li>
            </ul>
          </nav>
        </div>
      </div>


      <!--      New Task    -->
      <section class="wrapper newtask">
        <form class="taskform" @submit.prevent="submitTask">
          <input v-model="task" type="text" maxlength="50" placeholder="Enter new task"
                 class="form">
          <button class="submitbutton"><span class="underline">Submit</span></button>
        </form>

        <div id="match-list">
        </div>
        <table class="tasktable">
          <thead>
          <tr>
            <th scope="col">Task</th>
            <th scope="col">Status</th>
            <th scope="col" class="">Edit</th>
            <th scope="col" class="">Delete</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(task, index) in tasks" :key="index">

            <td>{{ task.name }}</td>
            <td class="status"><span @click="changeStatus(index)" class="pointer status">{{ task.status }}</span>
            </td>
            <td>
              <div class="edit pointer" @click="editTask(index)"><span class="fa fa-pen"></span>
              </div>
            </td>
            <td>
              <div class="remove pointer" @click="deleteTask(index)">
                <span class="fa fa-trash"></span>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </section>

      <!--      Archive button     -->
      <div class="archive">
        <button class="archivebtn" @click="finishedTasks"><span class="underline">Archive finished</span></button>
      </div>

      <!--      Finished tasks      -->
      <section class="finished tasktable">
        <table class="finishedtable">
          <thead>
          <tr>
            <th scope="col">Task</th>
            <th scope="col">Date</th>
          </tr>
          </thead>
          <td v-show="done.length < 2">You have no finished tasks yet</td>
          <tbody v-if="done.length > 1">
          <tr v-for="finished in done" v-if="finished.name && done.date !== null" class="showfinished">
            <td>{{ finished.name }}</td>
            <td>{{ finished.date }}</td>
          </tr>
          </tbody>
        </table>
      </section>
      </div>
    `,
    data() {
        return {
            task: '',
            editedTask: null,
            statuses: ['todo', 'in-progress', 'finished'],
            done: [
                {
                    name: null,
                    date: null

                }
            ],
            tasks: [

                {
                    name: 'Test task 1',
                    status: 'finished'
                },
                {
                    name: 'Test task 2',
                    status: 'finished'
                },
                {
                    name: 'Test task 3',
                    status: 'finished'
                },
                {
                    name: 'Test task 4',
                    status: 'finished'
                },
                {
                    name: 'Test task 5',
                    status: 'finished'
                },
                {
                    name: 'Test task 6',
                    status: 'finished'
                },

            ]
        }
    },
    methods: {
        submitTask: function () {

            if (this.task.length === 0) {
                return;
            }

            if (this.editedTask === null) {
                this.tasks.push({
                    name: this.task,
                    status: 'todo'
                })

                this.task = ''
            } else {
                this.tasks[this.editedTask].name = this.task
                this.editedTask = null
            }

        },
        deleteTask: function (index) {
            this.tasks.splice(index, 1)
        },

        editTask: function (index) {
            this.task = this.tasks[index].name
            this.editedTask = index
        },

        changeStatus: function (index) {
            let newIndex = this.statuses.indexOf(this.tasks[index].status)
            if (++newIndex > 2) newIndex = 0
            this.tasks[index].status = this.statuses[newIndex]
        },

        finishedTasks: function () {
            let newDate = new Date();

            for (let i = this.tasks.length - 1; i >= 0; i--)
                if (this.tasks[i].status === 'finished') {
                    this.done.push({
                        name: this.tasks[i].name,
                        date: +newDate.getDate() + '/' + (newDate.getMonth() + 1) + '-' + newDate.getHours() + ':' + newDate.getMinutes()
                    })
                    this.tasks.splice(i, 1);
                }
        },
    }
})


var app = new Vue({
    el: '#app'

})