import React from "react";
import styled from "styled-components";

const BubbleBackground = ({ children }) => {
  return (
    <BackgroundWrapper>
      <div className="container">
        <div className="bubble"><span/><span/><span/><span/><span/></div>
        <div className="bubble"><span/><span/><span/><span/><span/></div>
        <div className="bubble"><span/><span/><span/><span/><span/></div>
        <div className="bubble"><span/><span/><span/><span/><span/></div>
        <div className="bubble"><span/><span/><span/><span/><span/></div>
      </div>

      {/* Page content */}
      <div className="content">{children}</div>
    </BackgroundWrapper>
  );
};

export default BubbleBackground;

const BackgroundWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: #0a0f24;

  .content {
    position: relative;
    z-index: 20;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .container {
    position: absolute;
    inset: 0;
    overflow: hidden;
    z-index: 5;
  }

  .bubble {
    position: absolute;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    box-shadow: inset 0 0 25px rgba(255, 255, 255, 0.25);
    animation: animate_4010 8s ease-in-out infinite;
  }

  .bubble:nth-child(1) { left: 10%; top: 20%; }
  .bubble:nth-child(2) { left: 70%; top: 10%; animation-delay: -3s; zoom: 0.5; }
  .bubble:nth-child(3) { left: 20%; top: 70%; animation-delay: -4s; zoom: 0.4; }
  .bubble:nth-child(4) { left: 80%; top: 60%; animation-delay: -5s; zoom: 0.6; }
  .bubble:nth-child(5) { left: 50%; top: 30%; animation-delay: -2s; zoom: 0.7; }

  @keyframes animate_4010 {
    0%,100% { transform: translateY(-30px); }
    50% { transform: translateY(30px); }
  }

  .bubble span {
    position: absolute;
    border-radius: 50%;
  }

  .bubble span:nth-child(1) {
    inset: 10px;
    border-left: 15px solid #0fb4ff;
    filter: blur(8px);
  }

  .bubble span:nth-child(2) {
    inset: 10px;
    border-right: 15px solid #ff4484;
    filter: blur(8px);
  }

  .bubble span:nth-child(3) {
    inset: 10px;
    border-top: 15px solid #ffeb3b;
    filter: blur(8px);
  }

  .bubble span:nth-child(4) {
    inset: 30px;
    border-left: 15px solid #ff4484;
    filter: blur(12px);
  }

  .bubble span:nth-child(5) {
    inset: 10px;
    border-bottom: 10px solid white;
    filter: blur(8px);
    transform: rotate(330deg);
  }
`;
