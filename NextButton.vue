<template>
  <q-btn
    class="bg-red-main text-white btn-width"
    @click="next()">
    Next
  </q-btn>
</template>
<script>
/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

export default {
  name: 'NextButton',
  methods: {
    next() {
      this.$emit('next');
    }
  }
};
</script>
<style>
</style>
