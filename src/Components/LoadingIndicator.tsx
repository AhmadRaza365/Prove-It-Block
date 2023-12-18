import React from "react";

type Props = {
  text: string;
  showText: boolean;
  loaderClassNames?: string;
};

function LoadingIndicator({
  text,
  showText,
  loaderClassNames = "w-8 h-8 border-black dark:border-white",
}: Props) {
  return (
    <div className="flex justify-center items-center gap-x-4">
      <span
        className={`loader ${loaderClassNames} `}
      ></span>
      {showText && <p className="">{text}</p>}
    </div>
  );
}

export default LoadingIndicator;