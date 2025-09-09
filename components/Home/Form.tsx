import { motion } from "framer-motion";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { div } from "framer-motion/client";

const Form = () => {
    const t = useTranslations("Form");
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [confirmationSubmitted, setConfirmationSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
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

        setIsSubmitting(true);
        try {
            const filteredData = {
                firstName: firstName.replace(htmlTagsRegex, ""),
                lastName: lastName.replace(htmlTagsRegex, ""),
                email: email.replace(htmlTagsRegex, ""),
            };

            // Validate email domain
            const validationResponse = await fetch("/api/validate-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: filteredData.email }),
            });

            if (!validationResponse.ok) {
                const { error } = await validationResponse.json();
                toast(t("invalid_email_domain"));
                return;
            }

            // If email domain is allowed, proceed with sending the email
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
        } finally {
            setIsSubmitting(false);
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
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 md:mb-10 text-center bg-gradient-to-r from-governor_bay via-[#a8a7d1] to-[#54489e] text-transparent bg-clip-text leading-tight">
                        {t("title")}
                    </h3>

                    {/* First Name */}
                    <motion.div
                        variants={itemVariants}
                        className="relative w-full"
                    >
                        <div className="relative border-b-2 border-dashed border-governor_bay/30 focus-within:border-governor_bay ">
                            <div className="flex items-center">
                                <div className="w-24">
                                    <Label
                                        htmlFor="firstName"
                                        className="text-lg md:text-xl font-medium text-governor_bay whitespace-nowrap mr-4"
                                    >
                                        {t("first_name")}:
                                    </Label>
                                </div>
                                <div className="flex-1">
                                    <input
                                        id="firstName"
                                        name="firstName"
                                        required
                                        className="!w-full bg-transparent dark:bg-transparent !border-0 dark:!border-0 text-governor_bay text-lg md:text-xl py-1  focus:!ring-0 dark:focus:!ring-0 focus:!outline-none dark:focus:!outline-none focus:!shadow-none dark:focus:!shadow-none  placeholder:text-governor_bay/60 !rounded-none p-5"
                                        placeholder="Didier"
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Last Name */}
                    <motion.div
                        variants={itemVariants}
                        className="relative w-full"
                    >
                        <div className="relative border-b-2 border-dashed border-governor_bay/30 focus-within:border-governor_bay">
                            <div className="flex items-center">
                                <div className="w-24">
                                    <Label
                                        htmlFor="lastName"
                                        className="text-lg md:text-xl font-medium text-governor_bay whitespace-nowrap mr-4"
                                    >
                                        {t("last_name")}:
                                    </Label>
                                </div>
                                <div className="flex-1">
                                    <input
                                        id="lastName"
                                        name="lastName"
                                        required
                                        className="!w-full bg-transparent dark:bg-transparent !border-0 dark:!border-0 text-governor_bay text-lg md:text-xl py-1 focus:!ring-0 dark:focus:!ring-0 focus:!outline-none dark:focus:!outline-none focus:!shadow-none dark:focus:!shadow-none placeholder:text-governor_bay/60 !rounded-none p-5"
                                        placeholder="Drogba"
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Email */}
                    <motion.div
                        variants={itemVariants}
                        className="relative w-full"
                    >
                        <div className="relative border-b-2 border-dashed border-governor_bay/30 focus-within:border-governor_bay">
                            <div className="flex items-center">
                                <div className="w-24 ">
                                    <Label
                                        htmlFor="email"
                                        className="text-lg md:text-xl font-medium text-governor_bay whitespace-nowrap mr-4"
                                    >
                                        {t("email")}:
                                    </Label>
                                </div>
                                <div className="flex-1">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        className="!w-full bg-transparent dark:bg-transparent !border-0 dark:!border-0 text-governor_bay text-lg md:text-xl py-1 focus:!ring-0 dark:focus:!ring-0 focus:!outline-none dark:focus:!outline-none focus:!shadow-none dark:focus:!shadow-none placeholder:text-governor_bay/60 !rounded-none p-5"
                                        placeholder="didier@drogba.com"
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Join Button */}
                    <motion.div
                        variants={itemVariants}
                        className="flex justify-center mt-15"
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full"
                        >
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-gradient-to-r from-[#54489e] to-[#6656a7] hover:from-governor_bay hover:to-[#a8a7d1] text-white hover:text-white transition-colors duration-300 ease-in-out text-lg md:text-xl py-6 md:py-8 rounded-3xl shadow-lg hover:shadow-xl font-semibold px-12 w-full disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? t("submitting") : t("join")}
                                {!isSubmitting && (
                                    <ArrowRight className="ml-2 h-5 w-5 md:h-6 md:w-6" />
                                )}
                            </Button>
                        </motion.div>
                    </motion.div>
                </motion.form>
            ) : (
                <motion.div
                    className="text-center p-6 md:p-8 h-[320px] flex flex-col justify-center items-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                            delay: 0.2,
                            type: "spring",
                            stiffness: 200,
                        }}
                    >
                        <CheckCircle className="h-16 w-16 md:h-20 md:w-20 text-[#54489e] mx-auto mb-6 md:mb-8 drop-shadow-lg" />
                    </motion.div>
                    <motion.p
                        className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#d7f6e5] to-[#a8a7d1] text-transparent bg-clip-text mb-4"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        {t("thank_you")}
                    </motion.p>
                    <motion.p
                        className="text-[#a8a7d1] text-lg md:text-xl leading-relaxed"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        {t("we_will_contact")}
                    </motion.p>
                </motion.div>
            )}
        </div>
    );
};

export default Form;
