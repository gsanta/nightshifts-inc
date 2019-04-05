import styled from 'styled-components';

const DialogTemplateHeader = styled.div`
    background-color: ${(props: DialogTemplateHeaderProps)  => props.backgroundColor};
    border-bottom-color: ${(props: DialogTemplateHeaderProps) => props.borderColor};
    border-bottom-style: solid;
    border-bottom-width: 1px;
    height: 30px;
`;

export default DialogTemplateHeader;

export interface DialogTemplateHeaderProps {
    backgroundColor: string;
    borderColor: string;
}
