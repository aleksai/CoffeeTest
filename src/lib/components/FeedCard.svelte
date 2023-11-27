<script lang="ts">
  import { fly } from "svelte/transition";

  let notesOffset = "0px";

  export let status;
  export let card;

  const getColorForNoteIndex = (index) => {
    switch (index % 3) {
      case 0:
        return "#5E3A2A"; // --coffeeDark2
      case 1:
        return "#774936"; // --coffeeDark3
    }

    return "#8A5A44"; // --coffeeDark4
  };

  const mouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = 1 - (event.clientX - rect.x) / rect.width;
    notesOffset = `${(rect.width < 400 ? -300 : -200) * ratio + 50}px`;
  };
</script>

<div
  data-testid="card"
  class="card"
  class:initial={status.match(/initial/)}
  transition:fly={{ y: 120, duration: 1500 }}
>
  <div class="background-placeholder" />
  <div class="background" style="background-image: url({card.image});" />
  <div class="legend">
    <div class="intensifier">{card.intensifier}</div>
    <h2>{card.blend_name}</h2>
    <div class="variety">{card.variety}</div>
    <div class="origin">{card.origin}</div>
  </div>
  <div on:mousemove={mouseMove} on:pointermove={mouseMove}>
    <svg
      class="notes"
      xmlns="http://www.w3.org/2000/svg"
      xml:lang="en"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <defs>
        <path d="M10,10  q50,25 100,0 t100,0 100,0 100,0" id="wave" />
      </defs>
      <g font-size="24px" font-family="Georgia, serif" fill="midnightBlue">
        <text transform="translate(0,50)"
          ><textPath xlink:href="#wave" startOffset={notesOffset}>
            {#each card.notes.split(", ") as note, index}
              <tspan dx="12" fill={getColorForNoteIndex(index)}
                >{note}&nbsp;</tspan
              >
            {/each}
          </textPath></text
        >
      </g>
    </svg>
  </div>
</div>

<style>
  .card {
    overflow: hidden;

    margin: 10vh auto 0 auto;

    width: 50vh;
    aspect-ratio: "3:4";

    border-radius: 5vw;

    background-color: var(--coffeeLight1);

    box-shadow: rgba(157, 107, 83, 0.4) 0px 5px,
      rgba(157, 107, 83, 0.3) 0px 10px, rgba(157, 107, 83, 0.2) 0px 15px,
      rgba(157, 107, 83, 0.1) 0px 20px, rgba(157, 107, 83, 0.05) 0px 25px;
  }

  .card.initial {
    margin: 0 auto !important;
  }

  .card .background,
  .card .background-placeholder {
    flex: 1;

    height: calc(100% - 160px);

    border-radius: 5vh 5vh 0 0;

    background-size: cover;
    background-position: center;
  }

  .card .background-placeholder {
    background-image: url(./coffee-placeholder.png);
  }

  .legend h2 {
    position: absolute;

    display: block;

    padding: 6px 0;

    bottom: 100px;
    left: 0;

    width: 100%;
    height: 30px;

    text-transform: uppercase;
    background-color: var(--coffeeLight2);

    color: var(--coffeeDark1);
  }

  .legend .origin,
  .legend .intensifier,
  .legend .variety {
    position: absolute;
    display: inline;

    padding: 5px 12px 0 10px;

    top: 30px;
    left: 30px;

    height: 22px;

    font-size: 13px;

    backdrop-filter: blur(10px);
    background-color: rgba(0, 0, 0, 0.2);
    color: white;

    border-radius: 15px;

    box-sizing: content-box;
  }

  .legend .intensifier {
    top: auto;
    left: auto;
    right: 30px;
    bottom: 190px;

    font-style: italic;
  }

  .legend .variety {
    top: 60px;
  }

  .notes {
    cursor: default;
    
    position: absolute;

    bottom: 0;
    left: 0;

    width: 100%;
    height: 120px;
  }

  @media (max-width: 599px) {
    .card {
      margin: 10% auto 0 auto;

      width: 80%;

      border-radius: 10vw;
    }

    .legend h2 {
      font-size: 16px;
      padding-top: 13px;
      padding-bottom: 4px;
    }
  }
</style>
