const express = require('express');
const conn = require('../db');
const path = require('path');
const fs = require('fs');

const barang = express()

// barang.use(express.json());

barang.get('/barang', async(req, res) => {
    const [barangs] = await conn.query('SELECT * FROM barang');

    res.send({
        'pesan' : 'barang ada',
        'data' : barangs
    })
})

barang.post('/', async(req,res) => {
    const nama = req.body.nama
    const harga = req.body.harga
    const deskripsi = req.body.deskripsi
    const kategori = req.body.kategori
    const file = req.files.file
    const ext = path.extname(file.name)
    const namaFile = file.md5 + ext
    const url = `${req.protocol}://${req.get('host')}/gambar/${namaFile}`

    file.mv(`./public/gambar/${namaFile}`)

    const [simpan] = await conn.execute('INSERT INTO barang VALUES(NULL, ?, ?, ?, ?, ?, ?)', [nama, harga, deskripsi, kategori, url, namaFile])

    if (simpan.affectedRows > 0) {
        res.send({
            'pesan' : 'berhasil diSimpan'
        })
    }
})

barang.delete('/:kode', async(req,res) => {
    const { kode } = req.params
    const [cari] = await conn.query(`SELECT * FROM barang WHERE IDBarang=${kode}`)
    const path = `./public/gambar/${cari[0].namaFile}`
    
    fs.unlinkSync(path)

    const [hapus] = await conn.execute(`DELETE FROM barang WHERE IDBarang=${kode}`)

    if (hapus.affectedRows > 0) {
        res.status(200).send({
            'pesan' : 'berhasil diHapus'
        })
    }
})

module.exports = barang