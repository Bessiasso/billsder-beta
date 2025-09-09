"use client";

import { useEffect, useState } from "react";
import { Country, State, type IState } from "country-state-city";
import type {
    UseFormRegister,
    UseFormSetValue,
    UseFormWatch,
    FieldErrors,
    Path,
} from "react-hook-form";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface CountrySelectProps<T extends Record<string, any>> {
    register: UseFormRegister<T>;
    setValue: UseFormSetValue<T>;
    watch: UseFormWatch<T>;
    errors: FieldErrors<T>;
    countryPath: Path<T>;
    regionPath: Path<T>;
}

export function CountrySelect<T extends Record<string, any>>({
    register,
    setValue,
    watch,
    errors,
    countryPath,
    regionPath,
}: CountrySelectProps<T>) {
    const countries = Country.getAllCountries();
    const countryValue = watch(countryPath as any) as string;

    // Store a mapping of country names to ISO codes for lookup
    const [countryMap] = useState(() => {
        const map = new Map<string, string>();
        countries.forEach((country) => {
            map.set(country.name, country.isoCode);
        });
        return map;
    });

    // Register the field without rendering an input
    useEffect(() => {
        register(countryPath as any);
    }, [register, countryPath]);

    const handleValueChange = (isoCode: string) => {
        // Find the country name from the ISO code
        const country = countries.find((c) => c.isoCode === isoCode);
        if (country) {
            // Set the country name instead of ISO code
            setValue(countryPath as any, country.name as any, {
                shouldValidate: true,
            });

            // Reset the region when country changes
            setValue(regionPath as any, "" as any, { shouldValidate: true });
        }
    };

    // Find the ISO code from the country name (for the Select component value)
    const selectedIsoCode = countryValue
        ? countryMap.get(countryValue) || ""
        : "";

    return (
        <Select value={selectedIsoCode} onValueChange={handleValueChange}>
            <SelectTrigger className="text-lg h-11">
                <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {countries.map((country) => (
                        <SelectItem
                            key={country.isoCode}
                            value={country.isoCode}
                        >
                            {country.name}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}

interface RegionSelectProps<T extends Record<string, any>> {
    register: UseFormRegister<T>;
    setValue: UseFormSetValue<T>;
    watch: UseFormWatch<T>;
    errors: FieldErrors<T>;
    countryPath: Path<T>;
    regionPath: Path<T>;
}

export function RegionSelect<T extends Record<string, any>>({
    register,
    setValue,
    watch,
    errors,
    countryPath,
    regionPath,
}: RegionSelectProps<T>) {
    const [regions, setRegions] = useState<IState[]>([]);
    const [countryIsoCode, setCountryIsoCode] = useState<string>("");

    const countryValue = watch(countryPath as any) as string;
    const regionValue = watch(regionPath as any) as string;

    // Register the field without rendering an input
    useEffect(() => {
        register(regionPath as any);
    }, [register, regionPath]);

    // When country changes, update the country ISO code and regions
    useEffect(() => {
        if (countryValue) {
            // Find the country ISO code from the name
            const country = Country.getAllCountries().find(
                (c) => c.name === countryValue
            );
            if (country) {
                const isoCode = country.isoCode;
                setCountryIsoCode(isoCode);

                // Get regions for this country
                const stateList = State.getStatesOfCountry(isoCode);
                setRegions(stateList);

                // Reset selected region if it doesn't belong to the new country
                if (
                    regionValue &&
                    !stateList.some((state) => state.name === regionValue)
                ) {
                    setValue(regionPath as any, "" as any, {
                        shouldValidate: true,
                    });
                }
            }
        } else {
            setCountryIsoCode("");
            setRegions([]);
            if (regionValue) {
                setValue(regionPath as any, "" as any, {
                    shouldValidate: true,
                });
            }
        }
    }, [countryValue, regionValue, setValue, regionPath]);

    // Store a mapping of region names to ISO codes for lookup
    const [regionMap] = useState(() => {
        const map = new Map<string, string>();
        regions.forEach((region) => {
            map.set(region.name, region.isoCode);
        });
        return map;
    });

    // Update region map when regions change
    useEffect(() => {
        const map = new Map<string, string>();
        regions.forEach((region) => {
            map.set(region.name, region.isoCode);
        });
        regionMap.clear();
        regions.forEach((region) => {
            regionMap.set(region.name, region.isoCode);
        });
    }, [regions, regionMap]);

    const handleValueChange = (isoCode: string) => {
        // Find the region name from the ISO code
        const region = regions.find((r) => r.isoCode === isoCode);
        if (region) {
            // Set the region name instead of ISO code
            setValue(regionPath as any, region.name as any, {
                shouldValidate: true,
            });
        }
    };

    // Find the ISO code from the region name (for the Select component value)
    const selectedIsoCode = regionValue
        ? regions.find((r) => r.name === regionValue)?.isoCode || ""
        : "";

    return (
        <Select
            value={selectedIsoCode}
            onValueChange={handleValueChange}
            disabled={!countryIsoCode || regions.length === 0}
        >
            <SelectTrigger className="text-lg h-11">
                <SelectValue placeholder="Select region" />
            </SelectTrigger>
            <SelectContent>
                {regions.length > 0 ? (
                    <SelectGroup>
                        {regions.map((region) => (
                            <SelectItem
                                key={region.isoCode}
                                value={region.isoCode}
                            >
                                {region.name}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                ) : (
                    <div className="py-2 px-2 text-sm text-muted-foreground">
                        {countryIsoCode
                            ? "No regions available"
                            : "Select a country first"}
                    </div>
                )}
            </SelectContent>
        </Select>
    );
}
