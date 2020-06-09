export const extractFromLocationQuery = (param) => {
    const url = new URL(window.location.href);
    return url.searchParams.get(param);
};

export const openInNewTab = (url) => {
    const win = window.open(url, '_blank');
    win.focus();
};