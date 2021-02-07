// import UIButton1Test from './components/UIButton1/UIButton1Test';
// import CatButtonTest from './components/CatButton/CatButtonTest';
import FloatingResponsiveMenuTest from './components/FloatingResponsiveMenu/FloatingResponsiveMenuTest';
import styled from 'styled-components';

const TestContainer = styled.div`
  height: 95vh;
  width: 95vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const App = () => {
  return (
    <div>
      <TestContainer>
        {/* <UIButton1Test />
        <CatButtonTest />
        <UIButton1Test />
        <CatButtonTest />*/}
        <FloatingResponsiveMenuTest />
      </TestContainer>
    </div>
  );
};

export default App;
