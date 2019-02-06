/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
import Vue from 'vue';
import {BrWizard} from 'bedrock-vue-wizard';

// helper function that mounts and returns the rendered text
function renderWizard(propsData) {
  const Constructor = Vue.extend(BrWizard);
  return new Constructor({propsData}).$mount();
}

describe('Wizard', () => {
  it('should check something on the rendered element', async () => {
    // TODO: specify propsData
    const vm = renderWizard({});
    should.exist(vm);
    should.exist(vm.$el);
    // TODO: $vm.el.something
  });
});
