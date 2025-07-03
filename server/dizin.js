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
