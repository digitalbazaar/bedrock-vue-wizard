<template>
  <q-btn
    class="text-weight-bold text-capitalize text-white btn-width"
    :style="style"
    @click="finish()">
    Finish
  </q-btn>
</template>
<script>
/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

import {utils} from 'quasar';
const {colors} = utils;

export default {
  name: 'FinishButton',
  computed: {
    primary() {
      return colors.getBrand('primary');
    },
    style() {
      return {
        backgroundColor: this.primary
      };
    }
  },
  methods: {
    finish() {
      this.$emit('finish');
    }
  }
};
</script>
<style lang="scss" scoped>
@import 'main.scss';

.btn-width {
  width: calc(50% - 16px);
  font-size: 16px;
}

/* Media Queries */
@media screen and (max-width: 767px) {

  .btn-width {
    font-size: 14px;
  }
}
</style>
