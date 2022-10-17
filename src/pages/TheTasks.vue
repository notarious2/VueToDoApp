<template>
  <div class="grid-container">
    <header>HEADER GOES HERE</header>
    <div class="grid-item-todo">
      <div v-if="!display" class="no-tasks">No Tasks to Display</div>
      <div v-else>
        <h1>{{ formatDate(new Date(tasksSlice.date)) }}</h1>
        <div class="flex-headers">
          <div class="header-number">#</div>
          <div class="header-text">Description</div>
          <div class="header-edit">Edit</div>
          <div class="header-delete">Del.</div>
          <div class="header-completed">Status</div>
        </div>
      </div>
      <draggable
        :list="tasksSlice.tasks"
        item-key="task_id"
        @change="updatePriority"
      >
        <template #item="{ element }">
          <div class="flexbox">
            <div class="flex-id">
              <p>{{ element.priority }}</p>
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
      <form class="form-control" @submit.prevent="addNewTask">
        <input
          class="task-input"
          @blur="clearInvalidInput"
          @keyup="clearInvalidInput"
          v-model="enteredText"
          type="text"
        />
        <button class="button-74">add task</button>
      </form>
      <span v-if="invalidInput" class="invalid-input">Please Enter Text</span>
    </div>
    <div class="grid-item-calendar">
      <h1>{{ date }}</h1>
      <Datepicker
        inline
        :enableTimePicker="false"
        :monthChangeOnScroll="false"
        v-model="date"
        autoApply
        @update:modelValue="handleDate"
      />
      <div v-if="totalTasks" class="task-status">
        <p>
          # Tasks: <span id="total-tasks">{{ totalTasks }}</span>
        </p>
        <p>
          # Completed tasks:
          <span id="complete-tasks">{{ completedTasks }}</span>
        </p>
        <p>
          # Not completed tasks:
          <span id="uncomplete-tasks">{{ notCompletedTasks }}</span>
        </p>
      </div>
      <button @click="authStore.logout()">Logout</button>
    </div>
    <footer>
      <p>FOOTER GOES HERE</p>
    </footer>
  </div>
</template>

<script setup>
// eslint-disable-next-line
import { reactive, ref, onMounted, onUpdated, onBeforeMount } from "vue";
import draggable from "vuedraggable";

import authHeader from "@/components/services/auth-header";
import axios from "axios";

import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const date = ref(new Date().toISOString().slice(0, 10));

const invalidInput = ref(false);

const enteredText = ref("");

const editedText = ref("");

// Getting array for specific date
const tasksList = reactive([]);
const tasksSlice = ref([]);
const display = ref(false);

async function loadTasks() {
  try {
    const response = await axios.get("http://localhost:8000/task", {
      headers: authHeader(),
    });
    // working with response
    // console.log(response);
    const result = response.data;

    const newArray = reactive([]);
    result.forEach((element) => {
      if (!newArray.filter((arr) => arr["date"] === element.date).length > 0) {
        newArray.push({
          date: element.date,
          tasks: [{ ...element, editable: false }],
        });
      } else {
        const idx = newArray.findIndex((arr) => arr.date === element.date);
        newArray[idx].tasks.push({ ...element, editable: false });
      }
    });
    // tasksList.value = newArray;
    console.log("Load...");
    return newArray;
  } catch (err) {
    if (err.response.status === 401) {
      localStorage.removeItem("user");
    }
    console.log(err.response.status);
  }
}
function loadOneTask(task_date) {
  if (tasksList.value.filter((arr) => arr["date"] === task_date).length === 0) {
    // eslint-disable-next-line
    display.value = false;
    tasksSlice.value = [];
  } else {
    // console.log(tasksList.value.filter((arr) => arr["date"] === task_date)[0]);
    tasksSlice.value = tasksList.value.filter(
      (arr) => arr["date"] === task_date
    )[0];
    display.value = true;
    // SORT THE SLICE
    tasksSlice.value.tasks.sort((a, b) =>
      a.priority > b.priority ? 1 : b.priority > a.priority ? -1 : 0
    );
  }
}
// SEE IF LOGGED IN

// Count the number of tasks
const notCompletedTasks = ref(null);
const completedTasks = ref(null);
const totalTasks = ref(null);

function countTasks() {
  if ("date" in tasksSlice.value) {
    totalTasks.value = tasksSlice.value.tasks.length;
    notCompletedTasks.value = tasksSlice.value.tasks.filter(
      (ob) => !ob.completed
    ).length;
    completedTasks.value = totalTasks.value - notCompletedTasks.value;
  } else {
    totalTasks.value = null;
    completedTasks.value = null;
    notCompletedTasks.value = null;
  }
}

if (tasksSlice.value.length > 0) {
  notCompletedTasks.value = tasksSlice.value.tasks.filter(
    (ob) => !ob.completed
  ).length;
}

onMounted(async () => {
  tasksList.value = await loadTasks();
  countTasks();
  loadOneTask(date.value);

  // updateList();
});

onUpdated(() => {
  countTasks();
});

// custom function to return date in DD month-long YYYY format
function formatDate(dateInput) {
  return dateInput.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    day: "numeric",
  });
}

// clear invalid input - to be used at blur
function clearInvalidInput() {
  invalidInput.value = false;
}

// WORKING WITH CALENDAR

const handleDate = (modelData) => {
  date.value = modelData.toISOString().slice(0, 10);
  // getting new slice based on picked date
  tasksSlice.value = tasksList.filter((arr) => arr["date"] === date.value)[0];
  display.value = true;

  // creating empty array if there no tasks on picked date
  if (!tasksSlice.value) {
    tasksSlice.value = ref([]);
    display.value = false;
  }
  loadOneTask(date.value);
};

