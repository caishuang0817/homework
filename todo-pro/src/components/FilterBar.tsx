import { useState, useEffect } from "react";
import './FilterBar.css';
import { AchievementSystem } from './AchievementSystem';

const banners = [
  {
    src: "https://cdn2.unrealengine.com/zh-cn-mega-sale-3up-ms-banner-asset-1920x1080-e856160e3f8f.jpg?resize=1&w=854&h=480&quality=medium",
    alt: "大特卖"
  },
  {
    src: "https://cdn2.unrealengine.com/zhcn-rewards-boosted-breaker-asset-0e035d40e0ed.avif?resize=1&w=854&h=480&quality=medium",
    alt: "奖励升级"
  },
  {
    src: "https://cdn2.unrealengine.com/zh-cn-mega-sale-3up-fg-banner-asset-1920x1080-9903363bd29b.jpg?resize=1&w=854&h=480&quality=medium",
    alt: "精选大放送"
  }
];

const carouselData = {
  sideItems: [
    {
      src: "https://cdn2.unrealengine.com/egs-ea-fc-25-standard-edition-carousel-desktop-1920x1080-acb7fd6bf969.jpg?resize=1&w=1280&h=720&quality=medium",
      title: "《Grand Theft Auto V》\nEnhanced"
    },
    {
      src: "https://cdn2.unrealengine.com/egs-red-dead-redemption-2-carousel-desktop-2560x1440-45c7720177f3.jpg?resize=1&w=1280&h=720&quality=medium",
      title: "《Blades of Fire》"
    },
    {
      src: "https://cdn2.unrealengine.com/egs-popucom-carousel-desktop-v2-1920x1080-44efcd1fb118.jpeg?resize=1&w=1280&h=720&quality=medium",
      title: "《EA SPORTS FC™ 25》\n标准版"
    },
    {
      src: "https://cdn2.unrealengine.com/egs-crystal-of-atlan-carousel-desktop-1920x1080-e1326f2ad2b5.jpg?resize=1&w=1280&h=720&quality=medium",
      title: "《晶核》"
    },
    {
      src: "https://cdn2.unrealengine.com/egs-ea-fc-25-standard-edition-carousel-desktop-1920x1080-acb7fd6bf969.jpg?resize=1&w=1280&h=720&quality=medium",
      title: "《Binary Smoke》"
    },
    {
      src: "https://cdn2.unrealengine.com/egs-popucom-carousel-desktop-v2-1920x1080-44efcd1fb118.jpeg?resize=1&w=1280&h=720&quality=medium",
      title: "《Binary Smoke》"
    }
  ]
};

const games = [
  {
    cover: "https://cdn2.unrealengine.com/egs-popucom-carousel-desktop-v2-1920x1080-44efcd1fb118.jpeg?resize=1&w=1280&h=720&quality=medium",
    title: "SILENT HILL 2",
    type: "基础游戏",
    price: "JP¥8,580"
  },
  {
    cover: "https://cdn2.unrealengine.com/egs-popucom-carousel-desktop-v2-1920x1080-44efcd1fb118.jpeg?resize=1&w=1280&h=720&quality=medium",
    title: "RoadCraft",
    type: "基础游戏",
    price: "JP¥6,480"
  },
  {
    cover: "https://cdn2.unrealengine.com/egs-popucom-carousel-desktop-v2-1920x1080-44efcd1fb118.jpeg?resize=1&w=1280&h=720&quality=medium",
    title: "Soulmask",
    type: "基础游戏",
    price: "JP¥3,900"
  },
  {
    cover: "https://cdn2.unrealengine.com/egs-popucom-carousel-desktop-v2-1920x1080-44efcd1fb118.jpeg?resize=1&w=1280&h=720&quality=medium",
    title: "Deliver At All Costs",
    type: "基础游戏",
    price: "JP¥3,850"
  },
  {
    cover: "https://cdn2.unrealengine.com/egs-popucom-carousel-desktop-v2-1920x1080-44efcd1fb118.jpeg?resize=1&w=1280&h=720&quality=medium",
    title: "Deadtime Defenders",
    type: "基础游戏",
    price: "JP¥970"
  },
  {
    cover: "https://cdn2.unrealengine.com/egs-popucom-carousel-desktop-v2-1920x1080-44efcd1fb118.jpeg?resize=1&w=1280&h=720&quality=medium",
    title: "Deadtime Defenders",
    type: "基础游戏",
    price: "JP¥970"
  },
];

