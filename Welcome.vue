<template>
  <div class="row justify-center">
    <ul class="list q-mb-none q-mt-non q-pl-none">
      <h5
        v-for="(step, index) in steps.slice(1)"
        :key="index"
        class="q-mt-xs q-mb-xs">
        {{index + 1}}. {{step.name}}
      </h5>
    </ul>
  </div>
</template>
<script>
/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

export default {
  name: 'Welcome',
  props: {
    steps: {
      type: Array,
      required: true
    }
  }
};
</script>
<style scoped>
  @media screen and (max-width: 767px) {
    h5 {
      font-size: 18px;
    }
  }
</style>
