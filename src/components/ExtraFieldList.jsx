import { Pencil, Trash2, Plus } from "lucide-react";
import Image from "next/image";
// import { IoText } from "react-icons/io5";
// import { PiListNumbersBold } from "react-icons/pi";
// import { MdDateRange } from "react-icons/md";

const typeObjectIcon = {
  String: "./text.svg",
  Number: "./number.svg",
  Boolean: "./boolean.svg",
  Date: "./date.svg",
  Object: "./complex.svg",
  Array: "./complex.svg",
};

export default function ExtraFieldList({ data, listType }) {
  return (
    <>
      {data?.map((item, index) => {
        return (
          <>
            <div
              key={index}
              className={`grid grid-cols-4 py-4 px-2 cursor-pointer relative ${
                index === data.length - 1 || item?.chiledren?.length > 0
                  ? ""
                  : "border-gray-800 border-b"
              }`}
            >
              {listType === "children" && (
                <div className="absolute -left-[20.5px] top-2 select-none">
                  <Image src="./box.svg" width={20} height={23} />
                </div>
              )}
              <div className="font-semibold flex items-center gap-x-4">
                <span className="select-none">
                  <Image src={typeObjectIcon[item?.type]} width={30} height={30} />
                </span>
                {item?.fieldName}
              </div>

              <h3 className="font-light">{item?.type}</h3>
              <h3>{item?.required ? "true" : "false"}</h3>

              {/* Edit and Delete Button */}
              <div className="flex justify-end items-center gap-x-4  text-gray-500">
                <div className="hover:scale-90">
                  <Pencil size={16} />
                </div>

                <div className="hover:scale-90 hover:text-red-500">
                  <Trash2 size={16} />
                </div>
              </div>
            </div>
            {item?.chiledren?.length > 0 && (
              <div
                className={`pb-4 border-gray-800  ${
                  index === data.length - 1 ? "" : "border-b"
                }`}
              >
                <div className="pl-10 relative ">
                  <div className="absolute -top-2 bottom-0 left-5 bg-red-300/0 rounded-full border-l-4 -z-10 border-gray-800"></div>

                  <ExtraFieldList data={item?.chiledren} listType="children" />
                </div>
                <div className="pl-[11px] text-xs flex items-center gap-x-4 font-light py-1 opacity-60 cursor-pointer select-none">
                  <span className="bg-gray-700 rounded-full p-1">
                    <Plus size={15} strokeWidth={3} />
                  </span>
                  Add another field to this complex field
                </div>
              </div>
            )}
          </>
        );
      })}
    </>
  );
}
