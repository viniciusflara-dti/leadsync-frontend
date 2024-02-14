import LeadCard from '@/components/LeadCard'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { type ILead } from '@/interfaces'
import { useApiContext } from '@/providers'
import { useEffect, useState } from 'react'

export default function LeadsList (): JSX.Element {
  const { leadsAPI } = useApiContext()
  const [invitedLeads, setInvitedLeads] = useState<ILead[]>([])
  const [acceptedLeads, setAcceptedLeads] = useState<ILead[]>([])

  const fetchInvitedLeads = (): void => {
    leadsAPI.getInvitedLeads()
      .then(res => {
        setInvitedLeads(res)
      })
      .catch(() => { console.error('Erro ao buscar leads. Tente novamente') })
  }

  const fetchAcceptedLeads = (): void => {
    leadsAPI.getAcceptedLeads()
      .then(res => {
        setAcceptedLeads(res)
      })
      .catch(() => { console.error('Erro ao buscar leads. Tente novamente') })
  }

  const updateLeadStatus = async (id: string, status: string): Promise<void> => {
    try {
      await leadsAPI.updateLeadStatus({ leadId: id, status })
      // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
      await Promise.allSettled([fetchInvitedLeads(), fetchAcceptedLeads()])
    } catch (error) {
      console.error('Erro ao atualizar status do lead. Tente novamente')
    }
  }

  useEffect(() => {
    fetchInvitedLeads()
    fetchAcceptedLeads()
  }, [])

  return (
    <div className="w-full flex justify-center">
      <Tabs defaultValue="invited" className="w-full">
        <TabsList>
          <TabsTrigger value="invited">Invited</TabsTrigger>
          <TabsTrigger value="accepted">Accepted</TabsTrigger>
        </TabsList>
        <TabsContent value="invited">
          <div className='flex flex-col gap-4'>
            {invitedLeads.map(lead => (
              <LeadCard key={lead.id} updFn={updateLeadStatus} {...lead} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="accepted">
          <div className='flex flex-col gap-4'>
            {acceptedLeads.length > 0
              ? acceptedLeads?.map(lead => (
                <LeadCard key={lead.id} {...lead} />
              ))
              : <p>No accepted leads</p>}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
