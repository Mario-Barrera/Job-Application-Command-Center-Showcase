import { useState } from 'react'

type Application = {
  id: number
  company: string
  position: string
  status: string
  dateApplied: string
  statusChangedOn?: string | null
}

type ApplicationListProps = {
  applications: Application[]
  deleteApplication(id: number): Promise<void>
  updateApplication(id: number, status: string): Promise<void>
}

function ApplicationListInteractions({
  applications,
  deleteApplication,
  updateApplication,
}: ApplicationListProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [sortOption, setSortOption] = useState('newest')
  const [actionError, setActionError] = useState('')

  const filteredApplications = applications.filter(function (application) {
    const searchValue = searchTerm.toLowerCase()

    const matchesSearch =
      application.company.toLowerCase().includes(searchValue) ||
      application.position.toLowerCase().includes(searchValue) ||
      application.status.toLowerCase().includes(searchValue)

    const matchesStatus =
      statusFilter === 'All' || application.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const sortedApplications = [...filteredApplications]

  sortedApplications.sort(function (a, b) {
    if (sortOption === 'oldest') {
      return (
        new Date(a.dateApplied).getTime() -
        new Date(b.dateApplied).getTime()
      )
    }

    if (sortOption === 'company') {
      return a.company.localeCompare(b.company)
    }

    return (
      new Date(b.dateApplied).getTime() -
      new Date(a.dateApplied).getTime()
    )
  })

  async function handleStatusChange(
    applicationId: number,
    newStatus: string
  ) {
    try {
      setActionError('')
      await updateApplication(applicationId, newStatus)
    } catch (error) {
      console.error(error)

      setActionError(
        'Unable to update application status. Please try again.'
      )
    }
  }

  async function handleDelete(applicationId: number) {
    const shouldDelete = window.confirm(
      'Are you sure you want to delete this application?'
    )

    if (!shouldDelete) {
      return
    }

    try {
      setActionError('')
      await deleteApplication(applicationId)
    } catch (error) {
      console.error(error)

      setActionError(
        'Unable to delete application. Please try again.'
      )
    }
  }

  return (
    <section>
      <h2>Applications</h2>

      <input
        type="search"
        placeholder="Search applications..."
        value={searchTerm}
        onChange={function (event) {
          setSearchTerm(event.target.value)
        }}
      />

      <select
        value={statusFilter}
        onChange={function (event) {
          setStatusFilter(event.target.value)
        }}
      >
        <option value="All">All Statuses</option>
        <option value="Applied">Applied</option>
        <option value="Interview">Interview</option>
        <option value="Offer">Offer</option>
      </select>

      <select
        value={sortOption}
        onChange={function (event) {
          setSortOption(event.target.value)
        }}
      >
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
        <option value="company">Company A-Z</option>
      </select>

      {actionError && <p>{actionError}</p>}

      {sortedApplications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        sortedApplications.map(function (application) {
          return (
            <article key={application.id}>
              <h3>{application.company}</h3>

              <p>{application.position}</p>

              <select
                value={application.status}
                onChange={function (event) {
                  void handleStatusChange(
                    application.id,
                    event.target.value
                  )
                }}
              >
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Offer">Offer</option>
              </select>

              <p>Date Applied: {application.dateApplied}</p>

              <p>
                Status Changed:{' '}
                {application.statusChangedOn ?? 'Not changed yet'}
              </p>

              <button
                type="button"
                onClick={function () {
                  void handleDelete(application.id)
                }}
              >
                Delete
              </button>
            </article>
          )
        })
      )}
    </section>
  )
}

export default ApplicationListInteractions