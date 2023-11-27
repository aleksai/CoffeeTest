import preprocess from "svelte-preprocess";

const config = {
  preprocess: [
    preprocess({
      postcss: true,
    }),
  ],
  kit: {},
  prerender: {
    default: true,
  },
};

export default config;
