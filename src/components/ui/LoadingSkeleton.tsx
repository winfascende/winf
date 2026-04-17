import React from 'react';

export const Skeleton: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`animate-pulse bg-white/5 rounded-lg ${className}`} />
);

export const MetricSkeleton: React.FC = () => (
  <div className="bg-winf-surface border border-winf-border p-6 rounded-3xl space-y-4">
    <div className="flex justify-between items-start">
      <Skeleton className="w-10 h-10 rounded-2xl" />
      <Skeleton className="w-16 h-4" />
    </div>
    <div className="space-y-2">
      <Skeleton className="w-1/2 h-4" />
      <Skeleton className="w-24 h-8" />
    </div>
  </div>
);

export const LeadItemSkeleton: React.FC = () => (
  <div className="p-4 bg-winf-surface_hover/30 border border-winf-border rounded-2xl flex items-center justify-between">
    <div className="flex items-center gap-4">
      <Skeleton className="w-10 h-10 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="w-32 h-4" />
        <Skeleton className="w-24 h-3" />
      </div>
    </div>
    <Skeleton className="w-20 h-6 rounded-full" />
  </div>
);

export const ProductSkeleton: React.FC = () => (
  <div className="bg-zinc-900/50 border border-white/5 rounded-2xl overflow-hidden">
    <Skeleton className="aspect-square w-full" />
    <div className="p-5 space-y-4">
      <div className="space-y-2">
        <Skeleton className="w-3/4 h-5" />
        <Skeleton className="w-1/4 h-3" />
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-white/5">
        <Skeleton className="w-20 h-6" />
        <Skeleton className="w-24 h-10 rounded-xl" />
      </div>
    </div>
  </div>
);