const bestSellingGames = [
  { cover: "https://cdn2.unrealengine.com/egs-ea-fc-25-standard-edition-carousel-desktop-1920x1080-acb7fd6bf969.jpg?resize=1&w=1280&h=720&quality=medium", title: "Grand Theft Auto V Enhanced", discount: "-50%", price: "JP¥2,190", originalPrice: "JP¥4,380*" },
  { cover: "https://cdn2.unrealengine.com/egs-ea-fc-25-standard-edition-carousel-desktop-1920x1080-acb7fd6bf969.jpg?resize=1&w=1280&h=720&quality=medium", title: "EA SPORTS FC™ 25 Standard Edition", details: "可以免费试玩", discount: "-70%", price: "JP¥2,940", originalPrice: "JP¥9,800*" },
  { cover: "https://cdn2.unrealengine.com/egs-ea-fc-25-standard-edition-carousel-desktop-1920x1080-acb7fd6bf969.jpg?resize=1&w=1280&h=720&quality=medium", title: "Red Dead Redemption 2", discount: "-75%", price: "JP¥2,154", originalPrice: "JP¥8,618*" },
  { cover: "https://cdn2.unrealengine.com/egs-ea-fc-25-standard-edition-carousel-desktop-1920x1080-acb7fd6bf969.jpg?resize=1&w=1280&h=720&quality=medium", title: "Cyberpunk 2077", discount: "-60%", price: "JP¥3,511", originalPrice: "JP¥8,778*" },
  { cover: "https://cdn2.unrealengine.com/egs-ea-fc-25-standard-edition-carousel-desktop-1920x1080-acb7fd6bf969.jpg?resize=1&w=1280&h=720&quality=medium", title: "Dead by Daylight", price: "JP¥2,299" },
];

const mostPlayedGames = [
  { cover: "https://cdn2.unrealengine.com/egs-ea-fc-25-standard-edition-carousel-desktop-1920x1080-acb7fd6bf969.jpg?resize=1&w=1280&h=720&quality=medium", title: "Fortnite", details: "免费" },
  { cover: "https://cdn2.unrealengine.com/egs-ea-fc-25-standard-edition-carousel-desktop-1920x1080-acb7fd6bf969.jpg?resize=1&w=1280&h=720&quality=medium", title: "Rocket League®", details: "免费" },
  { cover: "https://cdn2.unrealengine.com/egs-ea-fc-25-standard-edition-carousel-desktop-1920x1080-acb7fd6bf969.jpg?resize=1&w=1280&h=720&quality=medium", title: "Dead Island 2", price: "JP¥8,090" },
  { cover: "https://cdn2.unrealengine.com/egs-ea-fc-25-standard-edition-carousel-desktop-1920x1080-acb7fd6bf969.jpg?resize=1&w=1280&h=720&quality=medium", title: "Tiny Tina's Wonderlands", discount: "-100%", price: "免费", originalPrice: "JP¥7,700*" },
  { cover: "https://cdn2.unrealengine.com/egs-ea-fc-25-standard-edition-carousel-desktop-1920x1080-acb7fd6bf969.jpg?resize=1&w=1280&h=720&quality=medium", title: "Grand Theft Auto V Enhanced", discount: "-50%", price: "JP¥2,190", originalPrice: "JP¥4,380*" },
];

const wishlistedGames = [
  { cover: "https://cdn2.unrealengine.com/egs-ea-fc-25-standard-edition-carousel-desktop-1920x1080-acb7fd6bf969.jpg?resize=1&w=1280&h=720&quality=medium", title: "Borderlands 4", status: "于25/09/12 推出" },
  { cover: "https://cdn2.unrealengine.com/egs-ea-fc-25-standard-edition-carousel-desktop-1920x1080-acb7fd6bf969.jpg?resize=1&w=1280&h=720&quality=medium", title: "Dying Light: The Beast", status: "即将推出" },
  { cover: "https://cdn2.unrealengine.com/egs-ea-fc-25-standard-edition-carousel-desktop-1920x1080-acb7fd6bf969.jpg?resize=1&w=1280&h=720&quality=medium", title: "XOCIETY", status: "即将推出" },
  { cover: "https://cdn2.unrealengine.com/egs-ea-fc-25-standard-edition-carousel-desktop-1920x1080-acb7fd6bf969.jpg?resize=1&w=1280&h=720&quality=medium", title: "Tides of Annihilation", status: "即将推出" },
  { cover: "https://cdn2.unrealengine.com/egs-ea-fc-25-standard-edition-carousel-desktop-1920x1080-acb7fd6bf969.jpg?resize=1&w=1280&h=720&quality=medium", title: "Lowlife Forms", status: "即将推出" },

];

