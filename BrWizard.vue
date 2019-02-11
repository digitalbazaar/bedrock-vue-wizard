<template>
  <div class="column items-center width-100 q-mt-xl">
    <section class="column items-center width-100"
      :class="{'fadeInTop': animations.initialLoad}">
      <div v-if="currentStep" class="box-width">
        <div class="column items-center bg-white box-width q-pa-xl
          top-spacing round-borders shadow-6 overflow-hidden">
          <div class="circle absolute bg-white q-pa-lg">
            <img
              :src="currentStep.icon"
              :class="{
                'fadeInIcon': animations.fadeInIcon,
                'fadeOutIcon': animations.fadeOutIcon
              }">
          </div>
          <div class="column items-center width-450"
            :class="{
              'slideInRight': animations.slideInRight,
              'slideOutLeft': animations.slideOutLeft,
              'slideInLeft': animations.slideInLeft,
              'slideOutRight': animations.slideOutRight
            }">
            <h4 v-if="currentStep.heading !== ''"
              class="text-center q-mt-sm q-mb-sm">
              {{currentStep.heading}}
            </h4>
            <h5 v-if="currentStep.subheading !== ''"
              class="text-center q-mt-lg q-mb-lg">
              {{currentStep.subheading}}
            </h5>

            <!-- Custom Step Slot -->
            <slot name="step"></slot>

            <div class="row justify-center width-100 q-mt-lg">
              <back-button
                v-if="currentStepIndex > 0"
                @back="onBack()"
                class="q-mr-md" />
              <next-button
                v-if="currentStepIndex < steps.length - 1"
                :class="{'q-ml-md': currentStepIndex > 0}"
                @next="onNext()"
                :disabled="blockNext" />
              <submit-button
                v-if="currentStepIndex === steps.length - 1"
                class="q-ml-md"
                @submit="onSubmit()" />
            </div>
          </div>
        </div>
      </div>
    </section>
    <step-progress :currentStep="currentStepIndex + 1" :steps="steps" />
  </div>
</template>

<script>
/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

import StepProgress from './StepProgress.vue';
import NextButton from './NextButton.vue';
import BackButton from './BackButton.vue';
import SubmitButton from './SubmitButton.vue';

export default {
  name: 'BrWizard',
  components: {StepProgress, NextButton, BackButton, SubmitButton},
  mounted() {
    this.currentStep = this.steps[this.currentStepIndex];
  },
  props: {
    steps: {
      type: Array,
      required: true
    },
    blockNext: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      currentStepIndex: 0,
      currentStep: null,
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
        currentStep: this.currentStep,
        currentStepIndex: this.currentStepIndex
      })) {
        console.log('next was canceled!');
        return;
      }
      console.log('next is ok!');
      this.animations.slideOutLeft = true;
      this.animations.slideInLeft = false;
      this.animations.slideInRight = false;
      this.animations.fadeOutIcon = true;
      this.animations.fadeInIcon = false;
      setTimeout(() => {
        this.currentStepIndex++;
        this.$emit('index', this.currentStepIndex);
        this.currentStep = this.steps[this.currentStepIndex];
        this.animations.slideOutLeft = false;
        this.animations.slideInRight = true;
        this.animations.fadeOutIcon = false;
        this.animations.fadeInIcon = true;
      }, 300);
    },
    async onBack() {
      if(!await this._emitCancelableEvent('back', {
        currentStep: this.currentStep,
        currentStepIndex: this.currentStepIndex
      })) {
        console.log('back was canceled!');
        return;
      }
      console.log('back is ok!');
      this.animations.slideOutRight = true;
      this.animations.slideInRight = false;
      this.animations.slideInLeft = false;
      this.animations.fadeOutIcon = true;
      this.animations.fadeInIcon = false;
      setTimeout(() => {
        this.currentStepIndex--;
        this.$emit('index', this.currentStepIndex);
        this.currentStep = this.steps[this.currentStepIndex];
        this.animations.slideOutRight = false;
        this.animations.slideInLeft = true;
        this.animations.fadeOutIcon = false;
        this.animations.fadeInIcon = true;
      }, 300);
    },
    async onSubmit() {
      if(!await this._emitCancelableEvent('submit')) {
        console.log('submit was canceled!');
        return;
      }
      console.log('submit is ok!');
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
<style lang="less" scoped>
@import 'main.less';

/* FIXME: remove background? */
.background {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="603.237" viewBox="0 0 1920 603.237"><g id="Group_14" data-name="Group 14" transform="translate(0 -71)"><path id="Path_3" data-name="Path 3" d="M1920,674.237,0,320.263V71H1920Z" fill="@{br-wizard-tertiary}"/><path id="Path_2" data-name="Path 2" d="M0,674.237,1920,320.263V71H0Z" fill="@{br-wizard-secondary}"/></g></svg>');
  background-repeat: no-repeat;
  background-position: center top;
  background-attachment: fixed;
}

.top-spacing {
  padding-top: 72px;
}

.list {
  list-style-type: none;
  padding-left: 0;
}

.btn-width {
  width: calc(50% - 16px);
  text-transform: capitalize;
  font-size: 16px;
  font-weight: bold;
}

.box-width {
  width: 100%;
  max-width: 900px;
}

.width-100 {
  width: 100%;
}

.width-450 {
  max-width: 450px;
}

.bg-red-main {
  background-color: @br-wizard-primary;
}

.text-red-main {
  color: @br-wizard-primary;
}

.border-red-main {
  border: 1px solid @br-wizard-primary;
}

.q-mb-xxl {
  margin-bottom: 122px;
}

.small-text {
  font-size: 14px;
}

.circle {
  border-radius: 50%;
  margin-top: -148px;
}

.circle img {
  width: 100px;
  height: 100px;
}

.overflow-hidden {
  overflow: hidden
}

.overflow {
  overflow-x: scroll;
}

::-webkit-scrollbar {
  display: none;
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

@keyframes fadeOutIcon {
  0% {
      opacity: 1;
  }
  100% {
      opacity: 0;
  }
}

.fadeOutIcon {
  animation-delay: 0;
  animation-name: fadeOutIcon;
  animation-duration: 0.3s;
  animation-fill-mode: both;
  animation-timing-function: ease-in-out;
}

@keyframes fadeInIcon {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.fadeInIcon {
  animation-delay: 0;
  animation-name: fadeInIcon;
  animation-duration: 0.3s;
  animation-fill-mode: both;
  animation-timing-function: ease-in-out;
}

/* Media Queries */
@media screen and (max-width: 767px) {
  h5 {
    font-size: 18px;
  }

  .btn-width {
    font-size: 14px;
  }

  .circle {
    margin-top: -87px;
  }

  .circle img {
    width: 50px;
    height: 50px;
  }

  .overflow-hidden {
    padding: 36px 24px 24px 24px;
  }
}
</style>
