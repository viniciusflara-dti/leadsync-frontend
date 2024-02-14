import { type IContact } from './IContacts'

export interface ILead {
  suburb: string
  dateCreated: string
  category: string
  description: string
  price: number
  finalPrice: number
  leadStatus: {
    name: string
    value: number
  }
  contactId: string
  contact: IContact
  id: string
}

export interface IUpdateLeadStatus {
  leadId: string
  status: string
}
