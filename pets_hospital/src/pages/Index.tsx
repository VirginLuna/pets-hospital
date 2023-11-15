/*
 * @Author: VirginLuna
 * @Date: 2023-11-16 14:18:50
 * @Description:
 */
import { Outlet } from '@mui/icons-material';
import { AppBar, Avatar, Box, Stack, Toolbar } from '@mui/material';
import { useCallback, useState } from 'react';

import NavMenu from '@/components/NavMenu';
import TextMenu from '@/components/TextMenu';

interface IMenu {
  index: string;
  label: string;
  open?: boolean;
  disabled?: boolean;
  children?: Array<IMenu>;
  icon?: React.ReactNode;
}

const __menus__: IMenu[] = [];

export default function Index() {
  const [menus, setMenus] = useState(__menus__);
  const onNavClick = useCallback(() => {}, [menus]);
  return (
    <div>
      <Box sx={{ width: '100%', height: '100%', maxWidth: 250, position: 'fixed' }}>
        <NavMenu index={location.pathname} menus={menus} onClick={onNavClick}></NavMenu>
      </Box>
      <div>
        <AppBar
          color='transparent'
          position='static'
          sx={{
            boxShadow: 'none',
            position: 'fixed',
            bgcolor: '#fafafa',
            zIndex: (theme) => Math.min(...Object.values(theme.zIndex)) - 1,
          }}
        >
          <Toolbar>
            {/* <IconButton
              size='large'
              edge='start'
              color='inherit'
              aria-label='menu'
              sx={{ mr: 2 }}
              onClick={() => setIsExtend(!isExtend)}
            >
              <MenuIcon />
            </IconButton> */}

            <Box sx={{ flexGrow: 1 }}></Box>

            <Stack direction='row'>
              <Avatar sx={{ width: 32, height: 32 }} />
              <TextMenu
                menus={[
                  // { label: '个人资料', id: 'profile' },
                  // { label: '系统设置', id: 'setting' },
                  {
                    label: '登出',
                    id: 'logout',
                    onClick: () => {},
                  },
                ]}
              >
                123
              </TextMenu>
            </Stack>
          </Toolbar>
        </AppBar>

        <Box
          sx={{
            m: 1,
            mt: { xs: 7 + 1, md: 8 + 1 },
            mr: 3,
            ml: 3,
            minHeight: '768px',
            height: { md: 'calc(100% - 80px)', xs: 'calc(100% - 56px)' },
          }}
        >
          <Box sx={{ p: 0, height: 'calc(100% - 16px)' }}>
            <Outlet />
          </Box>
        </Box>
      </div>
    </div>
  );
}
