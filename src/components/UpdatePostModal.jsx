import { useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updatePost } from "../features/posts/postsSlice";
import { AuthContext } from "./AuthProvider";

export default function UpdatePostModal({ show, handleClose, postId, originalPostContent }) {
  const [postContent, setPostContent] = useState(originalPostContent);
  const [newFile, setNewFile] = useState(null);
  const dispatch = useDispatch();
  const { currentUser } = useContext(AuthContext);
  const userId = currentUser.uid;

  const handleUpdate = () => {
    dispatch(updatePost({ userId, postId, NewPostContent: postContent, newFile}));
    handleClose();
    setPostContent("");
  };

  const handleNewFileChange = (e) => {
    setNewFile(e.target.files[0]);
    }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="postContent">
            <Form.Control
              as={"textarea"}
              rows={3}
              defaultValue={originalPostContent}
              onChange={(e) => setPostContent(e.target.value)}
            />
            <br />
            <Form.Control type="file" onChange={handleNewFileChange} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" className="rounded-pill" onClick={handleUpdate}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
}