import {IPoke} from '../interfaces/IPoke';

export const GetData = async (pokemon: string | number) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`);
    const data: IPoke = await response.json();

    return data;
};