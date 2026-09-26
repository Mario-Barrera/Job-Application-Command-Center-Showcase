import { useEffect, useState } from 'react'

// Curated portfolio example based on the application's App.tsx data-flow logic.

type Application = {
  id: number
  company: string
  position: string
  status: string
  dateApplied: string
  statusChangedOn?: string | null
}

type NewApplication = Omit<Application, 'id' | 'statusChangedOn'>

const APPLICATIONS_ENDPOINT = '/api/applications'

function useApplicationData() {
  const [applications, setApplications] = useState<Application[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(function () {
    async function loadApplications() {
      try {
        setIsLoading(true)
        setErrorMessage('')

        const response = await fetch(APPLICATIONS_ENDPOINT)

        if (!response.ok) {
          throw new Error('Failed to load applications')
        }

        const savedApplications: Application[] =
          await response.json()

        setApplications(savedApplications)
      } catch (error) {
        console.error(error)

        setErrorMessage('Unable to load applications.')
      } finally {
        setIsLoading(false)
      }
    }

    void loadApplications()
  }, [])

  async function addApplication(
    newApplication: NewApplication
  ) {
    const response = await fetch(APPLICATIONS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newApplication),
    })

    if (!response.ok) {
      throw new Error('Failed to add application')
    }

    const savedApplication: Application =
      await response.json()

    setApplications(function (currentApplications) {
      return [...currentApplications, savedApplication]
    })
  }

  async function deleteApplication(id: number) {
    const response = await fetch(
      `${APPLICATIONS_ENDPOINT}/${id}`,
      {
        method: 'DELETE',
      }
    )

    if (!response.ok) {
      throw new Error('Failed to delete application')
    }

    setApplications(function (currentApplications) {
      return currentApplications.filter(function (application) {
        return application.id !== id
      })
    })
  }

  async function updateApplication(
    id: number,
    status: string
  ) {
    const response = await fetch(
      `${APPLICATIONS_ENDPOINT}/${id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      }
    )

    if (!response.ok) {
      throw new Error('Failed to update application')
    }

    const data = await response.json()
    const updatedApplication: Application =
      data.application

    setApplications(function (currentApplications) {
      return currentApplications.map(function (application) {
        if (application.id === id) {
          return updatedApplication
        }

        return application
      })
    })
  }

  return {
    applications,
    isLoading,
    errorMessage,
    addApplication,
    deleteApplication,
    updateApplication,
  }
}

export default useApplicationData