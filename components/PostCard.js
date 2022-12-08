import { EllipsisOutlined,HeartTwoTone, HeartOutlined, MessageOutlined, RetweetOutlined, MessageTwoTone } from "@ant-design/icons";
import { Avatar, Button, Card, List, Popover,Comment,Skeleton,Divider,Space } from "antd";
import {ButtonGroup,  } from "antd/lib/button/button-group";
import { useSelector } from "react-redux";
import propTypes from 'prop-types';
import { useCallback, useEffect, useState } from "react";
import React from "react";
import Head from "next/head";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import axios from "axios";
import InfiniteScroll from 'react-infinite-scroll-component';
import CommentForm from "./CommentForm";

const PostCard = ()=>
{   
    const [data, setData] = useState([]);
    useEffect(() => {
        // Perform localStorage action
        const item = localStorage.getItem('Authorization')
        axios.get('https://api.withrun.click/freepost',{
            headers:
          {
            "Authorization" : "Bearer "+item
          },
        })
        // .then((res) =>{res.json()
            // console.log(res)
        // })
         .then((res) => {
           console.log(res)
           setData(res.data);
           console.log('data :',data)
           
         })
         .catch((error) => {
             console.log(error)
              });
      }, [])

    const [liked,setLiked] = useState(false);
    const [commentFormOpened, setCommmentFormOpened] =  useState(false);

   
    function onToggleComment ()
    {
        commentFormOpened? setCommmentFormOpened(false) : setCommmentFormOpened(true)
    };
 
    return(
        // Get 받아서 Map으로 그려주도록하자
        <> 
        <div style={{marginBottom : 20, marginTop: 50 }}>
        
        {/* <Card
                hoverable='true'
                cover={
                    <img
                      alt="example"
                    src='https://cdn.san.chosun.com/news/photo/202107/14996_62759_3629.jpg' 
                    width="auto"
                      height="300"
                    />
                  }
                actions={[
                    commentFormOpened? <MessageTwoTone twoToneColor="#00BFFF" key="comment" onClick={onToggleComment}>'댓글'</MessageTwoTone>
                    :<MessageOutlined key="comment" onClick={onToggleComment} description='댓글'/>,

               
                     
                ]}
                >
                
                    <Card.Meta style={{}}
                        avatar = {<Avatar>한</Avatar>}
                        title = '한사랑달리기회'
                        description = '열정!열정!열정!! 남녀노소 누구나 오세요~ 즐겁게 달리고 건강챙겨요^^ 여러분 사랑합니다 ❤🧡💛💚💙💜🤎🖤🤍'  
                    />
                </Card>
                {commentFormOpened && 
                    (<div>
                    <CommentForm/>
                    <Comment
                        actions={[<span key="comment-nested-reply-to">Reply to</span>]}
                        author={<a>김기윤</a>}
                        avatar={
                        <Avatar
                            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                            alt="Han Solo"
                        />
                        }
                        content={
                        <p>
                            가입하고싶어요!!
                        </p>
                        }
                    />
                     <Comment
                        actions={[<span key="comment-nested-reply-to">Reply to</span>]}
                        author={<a>류지호</a>}
                        avatar={
                        <Avatar>류</Avatar>
                        }
                        content={
                        <p>
                            완전 취향저격!!
                        </p>
                        }
                    />
                    
                    </div>)
                
                }
        */}
         { data && data.map((a,i)=>{
             return(
                 <>
                 <Space
                    direction="vertical"
                    size="large"
                    style={{
                    display: 'flex',
                    }}
                >
                <Card
                hoverable='true'
                className="antCard"
                cover={
                    <img
                      alt="example"
                      src={data[i].freePostImageDTO.url} 
                    
                      height="600"
                    />
                  }
                width='auto'
                height='auto'
                actions={[
                    
                    commentFormOpened? <MessageTwoTone twoToneColor="#00BFFF" key="comment" onClick={onToggleComment}/>  
                    :<MessageOutlined key="comment" onClick={onToggleComment} />,

               
                     
                ]}
                >
                
                    <Card.Meta 
                        avatar = {<Avatar>{data[i].author[0]}</Avatar>}
                        title = {data[i].author}
                        description = {data[i].content}     
                        
                    />
                </Card>
                </Space>
                {
                            commentFormOpened && 
                                (<div>
                                <CommentForm/>
                                <List
                                    header={data[i].freePostCommentDTOList.length+'개의 댓글'}
                                    itemLayout="horizontal"
                                    dataSource={data[i].freePostCommentDTOList}
                                    renderItem= {(item)=>(
                                        <li>
                                            <Comment
                                                author={data[i].freePostCommentDTOList.author}
                                                avatar={<Avatar>{data[i].freePostCommentDTOList.author[0]}</Avatar>}
                                                content={data[i].freePostCommentDTOList.content}
                                            />
                                        </li>
                                )}
                                />
                            
                                </div>)
                
                }

                </>
             )
         })
         }
          
            
        </div>
        </>
    );
}


export default PostCard;
