<template>
  <div class="fit">
      <q-input
        v-model="name"
        label="Name" />
  </div>
</template>
<script>
/*!
  * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
  */
'use strict';

export default {
  name: 'SampleStep',
  data(){
    return {
      name: ''
    };
  }
};
</script>
<style>
</style>
