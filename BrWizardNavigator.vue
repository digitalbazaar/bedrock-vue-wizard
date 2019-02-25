<template>
  <div class="row justify-center width-100 q-mt-lg">
    <back-button
      v-if="currentStepIndex > 0"
      class="q-mr-md"
      :disabled="blockBack"
      @back="onBack()" />
    <next-button
      v-if="currentStepIndex < totalSteps - 1"
      :class="{'q-ml-md': currentStepIndex > 0}"
      :disabled="blockNext"
      @next="onNext()" />
    <finish-button
      v-if="currentStepIndex === totalSteps - 1"
      class="q-ml-md"
      :disabled="blockFinish"
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
    currentStepIndex: {
      type: Number,
      required: true
    },
    totalSteps: {
      type: Number,
      required: true
    },
  },
  methods: {
    async onNext() {
      if(!await this._emitCancelableEvent('next', {
        currentStepIndex: this.currentStepIndex
      })) {
        return;
      }
    },
    async onBack() {
      if(!await this._emitCancelableEvent('back', {
        currentStepIndex: this.currentStepIndex
      })) {
        return;
      }
    },
    async onFinish() {
      if(!await this._emitCancelableEvent('finish')) {
        return;
      }
    },
    async _emitCancelableEvent(name, event = {}) {
      try {
        let promise = Promise.resolve();
        this.$emit(name, {
          ...event,
          waitUntil: p => promise = p
        });
        await promise;
        // not canceled
        return true;
      } catch(e) {
        // canceled
        return false;
      }
    }
  }
};

</script>
<style lang="scss" scoped>
@import 'main.scss';

.width-100 {
  width: 100%;
}
</style>

