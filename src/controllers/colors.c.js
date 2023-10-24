import { json } from "express";
import { pool } from "../db.js";
import xm12js from "xml2js";

export const getColors = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1; // Página actual, predeterminada a 1
      const pageSize = parseInt(req.query.pageSize) || 10; // Tamaño de página, predeterminado a 10
      const offset = (page - 1) * pageSize; // Calcular el desplazamiento
  
      const query = 'SELECT * FROM colors ORDER BY id DESC LIMIT ? OFFSET ?';
      const [rows] = await pool.query(query, [pageSize, offset]);
  
      // Modificar los valores de color para agregar "#" si no lo tienen
      const colorsWithSymbol = rows.map((row) => ({
        ...row,
        color: row.color.startsWith('#') ? row.color : `#${row.color}`,
      }));
  
      // Obtener el total de elementos en la base de datos (sin paginación)
      const [totalCount] = await pool.query('SELECT COUNT(*) as count FROM colors');
  
      const totalPages = Math.ceil(totalCount[0].count / pageSize);
  
      const response = {
        colors: colorsWithSymbol,
        pages: totalPages,
        nextPage: page < totalPages ? `${req.baseUrl}?page=${page + 1}&pageSize=${pageSize}` : null,
        previousPage: page > 1 ? `${req.baseUrl}?page=${page - 1}&pageSize=${pageSize}` : null,
      };
  
      const responseFormat = req.headers['accept']; // Verificar el formato deseado (JSON o XML)
      if (responseFormat === 'application/xml') {
        // Si el cliente solicita XML, convierte la respuesta a XML
        const xmlBuilder = new xml2js.Builder({
          rootName: 'colors', // Elemento raíz en XML
        });
        const xmlData = xmlBuilder.buildObject({ color: response });
  
        res.set('Content-Type', 'application/xml');
        res.status(200).send(xmlData);
      } else {
        // Si el cliente no especifica un formato o solicita JSON, responde en JSON
        res.json(response);
      }
    } catch (error) {
      return res.status(500).json({
        message: 'Something goes wrong',
      });
    }
  };
  

export const getColor = async (req, res) => {

    try {

        const [rows] = await pool.query('SELECT  * FROM colors WHERE id = ?', [req.params.id])
        if (rows.length <= 0 ){
            return res.status(404).json({
                message: 'Color not fount'
            });
        }

        // Agregar el símbolo "#" al valor del color si no lo tiene
        const colorValue = rows[0].color.startsWith('#') ? rows[0].color : `#${rows[0].color}`;
            
        res.send({
            ...rows[0],
            color: colorValue,
        });

    } catch (error){
        return res.status(500).json({
            message:'Something goes wrong'
        })
    }
   
}

export const createColors = async (req, res) => {
    
    try {

        const {name, color, pantone, year} = req.body;

        // Validación y extracción del valor del color
        const colorRegex = /^#?([0-9A-Fa-f]{6})$/;
        const match = color.match(colorRegex);

        if (!match) {
            return res.status(400).json({
                message: 'Invalid color value. It should be a 6-digit hexadecimal with or without the # symbol.'
            });
        }

        // Obtener el valor del color sin el símbolo #
        const cleanedColor = match[1];

        const [rows] = await pool.query ('INSERT INTO colors(name, color, pantone, year) VALUES (?, ?, ?, ?)', [name, cleanedColor, pantone, year])
        res.send({
            id: rows.insertId,
            name,
            color: cleanedColor, // Usar el valor limpio sin el símbolo #
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

        if (result.affectedRows <=0) {
            return res.status(404).json({
                message: 'Color not found'
            });
        } 

        return res.status(204).json({
            message: 'Deletion completed successfully'
        });

    } catch (error){
        return res.status(500).json({
            message:'Something goes wrong'
        });
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