const footerLinks = {
  games: [
    "《Fortnite》",
    "《糖豆人》",
    "《Rocket League》",
    "《Unreal Tournament》",
    "《Infinity Blade》",
    "《Shadow Complex》",
    "《Robo Recall》",
  ],
  store: [
    "Epic游戏商城",
    "Fab",
    "Sketchfab",
    "ArtStation",
    "商城退款政策",
    "商城最终用户授权协议",
  ],
  tools: [
    "虚幻引擎",
    "UEFN",
    "MetaHuman",
    "Twinmotion",
    "Megascans",
    "RealityScan",
    "RAD Game Tools",
  ],
  onlineServices: [
    "Epic在线服务",
    "Kids Web Services",
    "服务协议",
    "可接受使用政策",
    "信任声明",
    "子服务商清单",
  ],
  company: ["简介", "新闻室", "招贤纳士", "学生", "用户研究"],
  resources: [
    "开发者社区",
    "MegaGrants",
    "创作者支持",
    "创作者协议",
    "在 Epic Games 上分发",
    "虚幻引擎品牌指南",
    "粉丝内容政策",
    "社区守则",
    "欧盟数字服务法案咨询",
    "Epic 专业支持",
  ],
};

const footerCopyright = "© 2025, Epic Games, Inc.保留所有权利。Epic、Epic Games、Epic Games 标志、Fortnite (堡垒之夜)、Fortnite(堡垒之夜)标志、Unreal(虚幻)、\nUnreal Engine (虚幻引擎)、Unreal Engine (虚幻引擎)标志、Unreal Tournament (虚幻竞技场)以及 Unreal Tournament (虚幻竞技场)标志属于\nEpic Games, Inc. 在美利坚合众国及其他地区的商标或已注册商标。其他品牌或产品名称是其各自所有者的商标。我们的网站可能会包含链接至由第三方运\n营的其他网站与资源。这些链接仅为方便您使用而提供。Epic Games 对这些网站或资源的内容没有控制权,也不会对因为您使用这些网站和资源而造成的\n损失或伤害负责。";

const footerPolicyLinks = [
  "服务条款",
  "隐私政策",
  "安全与保障",
  "商城退款政策",
  "发行商索引",
];

const achievementData = {
  title: "Grand Theft Auto V Enhanced",
  availableAchievements: 77,
  availableExp: 1750,
  coverImage: "https://cdn2.unrealengine.com/egs-ea-fc-25-standard-edition-carousel-desktop-1920x1080-acb7fd6bf969.jpg?resize=1&w=1280&h=720&quality=medium", // Replace with actual cover image if available
  achievements: [
    {
      icon: "https://shared-static-prod.epicgames.com/epic-achievements/25e088b16a154dfbbe74d2510bdef015/b0cd075465c44f87be3b505ac04a2e46/icons/59c531210d0369cf57b303453d4be0e4", // Placeholder, replace with actual icon
      name: "一网打尽",
      description: "GTA 在线模式：在没有死亡且击杀至少 10 名敌人的情况下完成一场帮派攻击。",
      exp: 10,
      unlockPercentage: "29%"
    },
    {
      icon: "https://shared-static-prod.epicgames.com/epic-achievements/25e088b16a154dfbbe74d2510bdef015/b0cd075465c44f87be3b505ac04a2e46/icons/ff69c9687480fc657846daaac9b40501", // Placeholder, replace with actual icon
      name: "三人成伍",
      description: "让三个角色于非执行任务时在至少 3 星通缉等级下存活时间达到 3 分钟。",
      exp: 20,
      unlockPercentage: "1%"
    },
    {
      icon: "https://shared-static-prod.epicgames.com/epic-achievements/25e088b16a154dfbbe74d2510bdef015/b0cd075465c44f87be3b505ac04a2e46/icons/ff69c9687480fc657846daaac9b40501", // Placeholder, replace with actual icon
      name: "不可触及",
      description: "GTA 在线模式：完成一个抢劫终章任务且没有受到任何伤害。",
      exp: 30,
      unlockPercentage: "23%"
    },
    {
      icon: "https://shared-static-prod.epicgames.com/epic-achievements/25e088b16a154dfbbe74d2510bdef015/b0cd075465c44f87be3b505ac04a2e46/icons/ff69c9687480fc657846daaac9b40501", // Placeholder, replace with actual icon
      name: "为虎作伥",
      description: "把一名不知情的受害者送至利他邪教。",
      exp: 5,
      unlockPercentage: "3%"
    },
    {
      icon: "https://shared-static-prod.epicgames.com/epic-achievements/25e088b16a154dfbbe74d2510bdef015/b0cd075465c44f87be3b505ac04a2e46/icons/ff69c9687480fc657846daaac9b40501", // Placeholder, replace with actual icon
      name: "人中精英",
      description: "GTA 在线模式：完成《末日豪劫》中的全部 3 个精英挑战。",
      exp: 40,
      unlockPercentage: "2%"
    },
    {
      icon: "https://shared-static-prod.epicgames.com/epic-achievements/25e088b16a154dfbbe74d2510bdef015/b0cd075465c44f87be3b505ac04a2e46/icons/ff69c9687480fc657846daaac9b40501", // Placeholder, replace with actual icon
      name: "保持稳赚",
      description: "从股票市场的总投资中获利。",
      exp: 10,
      unlockPercentage: "6%"
    },
    {
      icon: "https://shared-static-prod.epicgames.com/epic-achievements/25e088b16a154dfbbe74d2510bdef015/b0cd075465c44f87be3b505ac04a2e46/icons/ff69c9687480fc657846daaac9b40501", // Placeholder, replace with actual icon
      name: "全员集合",
      description: "解锁全部故事角色，然后从此类别中选择一个角色作为导演模式。",
      exp: 5,
      unlockPercentage: "1%"
    }
  ]
};

