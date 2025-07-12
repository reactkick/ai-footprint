// 1. Gerekli kütüphaneleri içeri aktar
const express = require('express');
const mongoose = require('mongoose');
const cors = 'require('cors');
require('dotenv').config(); // .env dosyasındaki değişkenleri yükler

// 2. Uygulama ve Port Ayarları
const app = express();
const PORT = process.env.PORT || 3001; // Sunucunun çalışacağı port

// 3. Middleware (Ara Yazılımlar)
app.use(cors()); // Farklı kaynaklardan gelen isteklere izin ver
app.use(express.json()); // Gelen isteklerin body'sini JSON olarak parse et

// 4. MongoDB'ye Bağlanma
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI) için 
  .then(() => console.log('MongoDB'ye başarıyla bağlanıldı!'))
    .catch(err => console.error('MongoDB bağlantı hatası:', err));

    // 5. Veri Şemasını (Schema) ve Modelini Tanımlama
    const ConsumptionSchema = new mongoose.Schema({
      country: { type: String, required: true },
        resource: { type: String, required: true, enum: ['Su', 'Enerji', 'Karbon'] },
          amount: { type: Number, required: true },
            unit: { type: String, required: true },
              date: { type: Date, default: Date.now },
                data_source: { type: String, required: true },
                });

                const ConsumptionData = mongoose.model('ConsumptionData', ConsumptionSchema);

                // --- API Rotaları (Endpoints) ---

                // Test rotası
                app.get('/', (req, res) => {
                  res.send('AI-Footprint API Çalışıyor!');
                  });

                  // Bütün tüketim verilerini getiren rota
                  app.get('/api/data', async (req, res) => {
                    try {
                        const allData = await ConsumptionData.find().sort({ date: -1 }); // En yeniden eskiye sırala
                            res.json(allData);
                              } catch (err) {
                                  res.status(500).json({ message: 'Veri alınırken bir hata oluştu.', error: err });
                                    }
                                    });

                                    // Yeni tüketim verisi ekleyen rota (MVP için ilk verileri girmemizi sağlayacak)
                                    app.post('/api/data', async (req, res) => {
                                      const { country, resource, amount, unit, data_source } = req.body;

                                        const newData = new ConsumptionData({
                                            country,
                                                resource,
                                                    amount,
                                                        unit,
                                                            data_source,
                                                              });

                                                                try {
                                                                    const savedData = await newData.save();
                                                                        res.status(201).json(savedData); // 201: Başarıyla oluşturuldu
                                                                          } catch (err) {
                                                                              res.status(400).json({ message: 'Veri kaydedilirken bir hata oluştu.', error: err });
                                                                                }
                                                                                });

                                                                                // 6. Sunucuyu Başlatma
                                                                                app.listen(PORT, () => {
                                                                                  console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor.`);
                                                                                  });
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config'; // 'require' yerine modern 'import' kullanıyoruz

// Kendi servislerimizi ve modellerimizi import ediyoruz
import { analyzeTextWithAI } from './services/aiAnalysisService'; // Yeni AI servisi
// Henüz model dosyası oluşturmadık ama gelecekte böyle olacak:
// import ConsumptionData from './models/consumptionModel';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  console.error("HATA: MONGO_URI ortam değişkeni tanımlanmamış.");
  process.exit(1);
}

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB\'ye başarıyla bağlanıldı!'))
  .catch(err => console.error('MongoDB bağlantı hatası:', err));

// --- API Rotaları ---

// Mevcut veri rotaları (bunları daha sonra model dosyasına taşıyacağız)
// app.get('/api/data', ...);
// app.post('/api/data', ...);

/**
 * YENİ ROTA: Metin analizi için AI servisini kullanır
 */
app.post('/api/analyze', async (req: Request, res: Response) => {
  const { text } = req.body;

  if (!text || typeof text !== 'string') {
    return res.status(400).json({ message: 'Lütfen "text" alanında bir metin gönderin.' });
  }

  try {
    const analysis = await analyzeTextWithAI(text);
    // AI'dan gelen cevap genellikle string bir JSON'dur, bunu parse edebiliriz.
    try {
      const jsonAnalysis = JSON.parse(analysis);
      res.json(jsonAnalysis);
    } catch {
      // Eğer AI, JSON formatında cevap vermediyse, ham metni göndeririz.
      res.json({ analysis_text: analysis });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.get('/', (req: Request, res: Response) => {
  res.send('AI-Footprint API (TypeScript) Çalışıyor!');
});

app.listen(PORT, () => {
  console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor.`);
});
// ... dosyanın üst kısımdaki import'lar
import { fetchTrendingModels } from './services/rankingScraper';
import FootprintModel, { IFootprint } from './models/footprintModel';

// ... app.use() gibi diğer kodlar

/**
 * YENİ ROTA: Trend olan modelleri çeker ve bilinen ayak izlerini hesaplar.
 */
app.get('/api/rankings/footprint', async (req, res) => {
  try {
    // 1. Adım: OpenRouter'dan anlık trend model isimlerini çek
    const modelNames = await fetchTrendingModels();
    if (modelNames.length === 0) {
      return res.status(500).json({ message: 'Modeller çekilemedi.' });
    }

    // 2. Adım: Veritabanımızdaki ilgili tüm modellerin bilgilerini al
    const knownFootprints = await FootprintModel.find({ 
        // modelIdentifier alanında bu isimlerden herhangi birini içerenleri bul
        modelIdentifier: { $in: modelNames.map(name => new RegExp(name, 'i')) } 
    });

    // 3. Adım: Çekilen modellerle veritabanı sonuçlarını birleştir
    const results = modelNames.map(name => {
      const foundData = knownFootprints.find(fp => 
        fp.modelIdentifier.toLowerCase().includes(name.toLowerCase())
      );
      
      return {
        modelName: name,
        hasData: !!foundData,
        footprint: foundData || 'Bu model için veritabanında bilgi bulunamadı.'
      };
    });

    res.json(results);

  } catch (error) {
    res.status(500).json({ message: 'Ayak izi hesaplanırken bir hata oluştu.', error });
  }
});


// ... dosyanın geri kalanı
