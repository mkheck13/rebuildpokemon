// Interface to house my location structure

export interface ILocalArray {
    [index: number]: ILocal;
}

export interface ILocal {
    location_area:   LocationArea;
    version_details: VersionDetail[];
}

export interface LocationArea {
    name: string;
    url:  string;
}

export interface VersionDetail {
    encounter_details: EncounterDetail[];
    max_chance:        number;
    version:           LocationArea;
}

export interface EncounterDetail {
    chance:           number;
    condition_values: LocationArea[];
    max_level:        number;
    method:           LocationArea;
    min_level:        number;
}
