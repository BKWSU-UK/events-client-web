export const correctImagePath = (image) => {
    if(image.startsWith("/imageupload")) {
        return "https://events.brahmakumaris.org" + image
    }
    return image
}