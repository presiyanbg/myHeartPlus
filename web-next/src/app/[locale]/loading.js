import { Spinner } from "@nextui-org/react";

export default function Loading() {
    return (
        <div className="w-full flex flex-col items-center justify-center h-screen gap-4">
            <Spinner color="primary" />
        </div>
    )
}