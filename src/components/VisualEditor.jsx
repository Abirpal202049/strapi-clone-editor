import { Plus } from "lucide-react";
import ExtraFieldList from "@/components/ExtraFieldList";
import { cn } from "@/lib/utils";

export default function VisualEditor({ data, className, modificationAccess }) {
  return (
    <div className="border border-gray-800  rounded flex flex-col text-sm w-full">
      <div
        className={cn(
          "bg-gray-800 p-4 grid text-base font-medium px-10",
          className
        )}
      >
        <h2 className="col-span-2">Field Name</h2>
        <h2 className={`flex ${modificationAccess ? "" : "justify-center"} `}>
          Field Type
        </h2>
        <h2 className={`flex ${modificationAccess ? "" : "justify-end"} `}>
          Required
        </h2>
      </div>
      <div className="px-8">
        <ExtraFieldList
          data={data}
          modificationAccess={modificationAccess}
          className={className}
        />
      </div>

      {/* If no modification access then you can add element */}
      {modificationAccess && (
        <div className="p-4 border-t border-slate-900 bg-slate-900 rounded-b">
          <div className="pl-[11px] text-xs flex items-center gap-x-4 font-light py-1 opacity-60 cursor-pointer select-none">
            <span className="bg-gray-700 rounded-full p-1">
              <Plus size={15} strokeWidth={3} />
            </span>
            Add another single field to this alert-type
          </div>
        </div>
      )}
    </div>
  );
}
