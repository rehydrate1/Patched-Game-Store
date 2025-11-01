
export default function ServerError({ message }: {message: string | null }) {

    if (!message) {
        return null;
    }

    return (
        <div
            className={`errorMessage p-3 my-2 text-sm font-semibold text-red-600 bg-red-100 rounded-lg`}
            role="alert"
        >
            <p>{message}</p>
        </div>
    );
}