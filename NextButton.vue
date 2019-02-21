
<template>
  <q-btn
    class="bg-primary-main text-white btn-width"
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
<style lang="less" scoped>
@import 'main.less';

.bg-primary-main {
  background-color: @br-wizard-primary;
}

.btn-width {
  width: calc(50% - 16px);
  text-transform: capitalize;
  font-size: 16px;
  font-weight: bold;
}

/* Media Queries */
@media screen and (max-width: 767px) {

  .btn-width {
    font-size: 14px;
  }
}
</style>
