var inquirer = require('inquirer'),
    fs = require("fs"),
    request = require("request"),
    low = require('lowdb'),
    FileSync = require('lowdb/adapters/FileSync'),
    _ayarlar = new FileSync('ayarlar.json'),
    ayarlar_ = low(_ayarlar),
    ayarlar = require("./ayarlar.json"),
    adapter = new FileSync('dil.json'),
    db = low(adapter),
    chalk = require("chalk");

function bekle(ms) {
    var başlamaZamanı = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - başlamaZamanı) > ms) {
            break;
        }
    }
}

function str(s) {
    return s.replace(/{.*?}/, function(a, b) {
        if (db.has(b).value() == true) {
            return db.get(b);
        } else {
            return ayarlar.bilinmiyor;
        }
    });
}

function kod(k) {
    var yazdırRegex = new RegExp(/(.*) renk ile konsola (.*) yazdır/);
    var olumluOlumsuzRegex = new RegExp(/(.*) == (.*)/);
    var beklemeRegex = new RegExp(/(.*) ms bekle/);
    var strRegex = new RegExp(/"(.*)"/);
    var kaydetRegex = new RegExp(/(.*) = (.*)/);
    var silRegex = new RegExp(/(.*) objesini sil/);
    var sorRegex = new RegExp(/(.*) diye sor/);
    var yenidenAdlandırRegex = new RegExp(/(.*), (.*)/);
    if (yenidenAdlandırRegex.test(k) == false && kaydetRegex.test(k) == false && sorRegex.test(k) == false && silRegex.test(k) == false && yazdırRegex.test(k) == false && olumluOlumsuzRegex.test(k) == false && beklemeRegex.test(k) == false && strRegex.test(k) == true) {
        console.log(str(strRegex.exec(k)[1]));
    }
    if (yenidenAdlandırRegex.test(k) == false && kaydetRegex.test(k) == false && sorRegex.test(k) == false && silRegex.test(k) == false && yazdırRegex.test(k) == false && olumluOlumsuzRegex.test(k) == false && beklemeRegex.test(k) == false && strRegex.test(k) == false && /(.*)/.test(k) == true) {
        console.log(db.has(/(.*)/.exec(k)[1]).value() == true ? db.get(/(.*)/.exec(k)[1]).value() : ayarlar.bilinmiyor);
    }
    if (sorRegex.test(k) == true) {
        if (strRegex.test(k) == true) {
            inquirer.prompt([{
                type: 'input',
                message: str(strRegex.exec(k)[1]),
                name: 'yazı'
            }]).then(cevap => {
                db.set('cevap', cevap.yazı).write();
            });
        } else {
            durdur = true;
            inquirer.prompt([{
                type: 'input',
                message: db.has(sorRegex.exec(k)[1]).value() == true ? db.get(sorRegex.exec(k)[1]).value() : ayarlar.bilinmiyor,
                name: 'yazı'
            }]).then(cevap => {
                db.set('cevap', cevap.yazı).write();
            });
        }
    }
    if (kaydetRegex.test(k) == true) {
        if (db.has(kaydetRegex.exec(k)[1]).value() == false) {
            if (strRegex.test(kaydetRegex.exec(k)[2]) == true) {
                db.set(kaydetRegex.exec(k)[1], str(String(strRegex.exec(kaydetRegex.exec(k)[2])[1]))).write();
            } else {
                db.set(kaydetRegex.exec(k)[1], db.has(kaydetRegex.exec(k)[2]) ? ayarlar.bilinmiyor : kaydetRegex.exec(k)[2]).write();
            }
        } else {
            console.log(ayarlar.zatenVar);
        }
    }
    if (silRegex.test(k) == true) {
        if (db.has(silRegex.exec(k)[1]).value() == true) {
            db.unset(silRegex.exec(k)[1]).write();
        } else {
            console.log(ayarlar.bilinmiyor);
        }
    }
    if (yenidenAdlandırRegex.test(k) == true) {
        if (db.has(yenidenAdlandırRegex.exec(k)[1]).value() == true) {
            db.set(yenidenAdlandırRegex.exec(k)[2], db.get(yenidenAdlandırRegex.exec(k)[1]).value()).write();
            db.unset(yenidenAdlandırRegex.exec(k)[1]).write();
        } else {
            console.log(ayarlar.bilinmiyor);
        }
    }
    if (beklemeRegex.test(k) == true) {
        if (!isNaN(beklemeRegex.exec(k)[1])) {
            bekle(beklemeRegex.exec(k)[1])
        } else {
            console.log(ayarlar.sayıDeğil);
        }
    }
    if (olumluOlumsuzRegex.test(k) == true) {
        if (/"(.*)"/.test(olumluOlumsuzRegex.exec(k)[1]) == true) {
            if (/"(.*)"/.test(olumluOlumsuzRegex.exec(k)[2]) == true) {
                console.log(eval(String(str(olumluOlumsuzRegex.exec(k)[1].replace(/"/g, ''))) == String(str(olumluOlumsuzRegex.exec(k)[2].replace(/"/g, '')))) == true ? ayarlar.olumlu : ayarlar.olumsuz);
            } else {
                if (db.has(olumluOlumsuzRegex.exec(k)[2]).value() == true) {
                    console.log(eval(String(str(olumluOlumsuzRegex.exec(k)[1].replace(/"/g, ''))) == String(db.get(olumluOlumsuzRegex.exec(k)[2]).value())) == true ? ayarlar.olumlu : ayarlar.olumsuz);
                } else {
                    console.log(ayarlar.olumsuz);
                }
            }
        } else {
            if (/"(.*)"/.test(olumluOlumsuzRegex.exec(k)[2]) == true) {
                if (db.has(olumluOlumsuzRegex.exec(k)[1]).value() == true) {
                    console.log(eval(String(db.get(olumluOlumsuzRegex.exec(k)[1]).value()) == String(str(olumluOlumsuzRegex.exec(k)[2].replace(/"/g, '')))) == true ? ayarlar.olumlu : ayarlar.olumsuz);
                } else {
                    console.log(ayarlar.olumsuz);
                }
            } else {
                if (db.has(olumluOlumsuzRegex.exec(k)[1]).value() == true && db.has(olumluOlumsuzRegex.exec(k)[2]).value() == true) {
                    console.log(db.get(String(olumluOlumsuzRegex.exec(k)[1])).value() == db.get(olumluOlumsuzRegex.exec(k)[2]).value() == true ? ayarlar.olumlu : ayarlar.olumsuz);
                } else {
                    console.log(ayarlar.olumsuz);
                }
            }
        }
    }
    if (yazdırRegex.test(k) == true) {
        if (/"(.*)"/.test(yazdırRegex.exec(k)[2]) == true) {
            console.log(str(eval(yazdırRegex.exec(k)[1] == "mavi".toLocaleLowerCase() ? "chalk.blue(yazdırRegex.exec(k)[2])" : yazdırRegex.exec(k)[1] == "sarı".toLocaleLowerCase() ? "chalk.yellow(yazdırRegex.exec(k)[2])" : yazdırRegex.exec(k)[1] == "kırmızı".toLocaleLowerCase() ? "chalk.red(yazdırRegex.exec(k)[2])" : yazdırRegex.exec(k)[1] == "yeşil".toLocaleLowerCase() ? "chalk.green(yazdırRegex.exec(k)[2])" : yazdırRegex.exec(k)[1] == "beyaz".toLocaleLowerCase() ? "chalk.white(yazdırRegex.exec(k)[2])" : "chalk.white(yazdırRegex.exec(k)[2])").replace(/"/g, '')));
        } else {
            var _veri = db.has(yazdırRegex.exec(k)[2]).value() == true ? db.get(yazdırRegex.exec(k)[2]).value() : ayarlar.bilinmiyor;
            console.log(eval(yazdırRegex.exec(k)[1] == "mavi".toLocaleLowerCase() ? "chalk.blue(_veri)" : yazdırRegex.exec(k)[1] == "sarı".toLocaleLowerCase() ? "chalk.yellow(_veri)" : yazdırRegex.exec(k)[1] == "kırmızı".toLocaleLowerCase() ? "chalk.red(_veri)" : yazdırRegex.exec(k)[1] == "yeşil".toLocaleLowerCase() ? "chalk.green(_veri)" : yazdırRegex.exec(k)[1] == "beyaz".toLocaleLowerCase() ? "chalk.white(_veri)" : "chalk.white(_veri)"));
        }
    }
}

function çalıştır(komut, tür) {
    if (tür === "dosya") {
        komut.replace(/\n/g, '').split(" & ").map(s => kod(s));
    }
    if (tür === "skript") {
        komut.split(" & ").map(s => kod(s));
    }
}

function başlat() {
    var yenilikler = request('http://ahmetesad.com/ahmetesad/yenilikler', function(error, response, body) {
        ayarlar_.set('yenilikler', body).write();
    });
    inquirer.prompt([{
        type: 'list',
        message: 'Merhaba! AhmetEsad diline hoş geldiniz.',
        prefix: '•',
        suffix: ' (Ok Tuşlarını Kullanın)',
        name: 'seçim',
        choices: [{
            name: 'Dosya Çalıştır'
        }, {
            name: 'Skript Çalıştır'
        }, {
            name: 'Yenilikler'
        }, {
            name: "Çıkış (X)"
        }]
    }]).then(cevap => {
        if (cevap.seçim === "Yenilikler") {
            console.log(ayarlar_.get('yenilikler').value());
        }
        if (cevap.seçim === "Dosya Çalıştır") {
            inquirer.prompt([{
                type: 'list',
                message: 'Şu Dosyayı Çalıştıracağım...',
                prefix: '•',
                suffix: ' (Ok Tuşlarını Kullanın)',
                name: 'dosya',
                choices: fs.readdirSync("./skriptler").filter(d => d.endsWith(".ahmetesad")).length == 0 ? [{
                    "name": "Çıkış (X)"
                }] : JSON.parse('[' + fs.readdirSync("./skriptler").filter(d => d.endsWith(".ahmetesad")).map(dosya => '{"name":"' + dosya + '"}').join(',') + ',{"name": "Çıkış (X)"}]')
            }]).then(cevap0 => {
                if (cevap0.dosya == "Çıkış (X)") {
                    başlat();
                } else {
                    çalıştır(fs.readFileSync("./skriptler/" + cevap0.dosya, "utf8"), 'dosya');
                }
            });
        } else if (cevap.seçim === "Skript Çalıştır") {
            inquirer.prompt([{
                type: 'input',
                name: 'skript',
                message: "Çalıştırılacak Kod:",
                suffix: " (Kodlarınızı ' & ' ile ayırabilirsiniz)"
            }]).then(cevap1 => {
                çalıştır(cevap1.skript, 'skript');
            });
        } else if (cevap.seçim !== "Dosya" && cevap.seçim !== "Skript") {
            require("child_process").exec(process.exit());
        };
    });
};
başlat();
