import {useState} from "react";
import {useRouter} from "next/navigation";

export function usePageUtils() {

    const [serverError, setServerError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const router = useRouter();

    return {
        serverError,
        setServerError,
        isSubmitting,
        setIsSubmitting,
        router,
    }
}