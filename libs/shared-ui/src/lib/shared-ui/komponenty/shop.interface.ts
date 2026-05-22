export interface ShopGrid {
    id: number;
    meno_produktu: string;
    oddiel_produktu: string;
    hodnotenie: string;
    na_sklade: boolean;
    cena: number;
    popis: string;
}

export interface ShopGridResponse {
    grids: ShopGrid[]
}