<script lang="ts">
  import { onMount } from "svelte";

  import FeedCard from "./FeedCard.svelte";
  import FeedButton from "./FeedButton.svelte";

  let status = "initial";
  let timer;

  export let cards = [];

  const handleButtonUp = async () => {
    status = status == "initial" ? "initial-loading" : "loading";
    const response = await fetch("/api/nextcard");
    const nextCard = await response.json();
    status = "idle";

    cards = [...cards, nextCard];

    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight - 200,
        behavior: "smooth",
      });
    }, 0);

    handleTimer();
  };

  const handleTimer = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      handleButtonUp();
    }, 30000);
  };

  onMount(() => {
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        clearTimeout(timer);
      } else {
        handleTimer();
      }
    });

    handleTimer();
  });
</script>

<div class="feed" class:initial={status.match(/initial/)}>
  {#each cards as card}
    <FeedCard {card} {status} />
  {/each}

  <FeedButton {handleButtonUp} {status} />
</div>

<style>
  .feed {
    display: flex;
    flex-flow: column;

    text-align: center;
  }

  .initial {
    height: 100vh;

    justify-content: center;
  }

  @supports (-webkit-touch-callout: none) {
    .initial {
      height: -webkit-fill-available;
    }
  }
</style>
