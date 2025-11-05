import Aurora from "@/components/UI/modern/Aurora";
import {JSX} from "react";

export default function AuthContext({children}: {children: JSX.Element}) {

    return (
        <div className="relative min-h-screen overflow-hidden">
            <div className="absolute inset-0 z-0">
                <Aurora
                    colorStops={["#099f5f", "#00FE92", "#00d17a"]}
                    amplitude={0.6}
                    speed={0.4}
                    blend={0.45}
                />
            </div>
            {children}
        </div>
    )
}