import {Card,Button,Modal} from 'react-bootstrap';
import {useRouter} from 'next/router'
import Link from 'next/link';
import {
TrashIcon,
PencilIcon

} from '@heroicons/react/outline'
import { useState } from 'react';

export default function HeroCard(props:any){
  const router = useRouter()
  const [showDelete, setShowDelete] = useState(false);
  const handleClose = () => setShowDelete(false);
  const confirmDelete = () => setShowDelete(true);
  const handleDelete = () => {
    if(props.onDelete){
      props.onDelete(props.data.id);
    }
    handleClose();
  } 
   return (<div><Card className="bg-gray-100 border border-gray-200 my-5 mx-10 max-w-4xl">
                     <Card.Title className="font-bold text-xl text-white bg-gray-800 p-3 my-0"><h2>{props.data.name}</h2></Card.Title>

              <Card.Body className="bg-gray-100">
              <div className="text-2xl text-gray-500 px-3">{props.data.description}</div>
              <div className="mt-3 px-3 pb-4">
                  <span className="text-gray-500">Created By</span>
                  <span className="text-black ml-1">{props.data.username}</span></div>
              <div className="w-full flex items-center">
                <Button variant="secondary" onClick={confirmDelete} className="flex w-full mx-3">
                <TrashIcon className="h-6 w-6 mr-3" aria-hidden="true" />Delete
                  </Button>
                  
                <Link href={`${router.pathname}/${props.data.id}`} ><Button variant="secondary" className="w-full flex text-2xl items-center mx-3">
                <PencilIcon className="h-6 w-6 mr-3" aria-hidden="true" />Edit
                  </Button>
                  </Link>
              </div>
              </Card.Body>
            </Card>
            <Modal show={showDelete} onHide={handleClose}   backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you certain you want to delete <span className="font-bold">{props.data.name}</span> ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
            </div>
            )
}
