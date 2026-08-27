import React from "react";
import type { DiagramProps } from "./workspace-types";

const getFill = (index: number, activeIndex?: number) =>
  index === activeIndex ? "var(--brand, #F0531C)" : "#FFFFFF";

const getStroke = (index: number, activeIndex?: number) =>
  index === activeIndex ? "var(--brand, #F0531C)" : "rgba(20, 32, 43, 0.16)";

const getTextColor = (index: number, activeIndex?: number) =>
  index === activeIndex ? "#FFFFFF" : "rgba(20, 32, 43, 0.75)";

export function WorkspaceFlowDiagram({ highlightIndex }: DiagramProps) {
  return (
    <svg viewBox="0 -8 560 184" className="h-full w-full select-none" aria-hidden="true">
      <defs>
        <marker
          id="marker-flow-1"
          viewBox="0 0 8 8"
          refX="6"
          refY="4"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
        >
          <path d="M1 1.5L6 4L1 6.5z" fill="rgba(20, 32, 43, 0.45)" />
        </marker>
      </defs>

      {/* Direct Flow Lines with Arrowheads */}
      <g stroke="rgba(20, 32, 43, 0.2)" strokeWidth="1.5" fill="none">
        {/* Brief → Explore */}
        <line x1="104" y1="33" x2="121" y2="33" markerEnd="url(#marker-flow-1)" />

        {/* Explore → Decision */}
        <line x1="226" y1="33" x2="241" y2="33" markerEnd="url(#marker-flow-1)" />

        {/* Decision → Reuse (yes) */}
        <line x1="350" y1="33" x2="373" y2="33" markerEnd="url(#marker-flow-1)" />

        {/* Decision → New pattern (no) */}
        <line x1="296" y1="63" x2="296" y2="127" markerEnd="url(#marker-flow-1)" />

        {/* New pattern → Add to lib */}
        <line x1="352" y1="145" x2="373" y2="145" markerEnd="url(#marker-flow-1)" />

        {/* Upper branch: Reuse → Trunk (No corner arrow) */}
        <path d="M 466 33 H 482 V 89" />

        {/* Lower branch: Add to lib → Trunk (No corner arrow) */}
        <path d="M 466 145 H 482 V 89" />

        {/* Merged Trunk → Ship (Single final arrow) */}
        <line x1="482" y1="89" x2="495" y2="89" markerEnd="url(#marker-flow-1)" />
      </g>

      {/* Decision Labels */}
      <text
        x="362"
        y="23"
        textAnchor="middle"
        fontSize="10"
        fontFamily="var(--font-mono), monospace"
        fill="rgba(20, 32, 43, 0.55)"
        fontWeight="600"
      >
        yes
      </text>
      <text
        x="308"
        y="98"
        fontSize="10"
        fontFamily="var(--font-mono), monospace"
        fill="rgba(20, 32, 43, 0.55)"
        fontWeight="600"
      >
        no
      </text>

      {/* Nodes */}
      {/* Node 0: Brief */}
      <rect
        x="12"
        y="16"
        width="92"
        height="34"
        rx="6"
        fill={getFill(0, highlightIndex)}
        stroke={getStroke(0, highlightIndex)}
        strokeWidth="1.5"
        className="transition-colors duration-300"
      />
      <text
        x="58"
        y="37.5"
        textAnchor="middle"
        fontSize="11"
        fontWeight="600"
        fontFamily="var(--font-mono), monospace"
        fill={getTextColor(0, highlightIndex)}
      >
        Brief
      </text>

      {/* Node 1: Explore */}
      <rect
        x="122"
        y="16"
        width="104"
        height="34"
        rx="6"
        fill={getFill(1, highlightIndex)}
        stroke={getStroke(1, highlightIndex)}
        strokeWidth="1.5"
        className="transition-colors duration-300"
      />
      <text
        x="174"
        y="37.5"
        textAnchor="middle"
        fontSize="11"
        fontWeight="600"
        fontFamily="var(--font-mono), monospace"
        fill={getTextColor(1, highlightIndex)}
      >
        Explore
      </text>

      {/* Node 2: Decision Diamond */}
      <path
        d="M296 3L350 33 296 63 242 33z"
        fill={getFill(2, highlightIndex)}
        stroke={getStroke(2, highlightIndex)}
        strokeWidth="1.5"
        className="transition-colors duration-300"
      />
      <text
        x="296"
        y="30"
        textAnchor="middle"
        fontSize="10"
        fontWeight="600"
        fontFamily="var(--font-mono), monospace"
        fill={getTextColor(2, highlightIndex)}
      >
        In the
      </text>
      <text
        x="296"
        y="43"
        textAnchor="middle"
        fontSize="10"
        fontWeight="600"
        fontFamily="var(--font-mono), monospace"
        fill={getTextColor(2, highlightIndex)}
      >
        system?
      </text>

      {/* Node 3: Reuse */}
      <rect
        x="374"
        y="16"
        width="92"
        height="34"
        rx="6"
        fill={getFill(3, highlightIndex)}
        stroke={getStroke(3, highlightIndex)}
        strokeWidth="1.5"
        className="transition-colors duration-300"
      />
      <text
        x="420"
        y="37.5"
        textAnchor="middle"
        fontSize="11"
        fontWeight="600"
        fontFamily="var(--font-mono), monospace"
        fill={getTextColor(3, highlightIndex)}
      >
        Reuse
      </text>

      {/* Node 4: New pattern */}
      <rect
        x="242"
        y="128"
        width="110"
        height="34"
        rx="6"
        fill={getFill(4, highlightIndex)}
        stroke={getStroke(4, highlightIndex)}
        strokeWidth="1.5"
        className="transition-colors duration-300"
      />
      <text
        x="297"
        y="149.5"
        textAnchor="middle"
        fontSize="11"
        fontWeight="600"
        fontFamily="var(--font-mono), monospace"
        fill={getTextColor(4, highlightIndex)}
      >
        New pattern
      </text>

      {/* Node 5: Add to lib */}
      <rect
        x="374"
        y="128"
        width="92"
        height="34"
        rx="6"
        fill={getFill(5, highlightIndex)}
        stroke={getStroke(5, highlightIndex)}
        strokeWidth="1.5"
        className="transition-colors duration-300"
      />
      <text
        x="420"
        y="149.5"
        textAnchor="middle"
        fontSize="11"
        fontWeight="600"
        fontFamily="var(--font-mono), monospace"
        fill={getTextColor(5, highlightIndex)}
      >
        Add to lib
      </text>

      {/* Node 6: Ship */}
      <rect
        x="496"
        y="72"
        width="56"
        height="34"
        rx="6"
        fill={getFill(6, highlightIndex)}
        stroke={getStroke(6, highlightIndex)}
        strokeWidth="1.5"
        className="transition-colors duration-300"
      />
      <text
        x="524"
        y="93.5"
        textAnchor="middle"
        fontSize="11"
        fontWeight="600"
        fontFamily="var(--font-mono), monospace"
        fill={getTextColor(6, highlightIndex)}
      >
        Ship
      </text>
    </svg>
  );
}

