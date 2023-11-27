<script lang="ts">
  export let status;
  export let handleButtonUp;
</script>

<button
  data-testid="morebutton"
  on:pointerup={handleButtonUp}
  class:initial={status.match(/initial/)}
  class:loading={status.match(/loading/)}
>
  <div class="coffee" />
  <span>More Coffee</span>
</button>

<style>
  button {
    cursor: pointer;
    appearance: none;
    display: grid;
    flex-flow: column;

    margin: 20px auto;
    padding: 20px;
    padding-bottom: 50px;

    border: 0;

    background-color: transparent;
    color: var(--coffeeDark4);

    font-size: 12px;
    text-transform: uppercase;

    justify-content: center;
  }

  button.initial {
    padding-bottom: 20px;
  }

  button:hover {
    color: var(--coffeeLight1);
  }

  button:active {
    color: var(--coffeeDark3);
  }

  button.loading {
    pointer-events: none;

    color: transparent;
  }

  button.loading span {
    opacity: 0;
  }

  .coffee {
    position: fixed;

    left: 0;
    bottom: -3vh;

    width: 100%;
    height: 3vh;

    background-image: url(./coffee.png);
    background-size: 42px auto;

    animation: flow 0.2s infinite linear;
    transition: 0.2s bottom;
  }

  .loading .coffee {
    bottom: 0;
  }

  @keyframes flow {
    0% {
      background-position: 42px 0px;
    }
    100% {
      background-position: 0px 0px;
    }
  }
</style>
