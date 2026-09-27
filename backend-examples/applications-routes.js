import { Router } from 'express'
import pool from '../db/index.js'

// Public showcase example.
// Database connection configuration is intentionally omitted.
//
// These routes are intended to be mounted at:
// /api/applications

const router = Router()

router.get('/', async function (req, res) {
  try {
    const result = await pool.query(`
      SELECT
        id,
        company,
        position,
        status,
        TO_CHAR(date_applied, 'YYYY-MM-DD') AS "dateApplied",
        TO_CHAR(status_changed_on, 'YYYY-MM-DD') AS "statusChangedOn"
      FROM applications
      ORDER BY date_applied DESC, id DESC
    `)

    res.json(result.rows)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: 'Unable to get applications',
    })
  }
})

router.post('/', async function (req, res) {
  try {
    const {
      company,
      position,
      status = 'Applied',
      dateApplied,
    } = req.body

    const result = await pool.query(
      `INSERT INTO applications (
        company,
        position,
        status,
        date_applied
      )
      VALUES ($1, $2, $3, $4)
      RETURNING
        id,
        company,
        position,
        status,
        TO_CHAR(date_applied, 'YYYY-MM-DD') AS "dateApplied"`,
      [company, position, status, dateApplied]
    )

    res.status(201).json(result.rows[0])
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: 'Unable to add application',
    })
  }
})

export default router