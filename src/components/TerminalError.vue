<template>
  <div class="terminal">
    <Glitch></Glitch>
    <div class="top-bar">
      <h1>Code Like a Pro</h1>
    </div>
    <pre id="code">
      <output>
        Sorry, your browser is not supported...
      </output>
      <output>
        Developers don't use mobiles to code :(
      </output>
      <output>
        Try opening this website in a desktop or laptop computer.
      </output>
    </pre>
  </div>
</template>
<script>
import Glitch from "./Glitch.vue";

export default {
  name: "TerminalError",
  components: {
    Glitch
  }
};
</script>
<style scoped lang="scss">
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
      white-space: normal;

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
