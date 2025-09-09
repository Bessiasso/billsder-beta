// types/next-auth.d.ts
import "next-auth";

declare module "next-auth" {
    /**
     * Les données retournées par l'authentification.
     */
    interface User {
        id: string;
        username: string;
        email: string;
        id_role: string;
        id_company: string;
        id_employee: string;
        id_state: string;
    }

    /**
     * Les données disponibles dans la session.
     */
    interface Session {
        user: {
            id: string;
            username: string;
            email: string;
            id_role: string;
            id_company: string;
            id_employee: string;
            id_state: string;
        } & DefaultSession["user"];
    }
}

declare module "next-auth/jwt" {
    /** Les données stockées dans le token JWT. */
    interface JWT {
        id: string;
        username: string;
        email: string;
        id_role: string;
        id_company: string;
        id_employee: string;
        id_state: string;
    }
}
