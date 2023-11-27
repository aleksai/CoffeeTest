import { json } from "@sveltejs/kit";
import * as serverCards from "$lib/server/cards";
import { getUser } from "$lib/server/cookies";

export async function GET({ cookies }) {
  return json(await serverCards.getNextCard(getUser(cookies, true)));
}
