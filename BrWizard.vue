<template>
  <div class="column items-center width-100 q-mt-xl">
    <section
      class="column items-center width-100"
      :class="{'fadeInTop': animations.initialLoad}">
      <div class="box-width">
        <div
          class="column items-center bg-white box-width q-pa-xl
          top-spacing round-borders shadow-6 overflow-hidden">
          <div
            class="circle absolute bg-white q-pa-lg"
            style="min-width: 150px;" />
          <div>
            <slot />
            <br-wizard-navigator
              :block-back="blockBack"
              :block-finish="blockFinish"
              :block-next="blockNext"
              :current-step-index="currentStepIndex"
              :total-steps="totalSteps"
              :class="{
                'slideInRight': animations.slideInRight,
                'slideOutLeft': animations.slideOutLeft,
                'slideInLeft': animations.slideInLeft,
                'slideOutRight': animations.slideOutRight
              }"
              @back="onBack()"
              @finish="onFinish()"
              @next="onNext()" />
          </div>
        </div>
      </div>
    </section>
    <step-progress
      :current-step="currentStepIndex + 1"
      :total-steps="totalSteps" />
  </div>
</template>

<script>
/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

import BrWizardNavigator from './BrWizardNavigator.vue';
import StepProgress from './StepProgress.vue';

export default {
  name: 'BrWizard',
  components: {
    BrWizardNavigator,
    StepProgress
  },
  provide() {
    return {
      __wizard: this
    };
  },
  props: {
    totalSteps: {
      type: Number,
      required: true
    },
    blockNext: {
      type: Boolean,
      required: true
    },
    blockBack: {
      type: Boolean,
      required: true
    },
    blockFinish: {
      type: Boolean,
      required: true
    },
    currentStepIndex: {
      type: Number,
      default: 0,
      required: true
    }
  },
  data() {
    return {
      animations: {
        initialLoad: true,
        slideInRight: false,
        slideInLeft: false,
        slideOutRight: false,
        slideOutLeft: false,
        fadeInIcon: false,
        fadeOutIcon: false
      }
    };
  },
  methods: {
    async onNext() {
      if(!await this._emitCancelableEvent('next', {
        currentStepIndex: this.currentStepIndex
      })) {
        return;
      }
      this.animations.slideOutLeft = true;
      this.animations.slideInLeft = false;
      this.animations.slideInRight = false;
      this.animations.fadeOutIcon = true;
      this.animations.fadeInIcon = false;
      setTimeout(() => {
        this.$emit('index', this.currentStepIndex + 1);
        this.animations.slideOutLeft = false;
        this.animations.slideInRight = true;
        this.animations.fadeOutIcon = false;
        this.animations.fadeInIcon = true;
      }, 300);
    },
    async onBack() {
      if(!await this._emitCancelableEvent('back', {
        currentStepIndex: this.currentStepIndex
      })) {
        return;
      }
      this.animations.slideOutRight = true;
      this.animations.slideInRight = false;
      this.animations.slideInLeft = false;
      this.animations.fadeOutIcon = true;
      this.animations.fadeInIcon = false;
      setTimeout(() => {
        this.$emit('index', this.currentStepIndex - 1);
        this.animations.slideOutRight = false;
        this.animations.slideInLeft = true;
        this.animations.fadeOutIcon = false;
        this.animations.fadeInIcon = true;
      }, 300);
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

.top-spacing {
  padding-top: 72px;
}

.box-width {
  width: 100%;
  max-width: 900px;
}

.width-100 {
  width: 100%;
}

.overflow-hidden {
  overflow: hidden
}

::-webkit-scrollbar {
  display: none;
}

.circle {
  border-top-left-radius: 152px;
  border-top-right-radius: 152px;
  margin-top: -148px;
  height: 76px;
  box-shadow: 0px -3px 5px -1px rgba(0, 0, 0, 0.2);
}

.circle img {
  width: 100px;
}

/* Media Queries */
@media screen and (max-width: 767px) {

  .circle {
    margin-top: -84px;
    border-top-left-radius: 76px;
    border-top-right-radius: 76px;
    height: 38px;
    box-shadow: 0px -3px 5px -1px rgba(0, 0, 0, 0.2);
  }

  .circle img {
    width: 50px;
    height: 50px;
  }

  .overflow-hidden {
    padding: 36px 24px 24px 24px;
  }
}

/* Animation */
@keyframes fadeInTop {
  0% {
    opacity: 0;
    transform: translateY(-40px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.fadeInTop {
  animation-delay: .2s;
  animation-name: fadeInTop;
  animation-duration: 0.7s;
  animation-fill-mode: both;
  animation-timing-function: ease-in-out;
}

@keyframes fadeInRight {
  0% {
    opacity: 0;
    transform: translateX(40px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

.fadeInRight {
  animation-delay: 0s;
  animation-name: fadeInRight;
  animation-duration: 0.7s;
  animation-fill-mode: both;
  animation-timing-function: ease-in-out;
}

.clearfix:after {
  content: "";
  display: table;
  clear: both;
  background: none;
}

@keyframes slideInRight {
  0% {
    transform: translateX(100vw);
  }
  100% {
    transform: translateX(0);
  }
}

.slideInRight {
  animation-delay: 0s;
  animation-name: slideInRight;
  animation-duration: 0.3s;
  animation-fill-mode: both;
  animation-timing-function: ease-in-out;
}

@keyframes slideOutLeft {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100vw);
  }
}

.slideOutLeft {
  animation-delay: 0s;
  animation-name: slideOutLeft;
  animation-duration: 0.3s;
  animation-fill-mode: both;
  animation-timing-function: ease-in-out;
}

@keyframes slideInLeft {
  0% {
    transform: translateX(-100vw);
  }
  100% {
    transform: translateX(0);
  }
}

.slideInLeft {
  animation-delay: 0s;
  animation-name: slideInLeft;
  animation-duration: 0.3s;
  animation-fill-mode: both;
  animation-timing-function: ease-in-out;
}

@keyframes slideOutRight {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(100vw);
  }
}

.slideOutRight {
  animation-delay: 0s;
  animation-name: slideOutRight;
  animation-duration: 0.3s;
  animation-fill-mode: both;
  animation-timing-function: ease-in-out;
}
</style>
