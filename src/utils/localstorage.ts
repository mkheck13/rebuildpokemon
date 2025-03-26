const saveToLocalStorage = (pokemon: string) => {
    let favorites = getLocalStorage();
    if(!favorites.includes(pokemon)){
        favorites.push(pokemon);
    }
    localStorage.setItem("Favorites", JSON.stringify(favorites));
};
const getLocalStorage = () => {
    let localStorageData = localStorage.getItem("Favorites");
    if(localStorageData == null){
        return [];
    }
    return JSON.parse(localStorageData);
};
const removeFromLocalStorage = (pokemon: string) => {
    let favorites = getLocalStorage();
    let namedIndex = favorites.indexOf(pokemon);
    favorites.splice(namedIndex, 1);
    localStorage.setItem("Favorites", JSON.stringify(favorites));
};

export { saveToLocalStorage, getLocalStorage, removeFromLocalStorage };