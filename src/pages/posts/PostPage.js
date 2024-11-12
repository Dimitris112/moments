import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

function PostPage() {
    const { id } = useParams();
    const [post, setPost] = useState({ results: [] });

    useEffect(() => {
        const handleMount = async () => {
            try {
                // destructure & rename variable in place - posts
                // accept array of promises, gets resolved when all promises are resolved - return array of data
                const [{ data: post }] = await Promise.all([
                    axiosReq.get(`/posts/${id}`)
                ])
                setPost({ results: [post] });
                console.table(post);
            } catch (err) {
                // if any promises are rejected - catch error
                console.log(err);
            }
        }

        handleMount();
    }, [id]);

    return (
        <Row className="h-100">
            <Col className="py-2 p-0 p-lg-2" lg={8}>
                <p>Popular profiles for mobile</p>
                <p>Post component</p>
                <Container className={appStyles.Content}>
                    Comments
                </Container>
            </Col>
            <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
                Popular profiles for desktop
            </Col>
        </Row>
    );
}

export default PostPage;