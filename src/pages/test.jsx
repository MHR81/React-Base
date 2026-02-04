import { useState, useEffect } from "react";
import CustomTable from "../../components/CustomTable/CustomTable";
import CustomModal from "../../components/customModal/customModal";
import Pagination from "../../components/Pagination/Pagination";
import usersService from "../../services/api/users";


export default function Users() {

    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(4);
    const [totalPages, setTotalPages] = useState(5);
    const [delteModalOpen, setDeleteModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const handleFetchUsers = async (page) => {
            setLoading(true);
            try {
                const res = await usersService.getUsers(page);
                console.log(res);
                setUsers(res.data.data);
                setTotalPages(res.data.totalPages);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
            setLoading(false);
        }
        handleFetchUsers(currentPage);
    }, [currentPage]);




    return (
        <div className="w-full">
            <CustomTable
                loading={loading}
                items={users}
                pagination={
                    <Pagination
                        totalPages={totalPages}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />}
            >
                <thead className="bg-thead">
                    <tr>
                        <th className="px-5 py-3 text-start">نام</th>
                        <th className="px-5 py-3 text-start">ایمیل</th>
                        <th className="px-5 py-3 text-start">عملیات</th>

                    </tr>
                </thead>

                <tbody className="bg-tbody">
                    {users.map(user => (
                        <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700">
                            <td className="px-5 py-3 whitespace-nowrap">{user.name}</td>
                            <td className="px-5 py-3 whitespace-nowrap">{user.email}</td>
                            <td className="px-5 py-3 text-center flex gap-2 justify-start">
                                <button onClick={() => setLoading(true)} className="px-2 py-1 bg-blue-500 text-white rounded">ویرایش</button>
                                <button onClick={() => setDeleteModalOpen(user)} className="px-2 py-1 bg-red-500 text-white rounded">حذف</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </CustomTable>

            <CustomModal
                open={delteModalOpen}
                title="حذف کاربر"
                desc="آیا از حذف این کاربر مطمئن هستید؟ این عملیات قابل بازگشت نیست."
                actionText="حذف"
                closeText="انصراف"
                onClose={() => setDeleteModalOpen(false)}
                onAction={() => console.log("حذف کاربر")}
                actionClassName="bg-red-500 hover:bg-red-600"
            >
                <form>
                    <input
                        type="text"
                        // value={name}
                        // onChange={e => setName(e.target.value)}
                        className="border p-2 w-full mb-4 rounded"
                        placeholder="نام"
                    />
                    <input
                        type="email"
                        // value={email}
                        // onChange={e => setEmail(e.target.value)}
                        className="border p-2 w-full mb-4 rounded"
                        placeholder="ایمیل"
                    />
                </form>
            </CustomModal>
            <CustomModal
                open={editModalOpen}
                title="ویرایش کاربر"
                onClose={() => setEditModalOpen(false)}
                // onAction={handleSave}
                actionText="ذخیره"
            >
                <form>
                    <input
                        type="text"
                        // value={name}
                        // onChange={e => setName(e.target.value)}
                        className="border p-2 w-full mb-4 rounded"
                        placeholder="نام"
                    />
                    <input
                        type="email"
                        // value={email}
                        // onChange={e => setEmail(e.target.value)}
                        className="border p-2 w-full mb-4 rounded"
                        placeholder="ایمیل"
                    />
                </form>
            </CustomModal>
        </div >
    );
}