import { Divider, Tag } from "antd";
import { PropsWithChildren } from "react";

interface NodeWrapperProps extends PropsWithChildren {
  title?: string;
  subTitle?: string;
  type?: string;
}

export const NodeWrapper = (props: NodeWrapperProps) => {
  const { title, subTitle, type, children } = props;
  return (
    <div className="p-1 bg-white border-[1px] border-solid border-slate-500 rounded-md w-[200px]">
      <div className="flex flex-row gap-x-1 items-center justify-between">
        <p className="text-xs">{title}</p>
        <div className="py-[1px] px-[3px] bg-slate-300 rounded-md">
          <p className="text-[8px]">{type}</p>
        </div>
      </div>
      <Divider className="my-1" />
      <p className="text-[8px] mt-0 text-[#8f99ab]">{subTitle}</p>
      {children}
    </div>
  );
};
