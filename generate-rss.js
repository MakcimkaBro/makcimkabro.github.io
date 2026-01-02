const fs = require('fs');
const path = require('path');

const categories = {
  design: {
    name: 'Дизайн',
    subcategories: {
      logo: {
        name: 'Лого',
        urls: [
          'https://freelancehunt.com/projects?skills%5B%5D=17',
          'https://freelance.ua/orders/?orders=logo&pc=1',
          'https://www.upwork.com/nx/search/jobs/?nbs=1&q=logo&sort=recency',
          'https://www.freelancer.com/search/projects?projectLanguages=ru,en,uk&projectSort=latest&projectSkills=32',
          'https://www.peopleperhour.com/freelance-jobs/design/logo-design',
          'https://www.virtualvocations.com/jobs/q-logo/d-24',
          'https://www.designcrowd.com/jobs/open/corporateidentity/logo/',
          'https://www.behance.net/joblist?category=logo-design',
          'https://www.behance.net/joblist?category=idendity-design',
          'https://www.behance.net/joblist?category=brand-guidelines',
          'https://www.behance.net/joblist?category=logo-animation'
        ]
      },
      cards: {
        name: 'Визитки',
        urls: [
          'https://freelancehunt.com/projects?skills%5B%5D=156',
          'https://freelance.ua/orders/print-design/',
          'https://www.upwork.com/nx/search/jobs/?q=business%20card&sort=recency',
          'https://www.freelancer.com/search/projects?projectLanguages=ru,en,uk&projectSort=latest&projectSkills=278',
          'https://www.peopleperhour.com/freelance-jobs/design/cards-stationery',
          'https://www.virtualvocations.com/jobs/q-business+card/d-24',
          'https://www.designcrowd.com/jobs/open/corporateidentity/',
          'https://www.designcrowd.com/jobs/closed/printdesign/',
          'https://www.designcrowd.com/jobs/open/merchandisedesign/',
          'https://www.behance.net/joblist?category=stationery-design',
          'https://www.behance.net/joblist?category=branding-services',
          'https://www.behance.net/joblist?category=t-shirt-merchandise',
          'https://www.behance.net/joblist?category=flyer-brochure-design'
        ]
      },
      social: {
        name: 'Соц. сети',
        urls: [
          'https://freelancehunt.com/projects?skills%5B%5D=151',
          'https://www.upwork.com/nx/search/jobs/?q=social%20design&sort=recency',
          'https://www.freelancer.com/jobs/social_media_marketing/1/',
          'https://www.virtualvocations.com/jobs/q-social/d-24',
          'https://www.designcrowd.com/jobs/open/printdesign/advertisement/',
          'https://www.designcrowd.com/jobs/closed/socialmediadesign/',
          'https://www.behance.net/joblist?category=social-media-design'
        ]
      }
    }
  },
  programming: {
    name: 'Программирование',
    subcategories: {
      web: {
        name: 'Веб (WordPress)',
        urls: [
          'https://freelancehunt.com/projects?name=wordpress',
          'https://freelance.ua/orders/?page=1&q=wordpress',
          'https://freelance.ua/orders/?orders=web-development%2Csajt-pod-kljuch%2Conline-shops%2Crefinement-sites%2Cverstka%2Cwap-pda-sites%2Cusability&pc=1',
          'https://www.upwork.com/nx/search/jobs/?q=wordpress&sort=recency',
          'https://www.freelancer.com/jobs/wordpress/1/?w=f&redirect-times=1&ngsw-bypass=',
          'https://www.peopleperhour.com/freelance-WordPress-jobs',
          'https://www.virtualvocations.com/jobs/q-WordPress/d-24',
          'https://www.designcrowd.com/jobs/open/webdesign/',
          'https://www.behance.net/joblist?category=website-design',
          'https://www.behance.net/joblist?category=landing-page-design'
        ]
      },
      opencart: {
        name: 'OpenCart',
        urls: [
          'https://freelancehunt.com/projects?name=opencart',
          'https://freelance.ua/orders/?page=1&q=opencart',
          'https://www.upwork.com/nx/search/jobs/?q=opencart&sort=recency'
        ]
      },
      bots: {
        name: 'Боти',
        urls: [
          'https://freelancehunt.com/projects?skills%5B%5D=180',
          'https://freelance.ua/orders/?q=%D0%B1%D0%BE%D1%82',
          'https://www.upwork.com/nx/search/jobs/?q=bot&sort=recency',
          'https://www.freelancer.com/jobs/chatbot/',
          'https://www.peopleperhour.com/freelance-bot-jobs?sort=latest',
          'https://www.virtualvocations.com/jobs/q-bot/d-24'
        ]
      },
      mobile: {
        name: 'Мобільні застосунки',
        urls: [
          'https://freelancehunt.com/projects?skills%5B%5D=179',
          'https://freelancehunt.com/projects?skills%5B%5D=121',
          'https://freelancehunt.com/projects?skills%5B%5D=183',
          'https://freelance.ua/orders/android-development/',
          'https://www.upwork.com/nx/search/jobs/?q=android&sort=recency',
          'https://www.freelancer.com/jobs/android',
          'https://www.freelancer.com/jobs/flutter',
          'https://www.peopleperhour.com/freelance-jobs/technology-programming/mobile-app-development',
          'https://www.virtualvocations.com/jobs/q-mobile/d-24',
          'https://www.virtualvocations.com/jobs?search=android',
          'https://www.behance.net/joblist?category=app-design'
        ]
      }
    }
  },
  cad3d: {
    name: '3D-CAD',
    subcategories: {
      modeling: {
        name: '3D моделювання',
        urls: [
          'https://freelancehunt.com/projects?skills%5B%5D=148&skills%5B%5D=108&skills%5B%5D=147&skills%5B%5D=107&skills%5B%5D=188&skills%5B%5D=64',
          'https://freelance.ua/orders/?orders=architecture%2Cinteriors%2Clandscape-design-master-plan&pc=1',
          'https://www.upwork.com/nx/search/jobs/?q=interior&sort=recency',
          'https://www.freelancer.com/jobs/3d-drafting/',
          'https://www.freelancer.com/jobs/3d-modelling/',
          'https://www.freelancer.com/jobs/3d-visualization/',
          'https://www.freelancer.com/jobs/3d-cad/',
          'https://www.freelancer.com/jobs/rendering/',
          'https://www.freelancer.com/jobs/3ds-max/',
          'https://www.peopleperhour.com/freelance-jobs/design/interior-exterior-design-architecture',
          'https://www.virtualvocations.com/jobs/q-cad/d-24',
          'https://www.virtualvocations.com/jobs/q-3d/d-24',
          'https://www.cgtrader.com/3d-modeling-jobs/browse',
          'https://www.behance.net/joblist?category=modeling-projects',
          'https://www.behance.net/joblist?category=architecture-renderings'
        ]
      }
    }
  }
};

