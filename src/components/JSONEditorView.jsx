"use client";
import React, { useEffect, useRef, useState } from "react";
import VisualEditor from "./VisualEditor";

export default function JSONEditorView({ data }) {
  const [jsonData, setJsonData] = useState("[]");
  const [isValid, setIsValid] = useState(true);
  const [validJsonData, setValidJsonData] = useState("[]");

  const validateJson = (jsonString) => {
    try {
      JSON.parse(jsonString);
      setIsValid(true);
      setValidJsonData(jsonString);
    } catch (error) {
      setIsValid(false);
    }
  };

  console.log(jsonData);

  const onJsonDataChange = (e) => {
    const json = e.target.value;
    setJsonData(json);
    validateJson(json);
  };

  return (
    <div className="my-5 flex justify-between gap-x-5 ">
      <div className="w-[50%] bg-red-400/10 rounded-lg relative">
        <textarea
          name="jsoneditor"
          id="jsoneditor"
          value={jsonData}
          onChange={onJsonDataChange}
          cols="30"
          rows="10"
          resize="none"
          className="text-black w-full h-full focus:outline-none p-5 rounded "
        ></textarea>
        {!isValid && (
          <div className="absolute shadow bg-red-500 text-white px-5 py-2 rounded top-0 right-0 m-2 ">
            <p className="font-medium">Invalid JSON</p>
          </div>
        )}
        {/* <div id="jsonEditor" className="h-[60vh]"></div> */}
      </div>

      <div className="w-[50%] flex-1 rounded-lg border-gray-800">
        <VisualEditor
          data={isValid ? JSON.parse(jsonData) : JSON.parse(validJsonData)}
          modificationAccess={false}
          className="grid-cols-4"
        />
      </div>
    </div>
  );
}

/*
[
  {
    "type": "String",
    "required": true,
    "fieldName": "Trade Id"
  },
  {
    "type": "Date",
    "required": true,
    "fieldName": "Trade Date"
  },
  {
    "type": "Date",
    "required": true,
    "fieldName": "Trade Execution Date"
  },
  {
    "type": "String",
    "required": true,
    "fieldName": "Direction"
  },
  {
    "type": "Number",
    "required": false,
    "fieldName": "Product Name"
  },
  {
    "type": "Object",
    "required": false,
    "chiledren": [
      {
        "type": "Object",
        "required": true,
        "chiledren": [
          {
            "type": "String",
            "required": true,
            "fieldName": "Breakpoint Range"
          },
          {
            "type": "Object",
            "required": false,
            "chiledren": [
              {
                "type": "String",
                "required": true,
                "fieldName": "Breakpoint Range"
              },
              {
                "type": "Boolean",
                "required": false,
                "fieldName": "Breakpoint_Value"
              },
              {
                "type": "Object",
                "required": false,
                "chiledren": [
                  {
                    "type": "String",
                    "required": true,
                    "fieldName": "Breakpoint Range"
                  },
                  {
                    "type": "Number",
                    "required": false,
                    "fieldName": "Breakpoint_Value"
                  },
                  {
                    "type": "Number",
                    "required": false,
                    "fieldName": "Breakpoint_Value"
                  },
                  {
                    "type": "Number",
                    "required": false,
                    "fieldName": "Breakpoint_Value"
                  },
                  {
                    "type": "Number",
                    "required": false,
                    "fieldName": "Breakpoint_Value"
                  }
                ],
                "fieldName": "Breakpoint_Value"
              }
            ],
            "fieldName": "Breakpoint_Value"
          },
          {
            "type": "String",
            "required": true,
            "fieldName": "Breakpoint Range"
          },
          {
            "type": "String",
            "required": true,
            "fieldName": "Breakpoint Range"
          }
        ],
        "fieldName": "Breakpoint Range"
      },
      {
        "type": "Number",
        "required": false,
        "fieldName": "Breakpoint Value"
      },
      {
        "type": "Number",
        "required": false,
        "fieldName": "Breakpoint Value"
      },
      {
        "type": "Number",
        "required": false,
        "fieldName": "Breakpoint Value"
      }
    ],
    "fieldName": "Is Solicited"
  },
  {
    "type": "Object",
    "required": true,
    "chiledren": [
      {
        "type": "String",
        "required": true,
        "fieldName": "Breakpoint Range"
      },
      {
        "type": "Number",
        "required": false,
        "fieldName": "Breakpoint_Value"
      }
    ],
    "fieldName": "Breakpoint Schedule"
  }
]
*/