export function FilterBar() {
  const [currentMainImageIndex, setCurrentMainImageIndex] = useState(0);
  const [showAchievementSystem, setShowAchievementSystem] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentMainImageIndex((prevIndex) =>
        prevIndex === carouselData.sideItems.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  return (
      <div>
        {/* 页头 */}
        <header className="filterbar-header">
          <div className="header-left">
            <div className="header-logo">STORE</div>
            <nav className="header-nav">
              <span>支持</span>
              <span>分发</span>
            </nav>
          </div>
          <div className="header-right">
            <span className="header-lang">🌐</span>
            <button className="header-login">登录</button>
            <button className="header-download">下载</button>
          </div>
        </header>

        {/* 搜索栏 */}
        <div className="filterbar-searchbar">
          <input className="searchbar-input" placeholder="搜索商城"/>
          <div className="searchbar-tabs">
            <span className="active">探索</span>
            <span>浏览</span>
            <span>新闻</span>
          </div>
        </div>

        {showAchievementSystem ? (
            <AchievementSystem {...achievementData} onBack={() => setShowAchievementSystem(false)} />
        ) : (
            <div className="filterbar-root">
              {/* 横幅图片区域 */}
              <div className="filterbar-banner-row">
                {banners.map((banner, index) => (
                    <div key={index} className="filterbar-banner-row-item">
                      <img
                          key={index}
                          className="filterbar-banner"
                          src={banner.src}
                          alt={banner.alt}
                      />
                    </div>
                ))}
              </div>
              {/* 轮播图区域 */}
              <div className="game-card-container">
                <div className="game-card-main">
                  <img
                      src={carouselData.sideItems[currentMainImageIndex].src}
                      alt={carouselData.sideItems[currentMainImageIndex].title}
                  />
                </div>
                <div className="game-card-side-area">
                  <div className="game-card-side-list">
                    {carouselData.sideItems.map((item, index) => (
                        <div
                            key={index}
                            className={`game-card-side-item ${index === currentMainImageIndex ? 'active' : ''}`}
                            onClick={() => {
                              setCurrentMainImageIndex(index);
                              if (item.title === '《Grand Theft Auto V》\nEnhanced') {
                                setShowAchievementSystem(true);
                              } else {
                                setShowAchievementSystem(false);
                              }
                            }}
                        >
                          <img src={item.src} alt={item.title}/>
                          <span>{item.title}</span>
                        </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* 尝鲜发现区域 */}
              <div className="filterbar-body-content">
                <h5 className="filterbar-title">尝鲜发现 {">"}</h5>
                <div className="filterbar-flex-row">
                  <div
                      className="filterbar-scroll-list scrollbar-hide"
                  >
                    {games.map((game, idx) => (
                        <div
                            key={idx}
                            className="filterbar-game-card"
                        >
                          <img src={game.cover} alt={game.title} className="filterbar-game-img"/>
                          <div className="filterbar-game-info">
                            <div className="filterbar-game-type">{game.type}</div>
                            <div className="filterbar-game-title">{game.title}</div>
                            <div className="filterbar-game-price">{game.price}</div>
                          </div>
                        </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* 横幅图片区域*/}
              <div className="filterbar-banner-row">
                {banners.map((banner, index) => (
                    <div key={index} className="filterbar-banner-row-item">
                      <img
                          key={index}
                          className="filterbar-banner"
                          src={banner.src}
                          alt={banner.alt}
                      />
                    </div>
                ))}
              </div>
              {/* 大特卖聚焦区域 */}
              <div className="filterbar-body-content">
                <h5 className="filterbar-title">大特卖聚焦 {">"}</h5>
                <div className="filterbar-flex-row">
                  <div
                      className="filterbar-scroll-list scrollbar-hide"
                  >
                    {games.map((game, idx) => (
                        <div
                            key={idx}
                            className="filterbar-game-card"
                        >
                          <img src={game.cover} alt={game.title} className="filterbar-game-img"/>
                          <div className="filterbar-game-info">
                            <div className="filterbar-game-type">{game.type}</div>
                            <div className="filterbar-game-title">{game.title}</div>
                            <div className="filterbar-game-price">{game.price}</div>
                          </div>
                        </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* 三列区域 */}
              <div className="filterbar-body-content">
                <div className="three-column-section">
                  {/* 最畅销 */}
                  <div className="column">
                    <h5 className="filterbar-title">最畅销 {'>'}</h5>
                    {
                      bestSellingGames.map((game, index) => (
                          <div key={index} className="game-list-item">
                            <img src={game.cover} alt={game.title} className="game-list-cover"/>
                            <div className="game-list-info">
                              <div className="game-list-title">{game.title}</div>
                              {game.details && <div className="game-list-details">{game.details}</div>}
                              <div className="game-list-price">
                                {game.discount && <span className="game-list-discount">{game.discount}</span>}
                                {game.originalPrice &&
                                    <span className="game-list-original-price">{game.originalPrice}</span>}
                                <span className="game-list-current-price">{game.price}</span>
                              </div>
                            </div>
                          </div>
                      ))
                    }
                  </div>
                  {/* 最多游玩 */}
                  <div className="column">
                    <h5 className="filterbar-title">最多游玩 {'>'}</h5>
                    {
                      mostPlayedGames.map((game, index) => (
                          <div key={index} className="game-list-item">
                            <img src={game.cover} alt={game.title} className="game-list-cover"/>
                            <div className="game-list-info">
                              <div className="game-list-title">{game.title}</div>
                              {game.details && <div className="game-list-details">{game.details}</div>}
                              <div className="game-list-price">{game.price}</div>
                            </div>
                          </div>
                      ))
                    }
                  </div>
                  {/* 最热门愿望清单游戏 */}
                  <div className="column">
                    <h5 className="filterbar-title">最热门愿望清单游戏 {'>'}</h5>
                    {
                      wishlistedGames.map((game, index) => (
                          <div key={index} className="game-list-item">
                            <img src={game.cover} alt={game.title} className="game-list-cover"/>
                            <div className="game-list-info">
                              <div className="game-list-title">{game.title}</div>
                              <div className="game-list-status">{game.status}</div>
                            </div>
                          </div>
                      ))
                    }
                  </div>
                </div>
              </div>
            </div>
        )}
        {/* 页脚区域 */}
        <footer className="filterbar-footer">
          <div className="footer-columns">
            <div className="footer-column">
              <h5>游戏</h5>
              {footerLinks.games.map((link, index) => (
                  <a key={index} href="#">{link}</a>
              ))}
            </div>
            <div className="footer-column">
              <h5>商城</h5>
              {footerLinks.store.map((link, index) => (
                  <a key={index} href="#">{link}</a>
              ))}
            </div>
            <div className="footer-column">
              <h5>工具</h5>
              {footerLinks.tools.map((link, index) => (
                  <a key={index} href="#">{link}</a>
              ))}
            </div>
            <div className="footer-column">
              <h5>在线服务</h5>
              {footerLinks.onlineServices.map((link, index) => (
                  <a key={index} href="#">{link}</a>
              ))}
            </div>
            <div className="footer-column">
              <h5>公司</h5>
              {footerLinks.company.map((link, index) => (
                  <a key={index} href="#">{link}</a>
              ))}
            </div>
            <div className="footer-column">
              <h5>资源</h5>
              {footerLinks.resources.map((link, index) => (
                  <a key={index} href="#">{link}</a>
              ))}
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-copyright">
              <p>{footerCopyright}</p>
              <div className="footer-policy-links">
                {footerPolicyLinks.map((link, index) => (
                    <a key={index} href="#">{link}</a>
                ))}
              </div>
            </div>
            <div className="footer-policy-links">
              <button className="back-to-top-btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >返回顶端 &uarr;</button>
            </div>
          </div>
        </footer>
      </div>
  );
}