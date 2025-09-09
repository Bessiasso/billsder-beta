/* import Hero from "@/components/landing-page/Hero"; */
import { PageTransition } from "@/components/PageTransition";
import Home from "@/components/Home";

export default function Page() {
    return (
        <PageTransition>
            <Home />
        </PageTransition>
    );
}
