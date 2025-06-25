import axios from "axios";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";

export default function NewPostModal({show, handleClose}) {
    const [postContent, setPostContent] = useState("")

    const handleSave = () => {
        const token = localStorage.getItem("authToken")

        const decode = jwtDecode(token)
        const userId = decode.id

        const data = {
            title: "Post Title",
            content: postContent,
            user_id: userId,
        };

        axios
        .post("https://c9ba7f53-46e6-4d63-b3f9-3943f9049c80-00-8846nsg8of01.sisko.replit.dev/posts", data)
        .then((response)=> {
            console.log("Success:", response.data)
            handleClose();
        })
        .catch((error) => {
            console.error("error", error)
        })
    }
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="postContent">
                            <Form.Control placeholder="What is happening?!" as={"textarea"} rows={3} onChange={(e) => setPostContent(e.target.value)}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" className="rounded-pill" onClick={handleSave}>
                        Tweet
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}