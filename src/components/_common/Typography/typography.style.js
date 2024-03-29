import styled, { css } from 'styled-components'

export const StyledTypography = styled(({element, children, type, gutterBottom, ...other}) => {
  return React.createElement(element, {...other}, children)
})`
  opacity: 1;
  transition: .2s all;
  ${props => css`
    ${props.type === 'headline' && css`
    font-size: calc(1rem + 1vw);
    margin: 0px;
    `}
    ${props.type === 'headlineLarge' && css`
      font-size: calc(1rem + 1vw + 10px);
      margin: 0px;
    `}
    ${props.type ==='subheadline' && css`
      font-size: calc(.8rem + 1vw);
    `}
    ${props.type === 'listPrimary' && css`
      font-size: 1.2rem;
    `}
    ${props.type === 'listSecondary' && css`
      font-size: .9rem;
      color: ${props.theme.colors.foreground.dark2};
    `}
    ${props.type === 'paragraph' && css`
      margin: 0;
      margin-bottom: 1rem;
    `}
    ${props.gutterBottom && css`
      margin-bottom: 15px;
    `}
  `}
`
