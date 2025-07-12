# AI-Footprint 🌍

[![Lisans: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Yapay zekanın gezegenimiz üzerindeki gizli maliyetini (su, enerji, karbon) şeffaf bir şekilde izleyen ve tahminleyen açık kaynaklı bir girişim.**

Bu proje, büyük yapay zeka modellerinin (LLM'ler, görüntü işleme vb.) eğitimi ve çalıştırılması sırasında tüketilen doğal kaynakları takip etmeyi ve analiz etmeyi amaçlamaktadır. Şirketler bu verileri doğrudan paylaşmadığı için, projemiz **akademik araştırmalara, hakemli makalelere ve güvenilir endüstri raporlarına dayalı bir tahmin motoru** olarak çalışır.

## 🚀 Projenin Ana Yetenekleri

*   **Veri Kazıma (Web Scraping):** [OpenRouter Sıralaması](https://openrouter.ai/rankings) gibi popüler platformlardan anlık olarak trend olan yapay zeka modellerini otomatik olarak çeker.
*   **Tahmin Motoru:** Kendi veritabanımızda tutulan akademik verilere dayanarak, bu modellerin tahmini su, enerji ve karbon ayak izini hesaplar.
*   **Metin Analizi:** [OpenRouter API](https://openrouter.ai/) entegrasyonu sayesinde, yapay zeka ile ilgili metinleri (haberler, raporlar) analiz ederek içlerindeki sayısal tüketim verilerini otomatik olarak çıkarabilir.
*   **Açık API:** Tüm bu tahmini verileri, mobil ve web uygulamalarında kullanılmak üzere basit bir REST API üzerinden sunar.

## 🛠️ Teknoloji Mimarisi

Proje, frontend ve backend'in ayrı tutulduğu modern bir "monorepo" yapısı kullanmaktadır.

### Backend (`/server`)
*   **Dil:** TypeScript
*   **Framework:** Node.js & Express.js
*   **Veritabanı:** MongoDB Atlas (Mongoose ODM ile)
*   **Yapay Zeka Entegrasyonu:** OpenRouter API
*   **Veri Kazıma:** Axios & Cheerio
*   **Geliştirme Ortamı:** Termux (Android üzerinde yerel sunucu)

### Frontend (`/client`)
*   **Framework:** Expo (React Native for Web & Mobile)
*   **Dil:** JavaScript (veya TypeScript)
*   **API İletişimi:** Axios

## 🏃‍♀️ Projeyi Yerel Ortamda Çalıştırma (Termux)

Bu proje, bir Android tablet/telefon üzerinde Termux kullanılarak geliştirilmekte ve çalıştırılmaktadır.

### 1. Gerekli Kurulumlar

```bash
# Termux paketlerini güncelle
pkg update && pkg upgrade

# Gerekli araçları yükle (Node.js, Git, metin editörü)
pkg install nodejs-lts git micro

# Termux'un cihaz depolamasına erişim izni ver
termux-setup-storage
```

### 2. Projeyi Klonlama ve Kurma

```bash
# Proje deposunu klonla
git clone https://github.com/reactkick/ai-footprint.git

# Proje klasörüne git
cd ai-footprint
```

### 3. Backend Sunucusunu Çalıştırma

```bash
# Sunucu klasörüne git
cd server

# Gerekli bağımlılıkları yükle
npm install

# .env dosyasını oluştur ve API anahtarlarını ekle
# micro .env
# İçerik:
# MONGO_URI=mongodb+srv://...
# OPENROUTER_API_KEY=sk-or-...

# Geliştirme sunucusunu başlat
npm run dev
```
Sunucu artık `http://localhost:3001` adresinde çalışıyor.

### 4. Frontend Uygulamasını Çalıştırma

*Bu bölüm geliştirme aşamasındadır.*

## 🗺️ Yol Haritası

-   [x] **Temel API Kurulumu (TypeScript):** Veri ekleme ve listeleme.
-   [x] **OpenRouter Entegrasyonu:** Metin analizi için AI servisi.
-   [x] **Web Scraper Geliştirme:** Model sıralamalarını otomatik çekme.
-   [x] **Tahmin Motoru (v1):** Çekilen modelleri veritabanı ile eşleştirme.
-   [ ] **Expo Client Geliştirme:** API'den gelen verileri mobil/web arayüzünde görselleştirme.
-   [ ] **Grafik ve İstatistikler:** Verileri anlamlı grafiklerle (çubuk, pasta vb.) sunma.
-   [ ] **CI/CD Otomasyonu:** GitHub Actions ile otomatik test ve dağıtım süreçleri.

## 🤝 Katkıda Bulunma

Bu proje açık kaynaklıdır ve her türlü katkıya açıktır! Bir hata bulursanız, yeni bir özellik önermek isterseniz veya koda katkıda bulunmak isterseniz lütfen bir "Issue" açın veya bir "Pull Request" gönderin.

1.  Projeyi Fork'layın.
2.  Yeni bir özellik dalı oluşturun (`git checkout -b feature/AmazingFeature`).
3.  Değişikliklerinizi Commit'leyin (`git commit -m 'Add some AmazingFeature'`).
4.  Dalınızı Push'layın (`git push origin feature/AmazingFeature`).
5.  Bir Pull Request açın.

## 📄 Lisans

Bu proje [MIT Lisansı](LICENSE) ile lisanslanmıştır. Daha fazla bilgi için `LICENSE` dosyasına bakın.
