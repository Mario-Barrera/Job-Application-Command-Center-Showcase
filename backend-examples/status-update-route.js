import { Router } from 'express'
import pool from '../db/index.js'

// Public showcase example.
// Demonstrates validation, parameterized SQL, 404 handling,
// and independent tracking of status-change dates.

const router = Router()

const allowedStatuses = ['Applied', 'Interview', 'Offer']

router.patch('/:id', async function (req, res) {
  try {
    const id = req.params.id
    const { status } = req.body

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: 'Invalid application status',
      })
    }

    const result = await pool.query(
      `UPDATE applications
       SET
         status_changed_on =
           CASE
             WHEN status IS DISTINCT FROM $1 THEN CURRENT_DATE
             ELSE status_changed_on
           END,
         status = $1
       WHERE id = $2
       RETURNING
         id,
         company,
         position,
         status,
         TO_CHAR(date_applied, 'YYYY-MM-DD') AS "dateApplied",
         TO_CHAR(status_changed_on, 'YYYY-MM-DD') AS "statusChangedOn"`,
      [status, id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: 'Application not found',
      })
    }

    res.status(200).json({
      message: 'Application updated successfully',
      application: result.rows[0],
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: 'Unable to update application',
    })
  }
})

export default router