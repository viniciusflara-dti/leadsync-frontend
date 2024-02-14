import { type AxiosInstance } from 'axios'
import { type IRequest } from '@/lib/contracts'
import { type IUpdateLeadStatus, type ILead } from '@/interfaces'

export class LeadsAPI {
  constructor (
    private readonly api: AxiosInstance,
    private readonly request: IRequest
  ) {}

  async getInvitedLeads (): Promise<ILead[]> {
    return await this.request<ILead[]>(this.api.get('leads/invited'))
  }

  async getAcceptedLeads (): Promise<ILead[]> {
    return await this.request<ILead[]>(this.api.get('leads/accepted'))
  }

  async updateLeadStatus ({ leadId, status }: IUpdateLeadStatus): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return await this.request<any>(this.api.put(`leads/${leadId}`, { leadStatus: status }))
  }
}
