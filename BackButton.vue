<template>
  <q-btn
    class="bg-white border-primary-main btn-width"
    :style="style"
    @click="back()">
    Back
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
  name: 'BackButton',
  computed: {
    primary() {
      return colors.getBrand('primary');
    },
    style() {
      return {
        color: this.primary,
        borderColor: this.primary
      };
    }
  },
  methods: {
    back() {
      this.$emit('back');
    }
  }
};
</script>
<style lang="scss" scoped>
@import 'main.scss';

.border-primary-main {
  border: 1px solid;
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
