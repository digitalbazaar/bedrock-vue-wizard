<template>
  <q-btn
    class="bg-red-main text-white btn-width"
    @click="finish()">
    Finish
  </q-btn>
</template>
<script>
/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

export default {
  name: 'FinishButton',
  methods: {
    finish() {
      this.$emit('finish');
    }
  }
};
</script>
<style>
</style>
