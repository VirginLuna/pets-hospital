import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import { PropsWithChildren, useEffect, useId, useRef, useState } from 'react';

import { IconMenuItem, IconMenuProps } from './IconMenu';

export interface TextMenuProps extends PropsWithChildren, Omit<IconMenuProps, 'icon'> {}

const TextMenu: React.FC<TextMenuProps> = (props) => {
  const componentId = useId();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<any>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const onClickMenu = (event: React.MouseEvent<HTMLElement>, menu: IconMenuItem) => {
    event.stopPropagation();
    if (menu.onClick) menu.onClick(menu);
    if (props.onClick) props.onClick(menu);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <Button
        ref={anchorRef}
        variant='text'
        sx={{ textTransform: 'none' }}
        onClick={handleToggle}
        endIcon={open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
      >
        {props.children}
      </Button>

      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement='bottom-end'
        transition
        disablePortal
        nonce={undefined}
        onResize={undefined}
        onResizeCapture={undefined}
      >
        {({ TransitionProps }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: 'right top',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id={'composition-menu-' + componentId}
                  aria-labelledby='composition-button'
                  onKeyDown={handleListKeyDown}
                >
                  {props.menus.map((menu) => (
                    <MenuItem
                      key={menu.id}
                      selected={props.isSelect?.(menu)}
                      disabled={props.isDisabled?.(menu)}
                      onClick={(event) => {
                        handleClose(event);
                        onClickMenu(event, menu);
                      }}
                    >
                      {menu.label}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

TextMenu.displayName = 'TextMenu';

export default TextMenu;
