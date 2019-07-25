<template>
  <div class="terminal">
    <Glitch></Glitch>
    <div class="top-bar">
      <h1>Code Like a Pro</h1>
    </div>
    <pre v-show="cursorPosition === 'speed'" id="speed">
      <output>{{ showSpeed }}</output>
      <output class="continue">{{ continue_text }}</output>
    </pre>
    <pre v-show="cursorPosition === 'terminal' && !finished" id="code">
      <output>{{ showCode }}</output>
    </pre>
    <pre v-show="finished">
      <output>> continue? [Y/N] {{ typed }}</output>
    </pre>
  </div>
</template>
<script>
import Glitch from "./Glitch.vue";

export default {
  name: "Terminal",
  components: {
    Glitch
  },
  mounted() {
    window.addEventListener("keydown", this.keydown);
    setInterval(this.toggleCursor, this.cursorDelay);
    setInterval(this.toggleContinue, this.cursorDelay);
  },
  props: {
    code: Array
  },
  data() {
    return {
      char_index: 0,
      line_index: 0,
      supercode: 10,
      cursorDelay: 400,
      showCursor: true,
      showContinue: true,
      cursorPosition: "speed",
      typed: ""
    };
  },
  computed: {
    showCode() {
      let text = `\n> `;
      for (let i = 0; i <= this.line_index; i++) {
        if (i >= this.line_index) {
          text = text + this.code[i].substr(0, this.char_index);
        } else {
          text = text + this.code[i] + "\n> ";
        }
      }
      if (this.cursorPosition === "terminal") return text + this.cursor;
      else return text;
    },
    showSpeed() {
      // const text_before = `\nSelect your coding speed (use the keyboard arrows ← →):`;
      const text_before = `Select your coding speed (use the keyboard arrows <- ->):`;
      const text_after = ` ${Math.round(((this.supercode + 1) / 10) * 100)}%`;
      // [] if supercode is 0
      // [>] if supercode is 1
      // [====>] if supercode is 5, for example
      // [==>█] if supercode is 3 and has the cursor on it.
      let speed;
      if (this.supercode <= 0) speed = `\n[`;
      else speed = `\n[${"=".repeat(this.supercode - 1)}>`;

      if (this.cursorPosition === "speed") speed = speed + this.cursor;

      return text_before + speed + "]" + text_after;
    },
    continue_text() {
      return this.showContinue ? `Press enter to execute.` : "";
    },
    cursor() {
      // if (this.showCursor) return "█";
      if (this.showCursor) return "_";
      else return " ";
    },
    supercodeDelay() {
      return 100 / this.supercode;
    },
    finished() {
      if (
        this.line_index >= this.code.length - 1 &&
        this.char_index >= this.code[this.line_index].length
      ) {
        this.typed = "";
        return true;
      }
      return false;
    }
  },
  methods: {
    keydown(e) {
      if (e.key == "Backspace") {
        this.prevChar();
        if (this.supercode > 0) {
          this.deleteSupercode();
        }
      } else if (e.key == "Enter" && this.finished) {
        if (this.typed == "Y" || this.typed == "y") {
          this.$emit("finished");
        }
        this.selectSpeed();
        this.line_index = 0;
        this.char_index = 0;
      } else if (e.key == "ArrowUp") {
        this.selectSpeed();
      } else if (e.key == "ArrowDown") {
        this.selectCode();
      } else if (e.key == "ArrowRight" && this.cursorPosition === "speed") {
        this.supercode = Math.min(this.supercode + 1, 19);
      } else if (e.key == "ArrowLeft" && this.cursorPosition === "speed") {
        this.supercode = Math.max(this.supercode - 1, 0);
      } else if (e.key == "Enter" && this.cursorPosition === "speed") {
        this.selectCode();
      } else if (this.cursorPosition === "terminal") {
        this.nextChar();
        if (this.supercode > 0) {
          this.typeSupercode();
        }
      }
      this.typed = e.key;
    },
    nextChar() {
      if (
        this.line_index == this.code.length - 1 &&
        this.char_index == this.code[this.line_index].length
      )
        return;

      do {
        this.char_index++;
        if (this.char_index > this.code[this.line_index].length) {
          this.char_index = 0;
          this.line_index = Math.min(this.line_index + 1, this.code.length - 1);
        }
      } while (this.code[this.line_index][this.char_index] === " ");

      const el = document.getElementById("code");
      if (this.char_index * 10 > el.clientWidth)
        el.scrollLeft = this.char_index * 5;
      else el.scrollLeft = 0;

      el.scrollTop = el.scrollHeight;
    },
    prevChar() {
      if (this.line_index == 0 && this.char_index == 0) return;

      do {
        this.char_index--;
        if (this.char_index < 0) {
          this.line_index = Math.max(this.line_index - 1, 0);
          this.char_index = this.code[this.line_index].length;
        }
      } while (this.code[this.line_index][this.char_index] === " ");
      // Scroll to the bottom of the page.
      const el = document.getElementById("code");
      if (this.char_index * 10 > el.clientWidth)
        el.scrollLeft = this.char_index * 5;
      else el.scrollLeft = 0;

      el.scrollTop = el.scrollHeight;
    },
    async typeSupercode() {
      for (let i = this.supercode; i > 0; i--) {
        await new Promise(resolve => setTimeout(resolve, this.supercodeDelay));
        this.nextChar();
      }
    },
    async deleteSupercode() {
      for (let i = this.supercode; i > 0; i--) {
        await new Promise(resolve => setTimeout(resolve, this.supercodeDelay));
        this.prevChar();
      }
    },
    toggleCursor() {
      this.showCursor = !this.showCursor;
    },
    toggleContinue() {
      if (this.cursorPosition === "speed")
        this.showContinue = !this.showContinue;
      else this.showContinue = false;
    },
    selectSpeed() {
      if (this.cursorPosition !== "speed") this.cursorPosition = "speed";
    },
    selectCode() {
      if (this.cursorPosition !== "terminal") this.cursorPosition = "terminal";
    }
  }
};
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Inconsolata&display=swap");
.terminal {
  background-color: black;
  background-image: radial-gradient(rgba(0, 150, 0, 0.75), black 120%);
  height: 100vh;
  margin: 0;
  overflow: hidden;
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.3rem;
  font-family: "Inconsolata", monospace;
  text-shadow: 0 0 5px #c8c8c8;
  box-sizing: border-box;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: repeating-linear-gradient(
      0deg,
      rgba(black, 0.15),
      rgba(black, 0.15) 1px,
      transparent 1px,
      transparent 2px
    );

    pointer-events: none;
  }
  pre {
    padding: 2rem;
    margin-top: 0;
    font-family: inherit;
    display: flex;
    flex-flow: column nowrap;
    overflow: overlay;
    height: 80%;

    output {
      font-family: inherit;
      display: block;
      width: fit-content;
      min-width: 100%;

      &#speed {
        white-space: normal;
      }

      .continue {
        color: rgba(255, 255, 255, 0.438);
      }
    }
  }
  .top-bar {
    width: 100%;
    height: 80px;
    background-color: rgba(255, 255, 255, 0.9);
    color: transparent;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;

    h1 {
      margin: 0;
      color: rgba(0, 80, 0, 0.83);
    }
  }
  .overlay {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
::selection {
  background: #0080ff;
  text-shadow: none;
}
</style>
