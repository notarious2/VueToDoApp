<template>
  <div class="grid-container">
    <header>HEADER GOES HERE</header>
    <div class="grid-item-todo">
      <h1>{{ date }}</h1>
      <div v-if="!display" class="no-tasks">No Tasks to Display</div>
      <div class="flex-headers">
        <div class="header-number">#</div>
        <div class="header-text">Description</div>
        <div class="header-edit">Edit</div>
        <div class="header-delete">Del.</div>
        <div class="header-completed">Status</div>
      </div>
      <draggable :list="myArray" item-key="id" @change="updateList">
        <template #item="{ element }">
          <div class="flexbox">
            <div class="flex-id">
              <p>{{ element.id }}</p>
            </div>
            <div
              class="flex-text"
              :class="{ editSelectedBorder: element.editable }"
            >
              <p
                :contenteditable="element.editable"
                @input="editText"
                @blur="applyEditChanges(element)"
              >
                {{ element.text }}
              </p>
            </div>
            <div class="flex-buttons">
              <font-awesome-icon
                icon="fas fa-pen"
                class="edit-icon"
                :class="{ editSelected: element.editable }"
                @click="makeEditable(element)"
              />
              <font-awesome-icon
                @click="deleteTask(element)"
                icon="fas
              fa-trash"
                class="delete-icon"
              />
              <font-awesome-icon
                icon="fas fa-check"
                class="check-icon"
                :class="{ isChecked: element.completed }"
                :id="element.id"
                v-model="element.completed"
                @click="checkUncheck(element)"
              />
            </div>
          </div>
        </template>
      </draggable>
      <form class="form-control" @submit.prevent="addTask">
        <input class="task-input" v-model="task" type="text" />
        <button class="button-74">add task</button>
      </form>
    </div>
    <div class="grid-item-calendar">
      <FullCalendar
        :options="calendarOptions"
        ref="calendar"
        class="calendar"
      />
    </div>
    <footer>
      <p>FOOTER GOES HERE</p>
    </footer>
  </div>
</template>

<script setup>
import { reactive, ref, watch } from "vue";
import draggable from "vuedraggable";
import { formatDate } from "@fullcalendar/core";

import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

const today = formatDate(new Date(), {
  month: "long",
  year: "numeric",
  day: "numeric",
});

const task = ref();

const date = ref(today);
console.log(date.value);

const editedText = ref("");

const myArray = reactive([
  { text: "AAA", id: 1, completed: true, editable: false },
  { text: "BBB", id: 2, completed: false, editable: false },
  { text: "CCC", id: 3, completed: true, editable: false },
  { text: "DDD", id: 4, completed: true, editable: false },
]);

// Ref for calendar in the DOM
const calendar = ref();

// Count the number of completed tasks

const notCompletedTasks = ref(myArray.filter((ob) => !ob.completed).length);
console.log(notCompletedTasks.value);

// To display if there are tasks
const display = myArray.length > 0 ? ref(true) : ref(false);

const calendarOptions = {
  plugins: [dayGridPlugin, interactionPlugin],
  initialView: "dayGridMonth",
  dateClick: handleDateClick,
  // events: [
  //   { title: "not done: " + notCompletedTasks.value, date: "2022-10-06" },
  //   { title: "not done: 3", date: "2022-10-07" },
  // ],
  // eventColor: "transparent",
  // eventTextColor: "red",
  height: "auto",
  selectable: true,
};

// onMounted(() => {
//   let calendarApi = ref(calendar.value.getApi());
//   calendarApi.value.refetchEvents();
// });

// WATCHING TO-DO LIST TO DISPLAY/NOT DISPLAY
watch(myArray, function () {
  if (myArray.length > 0) {
    display.value = true;
  } else {
    display.value = false;
  }
});

// WATCHING TO-DO LIST TO DISPLAY # UNCOMPLETED TASKS
watch(myArray, function () {
  notCompletedTasks.value = myArray.filter((ob) => ob.completed).length;
});
// WORKING WITH CALENDAR

function handleDateClick(arg) {
  // alert("date click!" + arg.dateStr);
  date.value = formatDate(arg.date, {
    month: "long",
    year: "numeric",
    day: "numeric",
  });
}

// listen to input inside edited paragraph text
function editText(event) {
  editedText.value = event.target.innerText;
}

// Apply above changes at blur

function applyEditChanges(element) {
  if (editedText.value) {
    myArray.forEach((el, idx) => {
      if (element.id === el.id) {
        myArray[idx].text = editedText.value;
      }
    });
  }
}

// make SELECTED paragraph tag editable
function makeEditable(element) {
  myArray.forEach((el, idx) => {
    if (element.id === el.id) {
      myArray[idx].editable = !myArray[idx].editable;
    }
  });
}

