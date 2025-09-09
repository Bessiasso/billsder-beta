"use client";

import * as React from "react";
import type { E164Number } from "libphonenumber-js/core";
import { parsePhoneNumber, type CountryCode } from "libphonenumber-js";
import { cn } from "@/lib/utils";
import { COUNTRIES, findCountryByCode, type Country } from "@/lib/countries";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export interface PhoneInputProps
    extends Omit<
        React.InputHTMLAttributes<HTMLInputElement>,
        "onChange" | "value"
    > {
    value?: string;
    onChange?: (value: string, formattedNumber?: E164Number) => void;
    onFormattedNumberChange?: (formattedNumber?: E164Number) => void;
    name?: string;
    defaultCountry?: CountryCode;
    showValidation?: boolean;
}

export interface PhoneInputRef {
    getFormattedNumber: () => E164Number | undefined;
    isValid: () => boolean;
    focus: () => void;
    getSelectedCountry: () => Country | undefined;
}

// Memoized Flag component
const FlagComponent = React.memo(({ country }: { country: Country }) => {
    return (
        <div className="w-6 h-4 flex items-center justify-center overflow-hidden rounded-sm">
            <img
                src={country.flag || "/placeholder.svg"}
                alt={`${country.name} flag`}
                className="w-full h-auto object-cover"
                loading="lazy"
            />
        </div>
    );
});

FlagComponent.displayName = "FlagComponent";

// Memoized SelectItem to prevent re-renders
const CountrySelectItem = React.memo(({ country }: { country: Country }) => (
    <SelectItem key={country.code} value={country.code}>
        <div className="flex items-center gap-2">
            <FlagComponent country={country} />
            <span className="text-sm">{country.callingCode}</span>
            <span className="text-xs text-muted-foreground truncate max-w-[120px]">
                {country.name}
            </span>
        </div>
    </SelectItem>
));

CountrySelectItem.displayName = "CountrySelectItem";

