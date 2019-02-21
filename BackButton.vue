<template>
  <q-btn
    class="bg-white border-primary-main text-primary-main btn-width"
    @click="back()">
    Back
  </q-btn>
</template>
<script>
/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';
export default {
  name: 'BackButton',
  methods: {
    back() {
      this.$emit('back');
    }
  }
};
</script>
<style lang="less" scoped>
@import 'main.less';

.text-primary-main {
  color: @br-wizard-primary;
}

.border-primary-main {
  border: 1px solid @br-wizard-primary;
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
