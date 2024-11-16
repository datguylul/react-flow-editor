import { Handle, Node, NodeProps, Position } from "@xyflow/react";
import { Select, Typography } from "antd";
import { MdLabel } from "react-icons/md";
type NodeData = { label: string; tag: string };
type NodeDataProps = Node<NodeData, "label">;

export const LabelNode = (props: NodeProps<NodeDataProps>) => {
  const { data } = props;

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <>
      <Handle type="target" position={Position.Top} className="opacity-0" />
      <div className="shadow-md px-4 py-1 items-center rounded-xl bg-white border-sky-100 border-solid border-[1px] flex flex-row gap-x-1">
        <MdLabel size={15} />
        <Typography.Text>{data.tag}</Typography.Text>
        {/* <Select
          defaultValue={data.tag}
          style={{ width: 100, height: 20 }}
          onChange={handleChange}
          variant="borderless"
          options={[
            { value: "jack", label: "Jack" },
            { value: "lucy", label: "Lucy" },
            { value: "Yiminghe", label: "yiminghe" },
          ]}
        /> */}
      </div>
    </>
  );
};
