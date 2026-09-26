import { useState } from 'react'
import type { FormEvent } from 'react'

type NewApplication = {
  company: string
  position: string
  status: string
  dateApplied: string
}

type ApplicationFormProps = {
  addApplication(newApplication: NewApplication): Promise<void>
}

function ApplicationForm({ addApplication }: ApplicationFormProps) {
  const [company, setCompany] = useState('')
  const [position, setPosition] = useState('')
  const [status, setStatus] = useState('Applied')
  const [dateApplied, setDateApplied] = useState('')

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const newApplication = {
      company,
      position,
      status,
      dateApplied,
    }

    try {
      setIsSubmitting(true)
      setSubmitError('')

      await addApplication(newApplication)

      // Reset the form only after the application is saved successfully.
      setCompany('')
      setPosition('')
      setStatus('Applied')
      setDateApplied('')
    } catch (error) {
      console.error(error)

      setSubmitError(
        'Unable to add application. Please try again.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section>
      <h2>Add Application</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="company">Company</label>
        <input
          id="company"
          type="text"
          value={company}
          onChange={function (event) {
            setCompany(event.target.value)
          }}
          required
        />

        <label htmlFor="position">Position</label>
        <input
          id="position"
          type="text"
          value={position}
          onChange={function (event) {
            setPosition(event.target.value)
          }}
          required
        />

        <label htmlFor="status">Status</label>
        <select
          id="status"
          value={status}
          onChange={function (event) {
            setStatus(event.target.value)
          }}
        >
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
        </select>

        <label htmlFor="dateApplied">Date Applied</label>
        <input
          id="dateApplied"
          type="date"
          value={dateApplied}
          onChange={function (event) {
            setDateApplied(event.target.value)
          }}
          required
        />

        <button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
        >
          {isSubmitting ? 'Adding Application...' : 'Add Application'}
        </button>

        {submitError && <p>{submitError}</p>}
      </form>
    </section>
  )
}

export default ApplicationForm