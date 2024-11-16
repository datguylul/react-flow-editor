import { getOutgoers, Node, useReactFlow } from "@xyflow/react";
import { Button, Input } from "antd";
import { useCallback, useState } from "react";
import { checkCondition } from "../utils/condition";

export function TestButton() {
  const { getNodes, setNodes, setEdges, getEdges, getEdge } = useReactFlow();
  const [input, setInput] = useState<number>(0);

  const setValidateNode = useCallback((id) => {
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            data: {
              ...node.data,
              validate: true,
            },
          };
        }
        return node;
      })
    );
  }, []);

  const handleCheckOutgoer = useCallback((nodes: Node, input: number) => {
    const outGoers = getOutgoers({ id: nodes?.id }, getNodes(), getEdges());
    if (outGoers.length === 0) return;

    // console.log("[TRACE] outGoers", outGoers);
    outGoers.forEach((item) => {
      if (item.type === "condition-node") {
        if (checkCondition(input, item.data.value ?? 0, item.data.condition)) {
          // console.log("[TRACE] checkCondition", item);

          const edges = handleSetEdges(item.id);
          setEdges(edges);

          setValidateNode(item.id);

          setTimeout(() => {
            handleCheckOutgoerLabel(item);
          }, 50);
          setTimeout(() => {
            handleCheckOutgoer(item, input);
          }, 100);
        }
      }
    });
  }, []);

  const handleCheckOutgoerLabel = useCallback(
    (nodes: Node) => {
      const outGoers = getOutgoers({ id: nodes?.id }, getNodes(), getEdges());
      if (outGoers.length === 0) return;
      // console.log("[TRACE] handleCheckOutgoerLabel", outGoers);

      outGoers.forEach((item) => {
        if (item.type === "label-node") {
          const edges = handleSetEdges(item.id);
          setEdges(edges);
          setValidateNode(item.id);
        }
      });
    },
    [setValidateNode]
  );

  const handleSetEdges = useCallback((id: string) => {
    return getEdges().map((edge) => {
      if (edge.id === id) {
        return { ...edge, type: "run-edge" };
      }
      return edge;
    });
  }, []);

  const reset = useCallback(() => {
    const edges = getEdges().map((edge) => {
      return { ...edge, type: "" };
    });

    setEdges(edges);
    const nodes = getNodes().map((node) => {
      return {
        ...node,
        data: {
          ...node.data,
          validate: false,
        },
      };
    });
    setNodes(nodes);
  }, []);

  const onTest = useCallback(() => {
    reset();
    setTimeout(() => {
      handleCheckOutgoer(getNodes()[0], input);
    }, 50);
  }, [handleCheckOutgoer, reset, input]);

  return (
    <div>
      <input
        type="number"
        className="border-[1px] border-solid border-slate-600"
        onChange={(event) => setInput(Number(event.target.value))}
      />
      <Button onClick={onTest}>Test</Button>
    </div>
  );
}
