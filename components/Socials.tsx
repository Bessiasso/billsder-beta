"use client";

import React from "react";
import {
    RiLinkedinFill,
    RiGithubFill,
    RiInstagramFill,
    RiFacebookFill,
} from "react-icons/ri";

import Link from "next/link";
import path from "path";

const icons = [
    {
        path: "https://www.facebook.com/people/Ucodebyus/61553135800806/?mibextid=9R9pXO",
        name: <RiFacebookFill />,
    },
    {
        path: "https://www.linkedin.com/in/ange-michel-gnamien-890b29221/",
        name: <RiLinkedinFill />,
    },
    {
        path: "https://github.com/ucodebyus",
        name: <RiGithubFill />,
    },
    {
        path: "https://www.instagram.com/ucodebyus/",
        name: <RiInstagramFill />,
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
