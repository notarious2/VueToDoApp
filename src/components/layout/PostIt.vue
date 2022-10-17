<template>
  <div class="post-it-note">
    <slot></slot>
  </div>
</template>

<style scoped>
.post-it-note {
  padding: 2em;
  background: #ffffe0;
  position: relative;
  min-height: 10em;
  margin-bottom: 30px;
}
.post-it-note:after {
  content: "";
  position: absolute;
  bottom: -2em;
  left: 0;
  right: 2em;
  border-width: 1em;
  border-style: solid;
  border-color: #ffffe0;
}
.post-it-note:before {
  content: "";
  position: absolute;
  bottom: -2em;
  right: 0;
  border-width: 2em 2em 0 0;
  border-style: solid;
  border-color: #dcdc46 transparent;
}
</style>
