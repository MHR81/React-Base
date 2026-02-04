export default function CustomModal({
    open,
    title,
    desc,
    actionText = "تأیید",
    closeText = "بستن",
    onClose,
    onAction,
    children,
    className,
    actionClassName = "bg-blue-500 hover:bg-blue-600",
    closeClassName = "bg-gray-200 hover:bg-gray-300",
}) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className={`bg-white rounded-xl shadow-xl p-6 max-w-lg w-full ${className || ""}`}>
                {/* عنوان */}
                {title && <h2 className="text-lg font-bold mb-2">{title}</h2>}

                {/* توضیحات */}
                {desc && <p className="mb-4 text-gray-600">{desc}</p>}

                {/* محتوا/فرم سفارشی */}
                {children && <div className="mb-4">{children}</div>}

                {/* دکمه‌ها */}
                <div className="flex justify-end gap-3 mt-2">
                    <button
                        className={`px-4 py-2 rounded transition ${closeClassName}`}
                        onClick={onClose}
                    >
                        {closeText}
                    </button>
                    <button
                        className={`px-4 py-2 text-white rounded transition ${actionClassName}`}
                        onClick={onAction}
                    >
                        {actionText}
                    </button>
                </div>
            </div>
        </div>
    );
}