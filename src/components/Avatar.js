import React from 'react';
import {Image} from 'react-native';
import UserAvatar from 'react-native-user-avatar';

const Avatar = ({src, size}) => (
  <UserAvatar
    style={{
      // Add this to give a more circular shape
      width: size,
      height: size,
    }}
    size={size} // You still need this to keep the container circular
    component={
      src ? (
        <Image
          source={{uri: src}}
          style={{
            width: size + 1, // Adding 1 to prevent background border from leaking
            height: size + 1,
            borderRadius: (size + 1) / 2,
          }}
        />
      ) : undefined
    }
  />
);

export default Avatar;
