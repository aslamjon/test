import styled from "styled-components";


const BackgroundStyledInAuth = styled.div`
    background: linear-gradient(to bottom, #212529 50%, rgba(255,255,255,0.9) 50%);
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CardStyledInAuth = styled.form`
    padding: 15px 20px;
    background: rgba(255,255,255,0.9);
    border-radius: 10px;
    box-shadow: 0px 0px 8px rgba(0,0,0,0.2);
`;
const ButtonStyledInAuth = styled.button`
    width: 80%;
    margin: 0 10%;
    /* height: 40px; */
    padding: 5px 10px;
    /* background: #f44336;
    border-radius: 10px; */
`;
const InputStyledInAuth = styled.input`
    margin: 10px 0;
`;
export {
    BackgroundStyledInAuth,
    CardStyledInAuth,
    ButtonStyledInAuth,
    InputStyledInAuth
}
