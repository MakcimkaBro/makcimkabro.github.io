import os
import hashlib
from datetime import datetime
import requests
from bs4 import BeautifulSoup
from feedgenerator import Rss201rev2Feed

# ==============================
# Настройки
# ==============================
FEEDS_DIR = "feeds"
os.makedirs(FEEDS_DIR, exist_ok=True)

# Файл для хранения хэшей страниц Freelancehunt / freelance.ua
HASH_FILE = "hashes.txt"
if os.path.exists(HASH_FILE):
    with open(HASH_FILE, "r") as f:
        hashes = dict(line.strip().split(" ", 1) for line in f if line.strip())
else:
    hashes = {}

# ==============================
# Категории и ссылки
# ==============================
categories = {
    "logo": [
        "https://www.upwork.com/nx/search/jobs/?nbs=1&q=logo&sort=recency",
        "https://www.freelancer.com/search/projects?projectLanguages=ru,en,uk&projectSort=latest&projectSkills=32",
        "https://www.behance.net/joblist?category=logo-design",
        "https://www.peopleperhour.com/freelance-jobs/design/logo-design"
    ],
    "business_cards": [
        "https://www.upwork.com/nx/search/jobs/?q=business%20card&sort=recency",
        "https://www.freelancer.com/search/projects?projectLanguages=ru,en,uk&projectSort=latest&projectSkills=278",
        "https://www.behance.net/joblist?category=stationery-design",
        "https://www.peopleperhour.com/freelance-jobs/design/cards-stationery"
    ],
    "social_design": [
        "https://www.upwork.com/nx/search/jobs/?q=social%20design&sort=recency",
        "https://www.freelancer.com/jobs/social_media_marketing/1/",
        "https://www.behance.net/joblist?category=social-media-design",
        "https://www.virtualvocations.com/jobs/q-social/d-24"
    ]
}

# ==============================
# Вспомогательные функции
# ==============================

def get_html(url):
    """Получаем HTML страницы"""
    headers = {"User-Agent": "Mozilla/5.0"}
    try:
        resp = requests.get(url, headers=headers, timeout=15)
        resp.raise_for_status()
        return resp.text
    except Exception as e:
        print(f"Error fetching {url}: {e}")
        return None

def hash_text(text):
    """Возвращает md5 хэш текста"""
    return hashlib.md5(text.encode("utf-8")).hexdigest()

def parse_html_jobs(url, max_items=5):
    """Парсим HTML для сайтов без RSS"""
    html = get_html(url)
    if not html:
        return []

    soup = BeautifulSoup(html, "html.parser")
    items = []

    # Попробуем стандартный поиск ссылок на оферы
    for a in soup.find_all("a", href=True)[:max_items]:
        link = a['href']
        title = a.get_text(strip=True)
        if not title:
            continue
        items.append({
            "title": title[:100],
            "link": link,
            "description": f"Source: {url}",
            "pubdate": datetime.utcnow()
        })
    return items

def check_update_signal(url):
    """Для Freelancehunt / freelance.ua"""
    html = get_html(url)
    if not html:
        return None
    h = hash_text(html)
    old_hash = hashes.get(url)
    if old_hash == h:
        return None  # ничего нового
    hashes[url] = h
    return {
        "title": f"Update on {url.split('/')[2]}",
        "link": url,
        "description": f"New projects might be available on {url}",
        "pubdate": datetime.utcnow()
    }

# ==============================
# Генерация RSS-фида
# ==============================
def generate_feed(category_name, urls):
    feed = Rss201rev2Feed(
        title=f"{category_name} jobs",
        link="https://makcimkabro.github.io/rss/",
        description=f"RSS feed for {category_name} jobs",
        language="en",
    )

    for url in urls:
        domain = url.split("/")[2]
        if "upwork.com" in domain or "freelancer.com" in domain or "behance.net" in domain:
            # Попытка использовать нативный RSS если известен
            feed.add_item(
                title=f"Job from {domain}",
                link=url,
                description=f"Source: {domain}",
                pubdate=datetime.utcnow()
            )
        elif "peopleperhour.com" in domain or "cgtrader.com" in domain or "virtualvocations.com" in domain:
            # HTML парсинг
            items = parse_html_jobs(url)
            for i in items:
                feed.add_item(**i)
        elif "freelancehunt.com" in domain or "freelance.ua" in domain:
            # Сигнальный RSS (hash)
            item = check_update_signal(url)
            if item:
                feed.add_item(**item)

    # Сохраняем XML
    feed_path = f"{FEEDS_DIR}/{category_name}.xml"
    with open(feed_path, "w", encoding="utf-8") as f:
        feed.write(f, "utf-8")
    print(f"Feed generated: {feed_path}")

# ==============================
# Генерация всех категорий
# ==============================
for category, urls in categories.items():
    generate_feed(category, urls)

# ==============================
# Сохраняем хэши для signal-сайтов
# ==============================
with open(HASH_FILE, "w") as f:
    for k, v in hashes.items():
        f.write(f"{k} {v}\n")
