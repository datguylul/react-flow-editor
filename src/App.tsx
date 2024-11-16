import {
  addEdge,
  Background,
  Connection,
  Controls,
  Edge,
  EdgeTypes,
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

const data = {
  label: "RuleC1",
  nodes: [
    {
      id: "root-condition-m3i2lrrz",
      position: {
        x: 111,
        y: 86,
      },
      data: {
        condition: "<",
        value: 12,
      },
      type: "condition-node",
      source: "root",
      target: "root-condition-m3i2lrrz",
    },
    {
      id: "root-condition-m3i2lrrz-condition-m3i2lucf",
      position: {
        x: 0,
        y: 172,
      },
      data: {
        condition: "<",
        value: 5,
      },
      type: "condition-node",
      source: "root-condition-m3i2lrrz",
      target: "root-condition-m3i2lrrz-condition-m3i2lucf",
    },
    {
      id: "root-condition-m3i2lrrz-label-m3i2luzb",
      position: {
        x: 222,
        y: 172,
      },
      data: {
        label: "Label",
      },
      type: "label-node",
      source: "root-condition-m3i2lrrz",
      target: "root-condition-m3i2lrrz-label-m3i2luzb",
    },
    {
      id: "root-condition-m3i2lrrz-condition-m3i2lucf-label-m3i2m2qg",
      position: {
        x: 0,
        y: 258,
      },
      data: {
        label: "Label",
      },
      type: "label-node",
      source: "root-condition-m3i2lrrz-condition-m3i2lucf",
      target: "root-condition-m3i2lrrz-condition-m3i2lucf-label-m3i2m2qg",
    },
  ],
};

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

  useEffect(() => {
    setNodes([
      {
        id: "root",
        position: { x: 0, y: 0 },
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
          id: generateId(),
          source: item.source,
          target: item.target,
          type: "run-edge",
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
            // type: "smoothstep",
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
          }}
        >
          <Background />
          <Controls />
          <Panel position="top-right">
            <Button
              onClick={() => {
                onLayout();
              }}
            >
              format
            </Button>
          </Panel>
        </ReactFlow>
      </div>
    </div>
  );
}

export default App;
