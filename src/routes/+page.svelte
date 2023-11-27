<script lang="ts">
  import Feed from "$lib/components/Feed.svelte";

  export let data;
</script>

<svelte:head>
  <style>
    :root {
      --coffeeDark1: #452a1f;
      --coffeeDark2: #5e3a2a;
      --coffeeDark3: #774936;
      --coffeeDark4: #8a5a44;
      --coffeeLight1: #9d6b53;
      --coffeeLight2: #b07d62;
      --coffeeLight3: #edc4b3;
    }

    body {
      margin: 0;

      font-family: Tahoma, sans-serif;

      background-color: var(--coffeeLight3);
    }
  </style>
</svelte:head>

<Feed cards={data.cards} />
