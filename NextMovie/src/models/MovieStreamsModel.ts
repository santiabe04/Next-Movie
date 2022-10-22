export interface MovieStreamsModel {
    id:      number;
    results: Results;
}

export interface Results {
    AD: Ad;
    AE: AE;
    AL: Al;
    AR: Al;
    AT: Al;
    AU: Al;
    BA: Al;
    BE: Al;
    BG: Al;
    BO: Ad;
    BR: Ad;
    CA: Al;
    CH: Al;
    CL: Al;
    CO: Al;
    CR: Ad;
    CV: AE;
    CZ: Al;
    DE: Al;
    DK: Al;
    DO: Ad;
    EC: Al;
    EE: Al;
    EG: AE;
    ES: Al;
    FI: Al;
    FR: Al;
    GB: Al;
    GR: Al;
    GT: Ad;
    HK: Al;
    HN: Ad;
    HR: Al;
    HU: Al;
    ID: Al;
    IE: Al;
    IN: Al;
    IS: Al;
    IT: Al;
    JP: Al;
    KR: Al;
    LI: Ad;
    LT: Al;
    LV: Al;
    MK: Al;
    MT: Al;
    MX: Al;
    MY: Al;
    NL: Al;
    NO: Al;
    NZ: Al;
    PE: Al;
    PH: Al;
    PL: Al;
    PT: Al;
    PY: Ad;
    RO: Ad;
    RS: Al;
    RU: Al;
    SA: AE;
    SE: Al;
    SG: Al;
    SI: Al;
    SK: Al;
    SM: Ad;
    TH: Al;
    TR: Al;
    TW: Al;
    US: Al;
    UY: Ad;
    VE: Al;
    ZA: Al;
}

export interface Ad {
    link:     string;
    flatrate: Flatrate[];
}

export interface Flatrate {
    logo_path:        string;
    provider_id:      number;
    provider_name:    string;
    display_priority: number;
}

export interface AE {
    link: string;
    buy:  Flatrate[];
}

export interface Al {
    link:      string;
    flatrate?: Flatrate[];
    buy:       Flatrate[];
    rent?:     Flatrate[];
    ads?:      Flatrate[];
}