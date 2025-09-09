import {
    BarChart3,
    Users,
    Package,
    Briefcase,
    Building2,
    UserCircle,
    DollarSign,
    Menu,
    X,
    FileText,
    Settings,
    ChevronLeft,
    ChevronRight,
    Building,
    Wallet,
    ClipboardList,
    Calendar,
    User,
    CreditCard,
    HelpCircle,
    Lock,
} from "lucide-react";
import Link from "next/link";

interface MobileSidebarProps {
    pathname: string;
    onClose: () => void;
}

export function MobileSidebar({ pathname, onClose }: MobileSidebarProps) {
    const routes = [
        {
            title: "Dashboard",
            href: `/app/dashboard`,
            icon: <BarChart3 className="h-5 w-5" />,
        },
        {
            title: "Profile",
            href: `/app/profile`,
            icon: <User className="h-5 w-5" />,
        },
        {
            title: "Invoices",
            href: `/app/invoices`,
            icon: <FileText className="h-5 w-5" />,
        },
        {
            title: "Estimate",
            href: `/app/estimates`,
            icon: <ClipboardList className="h-5 w-5" />,
        },
        {
            title: "Products",
            href: `/app/products`,
            icon: <Package className="h-5 w-5" />,
        },
        {
            title: "Suppliers",
            href: `/app/suppliers`,
            icon: <Building className="h-5 w-5" />,
        },
        {
            title: "Services",
            href: `/app/services`,
            icon: <Briefcase className="h-5 w-5" />,
        },
        {
            title: "Customers",
            href: `/app/crm`,
            icon: <Users className="h-5 w-5" />,
        },
        {
            title: "Expenses",
            href: `/app/expenses`,
            icon: <Wallet className="h-5 w-5" />,
        },
        {
            title: "Accounting",
            href: `/app/accounting`,
            icon: <DollarSign className="h-5 w-5" />,
        },
        {
            title: "Payments",
            href: `/app/payments`,
            icon: <CreditCard className="h-5 w-5" />,
        },
        {
            title: "Employees",
            href: `/app/employees`,
            icon: <UserCircle className="h-5 w-5" />,
        },
        {
            title: "Company",
            href: `/app/company`,
            icon: <Building2 className="h-5 w-5" />,
        },
        {
            title: "Agenda",
            href: `/app/agenda`,
            icon: <Calendar className="h-5 w-5" />,
        },
        {
            title: "Settings",
            href: `/app/settings`,
            icon: <Settings className="h-5 w-5" />,
        },
    ];

    return (
        <div className="grid gap-4 py-4">
            <div className="px-6 py-2">
                <Link
                    href="/dashboard"
                    className="flex items-center gap-2 font-semibold"
                >
                    <Package className="h-6 w-6 text-green-600" />
                    <span className="text-lg">Les Fermes Gnamien</span>
                </Link>
            </div>
            <div className="grid gap-1 px-2">
                {routes.map((route) => (
                    <Link
                        key={route.href}
                        href={route.href}
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                            pathname === route.href
                                ? "bg-green-100 text-green-900"
                                : "text-muted-foreground hover:bg-green-50 hover:text-green-900"
                        }`}
                        onClick={onClose}
                    >
                        {route.icon}
                        {route.title}
                    </Link>
                ))}
            </div>
        </div>
    );
}
