import React, { useState } from "react";
import { Button, TextField, Typography, Box } from "@mui/material";
import styled from "styled-components";
import { evaluate } from "mathjs";

const CalculatorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #222;
`;

const CalculatorBox = styled(Box)`
  width: 360px;
  padding: 20px;
  border-radius: 20px;
  background: #333;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.5);
  text-align: center;
`;

const ButtonGrid = styled(Box)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-top: 15px;
`;

const Display = styled(TextField)`
  width: 100%;
  margin-bottom: 15px;
  & input {
    text-align: right;
    font-size: 2rem;
    color: #fff;
    background-color: grey;
    padding: 10px;
    border-radius: 10px;
  }
`;

const CalcButton = styled(Button)`
  height: 60px;
  font-size: 1.2rem;
  border-radius: 50px;
  background-color: #444 !important;
  color: white;
  &:hover {
    background-color: #666 !important;
  }
`;

const SpecialButton = styled(CalcButton)`
  background-color: #ff9500 !important;
  &:hover {
    background-color: #cc7700 !important;
  }
`;

const Calculator: React.FC = () => {
  const [expression, setExpression] = useState<string>("");

  const safeEvaluate = (expr: string) => {
    try {
      const result = evaluate(expr);
      return result !== undefined && result !== null ? result.toString() : "Error";
    } catch {
      return "Error";
    }
  };
  

  const handleButtonClick = (value: string) => {
    if (value === "C") {
      setExpression("");
    } else if (value === "⌫") {
      setExpression(expression.slice(0, -1));
    } else if (value === "=") {
        setExpression(safeEvaluate(expression.replace("mod", "%")));
    } else if (value === "√") {
      setExpression(`sqrt(${expression})`);
    } else if (value === "x²") {
      setExpression(`(${expression})^2`);
    } else if (value === "log") {
      setExpression(`log10(${expression})`);
    } else {
      setExpression(expression + value);
    }
  };

  return (
    <CalculatorContainer>
      <CalculatorBox>
        <Typography variant="h5" color="white">Calculator</Typography>
        <Display variant="outlined" value={expression} disabled />
        <ButtonGrid>
          {["(", ")", "⌫", "C", "√", "x²", "log", "mod", "7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", ".", "=", "+"].map((char) => (
            char === "=" ? (
              <SpecialButton key={char} variant="contained" onClick={() => handleButtonClick(char)}>
                {char}
              </SpecialButton>
            ) : (
              <CalcButton key={char} variant="contained" onClick={() => handleButtonClick(char)}>
                {char}
              </CalcButton>
            )
          ))}
        </ButtonGrid>
      </CalculatorBox>
    </CalculatorContainer>
  );
};

export default Calculator;
