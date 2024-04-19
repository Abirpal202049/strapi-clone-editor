"use client";
import React, { useEffect, useRef, useState } from "react";
import VisualEditor from "./VisualEditor";
import validate from "@/lib/Ajv";
import EditorJSON from "../../trial";

export default function JSONEditorView({ data }) {
  const [jsonData, setJsonData] = useState("[]");
  const [isValid, setIsValid] = useState(true);
  const [validJsonData, setValidJsonData] = useState("[]");
  const [errormsg, setErrormsg] = useState(null);

  const validateJson = (jsonString) => {
    // JSON.parse(jsonString);
    let rawjson;
    try {
      rawjson = JSON.parse(jsonString);
    } catch (error) {
      setIsValid(false);
      setErrormsg("Invalid JSON syntext");
      return;
    }
    const isValid = validate(rawjson);
    setIsValid(isValid);
    if (isValid) {
      setValidJsonData(jsonString);
      setErrormsg(null);
    } else setErrormsg(validate.errors?.[0]?.message);
  };

  console.log(jsonData);
  console.log("errormsg: ", errormsg, isValid);

  const onJsonDataChange = (e) => {
    const json = e.target.value;
    setJsonData(json);
    validateJson(json);
    // console.log("json: ", json);
  };

  return (
    <div className="my-5 flex justify-between gap-x-5 ">
      <div className="w-1/2 bg-red-400/10 rounded-lg relative">
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
        {errormsg && (
          <div className="shadow bg-red-500 text-white px-5 py-2 rounded m-2">
            <p className="font-medium">{errormsg}</p>
          </div>
        )}
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
