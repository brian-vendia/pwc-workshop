import {Card,Button} from 'react-bootstrap';
import {
TrashIcon,
PencilIcon

} from '@heroicons/react/outline'

export default function HeroCard(props:any){

   return (<Card className="bg-gray-100 border border-gray-200 my-5 mx-10 max-w-4xl">
              <Card.Body>
                <Card.Title className="font-bold text-3xl pt-5 px-5">{props.data.name}</Card.Title>
              </Card.Body>
              <div className="text-2xl text-gray-500 px-5">{props.data.description}</div>
              <div className="mt-3 px-5 pb-4">
                  <span className="text-gray-500">Created By</span>
                  <span className="text-black ml-1">{props.data.username}</span></div>
              <div className="w-full flex items-center">
                <div className="flex p-5 items-center flex-grow w-1/2 h-12 pt-3  text-center border border-gray-300 bg-white">
                <Button className="w-full flex p-5 text-xl items-center">
                <TrashIcon className="h-6 w-6 mr-3" aria-hidden="true" />Delete
                  </Button>
                  
                </div>
                <div className="flex p-5 items-center flex-grow w-1/2 h-12 pt-3  text-center border border-gray-300 bg-white">
                <Button className="w-full flex p-5 text-xl items-center">
                <PencilIcon className="h-6 w-6 mr-3" aria-hidden="true" />Edit
                  </Button>
                </div>
              </div>
            </Card>
            )
}
