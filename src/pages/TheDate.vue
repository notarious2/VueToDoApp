<template>
  <div>
    <h1>Hello</h1>

    <Datepicker
      inline
      :enableTimePicker="false"
      :value="date"
      autoApply
      @update:modelValue="handleDate"
      :dark="display"
      id="calendar2"
    />
    <button @click="toggleDisplay">Toggle Display</button>
  </div>
</template>

<script setup>
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { ref } from "vue";

const display = ref(false);
const date = ref(new Date());

const handleDate = (modelData) => {
  date.value = modelData;
  // do something else with the data
  console.log(date.value);
};

function toggleDisplay() {
  display.value = !display.value;
}
</script>

<style>
#calendar2 > div.dp__menu.dp__relative {
  flex-basis: 500px;
  align-items: center;
  justify-content: center;
  margin: 10px 50px;
  flex-grow: 1;
}
#calendar2
  > div.dp__menu.dp__relative
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

#calendar2
  > div.dp__menu.dp__relative
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
