export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-3 border-white"></div>
            <p className="m-2">Loading...</p>
        </div>
    );
}