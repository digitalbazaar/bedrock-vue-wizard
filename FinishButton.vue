<template>
  <q-btn @click="finish()"
    class="bg-red-main text-white btn-width">Finish</q-btn>
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
      this.$emit('finish')
    }
  }
};
</script>
<style>
</style>
