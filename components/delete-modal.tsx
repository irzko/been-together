import { Dispatch, SetStateAction, useContext } from "react";
import DiaryContext from "@/context/DiaryContext";
import { Button } from "@nextui-org/button";

export default function DeleteModal({
  showModal,
  setShowModal,
  diary,
}: {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  diary: IDiary;
}) {
  const { mutate } = useContext(DiaryContext);
  const handleDelete = () => {
    fetch("/api/diary", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: diary.id,
      }),
    })
      .then(async (res) => {
        mutate();
        setShowModal(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      tabIndex={-1}
      aria-hidden="true"
      className={`overflow-y-auto bg-gray-900/80 overflow-x-hidden fixed z-50 justify-center items-center inset-0 ${
        showModal ? "flex" : "hidden"
      }`}
    >
      <div className="relative p-2 w-full max-w-md">
        <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
          <button
            type="button"
            className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={() => setShowModal(false)}
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <h3 className="text-lg text-center font-semibold text-gray-900 dark:text-white">
            Xác nhận xoá nhật ký
          </h3>
          <p className="my-4 text-center text-gray-500 dark:text-gray-300">
            Bạn có chắc chắn muốn xóa nhật ký này?
          </p>
          <div className="flex justify-center items-center space-x-4">
            <button
              onClick={() => setShowModal(false)}
              type="button"
              className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              Huỷ
            </button>
            <Button color="danger" onClick={handleDelete}>
              Xác nhận xóa
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
