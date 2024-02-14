import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { type IContact, type ILead } from '@/interfaces'
import { formatCurrency, formatDate, getAvatarLetters } from '@/lib/utils'
import { Briefcase, Mail, MapPin, Phone } from 'lucide-react'

function AcceptedLeadFooter ({ contact, description }: { contact: IContact, description: string }): JSX.Element {
  return (
    <CardFooter className='gap-6 pt-6'>
      <div className='flex flex-col items-start gap-4'>
        <div className='flex flex-row gap-6'>
          <div className='flex flex-row gap-2'>
            <Phone className='text-muted-foreground' />
            <p className='text-cyan-700'>{contact.phone}</p>
          </div>
          <div className='flex flex-row gap-2'>
            <Mail className='text-muted-foreground' />
            <p className='text-cyan-700'>{contact.email}</p>
          </div>
        </div>
        <p className='text-start'>{description}</p>
      </div>
    </CardFooter>
  )
}

function InvitedLeadFooter ({ id, price, updFn }: { id: string, price: number, updFn: (id: string, status: string) => Promise<void> }): JSX.Element {
  return (
    <>
      <Separator />
      <CardFooter className='gap-6 pt-6'>
        <Button variant="default" onClick={() => { updFn(id, 'Accepted') }}>Accept</Button>
        <Button variant="secondary" onClick={() => { updFn(id, 'Declined') }}>Decline</Button>
        <p><strong>{formatCurrency(price)}</strong> Lead Invitation</p>
      </CardFooter>
    </>
  )
}

export default function LeadCard ({
  contact,
  dateCreated,
  suburb,
  category,
  id,
  description,
  price,
  finalPrice,
  leadStatus,
  updFn
}: ILead & { updFn?: (id: string, status: string) => Promise<void> }): JSX.Element {
  const contactName = leadStatus.name === 'Accepted' ? `${contact.firstName} ${contact.lastName}` : contact.firstName

  return (
    <Card>
      <CardHeader>
        <div className='w-full flex items-center'>
          <Avatar className="h-9 w-9 mr-4">
            <AvatarImage alt="@shadcn" src="/placeholder-avatar.jpg" />
            <AvatarFallback>{getAvatarLetters(contactName)}</AvatarFallback>
          </Avatar>
          <div className='flex flex-col items-start'>
            <p className='leading-7 [&:not(:first-child)]:mt-6 text-primary'>{contactName}</p>
            <p className='text-muted-foreground'>{formatDate(dateCreated)}</p>
          </div>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className='p-0'>
        <div className='flex flex-row items-center gap-6 p-6'>
          <div className='flex flex-row mr-4 gap-2'>
            <MapPin className='text-muted-foreground' />
            <p className='text-muted-foreground'>{suburb}</p>
          </div>
          <div className='flex flex-row gap-2'>
            <Briefcase className='text-muted-foreground' />
            <p className='text-muted-foreground'>{category}</p>
          </div>
          <p className='text-muted-foreground'>Job ID: {id}</p>
          {leadStatus.name === 'Accepted' && <p className='text-muted-foreground'><strong>{formatCurrency(finalPrice)}</strong> Lead Invitation</p>}
        </div>
        <Separator />
        {leadStatus.name === 'New' && <p className='text-start p-6'>{description}</p>}
      </CardContent>
      {leadStatus.name === 'Accepted' ? <AcceptedLeadFooter contact={contact} description={description} /> : <InvitedLeadFooter id={id} price={price} updFn={updFn} />}
    </Card>
  )
}
