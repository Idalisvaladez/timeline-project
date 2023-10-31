import React, {useState} from 'react';
import { Comment, List } from '@arco-design/web-react';
import {
  IconHeart,
  IconMessage,
  IconHeartFill,
  IconStarFill,
  IconStar,
} from '@arco-design/web-react/icon';

function Comments({comments, users}) {
    const [likes, setLikes] = useState([]);
    const {comment, event_id, timestamp, user_id} = comments
    console.log(users.username)
    
    
    
     const displayedUser = () => {
        users.filter((user) => user.id === comment.user_id)
     }


    return (
        <List bordered={false} header={<span></span>}>
          <List.Item key={comments.id}>
            <Comment
            //   avatar={profile_picture}
              content={comment}
              datetime={timestamp}
            //   actions={[
            //     <button
            //       className='custom-comment-action'
            //       key='heart'
            //       onClick={() =>
            //         setLikes(like ? likes.filter((x) => x !== comm.id) : [...likes, comm.id])
            //       }
            //     >
            //       {like ? (
            //         <IconHeartFill style={{ color: '#f53f3f' }}/>
            //       ) : (
            //         <IconHeart />
            //       )}
            //       {comm.like + (like ? 1 : 0)}
            //     </button>,
            //   ]}
            />
          </List.Item>
    </List>
    )
}

export default Comments;