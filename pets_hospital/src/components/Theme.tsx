import { PropsWithChildren, useEffect } from 'react';

export const colors = {
  red: `
:root {
  --adm-color-primary: #d55554;
  --adm-color-success: #00b578;
  --adm-color-warning: #ff8f1f;
  --adm-color-danger: #ff3141;

  --adm-color-white: #ffffff;
  --adm-color-text: #333333;
  --adm-color-text-secondary: #666666;
  --adm-color-weak: #999999;
  --adm-color-light: #cccccc;
  --adm-color-border: #eeeeee;
  --adm-color-box: #f5f5f5;
  --adm-color-background: #ffffff;
}

html[data-prefers-color-scheme="dark"] {
  --adm-color-primary: #d55554;
  --adm-color-success: #34b368;
  --adm-color-warning: #ffa930;
  --adm-color-danger: #ff4a58;

  --adm-color-white: #ffffff;
  --adm-color-text: #e6e6e6;
  --adm-color-text-secondary: #b3b3b3;
  --adm-color-weak: #808080;
  --adm-color-light: #4d4d4d;
  --adm-color-border: #2b2b2b;
  --adm-color-box: #0a0a0a;
  --adm-color-background: #1a1a1a;
}
  `,
  blue: `
:root {
  --adm-color-primary: #0884ff;
  --adm-color-success: #00b578;
  --adm-color-warning: #ff8f1f;
  --adm-color-danger: #ff3141;

  --adm-color-white: #ffffff;
  --adm-color-text: #333333;
  --adm-color-text-secondary: #666666;
  --adm-color-weak: #999999;
  --adm-color-light: #cccccc;
  --adm-color-border: #eeeeee;
  --adm-color-box: #f5f5f5;
  --adm-color-background: #ffffff;
}

html[data-prefers-color-scheme="dark"] {
  --adm-color-primary: #0884ff;
  --adm-color-success: #00b578;
  --adm-color-warning: #ff8f1f;
  --adm-color-danger: #ff3141;

  --adm-color-white: #ffffff;
  --adm-color-text: #e6e6e6;
  --adm-color-text-secondary: #b3b3b3;
  --adm-color-weak: #808080;
  --adm-color-light: #4d4d4d;
  --adm-color-border: #2b2b2b;
  --adm-color-box: #0a0a0a;
  --adm-color-background: #1a1a1a;
}
    `,
  black: `
:root {
  --adm-color-primary: #3c3c4a;
  --adm-color-success: #00b578;
  --adm-color-warning: #ff8f1f;
  --adm-color-danger: #ff3141;

  --adm-color-white: #ffffff;
  --adm-color-text: #333333;
  --adm-color-text-secondary: #666666;
  --adm-color-weak: #999999;
  --adm-color-light: #cccccc;
  --adm-color-border: #eeeeee;
  --adm-color-box: #f5f5f5;
  --adm-color-background: #ffffff;
}

html[data-prefers-color-scheme="dark"] {
  --adm-color-primary: #3c3c4a;
  --adm-color-success: #00b578;
  --adm-color-warning: #ff8f1f;
  --adm-color-danger: #ff3141;

  --adm-color-white: #ffffff;
  --adm-color-text: #e6e6e6;
  --adm-color-text-secondary: #b3b3b3;
  --adm-color-weak: #808080;
  --adm-color-light: #4d4d4d;
  --adm-color-border: #2b2b2b;
  --adm-color-box: #0a0a0a;
  --adm-color-background: #1a1a1a;
}
        `,
  green: `
:root {
  --adm-color-primary: #34ab7c;
  --adm-color-success: #00b578;
  --adm-color-warning: #ff8f1f;
  --adm-color-danger: #ff3141;

  --adm-color-white: #ffffff;
  --adm-color-text: #333333;
  --adm-color-text-secondary: #666666;
  --adm-color-weak: #999999;
  --adm-color-light: #cccccc;
  --adm-color-border: #eeeeee;
  --adm-color-box: #f5f5f5;
  --adm-color-background: #ffffff;
}

html[data-prefers-color-scheme="dark"] {
  --adm-color-primary: #34ab7c;
  --adm-color-success: #00b578;
  --adm-color-warning: #ff8f1f;
  --adm-color-danger: #ff3141;

  --adm-color-white: #ffffff;
  --adm-color-text: #e6e6e6;
  --adm-color-text-secondary: #b3b3b3;
  --adm-color-weak: #808080;
  --adm-color-light: #4d4d4d;
  --adm-color-border: #2b2b2b;
  --adm-color-box: #0a0a0a;
  --adm-color-background: #1a1a1a;
}
        `,
};

interface ThemeProps extends PropsWithChildren {
  name: keyof typeof colors;
  scheme: 'light' | 'dark'; // 配色方案
}

export default function Theme(props: ThemeProps) {
  useEffect(() => {
    const item = document.querySelector('.theme-style');

    if (item) {
      item.innerHTML = colors[props.name];
      item.id = `theme-style-${props.name}`;
    } else {
      const style = document.createElement('style');

      style.className = `theme-style`;
      style.id = `theme-style-${props.name}`;

      style.innerHTML = colors[props.name];

      document.body.appendChild(style);
    }
  }, [props.name]);

  useEffect(() => {
    document.documentElement.setAttribute('data-prefers-color-scheme', props.scheme);
  }, [props.scheme]);

  return <>{props.children}</>;
}
