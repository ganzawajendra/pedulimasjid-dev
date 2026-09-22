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
    <div id={id} className={`p-5 ${className}`.trim()}>
      <div className="flex gap-2 items-center">
        {isProblem ? <X color="#ff0000" /> : <Check color="#22c55e" />}
        <h4 className="text-lg font-semibold">{title}</h4>
      </div>
      {list ? (
        <ul className="pl-10 list-disc">
          {list.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ) : (
        children
      )}
    </div>
  );
}