<template>
  <div class="row justify-center width-100 q-mt-lg s-buttons">
    <back-button
      v-if="currentStepIndex > 0"
      class="q-mr-md"
      :disabled="disableBack"
      @back="onBack()" />
    <next-button
      v-if="currentStepIndex < totalSteps - 1"
      :class="{'q-ml-md': currentStepIndex > 0}"
      :disabled="disableNext"
      @next="onNext()" />
    <finish-button
      v-if="currentStepIndex === totalSteps - 1"
      class="q-ml-md"
      :disabled="disableFinish"
      @finish="onFinish()" />
  </div>
</template>

<script>
/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

import NextButton from './NextButton.vue';
import BackButton from './BackButton.vue';
import FinishButton from './FinishButton.vue';

export default {
  name: 'BrWizardNavigator',
  components: {NextButton, BackButton, FinishButton},
  props: {
    blockBack: {
      type: Boolean,
      required: true
    },
    blockFinish: {
      type: Boolean,
      required: true
    },
    blockNext: {
      type: Boolean,
      required: true
    },
    disableNavigation: {
      type: Boolean,
      default: false
    },
    currentStepIndex: {
      type: Number,
      required: true
    },
    totalSteps: {
      type: Number,
      required: true
    },
  },
  data() {
    return {
      loadingBack: false,
      loadingFinish: false,
      loadingNext: false
    };
  },
  computed: {
    disableBack() {
      return this.blockBack || this.disableNavigation;
    },
    disableFinish() {
      return this.blockFinish || this.disableNavigation;
    },
    disableNext() {
      return this.blockNext || this.disableNavigation;
    }
  },
  methods: {
    async onNext() {
      this.$emit('next');
    },
    async onBack() {
      this.$emit('back');
    },
    async onFinish() {
      this.$emit('finish');
    }
  }
};

</script>
<style lang="scss" scoped>
@import 'main.scss';

.s-buttons {
  z-index: 0;
  position: relative;
}

.width-100 {
  width: 100%;
}

/* Media Queries */
@media screen and (max-width: 767px) {
  .s-buttons {
    margin-top: 0;
  }
}
</style>

