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
type NodeData = { condition: string; value: number; validate: boolean };
type NodeDataProps = Node<NodeData, "label">;

export const ConditionNode = (props: NodeProps<NodeDataProps>) => {
  const { id, data, positionAbsoluteX, positionAbsoluteY, isConnectable } =
    props;

  const { condition, value, validate = false } = data;
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
        subTitle={`${condition} ${(value ?? 0).toLocaleString()}`}
        type="Condition"
        validate={validate}
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
};
