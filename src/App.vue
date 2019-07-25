<template>
  <div id="app">
    <Terminal v-if="platformSupport" :code="code.split('\n')" @finished="getNextCode()"></Terminal>
    <TerminalError v-else></TerminalError>
  </div>
</template>

<script>
import Terminal from "./components/Terminal.vue";
import TerminalError from "./components/TerminalError.vue";

import code_cpp from "!raw-loader!./assets/code/cpp.txt";
import code_js from "!raw-loader!./assets/code/js.txt";

export default {
  name: "app",
  components: {
    Terminal,
    TerminalError
  },
  data() {
    return {
      finished: false,
      codeIndex: 0,
      codeList: [code_cpp, code_js]
    };
  },
  computed: {
    platformSupport() {
      return window.innerWidth > 800;
    },
    code() {
      return this.codeList[this.codeIndex];
    }
  },
  methods: {
    getNextCode() {
      if (this.codeIndex + 1 < this.codeList.length) this.codeIndex++;
      else this.finished = true;
    }
  }
};
</script>
