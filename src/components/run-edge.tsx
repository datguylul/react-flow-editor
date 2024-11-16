import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getSimpleBezierPath,
} from "@xyflow/react";
import { Typography } from "antd";

export function RunEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  label,
  markerEnd,
}: EdgeProps) {
  const [edgePath, labelX, labelY] = getSimpleBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <BaseEdge
        path={edgePath}
        markerEnd={markerEnd}
        style={{ stroke: "#48BB78", strokeWidth: 4 }}
      />

      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontSize: 12,
            backgroundColor: "#EEF0F6",
            fill: "#EEF0F6",
            pointerEvents: "all",
            padding: "0px",
          }}
        >
          <Typography.Text>{label}</Typography.Text>
        </div>
      </EdgeLabelRenderer>

      <circle
        style={{ filter: `drop-shadow(3px 3px 5px #48BB78)` }}
        r="4"
        fill={"#48BB78"}
        className="circle"
      >
        <animateMotion dur="6s" repeatCount="indefinite" path={edgePath} />
      </circle>
    </>
  );
}
