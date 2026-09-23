import { Check, X } from "lucide-react";
import React from "react";

interface ProblemSolutionCardProps {
  id?: string;
  type?: "problem" | "solution";
  title: string;
  list?: string[];
  children?: React.ReactNode;
  className?: string;
}

export default function ProblemSolutionCard({
  id,
  type,
  title,
  list,
  children,
  className = "",
}: ProblemSolutionCardProps) {
  const cardType = type || (id === "solution" ? "solution" : "problem");
  const isProblem = cardType === "problem";

  return (
    <div
      id={id}
      className={`p-6 md:p-8 bg-neutral-50 border border-neutral-300 rounded-xl shadow-xs hover:shadow-md transition-all flex flex-col justify-between ${className}`.trim()}
    >
      <div>
        <div className="flex gap-2.5 items-center mb-4">
          {isProblem ? <X color="#ff0000" className="shrink-0" /> : <Check color="#22c55e" className="shrink-0" />}
          <h4 className="text-lg font-semibold text-neutral-900">{title}</h4>
        </div>
        {list ? (
          <ul className="pl-10 list-disc space-y-2.5 text-sm text-neutral-600 leading-relaxed">
            {list.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        ) : (
          children
        )}
      </div>
    </div>
  );
}