function addTask() {
  myArray.push({
    text: task.value,
    id: myArray.length + 1,
    checked: false,
  });
  task.value = "";
}
// update tasks index/id on change - on drag
function updateList() {
  myArray.forEach((element, index) => {
    myArray[index].id = index + 1;
  });
}

// Checking or unchecking specific object in an array
function checkUncheck(element) {
  let index = myArray.indexOf(element);
  myArray[index].completed = !myArray[index].completed;
}

function deleteTask(element) {
  let index = myArray.indexOf(element);
  myArray.splice(index, 1);
  updateList();
}
</script>

<style scoped>
* {
  font-family: "Kalam", cursive;
}
h1 {
  text-align: center;
}

.form-control {
  margin-top: 20px;
  display: flex;
  height: 40px;
  justify-content: space-between;
}

.task-input {
  width: 80%;
  margin-left: 30px;
  margin-right: 10px;
  line-height: 25px;
  font-size: 18px;
  background-color: #fbeee0;
  border: 2px solid #422800;
}

.no-tasks {
  height: 100px;
  justify-content: center;
  display: flex;
  align-items: center;
  font-weight: bold;
}

/* GENERAL PAGE LAYOUT WITH GRIDS */
.grid-container {
  min-height: 100vh;
  display: grid;
  grid-template-areas:
    "header header"
    "todo calendar"
    "footer footer";
  grid-template-rows: 60px 1fr 60px;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

header {
  grid-area: header;
  background: skyblue;
  /* making HEADER inside of the grid flexbox */
  display: flex;
  justify-content: center;
  align-items: center;
}

.calendar {
  margin-top: 10px;
}

footer {
  grid-area: footer;
  background: lightblue;
  /* making FOOTER inside of the grid flexbox */
  display: flex;
  justify-content: center;
  align-items: center;
}

.grid-item-todo {
  grid-area: todo;
  background: lightgreen;
}
.grid-item-calendar {
  grid-area: calendar;
  background: lightsteelblue;
}

@media (max-width: 768px) {
  .grid-container {
    grid-template-columns: 1fr;
    grid-template-rows: 50px 1fr 1fr 50px;
  }
  header {
    grid-row: 1;
  }
  .grid-item-todo {
    grid-row: 2;
    grid-column: 1;
  }
  .grid-item-calendar {
    grid-row: 3;
    grid-column: 1;
  }
  footer {
    grid-row: 4/5;
  }
  .form-control {
    flex-direction: column;
    align-items: center;
  }
  .button-74 {
    width: 90px;
    flex-shrink: 0;
    margin-top: 10px;
    margin-right: 40px;
  }
}

/* TO-DO HEADINGS WITH FLEXBOX */

.flex-headers {
  display: flex;
  background-color: rgb(97, 213, 136);
  margin: 0px 10px;
  font-size: 14px;
  padding: 5px 0px;
}
.header-number {
  text-align: center;
  justify-content: center;
  align-content: center;
  align-items: center;
  flex-basis: 20px;
}
.header-text {
  flex-grow: 1;
}

.header-edit,
.header-delete {
  margin-right: 5px;
}
.header-completed {
  margin-left: 5px;
  margin-right: 5px;
}

/* TO-DO INNER LAYOUT WITH FLEXBOX */

.flexbox {
  display: flex;
  justify-content: space-between;
  margin-left: 10px;
  margin-right: 10px;
  gap: 5px;
}
.flex-text {
  background: lightgray;
  flex: 1;
}

.flex-id {
  flex-basis: 15px;
}
.flex-id p {
  font-weight: bold;
}

/* Change border of the text if edit is selected*/

.editSelectedBorder {
  border: 1px solid orange;
}
.flex-buttons {
  background: lightyellow;
  flex-basis: 70px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 5px;
}

.edit-icon {
  font-size: 18px;
}

.delete-icon:hover {
  color: #9b4848;
}

/* CHECKBOX */
.check-icon {
  margin-left: 15px;
  color: #b04b4b;
  font-size: 26px;
}

/* Make pen green if edit is selected*/

.editSelected {
  color: green;
}

.isChecked {
  color: green;
}

/* BUTTON */
.button-74 {
  background-color: #fbeee0;
  border: 2px solid #422800;
  border-radius: 25px;
  box-shadow: #422800 3px 3px 0 0;
  color: #422800;
  cursor: pointer;
  font-weight: 300;
  font-size: 16px;
  padding: 0 18px;
  line-height: 20px;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  flex: 0;
  margin-right: 15px;
  flex-basis: 100px;
}

.button-74:hover {
  background-color: #fff;
}

.button-74:active {
  box-shadow: #422800 2px 2px 0 0;
  transform: translate(2px, 2px);
}

/* @media (min-width: 768px) {
  .button-74 {
    min-width: 120px;
    padding: 0 25px;
  }
} */
</style>
