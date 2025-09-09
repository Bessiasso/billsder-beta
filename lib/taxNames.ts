export interface TaxData {
    code: string;
    name: string;
}

export const taxNames: TaxData[] = [
    { code: "TAX", name: "Tax" },
    { code: "VAT", name: "Value Added Tax (VAT)" },
    { code: "GST", name: "Goods and Services Tax (GST)" },
    { code: "TVA", name: "Taxe sur la valeur ajoutée (TVA)" },
    { code: "MWST", name: "Mehrwertsteuer (MWST)" },
    { code: "IVA", name: "Impuesto sobre el Valor Añadido (IVA)" },
    {
        code: "ICMS",
        name: "Imposto sobre Circulação de Mercadorias e Serviços (ICMS)",
    },
    { code: "PST", name: "Provincial Sales Tax (PST)" },
    { code: "HST", name: "Harmonized Sales Tax (HST)" },
    { code: "QST", name: "Quebec Sales Tax (QST)" },
    { code: "SST", name: "State Sales Tax (SST)" },
    { code: "CT", name: "Consumption Tax (CT)" },
    { code: "ST", name: "Sales Tax (ST)" },
    { code: "BTW", name: "Belasting over de Toegevoegde Waarde (BTW)" },
    { code: "MOMS", name: "Mervärdesskatt (MOMS)" },
    { code: "FPA", name: "Foros Prostithemenis Axias (FPA)" },
    { code: "KDV", name: "Katma Değer Vergisi (KDV)" },
];

export function getTaxCode(code: string): string {
    return taxNames.find((t) => t.code === code)?.code || "TAX";
}
