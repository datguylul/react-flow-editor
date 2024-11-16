import {
  addEdge,
  Background,
  Connection,
  Controls,
  Edge,
  EdgeTypes,
  getOutgoers,
  MarkerType,
  Node,
  NodeTypes,
  Panel,
  Position,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import { Button } from "antd";
import { useCallback, useEffect } from "react";
import "./App.css";
import { ConditionNode } from "./components/condition-node";
import { LabelNode } from "./components/label-node";
import { TriggerNode } from "./components/trigger-node";
import { generateId, getLayoutedElements } from "./utils/flow";
import { RunEdge } from "./components/run-edge";
import { data, FlowDataNodeProps, FlowDataProps } from "./data";
import { TestButton } from "./components/test-button";

const nodeTypes: NodeTypes = {
  "trigger-node": TriggerNode,
  "condition-node": ConditionNode,
  "label-node": LabelNode,
};

const edgeTypes: EdgeTypes = {
  "run-edge": RunEdge,
};
function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  const onConnect = useCallback((connection: Connection) => {
    const edge = { ...connection, animated: true, id: `${edges.length} + 1` };

    setEdges((prevEdge) => addEdge(edge, prevEdge));
  }, []);

  const onLayout = useCallback(() => {
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      nodes,
      edges
    );

    setNodes([...layoutedNodes]);
    setEdges([...layoutedEdges]);
  }, [nodes, edges]);

  const getFlowNodes = useCallback(() => {
    const dataNodes: FlowDataNodeProps[] = nodes.slice(1).map((item, index) => {
      const node: FlowDataNodeProps = {
        id: item.id,
        position: {
          x: item.position.x,
          y: item.position.y,
        },
        data: {
          label: item?.data?.label as string | undefined,
          condition: item?.data?.condition as string | undefined,
          value: item?.data?.value as number | undefined,
          tag: item.data?.tag as string | undefined,
        },
        type: item.type,
        source: edges[index]?.source,
        target: edges[index]?.target,
      };

      return node;
    });
    return dataNodes;
  }, []);

  const onSave = useCallback(() => {
    const saved: FlowDataProps = {
      label: nodes[0]?.data?.label ?? "",
      rootPosition: {
        x: nodes[0]?.position.x,
        y: nodes[0]?.position.y,
      },
      nodes: getFlowNodes(),
    };
    console.log("saved", saved);
  }, [getFlowNodes]);

  useEffect(() => {
    setNodes([
      {
        id: "root",
        position: {
          x: data.rootPosition?.x ?? 0,
          y: data.rootPosition?.y ?? 0,
        },
        data: { label: data.label },
        type: "trigger-node",
        targetPosition: Position.Top,
        sourcePosition: Position.Bottom,
      },
      ...data.nodes,
    ]);

    setEdges(
      data.nodes.map((item) => {
        return {
          animated: true,
          id: item.target,
          source: item.source,
          target: item.target,
          data: {
            color1: "#000",
          },
        };
      })
    );
  }, []);

  return (
    <div className="h-screen w-screen bg-slate-200">
      <div className="h-full w-full bg-white">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          defaultEdgeOptions={{
            animated: true,
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
          }}
        >
          <Background />
          <Controls />
          <Panel position="top-right">
            <div className="gap-x-2 w-full flex">
              <TestButton />
              <Button onClick={onLayout}>Format</Button>
              <Button onClick={onSave}>Save</Button>
            </div>
          </Panel>
        </ReactFlow>
      </div>
    </div>
  );
}

export default App;
