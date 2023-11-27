import type { PageLoad } from "./$types";
import * as serverCards from "$lib/server/cards";
import { getUser } from "$lib/server/cookies";

export const load: PageLoad = async ({ cookies }) => {
  return {
    cards: [await serverCards.getNextCard(getUser(cookies), true)],
  };
};