export function FrontendFlowDiagram({ highlightIndex }: DiagramProps) {
  return (
    <svg viewBox="0 -8 480 160" className="h-full w-full select-none" aria-hidden="true">
      <defs>
        <marker
          id="marker-flow-2"
          viewBox="0 0 8 8"
          refX="6"
          refY="4"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
        >
          <path d="M1 1.5L6 4L1 6.5z" fill="rgba(20, 32, 43, 0.45)" />
        </marker>
      </defs>

      <g stroke="rgba(20, 32, 43, 0.2)" strokeWidth="1.5" fill="none">
        <line x1="110" y1="33" x2="139" y2="33" markerEnd="url(#marker-flow-2)" />
        <line x1="250" y1="33" x2="279" y2="33" markerEnd="url(#marker-flow-2)" />
        <line x1="390" y1="33" x2="409" y2="33" markerEnd="url(#marker-flow-2)" />
      </g>

      <rect
        x="12"
        y="16"
        width="98"
        height="34"
        rx="6"
        fill={getFill(0, highlightIndex)}
        stroke={getStroke(0, highlightIndex)}
        strokeWidth="1.5"
        className="transition-colors duration-300"
      />
      <text
        x="61"
        y="37.5"
        textAnchor="middle"
        fontSize="11"
        fontWeight="600"
        fontFamily="var(--font-mono), monospace"
        fill={getTextColor(0, highlightIndex)}
      >
        Code & UI
      </text>

      <rect
        x="140"
        y="16"
        width="110"
        height="34"
        rx="6"
        fill={getFill(1, highlightIndex)}
        stroke={getStroke(1, highlightIndex)}
        strokeWidth="1.5"
        className="transition-colors duration-300"
      />
      <text
        x="195"
        y="37.5"
        textAnchor="middle"
        fontSize="11"
        fontWeight="600"
        fontFamily="var(--font-mono), monospace"
        fill={getTextColor(1, highlightIndex)}
      >
        TypeScript
      </text>

      <rect
        x="280"
        y="16"
        width="110"
        height="34"
        rx="6"
        fill={getFill(2, highlightIndex)}
        stroke={getStroke(2, highlightIndex)}
        strokeWidth="1.5"
        className="transition-colors duration-300"
      />
      <text
        x="335"
        y="37.5"
        textAnchor="middle"
        fontSize="11"
        fontWeight="600"
        fontFamily="var(--font-mono), monospace"
        fill={getTextColor(2, highlightIndex)}
      >
        Optimize
      </text>

      <rect
        x="410"
        y="16"
        width="60"
        height="34"
        rx="6"
        fill={getFill(3, highlightIndex)}
        stroke={getStroke(3, highlightIndex)}
        strokeWidth="1.5"
        className="transition-colors duration-300"
      />
      <text
        x="440"
        y="37.5"
        textAnchor="middle"
        fontSize="11"
        fontWeight="600"
        fontFamily="var(--font-mono), monospace"
        fill={getTextColor(3, highlightIndex)}
      >
        Deploy
      </text>

      <text
        x="240"
        y="80"
        textAnchor="middle"
        fontSize="10.5"
        fontWeight="500"
        fontFamily="var(--font-mono), monospace"
        fill="rgba(20, 32, 43, 0.4)"
      >
        next.js · react · typescript · tailwind
      </text>
    </svg>
  );
}

