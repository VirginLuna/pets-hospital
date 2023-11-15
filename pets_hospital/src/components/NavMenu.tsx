import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandLess from '@mui/icons-material/ExpandLess';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemButton, { ListItemButtonProps } from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { lighten, styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useCallback } from 'react';

const StyledListItemButton = styled((props: ListItemButtonProps) => <ListItemButton {...props} />)(({ theme }) => {
  return {
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    paddingBottom: 2,
    paddingTop: 2,
    marginBottom: 4,
    '&.Mui-selected': {
      background: `linear-gradient(to right, ${lighten(theme.palette.info.light, 0.3)}, ${theme.palette.primary.main})`,
      color: '#fff',
      '.MuiListItemIcon-root': {
        color: '#fff',
      },
    },
    '&.Mui-selected:hover': {
      backgroundColor: theme.palette.primary.main,
      color: '#fff',
    },
  };
});

export interface IMenu {
  index: string;
  label: string;
  open?: boolean;
  disabled?: boolean;
  children?: Array<IMenu>;
  icon?: React.ReactNode;
}

export interface NavMenuProps {
  index?: string;
  menus: IMenu[];
  onClick?: (menu: IMenu) => void;
}

/**
 * 判断是否有子菜单激活
 * @param menu
 * @param index
 * @returns
 */
function isActiveInChildren(menu: IMenu, index: string): boolean {
  if (!menu.children || !menu.children.length) return false;

  for (const child of menu.children) {
    if (child.index === index) {
      return true;
    }

    const result = isActiveInChildren(child, index);

    if (result) {
      return true;
    }
  }

  return false;
}

export default function NavMenu(props: NavMenuProps) {
  const index = props.index || '';

  const menus = props.menus;

  const onNavClick = useCallback(
    (menu: IMenu) => {
      if (typeof props.onClick === 'function') {
        props.onClick(menu);
      }
    },
    [props.onClick],
  );

  return (
    <List
      sx={{
        width: '100%',
        height: '100%',
        maxWidth: 360,
        pr: 2,
      }}
      component='nav'
      aria-labelledby='nested-list-subheader'
      // subheader={<ListSubheader component='div'>Nested List Items: {index}</ListSubheader>}
      subheader={
        <AppBar
          position='static'
          color='transparent'
          enableColorOnDark
          sx={{
            boxShadow: 'none',
            zIndex: (theme) => Math.min(...Object.values(theme.zIndex)) - 1,
            mb: 1,
          }}
        >
          <Toolbar
            sx={{
              span: {
                WebkitBackgroundClip: 'text',
              },
            }}
          >
            <Box
              component='img'
              sx={{
                height: 32,
                width: 32,
                mr: 1,
                ml: 0,
              }}
            />
            <Typography
              variant='h1'
              component='span'
              sx={{
                fontSize: '20px',
                flexGrow: 1,
                fontWeight: 600,
                WebkitTextFillColor: 'transparent',
                WebkitBackgroundClip: 'text',
                background: (theme) => {
                  return `linear-gradient(to bottom, ${lighten(theme.palette.text.secondary, 0.4)}, ${
                    theme.palette.text.primary
                  })`;
                },
              }}
            >
              React
            </Typography>
          </Toolbar>
        </AppBar>
      }
    >
      {menus.map((parent) => {
        const item = [
          <StyledListItemButton
            key={parent.label + '-1'}
            selected={parent.index === index || (isActiveInChildren(parent, index) && !parent.open)}
            onClick={() => onNavClick(parent)}
            disabled={parent.disabled}
          >
            <ListItemIcon sx={{ minWidth: 35, ml: 1 }}>{parent.icon}</ListItemIcon>
            <ListItemText primary={parent.label} />
            {parent.open ? <ExpandLess /> : <ChevronRightIcon />}
          </StyledListItemButton>,
        ];

        if (parent.children && parent.children.length) {
          item.push(
            <Collapse key={parent.label + '-2'} in={!!parent.open} timeout='auto' unmountOnExit>
              <List component='div' disablePadding>
                {parent.children.map((child) => {
                  return (
                    <StyledListItemButton
                      key={child.label}
                      selected={child.index === index}
                      onClick={() => onNavClick(child)}
                      disabled={parent.disabled ?? child.disabled}
                    >
                      <ListItemIcon sx={{ minWidth: 25, ml: 3 }}>{child.icon}</ListItemIcon>
                      <ListItemText primary={child.label} />
                    </StyledListItemButton>
                  );
                })}
              </List>
            </Collapse>,
          );
        }

        return item;
      })}
    </List>
  );
}
