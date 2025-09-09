"use client";

import React from "react";
import {
    FaXTwitter,
    FaWhatsapp,
    FaFacebookF,
    FaLinkedinIn,
    FaInstagram,
} from "react-icons/fa6";

import Link from "next/link";
import path from "path";

const icons = [
    {
        path: "https://www.linkedin.com/company/ucodebyus-crafting-innovative-software-for-smes/",
        name: <FaLinkedinIn />,
    },
    {
        path: "https://www.facebook.com/share/1BvtuXGqYY/?mibextid=wwXIfr",
        name: <FaFacebookF />,
    },
    {
        path: "https://www.instagram.com/ucodebyus/",
        name: <FaInstagram />,
    },
    {
        path: "https://x.com/ucodebyus?s=21",
        name: <FaXTwitter />,
    },
    {
        path: "https://whatsapp.com/channel/0029VasAlHbJ93wbig3RIG1D",
        name: <FaWhatsapp />,
    },
];

const Socials = ({
    containerStyles,
    iconesStyles,
}: {
    containerStyles: any;
    iconesStyles: any;
}) => {
    return (
        <div className={`${containerStyles}`}>
            {icons.map((icon, index) => {
                return (
                    <Link href={icon.path} key={index}>
                        <div className={`${iconesStyles}`}>{icon.name}</div>
                    </Link>
                );
            })}
        </div>
    );
};

export default Socials;