export function DesignSystemFlowDiagram({ highlightIndex }: DiagramProps) {
  return (
    <svg viewBox="0 -8 480 160" className="h-full w-full select-none" aria-hidden="true">
      <defs>
        <marker
          id="marker-flow-3"
          viewBox="0 0 8 8"
          refX="6"
          refY="4"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
        >
          <path d="M1 1.5L6 4L1 6.5z" fill="rgba(20, 32, 43, 0.45)" />
        </marker>
      </defs>

      <g stroke="rgba(20, 32, 43, 0.2)" strokeWidth="1.5" fill="none">
        <line x1="90" y1="33" x2="119" y2="33" markerEnd="url(#marker-flow-3)" />
        <line x1="210" y1="33" x2="239" y2="33" markerEnd="url(#marker-flow-3)" />
        <line x1="340" y1="33" x2="369" y2="33" markerEnd="url(#marker-flow-3)" />
      </g>

      <rect
        x="12"
        y="16"
        width="78"
        height="34"
        rx="6"
        fill={getFill(0, highlightIndex)}
        stroke={getStroke(0, highlightIndex)}
        strokeWidth="1.5"
        className="transition-colors duration-300"
      />
      <text
        x="51"
        y="37.5"
        textAnchor="middle"
        fontSize="11"
        fontWeight="600"
        fontFamily="var(--font-mono), monospace"
        fill={getTextColor(0, highlightIndex)}
      >
        Tokens
      </text>

      <rect
        x="120"
        y="16"
        width="90"
        height="34"
        rx="6"
        fill={getFill(1, highlightIndex)}
        stroke={getStroke(1, highlightIndex)}
        strokeWidth="1.5"
        className="transition-colors duration-300"
      />
      <text
        x="165"
        y="37.5"
        textAnchor="middle"
        fontSize="11"
        fontWeight="600"
        fontFamily="var(--font-mono), monospace"
        fill={getTextColor(1, highlightIndex)}
      >
        Component
      </text>

      <rect
        x="240"
        y="16"
        width="100"
        height="34"
        rx="6"
        fill={getFill(2, highlightIndex)}
        stroke={getStroke(2, highlightIndex)}
        strokeWidth="1.5"
        className="transition-colors duration-300"
      />
      <text
        x="290"
        y="37.5"
        textAnchor="middle"
        fontSize="11"
        fontWeight="600"
        fontFamily="var(--font-mono), monospace"
        fill={getTextColor(2, highlightIndex)}
      >
        Pattern
      </text>

      <rect
        x="370"
        y="16"
        width="90"
        height="34"
        rx="6"
        fill={getFill(3, highlightIndex)}
        stroke={getStroke(3, highlightIndex)}
        strokeWidth="1.5"
        className="transition-colors duration-300"
      />
      <text
        x="415"
        y="37.5"
        textAnchor="middle"
        fontSize="11"
        fontWeight="600"
        fontFamily="var(--font-mono), monospace"
        fill={getTextColor(3, highlightIndex)}
      >
        Page
      </text>

      <text
        x="240"
        y="80"
        textAnchor="middle"
        fontSize="10.5"
        fontWeight="500"
        fontFamily="var(--font-mono), monospace"
        fill="rgba(20, 32, 43, 0.4)"
      >
        tokens → components → patterns → pages
      </text>
    </svg>
  );
}

