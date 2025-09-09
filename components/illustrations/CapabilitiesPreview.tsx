"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import {
    Receipt,
    CreditCard,
    Users,
    Package,
    BarChart4,
    Smartphone,
    CheckCircle2,
    Clock,
    Zap,
    TrendingUp,
    Shield,
    Globe,
    DollarSign,
    Percent,
    FileText,
    Truck,
    Building,
    UserCog,
} from "lucide-react";

export default function CapabilitiesPreview() {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: false, margin: "-100px" });
    const [activeModule, setActiveModule] = useState<string | null>(null);
    const [hoveredModule, setHoveredModule] = useState<string | null>(null);

    // Prevent hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    // Auto-rotate through modules
    useEffect(() => {
        if (!isInView) return;

        const modules = [
            "facturation",
            "paiements",
            "clients",
            "stocks",
            "analyses",
            "mobile",
        ];
        let currentIndex = 0;

        const interval = setInterval(() => {
            if (hoveredModule === null) {
                setActiveModule(modules[currentIndex]);
                currentIndex = (currentIndex + 1) % modules.length;
            }
        }, 3000);

        return () => clearInterval(interval);
    }, [isInView, hoveredModule]);

    const isDark = mounted && resolvedTheme === "dark";

    // Couleurs adaptées au thème
    const primaryColor = isDark ? "#54489e" : "#54489e";
    const secondaryColor = isDark ? "#a8a7d1" : "#a8a7d1";
    const bgColor = isDark
        ? "rgba(30, 26, 55, 0.3)"
        : "rgba(248, 248, 252, 0.5)";
    const textColor = isDark ? "#ffffff" : "#54489e";
    const borderColor = isDark
        ? "rgba(84, 72, 158, 0.3)"
        : "rgba(84, 72, 158, 0.2)";
    const cardBgColor = isDark
        ? "rgba(18, 18, 18, 0.7)"
        : "rgba(255, 255, 255, 0.7)";

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    };

    const iconVariants = {
        hidden: { scale: 0, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 260,
                damping: 20,
                duration: 0.6,
            },
        },
    };

    const lineVariants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
            pathLength: 1,
            opacity: 1,
            transition: {
                duration: 1.5,
                ease: "easeInOut",
            },
        },
    };

    const pulseVariants = {
        pulse: {
            scale: [1, 1.05, 1],
            opacity: [0.7, 1, 0.7],
            transition: {
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse" as const,
            },
        },
    };

    // Modules principaux
    const modules = [
        {
            id: "facturation",
            name: "Facturation",
            icon: <Receipt size={28} />,
            color: "#54489e",
            position: { top: "15%", left: "20%" },
            description:
                "Créez et envoyez des factures professionnelles en quelques clics",
            features: [
                {
                    icon: <FileText size={16} />,
                    text: "Factures personnalisées",
                },
                {
                    icon: <CheckCircle2 size={16} />,
                    text: "Suivi des paiements",
                },
                {
                    icon: <Percent size={16} />,
                    text: "Gestion des taxes et remises",
                },
            ],
        },
        {
            id: "paiements",
            name: "Paiements",
            icon: <CreditCard size={28} />,
            color: "#6656a7",
            position: { top: "25%", left: "80%" },
            description:
                "Acceptez tous types de paiements et suivez vos encaissements",
            features: [
                {
                    icon: <DollarSign size={16} />,
                    text: "Multiples méthodes de paiement",
                },
                { icon: <Shield size={16} />, text: "Transactions sécurisées" },
                {
                    icon: <TrendingUp size={16} />,
                    text: "Rapprochement automatique",
                },
            ],
        },
        {
            id: "clients",
            name: "Clients",
            icon: <Users size={28} />,
            color: "#7667b3",
            position: { top: "65%", left: "15%" },
            description:
                "Gérez efficacement vos relations clients et fournisseurs",
            features: [
                { icon: <Users size={16} />, text: "Base de données clients" },
                {
                    icon: <TrendingUp size={16} />,
                    text: "Historique des transactions",
                },
                { icon: <Globe size={16} />, text: "Communication intégrée" },
            ],
        },
        {
            id: "stocks",
            name: "Stocks",
            icon: <Package size={28} />,
            color: "#8a7fc0",
            position: { top: "75%", left: "75%" },
            description:
                "Suivez vos niveaux de stock et gérez vos approvisionnements",
            features: [
                { icon: <Package size={16} />, text: "Suivi en temps réel" },
                { icon: <Truck size={16} />, text: "Gestion des fournisseurs" },
                {
                    icon: <Clock size={16} />,
                    text: "Alertes de réapprovisionnement",
                },
            ],
        },
        {
            id: "analyses",
            name: "Analyses",
            icon: <BarChart4 size={28} />,
            color: "#a8a7d1",
            position: { top: "40%", left: "50%" },
            description:
                "Visualisez vos performances et prenez des décisions éclairées",
            features: [
                {
                    icon: <BarChart4 size={16} />,
                    text: "Tableaux de bord personnalisables",
                },
                { icon: <TrendingUp size={16} />, text: "Rapports détaillés" },
                { icon: <Zap size={16} />, text: "Insights en temps réel" },
            ],
        },
        {
            id: "mobile",
            name: "Mobile",
            icon: <Smartphone size={28} />,
            color: "#b8b2db",
            position: { top: "50%", left: "85%" },
            description: "Gérez votre entreprise où que vous soyez",
            features: [
                {
                    icon: <Smartphone size={16} />,
                    text: "Application mobile complète",
                },
                { icon: <Globe size={16} />, text: "Accès à distance" },
                {
                    icon: <Zap size={16} />,
                    text: "Notifications en temps réel",
                },
            ],
        },
    ];

    // Modules complémentaires
    const additionalModules = [
        {
            id: "hotel",
            name: "Hôtellerie",
            icon: <Building size={24} />,
            color: "#9e4854",
            position: { top: "20%", left: "35%" },
        },
        {
            id: "rh",
            name: "RH",
            icon: <UserCog size={24} />,
            color: "#4e9e48",
            position: { top: "60%", left: "40%" },
        },
    ];

    // Avantages clés
    const benefits = [
        {
            icon: <Zap size={20} />,
            text: "Gagnez du temps",
            description:
                "Automatisez vos tâches répétitives et concentrez-vous sur votre cœur de métier",
            position: { top: "30%", left: "65%" },
        },
        {
            icon: <TrendingUp size={20} />,
            text: "Augmentez vos revenus",
            description:
                "Optimisez votre gestion et identifiez de nouvelles opportunités de croissance",
            position: { top: "70%", left: "55%" },
        },
        {
            icon: <Shield size={20} />,
            text: "Sécurisez vos données",
            description:
                "Protégez vos informations sensibles avec un système sécurisé et fiable",
            position: { top: "45%", left: "25%" },
        },
    ];

    // Connexions entre les modules
    const getConnections = () => {
        const connections = [];

        // Connexions vers le module central (analyses)
        for (const module of [...modules, ...additionalModules]) {
            if (module.id !== "analyses") {
                const fromPosition = module.position;
                const toPosition = modules.find(
                    (m) => m.id === "analyses"
                )?.position;

                if (fromPosition && toPosition) {
                    connections.push({
                        from: `${fromPosition.left},${fromPosition.top}`,
                        to: `${toPosition.left},${toPosition.top}`,
                        active:
                            activeModule === module.id ||
                            activeModule === "analyses",
                        id: `${module.id}-analyses`,
                    });
                }
            }
        }

        // Connexions spécifiques entre modules
        const specificConnections = [
            { from: "facturation", to: "paiements" },
            { from: "facturation", to: "clients" },
            { from: "paiements", to: "clients" },
            { from: "stocks", to: "facturation" },
            { from: "mobile", to: "paiements" },
            { from: "hotel", to: "clients" },
            { from: "rh", to: "analyses" },
        ];

        for (const conn of specificConnections) {
            const fromModule = [...modules, ...additionalModules].find(
                (m) => m.id === conn.from
            );
            const toModule = [...modules, ...additionalModules].find(
                (m) => m.id === conn.to
            );

            if (fromModule && toModule) {
                connections.push({
                    from: `${fromModule.position.left},${fromModule.position.top}`,
                    to: `${toModule.position.left},${toModule.position.top}`,
                    active:
                        activeModule === conn.from || activeModule === conn.to,
                    id: `${conn.from}-${conn.to}`,
                });
            }
        }

        return connections;
    };

    const connections = getConnections();

    return (
        <div
            ref={ref}
            className="relative w-full h-[700px] overflow-hidden my-16"
        >
            {/* Fond avec grille */}
            <div
                className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: `linear-gradient(to right, ${borderColor} 1px, transparent 1px), 
                            linear-gradient(to bottom, ${borderColor} 1px, transparent 1px)`,
                    backgroundSize: "40px 40px",
                }}
            />

            {/* Cercles décoratifs */}
            <motion.div
                className="absolute rounded-full opacity-10"
                style={{
                    backgroundColor: primaryColor,
                    top: "10%",
                    left: "5%",
                    width: "300px",
                    height: "300px",
                }}
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.1, 0.15, 0.1],
                }}
                transition={{
                    duration: 8,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                }}
            />

            <motion.div
                className="absolute rounded-full opacity-10"
                style={{
                    backgroundColor: secondaryColor,
                    bottom: "10%",
                    right: "5%",
                    width: "400px",
                    height: "400px",
                }}
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.1, 0.15, 0.1],
                }}
                transition={{
                    duration: 10,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                }}
            />

            {/* Connexions */}
            <svg className="absolute inset-0 w-full h-full">
                {connections.map((connection, index) => {
                    const [fromX, fromY] = connection.from.split(",");
                    const [toX, toY] = connection.to.split(",");

                    return (
                        <motion.line
                            key={connection.id}
                            x1={fromX}
                            y1={fromY}
                            x2={toX}
                            y2={toY}
                            stroke={
                                connection.active
                                    ? primaryColor
                                    : secondaryColor
                            }
                            strokeWidth={connection.active ? "2" : "1"}
                            strokeDasharray={connection.active ? "" : "5,5"}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            variants={lineVariants}
                            custom={index}
                            style={{
                                opacity: connection.active ? 0.8 : 0.3,
                            }}
                        />
                    );
                })}
            </svg>

            {/* Modules principaux */}
            <motion.div
                className="absolute inset-0"
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={containerVariants}
            >
                {modules.map((module) => (
                    <motion.div
                        key={module.id}
                        className="absolute"
                        style={{
                            top: module.position.top,
                            left: module.position.left,
                            transform: "translate(-50%, -50%)",
                            zIndex: activeModule === module.id ? 20 : 10,
                        }}
                        variants={itemVariants}
                        onMouseEnter={() => {
                            setHoveredModule(module.id);
                            setActiveModule(module.id);
                        }}
                        onMouseLeave={() => setHoveredModule(null)}
                    >
                        <motion.div
                            className="flex flex-col items-center"
                            whileHover={{ y: -5 }}
                            animate={activeModule === module.id ? "pulse" : ""}
                            variants={pulseVariants}
                            transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 10,
                            }}
                        >
                            <motion.div
                                className="relative"
                                whileHover={{ scale: 1.1 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 10,
                                }}
                            >
                                <motion.div
                                    className="absolute inset-0 rounded-full"
                                    style={{ backgroundColor: module.color }}
                                    animate={{
                                        scale:
                                            activeModule === module.id
                                                ? [1, 1.2, 1]
                                                : [1, 1.05, 1],
                                        opacity:
                                            activeModule === module.id
                                                ? [0.3, 0.5, 0.3]
                                                : [0.2, 0.3, 0.2],
                                    }}
                                    transition={{
                                        duration:
                                            activeModule === module.id ? 2 : 3,
                                        repeat: Number.POSITIVE_INFINITY,
                                        repeatType: "reverse",
                                    }}
                                />
                                <div
                                    className="w-16 h-16 rounded-full flex items-center justify-center z-10"
                                    style={{
                                        backgroundColor: isDark
                                            ? "#1E1A37"
                                            : "#ffffff",
                                        boxShadow: `0 8px 32px rgba(84, 72, 158, 0.2)`,
                                        border: `2px solid ${module.color}`,
                                    }}
                                >
                                    <div className="text-[#54489e]">
                                        {module.icon}
                                    </div>
                                </div>
                            </motion.div>
                            <span
                                className={`mt-2 font-medium text-sm ${
                                    activeModule === module.id
                                        ? "font-bold"
                                        : ""
                                }`}
                                style={{ color: textColor }}
                            >
                                {module.name}
                            </span>
                        </motion.div>

                        {/* Carte de détails qui apparaît lorsque le module est actif */}
                        <AnimatePresence>
                            {activeModule === module.id && (
                                <motion.div
                                    className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 z-30"
                                    initial={{ opacity: 0, y: -10, scale: 0.9 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -10, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div
                                        className="rounded-lg p-4 shadow-lg backdrop-blur-md w-64"
                                        style={{
                                            backgroundColor: cardBgColor,
                                            border: `1px solid ${module.color}`,
                                            boxShadow: `0 10px 25px -5px ${module.color}40`,
                                        }}
                                    >
                                        <div className="flex items-center mb-2">
                                            <div
                                                className="w-8 h-8 rounded-full flex items-center justify-center mr-2"
                                                style={{
                                                    backgroundColor: `${module.color}30`,
                                                }}
                                            >
                                                <div className="text-[#54489e]">
                                                    {module.icon}
                                                </div>
                                            </div>
                                            <h3
                                                className="font-bold"
                                                style={{ color: textColor }}
                                            >
                                                {module.name}
                                            </h3>
                                        </div>
                                        <p
                                            className="text-sm mb-3 opacity-80"
                                            style={{ color: textColor }}
                                        >
                                            {module.description}
                                        </p>
                                        <div className="space-y-2">
                                            {module.features.map(
                                                (feature, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="flex items-center text-sm"
                                                    >
                                                        <div className="mr-2 text-[#54489e]">
                                                            {feature.icon}
                                                        </div>
                                                        <span
                                                            style={{
                                                                color: textColor,
                                                            }}
                                                        >
                                                            {feature.text}
                                                        </span>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}

                {/* Modules complémentaires */}
                {additionalModules.map((module) => (
                    <motion.div
                        key={module.id}
                        className="absolute"
                        style={{
                            top: module.position.top,
                            left: module.position.left,
                            transform: "translate(-50%, -50%)",
                            zIndex: activeModule === module.id ? 20 : 5,
                        }}
                        variants={itemVariants}
                        onMouseEnter={() => {
                            setHoveredModule(module.id);
                            setActiveModule(module.id);
                        }}
                        onMouseLeave={() => setHoveredModule(null)}
                    >
                        <motion.div
                            className="flex flex-col items-center"
                            whileHover={{ y: -3 }}
                            animate={activeModule === module.id ? "pulse" : ""}
                            variants={pulseVariants}
                        >
                            <motion.div
                                className="relative"
                                whileHover={{ scale: 1.1 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 10,
                                }}
                            >
                                <motion.div
                                    className="absolute inset-0 rounded-full"
                                    style={{ backgroundColor: module.color }}
                                    animate={{
                                        scale: [1, 1.1, 1],
                                        opacity: [0.2, 0.3, 0.2],
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Number.POSITIVE_INFINITY,
                                        repeatType: "reverse",
                                    }}
                                />
                                <div
                                    className="w-12 h-12 rounded-full flex items-center justify-center z-10"
                                    style={{
                                        backgroundColor: isDark
                                            ? "#1E1A37"
                                            : "#ffffff",
                                        boxShadow: `0 8px 32px rgba(84, 72, 158, 0.2)`,
                                        border: `2px solid ${module.color}`,
                                    }}
                                >
                                    <div className="text-[#54489e]">
                                        {module.icon}
                                    </div>
                                </div>
                            </motion.div>
                            <span
                                className="mt-2 font-medium text-xs"
                                style={{ color: textColor }}
                            >
                                {module.name}
                            </span>
                        </motion.div>
                    </motion.div>
                ))}

                {/* Avantages */}
                {benefits.map((benefit, index) => (
                    <motion.div
                        key={`benefit-${index}`}
                        className="absolute"
                        style={{
                            top: benefit.position.top,
                            left: benefit.position.left,
                            transform: "translate(-50%, -50%)",
                            zIndex: 15,
                        }}
                        variants={itemVariants}
                        custom={index + modules.length}
                        onMouseEnter={() =>
                            setHoveredModule(`benefit-${index}`)
                        }
                        onMouseLeave={() => setHoveredModule(null)}
                    >
                        <motion.div
                            className="flex items-center gap-2 px-3 py-2 rounded-full"
                            style={{
                                backgroundColor: bgColor,
                                border: `1px solid ${borderColor}`,
                                boxShadow: `0 4px 16px rgba(84, 72, 158, 0.1)`,
                            }}
                            whileHover={{ scale: 1.05, x: 5 }}
                            transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 10,
                            }}
                        >
                            <div className="text-[#54489e]">{benefit.icon}</div>
                            <span
                                className="font-medium text-sm whitespace-nowrap"
                                style={{ color: textColor }}
                            >
                                {benefit.text}
                            </span>
                        </motion.div>

                        {/* Tooltip pour les avantages */}
                        <AnimatePresence>
                            {hoveredModule === `benefit-${index}` && (
                                <motion.div
                                    className="absolute top-full left-0 mt-2 z-30"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div
                                        className="rounded-lg p-3 shadow-lg backdrop-blur-md max-w-[200px]"
                                        style={{
                                            backgroundColor: cardBgColor,
                                            border: `1px solid ${primaryColor}`,
                                        }}
                                    >
                                        <p
                                            className="text-sm"
                                            style={{ color: textColor }}
                                        >
                                            {benefit.description}
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}

                {/* Statistiques et métriques */}
                <motion.div
                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
                    variants={itemVariants}
                    custom={modules.length + benefits.length}
                >
                    <div className="flex gap-6 justify-center">
                        {[
                            { value: "+40%", label: "Productivité" },
                            { value: "-60%", label: "Erreurs" },
                            { value: "+25%", label: "Revenus" },
                        ].map((stat, idx) => (
                            <motion.div
                                key={idx}
                                className="text-center"
                                whileHover={{ y: -5 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 10,
                                }}
                            >
                                <div
                                    className="text-2xl font-bold mb-1"
                                    style={{ color: primaryColor }}
                                >
                                    {stat.value}
                                </div>
                                <div
                                    className="text-sm"
                                    style={{ color: textColor }}
                                >
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>

            {/* Légende */}
            <motion.div
                className="absolute bottom-4 right-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
            >
                <div
                    className="text-xs rounded-md px-3 py-2 backdrop-blur-sm"
                    style={{
                        backgroundColor: cardBgColor,
                        color: textColor,
                        border: `1px solid ${borderColor}`,
                    }}
                >
                    Survolez les éléments pour plus de détails
                </div>
            </motion.div>
        </div>
    );
}
