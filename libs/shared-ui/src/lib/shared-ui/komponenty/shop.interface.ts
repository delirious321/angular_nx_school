export interface ShopGrid {
    meno_produktu: string;
    oddiel_produktu: string;
    hodnotenie: string;
    na_sklade: string;
    cena: string;
}

export interface ShopGridResponse {
    grids: ShopGrid[]
}