export function ProductDesignFlowDiagram({ highlightIndex }: DiagramProps) {
  return (
    <svg viewBox="0 -8 560 160" className="h-full w-full select-none" aria-hidden="true">
      <defs>
        <marker
          id="marker-flow-4"
          viewBox="0 0 8 8"
          refX="6"
          refY="4"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
        >
          <path d="M1 1.5L6 4L1 6.5z" fill="rgba(20, 32, 43, 0.45)" />
        </marker>
      </defs>

      <g stroke="rgba(20, 32, 43, 0.2)" strokeWidth="1.5" fill="none">
        <line x1="90" y1="33" x2="111" y2="33" markerEnd="url(#marker-flow-4)" />
        <line x1="202" y1="33" x2="223" y2="33" markerEnd="url(#marker-flow-4)" />
        <line x1="314" y1="33" x2="335" y2="33" markerEnd="url(#marker-flow-4)" />
        <line x1="426" y1="33" x2="447" y2="33" markerEnd="url(#marker-flow-4)" />
      </g>

      <rect
        x="12"
        y="16"
        width="78"
        height="34"
        rx="6"
        fill={getFill(0, highlightIndex)}
        stroke={getStroke(0, highlightIndex)}
        strokeWidth="1.5"
        className="transition-colors duration-300"
      />
      <text
        x="51"
        y="37.5"
        textAnchor="middle"
        fontSize="10"
        fontWeight="600"
        fontFamily="var(--font-mono), monospace"
        fill={getTextColor(0, highlightIndex)}
      >
        Research
      </text>

      <rect
        x="112"
        y="16"
        width="90"
        height="34"
        rx="6"
        fill={getFill(1, highlightIndex)}
        stroke={getStroke(1, highlightIndex)}
        strokeWidth="1.5"
        className="transition-colors duration-300"
      />
      <text
        x="157"
        y="37.5"
        textAnchor="middle"
        fontSize="10"
        fontWeight="600"
        fontFamily="var(--font-mono), monospace"
        fill={getTextColor(1, highlightIndex)}
      >
        Define
      </text>

      <rect
        x="224"
        y="16"
        width="90"
        height="34"
        rx="6"
        fill={getFill(2, highlightIndex)}
        stroke={getStroke(2, highlightIndex)}
        strokeWidth="1.5"
        className="transition-colors duration-300"
      />
      <text
        x="269"
        y="37.5"
        textAnchor="middle"
        fontSize="10"
        fontWeight="600"
        fontFamily="var(--font-mono), monospace"
        fill={getTextColor(2, highlightIndex)}
      >
        Design
      </text>

      <rect
        x="336"
        y="16"
        width="90"
        height="34"
        rx="6"
        fill={getFill(3, highlightIndex)}
        stroke={getStroke(3, highlightIndex)}
        strokeWidth="1.5"
        className="transition-colors duration-300"
      />
      <text
        x="381"
        y="37.5"
        textAnchor="middle"
        fontSize="10"
        fontWeight="600"
        fontFamily="var(--font-mono), monospace"
        fill={getTextColor(3, highlightIndex)}
      >
        Test
      </text>

      <rect
        x="448"
        y="16"
        width="60"
        height="34"
        rx="6"
        fill={getFill(4, highlightIndex)}
        stroke={getStroke(4, highlightIndex)}
        strokeWidth="1.5"
        className="transition-colors duration-300"
      />
      <text
        x="478"
        y="37.5"
        textAnchor="middle"
        fontSize="11"
        fontWeight="600"
        fontFamily="var(--font-mono), monospace"
        fill={getTextColor(4, highlightIndex)}
      >
        Ship
      </text>

      <text
        x="280"
        y="80"
        textAnchor="middle"
        fontSize="10"
        fontWeight="500"
        fontFamily="var(--font-mono), monospace"
        fill="rgba(20, 32, 43, 0.4)"
      >
        discovery → definition → design → validation → delivery
      </text>
    </svg>
  );
}

export const WORKSPACE_DIAGRAM_COMPONENTS = [
  WorkspaceFlowDiagram,
  FrontendFlowDiagram,
  DesignSystemFlowDiagram,
  ProductDesignFlowDiagram,
];
