import { cn } from "@/lib/utils";
import type { EnergyRating as Rating } from "@/types/property";

const SCALE: { grade: Rating; color: string }[] = [
  { grade: "A", color: "#2ea24a" },
  { grade: "B", color: "#5fbf3f" },
  { grade: "C", color: "#c3d117" },
  { grade: "D", color: "#f6d011" },
  { grade: "E", color: "#f2a30f" },
  { grade: "F", color: "#e8720c" },
  { grade: "G", color: "#e0231a" },
];

export function EnergyRating({ value }: { value: Rating }) {
  return (
    <div className="space-y-1.5">
      {SCALE.map(({ grade, color }, i) => {
        const active = grade === value;
        return (
          <div
            key={grade}
            className={cn(
              "flex items-center rounded-r-md text-sm font-semibold text-white transition-all",
              active ? "opacity-100" : "opacity-35",
            )}
            style={{
              backgroundColor: color,
              width: `${45 + i * 8}%`,
            }}
          >
            <span className="px-3 py-1">{grade}</span>
            {active && (
              <span className="ml-auto px-3 py-1 text-xs font-medium">
                Ce logement
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
