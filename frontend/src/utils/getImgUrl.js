function getImgUrl (name) {
    return new URL(`../assets/movies/${name}`, import.meta.url);
}

export { getImgUrl };