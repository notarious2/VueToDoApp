<template>
  <div class="container">
    <div id="calendario">
      <h1>My Calendar</h1>
      <FullCalendar :options="calendarOptions" />
    </div>
    <h1>{{ date }}</h1>
    <draggable :list="myArray" item-key="id" @change="updateList">
      <template #item="{ element }">
        <div class="list-item">
          <div class="checkbox">
            <p
              :contenteditable="element.editable"
              class="text"
              @input="editText"
              @blur="applyEditChanges(element)"
            >
              {{ element.text }}
            </p>
            <input
              type="checkbox"
              class="check"
              :id="element.id"
              v-model="element.completed"
              @click="checkUncheck(element)"
            />
            <label :for="element.id" class="label">
              <!-- TO-DO TEXT -->
              <svg viewBox="0 0 100 100" height="50" width="50">
                <rect
                  x="30"
                  y="20"
                  width="50"
                  height="50"
                  stroke="black"
                  fill="none"
                />
                <g transform="translate(0,-952.36216)" id="layer1">
                  <path
                    id="path4146"
                    d="m 55,978 c -73,19 46,71 15,2 C 60,959 13,966 30,1007 c 12,30 61,13 46,-23"
                    fill="none"
                    stroke="black"
                    stroke-width="4"
                    class="path1"
                  />
                </g>
              </svg>
              <!-- DELETE BUTTON IF TASK IS COMPLETED -->
            </label>

            <a
              class="close"
              @click="deleteTask(element)"
              v-if="element.completed === true"
            ></a>
            <font-awesome-icon
              icon="fas fa-pen"
              class="edit-icon"
              :class="{ editSelected: element.editable }"
              v-else
              @click="makeEditable(element)"
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
  <div>HELLO WORLD</div>
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

.edit-icon {
  margin-top: 10px;
  font-size: 18px;
}

/* Make pen green if edit is selected*/

.editSelected {
  color: green;
}

.checkbox {
  display: inline-flex;
}

.text {
  padding-left: 0px;
}

/* .label {
  display: flex;
} */

.container {
  background-color: beige;
  width: 50%;
}

.list-item {
  background-color: blanchedalmond;
  padding: 2px 2px;
  margin: 2px 2px;
  width: 80%;
  position: relative;
}
/* 
.list-item p {
  position: fixed;
  left: 22px;
} */

/* CHECKBOX RELATED STYLING */
/* .checkbox:not(:last-child) {
  border-bottom: 2px solid white;
} */
.check {
  /* width: 50px;
  height: 50px; */
  position: relative;
  opacity: 0;
}

.path1 {
  stroke-dasharray: 400;
  stroke-dashoffset: 400;
  transition: 0.5s all;
}

.check:checked + label svg g path {
  stroke-dashoffset: 0;
}

/* CLOSE BUTTON */
.close {
  position: relative;
  opacity: 0.4;
  top: 10px;
  /* float: right; */
}
.close:hover {
  opacity: 1;
}
.close:before,
.close:after {
  position: absolute;
  left: 15px;
  content: " ";
  height: 22px;
  width: 3px;
  background-color: #333;
}
.close:before {
  transform: rotate(45deg);
}
.close:after {
  transform: rotate(-45deg);
}
</style>
