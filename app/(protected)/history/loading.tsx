export default function HistoryLoading() {
    return (
        <div className="pt-4 pb-16">
            <div className="container mx-auto px-4">
                {/* Header skeleton */}
                <div className="mb-12">
                    <div className="h-6 w-32 bg-gray-200 rounded-full animate-pulse mb-4" />
                    <div className="h-10 w-48 bg-gray-200 rounded-lg animate-pulse mb-2" />
                    <div className="h-5 w-72 bg-gray-100 rounded animate-pulse" />
                </div>

                {/* Search skeleton */}
                <div className="flex gap-4 mb-8">
                    <div className="flex-1 h-12 bg-gray-100 rounded-xl animate-pulse" />
                    <div className="w-40 h-12 bg-gray-100 rounded-xl animate-pulse" />
                </div>

                {/* List skeleton */}
                <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="bg-white border border-gray-100 rounded-2xl p-4">
                            <div className="flex items-center gap-4">
                                <div className="w-20 h-20 bg-gray-100 rounded-xl animate-pulse" />
                                <div className="flex-1">
                                    <div className="h-5 w-48 bg-gray-200 rounded animate-pulse mb-2" />
                                    <div className="h-4 w-32 bg-gray-100 rounded animate-pulse" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
