import {
  addEdge,
  getOutgoers,
  Handle,
  Node,
  NodeProps,
  NodeToolbar,
  Position,
  useReactFlow,
} from "@xyflow/react";
import { Button } from "antd";
import { useCallback } from "react";
import { generateId } from "../utils/flow";
import { NodeWrapper } from "./node-wrapper";
type NodeData = { condition: string; value: number };
type NodeDataProps = Node<NodeData, "label">;

export const ConditionNode = (props: NodeProps<NodeDataProps>) => {
  const { id, data, positionAbsoluteX, positionAbsoluteY, isConnectable } =
    props;

  const { condition, value } = data;
  const { getNodes, setNodes, setEdges, getEdges } = useReactFlow();

  const handleAddCondition = useCallback(() => {
    const childId = generateId();
    setNodes((prevNode) => [
      ...prevNode,
      {
        id: `${id}-condition-${childId}`,
        position: { x: positionAbsoluteX, y: positionAbsoluteY + 100 },
        data: { label: "Condition" },
        type: "condition-node",
      },
    ]);

    const edge = {
      animated: true,
      id: `${id}-condition-${childId}`,
      source: `${id}`,
      target: `${id}-condition-${childId}`,
    };

    setEdges((prevEdge) => addEdge(edge, prevEdge));
  }, []);

  const handleAddLabel = useCallback(() => {
    const childId = generateId();
    setNodes((prevNode) => [
      ...prevNode,
      {
        id: `${id}-label-${childId}`,
        position: { x: positionAbsoluteX, y: positionAbsoluteY + 100 },
        data: { label: "Label" },
        type: "label-node",
      },
    ]);

    const edge = {
      animated: true,
      id: `${id}-${id}-label-${childId}`,
      source: `${id}`,
      target: `${id}-label-${childId}`,
    };

    setEdges((prevEdge) => addEdge(edge, prevEdge));
  }, []);

  const checkLabelExist = useCallback((): boolean => {
    const outgoers = getOutgoers({ id }, getNodes(), getEdges());
    if (outgoers.length === 0) return false;

    for (let index = 0; index < outgoers.length; index++) {
      if (outgoers[index]?.type === "label-node") return true;
    }

    return false;
  }, []);

  return (
    <>
      <NodeToolbar>
        <Button onClick={handleAddCondition}>Add condition</Button>
        {checkLabelExist() ? undefined : (
          <Button onClick={handleAddLabel}>Add label</Button>
        )}
      </NodeToolbar>
      <Handle type="target" position={Position.Top} style={{ opacity: 0 }} />
      <NodeWrapper
        title={data?.label ?? ""}
        subTitle={`${condition} ${value}`}
        type="Condition"
      ></NodeWrapper>
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        style={{ opacity: 0 }}
        isConnectable={isConnectable}
      />
    </>
  );

  return (
    <>
      <div className="shadow-md px-4 py-1 rounded-xl bg-green-300 border-sky-100 border-solid border-[1px]">
        <p className="text-xs">
          {condition} {value}
        </p>
      </div>
      {/* <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        style={{ background: "#000", left: "auto", right: 10, opacity: 0 }}
        isConnectable={isConnectable}
      /> */}
    </>
  );
};
