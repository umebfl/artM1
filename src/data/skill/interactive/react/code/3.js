export const code3 = `
import React, { useEffect, useLayoutEffect, useRef } from "react";
import TweenMax from "gsap/TweenMax";
import './index.less';

const Animate = () => {
    const REl = useRef(null);
    useEffect(() => {
        /*下面这段代码的意思是当组件加载完成后,在0秒的时间内,将方块的横坐标位置移到600px的位置*/
        TweenMax.to(REl.current, 0, {x: 600})
    }, []);
    return (
        <div className='animate'>
            <div ref={REl} className="square">square</div>
        </div>
    );
};

export default Animate;
`

export const code3exp = `
import { useState, useEffect } from 'react';

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    // Specify how to clean up after this effect:
    return function cleanup() {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
`

export const code3expthree = `
// 通过跳过 Effects 来优化性能

useEffect(() => {
  ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
  return () => {
    ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
  };
}, [props.friend.id]); // Only re-subscribe if props.friend.id changes
`