"use client";

import axios from "axios";

import { useEffect, useState } from "react";
import VisualEditor from "@/components/VisualEditor";
import JSONEditorView from "@/components/JSONEditorView";

export default function Home() {
  const [data, setData] = useState();
  const [currentTab, setCurrentTab] = useState("jsoneditor");

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
      {/* Tab */}
      <div className="bg-slate-800  flex gap-x-4 rounded mt-10 px-4 py-4 items-center">
        <h1 className="text-2xl flex-1 font-light">
          Configure the extra fields of{" "}
          <span className="font-medium underline">Trade Alert</span>{" "}
        </h1>
        <div
          onClick={() => setCurrentTab("visual")}
          className={` py-3 px-6  rounded font-medium hover:bg-white hover:text-black transition-all duration-200 cursor-pointer ${
            currentTab === "visual"
              ? "bg-white text-black"
              : "bg-slate-500 text-white"
          }`}
        >
          Visual Editor
        </div>
        <div
          onClick={() => setCurrentTab("jsoneditor")}
          className={` py-3 px-6  rounded font-medium hover:bg-white hover:text-black transition-all duration-200 cursor-pointer ${
            currentTab === "jsoneditor"
              ? "bg-white text-black"
              : "bg-slate-500 text-white"
          }`}
        >
          JSON Editor
        </div>
      </div>

      {/* Visual Editor */}
      {currentTab === "visual" ? (
        <div className="my-5">
          <VisualEditor
            data={data}
            modificationAccess={true}
            className="grid-cols-5"
          />
        </div>
      ) : (
        <JSONEditorView data={data} />
      )}

      {/* JSON Editor */}
    </div>
  );
}
