import { json } from "express"
import { pool } from "../db.js"

export const  getColors = async (req, res) => {
    
    try{

        const [rows] = await pool.query('SELECT  * FROM colors')
        res.json(rows[0])
    } catch (error){
        return res.status(500).json({
            message:'Something goes wrong'
        })
    }
}

export const getColor = async (req, res) => {

    try {

        const [rows] = await pool.query('SELECT  * FROM colors WHERE id = ?', [req.params.id])
        if (rows.length <= 0 ) return res.status(404).json({
            message: 'Color not fount'
        })
        res.send(rows[0])

    } catch (error){
        return res.status(500).json({
            message:'Something goes wrong'
        })
    }
   
}

export const createColors = async (req, res) => {
    
    try {

        const {name, color, pantone, year} = req.body
        const [rows] = await pool.query ('INSERT INTO colors(name, color, pantone, year) VALUES (?, ?, ?, ?)', [name, color, pantone, year])
        res.send({
            id: rows.insertId,
            name,
            color,
            pantone,
            year,
        })

    } catch (error){
        return res.status(500).json({
            message:'Something goes wrong'
        })
    }

}

export const deleteColors = async(req, res) => {
    try {

        const [result] = await pool.query('DELETE FROM colors WHERE id = ?', [req.params.id])
    if (result.affectedRows <=0) return res.status(404).json({
        message: 'Color not found'
    })

    res.sendStatus(204)

    } catch (error){
        return res.status(500).json({
            message:'Something goes wrong'
        })
    }
    
}

export const updateColors = async (req, res) => {
    try {

        const {id} = req.params
    const {name, color, pantone, year} = req.body
    const [result] = await pool.query('UPDATE colors SET name = IFNULL(?, name) , color =  IFNULL(?, color), pantone =  IFNULL(?, pantone), year = IFNULL(?, year) WHERE id = ?', [name, color, pantone, year, id])

    console.log(result)

    if (result.affectedRows == 0) return res.status(404).json({
        message:'Color not found'
    })

    const [rows] = await pool.query('SELECT * FROM colors WHERE id = ?', [id])

    res.json(rows[0])

    } catch (error){
        return res.status(500).json({
            message:'Something goes wrong'
        })
    }
    
}

