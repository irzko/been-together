"use client";
import PostType from "@/types";
import { useState } from "react";

const Dropdown = ({ post }: { post: PostType }) => {
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    fetch("/api/diary", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        post: post,
      }),
    })
      .then(async (res) => {
        if (res.status === 200) {
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="absolute right-2 top-2 flex flex-col items-end">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-full hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50"
        type="button"
      >
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 16 3"
        >
          <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
        </svg>
      </button>

      <div
        className={`z-10 bg-white divide-y divide-gray-100 mt-2 rounded-lg shadow w-44 ${
          open ? "" : "hidden"
        }`}
      >
        <ul className="py-2 text-sm text-gray-700">
          <li>
            <button
              onClick={handleDelete}
              className="block px-4 text-left w-full py-2 hover:bg-gray-100"
            >
              Xoá
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;