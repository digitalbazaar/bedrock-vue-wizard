<template>
  <div class="dot fadeInBottom">
    <ul class="list">
      <li v-for="(step, index) in steps" v-bind:key="index"
        :class="{'is-active': currentStep === index + 1}"></li>
    </ul>
  </div>
</template>
<script>
/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

export default {
  name: 'StepProgress',
  props: {
    currentStep: {
      type: Number,
      required: true
    },
    steps: {
      type: Array,
      required: true
    },
  }
};
</script>
<style lang="less" scoped>
@import 'main.less';

.dot li {
  display: inline-block;
  width: 15px;
  height: 15px;
  border-radius: 100%;
  padding: 0;
  margin: 15px 5px;
  text-align: center;
  position: relative;
  background-color: @br-wizard-tertiary;
}

.dot .is-active {
  background-color: @br-wizard-primary;
}

@keyframes fadeInBottom {
  0% {
    opacity: 0;
    transform: translateY(40px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.fadeInBottom {
  animation-delay: .4s;
  animation-name: fadeInBottom;
  animation-duration: 0.7s;
  animation-fill-mode: both;
  animation-timing-function: ease-in-out;
}

/* Media Queries */
@media screen and (max-width: 767px) {
  .dot li {
    width: 12px;
    height: 12px;
  }
}
</style>
