export type AgendaItemType = "task" | "event" | "reminder";
export type AgendaItemStatus =
    | "pending"
    | "in-progress"
    | "completed"
    | "cancelled";
export type AgendaItemPriority = "low" | "medium" | "high";
export type RecurrencePattern =
    | "none"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly";

export interface Employee {
    id: string;
    name: string;
    email: string;
    avatar?: string;
}

export interface AgendaItem {
    id: string;
    title: string;
    description?: string;
    type: AgendaItemType;
    status: AgendaItemStatus;
    priority: AgendaItemPriority;
    startDate: Date;
    endDate?: Date;
    allDay?: boolean;
    assignedTo?: Employee;
    tags?: string[];
    createdAt: Date;
    updatedAt: Date;
    isRecurring?: boolean;
    recurrencePattern?: RecurrencePattern;
    recurrenceEndDate?: Date;
    relatedCustomer?: { name: string; id: string };
    relatedInvoice?: string;
    relatedDelivery?: string;
    reminderDate?: Date;
    attachments?: any[];
    comments?: any[];
    timeTracking?: {
        totalTimeLogged: number;
        estimatedHours?: number;
        loggedTime?: any[];
    };
}

export type AgendaFilter = {
    type?: AgendaItemType[];
    status?: AgendaItemStatus[];
    priority?: AgendaItemPriority[];
    assignedTo?: string[];
    tags?: string[];
    dateRange?: {
        start: Date;
        end: Date;
    };
};

export interface CalendarIntegration {
    id: string;
    name: string;
    type: "google" | "outlook" | "apple" | "other";
    isConnected: boolean;
    lastSynced?: Date;
}

export interface TimeLog {
    id: string;
    startTime: Date;
    endTime: Date;
    duration: number;
    description?: string;
    employee: Employee;
}

export interface Comment {
    id: string;
    text: string;
    author: Employee;
    createdAt: Date;
}

export interface Attachment {
    id: string;
    name: string;
    url: string;
    type: string;
    size: number;
    uploadedAt: Date;
}
