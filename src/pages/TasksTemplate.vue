<template>
  <div class="grid-container">
    <header>HEADER GOES HERE</header>
    <div class="grid-item-todo">
      <h1>{{ date }}</h1>
      <draggable :list="myArray" item-key="id" @change="updateList">
        <template #item="{ element }">
          <div class="flexbox">
            <div class="flex-text">
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
              <a class="close" @click="deleteTask(element)">x</a>
              <input
                type="checkbox"
                class="check"
                :id="element.id"
                v-model="element.completed"
                @click="checkUncheck(element)"
              />
            </div>
          </div>
        </template>
      </draggable>
      <form @submit.prevent="addTask">
        <label>text </label>
        <input v-model="task" type="text" />
        <button>add task</button>
      </form>
    </div>
    <div class="grid-item-calendar">
      <h1>My Calendar</h1>
      <FullCalendar :options="calendarOptions" />
    </div>
    <footer>
      <p>FOOTER GOES HERE</p>
    </footer>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import draggable from "vuedraggable";

import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

const task = ref();

const date = ref("1/1/2022");

const editedText = ref("");

const myArray = reactive([
  { text: "AAA", id: 1, completed: true, editable: false },
  { text: "BBB", id: 2, completed: false, editable: false },
  { text: "CCC", id: 3, completed: false, editable: false },
  { text: "DDD", id: 4, completed: true, editable: false },
]);

const calendarOptions = {
  plugins: [dayGridPlugin, interactionPlugin],
  initialView: "dayGridMonth",
  dateClick: handleDateClick,
  events: [
    { title: "3 tasks", date: "2022-10-06" },
    { title: "event 2", date: "2019-04-02" },
  ],
  eventColor: "transparent",
  eventTextColor: "red",
  selectable: true,
};

// WORKING WITH CALENDAR

function handleDateClick(arg) {
  alert("date click!" + arg.dateStr);
  date.value = arg.dateStr;
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
h1 {
  text-align: center;
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
}
/* TO-DO INNER LAYOUT WITH FLEXBOX */

.flexbox {
  display: flex;
  justify-content: space-between;
}
.flex-text {
  background: lightgray;
  flex: 1;
  border: 1px solid orange;
}

.flex-buttons {
  background: lightyellow;
  flex-basis: 70px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.edit-icon {
  margin-top: 10px;
  font-size: 18px;
}

/* Make pen green if edit is selected*/

.editSelected {
  color: green;
}
</style>
