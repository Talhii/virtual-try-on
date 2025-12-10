export default function DashboardLoading() {
    return (
        <div className="min-h-screen pt-20 bg-white">
            <div className="flex">
                {/* Sidebar skeleton */}
                <div className="hidden lg:block w-[300px] h-[calc(100vh-80px)] bg-gray-50 border-r border-gray-200 p-4">
                    <div className="space-y-4">
                        <div className="h-10 bg-gray-200 rounded-lg animate-pulse" />
                        <div className="h-32 bg-gray-200 rounded-xl animate-pulse" />
                        <div className="h-48 bg-gray-200 rounded-xl animate-pulse" />
                    </div>
                </div>

                {/* Main content skeleton */}
                <div className="flex-1 p-6">
                    <div className="h-8 w-64 bg-gray-200 rounded-lg animate-pulse mb-6" />
                    <div className="h-64 bg-gray-100 rounded-xl animate-pulse mb-6" />
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="aspect-[3/4] bg-gray-100 rounded-xl animate-pulse" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
