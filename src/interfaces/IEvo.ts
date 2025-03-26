// Interface to house my Pokemon Evolution structure

export interface IEvo {
    baby_trigger_item: null;
    chain:             Chain;
    id:                number;
}

export interface Chain {
    evolution_details: any[];
    evolves_to:        any[];
    is_baby:           boolean;
    species:           Species;
}

export interface Species {
    name: string;
    url:  string;
}