function escapeXml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function generateRSSFeed(category, subcategory, urls) {
  const now = new Date().toUTCString();
  const feedTitle = `${category} - ${subcategory}`;
  
  let rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(feedTitle)}</title>
    <description>Фриланс вакансии: ${escapeXml(feedTitle)}</description>
    <link>https://YOUR_USERNAME.github.io/freelance-rss/</link>
    <lastBuildDate>${now}</lastBuildDate>
    <language>uk</language>
`;

  urls.forEach((url, index) => {
    try {
      const urlObj = new URL(url);
      const hostname = urlObj.hostname.replace('www.', '');
      
      rss += `    <item>
      <title>Вакансії на ${escapeXml(hostname)}</title>
      <link>${escapeXml(url)}</link>
      <description>Актуальні вакансії по напрямку ${escapeXml(feedTitle)} на платформі ${escapeXml(hostname)}</description>
      <pubDate>${now}</pubDate>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
    </item>
`;
    } catch (error) {
      console.error(`Invalid URL: ${url}`);
    }
  });

  rss += `  </channel>
</rss>`;

  return rss;
}

// Создаем директорию для фидов
if (!fs.existsSync('feeds')) {
  fs.mkdirSync('feeds', { recursive: true });
}

// Генерируем RSS для каждой подкатегории
let feedList = [];

Object.entries(categories).forEach(([catKey, catData]) => {
  Object.entries(catData.subcategories).forEach(([subKey, subData]) => {
    const safeCategoryName = catData.name.toLowerCase().replace(/[^а-яёa-z0-9]/gi, '-');
    const safeSubcategoryName = subData.name.toLowerCase().replace(/[^а-яёa-z0-9]/gi, '-');
    const filename = `${safeCategoryName}-${safeSubcategoryName}.xml`;
    
    const rss = generateRSSFeed(catData.name, subData.name, subData.urls);
    const filepath = path.join('feeds', filename);
    
    fs.writeFileSync(filepath, rss, 'utf8');
    console.log(`✅ Згенеровано: ${filename}`);
    
    feedList.push({
      category: catData.name,
      subcategory: subData.name,
      filename: filename,
      count: subData.urls.length
    });
  });
});

// Создаем index.html со списком всех фидов
let html = `<!DOCTYPE html>
<html lang="uk">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>📡 RSS Фіди фриланс вакансій</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      padding: 20px;
    }
    .container {
      max-width: 900px;
      margin: 0 auto;
      background: white;
      border-radius: 16px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      overflow: hidden;
    }
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 40px 30px;
      text-align: center;
    }
    .header h1 { font-size: 2.5em; margin-bottom: 10px; }
    .header p { opacity: 0.9; font-size: 1.1em; }
    .content { padding: 30px; }
    .info-box {
      background: #f0f4ff;
      border-left: 4px solid #667eea;
      padding: 20px;
      margin-bottom: 30px;
      border-radius: 8px;
    }
    .info-box h3 { color: #667eea; margin-bottom: 10px; }
    .category {
      margin-bottom: 40px;
      border-bottom: 2px solid #f0f0f0;
      padding-bottom: 30px;
    }
    .category:last-child { border-bottom: none; }
    .category h2 {
      color: #333;
      margin-bottom: 20px;
      font-size: 1.8em;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .feed-item {
      background: #fafafa;
      border-radius: 8px;
      padding: 15px;
      margin-bottom: 12px;
      transition: all 0.3s ease;
    }
    .feed-item:hover {
      background: #f0f4ff;
      transform: translateX(5px);
    }
    .feed-title {
      font-weight: 600;
      color: #333;
      margin-bottom: 8px;
      font-size: 1.1em;
    }
    .feed-url {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }
    .url-input {
      flex: 1;
      min-width: 300px;
      padding: 10px;
      border: 2px solid #e0e0e0;
      border-radius: 6px;
      font-family: 'Courier New', monospace;
      font-size: 0.9em;
      background: white;
    }
    .copy-btn {
      background: #667eea;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.3s ease;
    }
    .copy-btn:hover {
      background: #5568d3;
      transform: scale(1.05);
    }
    .copy-btn:active {
      transform: scale(0.95);
    }
    .stats {
      color: #666;
      font-size: 0.85em;
      margin-top: 5px;
    }
    .footer {
      text-align: center;
      padding: 20px;
      color: #666;
      background: #f9f9f9;
      font-size: 0.9em;
    }
    @media (max-width: 768px) {
      .header h1 { font-size: 2em; }
      .url-input { min-width: 100%; }
      .copy-btn { width: 100%; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📡 RSS Фіди фриланс вакансій</h1>
      <p>Скопіюйте посилання та додайте в Feeder</p>
    </div>
    
    <div class="content">
      <div class="info-box">
        <h3>ℹ️ Як використовувати:</h3>
        <ol style="padding-left: 20px; line-height: 1.8;">
          <li>Натисніть кнопку "Копіювати" біля потрібного фіду</li>
          <li>Відкрийте додаток Feeder на Android</li>
          <li>Додайте новий фід та вставте скопійоване посилання</li>
          <li>Фіди оновлюються автоматично кожні 6 годин</li>
        </ol>
      </div>
`;

// Группируем фиды по категориям
const groupedFeeds = {};
feedList.forEach(feed => {
  if (!groupedFeeds[feed.category]) {
    groupedFeeds[feed.category] = [];
  }
  groupedFeeds[feed.category].push(feed);
});

// Генерируем HTML для каждой категории
const categoryIcons = {
  'Дизайн': '🎨',
  'Программирование': '💻',
  '3D-CAD': '📐'
};

Object.entries(groupedFeeds).forEach(([category, feeds]) => {
  const icon = categoryIcons[category] || '📌';
  html += `      <div class="category">
        <h2>${icon} ${category}</h2>
`;
  
  feeds.forEach(feed => {
    const feedUrl = `https://makcimkabro.github.io/makcimkabro.github.io/feeds/${feed.filename}`;
    html += `        <div class="feed-item">
          <div class="feed-title">${feed.subcategory}</div>
          <div class="feed-url">
            <input type="text" class="url-input" value="${feedUrl}" readonly onclick="this.select()">
            <button class="copy-btn" onclick="copyToClipboard('${feedUrl}', this)">Копіювати</button>
          </div>
          <div class="stats">📊 Джерел: ${feed.count}</div>
        </div>
`;
  });
  
  html += `      </div>
`;
});

html += `    </div>
    
    <div class="footer">
      <p>Останнє оновлення: ${new Date().toLocaleString('uk-UA')}</p>
      <p style="margin-top: 10px;">Фіди генеруються автоматично через GitHub Actions</p>
    </div>
  </div>
  
  <script>
    function copyToClipboard(text, button) {
      navigator.clipboard.writeText(text).then(() => {
        const originalText = button.textContent;
        button.textContent = '✅ Скопійовано!';
        button.style.background = '#10b981';
        setTimeout(() => {
          button.textContent = originalText;
          button.style.background = '#667eea';
        }, 2000);
      }).catch(err => {
        alert('Помилка копіювання: ' + err);
      });
    }
  </script>
</body>
</html>`;

fs.writeFileSync('index.html', html, 'utf8');
console.log('✅ Згенеровано index.html');
console.log(`\n🎉 Всього створено ${feedList.length} RSS фідів!`);