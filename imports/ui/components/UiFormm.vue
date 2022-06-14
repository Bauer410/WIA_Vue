<template>
    <div>
        Hi there, how are you?
        <!-- <h2>Hallo</h2> -->

<!--         {{#if inGame}}
            <p id="status">
                Status: {{status}}
            </p>
        {{else}}
            <button id="play-btn">Play</button>
        {{/if}} -->

<!--         <div>
            <div class="selectableField">
                <button type="button"id="Stein" @click="doSomething">Rock</button>
                <button type="button"id="Papier" @click="doSomething">Paper</button>
                <button type="button"id="Schere" @click="doSomething">Scissor</button>
            </div>
        </div> -->
    </div>

</template>


<script>
export default {
  name: "UiFormm",
  methods: {
    doSomething() {
        alert("Done said something");
    }
  }
};
</script>