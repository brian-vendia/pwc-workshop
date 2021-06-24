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
import AddVillian from '../gql/AddVillian';
import AddHero from '../gql/AddHero';

export default function EditForm(props: any) {
    const [updateItem, { error: updateError, data: updateData }] = useMutation(props.class == "hero" ? UpdateHero() : UpdateVillian());
    const [addItem, { error: addError, data: addData }] = useMutation(props.class == "hero" ? AddHero() : AddVillian());
    const [showError, setShowError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
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
        if (props.data.id) {
            const updateRes = await updateItem({ variables: { id: props.data.id, name: input.name.value, description: input.description.value, slug: input.slug.value, username: input.username.value } });
            if (updateRes.errors) {
                setErrorMsg(JSON.stringify(updateRes.errors));
                setShowError(true);
            }
            else if (updateRes.data) {
                if (updateRes.data.error) {
                    setErrorMsg(JSON.stringify(updateRes.data.error));
                    setShowError(true);
                }
                else {
                    router.back();
                }
            } else {
                router.back();
            }
        }
        //no id? this is net new
        else {
            const addRes = await addItem({ variables: { name: input.name.value, description: input.description.value, slug: input.slug.value, username: input.username.value } });
            if (addRes.errors) {
                setErrorMsg(JSON.stringify(addRes.errors));
                setShowError(true);
            }
            else if (addRes.data) {
                if (addRes.data.error) {
                    setErrorMsg(JSON.stringify(addRes.data.error));
                    setShowError(true);
                }
                else {
                    router.back();
                }
            } else {
                router.back();
            }
        }
    }
    return (
        <section>
            <Card className="bg-gray-100 border border-gray-200 my-5 mx-3 md:mx-10 w-auto md:max-w-4xl">
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

            <Modal show={showError} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>An error occured {errorMsg}</Modal.Body>

            </Modal>


        </section>
    )
}