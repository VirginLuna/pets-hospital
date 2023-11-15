import Avatar, { AvatarProps } from '@mui/material/Avatar';
import { omit } from 'lodash-es';
import React, { PropsWithChildren } from 'react';

function stringAvatar(name: string) {
  return `${name.split(' ')[0][0]}`;
}

export interface StringAvatarProps extends PropsWithChildren, AvatarProps {
  name?: string;
}

const StringAvatar: React.FC<StringAvatarProps> = (props) => {
  const name = props.name || 'primary';
  return <Avatar {...omit(props, 'name')}>{stringAvatar(name)}</Avatar>;
};

StringAvatar.displayName = 'StringAvatar';

export default StringAvatar;
