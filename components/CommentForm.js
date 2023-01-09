import {Form,Button,Input} from 'antd';
import React, { useCallback, useState } from 'react';
// import useInput from '../hooks/useInput';
import PropTypes from 'prop-types';

const CommentForm = ()=>
{
    const onSubmitForm  = useCallback(()=>
    {
        // console.log(commentText);

    }, []);

    return(
        <Form onFinish={onSubmitForm}>
            <Form.Item style={{ position:"relative" , margin: 0}}>
                <Input.TextArea value={''} onChange={''} rows={2}/>
                <Button type='primary' htmlType='submit' style={{position: 'absolute', right: 0, bottom: -40}}>작성</Button>
            </Form.Item>
        </Form>
    )
}

export default CommentForm;