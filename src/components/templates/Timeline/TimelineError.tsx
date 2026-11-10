import React from "react";

interface TimelineErrorProps {
  loading?: boolean;
  error?: string;
  loadingComponent?: React.ReactNode;
  errorComponent?: React.ReactNode;
}

export const TimelineError: React.FC<TimelineErrorProps> = ({
  loading,
  error,
  loadingComponent,
  errorComponent,
}) => {
  if (loading) {
    if (loadingComponent) return <>{loadingComponent}</>;
    return (
      <div className="w-full h-full p-6 space-y-4 animate-pulse">
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-md w-full" />
        <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-md w-full" />
        <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-md w-full" />
        <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-md w-full" />
      </div>
    );
  }

  if (errorComponent) return <>{errorComponent}</>;

  return (
    <div
      role="alert"
      className="w-full h-full flex flex-col justify-center items-center gap-3 p-8 border rounded-lg bg-red-50 dark:bg-red-950/20 text-center"
    >
      <div className="text-3xl text-red-500 font-bold" aria-hidden="true">
        ⚠
      </div>
      <p className="text-sm font-semibold text-red-600 dark:text-red-400">
        {error || "An unexpected error occurred."}
      </p>
    </div>
  );
};

TimelineError.displayName = "TimelineError";
