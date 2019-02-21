<template>
  <q-page
    class="column gutter-md background"
    padding>
    <div class="column items-center">
      <br-wizard
        :steps="steps"
        :block-next="blockNext"
        @back="back($event)"
        @next="next($event)"
        @submit="submit($event)"
        @index="stepIndex = $event">
        <template slot="step">
          <welcome
            v-if="steps[stepIndex].name === 'Welcome'"
            :steps="steps" />
          <domain
            v-if="steps[stepIndex].name === 'Domain'"
            ref="domain"
            :stored-data="domainData"
            @data="domainData = $event"
            @blocker="blockNext = $event" />
          <administrator
            v-if="steps[stepIndex].name === 'Administrator'"
            ref="administrator"
            :stored-data="adminData"
            @data="adminData = $event"
            @blocker="blockNext = $event" />
          <review
            v-if="steps[stepIndex].name === 'Review'"
            :domain="domainData"
            :administrator="adminData"
            @data="reviewData = $event" />
        </template>
      </br-wizard>
    </div>
  </q-page>
</template>
<script>
/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

import {BrWizard, Welcome} from 'bedrock-vue-wizard';
import Review from './Review.vue';

export default {
  name: 'Home',
  components: {BrWizard, Welcome, Review},
  data() {
    return {
      blockNext: false,
      stepIndex: 0,
      steps: [{
        name: 'Welcome',
        icon: '/images/welcome-icon.svg',
        heading: 'Welcome to the setup process for Product Name',
        subheading: 'The following steps will help you install the software:'
      }, {
        name: 'Review',
        icon: '/images/review-icon.svg',
        heading: '',
        subheading: 'Please review the information you entered and then ' +
          'complete the setup process'
      }]
    };
  },
  methods: {
    next(event) {
      console.log('next was triggered in the wizard', event);
    },
    back(event) {
      console.log('back was triggered in the wizard', event);
    },
    submit(event) {
      console.log('submit was triggered in the wizard', event);
    }
  }
};
</script>
<style>
</style>
