<template>
  <div class="column items-center s-step-content">
    <div
      class="circle-bg absolute bg-white q-pa-lg"/>
    <div class="circle absolute q-pa-lg">
      <img
        v-if="image && !icon"
        :src="image"
        :class="{
          'fadeInIcon': animations.fadeInIcon,
          'fadeOutIcon': animations.fadeOutIcon
        }">
      <q-icon
        v-if="icon && !image"
        :class="{
          'fadeInIcon': animations.fadeInIcon,
          'fadeOutIcon': animations.fadeOutIcon
        }"
        :color="icon.color"
        :size="icon.size"
        :name="icon.name" />
    </div>
    <div
      class="column items-center width-450"
      :class="{
        'slideInRight': animations.slideInRight,
        'slideOutLeft': animations.slideOutLeft,
        'slideInLeft': animations.slideInLeft,
        'slideOutRight': animations.slideOutRight
      }">
      <h4
        v-if="heading"
        class="text-center q-mt-sm q-mb-sm heading">
        {{heading}}
      </h4>
      <h5
        v-if="subheading"
        class="text-center q-mt-lg q-mb-lg subheading">
        {{subheading}}
      </h5>
      <!-- custom step content -->
      <slot />
    </div>
  </div>
</template>

<script>
/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

export default {
  name: 'BrWizardStep',
  inject: {
    __wizard: {
      default() {
        console.error('BrWizardStep needs to be child of BrWizard');
      }
    }
  },
  props: {
    heading: {
      type: String,
      default: undefined
    },
    icon: {
      type: Object,
      default: undefined
    },
    image: {
      type: String,
      default: undefined
    },
    subheading: {
      type: String,
      default: undefined
    }
  },
  computed: {
    animations() {
      return this.__wizard.animations;
    }
  }
};

</script>
<style lang="scss" scoped>
@import 'main.scss';

.s-step-content {
  z-index: 1;
  position: relative;
}

.width-450 {
  max-width: 450px;
}

.circle {
  margin-top: -148px;
}

.circle-bg {
  margin-top: -148px;
  border-radius: 150px 150px 0 0;
  height: 76px;
  width: 150px;
  box-shadow: 0px -3px 5px -1px rgba(0, 0, 0, 0.2);
}

.circle img {
  width: 100px;
  height: 100px;
}

/* Media Queries */
@media screen and (max-width: 767px) {

  .circle img {
    width: 50px;
    height: 50px;
  }

  .heading {
    font-size: 28px;
  }

  .subheading {
    font-size: 24px;
  }

  .overflow-hidden {
    padding: 36px 24px 24px 24px;
  }
}

/* Animation */
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
    opacity: 0;
  }
  65% {
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
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
    opacity: 1;
  }
  35% {
    opacity: 0;
  }
  100% {
    transform: translateX(-100vw);
    opacity: 0;
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
    opacity: 0;
  }
  65% {
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
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
    opacity: 1;
  }
  35% {
    opacity: 0;
  }
  100% {
    transform: translateX(100vw);
    opacity: 0;
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
</style>
