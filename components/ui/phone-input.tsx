import { CheckIcon, ChevronsUpDown } from "lucide-react";

import * as React from "react";

import * as RPNInput from "react-phone-number-input";

import flags from "react-phone-number-input/flags";

import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Input, InputProps } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatPhoneNumberIntl } from "react-phone-number-input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { cn } from "@/lib/utils";

type PhoneInputProps = Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "value"
> &
    Omit<RPNInput.Props<typeof RPNInput.default>, "onChange"> & {
        onChange?: (value: RPNInput.Value) => void;
    };

const PhoneInput: React.ForwardRefExoticComponent<PhoneInputProps> =
    React.forwardRef<
        React.ElementRef<typeof RPNInput.default>,
        PhoneInputProps
    >(({ className, onChange, ...props }, ref) => {
        return (
            <RPNInput.default
                ref={ref}
                className={cn("flex", className)}
                flagComponent={FlagComponent}
                countrySelectComponent={CountrySelect}
                inputComponent={InputComponent}
                /**
                 * Handles the onChange event.
                 *
                 * react-phone-number-input might trigger the onChange event as undefined
                 * when a valid phone number is not entered. To prevent this,
                 * the value is coerced to an empty string.
                 *
                 * @param {E164Number | undefined} value - The entered value
                 */
                onChange={(value) =>
                    onChange?.(value || ("" as RPNInput.Value))
                }
                {...props}
            />
        );
    });
PhoneInput.displayName = "PhoneInput";

const InputComponent = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, ...props }, ref) => (
        <Input
            className={cn(
                "rounded-e-lg rounded-s-none h-[41px]  sm:h-[40px] md:h-[31px] w-full",
                className
            )}
            {...props}
            ref={ref}
        />
    )
);
InputComponent.displayName = "InputComponent";

type CountrySelectOption = { label: string; value: RPNInput.Country };

type CountrySelectProps = {
    disabled?: boolean;
    value: RPNInput.Country;
    onChange: (value: RPNInput.Country) => void;
    options: CountrySelectOption[];
};

const CountrySelect = ({
    disabled,
    value,
    onChange,
    options,
}: CountrySelectProps) => {
    const handleSelect = React.useCallback(
        (country: RPNInput.Country) => {
            onChange(country);
        },
        [onChange]
    );

    return (
        <Select disabled={disabled} value={value} onValueChange={onChange}>
            <SelectTrigger className="w-[80px] h-11 rounded-e-none rounded-s-lg">
                <SelectValue>
                    <FlagComponent country={value} countryName={value} />
                </SelectValue>
            </SelectTrigger>
            <SelectContent>
                <ScrollArea className="h-[200px]">
                    {options
                        .filter((x) => x.value)
                        .map((option) => (
                            <SelectItem
                                key={option.value}
                                value={option.value}
                                className="flex items-center gap-2"
                            >
                                <div className="flex items-center gap-2 w-full">
                                    <FlagComponent
                                        country={option.value}
                                        countryName={option.label}
                                    />
                                    <span className="flex-1 text-sm">
                                        {option.label}
                                    </span>
                                    <span className="text-sm text-foreground/50">
                                        {`+${RPNInput.getCountryCallingCode(
                                            option.value
                                        )}`}
                                    </span>
                                </div>
                            </SelectItem>
                        ))}
                </ScrollArea>
            </SelectContent>
        </Select>
    );
};

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
    const Flag = flags[country];

    return (
        <span className="flex h-4 w-6 overflow-hidden rounded-sm text-sm bg-foreground/20">
            {Flag && <Flag title={countryName} />}
        </span>
    );
};
FlagComponent.displayName = "FlagComponent";

export { PhoneInput };
