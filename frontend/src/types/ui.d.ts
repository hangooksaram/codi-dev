import { StaticImageData } from 'next/image';
import { ComponentProps, HTMLInputTypeAttribute, InputHTMLAttributes, ReactNode } from 'react';
import { SetState } from '..';

export type gray = {
  dark;
};

export interface StyledImagePropsType {
  id?: string;
  width: string;
  height?: string;
  src: string;
  alt: string;
  onClick?: () => void;
}

export interface LocalImagePropsType {
  width: string;
  height?: string;
  src: StaticImageData;
  alt: string;
  sizes?: string;
}

export type ThemeColors =
  | 'black'
  | 'secondary'
  | 'primary'
  | 'info'
  | 'error'
  | 'background'
  | 'white'
  | 'gray'
  | 'background'
  | 'white';

export type ThemeFontSize = 'xl' | 'lg' | 'md' | 'sm' | 'xs';
export type ThemeFontWeight = 'black' | 'extraBold' | 'bold' | 'regular';

export interface InputProps {
  width?: string;
  outline?: boolean;
  invalid?: boolean | undefined;
}

export interface Textarea {
  width?: string;
  outline?: boolean;
  invalid?: boolean | undefined;
}

export type Button = 'default' | 'square' | 'round' | undefined;
export interface FlexBox {
  width?: string;
  direction?: 'row' | 'column';
  justifyContent?: 'center' | 'flex-start' | 'flex-end' | 'space-between';
  alignItems?: 'center' | 'flex-start' | 'flex-end' | 'space-between';
  rowGap?: string;
  columnGap?: string;
  children: ReactNode;
  isWrap?: boolean | undefined;
}

export interface Card {
  width?: string;
  height?: string;
  color?: string;
  padding?: string;
}

export interface TypographyProps {
  variant: 'div' | 'span' | 'h1' | 'h2' | 'h3' | 'label';
  size?: string;
  weight?: number;
  color?: string;
  align?: 'left' | 'right' | 'center';
  wordBreak?: 'keep-all' | 'initial' | 'break-all';
  lineHeight?:string;
  children: string | number;
}

export interface Dropdown {
  id?: string;
  width?: string;
  title?: string;
  type?: 'menu' | 'form';
  categories: string[] | number[];
  invalid?: boolean | undefined;
  selectedCategory: string | number | null;
  children?: ReactNode;
  left?: boolean;
  isReset?:boolean;
  setSelectedCategory: (category: T) => void;
}
