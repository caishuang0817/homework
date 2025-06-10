import React, { useState } from 'react';
import './AchievementSystem.css';

interface Achievement {
  icon: string;
  name: string;
  description: string;
  exp: number;
  unlockPercentage: string;
}

interface AchievementSystemProps {
  title: string;
  availableAchievements: number;
  availableExp: number;
  achievements: Achievement[];
  coverImage: string;
  onBack: () => void;
}

export const AchievementSystem: React.FC<AchievementSystemProps> = ({ title, availableAchievements, availableExp, achievements, coverImage, onBack }) => {
  const [sortType, setSortType] = useState<number>(1);

  // 排序逻辑
  const sortedAchievements = [...achievements].sort((a, b) => {
    switch (sortType) {
      case 1: // 按字母顺序
        return a.name.localeCompare(b.name, 'zh-Hans-CN');
      case 2: // 进度：由高至低
        return parseFloat(b.unlockPercentage) - parseFloat(a.unlockPercentage);
      case 3: // 进度：由低至高
        return parseFloat(a.unlockPercentage) - parseFloat(b.unlockPercentage);
      case 4: // 经验值：由高至低
        return b.exp - a.exp;
      case 5: // 经验值：由低至高
        return a.exp - b.exp;
      default:
        return 0;
    }
  });

  return (
    <div className="achievement-system-container">
      <div className="achievement-header">
        <h1 className="achievement-title">{title}</h1>
      </div>
      <div className="achievement-nav">
        <span className="nav-item">总览</span>
        <span className="nav-item active">成就系统</span>
      </div>
      <div className="achievement-overview">
        <div className="overview-left">
          <img src={coverImage} alt={title} className="game-cover" />
        </div>
        <div className="overview-right">
          <div className="stat-item">
            <span className="stat-label">可用成就</span>
            <span className="stat-value">{availableAchievements}<span className="stat-value"> 项成就</span></span>
          </div>
          <div className="stat-item">
            <span className="stat-label">可用经验值</span>
            <span className="stat-value">{availableExp}<span className="stat-value"> 经验值</span></span>
          </div>
        </div>
      </div>
      {/* 成就系统列表区域 */}
      <div className="achievements-list-section">
        <h3 className="section-title">成就系统 ({availableAchievements})</h3>
        <div className="sort-option">
          <span>排序方式: </span>
          <select value={sortType} onChange={e => setSortType(Number(e.target.value))}>
            <option value={1}>按字母顺序</option>
            <option value={2}>进度：由高至低</option>
            <option value={3}>进度：由低至高</option>
            <option value={4}>经验值：由高至低</option>
            <option value={5}>经验值：由低至高</option>
          </select>
        </div>
        <div className="achievements-grid">
          {sortedAchievements.map((achievement, index) => (
            <div key={index} className="achievement-item">
              <img src={achievement.icon} alt={achievement.name} className="achievement-icon" />
              <div className="achievement-details">
                <div className="achievement-name">{achievement.name}</div>
                <div className="achievement-description">{achievement.description}</div>
                <div className="achievement-stats">
                  <span className="achievement-unlock-percentage">{achievement.exp} 经验值</span>
                  <span className="achievement-unlock-percentage">|</span>
                  <span className="achievement-unlock-percentage">{achievement.unlockPercentage} 的玩家已解锁</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 