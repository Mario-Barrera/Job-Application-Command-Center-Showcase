import { Router } from 'express'
import pool from '../db/index.js'

// Public showcase example.
// Demonstrates parameterized deletion, 404 handling,
// and structured success/error responses.

const router = Router()

router.delete('/:id', async function (req, res) {
  try {
    const id = req.params.id

    const result = await pool.query(
      `DELETE FROM applications
       WHERE id = $1
       RETURNING
         id,
         company,
         position,
         status`,
      [id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: 'Application not found',
      })
    }

    res.status(200).json({
      message: 'Application deleted successfully',
      application: result.rows[0],
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: 'Unable to delete application',
    })
  }
})

export default router