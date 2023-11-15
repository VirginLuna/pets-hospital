import Divider from '@mui/material/Divider';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useId, useState } from 'react';

const ITEM_HEIGHT = 48;

export interface IconMenuItem {
  id: string;
  label: string;
  divider?: boolean;
  onClick?: (item: IconMenuItem) => void;
}

export interface IconMenuProps {
  icon: React.ReactNode;
  menus: Array<IconMenuItem>;
  onClick?: (item: IconMenuItem) => void;
  isSelect?: (item: IconMenuItem) => boolean;
  isDisabled?: (item: IconMenuItem) => boolean;
  buttonProps?: IconButtonProps;
  menuProps?: MenuProps;
}

/**
 * 带图标的菜单
 * @example
 * function App() {
 *   return <IconMenu icon={<MoreVertIcon /> menus={[{ id: 'download', label: '下载' }]}}></IconMenu>
 * }
 * @param props
 * @returns
 */
const IconMenu: React.FC<IconMenuProps> = (props) => {
  const componentId = useId();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const onClickIcon = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    event.stopPropagation();
  };

  const onClickMenu = (event: React.MouseEvent<HTMLElement>, menu: IconMenuItem) => {
    setAnchorEl(null);
    event.stopPropagation();
    if (menu.onClick) menu.onClick(menu);
    if (props.onClick) props.onClick(menu);
  };

  const onClose = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-label='more'
        id={'icon-button-' + componentId}
        aria-controls={open ? 'icon-menu-' + componentId : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup='true'
        onClick={onClickIcon}
        {...(props.buttonProps || {})}
      >
        {props.icon}
      </IconButton>
      <Menu
        {...(props.menuProps || {})}
        id={'icon-menu-' + componentId}
        MenuListProps={{
          'aria-labelledby': 'icon-button' + componentId,
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={onClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        {props.menus.map((menu) => (
          <div key={menu.id}>
            {menu.divider ? <Divider /> : <></>}
            <MenuItem
              key={menu.id}
              selected={props.isSelect?.(menu)}
              disabled={props.isDisabled?.(menu)}
              onClick={(event) => onClickMenu(event, menu)}
              sx={{ fontSize: '14px' }}
            >
              {menu.label}
            </MenuItem>
          </div>
        ))}
      </Menu>
    </>
  );
};

IconMenu.displayName = 'IconMenu';

export default IconMenu;
