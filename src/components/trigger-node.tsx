import {
  addEdge,
  Handle,
  NodeProps,
  Position,
  useReactFlow,
} from "@xyflow/react";
import { Divider, Tag, Typography } from "antd";
import { FaGear } from "react-icons/fa6";
import { IoAddCircle } from "react-icons/io5";
import { NodeWrapper } from "./node-wrapper";

export const TriggerNode = (props: NodeProps) => {
  const { id, data, positionAbsoluteX, positionAbsoluteY, isConnectable } =
    props;
  const { setNodes, setEdges } = useReactFlow();

  const onAdd = () => {
    const now = Date.now().toString(36);
    setNodes((prevNode) => [
      ...prevNode,
      {
        id: `${id}-condition-${now}`,
        position: { x: positionAbsoluteX, y: positionAbsoluteY + 100 },
        data: { label: "Condition" },
        type: "condition-node",
      },
    ]);

    const edge = {
      animated: true,
      id: `root-condition-${now}`,
      source: "root",
      target: `${id}-condition-${now}`,
    };

    setEdges((prevEdge) => addEdge(edge, prevEdge));
  };

  return (
    <NodeWrapper
      title={data?.label ?? "Rule"}
      subTitle="Trigger when a Deal’s status is updated."
      type="Trigger"
    >
      <Handle
        type="source"
        isConnectable={isConnectable}
        position={Position.Bottom}
        className="opacity-0"
      />

      {/* <div className="bottom-[-12px]">
        <button onClick={onAdd}>
          <IoAddCircle size={15} />
        </button>
      </div> */}
    </NodeWrapper>
  );
};
