const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

// Конфігурація парсерів для кожного сайту
const parsers = {
  freelancehunt: {
    name: 'FreelanceHunt',
    async parse(url) {
      try {
        const response = await axios.get(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        });
        const $ = cheerio.load(response.data);
        const jobs = [];

        $('.project-list-item, .project-item').each((i, elem) => {
          const $item = $(elem);
          const title = $item.find('.project-title a, h2 a').first().text().trim();
          const link = $item.find('.project-title a, h2 a').first().attr('href');
          const priceText = $item.find('.project-budget, .budget').text().trim();
          
          if (title && link) {
            jobs.push({
              title: title,
              link: link.startsWith('http') ? link : 'https://freelancehunt.com' + link,
              price: priceText || 'Ціна не вказана',
              description: $item.find('.project-description').text().trim().substring(0, 200)
            });
          }
        });

        return jobs.slice(0, 20);
      } catch (error) {
        console.error(`Error parsing FreelanceHunt: ${error.message}`);
        return [];
      }
    }
  },

  freelanceua: {
    name: 'Freelance.ua',
    async parse(url) {
      try {
        const response = await axios.get(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        });
        const $ = cheerio.load(response.data);
        const jobs = [];

        $('.order-row, .project-item').each((i, elem) => {
          const $item = $(elem);
          const title = $item.find('.order-title a, h3 a').first().text().trim();
          const link = $item.find('.order-title a, h3 a').first().attr('href');
          const priceText = $item.find('.order-budget, .price').text().trim();
          
          if (title && link) {
            jobs.push({
              title: title,
              link: link.startsWith('http') ? link : 'https://freelance.ua' + link,
              price: priceText || 'Ціна не вказана',
              description: $item.find('.order-description').text().trim().substring(0, 200)
            });
          }
        });

        return jobs.slice(0, 20);
      } catch (error) {
        console.error(`Error parsing Freelance.ua: ${error.message}`);
        return [];
      }
    }
  },

  upwork: {
    name: 'Upwork',
    async parse(url) {
      try {
        // Upwork потребує JavaScript, використовуємо puppeteer
        const puppeteer = require('puppeteer');
        const browser = await puppeteer.launch({ 
          headless: 'new',
          args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
        
        const jobs = await page.evaluate(() => {
          const items = [];
          document.querySelectorAll('[data-test="JobTile"], .job-tile').forEach(elem => {
            const titleElem = elem.querySelector('h2 a, .job-title a');
            const priceElem = elem.querySelector('[data-test="budget"], .budget');
            
            if (titleElem) {
              items.push({
                title: titleElem.textContent.trim(),
                link: titleElem.href,
                price: priceElem ? priceElem.textContent.trim() : 'Budget not specified',
                description: elem.querySelector('.job-description, p')?.textContent.trim().substring(0, 200) || ''
              });
            }
          });
          return items;
        });

        await browser.close();
        return jobs.slice(0, 20);
      } catch (error) {
        console.error(`Error parsing Upwork: ${error.message}`);
        return [];
      }
    }
  },

  freelancercom: {
    name: 'Freelancer.com',
    async parse(url) {
      try {
        const response = await axios.get(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        });
        const $ = cheerio.load(response.data);
        const jobs = [];

        $('[data-test="project-card"], .project-card').each((i, elem) => {
          const $item = $(elem);
          const title = $item.find('a[href*="/projects/"]').first().text().trim();
          const link = $item.find('a[href*="/projects/"]').first().attr('href');
          const priceText = $item.find('[data-test="budget"], .project-budget').text().trim();
          
          if (title && link) {
            jobs.push({
              title: title,
              link: link.startsWith('http') ? link : 'https://www.freelancer.com' + link,
              price: priceText || 'Budget TBD',
              description: $item.find('.project-description').text().trim().substring(0, 200)
            });
          }
        });

        return jobs.slice(0, 20);
      } catch (error) {
        console.error(`Error parsing Freelancer.com: ${error.message}`);
        return [];
      }
    }
  },

  peopleperhour: {
    name: 'PeoplePerHour',
    async parse(url) {
      try {
        const response = await axios.get(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        });
        const $ = cheerio.load(response.data);
        const jobs = [];

        $('.job-item, [data-test="job-card"]').each((i, elem) => {
          const $item = $(elem);
          const title = $item.find('.job-title a, h3 a').first().text().trim();
          const link = $item.find('.job-title a, h3 a').first().attr('href');
          const priceText = $item.find('.budget, .price').text().trim();
          
          if (title && link) {
            jobs.push({
              title: title,
              link: link.startsWith('http') ? link : 'https://www.peopleperhour.com' + link,
              price: priceText || 'Price not specified',
              description: $item.find('.job-description').text().trim().substring(0, 200)
            });
          }
        });

        return jobs.slice(0, 20);
      } catch (error) {
        console.error(`Error parsing PeoplePerHour: ${error.message}`);
        return [];
      }
    }
  }
};

