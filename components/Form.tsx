import { motion } from "framer-motion";
import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { div } from "framer-motion/client";

const Form = () => {
    const t = useTranslations("Form");
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [confirmationSubmitted, setConfirmationSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        console.log(formData);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const { firstName, lastName, email } = formData;
        const htmlTagsRegex = /<[^>]*>/g;
        if (!firstName || !lastName || !email) {
            toast(t("fill_all_fields"));
            return;
        }
        if (
            htmlTagsRegex.test(firstName) ||
            htmlTagsRegex.test(lastName) ||
            htmlTagsRegex.test(email)
        ) {
            toast(t("no_html"));
            return;
        }

        try {
            const filteredData = {
                firstName: firstName.replace(htmlTagsRegex, ""),
                lastName: lastName.replace(htmlTagsRegex, ""),
                email: email.replace(htmlTagsRegex, ""),
            };

            const response = await fetch("/api/send", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(filteredData),
            });

            if (response.ok) {
                const { success, error } = await response.json();

                if (success) {
                    toast(t("email_sent"));
                    setFormData({
                        firstName: "",
                        lastName: "",
                        email: "",
                    });
                    sendConfirmationEmail(filteredData);
                    addBetaTester(filteredData);
                    setFormSubmitted(true);
                } else {
                    console.error(error);
                    toast(t("email_error"));
                }
            }
        } catch (error) {
            console.error(error);
            toast(t("email_error"));
        }
    };

    const sendConfirmationEmail = async (filteredData: any) => {
        try {
            const response = await fetch("/api/confirmation", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(filteredData),
            });

            if (response.ok) {
                const { success, error } = await response.json();

                if (success) {
                    setConfirmationSubmitted(true);
                } else if (error) {
                    console.error(error);
                } else {
                    console.error("Error sending confirmation email");
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    const addBetaTester = async (filteredData: any) => {
        try {
            const response = await fetch("/api/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstName: filteredData.firstName,
                    lastName: filteredData.lastName,
                    email: filteredData.email,
                }),
            });

            if (response.ok) {
                const { success, error } = await response.json();

                if (success) {
                    setFormData({
                        firstName: "",
                        lastName: "",
                        email: "",
                    });
                } else {
                    console.error(error);
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
        },
    };
    return (
        <div>
            {!formSubmitted ? (
                <motion.form
                    onSubmit={handleSubmit}
                    className="space-y-6 md:space-y-8 h-auto"
                    variants={containerVariants}
                >
                    <h3 className="text-4xl md:text-5xl font-bold mb-10 text-center bg-gradient-to-r from-[#d7f6e5] via-[#a8e6cf] to-[#79d4bd] text-transparent bg-clip-text">
                        {t("title")}
                    </h3>
                    <motion.div variants={itemVariants}>
                        <Label
                            htmlFor="firstName"
                            className="text-base md:text-lg font-medium text-[#d7f6e5]"
                        >
                            {t("first_name")}
                        </Label>
                        <Input
                            id="firstName"
                            name="firstName"
                            required
                            className="mt-2 bg-white/20 border-0 text-white text-base md:text-lg py-4 md:py-6"
                            placeholder="John"
                            onChange={handleInputChange}
                        />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <Label
                            htmlFor="lastName"
                            className="text-base md:text-lg font-medium text-[#d7f6e5]"
                        >
                            {t("last_name")}
                        </Label>
                        <Input
                            id="lastName"
                            name="lastName"
                            required
                            className="mt-2 bg-white/20 border-0 text-white  text-base md:text-lg py-4 md:py-6"
                            placeholder="Doe"
                            onChange={handleInputChange}
                        />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <Label
                            htmlFor="email"
                            className="text-base md:text-lg font-medium text-[#d7f6e5]"
                        >
                            {t("email")}
                        </Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className="mt-2 bg-white/20 border-0 text-white text-base md:text-lg py-4 md:py-6"
                            placeholder="john@example.com"
                            onChange={handleInputChange}
                        />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <Button
                            type="submit"
                            className="w-full bg-[#00b37d] hover:bg-[#d7f6e5] text-white hover:text-[#54489e] transition-all duration-300 ease-in-out text-lg md:text-xl py-6 md:py-8"
                        >
                            {t("join")}
                            <ArrowRight className="ml-2 h-5 w-5 md:h-6 md:w-6" />
                        </Button>
                    </motion.div>
                </motion.form>
            ) : (
                <motion.div
                    className="text-center p-6 md:p-8 h-[320px]"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <CheckCircle className="h-12 w-12 md:h-16 md:w-16 text-[#00b37d] mx-auto mb-4 md:mb-6" />
                    <p className="text-2xl md:text-3xl font-semibold">
                        {t("thank_you")}
                    </p>
                    <p className="text-[#d7f6e5] mt-3 md:mt-4 text-lg md:text-xl">
                        {t("we_will_contact")}
                    </p>
                </motion.div>
            )}
        </div>
    );
};

export default Form;
