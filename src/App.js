import UIButton1Test from './components/UIButton1/UIButton1Test';
import CatButtonTest from './components/CatButton/CatButtonTest';
import styled from 'styled-components';

const TestContainer = styled.div`
  height: 95vh;
  width: 95vw;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const App = () => {
  return (
    <TestContainer>
      <UIButton1Test />
      <CatButtonTest />
    </TestContainer>
  );
};

export default App;
