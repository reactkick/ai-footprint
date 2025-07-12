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
