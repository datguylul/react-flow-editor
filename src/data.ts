export interface FlowDataNodeProps {
  id?: string;
  position?: {
    x?: number;
    y?: number;
  };
  data?: {
    label?: string;
    condition?: string;
    value?: number;
    tag?: string;
  };
  type?: "condition-node" | "label-node";
  source?: string;
  target?: string;
}

export interface FlowDataProps {
  label?: string;
  rootPosition?: {
    x?: number;
    y?: number;
  };
  nodes: FlowDataNodeProps[];
}

export const data: FlowDataProps = {
  label: "RuleC1",
  rootPosition: {
    x: 375,
    y: 0,
  },
  nodes: [
    {
      id: "root-condition-m3i2lrrz",
      position: {
        x: 375,
        y: 145,
      },
      data: {
        label: "Condition",
        condition: "<",
        value: 12000,
      },
      type: "condition-node",
      source: "root",
      target: "root-condition-m3i2lrrz",
    },
    {
      id: "root-condition-m3i2lrrz-condition-m3i2lucf",
      position: {
        x: 125,
        y: 290,
      },
      data: {
        label: "Condition",
        condition: "<",
        value: 500,
      },
      type: "condition-node",
      source: "root-condition-m3i2lrrz",
      target: "root-condition-m3i2lrrz-condition-m3i2lucf",
    },
    {
      id: "root-condition-m3i2lrrz-label-m3i2luzb",
      position: {
        x: 375,
        y: 290,
      },
      data: {
        label: "Label",
        tag: "<1200",
      },
      type: "label-node",
      source: "root-condition-m3i2lrrz",
      target: "root-condition-m3i2lrrz-label-m3i2luzb",
    },
    {
      id: "root-condition-m3i2lrrz-condition-m3i2lucf-label-m3i2m2qg",
      position: {
        x: 0,
        y: 435,
      },
      data: {
        label: "Label",
        tag: "<500",
      },
      type: "label-node",
      source: "root-condition-m3i2lrrz-condition-m3i2lucf",
      target: "root-condition-m3i2lrrz-condition-m3i2lucf-label-m3i2m2qg",
    },
    {
      id: "root-condition-m3i2lrrz-condition-m3i2lucf-condition-kl010t",
      position: {
        x: 250,
        y: 435,
      },
      data: {
        label: "Condition",
        condition: ">",
        value: 400,
      },
      type: "condition-node",
      source: "root-condition-m3i2lrrz-condition-m3i2lucf",
      target: "root-condition-m3i2lrrz-condition-m3i2lucf-condition-kl010t",
    },
    {
      id: "root-condition-m3i2lrrz-condition-m3i2lucf-condition-kl010t-condition-oea5v7",
      position: {
        x: 125,
        y: 580,
      },
      data: {
        label: "Condition",
        condition: ">",
        value: 450,
      },
      type: "condition-node",
      source: "root-condition-m3i2lrrz-condition-m3i2lucf-condition-kl010t",
      target:
        "root-condition-m3i2lrrz-condition-m3i2lucf-condition-kl010t-condition-oea5v7",
    },
    {
      id: "root-condition-m3i2lrrz-condition-ttbdp3",
      position: {
        x: 625,
        y: 290,
      },
      data: {
        label: "Condition",
        condition: ">",
        value: 800,
      },
      type: "condition-node",
      source: "root-condition-m3i2lrrz",
      target: "root-condition-m3i2lrrz-condition-ttbdp3",
    },
    {
      id: "root-condition-m3i2lrrz-condition-ttbdp3-label-0v43q5",
      position: {
        x: 625,
        y: 435,
      },
      data: {
        label: "Label",
        tag: ">800",
      },
      type: "label-node",
      source: "root-condition-m3i2lrrz-condition-ttbdp3",
      target: "root-condition-m3i2lrrz-condition-ttbdp3-label-0v43q5",
    },
    {
      id: "root-condition-m3i2lrrz-condition-m3i2lucf-condition-kl010t-label-dc7knc",
      position: {
        x: 375,
        y: 580,
      },
      data: {
        label: "Label",
        tag: ">400",
      },
      type: "label-node",
      source: "root-condition-m3i2lrrz-condition-m3i2lucf-condition-kl010t",
      target:
        "root-condition-m3i2lrrz-condition-m3i2lucf-condition-kl010t-label-dc7knc",
    },
  ],
};
