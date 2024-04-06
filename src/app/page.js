"use client";

import { Plus } from "lucide-react";
import ExtraFieldList from "@/components/ExtraFieldList";
import axios from "axios";

import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState();

  const fetechData = async () => {
    const res = await axios.get("https://api.npoint.io/0d656a8c1ae346b1171d");
    console.log("RESULT", res.data);
    setData(res.data);
  };

  useEffect(() => {
    fetechData();
  }, []);

  return (
    <div className="container mx-auto ">


      <div className="border border-gray-800 m-10  rounded flex flex-col text-sm max-w-[1200px] mx-auto">
        <div className="bg-gray-800 p-4 grid grid-cols-4 text-base font-medium px-10">
          <h2>Field Name</h2>
          <h2>Field Type</h2>
          <h2>Required</h2>
        </div>
        <div className="px-8">
          <ExtraFieldList data={data} />
        </div>
        <div className="p-4 border-t border-slate-900 bg-slate-900 rounded-b">
          <div className="pl-[11px] text-xs flex items-center gap-x-4 font-light py-1 opacity-60 cursor-pointer select-none">
            <span className="bg-gray-700 rounded-full p-1">
              <Plus size={15} strokeWidth={3} />
            </span>
            Add another single field to this alert-type
          </div>
        </div>
      </div>
    </div>
  );
}
