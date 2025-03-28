// Interface to house my Pokemon Evolution structure

// export interface IEvo {
//     baby_trigger_item: null;
//     chain:             Chain;
//     id:                number;
// }

// export interface Chain {
//     evolution_details: Array<{
//         [key: string]: any;
//     }>;
//     evolves_to:        Chain[];
//     is_baby:           boolean;
//     species:           Species;
// }

// export interface Species {
//     name: string;
//     url:  string;
// }

export interface IEvo {
    baby_trigger_item: null;
    chain: Chain;
    id: number;
}

export interface Chain {
    evolution_details: EvolutionDetail[];
    evolves_to: Chain[];
    is_baby: boolean;
    species: Species;
}

export interface EvolutionDetail {
    gender: number | null;
    held_item: Item | null;
    item: Item | null;
    known_move: NamedResource | null;
    known_move_type: NamedResource | null;
    location: NamedResource | null;
    min_affection: number | null;
    min_beauty: number | null;
    min_happiness: number | null;
    min_level: number | null;
    needs_overworld_rain: boolean;
    party_species: NamedResource | null;
    party_type: NamedResource | null;
    relative_physical_stats: number | null;
    time_of_day: string;
    trade_species: NamedResource | null;
    trigger: NamedResource;
    turn_upside_down: boolean;
}

export interface Item {
    name: string;
    url: string;
}

export interface NamedResource {
    name: string;
    url: string;
}

export interface Species {
    name: string;
    url: string;
}