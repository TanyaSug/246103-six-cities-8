import {HTMLProps} from 'react';

export function Anchor (p:Partial<HTMLProps<HTMLAnchorElement>>):JSX.Element {
  const { href: pref, children, ...rest } = p;
  const href = typeof pref === 'undefined' ? '#' : pref;
  return <a href={href} {...rest}>{children}</a>;
}
