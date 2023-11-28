import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import appwriteService from "../appwrite/services";
import { Container, PostForm } from '../components';

function EditPost() {
    const [post, setPost] = useState();
    const navigate = useNavigate();
    const { slug } = useParams();

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPost(post);
                }
            });
        } else {
            navigate("/");
        }

    }, [slug, navigate]);

    return post ? (
        <div className='py-8'>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null
}

export default EditPost;