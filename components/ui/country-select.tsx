"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { filterCountries } from "@/lib/helpers";
//@ts-ignore
import countryRegionData from "country-region-data/dist/data-umd";
import { useEffect, useState } from "react";
import { useController, type Control } from "react-hook-form";

export interface Region {
    name: string;
    shortCode: string;
}

export interface CountryRegion {
    countryName: string;
    countryShortCode: string;
    regions: Region[];
}

interface CountrySelectProps {
    name: string;
    control: Control<any>;
    priorityOptions?: string[];
    whitelist?: string[];
    blacklist?: string[];
    className?: string;
    placeholder?: string;
    onChangeCountryCode?: (code: string) => void;
}

function CountrySelect({
    name,
    control,
    priorityOptions = [],
    whitelist = [],
    blacklist = [],
    className,
    placeholder = "Country",
    onChangeCountryCode,
}: CountrySelectProps) {
    const [countries, setCountries] = useState<CountryRegion[]>([]);
    const { field } = useController({ name, control });

    useEffect(() => {
        setCountries(
            filterCountries(
                countryRegionData,
                priorityOptions,
                whitelist,
                blacklist
            )
        );
    }, [priorityOptions, whitelist, blacklist]);

    return (
        <Select
            onValueChange={(value) => {
                const selectedCountry = countries.find((country) => country.countryShortCode === value);
                if (selectedCountry) {
                    field.onChange(selectedCountry.countryName);
                    onChangeCountryCode?.(selectedCountry.countryShortCode);
                }
                console.log(value);
            }}
            value={countries.find((country) => country.countryName === field.value)?.countryShortCode}
        >
            <SelectTrigger className={className}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {countries.map(({ countryName, countryShortCode }) => (
                    <SelectItem key={countryShortCode} value={countryShortCode}>
                        {countryName}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}

export default CountrySelect;
