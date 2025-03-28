const saveToLocalStorage = (pokemon: string) => {
    if (typeof window === 'undefined') return;
    const favorites = getLocalStorage();
    if(!favorites.includes(pokemon)){
        favorites.push(pokemon);
    }
    localStorage.setItem("Favorites", JSON.stringify(favorites));
};
const getLocalStorage = () => {
    if (typeof window === 'undefined') return [];
    const localStorageData = localStorage.getItem("Favorites");
    if(localStorageData == null){
        return [];
    }
    return JSON.parse(localStorageData);
};
const removeFromLocalStorage = (pokemon: string) => {
    if (typeof window === 'undefined') return;
    const favorites = getLocalStorage();
    const namedIndex = favorites.indexOf(pokemon);
    favorites.splice(namedIndex, 1);
    localStorage.setItem("Favorites", JSON.stringify(favorites));
};

export { saveToLocalStorage, getLocalStorage, removeFromLocalStorage };