const PhoneInput = React.forwardRef<PhoneInputRef, PhoneInputProps>(
    (
        {
            className,
            onChange,
            onFormattedNumberChange,
            value = "",
            defaultCountry = "CI" as CountryCode,
            name,
            showValidation = false,
            ...props
        },
        ref
    ) => {
        // Use refs instead of state for values that don't affect rendering
        const inputRef = React.useRef<HTMLInputElement>(null);
        const isValidRef = React.useRef(false);
        const formattedNumberRef = React.useRef<E164Number | undefined>(
            undefined
        );
        const validationTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

        // State that affects rendering
        const [selectedCountryCode, setSelectedCountryCode] =
            React.useState<CountryCode>(defaultCountry);
        const [inputValue, setInputValue] = React.useState<string>(value);
        const [showValidationState, setShowValidationState] =
            React.useState(false);

        // Get selected country data
        const selectedCountry = React.useMemo(() => {
            return findCountryByCode(selectedCountryCode);
        }, [selectedCountryCode]);

        // Get country calling code (without the +)
        const countryCallingCode =
            selectedCountry?.callingCode.replace("+", "") || "";

        // Format number without triggering re-renders
        const formatNumber = React.useCallback(
            (value: string, callingCode: string): E164Number | undefined => {
                if (!value || !callingCode) return undefined;

                try {
                    const fullNumber = `+${callingCode}${value}`;
                    const phoneNumber = parsePhoneNumber(fullNumber);
                    return phoneNumber?.isValid()
                        ? (phoneNumber.number as E164Number)
                        : undefined;
                } catch {
                    return undefined;
                }
            },
            []
        );

        // Debounced validation to prevent performance issues
        const debouncedValidate = React.useCallback(
            (value: string, callingCode: string) => {
                if (validationTimeoutRef.current) {
                    clearTimeout(validationTimeoutRef.current);
                }

                validationTimeoutRef.current = setTimeout(() => {
                    const formatted = formatNumber(value, callingCode);
                    const isValid = !!formatted;

                    formattedNumberRef.current = formatted;
                    isValidRef.current = isValid;

                    if (showValidation && value) {
                        setShowValidationState(true);
                    }

                    onFormattedNumberChange?.(formatted);
                }, 300); // Debounce validation by 300ms
            },
            [formatNumber, onFormattedNumberChange, showValidation]
        );

        // Initialize from external value - only run when value prop changes
        React.useEffect(() => {
            if (value !== inputValue) {
                setInputValue(value);
                debouncedValidate(value, countryCallingCode);
            }
        }, [value]); // Intentionally not including all dependencies

        // Handle input changes with optimized event handling
        const handleInputChange = React.useCallback(
            (e: React.ChangeEvent<HTMLInputElement>) => {
                const newValue = e.target.value.replace(/\D/g, ""); // Only allow digits
                setInputValue(newValue);

                // Format and validate in the background
                debouncedValidate(newValue, countryCallingCode);

                // Call onChange with just the input value
                onChange?.(newValue, formattedNumberRef.current);
            },
            [onChange, countryCallingCode, debouncedValidate]
        );

        // Handle country changes with optimized event handling
        const handleCountryChange = React.useCallback(
            (newCountryCode: string) => {
                if (!newCountryCode) return;

                const newCountry = findCountryByCode(newCountryCode);
                if (!newCountry) return;

                setSelectedCountryCode(newCountryCode as CountryCode);

                // Format and validate in the background
                const newCallingCode = newCountry.callingCode.replace("+", "");
                debouncedValidate(inputValue, newCallingCode);

                // Call onChange with current input value
                onChange?.(inputValue, formattedNumberRef.current);
            },
            [inputValue, onChange, debouncedValidate]
        );

        // Expose methods through ref without triggering re-renders
        React.useImperativeHandle(
            ref,
            () => ({
                getFormattedNumber: () => formattedNumberRef.current,
                isValid: () => isValidRef.current,
                focus: () => inputRef.current?.focus(),
                getSelectedCountry: () => selectedCountry,
            }),
            [selectedCountry]
        );

        // Memoize the country selector trigger content
        const countryTriggerContent = React.useMemo(() => {
            if (!selectedCountry) return null;

            return (
                <div className="flex items-center gap-2">
                    <FlagComponent country={selectedCountry} />
                    <span className="text-sm">
                        {selectedCountry.callingCode}
                    </span>
                </div>
            );
        }, [selectedCountry]);

        // Memoize the validation indicator
        const validationIndicator = React.useMemo(() => {
            if (!showValidationState || !inputValue) return null;

            return isValidRef.current ? (
                <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                    <svg
                        className="w-2 h-2 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
            ) : (
                <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center">
                    <svg
                        className="w-2 h-2 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
            );
        }, [showValidationState, inputValue]);

        return (
            <div className={cn("phone-input-container", className)}>
                <div className="flex">
                    <div className="mr-0">
                        <Select
                            value={selectedCountryCode}
                            onValueChange={handleCountryChange}
                        >
                            <SelectTrigger className="w-[140px] rounded-l-2xl rounded-r-none border-r-0 h-10 focus:z-10">
                                <SelectValue placeholder="Country">
                                    {countryTriggerContent}
                                </SelectValue>
                            </SelectTrigger>
                            <SelectContent className="max-h-[300px]">
                                {COUNTRIES.map((country) => (
                                    <CountrySelectItem
                                        key={country.code}
                                        country={country}
                                    />
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="relative flex-1">
                        <input
                            ref={inputRef}
                            type="tel"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            className={cn(
                                "flex h-10 w-full rounded-r-2xl rounded-l-none border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 focus:z-10",
                                showValidationState &&
                                    inputValue &&
                                    (isValidRef.current
                                        ? "border-green-500"
                                        : "border-red-500")
                            )}
                            value={inputValue}
                            onChange={handleInputChange}
                            placeholder="Enter phone number"
                            name={name}
                            aria-invalid={
                                showValidationState && inputValue
                                    ? !isValidRef.current
                                    : props["aria-invalid"]
                            }
                            {...props}
                        />

                        {showValidation && (
                            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                                {validationIndicator}
                            </div>
                        )}
                    </div>
                </div>

                {showValidationState && inputValue && !isValidRef.current && (
                    <p className="text-xs text-red-500 mt-1">
                        Please enter a valid phone number
                    </p>
                )}
            </div>
        );
    }
);

PhoneInput.displayName = "PhoneInput";

export { PhoneInput };
