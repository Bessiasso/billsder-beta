export const billing_units = [
    {
        name: "Per Hour",
        description: "Billing is done on an hourly basis.",
        value: "hour",
        translate: "hour"
    },
    {
        name: "Per Day",
        description: "Billing is done on a daily basis.",
        value: "day",
        translate: "day"
    },
    {
        name: "Per Week",
        description: "Billing is done on a weekly basis.",
        value: "week",
        translate: "week"
    },
    {
        name: "Per Month",
        description: "Billing is done on a monthly basis.",
        value: "month",
        translate: "month"
    },
    {
        name: "Per Year",
        description: "Billing is done on a yearly basis.",
        value: "year",
        translate: "year"
    },
    {
        name: "Per Job",
        description: "Billing is done per job or task completed.",
        value: "per_job",
        translate: "job"
    },
    {
        name: "Flat Rate",
        description: "A fixed price for the service regardless of time or quantity.",
        value: "flat_rate",
        translate: "flat_rate"
    }
]

export const getBillingUnitDescription = (value: string) => {
        const billingUnit = billing_units.find((bu) => bu.value === value);
        return billingUnit ? billingUnit.description : "";
    }