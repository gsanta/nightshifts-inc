import styled from 'styled-components';
import colors from '../../../colors';

export const ButtonLine = styled.div`
    height: 40px;
    padding: 5px 0px;
    background-color: ${colors.MainInputBackgroundGray};
    width: 100%;
    display: flex;

    background: repeating-linear-gradient(
        45deg,
        #EFEFEF,
        #EFEFEF 5px,
        #FFFFFF 5px,
        #FFFFFF 10px
    );
`;
