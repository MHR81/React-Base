import { Children, isValidElement } from "react";
import Lottie from "lottie-react";
import EmptyBox from "../../assets/lottie/EmptyBox.json";
import LoadingSpinner from "../ui/loadingSpinner/loadingSpinner";

export default function CustomTable({
    children,
    loading = false,
    items = [],
    // emptyText = "داده‌ای موجود نیست",
    pagination = null,
    className,
}) {
    const getColumnsCount = () => {
        const thead = Children.toArray(children).find(
            child => isValidElement(child) && child.type === "thead"
        );

        if (thead) {
            const tr = Children.toArray(thead.props.children).find(
                child => isValidElement(child) && child.type === "tr"
            );
            if (tr) {
                return Children.toArray(tr.props.children).length;
            }
        }
        return 0;
    };

    const columnsCount = getColumnsCount();

    return (
        <div className={`w-full ${className || ""}`}>
            <div className="w-full overflow-x-auto">
                <table className="w-full table-auto border-collapse text-sm">

                    {children}

                    {loading && columnsCount > 0 && (
                        <tfoot>
                            <tr>
                                <td
                                    colSpan={columnsCount}
                                    className="text-center p-4 text-gray-500 animate-pulse"
                                >
                                    <LoadingSpinner className="my-20" />
                                </td>
                            </tr>
                        </tfoot>
                    )}

                    {!loading && columnsCount > 0 && items.length === 0 && (
                        <tfoot>
                            <tr>
                                <td colSpan={columnsCount} className="text-center p-4 text-gray-500">
                                    <Lottie animationData={EmptyBox} loop={true} className=" w-[150px] h-[150px] my-20 mx-auto" />
                                </td>
                            </tr>
                        </tfoot>
                    )
                    }
                </table>
            </div>

            {/* Pagination ثابت */}
            {pagination && <div className="mt-4">{pagination}</div>}
        </div>
    );
}
