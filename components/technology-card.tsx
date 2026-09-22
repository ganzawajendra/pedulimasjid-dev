import React from "react";

interface TechnologyCardProps {
  badge: string;
  title: string;
  description: string;
  keyFeatures: string;
  icon?: React.ReactNode;
  className?: string;
}

export default function TechnologyCard({
  badge,
  title,
  description,
  keyFeatures,
  icon,
  className = "",
}: TechnologyCardProps) {
  return (
    <div
      className={`flex flex-col justify-between p-8 bg-neutral-50 border border-neutral-300 rounded-xl shadow-xs hover:shadow-md transition-all ${className}`.trim()}
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold px-3 py-1 bg-black text-white rounded-full">
            {badge}
          </span>
          {icon && <div className="text-neutral-700">{icon}</div>}
        </div>
        <h4 className="text-xl font-semibold text-neutral-900 mb-3">
          {title}
        </h4>
        <p className="text-neutral-600 text-sm leading-relaxed mb-6">
          {description}
        </p>
      </div>

      <div className="border-t border-neutral-200 pt-4 mt-2">
        <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1">
          Fitur Kunci
        </p>
        <p className="text-sm font-medium text-neutral-800 leading-snug">
          {keyFeatures}
        </p>
      </div>
    </div>
  );
}
