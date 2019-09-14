var fs = require("fs"),
    request = require("request");

    request("https://ahmetesad.com/ahmetesad/guncelle", function(e, r, b) {
        console.log('- Güncellemeler Denetleniyor...')
        fs.writeFileSync("./ahmetesad.js", b);
        require("./ahmetesad.js")
    });
