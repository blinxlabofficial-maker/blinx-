'use client';

import React from 'react';
import { Monitor, Megaphone, TrendingUp, Settings, Rocket, RefreshCw } from 'lucide-react';
import styles from './FlywheelDiagram.module.css';

interface FlywheelDiagramProps {
  activeStage?: number; // 1 to 5
  onStageClick?: (stage: number) => void;
}

const stages = [
  { id: 1, name: 'Build', number: '01', icon: Monitor, color: 'var(--electric-red)' },
  { id: 2, name: 'Visibility', number: '02', icon: Megaphone, color: 'var(--voltage-yellow)' },
  { id: 3, name: 'Growth', number: '03', icon: TrendingUp, color: 'var(--electric-red)' },
  { id: 4, name: 'Systemize', number: '04', icon: Settings, color: 'var(--voltage-yellow)' },
  { id: 5, name: 'Scale', number: '05', icon: Rocket, color: 'var(--electric-red)' }
];

export const FlywheelDiagram: React.FC<FlywheelDiagramProps> = ({ activeStage = 1, onStageClick }) => {
  const currentStage = stages.find(s => s.id === activeStage) || stages[0];

  return (
    <div className={styles.container} data-testid="flywheel-diagram">
      <div className={styles.diagramWrapper}>
        {/* Background Orbit Ring */}
        <div className={styles.orbitRing} />

        {/* SVG Connecting Paths */}
        <svg className={styles.connections} viewBox="0 0 400 400" aria-hidden="true">
          {/* Base Track */}
          <polygon 
            points="200,45 348,152 292,328 108,328 52,152" 
            fill="none" 
            stroke="rgba(255, 255, 255, 0.08)" 
            strokeWidth="2" 
            strokeDasharray="4 4"
          />
          {/* Active Flowing Line */}
          <polygon 
            points="200,45 348,152 292,328 108,328 52,152" 
            fill="none" 
            stroke="url(#flywheelFlowGradient)" 
            strokeWidth="3" 
            className={styles.flowingStroke}
          />
          <defs>
            <linearGradient id="flywheelFlowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF3C5A" />
              <stop offset="50%" stopColor="#FFAE00" />
              <stop offset="100%" stopColor="#FFD600" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center Core Engine */}
        <div className={styles.centerCore}>
          <div className={styles.centerCoreGlow} />
          <div className={styles.centerCoreContent}>
            <RefreshCw size={18} className={styles.coreIcon} />
            <span className={styles.coreLabel}>MOMENTUM</span>
            <strong className={styles.coreStage}>{currentStage.name}</strong>
          </div>
        </div>
        
        {/* 5 Outer Pentagonal Nodes */}
        {stages.map((stage) => {
          const isActive = activeStage === stage.id;
          const Icon = stage.icon;
          
          return (
            <button 
              key={stage.id}
              className={`${styles.node} ${isActive ? styles.active : ''} ${styles[`node${stage.id}`]}`}
              onClick={() => onStageClick && onStageClick(stage.id)}
              type="button"
              aria-label={`Select stage ${stage.number}: ${stage.name}`}
              aria-pressed={isActive}
            >
              <div className={styles.nodeIconBox}>
                <Icon size={16} style={{ color: isActive ? '#0B0B0D' : stage.color }} />
              </div>
              <div className={styles.nodeContent}>
                <span className={styles.nodeNumber}>{stage.number}</span>
                <span className={styles.nodeName}>{stage.name}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
