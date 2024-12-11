export const removeBadStylesFromImg = (description) => {
  return description?.replace(
    /(<img.+style=["'])[^"']+(["'].+>)/g,
    "$1width:100%$2",
  );
};

export const extractImageFromEvent = (event, useImage4 = false) => {
  if (!event) {
    return "";
  }
  let image = event.image1 || event.image2 || event.image3;
  if (useImage4) {
    image = event.image4 || image;
  }
  if (!!image && image.startsWith("/")) {
    image = `https://events.brahmakumaris.org${image}`;
  }
  return !!image ? image : "";
};

export const imageAdapter = (ev, eventsConfig, useImage4 = false) => {
  const image = extractImageFromEvent(ev, useImage4);
  if (!!image) {
    return image;
  }
  return extractRandomImage(eventsConfig);
};

export const extractRandomImage = (eventsConfig) => {
  const randomImages =
    eventsConfig.randomImages || eventsConfig.eventsConfig.randomImages;
  if (!!randomImages) {
    return randomImages[Math.floor(Math.random() * randomImages.length)];
  }
  return null;
};

export const correctImagePath = (image) => {
  if (image.startsWith("/imageupload")) {
    return "https://events.brahmakumaris.org" + image;
  }
  return image;
};