// Визначаємо парсер по URL
function getParser(url) {
  if (url.includes('freelancehunt.com')) return parsers.freelancehunt;
  if (url.includes('freelance.ua')) return parsers.freelanceua;
  if (url.includes('upwork.com')) return parsers.upwork;
  if (url.includes('freelancer.com')) return parsers.freelancercom;
  if (url.includes('peopleperhour.com')) return parsers.peopleperhour;
  return null;
}

// Конфігурація категорій (додайте всі ваші категорії тут)
const categories = {
  design: {
    name: 'Дизайн',
    subcategories: {
      logo: {
        name: 'Лого',
        urls: [
          'https://freelancehunt.com/projects?skills%5B%5D=17',
          'https://freelance.ua/orders/?orders=logo&pc=1'
        ]
      },
      cards: {
        name: 'Визитки',
        urls: [
          'https://freelancehunt.com/projects?skills%5B%5D=156',
          'https://freelance.ua/orders/print-design/'
        ]
      },
      social: {
        name: 'Соц. сети',
        urls: [
          'https://freelancehunt.com/projects?skills%5B%5D=151'
        ]
      }
    }
  },
  programming: {
    name: 'Програмування',
    subcategories: {
      web: {
        name: 'Веб',
        urls: [
          'https://freelancehunt.com/projects?name=wordpress',
          'https://freelance.ua/orders/?page=1&q=wordpress'
        ]
      },
      bots: {
        name: 'Боти',
        urls: [
          'https://freelancehunt.com/projects?skills%5B%5D=180',
          'https://freelance.ua/orders/?q=%D0%B1%D0%BE%D1%82'
        ]
      },
      mobile: {
        name: 'Мобайл',
        urls: [
          'https://freelancehunt.com/projects?skills%5B%5D=179',
          'https://freelance.ua/orders/android-development/'
        ]
      }
    }
  },
  cad3d: {
    name: '3D-CAD',
    subcategories: {
      modeling: {
        name: '3D',
        urls: [
          'https://freelancehunt.com/projects?skills%5B%5D=148',
          'https://freelance.ua/orders/?orders=architecture%2Cinteriors'
        ]
      }
    }
  }
};

function escapeXml(unsafe) {
  if (!unsafe) return '';
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function generateRSSFeed(category, subcategory, jobs) {
  const now = new Date().toUTCString();
  const feedTitle = `${category} - ${subcategory}`;
  
  let rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(feedTitle)}</title>
    <description>Фриланс вакансії: ${escapeXml(feedTitle)}</description>
    <link>https://makcimkabro.github.io/freelance-rss/</link>
    <lastBuildDate>${now}</lastBuildDate>
    <language>uk</language>
`;

  jobs.forEach(job => {
    rss += `    <item>
      <title>${escapeXml(job.title)}</title>
      <link>${escapeXml(job.link)}</link>
      <description>${escapeXml(job.price + ' | ' + job.description)}</description>
      <pubDate>${now}</pubDate>
      <guid isPermaLink="true">${escapeXml(job.link)}</guid>
    </item>
`;
  });

  rss += `  </channel>
</rss>`;

  return rss;
}

async function main() {
  console.log('🚀 Починаємо парсинг вакансій...\n');

  if (!fs.existsSync('feeds')) {
    fs.mkdirSync('feeds', { recursive: true });
  }

  let totalJobs = 0;

  for (const [catKey, catData] of Object.entries(categories)) {
    for (const [subKey, subData] of Object.entries(catData.subcategories)) {
      console.log(`\n📂 Обробка: ${catData.name} - ${subData.name}`);
      
      const allJobs = [];
      
      for (const url of subData.urls) {
        console.log(`  🔍 Парсинг: ${url}`);
        
        const parser = getParser(url);
        if (parser) {
          try {
            const jobs = await parser.parse(url);
            console.log(`    ✅ Знайдено: ${jobs.length} вакансій`);
            allJobs.push(...jobs);
            totalJobs += jobs.length;
            
            // Пауза між запитами
            await new Promise(resolve => setTimeout(resolve, 2000));
          } catch (error) {
            console.log(`    ❌ Помилка: ${error.message}`);
          }
        } else {
          console.log(`    ⚠️  Парсер не знайдено для цього сайту`);
        }
      }

      // Генеруємо RSS фід
      const safeCategoryName = catData.name.toLowerCase().replace(/[^а-яёa-z0-9]/gi, '-');
      const safeSubcategoryName = subData.name.toLowerCase().replace(/[^а-яёa-z0-9]/gi, '-');
      const filename = `${safeCategoryName}-${safeSubcategoryName}.xml`;
      
      const rss = generateRSSFeed(catData.name, subData.name, allJobs);
      fs.writeFileSync(path.join('feeds', filename), rss, 'utf8');
      
      console.log(`  💾 Збережено: ${filename} (${allJobs.length} вакансій)`);
    }
  }

  console.log(`\n🎉 Готово! Всього створено фідів з ${totalJobs} вакансіями`);
}

main().catch(console.error);