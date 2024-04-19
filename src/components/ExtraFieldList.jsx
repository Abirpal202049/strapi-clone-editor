import { cn } from "@/lib/utils";
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

export default function ExtraFieldList({
  data,
  listType,
  modificationAccess,
  className,
  itemLength,
}) {
  return (
    <>
      {data?.map((item, index) => {
        return (
          <>
            <div
              key={index}
              className={cn(
                `grid py-4 px-2 cursor-pointer relative ${
                  index === data.length - 1 || item?.chiledren?.length > 0
                    ? ""
                    : "border-gray-800 border-b"
                }`,
                className
              )}
            >
              {/* Curve  */}
              {listType === "children" && (
                <div className="absolute -left-[20.5px] top-2 select-none">
                  <Image src="./box.svg" width={20} height={23} />
                </div>
              )}
              <div className="font-semibold flex items-center gap-x-4 col-span-2 ">
                <div className="select-none w-[10%]">
                  <Image
                    src={typeObjectIcon[item?.type]}
                    width={30}
                    height={30}
                    className="w-[30px]"
                  />
                </div>
                <div className="flex overflow-x-clip">{item?.fieldName}</div>
              </div>

              <h3
                className={`flex ${
                  modificationAccess ? "" : "justify-center"
                } `}
              >
                {item?.type}
              </h3>
              <h3
                className={`flex ${modificationAccess ? "" : "justify-end"} `}
              >
                {item?.required ? "true" : "false"}
              </h3>

              {/* Edit and Delete Button */}
              {modificationAccess && (
                <div className="flex justify-end items-center gap-x-4  text-gray-500">
                  <div className="hover:scale-90">
                    <Pencil size={16} />
                  </div>

                  <div className="hover:scale-90 hover:text-red-500">
                    <Trash2 size={16} />
                  </div>
                </div>
              )}
            </div>

            {/* Recursion */}
            {item?.chiledren?.length > 0 && (
              <div
                className={`pb-4 border-gray-800  ${
                  index === data.length - 1 ? "" : "border-b"
                }`}
              >
                <div className="pl-10 relative ">
                  {/* side line */}
                  <div
                    className={`absolute -top-2 ${
                      modificationAccess ? "bottom-0" : "bottom-12"
                    } left-5 bg-red-300/0 rounded-full border-l-4 -z-10 border-gray-800`}
                  ></div>

                  {/* {index} - {item?.type} - {item?.chiledren?.length} - {itemLength -1 } */}
                  {/* ✨ Nice Approach */}
                  {!modificationAccess && index === itemLength - 1 && (
                    <div className="select-none">
                      <div className="absolute border-l-4 -top-[50px] rounded-b-full -left-5 bottom-5 border-black "></div>
                      <div className="absolute -top-[54px] -left-[20.5px]">
                        <Image src="./box.svg" width={20} height={23} />
                      </div>
                    </div>
                  )}

                  <ExtraFieldList
                    data={item?.chiledren}
                    listType="children"
                    modificationAccess={modificationAccess}
                    className={className}
                    itemLength={item?.chiledren?.length}
                  />
                </div>
                {modificationAccess && (
                  <div className="pl-[11px] text-xs flex items-center gap-x-4 font-light py-1 opacity-60 cursor-pointer select-none">
                    <span className="bg-gray-700 rounded-full p-1">
                      <Plus size={15} strokeWidth={3} />
                    </span>
                    Add another field to this complex field
                  </div>
                )}
              </div>
            )}
          </>
        );
      })}
    </>
  );
}
