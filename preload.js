const fs = require('fs');
/**
 * Função para definir a logica de funcionamento antes da renderização 
 */
// tasklist.exe | findstr /i "csu"
const preload = ()=>{
    fs.writeFile('arquivo.txt', JSON.stringify(process.argv), (err) => {
        if (err) throw err;
        console.log('O arquivo foi criado!');
    });
}

module.exports = preload;