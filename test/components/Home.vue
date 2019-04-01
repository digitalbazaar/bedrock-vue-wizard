<template>
  <q-page
    class="column q-col-gutter-md background"
    padding>
    <div class="column items-center">
      <br-wizard
        :total-steps="steps.length"
        :block-next="blockNext"
        :current-step-index="stepIndex"
        @back="back($event)"
        @next="next($event)"
        @finish="finish($event)"
        @index="stepIndex = $event">
        <br-wizard-step
          :heading="currentStep.heading"
          :image="currentStep.image"
          :icon="currentStep.icon"
          :subheading="currentStep.subheading">
          <component
            :is="currentStep.component"
            v-bind="currentStepProps" />
        </br-wizard-step>
      </br-wizard>
    </div>
  </q-page>
</template>
<script>
/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

import {BrWizard, BrWizardStep, Welcome} from 'bedrock-vue-wizard';
import Review from './Review.vue';
import SampleStep from './SampleStep.vue';

export default {
  name: 'Home',
  components: {BrWizard, BrWizardStep, Welcome, SampleStep, Review},
  data() {
    return {
      blockNext: false,
      stepIndex: 0,
      steps: [{
        name: 'Welcome',
        image: '/images/welcome-icon.svg',
        heading: 'Welcome to the setup process for Product Name',
        subheading: 'The following steps will help you install the software:',
        component: Welcome
      }, {
        name: 'Data Entry',
        icon: {
          name: 'fas fa-list',
          size: '40px',
          color: 'primary'
        },
        heading: '',
        subheading: '',
        component: SampleStep
      },{
        name: 'Review',
        icon: {
          name: 'fas fa-search',
          size: '40px',
          color: 'primary'
        },
        heading: '',
        subheading: 'Please review the information you entered and then ' +
          'complete the setup process',
        component: Review
      }]
    };
  },
  computed: {
    currentStep() {
      return this.steps[this.stepIndex];
    },
    currentStepProps() {
      if(this.currentStep.name === 'Welcome') {
        return {steps: this.steps || []};
      }
      return this.currentStep.props || {};
    }
  },
  methods: {
    next(event) {
      console.log('next was triggered in the wizard', event);
    },
    back(event) {
      console.log('back was triggered in the wizard', event);
    },
    finish(event) {
      const {waitUntil} = event;
      const p = sleep(2000);
      waitUntil(p);
      console.log('finish was triggered in the wizard', event);
    }
  }
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
</script>
<style>
</style>
