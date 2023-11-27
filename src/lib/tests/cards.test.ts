import { describe, it, expect } from "vitest";
import { getNextCard } from "$lib/server/cards";

let dynamicCard;

describe("Cards", () => {
  it("should be a valid card on page load", async () => {
    const card = await getNextCard("test", true);

    expect(card.blend_name).toBeTypeOf("string");
    expect(card.image).toBeTypeOf("string");
    expect(card.image).toMatch(/\.jpg$/);
  });

  it("should be a valid card on dynamic load", async () => {
    const card = await getNextCard("test");

    expect(card.blend_name).toBeTypeOf("string");
    expect(card.image).toBeTypeOf("string");
    expect(card.image).toMatch(/\.jpg$/);

    dynamicCard = card;
  });

  it("should be the same card on next page load", async () => {
    const card = await getNextCard("test", true, true);

    expect(card.blend_name).toEqual(dynamicCard.blend_name);
    expect(card.image).toEqual(dynamicCard.image);
  });

  it("shouldn't be the same card on page load after clean up", async () => {
    const card = await getNextCard("test", true, true);

    expect(card.blend_name).not.toEqual(dynamicCard.blend_name);
    expect(card.image).not.toEqual(dynamicCard.image);
  });
});
