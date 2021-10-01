import styled from "styled-components";

const LoadingGif = styled.div`
	border: 16px solid ${({ theme }) => theme.elements}; 
	border-top: 16px solid ${({ theme }) => theme.text}; 
	border-radius: 50%;
	width: 120px;
	height: 120px;
	animation: spin 2s linear infinite;
	margin: auto;
  }
  
  @keyframes spin {
	0% { transform: rotate(0deg); }
	100% { transform: rotate(360deg); }
  }
`;

const Loader = () => {
    return(
        <LoadingGif></LoadingGif>
    )
}

export default Loader;