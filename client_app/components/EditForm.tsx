import { Card, Button, Form, Modal } from 'react-bootstrap';
import {
    RewindIcon,
    SaveIcon

} from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import { providers } from 'next-auth/client';
import env from '../share_env.json';
import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import UpdateVillian from '../gql/UpdateVillian';
import UpdateHero from '../gql/UpdateHero';

export default function EditForm(props: any) {
    const [updateItem, { error: updateError,data:updateData }] = useMutation(props.class=="hero"?UpdateHero():UpdateVillian());

    const [showError, setShowError] = useState(false);
    const handleClose = () => setShowError(false);
    let header = "";
    if (props.data.id) {
        header = props.class + " " + props.data.id;
    }
    else {
        header = "New " + props.class;
    }
    const router = useRouter()

    const goBack = () => {
        router.back();
    }
    const handleSave = async (event: any) => {
        event.preventDefault();
        const input = event.target;
        //has an id? needs an update
        if(props.data.id){
            updateItem({variables:{id:props.data.id,name:input.name.value,description:input.description.value,slug:input.slug.value,username:input.username.value}});
            router.back();
        }
        //no id? this is net new
        else{   

        }
    }
    return (
        <section>
            <Card className="bg-gray-100 border border-gray-200 my-5 mx-10 max-w-4xl">
                <Card.Title className="font-bold p-3 bg-gray-800 text-white my-0"><h3>{header}</h3></Card.Title>

                <Card.Body className="bg-gray-100">
                    <Form onSubmit={handleSave}>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" defaultValue={props.data.name || ''} />
                            <Form.Text className="text-muted">
                                Give your {props.class} a strong name!
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" defaultValue={props.data.description || ''} />
                        </Form.Group>
                        <Form.Group controlId="slug">
                            <Form.Label>Slug</Form.Label>
                            <Form.Control type="text" defaultValue={props.data.slug || ''} />
                        </Form.Group>
                        <Form.Group controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control readOnly={true} type="text" defaultValue={env.user || 'unknown'} />
                        </Form.Group>

                        <div className="w-full flex items-center">
                            <Button variant="secondary" onClick={goBack} className="flex w-full mx-3">
                                <RewindIcon className="h-6 w-6 mr-3" aria-hidden="true" />Cancel
                            </Button>

                            <Button type="submit" variant="secondary" className="w-full flex text-2xl items-center mx-3">
                                <SaveIcon className="h-6 w-6 mr-3" aria-hidden="true" />Save
                            </Button>
                        </div>
                    </Form>

                </Card.Body>
            </Card>
            {updateData && (
                <Modal show={updateError || updateData.error} onHide={handleClose} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>An error occured {JSON.stringify(updateError)} <br/><br/>{JSON.stringify(updateData.error)}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
                </Modal>
            )}
          
        </section>
    )
}