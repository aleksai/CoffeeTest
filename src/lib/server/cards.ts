import redis from "$lib/server/redis";

const getNextCardRequest = async (user) => {
  const nextCardResponse = await fetch(
    "https://random-data-api.com/api/coffee/random_coffee"
  );
  const nextCardSource = await nextCardResponse.json();

  const imageResponse = await fetch(
    "https://loremflickr.com/json/500/500/coffee,bean"
  );
  const imageSource = await imageResponse.json();

  const nextCard = { ...nextCardSource, image: imageSource.file };

  await redis.set(`${user}-card`, JSON.stringify(nextCard));

  return nextCard;
};

const getNextCardLocal = async (user) => {
  if (!user) return await getNextCardRequest(user);

  let nextCardLocal = await redis.get(`${user}-card`);
  nextCardLocal = JSON.parse(nextCardLocal);

  if (!nextCardLocal) return await getNextCardRequest(user);

  return nextCardLocal;
};

export const getNextCard = async (user, initialLoad, cleanup) => {
  const nextCard = initialLoad
    ? await getNextCardLocal(user)
    : await getNextCardRequest(user);

  if(cleanup) await redis.del(`${user}-card`);

  return nextCard;
};