// listen to input inside edited paragraph text
function editText(event) {
  editedText.value = event.target.innerText;
}

// Apply above changes at blur
async function applyEditChanges(element) {
  // No need to send HTTP request if Text is unchanged
  if (editedText.value && editedText.value !== element.text) {
    try {
      await axios.patch(
        "http://localhost:8000/task/update/" + element.task_id,
        { text: editedText.value },
        { headers: authHeader() }
      );
      console.log("Edited!");
      // rerender ALL to-do tasks
      tasksList.value = await loadTasks();
      // get selected date's slice
      loadOneTask(date.value);
    } catch (err) {
      if (err.response.status === 401) {
        localStorage.removeItem("user");
      }
      console.log(err);
    }
  }
}

// make SELECTED paragraph tag editable
// No link with backend here - elements become uneditable after refresh
function makeEditable(element) {
  tasksSlice.value.tasks.forEach((el, idx) => {
    if (element.task_id == el.task_id) {
      tasksSlice.value.tasks[idx].editable =
        !tasksSlice.value.tasks[idx].editable;
    }
  });
}

// adding the task - Post Request

async function addNewTask() {
  console.log("Add request");
  // priority is 1 if there are not tasks on that day, else it is autoincremented
  const priority =
    "date" in tasksSlice.value ? tasksSlice.value.tasks.length + 1 : 1;
  if (enteredText.value !== "") {
    try {
      await axios.post(
        "http://localhost:8000/task",
        {
          priority: priority,
          date: date.value,
          text: enteredText.value,
          completed: false,
        },
        {
          headers: authHeader(),
        }
      );
      // rerender ALL to-do tasks
      tasksList.value = await loadTasks();
      // get selected date's slice
      loadOneTask(date.value);
      //clear input field
      enteredText.value = "";
    } catch (err) {
      if (err.response.status === 401) {
        localStorage.removeItem("user");
      }
      console.log(err);
    }
  } else {
    invalidInput.value = true;
  }
}

// update tasks index/id on change - on drag / also used for deletion
async function updatePriority() {
  // GET changed priorities FIRST
  const prioritiesList = {};
  for (const idx in tasksSlice.value.tasks) {
    if (tasksSlice.value.tasks[idx].priority !== Number(idx) + 1) {
      prioritiesList[tasksSlice.value.tasks[idx].task_id] = Number(idx) + 1;
    }
  }
  if (Object.keys(prioritiesList).length > 0) {
    const payload = {};
    payload[date.value] = prioritiesList;
    // Update MULTIPLE field with ONE PATCH Request
    try {
      await axios.patch(
        "http://localhost:8000/task/update_order",
        {
          ...payload,
        },
        {
          headers: authHeader(),
        }
      );
      console.log("Multiple Rows Update!");
    } catch (err) {
      console.log(err);
      if (err.response.status === 401) {
        localStorage.removeItem("user");
      }
    }

    tasksList.value = await loadTasks();
    loadOneTask(date.value);
  }
}

// Checking or unchecking specific object in an array
async function checkUncheck(element) {
  try {
    await axios.patch(
      "http://localhost:8000/task/update/" + element.task_id,
      { completed: element.completed ? false : true },
      { headers: authHeader() }
    );
    console.log("Completed!");
    // rerender ALL to-do tasks
    tasksList.value = await loadTasks();
    // get selected date's slice
    loadOneTask(date.value);
  } catch (err) {
    console.log(err);
    if (err.response.status === 401) {
      localStorage.removeItem("user");
    }
  }
  countTasks();
}

// Deleting specific task

async function deleteTask(element) {
  try {
    await axios.get("http://localhost:8000/task/delete/" + element.task_id, {
      headers: authHeader(),
    });

    // rerender ALL to-do tasks
    console.log("Deleted!");
    tasksList.value = await loadTasks();
    // get selected date's slice
    loadOneTask(date.value);
  } catch (err) {
    console.log(err);
    if (err.response.status === 401) {
      localStorage.removeItem("user");
    }
  }
  updatePriority();
}
</script>

<style>
/* STYLING CALENDAR */
#app
  > div
  > div.grid-item-calendar
  > div
  > div.dp__menu.dp__relative.dp__theme_light {
  background-color: transparent;
  flex-grow: 1;
  margin: 10px 10px;
}
#app
  > div
  > div.grid-item-calendar
  > div
  > div.dp__menu.dp__relative.dp__theme_light
  > div
  > div
  > div:nth-child(1)
  > div
  > div.dp__calendar
  > div
  > div
  > div.dp__calendar_header {
  width: 100%;
}
#app
  > div
  > div.grid-item-calendar
  > div
  > div.dp__menu.dp__relative.dp__theme_light
  > div
  > div
  > div:nth-child(1)
  > div
  > div.dp__calendar
  > div
  > div
  > div.dp__calendar {
  width: 100%;
}
</style>
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
  margin-bottom: 10px;
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
  font-size: 20px;
  margin-top: 40px;
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
  .form-control {
    flex-direction: column;
    align-items: center;
    margin-bottom: 60px;
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
  margin-top: 5px;
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

.invalid-input {
  color: #b04b4b;
  margin-right: 50px;
  font-weight: bold;
}
.task-status p {
  display: inline-block;
  margin-right: 20px;
}
#total-tasks {
  color: black;
  font-weight: bold;
}
#complete-tasks {
  color: #479d16;
  font-weight: bold;
}
#uncomplete-tasks {
  color: #841460;
  font-weight: bold;
}
</style>
